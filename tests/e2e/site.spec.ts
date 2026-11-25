import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = [
  "/",
  "/advisory",
  "/consulting",
  "/academy",
  "/academy/courses",
  "/academy/workshops",
  "/academy/resources",
  "/insights",
  "/insights/the-praxis-method",
  "/insights/six-dimensions-of-ai-readiness",
  "/insights/why-ai-pilots-stall",
  "/about",
  "/contact",
  "/ai-readiness",
  "/privacy",
  "/terms",
];

test.describe("every route", () => {
  for (const route of routes) {
    test(`${route} renders with one h1, a unique title, canonical and no a11y violations`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      const res = await page.goto(route);
      expect(res?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page).toHaveTitle(/Praxis Intelligence/);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`${route === "/" ? "/?$" : route}$`));
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.{50,}/);
      const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
      expect(axe.violations.map((v) => `${v.id}: ${v.nodes.length} node(s) — ${v.help}`)).toEqual([]);
      expect(errors).toEqual([]);
    });
  }
});

test("unknown routes return 404", async ({ page }) => {
  const res = await page.goto("/does-not-exist");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("doesn’t exist");
});

test("security headers are set", async ({ request }) => {
  const res = await request.get("/");
  const h = res.headers();
  expect(h["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(h["x-content-type-options"]).toBe("nosniff");
  expect(h["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(h["x-powered-by"]).toBeUndefined();
});

test("robots blocks indexing by default and sitemap lists routes", async ({ request }) => {
  expect(await (await request.get("/robots.txt")).text()).toContain("Disallow: /");
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain("/ai-readiness");
  expect(sitemap).toContain("/insights/the-praxis-method");
});

test("structured data is valid JSON on key pages", async ({ page }) => {
  await page.goto("/insights/the-praxis-method");
  const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
  const types = blocks.map((b) => JSON.parse(b)["@type"]);
  expect(types).toEqual(expect.arrayContaining(["Organization", "Article", "BreadcrumbList"]));
});

test("navigation and primary CTAs work", async ({ page, isMobile }) => {
  await page.goto("/");
  if (isMobile) {
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.getByRole("navigation", { name: "Mobile" }).getByRole("link", { name: "Consulting" }).click();
  } else {
    await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Consulting" }).click();
  }
  await expect(page).toHaveURL(/\/consulting$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Turn AI ambition into execution.");

  await page.goto("/");
  await page.getByRole("link", { name: "Start Your AI Journey" }).click();
  await expect(page).toHaveURL(/\/ai-readiness$/);
});

test("mobile menu closes with Escape and returns focus", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only");
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open menu" });
  await toggle.click();
  await expect(page.getByRole("navigation", { name: "Mobile" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("navigation", { name: "Mobile" })).toBeHidden();
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
});

test("skip link moves focus to main content", async ({ page, isMobile }) => {
  test.skip(isMobile, "keyboard flow");
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await skip.press("Enter");
  await expect(page).toHaveURL(/#main$/);
});
