# Architecture

## Overview

A statically prerendered Next.js 16 site with a small server surface (three server actions). Every page is generated at build time;
pages revalidate daily because the footer's copyright year is a cached component.

```
Browser ──► CDN (static HTML/CSS/JS, security headers)
   │
   └─ form submit ──► Server action (Node) ──► validate (Zod) ──► rate limit ──► anti-spam
                                                        └─► deliverLead() ──► [Resend email] [CRM webhook] | not-configured
```

## Routes

| Route                                                          | Type                          | Notes                                                         |
| -------------------------------------------------------------- | ----------------------------- | ------------------------------------------------------------- |
| `/`                                                            | static                        | 9 homepage sections                                           |
| `/advisory`, `/consulting`, `/academy`                         | static                        | Rendered by `PracticeOverview` from `content/practices.ts`    |
| `/academy/courses`, `/workshops`, `/resources`                 | static                        | Catalog data in `content/academy.ts`                          |
| `/insights`                                                    | static                        | On-site articles + optional build-time blog feed (linked out) |
| `/insights/[slug]`                                             | static (generateStaticParams) | MDX via dynamic import                                        |
| `/about`, `/contact`, `/ai-readiness`                          | static                        | Forms/assessment hydrate on the client                        |
| `/privacy`, `/terms`                                           | static, `noindex`             | Drafts pending legal review                                   |
| `/sitemap.xml`, `/robots.txt`, `/opengraph-image`, `/icon.svg` | static                        | Generated metadata routes                                     |

## Content layer

All copy is typed TypeScript data in `src/content/`. This keeps the first release free of a CMS while making content changes safe and
reviewable. Article bodies are MDX (`@next/mdx`), with metadata in a registry (`content/insights/index.ts`) rather than frontmatter
(no parser dependency). **Extension point:** swap the registry for a headless CMS loader with the same `Insight` type.

## AI Readiness Assessment

- `lib/assessment/questions.ts` — 6 dimensions × 4 statements, 5-point scale.
- `lib/assessment/scoring.ts` — dimension score = (mean − 1) / 4 × 100; overall = unweighted mean; five 20-point maturity bands.
- `lib/assessment/recommendations.ts` — rules per dimension × band (<40, 40–69, ≥70); top two lowest dimensions prioritized; next-step
  practice suggestion.
- Runs entirely in the browser. No data leaves the device unless the visitor opts in to the follow-up form.
- **Extension points:** persist results (with consent) for benchmarking; PDF report; AI-generated narrative on top of rule output.

## Lead capture

- Server actions in `src/app/actions.ts` (`submitContact`, `submitInterest`, `submitAssessmentLead`).
- Validation: Zod (`lib/validation/schemas.ts`) — trimming, control-character stripping, length limits, enum checks, consent checks.
- Anti-spam: hidden honeypot field + minimum time-on-page (2.5 s since page load). Bots receive a generic success and nothing is sent.
- Rate limiting: in-memory fixed window, 5 per IP per form per 10 minutes (`FORM_RATE_LIMIT`). **Limitation:** per instance. Replace
  with a shared store (e.g. Upstash Redis) before significant traffic.
- Delivery: `lib/integrations/delivery.ts` — channel adapters enabled by env vars. Returns `delivered | not-configured | failed`. HTML
  email content is escaped.
- Forms use React 19 `useActionState` and work without JavaScript. Submitted values are echoed back so fields are refilled after React's
  automatic form reset.

## Security

- Headers (all routes, `next.config.ts`): CSP, HSTS, `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`,
  `Permissions-Policy`, COOP; `X-Powered-By` removed.
- CSP allows `'unsafe-inline'` scripts because nonce-based CSP would force every page to render dynamically. No `'unsafe-eval'` in
  production. When adding analytics or scheduling embeds, extend `script-src`/`connect-src`/`frame-src` deliberately.
- JSON-LD is serialized with `<` escaped. External links use `rel="noopener noreferrer"`.
- Blog feed URLs are restricted to `https://blog.cedricanne.com`.
- `pnpm audit --prod` reported no known vulnerabilities at the time of writing.

## SEO

- `lib/seo.ts#pageMetadata` sets unique title, description, canonical, Open Graph and Twitter tags per page.
- Structured data: Organization (site-wide), ProfessionalService (home), Service + OfferCatalog (practice pages), Article (insights),
  BreadcrumbList (all inner pages). No Course, Review or AggregateRating markup.
- Indexing is opt-in (`ALLOW_INDEXING=true`) to protect previews.

## Accessibility

WCAG 2.2 AA target: skip link, landmark regions, single `h1` per page, labelled forms with `aria-invalid`/`aria-describedby`, focus
management on form results and assessment steps, keyboard-operable menu (Escape closes and restores focus), `prefers-reduced-motion`
honoured globally, contrast-checked tokens. Playwright runs axe-core against every route on desktop and mobile.

## Testing

- Unit (Vitest): scoring, recommendations, validation, rate limiting, feed parsing, delivery behaviour (incl. "never fake success").
- E2E (Playwright, desktop + Pixel 7): every route renders with one `h1`, title, canonical, description and zero axe violations; 404;
  security headers; robots/sitemap; JSON-LD; navigation and CTAs; mobile menu; skip link; full assessment flow with expected score;
  contact and interest forms incl. validation, value retention and the not-configured message.

## Future extension points

See `docs/PRODUCT_ROADMAP.md`. Key seams: `content/*` → CMS; `delivery.ts` channels → CRM/ESP; `actions.ts` → auth-aware actions;
`academy.ts` status → real catalog + commerce; `app/(platform)` route group for authenticated learning/client portals.
