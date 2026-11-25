import "server-only";

/**
 * Lead delivery integration layer.
 *
 * Every submission is a `Lead`. Delivery channels are adapters; each one is
 * enabled only when its environment variables are present. If NO channel is
 * configured, `deliverLead` returns `not-configured` and the UI says so — it
 * never pretends a message was sent.
 *
 * Channels today:
 *   - Email via Resend HTTP API (RESEND_API_KEY, LEAD_TO_EMAIL, LEAD_FROM_EMAIL)
 *   - Generic CRM / automation webhook (CRM_WEBHOOK_URL, optional CRM_WEBHOOK_SECRET)
 *
 * To add a channel (HubSpot, Salesforce, Mailchimp…), implement `Channel` and
 * register it in `channels()`.
 */

export type LeadKind = "contact" | "academy-interest" | "assessment-results";

export type Lead = {
  kind: LeadKind;
  email: string;
  name?: string;
  subject: string;
  /** Plain-text key/value pairs, rendered safely by each channel */
  fields: Record<string, string>;
  consentMarketing: boolean;
  submittedAt: string;
};

export type DeliveryResult =
  { status: "delivered"; channels: string[] } | { status: "not-configured" } | { status: "failed"; error: string };

interface Channel {
  name: string;
  send(lead: Lead): Promise<void>;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function resendChannel(): Channel | null {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL;
  if (!apiKey || !to || !from) return null;
  return {
    name: "email",
    async send(lead) {
      const rows = Object.entries(lead.fields)
        .map(
          ([k, v]) =>
            `<tr><th align="left" style="padding:4px 12px 4px 0;vertical-align:top">${escapeHtml(k)}</th><td style="padding:4px 0;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
        )
        .join("");
      const text = Object.entries(lead.fields)
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n");
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: lead.email,
          subject: `[Praxis] ${lead.subject}`,
          html: `<table>${rows}</table>`,
          text,
        }),
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) throw new Error(`Email provider responded ${res.status}`);
    },
  };
}

function webhookChannel(): Channel | null {
  const url = process.env.CRM_WEBHOOK_URL;
  if (!url) return null;
  return {
    name: "crm-webhook",
    async send(lead) {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (process.env.CRM_WEBHOOK_SECRET) headers["X-Praxis-Webhook-Secret"] = process.env.CRM_WEBHOOK_SECRET;
      const res = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(lead),
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) throw new Error(`CRM webhook responded ${res.status}`);
    },
  };
}

export function channels(): Channel[] {
  return [resendChannel(), webhookChannel()].filter((c): c is Channel => c !== null);
}

export function isDeliveryConfigured(): boolean {
  return channels().length > 0;
}

export async function deliverLead(lead: Lead): Promise<DeliveryResult> {
  const active = channels();
  if (active.length === 0) return { status: "not-configured" };
  const results = await Promise.allSettled(active.map((c) => c.send(lead)));
  const delivered = active.filter((_, i) => results[i].status === "fulfilled").map((c) => c.name);
  results.forEach((r, i) => {
    if (r.status === "rejected") console.error(`[lead-delivery] ${active[i].name} failed:`, r.reason);
  });
  if (delivered.length === 0) return { status: "failed", error: "All delivery channels failed." };
  return { status: "delivered", channels: delivered };
}
