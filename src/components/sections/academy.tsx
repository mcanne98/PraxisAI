import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { learningCategories } from "@/content/academy";
import { InterestForm } from "@/components/forms/interest-form";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { isDeliveryConfigured } from "@/lib/integrations/delivery";

export const academyNav = [
  {
    label: "Courses",
    href: "/academy/courses",
    summary: "Learning paths across seven categories — tailored programs today, self-paced courses in development.",
  },
  {
    label: "Workshops",
    href: "/academy/workshops",
    summary: "Facilitated sessions for executive and operational teams, delivered on request.",
  },
  { label: "Resources", href: "/academy/resources", summary: "Frameworks, playbooks and tools that turn concepts into practice." },
];

export function AcademyNav({ current }: { current?: string }) {
  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {academyNav.map((item) => {
        const active = item.href === current;
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className="group flex h-full flex-col rounded-2xl border border-ink/10 bg-paper p-6 transition-colors hover:border-blue-ink aria-[current=page]:border-blue-ink"
            >
              <span className="flex items-center justify-between font-display text-xl font-semibold">
                {item.label}
                <ArrowUpRight aria-hidden className="size-5 text-ink-muted group-hover:text-blue-ink" />
              </span>
              <span className="mt-2 text-ink-muted">{item.summary}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function RegisterInterest({ heading = "Be first to know." }: { heading?: string }) {
  const topics = [...learningCategories.map((c) => c.title), "Workshops", "Playbooks and resources"];
  return (
    <Section tone="warm" id="register-interest" aria-labelledby="interest-heading">
      <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <SectionHeading
          id="interest-heading"
          eyebrow="Register interest"
          title={heading}
          lead="Self-paced courses and downloadable resources are in development. Leave your email and we will tell you when the topics you care about become available — nothing else unless you ask."
        />
        <div className="rounded-2xl border border-ink/10 bg-paper p-6 sm:p-8">
          <InterestForm topics={topics} deliveryEnabled={isDeliveryConfigured()} />
        </div>
      </Container>
    </Section>
  );
}
