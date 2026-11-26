import type { Metadata } from "next";
import { learningCategories, statusLabel } from "@/content/academy";
import { PageHero } from "@/components/sections/shared";
import { AcademyNav, RegisterInterest } from "@/components/sections/academy";
import { ButtonLink, Container, Section, StatusBadge } from "@/components/ui/primitives";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "AI Courses & Learning Paths",
  description:
    "Praxis Academy learning paths in AI for leaders, AI fundamentals, agentic AI, prompt and context engineering, enterprise AI transformation, responsible AI and AI productivity.",
  path: "/academy/courses",
  keywords: ["AI leadership training", "Corporate AI training", "Agentic AI training", "Prompt engineering training"],
});

export default function CoursesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Academy", path: "/academy" },
          { name: "Courses", path: "/academy/courses" },
        ]}
        eyebrow="Praxis Academy · Courses"
        title="Learning paths for an AI-first world."
        lead="Seven learning paths, designed around real work. Programs marked “available on request” are delivered as tailored engagements for your organization today. Self-paced versions are in development."
      />
      <Section>
        <Container>
          <ul className="grid gap-6 md:grid-cols-2">
            {learningCategories.map((c) => (
              <li key={c.id} id={c.id} className="flex flex-col rounded-2xl border border-ink/10 bg-white p-7 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm font-medium text-ink-muted">{c.audience}</p>
                  <StatusBadge tone={c.status === "available-on-request" ? "teal" : "neutral"}>{statusLabel[c.status]}</StatusBadge>
                </div>
                <h2 className="mt-4 text-2xl font-bold">{c.title}</h2>
                <p className="mt-3 leading-relaxed text-ink-muted">{c.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${c.title} topics`}>
                  {c.topics.map((t) => (
                    <li key={t} className="rounded-full bg-paper px-3 py-1 text-sm text-ink">
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-7">
                  {c.status === "available-on-request" ? (
                    <ButtonLink href="/contact" variant="secondary" arrow>
                      Discuss a program
                    </ButtonLink>
                  ) : (
                    <ButtonLink href="#register-interest" variant="secondary">
                      Register interest
                    </ButtonLink>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-16">
            <AcademyNav current="/academy/courses" />
          </div>
        </Container>
      </Section>
      <RegisterInterest heading="Tell us what you want to learn." />
    </>
  );
}
