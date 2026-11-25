# Deployment

> Do not deploy publicly or enable indexing without owner approval.

## Requirements

Node.js ≥ 20.9 (22 LTS recommended) · pnpm 10.

## Cloudflare Workers (production) — praxis.cedricanne.com

The site runs on Cloudflare Workers via [OpenNext](https://opennext.js.org/cloudflare). Config lives in `wrangler.jsonc` (worker name,
custom domain) and `open-next.config.ts` (read-only static-assets cache). `NEXT_PUBLIC_SITE_URL` is set in the committed
`.env.production`.

### One-time setup (Cloudflare dashboard, Workers Builds)

1. **Workers & Pages → Create → Workers → Import a repository.** Connect GitHub if prompted and select `mcanne98/PraxisAI`.
2. **Project name:** `praxis-intelligence`. It must match `name` in `wrangler.jsonc`.
3. **Build settings:**
   - Build command: `pnpm opennextjs-cloudflare build`
   - Deploy command: `pnpm opennextjs-cloudflare deploy` (**not** `wrangler deploy`; this step populates the page cache)
   - Non-production branch deploy command: `pnpm opennextjs-cloudflare upload` (gives each branch a preview URL without going live)
   - Root directory: `/`
   - Production branch: `main`
4. **Build variables:** none required. Leave `ALLOW_INDEXING` unset until launch is approved.
5. Save and deploy. On first deploy, Cloudflare attaches `praxis.cedricanne.com` from the `routes` entry in `wrangler.jsonc`, creating the
   DNS record and TLS certificate (the `cedricanne.com` zone must be in the same Cloudflare account). If the hostname already has a DNS
   record, delete it first or the custom domain will not attach.

Afterwards, every merge to `main` deploys automatically, and other branches get preview URLs.

### Runtime variables and secrets (Worker → Settings → Variables and Secrets)

Add `RESEND_API_KEY` and `CRM_WEBHOOK_SECRET` as **Secrets**, and `LEAD_TO_EMAIL`, `LEAD_FROM_EMAIL`, `CRM_WEBHOOK_URL` and
`FORM_RATE_LIMIT` as plain variables. Because pages are prerendered, also add the delivery variables as **build variables**: the
"submissions are not enabled" notice is decided at build time. Redeploy after changing them.

### Launch (when approved)

Add `ALLOW_INDEXING=true` as a build variable and redeploy. This switches robots.txt to allow crawling and removes the
`X-Robots-Tag: noindex` header.

### Verify locally in the Workers runtime

```bash
pnpm cf:preview                           # build + populate cache + wrangler dev on :8787
PORT=8787 pnpm test:e2e                   # full E2E suite against the Workers runtime
```

### Notes

- Free Workers plan: 100,000 requests/day; the compressed Worker must be under 3 MiB (paid plan: 10 MiB).
- Rate limiting is per isolate. Add a WAF rate-limiting rule for `POST` requests to `/contact`, `/academy*` and `/ai-readiness`
  (one rule is included on the free plan).
- Cache Components must stay off (ADR-011).

## Vercel (alternative)

Import the repo in Vercel (build `pnpm build`), set the same variables, and add the domain. Vercel's Hobby tier is non-commercial
only; a commercial site needs Pro (paid, requires approval).

## Other hosts

`pnpm build && pnpm start` runs a Node server on port 3000 (`-p` to change). Works on any Node host or container. Security headers are
set by Next.js itself, so no extra proxy configuration is required.

## Environment variables

| Variable                                             | Required           | Purpose                                                 |
| ---------------------------------------------------- | ------------------ | ------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                               | Production         | Canonical origin for metadata, sitemap, JSON-LD         |
| `ALLOW_INDEXING`                                     | Production only    | `true` enables crawling in robots.txt                   |
| `RESEND_API_KEY`, `LEAD_TO_EMAIL`, `LEAD_FROM_EMAIL` | For email delivery | All three enable the email channel                      |
| `CRM_WEBHOOK_URL`, `CRM_WEBHOOK_SECRET`              | Optional           | POST lead JSON to CRM/automation                        |
| `FORM_RATE_LIMIT`                                    | Optional           | Per-IP submissions per 10 min (default 5)               |
| `BLOG_FEED_URL`                                      | Optional           | Founder blog RSS/Atom feed (https, blog.cedricanne.com) |

If no delivery variables are set, forms display "Online submissions are not enabled yet" and never claim success.

### Configuring Resend

1. Create an account and verify your sending domain (DNS records).
2. Create an API key with send permission → `RESEND_API_KEY`.
3. `LEAD_FROM_EMAIL` e.g. `Praxis Website <website@yourdomain>`; `LEAD_TO_EMAIL` the inbox that receives leads.
4. Submit the contact form on a preview deployment and confirm receipt.

### Lead webhook payload

```json
{
  "kind": "contact | academy-interest | assessment-results",
  "email": "...",
  "name": "...",
  "subject": "...",
  "fields": { "Label": "value" },
  "consentMarketing": false,
  "submittedAt": "ISO-8601"
}
```

## Pre-launch checklist

- [ ] Founder bio/photo approved; `bioIsPlaceholder: false`
- [ ] Privacy/Terms reviewed by counsel; draft notices removed; `noIndex` removed from both pages
- [ ] Delivery configured and tested end to end
- [ ] `NEXT_PUBLIC_SITE_URL` and `ALLOW_INDEXING=true` on production only
- [ ] `pnpm lint && pnpm typecheck && pnpm test && pnpm build && pnpm test:e2e` pass
- [ ] Lighthouse run on the production URL; results recorded
- [ ] Search Console + Bing Webmaster verified; sitemap submitted
