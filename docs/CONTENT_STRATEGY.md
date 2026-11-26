# Content strategy

## Objective

Build credibility through the quality of thinking, not claims. A new firm has no case studies or testimonials yet, so trust is earned
through: a distinctive framework (the Praxis Method), a genuinely useful free tool (the AI Readiness Assessment), clear service
definitions and consistent editorial insight.

## Audiences and primary journeys

| Audience                     | Entry                | Path                                   | Conversion                    |
| ---------------------------- | -------------------- | -------------------------------------- | ----------------------------- |
| CEOs / executive teams       | Home, Advisory       | Method → Advisory → Assessment         | Contact (AI Advisory)         |
| Technology & product leaders | Consulting, Insights | Pilots article → Consulting            | Contact (AI Consulting)       |
| Regulated industries         | Consulting           | Regulated-industries service → Contact | Contact                       |
| SMBs                         | Home                 | Assessment → Results next step         | Contact                       |
| L&D teams                    | Academy              | Workshops / Courses                    | Contact (Corporate Workshops) |
| Professionals                | Academy, Insights    | Courses → Register interest            | Interest registration         |

## Content inventory (v1)

- 3 practice pages (10–12 services each) generated from `content/practices.ts`.
- 7 Academy learning paths, 4 workshops, 5 resources (2 live, 3 in development).
- 3 framework articles (drafted for owner review): The Praxis Method; The six dimensions of AI readiness; Why AI pilots stall.
- Founder profile — sourced from the founder's blog; current employer intentionally not named.
- Draft Privacy and Terms — **pending legal review**.

## Editorial categories

AI Leadership · Agentic AI · Enterprise Transformation · Knowledge Protocol Engineering · Future of Work · Responsible AI · AI Education.

## Blog relationship (canonical ownership)

- Founder's personal thought leadership remains canonical at `blog.cedricanne.com`.
- The site links to it (homepage, Insights, About, footer) and lists recent posts from `https://blog.cedricanne.com/rss.xml`
  (`BLOG_FEED_URL` in `.env.production`) — links only, no copies. The feed is read at build time, so new posts appear on Praxis at
  its next deploy (any merge to `main`, or "Retry deployment" in Cloudflare).
- Praxis-owned frameworks are published on this site. If a piece is cross-posted to the blog, set the blog copy's canonical to this
  site (or vice versa) — never leave two canonical versions.

## Founder content

**Source:** the founder's own About page at blog.cedricanne.com/about (Nov 2026). **Owner decisions:** do not name the current
employer or role on this site (conflict-of-interest and implied-endorsement risk); use the photo published on the blog; no career
history beyond the blog's stated facts until supplied. The bio covers the career theme (technology and the people who use it, recently
highly regulated, high-stakes environments), the AI-First Framework (People, Process, Product), recognition (Fellow, ACHDM; Vice Chair, AI Community of
Practice) and the weekly newsletter _AI, Myself & I_. To extend it, e.g. with LinkedIn history, update `src/content/founder.ts` with
owner-approved facts only.

## SEO themes

Target topics are mapped to pages (titles, descriptions, headings and body copy): AI consulting Canada/Ontario (home, consulting,
contact); AI advisory services, enterprise AI strategy, fractional Chief AI Officer (advisory); agentic AI consulting, responsible AI
consulting, AI transformation consulting (consulting); AI training for executives, corporate AI training, AI leadership training
(academy, workshops, courses); AI readiness assessment (/ai-readiness, resources). No keyword stuffing; each page answers its topic
directly, which also helps AI-powered discovery.

## Publishing cadence (recommended)

Two framework articles per month, each tied to a service and ending with a relevant next step (assessment, workshop or contact).

## Adding an article

1. Create `src/content/insights/<slug>.mdx` (body only; no H1).
2. Add metadata to `src/content/insights/index.ts`.
3. `pnpm build` — the page, sitemap entry and Article structured data are generated.

## Positioning: industry-agnostic (Nov 2026)

Praxis is positioned for organizations in any industry. Regulated-industry expertise (finance, insurance, healthcare, public sector)
is presented as one audience and one consulting service, not the core identity. The founder's ACHDM fellowship stays as a factual
credential. Avoid healthcare-specific framing in new copy unless a page is explicitly about that sector.
