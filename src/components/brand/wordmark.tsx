import { cn } from "@/lib/utils";

/**
 * The Praxis Mark: an open circle (knowledge, potential) connected by a
 * single deliberate stroke to a solid square (action, impact). It reads as
 * "theory into practice" — the literal meaning of praxis.
 */
export function PraxisMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("shrink-0", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <circle cx="10" cy="10" r="6" fill="none" stroke="currentColor" strokeWidth="2.25" />
      <path d="M14.4 14.4 L19 19" stroke="var(--color-teal)" strokeWidth="2.25" strokeLinecap="round" />
      <rect x="18" y="18" width="11" height="11" rx="1.5" fill="var(--color-blue)" />
    </svg>
  );
}

export function Wordmark({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <PraxisMark className={cn("size-7", tone === "light" ? "text-paper" : "text-ink")} />
      <span className="font-display text-[1.05rem] leading-none tracking-[-0.01em]">
        <span className={cn("font-bold", tone === "light" ? "text-paper" : "text-ink")}>Praxis</span>{" "}
        <span className={cn("font-medium", tone === "light" ? "text-mist" : "text-ink-muted")}>Intelligence</span>
      </span>
    </span>
  );
}
