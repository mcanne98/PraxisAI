import type { Metadata } from "next";
import { getPractice } from "@/content/practices";
import { PracticeOverview } from "@/components/sections/practice-page";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { pageMetadata } from "@/lib/seo";

const practice = getPractice("consulting");

export const metadata: Metadata = pageMetadata({ ...practice.seo, path: "/consulting" });

const principles = [
  { title: "Workflow first", text: "We start from the work and the outcome, then choose the technology — never the reverse." },
  {
    title: "Context is engineered",
    text: "Reliable AI depends on structured knowledge and context. We treat it as a deliverable, not a side effect.",
  },
  { title: "Measured from day one", text: "Every initiative has a baseline, so value is demonstrated rather than claimed." },
  {
    title: "Built to hand over",
    text: "Documentation and enablement are part of delivery, so your teams can run and extend what we build.",
  },
];

export default function ConsultingPage() {
  return (
    <PracticeOverview practice={practice}>
      <Section tone="dark" aria-labelledby="principles-heading">
        <Container>
          <SectionHeading id="principles-heading" tone="dark" eyebrow="Delivery principles" title="How we build." />
          <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-paper/10 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p) => (
              <li key={p.title} className="bg-midnight p-7">
                <p className="font-display text-lg font-semibold text-paper">{p.title}</p>
                <p className="mt-3 leading-relaxed text-mist">{p.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </PracticeOverview>
  );
}
