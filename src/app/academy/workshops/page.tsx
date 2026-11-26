import type { Metadata } from "next";
import { workshops } from "@/content/academy";
import { FinalCta, PageHero } from "@/components/sections/shared";
import { AcademyNav } from "@/components/sections/academy";
import { ButtonLink, Container, Section, StatusBadge } from "@/components/ui/primitives";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Executive AI Workshops & Corporate Training",
  description:
    "Executive AI briefings, AI opportunity labs, board AI governance sessions and workflow redesign sprints — facilitated workshops delivered on request.",
  path: "/academy/workshops",
  keywords: ["AI training for executives", "Executive AI workshop", "Corporate AI training", "AI governance for boards"],
});

export default function WorkshopsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Academy", path: "/academy" },
          { name: "Workshops", path: "/academy/workshops" },
        ]}
        eyebrow="Praxis Academy · Workshops"
        title="Working sessions, not lectures."
        lead="Each workshop is built around your organization’s real decisions and workflows, and tailored to your context before delivery. All are available on request."
      />
      <Section>
        <Container>
          <ul className="space-y-6">
            {workshops.map((w) => (
              <li
                key={w.id}
                id={w.id}
                className="grid gap-8 rounded-2xl border border-ink/10 bg-white p-7 sm:p-9 lg:grid-cols-[1.2fr_0.8fr]"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <StatusBadge tone="teal">Available on request</StatusBadge>
                    <span className="text-sm text-ink-muted">{w.format}</span>
                  </div>
                  <h2 className="mt-4 text-2xl font-bold sm:text-3xl">{w.title}</h2>
                  <p className="mt-1 text-sm font-medium text-ink-muted">For: {w.audience}</p>
                  <p className="mt-4 text-lg leading-relaxed text-ink-muted">{w.summary}</p>
                </div>
                <div className="flex flex-col justify-between gap-6 border-t border-rule pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
                  <div>
                    <p className="font-display text-xs font-semibold tracking-[0.16em] text-teal-ink uppercase">Outcomes</p>
                    <ul className="mt-3 space-y-2">
                      {w.outcomes.map((o) => (
                        <li key={o} className="flex gap-2.5 text-ink">
                          <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-sm bg-blue-ink" />
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <ButtonLink href="/contact" variant="secondary" arrow className="self-start">
                    Enquire about this workshop
                  </ButtonLink>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-16">
            <AcademyNav current="/academy/workshops" />
          </div>
        </Container>
      </Section>
      <FinalCta
        title="Bring a workshop to your team."
        lead="Tell us about your audience and goals, and we will propose a format that fits."
      />
    </>
  );
}
