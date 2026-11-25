# Product roadmap

Prioritized by business impact, speed to value and risk. Nothing below is built yet unless marked ✅.

## Now — launch readiness (weeks 0–2)

| Item                                                                | Why                                | Owner input needed    |
| ------------------------------------------------------------------- | ---------------------------------- | --------------------- |
| Approved founder bio + photo                                        | Credibility; removes draft notices | Yes                   |
| Lead delivery (Resend + CRM webhook)                                | Turns traffic into conversations   | Accounts, approval    |
| Legal review of Privacy/Terms; entity name                          | PIPEDA/CASL compliance             | Counsel               |
| Domain, Vercel project, `ALLOW_INDEXING` on prod                    | Go live                            | Approval              |
| Privacy-conscious analytics (e.g. Vercel Web Analytics / Plausible) | Measure conversion funnel          | Approval (paid tiers) |
| Shared rate-limit store                                             | Spam resilience at scale           | Approval              |

## Next — conversion and authority (months 1–3)

1. **Consultation scheduling** — Cal.com/Calendly embed on `/contact` and assessment results (CSP `frame-src` update).
2. **Assessment v2** — downloadable PDF report; consented result storage for anonymized benchmarks; industry-specific variants.
3. **Newsletter** — double opt-in, CASL-compliant ESP integration via a new delivery channel.
4. **First downloadable playbooks** — gated by consented email (AI Use Case Prioritization, Governance Starter, Context Engineering Canvas).
5. **Case studies** — only with client approval; add structured data accordingly.
6. **Headless CMS** if non-technical publishing is needed (swap `content/*` loaders).

## Later — learning platform (months 3–9)

- Authentication (Auth.js / Clerk) and learner profiles under an `app/(platform)` route group.
- Course catalog, video lessons (Mux), progress tracking, quizzes, certificates.
- Corporate portals with organization-level reporting.
- Add `Course` structured data only when courses are real and enrollable.

## Later — digital commerce

- Stripe Checkout for courses, playbooks, workshop registration; subscriptions/memberships; corporate packages and invoicing.
- Tax handling (GST/HST) and receipts.

## Later — consulting operations

- Client onboarding flows, client portal, engagement tracking, proposal generation from assessment results.

## Future — AI-powered capabilities

- AI learning assistant and personalized learning recommendations.
- AI strategy assistant and transformation roadmap generator, grounded in the Praxis Method and assessment data.
- Interactive knowledge assistant over Praxis content (Knowledge Protocol Engineering showcase).
- Guardrails: transparent AI disclosure, human review for client-facing recommendations, data minimization.

## Architectural seams already in place

✅ Typed content layer · ✅ Delivery adapter interface · ✅ Pure, tested assessment engine · ✅ Server actions with validation and rate
limiting · ✅ Academy status model (`available-on-request` / `in-development`) · ✅ Metadata/JSON-LD helpers.
