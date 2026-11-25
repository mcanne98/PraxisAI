# Praxis Intelligence

**From Knowledge to Impact.** — the website for Praxis Intelligence, an AI advisory, consulting and education firm.

The site presents three practices — **Advisory** (Lead), **Consulting** (Build) and **Academy** (Learn) — connected by **The Praxis Method**,
and includes a free, interactive **AI Readiness Assessment** for lead generation.

> **Status: pre-launch.** Not yet deployed. See [Outstanding before launch](#outstanding-before-launch).

## Stack

Next.js 16 (App Router, Cache Components, Turbopack) · React 19 · TypeScript (strict) · Tailwind CSS 4 · MDX · Zod · Lucide · Vitest ·
Playwright + axe-core · pnpm

## Quick start

```bash
pnpm install
cp .env.example .env.local   # optional — the site runs without any variables
pnpm dev                     # http://localhost:3000
```

## Scripts

| Command                        | Purpose                                                                |
| ------------------------------ | ---------------------------------------------------------------------- |
| `pnpm dev`                     | Development server                                                     |
| `pnpm build` / `pnpm start`    | Production build / serve                                               |
| `pnpm lint` / `pnpm typecheck` | ESLint / TypeScript                                                    |
| `pnpm format` / `format:check` | Prettier                                                               |
| `pnpm test`                    | Unit tests (Vitest)                                                    |
| `pnpm test:e2e`                | End-to-end + accessibility tests (Playwright). Run `pnpm build` first. |
| `pnpm audit`                   | Production dependency vulnerability check                              |

First-time Playwright users: `pnpm exec playwright install chromium`, or set `PW_CHROMIUM_PATH` to an existing Chromium binary.

## Project structure

```
src/
  app/                 Routes, metadata, sitemap, robots, OG image, server actions
  components/          brand · layout · home · sections · forms · assessment · ui · seo
  content/             All site copy as typed data (practices, method, academy, founder, insights/*.mdx)
  lib/                 assessment engine · validation · lead delivery · rate limiting · SEO · blog feed
tests/
  unit/                Vitest
  e2e/                 Playwright (+ axe accessibility checks on every route)
docs/                  Architecture, brand, content, roadmap, deployment, decisions
```

Most content changes are edits to `src/content/*` — no layout work required.

## Documentation

- [Architecture](docs/ARCHITECTURE.md) · [Decisions (ADRs)](docs/DECISIONS.md) · [Deployment](docs/DEPLOYMENT.md)
- [Brand guidelines](docs/BRAND_GUIDELINES.md) · [Content strategy](docs/CONTENT_STRATEGY.md) · [Product roadmap](docs/PRODUCT_ROADMAP.md)
- [CLAUDE.md](CLAUDE.md) — working instructions for Claude Code

## Outstanding before launch

1. **Founder biography and photograph** — current copy is a clearly flagged draft (`src/content/founder.ts`).
2. **Lead delivery** — configure Resend and/or a CRM webhook (`.env.example`). Until then forms say submissions are not sent.
3. **Legal review** — `/privacy` and `/terms` are drafts with bracketed placeholders; legal entity name to be confirmed.
4. **Domain** — set `NEXT_PUBLIC_SITE_URL`; set `ALLOW_INDEXING=true` only on the approved production deployment.
5. **Content review** — three framework articles in `src/content/insights/` are drafted for owner review.
6. **Confirm** operating location (Ontario, Canada) and the "two business days" response commitment on `/contact`.
