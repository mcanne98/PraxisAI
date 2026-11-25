import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { insights } from "@/content/insights";

const staticRoutes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/advisory", priority: 0.9, changeFrequency: "monthly" },
  { path: "/consulting", priority: 0.9, changeFrequency: "monthly" },
  { path: "/academy", priority: 0.9, changeFrequency: "monthly" },
  { path: "/academy/courses", priority: 0.7, changeFrequency: "monthly" },
  { path: "/academy/workshops", priority: 0.7, changeFrequency: "monthly" },
  { path: "/academy/resources", priority: 0.6, changeFrequency: "monthly" },
  { path: "/ai-readiness", priority: 0.8, changeFrequency: "monthly" },
  { path: "/insights", priority: 0.8, changeFrequency: "weekly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map((r) => ({ url: `${site.url}${r.path}`, changeFrequency: r.changeFrequency, priority: r.priority })),
    ...insights.map((i) => ({
      url: `${site.url}/insights/${i.slug}`,
      lastModified: i.updated ?? i.published,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
