/**
 * Founder profile.
 *
 * Source of facts: the founder's own published About page (blog.cedricanne.com/about), Nov 2026.
 * Owner decisions (Nov 2026):
 *   - Do NOT name the current employer or role on this site.
 *   - Use the photo published on the blog.
 *   - No career history beyond the blog's stated facts until supplied (e.g. from LinkedIn).
 * Do not add employers, titles, dates, education or metrics without the owner's approval.
 * Refer to the founder by name — no pronouns. See docs/CONTENT_STRATEGY.md → Founder content.
 */
export const founder = {
  name: "Cedric Anne",
  role: "Founder",
  bioIsPlaceholder: false,
  photo: {
    // Served from the founder's blog (same owner). Allowed in the CSP img-src.
    src: "https://blog.cedricanne.com/aboutme.jpg",
    alt: "Cedric Anne",
  } as null | { src: string; alt: string },
  shortBio:
    "Cedric Anne is a technology executive and AI strategist who has spent a career at the intersection of technology and the people who use it, most recently in healthcare technology. Cedric founded Praxis Intelligence to help leaders do the hard, human work of turning AI into real change in how organizations operate.",
  longBio: [
    "Cedric Anne has spent a career at the intersection of technology and the people who use it. In recent years, that has meant working on the front lines of one of the most significant shifts in how organizations operate: AI becoming a genuine collaborator in everyday decisions.",
    "Much of that work has been in healthcare technology — an industry where the stakes are high, workflows are intricate and the margin for error is narrow. That experience shapes how Praxis Intelligence works: grounded in real operational complexity rather than theory.",
    "Cedric evaluates every AI initiative through three questions. People: how do humans adapt when intelligence becomes a collaborator, not just a tool? Process: how do workflows change when they are designed with AI from day one rather than retrofitted? Product: how does value delivery change when organizations move from owning software to owning workflows?",
    "Cedric is a Fellow of the American College of Health Data Management and Vice Chair of an AI Community of Practice, and writes the weekly newsletter AI, Myself & I on leading, adapting and building in an AI-first world.",
  ],
  philosophy:
    "The real challenge isn’t the technology. The harder problem is human: how people, teams and organizations rethink how work gets done when intelligence becomes abundant.",
  recognition: [
    { title: "Fellow", organization: "American College of Health Data Management" },
    { title: "Vice Chair", organization: "AI Community of Practice" },
    { title: "Author", organization: "AI, Myself & I — a weekly newsletter", href: "https://blog.cedricanne.com" },
  ] as { title: string; organization: string; href?: string }[],
  newsletter: { name: "AI, Myself & I", href: "https://blog.cedricanne.com" },
  expertise: [
    "Enterprise AI strategy",
    "Agentic AI",
    "Healthcare technology",
    "AI-first workflows",
    "Organizational transformation",
    "Change management",
    "Technology and executive leadership",
    "Product strategy and development",
    "Enterprise data and integration",
    "Knowledge Protocol Engineering",
  ],
};
