import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { resources } from "@/content/academy";
import { PageHero } from "@/components/sections/shared";
import { AcademyNav, RegisterInterest } from "@/components/sections/academy";
import { Container, Section, StatusBadge } from "@/components/ui/primitives";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "AI Frameworks, Playbooks & Tools",
  description:
    "Free AI readiness assessment, the Praxis Method framework and upcoming playbooks for AI use-case prioritization, governance and context engineering.",
  path: "/academy/resources",
  keywords: ["AI readiness assessment", "AI governance framework", "AI playbook"],
});

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Academy", path: "/academy" },
          { name: "Resources", path: "/academy/resources" },
        ]}
        eyebrow="Praxis Academy · Resources"
        title="Tools for turning ideas into practice."
        lead="Frameworks and tools you can use today, and playbooks in development. Resources marked “in development” are not yet available."
      />
      <Section>
        <Container>
          <ul className="divide-y divide-rule border-y border-rule">
            {resources.map((r) => (
              <li key={r.id} className="group relative grid gap-3 py-7 sm:grid-cols-[8rem_1fr_auto] sm:items-center sm:gap-8">
                <p className="font-display text-sm font-semibold text-teal-ink">{r.type}</p>
                <div>
                  <h2 className="text-xl font-bold">
                    {r.href ? (
                      <Link href={r.href} className="group-hover:text-blue-ink after:absolute after:inset-0">
                        {r.title}
                      </Link>
                    ) : (
                      r.title
                    )}
                  </h2>
                  <p className="mt-1.5 text-ink-muted">{r.summary}</p>
                </div>
                {r.href ? (
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-ink">
                    Available now <ArrowRight aria-hidden className="size-4" />
                  </span>
                ) : (
                  <StatusBadge>In development</StatusBadge>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-16">
            <AcademyNav current="/academy/resources" />
          </div>
        </Container>
      </Section>
      <RegisterInterest heading="Get notified when new resources are released." />
    </>
  );
}
