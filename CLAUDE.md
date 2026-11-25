# CLAUDE.md — Praxis Intelligence website

@AGENTS.md

## What this is

Marketing and lead-generation site for Praxis Intelligence (AI advisory, consulting, education). Next.js 16 App Router, fully
prerendered, deployed to **Cloudflare Workers via OpenNext** at praxis.cedricanne.com. Read `node_modules/next/dist/docs/` before using
unfamiliar Next APIs — this version differs from older training data (e.g. async `params`).

**Do not enable `cacheComponents`, `partialPrefetching` or `"use cache"`** — the Cloudflare adapter does not support them yet (every
page 500s). See `docs/DECISIONS.md` ADR-011. Verify Cloudflare-affecting changes with `pnpm cf:preview` (or `cf:build` +
`opennextjs-cloudflare populateCache local` + `wrangler dev`) and run E2E against it with `PORT=8787`.

## Commands

```bash
pnpm dev | pnpm build | pnpm lint | pnpm typecheck | pnpm test | pnpm test:e2e (after build) | pnpm format
pnpm cf:build | pnpm cf:preview   # Cloudflare Workers bundle / local Workers runtime
```

Before committing: `pnpm lint && pnpm typecheck && pnpm test && pnpm build`, and `pnpm test:e2e` for UI changes.

## Where things live

- Copy and catalog data: `src/content/*` (typed). Practice pages render from `src/content/practices.ts`.
- Articles: `src/content/insights/<slug>.mdx` + an entry in `src/content/insights/index.ts`.
- Assessment logic (pure, unit-tested): `src/lib/assessment/*`. UI: `src/components/assessment/assessment.tsx`.
- Forms: server actions in `src/app/actions.ts`; Zod schemas in `src/lib/validation/schemas.ts`; delivery adapters in
  `src/lib/integrations/delivery.ts`.
- Design tokens: `@theme` in `src/app/globals.css`. Primitives: `src/components/ui/primitives.tsx`.

## Non-negotiable rules

- **No fabrication**: no invented clients, logos, testimonials, case studies, metrics, partnerships, credentials or founder facts. Do not
  imply an OpenAI (or any vendor) partnership. Do not describe the company as incorporated until confirmed.
- **No fake success**: forms must report `not-configured` when no delivery channel is set. Never simulate a send.
- **Academy honesty**: nothing is purchasable. Use only `available-on-request` or `in-development` states. No `Course` structured data
  until a real course exists.
- **Founder content** stays flagged (`bioIsPlaceholder: true`) until the owner supplies approved copy. Use they/them or the name — never
  infer pronouns.
- **Client bundles**: never import `zod` or `src/lib/validation/schemas.ts` from a `"use client"` file (it breaks the CSP and adds ~50KB).
  Shared option lists live in `src/lib/validation/options.ts`.
- **Secrets** only via environment variables; update `.env.example` and `docs/DEPLOYMENT.md` when adding one.
- **Indexing** stays off unless `ALLOW_INDEXING=true`.
- **Accessibility**: WCAG 2.2 AA. Use the accessible colour tokens (`blue-ink`, `teal-ink`, `ink-muted` on light; `blue-soft`, `teal`,
  `mist` on dark). E2E runs axe on every route — keep it at zero violations.
- Keep docs in `docs/` in sync with the implementation. Record significant choices in `docs/DECISIONS.md`.

## Voice

Executive, clear, reflective, framework-driven. Avoid hype phrases ("unlock the power of AI", "revolutionize", "cutting-edge",
"ever-evolving landscape", "seamlessly"). See `docs/BRAND_GUIDELINES.md`.
