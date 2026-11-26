"use server";

import { headers } from "next/headers";
import { deliverLead, type Lead } from "@/lib/integrations/delivery";
import { rateLimit } from "@/lib/rate-limit";
import { MIN_FILL_MS, type FormState, type FormValues } from "@/lib/forms/types";
import { assessmentLeadSchema, contactSchema, fieldErrorsFrom, interestSchema } from "@/lib/validation/schemas";

const NOT_CONFIGURED =
  "Online submissions are not enabled yet. Your message has not been sent. Please email praxis@cedricanne.com instead.";

/** Max submissions per IP per form per 10 minutes. Override with FORM_RATE_LIMIT (e.g. for tests). */
const LIMIT = Number(process.env.FORM_RATE_LIMIT ?? 5) || 5;
const WINDOW_MS = 10 * 60_000;

async function clientKey(scope: string): Promise<string> {
  const h = await headers();
  // CF-Connecting-IP is set by Cloudflare and cannot be spoofed by the client when served through Cloudflare.
  const ip = h.get("cf-connecting-ip") || h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  return `${scope}:${ip}`;
}

function looksLikeBot(website: string | undefined, startedAt: number): boolean {
  if (website) return true;
  return Date.now() - startedAt < MIN_FILL_MS;
}

/** Bots get a generic success so they learn nothing; nothing is delivered. */
const botResponse: FormState = { status: "success", message: "Thank you." };

async function finish(lead: Lead, successMessage: string, values: FormValues): Promise<FormState> {
  const result = await deliverLead(lead);
  if (result.status === "delivered") return { status: "success", message: successMessage };
  if (result.status === "not-configured") return { status: "not-configured", message: NOT_CONFIGURED, values };
  return {
    status: "error",
    message: "We could not send your submission due to a technical problem. Please try again shortly.",
    values,
  };
}

function toObject(formData: FormData): Record<string, string> {
  const obj: Record<string, string> = {};
  formData.forEach((value, key) => {
    if (typeof value === "string") obj[key] = value;
  });
  return obj;
}

/** Values safe to echo back to the form (no anti-spam fields, length-capped). */
function echo(raw: Record<string, string>): FormValues {
  const out: FormValues = {};
  for (const [k, v] of Object.entries(raw)) {
    if (k === "website" || k === "startedAt" || k.startsWith("$")) continue;
    out[k] = v.slice(0, 4000);
  }
  return out;
}

export async function submitContact(_prev: FormState, formData: FormData): Promise<FormState> {
  const limit = rateLimit(await clientKey("contact"), LIMIT, WINDOW_MS);
  if (!limit.ok)
    return {
      status: "rate-limited",
      message: "Too many submissions. Please wait a few minutes and try again.",
      values: echo(toObject(formData)),
    };

  const raw = toObject(formData);
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: "invalid",
      message: "Please correct the highlighted fields.",
      fieldErrors: fieldErrorsFrom(parsed.error),
      values: echo(raw),
    };
  }
  const d = parsed.data;
  if (looksLikeBot(d.website, d.startedAt)) return botResponse;

  return finish(
    {
      kind: "contact",
      email: d.email,
      name: d.fullName,
      subject: `${d.interest} inquiry from ${d.fullName} (${d.organization})`,
      fields: {
        Name: d.fullName,
        Email: d.email,
        Organization: d.organization,
        "Job title": d.jobTitle || "—",
        "Area of interest": d.interest,
        "Organization size": d.organizationSize || "—",
        Message: d.message,
        "Marketing consent (CASL)": d.consentMarketing ? "Yes" : "No",
      },
      consentMarketing: d.consentMarketing,
      submittedAt: new Date().toISOString(),
    },
    "Thank you. Your message has been received and we will respond within two business days.",
    echo(raw),
  );
}

export async function submitInterest(_prev: FormState, formData: FormData): Promise<FormState> {
  const limit = rateLimit(await clientKey("interest"), LIMIT, WINDOW_MS);
  if (!limit.ok)
    return {
      status: "rate-limited",
      message: "Too many submissions. Please wait a few minutes and try again.",
      values: echo(toObject(formData)),
    };

  const raw = toObject(formData);
  const parsed = interestSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: "invalid",
      message: "Please correct the highlighted fields.",
      fieldErrors: fieldErrorsFrom(parsed.error),
      values: echo(raw),
    };
  }
  const d = parsed.data;
  if (looksLikeBot(d.website, d.startedAt)) return botResponse;

  return finish(
    {
      kind: "academy-interest",
      email: d.email,
      subject: `Academy interest: ${d.topic}`,
      fields: { Email: d.email, Topic: d.topic, "Marketing consent (CASL)": "Yes" },
      consentMarketing: true,
      submittedAt: new Date().toISOString(),
    },
    "Thank you. We will let you know when this becomes available.",
    echo(raw),
  );
}

export async function submitAssessmentLead(_prev: FormState, formData: FormData): Promise<FormState> {
  const limit = rateLimit(await clientKey("assessment"), LIMIT, WINDOW_MS);
  if (!limit.ok)
    return {
      status: "rate-limited",
      message: "Too many submissions. Please wait a few minutes and try again.",
      values: echo(toObject(formData)),
    };

  const raw = toObject(formData);
  const parsed = assessmentLeadSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: "invalid",
      message: "Please correct the highlighted fields.",
      fieldErrors: fieldErrorsFrom(parsed.error),
      values: echo(raw),
    };
  }
  const d = parsed.data;
  if (looksLikeBot(d.website, d.startedAt)) return botResponse;

  return finish(
    {
      kind: "assessment-results",
      email: d.email,
      name: d.fullName || undefined,
      subject: `AI readiness results request${d.organization ? ` (${d.organization})` : ""}`,
      fields: {
        Email: d.email,
        Name: d.fullName || "—",
        Organization: d.organization || "—",
        Results: d.summary,
        "Marketing consent (CASL)": d.consentMarketing ? "Yes" : "No",
      },
      consentMarketing: d.consentMarketing,
      submittedAt: new Date().toISOString(),
    },
    "Thank you. We have received your request and will follow up by email.",
    echo(raw),
  );
}
