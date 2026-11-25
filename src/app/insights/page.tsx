import type { Metadata } from "next";
import { Suspense } from "react";
import { insightCategories, sortedInsights } from "@/content/insights";
import { site } from "@/content/site";
import { FinalCta, InsightCard, PageHero } from "@/components/sections/shared";
import { Container, Section, SectionHeading, TextLink } from "@/components/ui/primitives";
import { getBlogPosts } from "@/lib/blog-feed";
import { formatDate } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Insights: AI Leadership, Strategy & Transformation",
  description:
    "Frameworks and perspectives on AI leadership, agentic AI, enterprise transformation, Knowledge Protocol Engineering, healthcare AI and the future of work.",
  path: "/insights",
  keywords: ["AI leadership", "Enterprise AI strategy", "Agentic AI", "AI transformation"],
});

async function BlogPosts() {
  const posts = await getBlogPosts();
  if (posts.length === 0) {
    return (
      <p className="text-lg leading-relaxed text-ink-muted">
        Cedric Anne publishes longer-form thinking on AI leadership, agentic AI and enterprise transformation. Articles are published on,
        and remain canonical at, blog.cedricanne.com.
      </p>
    );
  }
  return (
    <ul className="divide-y divide-rule border-y border-rule">
      {posts.map((p) => (
        <li key={p.url} className="py-5">
          <a href={p.url} target="_blank" rel="noopener noreferrer" className="font-display text-lg font-semibold hover:text-blue-ink">
            {p.title}
            <span className="sr-only"> (opens blog.cedricanne.com in a new tab)</span>
          </a>
          {p.published && <p className="mt-1 text-sm text-ink-muted">{formatDate(p.published)}</p>}
          {p.summary && <p className="mt-1.5 text-ink-muted">{p.summary}</p>}
        </li>
      ))}
    </ul>
  );
}

export default function InsightsPage() {
  const all = sortedInsights();
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Insights", path: "/insights" }]}
        eyebrow="Insights"
        title="Clear thinking about AI, for people who have to act on it."
        lead="Frameworks, perspectives and practical guidance on leading and building with AI."
      >
        <ul className="mt-10 flex flex-wrap gap-2" aria-label="Topics we write about">
          {insightCategories.map((c) => (
            <li key={c} className="rounded-full border border-paper/15 px-3.5 py-1.5 text-sm text-paper/85">
              {c}
            </li>
          ))}
        </ul>
      </PageHero>

      <Section aria-labelledby="frameworks-heading">
        <Container>
          <SectionHeading id="frameworks-heading" eyebrow="Praxis frameworks" title="From the Praxis Intelligence team." />
          <div className="mt-14 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {all.map((insight) => (
              <InsightCard key={insight.slug} insight={insight} />
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="warm" aria-labelledby="blog-heading">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionHeading id="blog-heading" eyebrow="From the founder" title="Thought leadership by Cedric Anne." />
            <TextLink href={site.founder.blog} className="mt-8">
              Read the blog
            </TextLink>
          </div>
          <Suspense fallback={<p className="text-ink-muted">Loading recent articles…</p>}>
            <BlogPosts />
          </Suspense>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
