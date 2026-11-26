import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { audiences } from "@/content/audiences";
import { learningCategories, statusLabel } from "@/content/academy";
import { sortedInsights, insightCategories } from "@/content/insights";
import { HeroVisual } from "@/components/home/hero-visual";
import { PracticeCards } from "@/components/home/practice-cards";
import { PraxisMethod } from "@/components/home/praxis-method";
import { FinalCta, FounderIntro, InsightCard } from "@/components/sections/shared";
import { ButtonLink, Container, Eyebrow, Section, SectionHeading, StatusBadge, TextLink } from "@/components/ui/primitives";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata, professionalServiceJsonLd } from "@/lib/seo";
import { getBlogPosts } from "@/lib/blog-feed";

export const metadata: Metadata = {
  ...pageMetadata({
    title: `${site.name} — AI Advisory, Consulting & Education`,
    description:
      "AI consulting, advisory and executive education in Ontario, Canada. Praxis Intelligence helps organizations move beyond AI experimentation to measurable business outcomes.",
    path: "/",
    keywords: [
      "AI consulting Canada",
      "AI consulting Ontario",
      "AI advisory services",
      "AI transformation consulting",
      "AI training for executives",
    ],
  }),
  title: { absolute: `${site.name} — AI Advisory, Consulting & Education` },
};

const gaps = [
  { label: "Strategy", text: "Clarity on where AI creates value — and where it doesn’t." },
  { label: "Capability", text: "People who can use AI with judgement, not just access." },
  { label: "Operating model", text: "Ownership, governance and decision rights that scale." },
  { label: "Execution", text: "Workflows redesigned and measured, not tools deployed." },
];

