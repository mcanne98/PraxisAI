import type { Metadata } from "next";
import { Assessment } from "@/components/assessment/assessment";
import { PageHero } from "@/components/sections/shared";
import { Container, Notice, Section } from "@/components/ui/primitives";
import { maturityLevels } from "@/lib/assessment/scoring";
import { dimensions, questions } from "@/lib/assessment/questions";
import { isDeliveryConfigured } from "@/lib/integrations/delivery";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Free AI Readiness Assessment",
  description:
    "A free, indicative AI readiness self-assessment across six dimensions: leadership, people, data, technology, governance and process. Instant results and tailored recommendations.",
  path: "/ai-readiness",
  keywords: ["AI readiness assessment", "AI maturity assessment", "Enterprise AI strategy"],
});

export default function AiReadinessPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "AI Readiness Assessment", path: "/ai-readiness" }]}
        eyebrow="AI Readiness Assessment"
        title="How ready is your organization to create value with AI?"
        lead={`An indicative self-assessment across six dimensions of AI readiness. ${questions.length} statements, instant results, and recommendations tailored to your scores.`}
      />
      <Section className="pt-12 sm:pt-16">
        <Container className="max-w-5xl">
          <Notice title="An indicative self-assessment" className="mb-8">
            Results reflect your own answers and are intended to prompt discussion. This is not a validated certification, benchmark or
            formal audit.
          </Notice>
          <Assessment deliveryEnabled={isDeliveryConfigured()} />
        </Container>
      </Section>
      <Section tone="warm" aria-labelledby="method-heading">
        <Container className="max-w-5xl">
          <h2 id="method-heading" className="text-3xl font-semibold">
            How scoring works
          </h2>
          <div className="mt-8 grid gap-10 lg:grid-cols-2">
            <div className="space-y-4 text-ink-muted">
              <p>
                Each of the {questions.length} statements is rated from <strong className="text-ink">1 (Not at all)</strong> to{" "}
                <strong className="text-ink">5 (Fully)</strong>. There are {questions.length / dimensions.length} statements per dimension.
              </p>
              <p>
                A <strong className="text-ink">dimension score</strong> is the average of its answers, converted to a 0–100 scale: an
                average of 1 scores 0, an average of 3 scores 50 and an average of 5 scores 100.
              </p>
              <p>
                The <strong className="text-ink">overall score</strong> is the simple average of the six dimension scores. All dimensions
                are weighted equally.
              </p>
              <p>
                <strong className="text-ink">Recommendations</strong> follow fixed rules. Each dimension has guidance for three bands —
                below 40, 40 to 69, and 70 or above — and your two lowest-scoring dimensions are shown first, because the weakest dimension
                usually limits the value of the others.
              </p>
              <p>Your answers are processed entirely in your browser. Nothing is sent to us unless you choose to share your email.</p>
            </div>
            <table className="w-full self-start text-left text-sm">
              <caption className="mb-3 text-left font-semibold text-ink">Maturity levels</caption>
              <thead>
                <tr className="border-b border-ink/15">
                  <th scope="col" className="py-2 pr-4 font-semibold">
                    Level
                  </th>
                  <th scope="col" className="py-2 pr-4 font-semibold">
                    Score
                  </th>
                  <th scope="col" className="py-2 font-semibold">
                    What it means
                  </th>
                </tr>
              </thead>
              <tbody>
                {maturityLevels.map((l, i) => {
                  const max = maturityLevels[i + 1] ? maturityLevels[i + 1].min - 1 : 100;
                  return (
                    <tr key={l.id} className="border-b border-rule align-top">
                      <th scope="row" className="py-3 pr-4 font-semibold">
                        {l.name}
                      </th>
                      <td className="py-3 pr-4 whitespace-nowrap text-ink-muted">
                        {l.min}–{max}
                      </td>
                      <td className="py-3 text-ink-muted">{l.description}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>
    </>
  );
}
