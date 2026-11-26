import type { Metadata } from "next";
import { site } from "@/content/site";
import { PageHero } from "@/components/sections/shared";
import { ContactForm } from "@/components/forms/contact-form";
import { Container, Section, TextLink } from "@/components/ui/primitives";
import { isDeliveryConfigured } from "@/lib/integrations/delivery";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact — Let’s Talk AI",
  description:
    "Talk to Praxis Intelligence about AI advisory, AI consulting, corporate AI training, executive workshops or speaking engagements.",
  path: "/contact",
  keywords: ["AI consulting Canada", "AI consulting Ontario", "AI advisory services"],
});

const expectations = [
  { title: "A considered reply", text: "A response from a person — not an automated sequence — usually within two business days." },
  { title: "An exploratory conversation", text: "A short call to understand your goals and whether we are the right fit. No obligation." },
  { title: "A clear next step", text: "If there is a fit, a proposed approach with scope, outcomes and measures." },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Contact", path: "/contact" }]}
        eyebrow="Let’s Talk AI"
        title="Start with the right conversation."
        lead="Tell us what you are working on. Whether it is strategy, implementation or capability building, we will help you find the right path forward."
      />
      <Section>
        <Container className="grid gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
          <div className="rounded-2xl border border-ink/10 bg-white p-6 sm:p-10">
            <h2 className="text-2xl font-bold">Send us a message</h2>
            <div className="mt-8">
              <ContactForm deliveryEnabled={isDeliveryConfigured()} />
            </div>
          </div>
          <aside aria-labelledby="expect-heading" className="space-y-10">
            <div>
              <h2 id="expect-heading" className="font-display text-xl font-bold">
                What to expect
              </h2>
              <ol className="mt-6 space-y-6">
                {expectations.map((e, i) => (
                  <li key={e.title} className="grid grid-cols-[2.5rem_1fr]">
                    <span className="font-display font-bold text-blue-ink">0{i + 1}</span>
                    <div>
                      <p className="font-semibold">{e.title}</p>
                      <p className="mt-1 text-ink-muted">{e.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-2xl bg-midnight p-7 text-paper">
              <p className="font-display text-lg font-semibold">Not ready to talk yet?</p>
              <p className="mt-2 text-mist">
                Take the free AI Readiness Assessment for an indicative view of where your organization stands.
              </p>
              <TextLink href="/ai-readiness" tone="dark" className="mt-5">
                Start the assessment
              </TextLink>
            </div>
            <div>
              <p className="font-display text-lg font-semibold">Prefer email?</p>
              <p className="mt-2 text-ink-muted">
                Write to{" "}
                <a href={`mailto:${site.email}`} className="font-semibold text-blue-ink underline underline-offset-4">
                  {site.email}
                </a>
                .
              </p>
              <p className="mt-6 font-display text-lg font-semibold">Elsewhere</p>
              <div className="mt-3 flex flex-col gap-2">
                <TextLink href={site.founder.linkedin}>LinkedIn</TextLink>
                <TextLink href={site.founder.blog}>Founder’s blog</TextLink>
              </div>
            </div>
          </aside>
        </Container>
      </Section>
    </>
  );
}
