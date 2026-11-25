import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * Indexing is OFF unless ALLOW_INDEXING=true, so preview and pre-launch
 * deployments are never indexed. Set it only on the approved production site.
 */
export default function robots(): MetadataRoute.Robots {
  if (process.env.ALLOW_INDEXING !== "true") {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
