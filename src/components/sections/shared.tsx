import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { site } from "@/content/site";
import { founder } from "@/content/founder";
import type { Insight } from "@/content/insights";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { ButtonLink, Container, Eyebrow, Notice, Section, TextLink } from "@/components/ui/primitives";

export function PageHero({
  eyebrow,
  title,
  lead,
  breadcrumbs,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  breadcrumbs?: { name: string; path: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="dark-surface grid-texture relative overflow-hidden bg-midnight text-paper">
      <span aria-hidden className="pointer-events-none absolute -top-40 right-[-10%] size-[520px] rounded-full bg-blue/20 blur-[120px]" />
      <Container className="relative pt-14 pb-20 sm:pt-20 sm:pb-28">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        {eyebrow && (
          <Eyebrow tone="dark" className="mt-8">
            {eyebrow}
          </Eyebrow>
        )}
        <h1 className="mt-4 max-w-4xl text-display font-semibold">{title}</h1>
        {lead && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist sm:text-xl">{lead}</p>}
        {children}
      </Container>
    </section>
  );
}

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-mist">
          {all.map((item, i) => {
            const last = i === all.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="text-paper/90">
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link href={item.path} className="hover:text-paper">
                      {item.name}
                    </Link>
                    <ChevronRight aria-hidden className="size-3.5" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(all)} />
    </>
  );
}

export function InsightCard({ insight }: { insight: Insight }) {
  return (
    <article className="group relative flex h-full flex-col border-t border-ink/15 pt-6">
      <p className="text-xs font-semibold tracking-[0.14em] text-teal-ink uppercase">{insight.category}</p>
      <h3 className="mt-3 text-xl leading-snug font-semibold text-ink">
        <Link href={`/insights/${insight.slug}`} className="group-hover:text-blue-ink after:absolute after:inset-0">
          {insight.title}
        </Link>
      </h3>
      <p className="mt-3 leading-relaxed text-ink-muted">{insight.description}</p>
      <p className="mt-auto pt-5 text-sm text-ink-muted">
        <time dateTime={insight.published}>{formatDate(insight.published)}</time> · {insight.readingMinutes} min read
      </p>
    </article>
  );
}

export function FounderPortrait({ className = "" }: { className?: string }) {
  if (founder.photo) {
    return (
      <div
        className={`relative overflow-hidden rounded-2xl bg-slate-deep ${className}`}
        style={{ aspectRatio: `${founder.photo.width} / ${founder.photo.height}` }}
      >
        {/* Remote image from the founder's blog, shown uncropped at its native ratio; the box reserves space (no layout shift). */}
        {/* eslint-disable-next-line @next/next/no-img-element -- external same-owner asset; next/image optimizer not used on Workers */}
        <img
          src={founder.photo.src}
          alt={founder.photo.alt}
          width={founder.photo.width}
          height={founder.photo.height}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label="Placeholder for an approved founder photograph"
      className={`relative flex aspect-[4/5] items-end overflow-hidden rounded-2xl bg-slate-deep ${className}`}
    >
      <span aria-hidden className="grid-texture absolute inset-0" />
      <span aria-hidden className="absolute -right-16 -bottom-16 size-72 rounded-full bg-blue/30 blur-3xl" />
      <span aria-hidden className="absolute top-8 left-8 font-display text-7xl font-bold text-paper/90">
        CA
      </span>
      <span className="relative m-6 rounded-full bg-midnight/70 px-3 py-1.5 text-xs font-medium text-mist">
        Photograph pending approval
      </span>
    </div>
  );
}

export function FounderIntro() {
  return (
    <Section aria-labelledby="founder-heading">
      <Container>
        <FounderPortrait className={founder.photo ? "w-full" : "mx-auto w-full max-w-sm"} />
        <div className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <Eyebrow>Founder</Eyebrow>
            <h2 id="founder-heading" className="mt-4 text-3xl font-semibold sm:text-[2.6rem] sm:leading-[1.12]">
              {founder.name}
            </h2>
          </div>
          <div>
            <p className="text-lg leading-relaxed text-ink-muted">{founder.shortBio}</p>
            <blockquote className="mt-8 border-l-2 border-blue-ink pl-5 font-serif text-2xl leading-snug text-ink italic">
              {founder.philosophy}
            </blockquote>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              <TextLink href="/about">About Praxis Intelligence</TextLink>
              <TextLink href={site.founder.linkedin}>LinkedIn</TextLink>
              <TextLink href={site.founder.blog}>{founder.newsletter.name}</TextLink>
            </div>
            {founder.bioIsPlaceholder && (
              <Notice className="mt-8">
                Draft biography based on the project brief — pending founder review and approval before launch.
              </Notice>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function FinalCta({
  title = "Your AI journey starts with the right conversation.",
  lead = "Whether you’re defining your AI strategy, building intelligent workflows or developing your team’s capabilities, Praxis Intelligence can help you identify the right path forward.",
}: {
  title?: string;
  lead?: string;
}) {
  return (
    <Section tone="dark" className="grid-texture relative overflow-hidden" aria-labelledby="final-cta-heading">
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-[-40%] left-1/2 size-[640px] -translate-x-1/2 rounded-full bg-blue/20 blur-[140px]"
      />
      <Container className="relative text-center">
        <h2 id="final-cta-heading" className="mx-auto max-w-3xl text-4xl leading-[1.08] font-semibold sm:text-5xl">
          {title}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-mist">{lead}</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href={site.cta.primary.href} tone="dark" arrow>
            {site.cta.primary.label}
          </ButtonLink>
          <ButtonLink href="/ai-readiness" tone="dark" variant="secondary">
            Take the AI Readiness Assessment
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
