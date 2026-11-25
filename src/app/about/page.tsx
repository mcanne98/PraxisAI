import type { Metadata } from "next";
import { site } from "@/content/site";
import { founder } from "@/content/founder";
import { FinalCta, FounderPortrait, PageHero } from "@/components/sections/shared";
import { PraxisMethodList } from "@/components/home/praxis-method-list";
import { Container, Eyebrow, Notice, Section, SectionHeading, TextLink } from "@/components/ui/primitives";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About Praxis Intelligence",
  description:
    "Praxis Intelligence bridges the gap between AI knowledge, strategic ambition and real-world execution through advisory, consulting and education. Founded by Cedric Anne.",
  path: "/about",
});

const beliefs = [
  {
    title: "Capability over technology",
    text: "AI transformation is a capability-building journey involving people, process, technology, leadership and culture. Tools are the easy part.",
  },
  {
    title: "Outcomes over activity",
    text: "Pilots, licences and training hours are inputs. We measure success by what changes in the business.",
  },
  {
    title: "Understanding before action",
    text: "Shared understanding is the cheapest risk control there is. Good decisions start with clear thinking.",
  },
  {
    title: "Human judgement stays central",
    text: "AI should extend what people can do. Accountability for decisions remains with people.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "About", path: "/about" }]}
        eyebrow="About"
        title="Knowledge creates potential. Praxis turns it into impact."
        lead="Praxis is the process of turning knowledge, theory and ideas into meaningful action. It is also the gap most organizations face with AI today."
      />

      <Section aria-labelledby="purpose-heading">
        <Container className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Eyebrow>Why we exist</Eyebrow>
            <h2 id="purpose-heading" className="mt-4 text-3xl leading-[1.12] font-semibold sm:text-[2.6rem]">
              Between understanding AI and applying it.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-muted">
              Praxis Intelligence exists to bridge the gap between understanding artificial intelligence and successfully applying it to
              create measurable business outcomes. We help organizations understand AI, identify where it creates value, develop the
              capabilities to adopt it and translate intelligence into results.
            </p>
          </div>
          <dl className="space-y-8">
            <div className="border-t border-ink/15 pt-6">
              <dt className="font-display text-xs font-semibold tracking-[0.18em] text-teal-ink uppercase">Vision</dt>
              <dd className="mt-3 font-serif text-2xl leading-snug text-ink">
                A world where people and organizations confidently harness artificial intelligence to realize their full potential.
              </dd>
            </div>
            <div className="border-t border-ink/15 pt-6">
              <dt className="font-display text-xs font-semibold tracking-[0.18em] text-teal-ink uppercase">Mission</dt>
              <dd className="mt-3 font-serif text-2xl leading-snug text-ink">
                To bridge the gap between AI knowledge, strategic ambition and real-world execution through education, advisory and
                technology solutions.
              </dd>
            </div>
          </dl>
        </Container>
      </Section>

      <Section tone="dark" aria-labelledby="beliefs-heading">
        <Container>
          <SectionHeading id="beliefs-heading" tone="dark" eyebrow="What we believe" title="Four principles behind every engagement." />
          <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-paper/10 sm:grid-cols-2">
            {beliefs.map((b, i) => (
              <li key={b.title} className="bg-midnight p-8">
                <span className="font-display text-sm font-bold text-teal">0{i + 1}</span>
                <p className="mt-3 font-display text-xl font-semibold text-paper">{b.title}</p>
                <p className="mt-3 leading-relaxed text-mist">{b.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section aria-labelledby="method-heading">
        <Container>
          <SectionHeading
            id="method-heading"
            eyebrow="How we work"
            title="The Praxis Method."
            lead="A five-stage cycle that connects our advisory, consulting and education work."
          />
          <div className="mt-12">
            <PraxisMethodList />
          </div>
        </Container>
      </Section>

      <Section tone="warm" id="founder" aria-labelledby="founder-heading">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <FounderPortrait className="mx-auto w-full max-w-sm lg:sticky lg:top-28 lg:self-start" />
          <div>
            <Eyebrow>Founder</Eyebrow>
            <h2 id="founder-heading" className="mt-4 text-3xl font-semibold sm:text-[2.6rem]">
              {founder.name}
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-muted">
              {founder.longBio.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <blockquote className="mt-8 border-l-2 border-blue-ink pl-5 font-serif text-2xl leading-snug text-ink italic">
              {founder.philosophy}
            </blockquote>
            <h3 className="mt-10 font-display text-sm font-semibold text-ink">Areas of focus</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {founder.expertise.map((e) => (
                <li key={e} className="rounded-full border border-ink/15 bg-paper px-3.5 py-1.5 text-sm">
                  {e}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
              <TextLink href={site.founder.linkedin}>Connect on LinkedIn</TextLink>
              <TextLink href={site.founder.blog}>Read the blog</TextLink>
            </div>
            {founder.bioIsPlaceholder && (
              <Notice className="mt-8" title="Pending approval">
                This biography is drafted from the project brief and intentionally omits employers, titles, dates and credentials. Replace
                it with an approved biography and photograph before launch.
              </Notice>
            )}
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
