import type { Metadata } from "next";
import { getPractice } from "@/content/practices";
import { PracticeOverview } from "@/components/sections/practice-page";
import { AcademyNav, RegisterInterest } from "@/components/sections/academy";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { pageMetadata } from "@/lib/seo";

const practice = getPractice("academy");

export const metadata: Metadata = pageMetadata({ ...practice.seo, path: "/academy" });

export default function AcademyPage() {
  return (
    <PracticeOverview practice={practice}>
      <Section aria-labelledby="explore-heading" className="pt-0 sm:pt-0">
        <Container>
          <SectionHeading id="explore-heading" eyebrow="Explore the Academy" title="Courses, workshops and resources." />
          <div className="mt-12">
            <AcademyNav />
          </div>
        </Container>
      </Section>
      <RegisterInterest />
    </PracticeOverview>
  );
}
