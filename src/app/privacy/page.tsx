import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Notice (Draft)",
  description: "Draft privacy notice for the Praxis Intelligence website. Pending legal review.",
  path: "/privacy",
  noIndex: true,
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Notice" path="/privacy">
      <p>
        <strong>Status:</strong> Draft · <strong>Effective date:</strong> [to be confirmed]
      </p>
      <p>
        This notice explains how [legal entity name — to be confirmed] (“Praxis Intelligence”, “we”, “us”) collects, uses and protects
        personal information through this website. We aim to handle personal information in line with Canada’s{" "}
        <em>Personal Information Protection and Electronic Documents Act</em> (PIPEDA) and applicable provincial laws.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Contact form:</strong> your name, business email, organization, and — if you choose — job title, organization size, area
          of interest and message.
        </li>
        <li>
          <strong>Academy interest registration:</strong> your email address and the topic you are interested in.
        </li>
        <li>
          <strong>AI Readiness Assessment:</strong> your answers are processed in your browser and are not sent to us. If you choose to
          request a follow-up, we receive your email, optional name and organization, and a summary of your scores.
        </li>
        <li>
          <strong>Technical information:</strong> our hosting provider may process IP addresses and standard request logs to deliver and
          secure the site. We use your IP address temporarily to limit abusive form submissions.
        </li>
      </ul>
      <p>
        Please do not submit confidential business information or sensitive personal information (such as health or financial information)
        through this website.
      </p>

      <h2>Why we use it</h2>
      <ul>
        <li>To respond to your inquiry or request.</li>
        <li>To tell you about Academy offerings you registered interest in.</li>
        <li>To send occasional insights and updates, only if you have given express consent.</li>
        <li>To keep the website secure and prevent spam.</li>
      </ul>

      <h2>Consent and commercial electronic messages</h2>
      <p>
        We ask for your consent when you submit a form. Marketing emails are sent only with your express consent, in line with Canada’s
        Anti-Spam Legislation (CASL). Every marketing email will identify us and include a working unsubscribe mechanism. You may withdraw
        consent at any time by [contact method — to be confirmed].
      </p>

      <h2>Cookies and analytics</h2>
      <p>
        This website does not currently use advertising or tracking cookies, or third-party analytics. If privacy-conscious analytics are
        introduced, this notice will be updated beforehand and consent will be requested where required.
      </p>

      <h2>Service providers and storage</h2>
      <p>
        We use service providers to host this website and to deliver form submissions, which may include [hosting provider], [email delivery
        provider] and [CRM provider]. These providers may store or process information outside Canada, including in the United States, where
        it may be subject to the laws of that jurisdiction.
      </p>

      <h2>Retention</h2>
      <p>
        We keep personal information only as long as needed for the purposes above, or as required by law. [Retention periods to be
        confirmed.]
      </p>

      <h2>Your rights</h2>
      <p>
        You may request access to, or correction of, the personal information we hold about you, and you may withdraw consent at any time,
        subject to legal or contractual restrictions.
      </p>

      <h2>Contact</h2>
      <p>
        Questions or requests about privacy: [privacy contact name and email — to be confirmed]. If you are not satisfied with our response,
        you may contact the Office of the Privacy Commissioner of Canada.
      </p>
    </LegalPage>
  );
}
