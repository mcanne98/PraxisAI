import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const isDev = process.env.NODE_ENV !== "production";

/**
 * Content Security Policy.
 * - 'unsafe-inline' for scripts is required for statically prerendered pages
 *   (nonce-based CSP forces every page to render dynamically).
 * - 'unsafe-eval' is only needed by the dev server (React Refresh).
 * - Extend connect-src / script-src deliberately when adding analytics or
 *   scheduling embeds. See docs/ARCHITECTURE.md → Security.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  // blog.cedricanne.com: founder photo (same owner).
  "img-src 'self' data: blob: https://blog.cedricanne.com",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  // cacheComponents/partialPrefetching are intentionally OFF: the Cloudflare adapter
  // (OpenNext) does not support them yet. See docs/DECISIONS.md → ADR-011.
  poweredByHeader: false,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    // Until launch is approved, tell crawlers not to index any URL (robots.txt alone
    // does not stop indexing of URLs discovered through links).
    const noIndex = process.env.ALLOW_INDEXING === "true" ? [] : [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];
    return [{ source: "/:path*", headers: [...securityHeaders, ...noIndex] }];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
