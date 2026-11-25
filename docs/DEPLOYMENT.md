# Deployment

> Do not deploy publicly or enable indexing without owner approval.

## Requirements

Node.js ≥ 20.9 (22 LTS recommended) · pnpm 10.

## Vercel (recommended)

1. Import `mcanne98/PraxisAI` in Vercel. Framework preset: Next.js. Install: `pnpm install`. Build: `pnpm build`.
2. Set environment variables (see table). Use separate values for Preview and Production.
3. Production only: `ALLOW_INDEXING=true` and `NEXT_PUBLIC_SITE_URL=https://<your-domain>`.
4. Add the custom domain and redirect `www` ↔ apex as preferred.
5. Redeploy after changing any variable — pages are prerendered at build time.

Vercel's Hobby tier is for non-commercial use; a commercial site needs a Pro plan (paid — requires approval).

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
