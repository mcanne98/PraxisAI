import type { Practice } from "@/content/practices";
import { site } from "@/content/site";
import { PageHero, FinalCta } from "@/components/sections/shared";
import { PraxisMethodList } from "@/components/home/praxis-method-list";
import { ButtonLink, Container, Eyebrow, Section, SectionHeading, TextLink } from "@/components/ui/primitives";
import { JsonLd } from "@/components/seo/json-ld";
import { serviceJsonLd } from "@/lib/seo";

/** Data-driven template shared by practice pages. */
export function PracticeOverview({ practice, children }: { practice: Practice; children?: React.ReactNode }) {
  const path = `/${practice.slug}`;
  return (
    <>
      <JsonLd
        data={serviceJsonLd(
          practice.name,
          practice.seo.description,
          path,
          practice.services.map((s) => s.title),
        )}
      />
      <PageHero
        breadcrumbs={[{ name: practice.name, path }]}
        eyebrow={`${practice.name} · ${practice.verb}`}
        title={practice.coreMessage}
        lead={practice.summary}
      >
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={site.cta.primary.href} tone="dark" arrow>
            {site.cta.primary.label}
          </ButtonLink>
          <ButtonLink href="/ai-readiness" tone="dark" variant="secondary">
            Assess your AI readiness
          </ButtonLink>
        </div>
      </PageHero>

      <Section aria-labelledby="intro-heading">
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <Eyebrow>The question we help answer</Eyebrow>
            <h2 id="intro-heading" className="mt-4 font-serif text-3xl leading-snug font-normal text-ink italic sm:text-4xl">
              “{practice.question}”
            </h2>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-ink-muted">
            {practice.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="warm" aria-labelledby="services-heading">
        <Container>
          <SectionHeading id="services-heading" eyebrow="Services" title={`What ${practice.name} covers`} />
          <dl className="mt-14 grid gap-x-12 md:grid-cols-2">
            {practice.services.map((s) => (
              <div key={s.title} className="border-t border-ink/15 py-6">
                <dt className="font-display text-lg font-semibold text-ink">{s.title}</dt>
                <dd className="mt-2 leading-relaxed text-ink-muted">{s.summary}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <Section aria-labelledby="engagement-heading">
        <Container className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading id="engagement-heading" eyebrow="How we work" title="A clear path from first conversation to results." />
            <ol className="mt-10 space-y-8">
              {practice.engagement.map((e, i) => (
                <li key={e.step} className="grid grid-cols-[3rem_1fr]">
                  <span className="font-display text-2xl font-bold text-blue-ink">0{i + 1}</span>
                  <div>
                    <p className="font-display text-xl font-semibold">{e.step}</p>
                    <p className="mt-1 text-ink-muted">{e.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-2xl bg-midnight p-8 text-paper sm:p-10">
            <p className="font-display text-xs font-semibold tracking-[0.18em] text-teal uppercase">What you walk away with</p>
            <ul className="mt-6 space-y-4">
              {practice.outcomes.map((o) => (
                <li key={o} className="flex gap-3 text-lg">
                  <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-sm bg-teal" />
                  {o}
                </li>
              ))}
            </ul>
            <p className="mt-8 border-t border-paper/10 pt-6 text-sm leading-relaxed text-mist">
              Every engagement is scoped to your context. We agree outcomes and measures up front so progress is visible, not assumed.
            </p>
          </div>
        </Container>
      </Section>

      {children}

      <Section tone="warm" aria-labelledby="method-heading">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              id="method-heading"
              eyebrow="Grounded in the Praxis Method"
              title="Part of a continuous cycle."
              lead="Every engagement maps to the Praxis Method, so work in one practice strengthens the others."
            />
            <TextLink href="/insights/the-praxis-method" className="shrink-0">
              About the method
            </TextLink>
          </div>
          <div className="mt-12">
            <PraxisMethodList />
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