export default async function HomePage() {
  const latest = sortedInsights().slice(0, 3);
  const [latestPost] = await getBlogPosts();

  return (
    <>
      <JsonLd data={professionalServiceJsonLd()} />

      {/* 1 — Hero */}
      <section className="dark-surface grid-texture relative overflow-hidden bg-midnight text-paper">
        <span aria-hidden className="pointer-events-none absolute -top-32 left-[-10%] size-[560px] rounded-full bg-blue/20 blur-[130px]" />
        <Container className="relative grid items-center gap-14 pt-16 pb-20 sm:pt-24 sm:pb-28 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="font-display text-sm font-semibold tracking-[0.16em] text-teal uppercase">{site.tagline}</p>
            <h1 className="mt-5 text-display font-bold">
              Intelligence is only valuable when it creates <span className="text-blue-soft">impact.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-mist sm:text-xl">
              Praxis Intelligence helps organizations and individuals move beyond AI experimentation through strategic advisory, practical
              implementation and transformative education.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={site.cta.start.href} tone="dark" arrow>
                {site.cta.start.label}
              </ButtonLink>
              <ButtonLink href={site.cta.secondary.href} tone="dark" variant="secondary">
                {site.cta.secondary.label}
              </ButtonLink>
            </div>
          </div>
          <HeroVisual />
        </Container>
      </section>

      {/* 2 — The challenge */}
      <Section aria-labelledby="challenge-heading">
        <Container className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <Eyebrow>The AI transformation challenge</Eyebrow>
            <h2 id="challenge-heading" className="mt-4 text-3xl leading-[1.12] font-bold sm:text-[2.6rem]">
              The challenge isn’t accessing AI. It’s knowing what to do with it.
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-muted">
              <p>
                Almost every organization now has access to capable AI tools. Far fewer have turned that access into lasting value. Licences
                are bought, pilots are launched, and a year later the way work gets done has barely changed.
              </p>
              <p>
                The constraint is rarely the technology. It is the strategy to focus it, the capabilities to use it well, the operating
                model to govern it and the discipline to redesign real work around it.
              </p>
              <p className="font-medium text-ink">
                Praxis Intelligence works in the gap between technological possibility and organizational capability.
              </p>
            </div>
          </div>
          <div className="self-end">
            <p className="font-display text-sm font-semibold text-ink-muted">What sits between access and impact</p>
            <dl className="mt-5 divide-y divide-rule border-y border-rule">
              {gaps.map((g, i) => (
                <div key={g.label} className="grid grid-cols-[3rem_1fr] gap-x-2 py-5">
                  <dt className="font-display text-sm font-bold text-blue-ink">0{i + 1}</dt>
                  <dd>
                    <span className="font-display text-lg font-semibold text-ink">{g.label}</span>
                    <span className="mt-1 block text-ink-muted">{g.text}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      {/* 3 — Practices */}
      <Section tone="dark" id="practices" aria-labelledby="practices-heading">
        <Container>
          <SectionHeading
            id="practices-heading"
            tone="dark"
            eyebrow="Three practices, one journey"
            title="Lead. Build. Learn."
            lead="Strategy without capability stalls. Capability without strategy drifts. Our three practices are designed to work together — or on their own, where you need them most."
          />
          <div className="mt-14">
            <PracticeCards />
          </div>
        </Container>
      </Section>

      {/* 4 — The Praxis Method */}
      <Section aria-labelledby="method-heading">
        <Container>
          <SectionHeading
            id="method-heading"
            eyebrow="The Praxis Method"
            title="Transformation is a cycle, not a project."
            lead="Five stages that turn understanding into results — and results into the next round of learning. Each pass raises your organization’s baseline."
          />
          <div className="mt-16">
            <PraxisMethod />
          </div>
          <div className="mt-12">
            <TextLink href="/insights/the-praxis-method">Read about the Praxis Method</TextLink>
          </div>
        </Container>
      </Section>

      {/* 5 — Who we help */}
      <Section tone="warm" aria-labelledby="audiences-heading">
        <Container>
          <SectionHeading id="audiences-heading" eyebrow="Who we help" title="Different starting points. The same goal: impact." />
          <ul className="mt-14 grid gap-x-12 md:grid-cols-2">
            {audiences.map((a) => (
              <li key={a.id} className="group relative border-t border-ink/15 py-8">
                <h3 className="flex items-start justify-between gap-4 text-xl font-bold">
                  <Link href={a.href} className="group-hover:text-blue-ink after:absolute after:inset-0">
                    {a.title}
                  </Link>
                  <ArrowUpRight aria-hidden className="mt-1 size-5 shrink-0 text-ink-muted transition-colors group-hover:text-blue-ink" />
                </h3>
                <p className="mt-3 text-ink-muted">
                  <span className="font-semibold text-ink">The challenge: </span>
                  {a.challenge}
                </p>
                <p className="mt-2 text-ink-muted">
                  <span className="font-semibold text-ink">How we help: </span>
                  {a.howWeHelp}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 6 — Academy */}
      <Section aria-labelledby="academy-heading">
        <Container className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <SectionHeading
              id="academy-heading"
              eyebrow="Praxis Academy"
              title="Build the capabilities to lead in an AI-first world."
              lead="Executive workshops and corporate programs are available today on request. Self-paced courses and learning resources are in development."
            />
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/academy" arrow>
                Explore the Academy
              </ButtonLink>
              <ButtonLink href="/academy#register-interest" variant="secondary">
                Register interest
              </ButtonLink>
            </div>
          </div>
          <ul className="divide-y divide-rule border-y border-rule">
            {learningCategories.map((c) => (
              <li key={c.id} className="flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <div>
                  <p className="font-display text-lg font-semibold">{c.title}</p>
                  <p className="text-sm text-ink-muted">{c.summary}</p>
                </div>
                <StatusBadge tone={c.status === "available-on-request" ? "teal" : "neutral"}>{statusLabel[c.status]}</StatusBadge>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 7 — Insights */}
      <Section tone="warm" aria-labelledby="insights-heading">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              id="insights-heading"
              eyebrow="Insights"
              title="Frameworks and perspectives for leaders."
              lead={`We write about ${insightCategories.slice(0, 4).join(", ").toLowerCase()} and the future of work.`}
            />
            <TextLink href="/insights" className="shrink-0">
              All insights
            </TextLink>
          </div>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {latest.map((insight) => (
              <InsightCard key={insight.slug} insight={insight} />
            ))}
          </div>
          <div className="mt-14 flex flex-col gap-4 rounded-2xl border border-ink/10 bg-paper p-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-ink-muted">
              <span className="font-semibold text-ink">More from the founder.</span> Cedric Anne writes <em>AI, Myself &amp; I</em>, a
              weekly newsletter on leading through the AI shift.
              {latestPost && (
                <>
                  {" "}
                  Latest:{" "}
                  <a href={latestPost.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink hover:text-blue-ink">
                    {latestPost.title}
                    <span className="sr-only"> (opens blog.cedricanne.com in a new tab)</span>
                  </a>
                </>
              )}
            </p>
            <TextLink href={site.founder.blog} className="shrink-0">
              Visit the blog
            </TextLink>
          </div>
        </Container>
      </Section>

      {/* 8 — Founder */}
      <FounderIntro />

      {/* 9 — Final CTA */}
      <FinalCta />
    </>
  );
}
