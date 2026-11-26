import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { __resetRateLimits, rateLimit } from "@/lib/rate-limit";
import { parseFeed } from "@/lib/blog-feed";
import { deliverLead, isDeliveryConfigured, type Lead } from "@/lib/integrations/delivery";

describe("rateLimit", () => {
  beforeEach(() => __resetRateLimits());

  it("allows up to the limit then blocks until the window resets", () => {
    const t = 1_000_000;
    for (let i = 0; i < 3; i++) expect(rateLimit("k", 3, 1000, t).ok).toBe(true);
    const blocked = rateLimit("k", 3, 1000, t + 10);
    expect(blocked.ok).toBe(false);
    expect(blocked.retryAfterMs).toBe(990);
    expect(rateLimit("k", 3, 1000, t + 1000).ok).toBe(true);
  });

  it("tracks keys independently", () => {
    expect(rateLimit("a", 1, 1000, 0).ok).toBe(true);
    expect(rateLimit("b", 1, 1000, 0).ok).toBe(true);
    expect(rateLimit("a", 1, 1000, 1).ok).toBe(false);
  });
});

describe("parseFeed", () => {
  const rss = `<?xml version="1.0"?><rss><channel>
    <item><title><![CDATA[Leading with AI &amp; judgement]]></title><link>https://blog.cedricanne.com/p/leading</link>
      <pubDate>Mon, 03 Nov 2026 10:00:00 GMT</pubDate><description>&lt;p&gt;A short &lt;b&gt;summary&lt;/b&gt;.&lt;/p&gt;</description></item>
    <item><title>Off-site post</title><link>https://evil.example/p/x</link></item>
    <item><title>Insecure</title><link>http://blog.cedricanne.com/p/y</link></item>
  </channel></rss>`;

  it("parses RSS items and decodes entities", () => {
    const posts = parseFeed(rss);
    expect(posts).toHaveLength(1);
    expect(posts[0].title).toBe("Leading with AI & judgement");
    expect(posts[0].url).toBe("https://blog.cedricanne.com/p/leading");
    expect(posts[0].summary).toBe("A short summary .");
    expect(posts[0].published).toBe("2026-11-03T10:00:00.000Z");
  });

  it("drops links that are not https on the blog host", () => {
    expect(parseFeed(rss).some((p) => p.url.includes("evil") || p.url.startsWith("http:"))).toBe(false);
  });

  it("parses Atom entries", () => {
    const atom = `<feed><entry><title>Atom post</title><link href="https://blog.cedricanne.com/a"/><updated>2026-10-01T00:00:00Z</updated></entry></feed>`;
    expect(parseFeed(atom)[0]).toMatchObject({ title: "Atom post", url: "https://blog.cedricanne.com/a" });
  });

  it("returns an empty list for garbage", () => {
    expect(parseFeed("not xml")).toEqual([]);
  });
});

describe("deliverLead", () => {
  const lead: Lead = {
    kind: "contact",
    email: "a@b.co",
    subject: "Test",
    fields: { Name: "<script>x</script>" },
    consentMarketing: false,
    submittedAt: new Date(0).toISOString(),
  };
  const envKeys = ["RESEND_API_KEY", "LEAD_TO_EMAIL", "LEAD_FROM_EMAIL", "CRM_WEBHOOK_URL"];

  afterEach(() => {
    for (const k of envKeys) delete process.env[k];
    vi.unstubAllGlobals();
  });

  it("reports not-configured when no channel is set (never a fake success)", async () => {
    for (const k of envKeys) delete process.env[k];
    expect(isDeliveryConfigured()).toBe(false);
    expect(await deliverLead(lead)).toEqual({ status: "not-configured" });
  });

  it("sends escaped HTML via the email channel", async () => {
    process.env.RESEND_API_KEY = "test";
    process.env.LEAD_TO_EMAIL = "to@example.com";
    process.env.LEAD_FROM_EMAIL = "from@example.com";
    const fetchMock = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const result = await deliverLead(lead);
    expect(result).toEqual({ status: "delivered", channels: ["email"] });
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body.html).toContain("&lt;script&gt;");
    expect(body.html).not.toContain("<script>");
    expect(body.reply_to).toBe("a@b.co");
  });

  it("sends via the Cloudflare EMAIL binding when no Resend key is set", async () => {
    process.env.LEAD_TO_EMAIL = "owner@example.com";
    process.env.LEAD_FROM_EMAIL = "praxis@cedricanne.com";
    const send = vi.fn().mockResolvedValue({ messageId: "m-1" });
    const result = await deliverLead({ ...lead, name: "Alex" }, async () => ({ send }));
    expect(result).toEqual({ status: "delivered", channels: ["email"] });
    const msg = send.mock.calls[0][0];
    expect(msg.from).toEqual({ name: "Praxis Intelligence website", email: "praxis@cedricanne.com" });
    expect(msg.to).toBe("owner@example.com");
    expect(msg.replyTo).toEqual({ name: "Alex", email: "a@b.co" });
    expect(msg.subject).toBe("[Praxis] Test");
    expect(msg.html).toContain("&lt;script&gt;");
    expect(msg.text).toContain("Name: <script>x</script>");
  });

  it("reports failure (never success) when the Cloudflare binding is unavailable or rejects", async () => {
    process.env.LEAD_TO_EMAIL = "owner@example.com";
    process.env.LEAD_FROM_EMAIL = "praxis@cedricanne.com";
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect(
      (
        await deliverLead(lead, async () => {
          throw new Error("no binding");
        })
      ).status,
    ).toBe("failed");
    const send = vi.fn().mockRejectedValue(new Error("E_RECIPIENT_PLAN_RESTRICTED"));
    expect((await deliverLead(lead, async () => ({ send }))).status).toBe("failed");
  });

  it("prefers Resend over Cloudflare when RESEND_API_KEY is set", async () => {
    process.env.RESEND_API_KEY = "test";
    process.env.LEAD_TO_EMAIL = "owner@example.com";
    process.env.LEAD_FROM_EMAIL = "praxis@cedricanne.com";
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("{}", { status: 200 })));
    const send = vi.fn();
    expect(await deliverLead(lead, async () => ({ send }))).toEqual({ status: "delivered", channels: ["email"] });
    expect(send).not.toHaveBeenCalled();
  });

  it("reports failure when every channel fails", async () => {
    process.env.CRM_WEBHOOK_URL = "https://hooks.example.com/x";
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("", { status: 500 })));
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect((await deliverLead(lead)).status).toBe("failed");
  });
});
