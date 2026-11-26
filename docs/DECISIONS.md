# Architectural decisions

Lightweight ADRs. Newest last.

## ADR-001 — Next.js 16 App Router

**Context:** Empty repository; brief recommends Next.js. **Decision:** Next.js 16 with Turbopack. **Why:** current stable release,
static output by default, portable across hosts. **Update:** the scaffold's `cacheComponents`/`partialPrefetching` defaults were
later turned off — see ADR-011.

## ADR-002 — Typed content files instead of a CMS (for now)

**Decision:** All copy in `src/content/*.ts` and MDX. **Why:** fastest path to an accurate, reviewable first release; no paid service;
content changes are diffs. **Revisit when:** non-technical editors need to publish regularly.

## ADR-003 — Link out to the founder's blog; do not republish

**Decision:** Insights hosts only Praxis-owned framework articles. Blog posts are listed via an optional build-time feed and link to
`blog.cedricanne.com`. **Why:** keeps one canonical URL per article, avoids duplicate-content risk and preserves content ownership.

## ADR-004 — React 19 form actions instead of React Hook Form

**Decision:** `useActionState` + server-side Zod; React Hook Form not used. **Why:** forms work without JavaScript, one validation
source of truth, fewer dependencies. **Trade-off:** validation feedback after submit rather than on blur.

## ADR-005 — Pluggable lead delivery; never simulate success

**Decision:** `deliverLead()` with env-enabled adapters (Resend, generic webhook). With no channel configured it returns
`not-configured`, and the UI says so before and after submission. **Why:** honesty requirement; easy CRM swap later.

## ADR-006 — No animation library

**Decision:** Removed Motion after measurement; the Praxis Method diagram and hero use CSS transitions/keyframes. **Why:** Motion added
~46 KB of client JavaScript for two effects; mobile TBT dropped from 170 ms to 70 ms on the homepage. **Revisit when:** complex
gesture or layout animations are needed.

## ADR-007 — Keep Zod out of client bundles

**Decision:** Option lists moved to `lib/validation/options.ts`; schemas only imported server-side. **Why:** Zod in the browser added
~50 KB and probes `Function()`, which the production CSP (correctly) blocks, producing a console CSP violation.

## ADR-008 — In-memory rate limiting as a first step

**Decision:** Per-instance fixed-window limiter. **Why:** no paid infrastructure for v1. **Risk:** ineffective across serverless
instances. **Next:** shared store (Upstash Redis / Vercel KV) — requires approval.

## ADR-009 — Indexing off by default

**Decision:** `robots.txt` disallows everything unless `ALLOW_INDEXING=true`. **Why:** prevents previews and the pre-launch site from
being indexed with draft legal pages and placeholder founder content.

## ADR-010 — Accessible colour variants of the brand palette

**Decision:** Brand blue `#5271FF` and slate `#94A3B8` fail AA as text on light backgrounds (3.9:1, 2.5:1). Added `blue-ink #3D55E0`
(5.6:1), `teal-ink #0F766E` (5.2:1) and `ink-muted #475569` (7.2:1) for light surfaces; `blue-soft #7B93FF` (6.6:1) for text on dark.
Original colours are kept for decoration and dark surfaces where they pass.

## ADR-011 — Host on Cloudflare Workers via OpenNext; Cache Components off

**Context:** The owner's domain (cedricanne.com) is on Cloudflare; the site goes to `praxis.cedricanne.com`. **Decision:** Deploy with
`@opennextjs/cloudflare` to Cloudflare Workers, using Cloudflare's GitHub integration (Workers Builds). Turn off `cacheComponents` and
`partialPrefetching` and remove `"use cache"`. **Why:** with Cache Components on, every page returned 500 in the Workers runtime
(composable cache unsupported, requests hung); the adapter warns it is not yet supported. The site is fully prerendered, so nothing is
lost: the copyright year and optional blog feed now resolve at build time and refresh on each deploy. Unknown article slugs 404 via
`dynamicParams = false`. **Verified:** all 50 E2E tests pass against `wrangler dev` with the cache populated, with zero runtime errors.
**Revisit when:** OpenNext supports Cache Components.

## ADR-012 — Read-only static-assets cache on Cloudflare

**Decision:** OpenNext `staticAssetsIncrementalCache`: prerendered pages are served from Workers static assets. **Why:** no R2 or KV to
provision (R2 may need a payment method); content updates ship by redeploying. **Requirement:** deploy with
`opennextjs-cloudflare deploy` (it populates the cache), never plain `wrangler deploy`. **Trade-off:** no on-demand/ISR revalidation;
switch to the R2 cache if that is ever needed.

## ADR-013 — Rate limiting on Workers

**Note:** the in-memory limiter (ADR-008) is per Workers isolate, so it is weaker on Cloudflare than on a single server. The client IP
now comes from `CF-Connecting-IP`. **Next:** Cloudflare's Rate Limiting binding or WAF rate-limiting rules — no code dependency, and
the free plan includes one WAF rate-limiting rule.

## ADR-014 — Cloudflare Email Service for lead delivery

**Decision:** Deliver form submissions through the Worker `send_email` binding, from `praxis@cedricanne.com` to a verified Email
Routing destination; `praxis@cedricanne.com` itself is an Email Routing forward to the same inbox. **Why:** no API key or extra vendor,
free (sends to verified destinations do not need Email Sending onboarding or the Workers Paid plan), and one platform for hosting, DNS
and email. **Constraints:** recipients are limited to verified destinations — fine for internal lead notifications; emailing visitors
(e.g. auto-replies or assessment reports) would need Email Sending onboarding on Workers Paid, or Resend. Resend remains supported and
takes precedence when `RESEND_API_KEY` is set.
