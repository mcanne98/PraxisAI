import type { ReactNode } from "react";
import { PageHero } from "@/components/sections/shared";
import { Container, Notice, Section } from "@/components/ui/primitives";

export function LegalPage({ title, path, children }: { title: string; path: string; children: ReactNode }) {
  return (
    <>
      <PageHero breadcrumbs={[{ name: title, path }]} eyebrow="Legal" title={title} lead="Draft — not yet in effect." />
      <Section>
        <Container>
          <div className="mx-auto max-w-[72ch]">
            <Notice title="Draft for legal review" className="mb-10">
              This document is a working draft prepared to support website development. It has not been reviewed by a lawyer and must be
              reviewed, completed and approved before the website is published. Items in [square brackets] require confirmation.
            </Notice>
            <div className="prose-praxis">{children}</div>
          </div>
        </Container>
      </Section>
    </>
  );
}
