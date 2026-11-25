import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use (Draft)",
  description: "Draft terms of use for the Praxis Intelligence website. Pending legal review.",
  path: "/terms",
  noIndex: true,
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" path="/terms">
      <p>
        <strong>Status:</strong> Draft · <strong>Effective date:</strong> [to be confirmed]
      </p>
      <p>
        These terms govern your use of this website, operated by [legal entity name — to be confirmed] (“Praxis Intelligence”). By using the
        website, you agree to these terms.
      </p>

      <h2>Information only</h2>
      <p>
        Content on this website — including articles, frameworks and the AI Readiness Assessment — is provided for general information. It
        is not professional, legal, financial or technical advice for your specific circumstances, and it does not create a client
        relationship.
      </p>

      <h2>AI Readiness Assessment</h2>
      <p>
        The assessment is an indicative self-assessment based on your own answers. It is not a validated certification, benchmark or audit,
        and results should not be relied on as the sole basis for decisions.
      </p>

      <h2>Intellectual property</h2>
      <p>
        Unless otherwise stated, content on this website, including the Praxis Intelligence name, wordmark and the Praxis Method, belongs to
        [rights holder — to be confirmed]. You may share links and short quotations with attribution. Other reproduction requires
        permission.
      </p>

      <h2>External links</h2>
      <p>
        This website links to external sites we do not control, such as LinkedIn. We are not responsible for their content or practices.
      </p>

      <h2>Acceptable use</h2>
      <p>
        Do not misuse the website, including by attempting to disrupt it, submitting spam or automated form submissions, or accessing it
        unlawfully.
      </p>

      <h2>Limitation of liability</h2>
      <p>[To be drafted by counsel.]</p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of [the Province of Ontario and the federal laws of Canada applicable therein — to be
        confirmed].
      </p>

      <h2>Changes</h2>
      <p>We may update these terms. The effective date above will show when they last changed.</p>
    </LegalPage>
  );
}
