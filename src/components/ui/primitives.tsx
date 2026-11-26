import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-site px-5 sm:px-8", className)} {...props} />;
}

type Tone = "light" | "dark";

export function Section({ className, tone = "light", children, ...props }: ComponentProps<"section"> & { tone?: Tone | "warm" }) {
  return (
    <section
      className={cn(
        "py-20 sm:py-28",
        tone === "dark" && "dark-surface bg-midnight text-paper",
        tone === "warm" && "bg-paper-warm",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}

export function Eyebrow({ children, tone = "light", className }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <p
      className={cn(
        "font-display text-xs font-semibold tracking-[0.18em] uppercase",
        tone === "dark" ? "text-teal" : "text-teal-ink",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "light",
  align = "left",
  as: As = "h2",
  className,
  id,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: Tone;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
  id?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <As
        id={id}
        className={cn(
          "mt-4 font-bold",
          As === "h1" ? "text-display" : "text-3xl leading-[1.12] sm:text-[2.6rem]",
          tone === "dark" ? "text-paper" : "text-ink",
        )}
      >
        {title}
      </As>
      {lead && <p className={cn("mt-6 text-lg leading-relaxed sm:text-xl", tone === "dark" ? "text-mist" : "text-ink-muted")}>{lead}</p>}
    </div>
  );
}

type ButtonVariant = "primary" | "secondary" | "ghost";

const buttonBase =
  "group inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-[0.95rem] font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";

export function buttonClasses(variant: ButtonVariant = "primary", tone: Tone = "light") {
  if (variant === "primary") {
    return cn(buttonBase, tone === "dark" ? "bg-paper text-midnight hover:bg-teal" : "bg-blue-ink text-white hover:bg-midnight");
  }
  if (variant === "secondary") {
    return cn(
      buttonBase,
      tone === "dark"
        ? "border border-paper/25 text-paper hover:border-paper/60 hover:bg-paper/5"
        : "border border-ink/15 text-ink hover:border-ink/40 hover:bg-ink/[0.03]",
    );
  }
  return cn(buttonBase, "px-0", tone === "dark" ? "text-paper hover:text-teal" : "text-blue-ink hover:text-midnight");
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  tone = "light",
  arrow = false,
  className,
  ...props
}: Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  variant?: ButtonVariant;
  tone?: Tone;
  arrow?: boolean;
}) {
  return (
    <Link href={href} className={cn(buttonClasses(variant, tone), className)} {...props}>
      {children}
      {arrow && <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />}
    </Link>
  );
}

export function TextLink({
  href,
  children,
  className,
  tone = "light",
}: {
  href: string;
  children: ReactNode;
  className?: string;
  tone?: Tone;
}) {
  const external = href.startsWith("http");
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-1.5 font-semibold underline-offset-4 hover:underline",
        tone === "dark" ? "text-teal" : "text-blue-ink",
        className,
      )}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </Link>
  );
}

export function StatusBadge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "teal" | "blue" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        tone === "neutral" && "bg-ink/[0.06] text-ink-muted",
        tone === "teal" && "bg-teal-ink/10 text-teal-ink",
        tone === "blue" && "bg-blue-ink/10 text-blue-ink",
      )}
    >
      {children}
    </span>
  );
}

export function Notice({ children, title, className }: { children: ReactNode; title?: string; className?: string }) {
  return (
    <div
      role="note"
      className={cn("rounded-xl border border-amber-300 bg-amber-50 px-5 py-4 text-sm leading-relaxed text-amber-950", className)}
    >
      {title && <p className="font-semibold">{title}</p>}
      <div className={title ? "mt-1" : undefined}>{children}</div>
    </div>
  );
}
