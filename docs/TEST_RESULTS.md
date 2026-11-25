# Test and performance results

Recorded 2026-11-25 on the `feature/praxis-intelligence-website` branch. Re-run before launch against the production URL.

## Conditions

- Linux container, Node 22.23, pnpm 10.28, Next.js 16.4.6 production build served locally with `next start`.
- Chromium 1243 (Playwright 1.63), headless.
- Lighthouse 12, default settings: **mobile** = simulated Moto G Power, slow 4G, 4× CPU throttling; **desktop** = `--preset=desktop`.
- SEO measured with `ALLOW_INDEXING=true` (default builds block crawling by design, which scores SEO 66).
- Local serving has no CDN, compression tuning or HTTP/2 edge; field results on Vercel may differ.

## Automated tests

| Suite                                                                                                | Result                                                                                 |
| ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Unit — Vitest (assessment scoring and rules, validation, rate limit, feed parser, lead delivery)     | **28 / 28 passed**                                                                     |
| E2E — Playwright, desktop + Pixel 7 (routes, a11y, SEO tags, headers, navigation, assessment, forms) | **50 passed, 2 skipped** (device-specific tests skipped on the other device by design) |
| axe-core WCAG 2.0/2.1/2.2 A+AA on all 16 routes + assessment results                                 | **0 violations**                                                                       |
| ESLint                                                                                               | 0 errors, 0 warnings                                                                   |
| TypeScript (`strict`)                                                                                | 0 errors                                                                               |
| `pnpm audit --prod`                                                                                  | No known vulnerabilities                                                               |

## Lighthouse

| Page                          | Mobile Perf | Desktop Perf | Accessibility | Best practices | SEO | Mobile LCP | CLS | Mobile TBT |
| ----------------------------- | ----------- | ------------ | ------------- | -------------- | --- | ---------- | --- | ---------- |
| `/`                           | 93          | 100          | 100           | 100            | 100 | 3.2 s      | 0   | 70 ms      |
| `/advisory`                   | 94          | 100          | 100           | 100            | 100 | 2.9 s      | 0   | 70 ms      |
| `/academy`                    | 95          | 100          | 100           | 100            | 100 | 2.9 s      | 0   | 60 ms      |
| `/ai-readiness`               | 95          | 100          | 100           | 100            | 100 | 2.7 s      | 0   | 140 ms     |
| `/contact`                    | 96          | 100          | 100           | 100            | 100 | 2.6 s      | 0   | 70 ms      |
| `/insights`                   | 95          | 100          | 100           | 100            | 100 | 2.7 s      | 0   | 140 ms     |
| `/insights/the-praxis-method` | 94          | 100          | 100           | 100            | 100 | 3.0 s      | 0   | 110 ms     |
| `/about`                      | 95          | 100          | 100           | 100            | 100 | 2.6 s      | 0   | 130 ms     |

Desktop LCP: 0.6–0.7 s on all pages.

### Against targets

- Accessibility, Best Practices, SEO ≥ 95: **met** on all measured pages.
- Performance ≥ 95: **met on desktop**; **mobile 93–96** (5 of 8 pages ≥ 95).
- CLS < 0.1: **met** (0 everywhere).
- LCP < 2.5 s: **met on desktop**; **not met under simulated mobile throttling (2.6–3.2 s)**. The LCP element is hero text; ~86% of the
  time is render delay attributable to the baseline React/Next.js JavaScript and CSS under 4× CPU throttling. Font-display changes made
  no difference (tested).
- INP < 200 ms: not measurable in lab; TBT (a lab proxy) is 60–140 ms on mobile.

### Optimizations applied during QA

- Removed Motion (−46 KB JS): homepage mobile TBT 170 → 70 ms, performance 89 → 93.
- Removed Zod from client bundles (−~50 KB JS) and fixed a CSP `eval` violation it triggered (Best Practices 96 → 100 on `/contact`).

### Recommended follow-ups

Measure real-user Core Web Vitals after deployment (Vercel Speed Insights or CrUX). If mobile LCP remains above target in the field,
evaluate disabling `partialPrefetching`, deferring the header's client navigation, and inlining critical CSS.

## Cloudflare Workers runtime (added 2026-11-25)

After moving to Cloudflare (OpenNext 1.20, Wrangler 4.168, `workerd` local runtime, cache populated, Cache Components off):

| Check                                                                               | Result                                                                                        |
| ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| E2E suite (`PORT=8787 pnpm test:e2e` against `wrangler dev`)                        | **50 passed, 2 skipped**, 0 runtime errors in the Worker log                                  |
| Prerendered pages served from cache                                                 | `x-nextjs-cache: HIT`, ~10 ms locally                                                         |
| Worker size (`wrangler deploy --dry-run`)                                           | 8.2 MiB raw / **2.0 MiB gzip** (free plan limit 3 MiB)                                        |
| Lighthouse mobile — `/`, `/ai-readiness`, `/contact`, `/insights/the-praxis-method` | Perf 93 / 96 / 97 / 94 · A11y 100 · Best practices 100 · LCP 3.1 / 2.7 / 2.5 / 3.0 s · CLS 0  |
| Lighthouse desktop — `/ai-readiness`                                                | Perf 100, LCP 0.6 s (other desktop runs hit a Lighthouse `NO_NAVSTART` tooling error locally) |

SEO scores 66 here because indexing is deliberately off (robots.txt disallow + `X-Robots-Tag: noindex`). It scored 100 when indexing was
enabled (table above). Before Cache Components was turned off, every page returned HTTP 500 in the Workers runtime; see ADR-011.
