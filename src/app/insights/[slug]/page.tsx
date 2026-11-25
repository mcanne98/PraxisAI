import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getInsight, insights, sortedInsights } from "@/content/insights";
import { site } from "@/content/site";
import { FinalCta, InsightCard, PageHero } from "@/components/sections/shared";
import { Container, Section } from "@/components/ui/primitives";
import { JsonLd } from "@/components/seo/json-ld";
import { articleJsonLd, pageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) return { title: "Not found", robots: { index: false } };
  return pageMetadata({
    title: insight.title,
    description: insight.description,
    path: `/insights/${insight.slug}`,
    type: "article",
    publishedTime: insight.published,
  });
}

export default async function InsightPage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) notFound();

  const { default: Body } = await import(`@/content/insights/${insight.slug}.mdx`);
  const related = sortedInsights()
    .filter((i) => i.slug !== insight.slug)
    .slice(0, 2);
  const path = `/insights/${insight.slug}`;

  return (
    <>
      <JsonLd data={articleJsonLd({ ...insight, path })} />
      <PageHero
        breadcrumbs={[
          { name: "Insights", path: "/insights" },
          { name: insight.title, path },
        ]}
        eyebrow={insight.category}
        title={insight.title}
        lead={insight.description}
      >
        <p className="mt-8 text-sm text-mist">
          {insight.author} · <time dateTime={insight.published}>{formatDate(insight.published)}</time> · {insight.readingMinutes} min read
        </p>
      </PageHero>
      <Section>
        <Container>
          <article className="prose-praxis mx-auto max-w-[68ch]">
            <Body />
          </article>
        </Container>
      </Section>
      {related.length > 0 && (
        <Section tone="warm" aria-labelledby="related-heading">
          <Container>
            <h2 id="related-heading" className="text-2xl font-semibold">
              Continue reading
            </h2>
            <div className="mt-10 grid gap-10 md:grid-cols-2">
              {related.map((r) => (
                <InsightCard key={r.slug} insight={r} />
              ))}
            </div>
          </Container>
        </Section>
      )}
      <FinalCta title="Ready to apply this to your organization?" lead={`Talk to ${site.name} about where to start.`} />
    </>
  );
}
