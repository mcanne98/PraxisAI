"use client";

import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import type { FormState, FormValues } from "@/lib/forms/types";
import { buttonClasses } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

const ValuesContext = createContext<FormValues>({});

/** Refills fields with previously submitted values (React resets forms after an action). */
export function FormValuesProvider({ state, children }: { state: FormState; children: ReactNode }) {
  const values = "values" in state && state.values ? state.values : {};
  return <ValuesContext.Provider value={values}>{children}</ValuesContext.Provider>;
}

function useDefault(name: string): string | undefined {
  return useContext(ValuesContext)[name];
}

const inputBase =
  "mt-2 block w-full rounded-lg border bg-white px-4 py-3 text-base text-ink placeholder:text-ink-muted/70 focus:border-blue-ink focus:ring-2 focus:ring-blue-ink/20 focus:outline-none aria-[invalid=true]:border-red-600";

type FieldProps = {
  name: string;
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  className?: string;
};

function Label({ name, label, required }: Pick<FieldProps, "name" | "label" | "required">) {
  return (
    <label htmlFor={name} className="text-sm font-semibold text-ink">
      {label}
      {required ? (
        <span className="text-red-700" aria-hidden>
          {" "}
          *
        </span>
      ) : (
        <span className="font-normal text-ink-muted"> (optional)</span>
      )}
    </label>
  );
}

function Feedback({ name, error, hint }: Pick<FieldProps, "name" | "error" | "hint">) {
  return (
    <>
      {hint && !error && (
        <p id={`${name}-hint`} className="mt-1.5 text-sm text-ink-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </>
  );
}

function describedBy(name: string, error?: string, hint?: string) {
  return error ? `${name}-error` : hint ? `${name}-hint` : undefined;
}

export function TextField({
  type = "text",
  autoComplete,
  maxLength,
  ...p
}: FieldProps & { type?: "text" | "email"; autoComplete?: string; maxLength?: number }) {
  return (
    <div className={p.className}>
      <Label {...p} />
      <input
        id={p.name}
        name={p.name}
        type={type}
        required={p.required}
        autoComplete={autoComplete}
        maxLength={maxLength}
        defaultValue={useDefault(p.name)}
        aria-invalid={p.error ? true : undefined}
        aria-describedby={describedBy(p.name, p.error, p.hint)}
        className={inputBase}
      />
      <Feedback {...p} />
    </div>
  );
}

export function TextArea({ rows = 6, maxLength, ...p }: FieldProps & { rows?: number; maxLength?: number }) {
  return (
    <div className={p.className}>
      <Label {...p} />
      <textarea
        id={p.name}
        name={p.name}
        rows={rows}
        required={p.required}
        maxLength={maxLength}
        defaultValue={useDefault(p.name)}
        aria-invalid={p.error ? true : undefined}
        aria-describedby={describedBy(p.name, p.error, p.hint)}
        className={inputBase}
      />
      <Feedback {...p} />
    </div>
  );
}

export function SelectField({ options, ...p }: FieldProps & { options: readonly string[] }) {
  return (
    <div className={p.className}>
      <Label {...p} />
      <select
        id={p.name}
        name={p.name}
        required={p.required}
        defaultValue={useDefault(p.name) ?? ""}
        aria-invalid={p.error ? true : undefined}
        aria-describedby={describedBy(p.name, p.error, p.hint)}
        className={cn(inputBase, "appearance-auto")}
      >
        <option value="" disabled={p.required}>
          {p.required ? "Select…" : "Prefer not to say"}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <Feedback {...p} />
    </div>
  );
}

export function Checkbox({ name, children, error, required }: { name: string; children: ReactNode; error?: string; required?: boolean }) {
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={name}
          name={name}
          type="checkbox"
          required={required}
          defaultChecked={useDefault(name) === "on"}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${name}-error` : undefined}
          className="mt-1 size-5 shrink-0 rounded border-ink/30 accent-blue-ink"
        />
        <label htmlFor={name} className="text-sm leading-relaxed text-ink-muted">
          {children}
        </label>
      </div>
      {error && (
        <p id={`${name}-error`} className="mt-1.5 pl-8 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

/** Honeypot + render timestamp. Hidden from people and assistive tech. */
export function AntiSpamFields() {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    // Page-load time: stable across form remounts, so corrections are never mistaken for bots.
    if (ref.current) ref.current.value = String(Math.round(performance.timeOrigin));
  }, []);
  return (
    <>
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
      <input ref={ref} type="hidden" name="startedAt" defaultValue="0" />
    </>
  );
}

export function SubmitButton({ children, className }: { children: ReactNode; className?: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} aria-disabled={pending} className={cn(buttonClasses("primary"), className)}>
      {pending && <Loader2 aria-hidden className="size-4 animate-spin" />}
      {pending ? "Sending…" : children}
    </button>
  );
}

/** Announces the result of a submission and moves focus to it. */
export function FormStatusMessage({ state }: { state: FormState }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (state.status !== "idle") ref.current?.focus();
  }, [state]);
  if (state.status === "idle") return <div ref={ref} aria-live="polite" />;
  const tone =
    state.status === "success"
      ? "border-teal-ink/30 bg-teal-ink/5 text-teal-ink"
      : state.status === "not-configured"
        ? "border-amber-300 bg-amber-50 text-amber-950"
        : "border-red-300 bg-red-50 text-red-800";
  return (
    <div
      ref={ref}
      tabIndex={-1}
      role={state.status === "success" ? "status" : "alert"}
      className={cn("rounded-lg border px-4 py-3 text-sm font-medium", tone)}
    >
      {state.message}
    </div>
  );
}

export function DeliveryNotice({ enabled }: { enabled: boolean }) {
  if (enabled) return null;
  return (
    <div role="note" className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950">
      <strong className="font-semibold">Online submissions are not enabled yet.</strong> This form validates your details but cannot send
      them until an email or CRM integration is configured.
    </div>
  );
}

export function fieldError(state: FormState, name: string): string | undefined {
  return state.status === "invalid" ? state.fieldErrors[name] : undefined;
}
