import { z } from "zod";
import { interestAreas, organizationSizes } from "./options";

/** Removes control characters (except newlines/tabs) and trims. */
export function clean(value: string): string {
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();
}

const text = (max: number) =>
  z
    .string()
    .transform(clean)
    .pipe(z.string().max(max, `Please keep this under ${max} characters.`));

const requiredText = (label: string, max: number) =>
  z
    .string()
    .transform(clean)
    .pipe(z.string().min(1, `${label} is required.`).max(max, `Please keep this under ${max} characters.`));

const email = z
  .string()
  .transform((v) => clean(v).toLowerCase())
  .pipe(z.email("Please enter a valid email address.").max(254));

export { interestAreas, organizationSizes };

const checkbox = z.preprocess((v) => v === true || v === "on" || v === "true", z.boolean());

/** Shared anti-spam fields. `website` is a honeypot and must stay empty. */
const antiSpam = {
  website: z.string().max(0).optional().or(z.literal("")),
  startedAt: z.coerce.number().int().nonnegative(),
};

export const contactSchema = z.object({
  fullName: requiredText("Full name", 120),
  email,
  organization: requiredText("Organization", 160),
  jobTitle: text(120).optional().default(""),
  interest: z.enum(interestAreas, { error: "Please choose an area of interest." }),
  organizationSize: z.enum(organizationSizes).or(z.literal("")).optional().default(""),
  message: z.string().transform(clean).pipe(z.string().min(20, "Please share a little more detail (at least 20 characters).").max(4000)),
  consentContact: checkbox.refine((v) => v, "Please confirm we may use these details to respond."),
  consentMarketing: checkbox.optional().default(false),
  ...antiSpam,
});

export type ContactInput = z.infer<typeof contactSchema>;

export const interestSchema = z.object({
  email,
  topic: requiredText("Topic", 80),
  consentMarketing: checkbox.refine((v) => v, "Please confirm you would like to receive updates."),
  ...antiSpam,
});

export type InterestInput = z.infer<typeof interestSchema>;

export const assessmentLeadSchema = z.object({
  email,
  fullName: text(120).optional().default(""),
  organization: text(160).optional().default(""),
  summary: z.string().max(2000),
  consentContact: checkbox.refine((v) => v, "Please confirm we may email you your results."),
  consentMarketing: checkbox.optional().default(false),
  ...antiSpam,
});

export type AssessmentLeadInput = z.infer<typeof assessmentLeadSchema>;

export type FieldErrors = Record<string, string>;

export function fieldErrorsFrom(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
