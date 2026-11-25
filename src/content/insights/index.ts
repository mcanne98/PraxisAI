/**
 * On-site Insights registry.
 *
 * Only Praxis-owned framework content lives here. The founder's personal
 * thought leadership stays canonical on blog.cedricanne.com and is linked out
 * (see src/lib/blog-feed.ts), so search engines never see duplicate copies.
 *
 * To add an article: create `<slug>.mdx` in this folder and add an entry below.
 */

export const insightCategories = [
  "AI Leadership",
  "Agentic AI",
  "Enterprise Transformation",
  "Knowledge Protocol Engineering",
  "Future of Work",
  "Healthcare AI",
  "AI Education",
] as const;

export type InsightCategory = (typeof insightCategories)[number];

export type Insight = {
  slug: string;
  title: string;
  description: string;
  category: InsightCategory;
  /** ISO date */
  published: string;
  updated?: string;
  readingMinutes: number;
  author: string;
};

export const insights: Insight[] = [
  {
    slug: "the-praxis-method",
    title: "The Praxis Method: a cycle, not a project",
    description:
      "Why AI transformation fails when it is treated as a one-time implementation, and the five-stage cycle we use to build lasting capability instead.",
    category: "Enterprise Transformation",
    published: "2026-11-24",
    readingMinutes: 6,
    author: "Praxis Intelligence",
  },
  {
    slug: "six-dimensions-of-ai-readiness",
    title: "The six dimensions of AI readiness",
    description:
      "AI readiness is not a technology question. A practical look at the six dimensions that decide whether AI investments create value.",
    category: "AI Leadership",
    published: "2026-11-24",
    readingMinutes: 7,
    author: "Praxis Intelligence",
  },
  {
    slug: "why-ai-pilots-stall",
    title: "Why AI pilots stall — and what production actually requires",
    description:
      "The gap between a promising pilot and a system the business relies on is rarely the model. It is context, process and people.",
    category: "Agentic AI",
    published: "2026-11-24",
    readingMinutes: 6,
    author: "Praxis Intelligence",
  },
];

export function getInsight(slug: string): Insight | undefined {
  return insights.find((i) => i.slug === slug);
}

export function sortedInsights(): Insight[] {
  return [...insights].sort((a, b) => b.published.localeCompare(a.published));
}
