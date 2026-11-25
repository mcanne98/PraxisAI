import type { FieldErrors } from "@/lib/validation/schemas";

export type FormState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "invalid"; message: string; fieldErrors: FieldErrors; values?: FormValues }
  | { status: "not-configured"; message: string; values?: FormValues }
  | { status: "rate-limited"; message: string; values?: FormValues }
  | { status: "error"; message: string; values?: FormValues };

/** Submitted values echoed back so fields can be refilled after React resets the form. */
export type FormValues = Record<string, string>;

export const idleState: FormState = { status: "idle" };

/** Submissions faster than this after render are treated as bots. */
export const MIN_FILL_MS = 2500;
