/**
 * Academy catalog. Nothing here is purchasable: every item is either
 * "available-on-request" (delivered as a tailored engagement) or "in-development"
 * (interest registration only). Do not add a price or "enrol" action until the
 * course content and purchase workflow exist. See docs/PRODUCT_ROADMAP.md.
 */

export type AcademyStatus = "available-on-request" | "in-development";

export type LearningCategory = {
  id: string;
  title: string;
  audience: string;
  summary: string;
  topics: string[];
  status: AcademyStatus;
};

export const learningCategories: LearningCategory[] = [
  {
    id: "ai-for-leaders",
    title: "AI for Leaders",
    audience: "Executives and senior managers",
    summary: "Make informed decisions about AI strategy, investment, risk and organizational change.",
    topics: ["AI strategy fundamentals", "Evaluating AI investments", "Leading AI-enabled teams", "Governance for leaders"],
    status: "available-on-request",
  },
  {
    id: "ai-fundamentals",
    title: "AI Fundamentals",
    audience: "Everyone",
    summary: "A clear, practical foundation in how modern AI works, where it helps and where it fails.",
    topics: ["How generative AI works", "Strengths and limitations", "Responsible use", "Everyday applications"],
    status: "in-development",
  },
  {
    id: "agentic-ai",
    title: "Agentic AI",
    audience: "Technology leaders and practitioners",
    summary: "How AI agents plan, use tools and take action — and how to deploy them safely.",
    topics: ["Agent architectures", "Tool use and orchestration", "Human oversight", "Evaluation and risk"],
    status: "in-development",
  },
  {
    id: "prompt-context-engineering",
    title: "Prompt and Context Engineering",
    audience: "Knowledge workers and builders",
    summary: "Techniques for getting consistent, high-quality results by designing the context AI works with.",
    topics: ["Prompt patterns", "Context design", "Knowledge structuring", "Quality evaluation"],
    status: "in-development",
  },
  {
    id: "enterprise-transformation",
    title: "Enterprise AI Transformation",
    audience: "Transformation and operations leaders",
    summary: "Scaling AI beyond pilots through operating models, change management and measurement.",
    topics: ["Operating models", "Adoption and change", "Value measurement", "Scaling capability"],
    status: "available-on-request",
  },
  {
    id: "responsible-ai",
    title: "Responsible AI and Governance",
    audience: "Leaders, risk, legal and compliance teams",
    summary: "Deploying AI safely and accountably — proportionate governance, privacy, oversight and trust.",
    topics: ["Risk assessment", "Privacy and data stewardship", "Human oversight", "Policy and accountability"],
    status: "in-development",
  },
  {
    id: "ai-productivity",
    title: "AI Productivity",
    audience: "Teams and individuals",
    summary: "Redesigning everyday work to use AI deliberately — and measuring the difference.",
    topics: ["Workflow mapping", "AI-assisted writing and analysis", "Personal knowledge systems", "Measuring time saved"],
    status: "in-development",
  },
];

export type Workshop = {
  id: string;
  title: string;
  format: string;
  audience: string;
  summary: string;
  outcomes: string[];
};

export const workshops: Workshop[] = [
  {
    id: "executive-ai-briefing",
    title: "Executive AI Briefing",
    format: "Half day · in person or virtual",
    audience: "Executive and leadership teams",
    summary: "A grounded briefing on what AI means for your organization, followed by a facilitated discussion of priorities.",
    outcomes: ["Shared, realistic understanding of AI", "Initial view of opportunities and risks", "Agreed next steps"],
  },
  {
    id: "ai-opportunity-lab",
    title: "AI Opportunity Lab",
    format: "One day · in person",
    audience: "Cross-functional leadership",
    summary: "A working session to identify, assess and prioritize AI opportunities against value and feasibility.",
    outcomes: ["Prioritized opportunity portfolio", "Assessment criteria you can reuse", "Candidate pilots"],
  },
  {
    id: "board-ai-governance",
    title: "AI Governance for Boards",
    format: "2–3 hours · in person or virtual",
    audience: "Boards and governance committees",
    summary: "What directors need to ask about AI strategy, risk, accountability and oversight.",
    outcomes: ["Oversight questions and responsibilities", "Governance maturity view", "Reporting expectations"],
  },
  {
    id: "workflow-redesign-sprint",
    title: "Workflow Redesign Sprint",
    format: "Two days · in person",
    audience: "Operational teams",
    summary: "Map a real workflow, redesign it around AI and leave with a tested prototype and a measurement plan.",
    outcomes: ["Redesigned workflow", "Working prototype", "Baseline and success measures"],
  },
];

export type Resource = {
  id: string;
  title: string;
  type: "Playbook" | "Framework" | "Guide" | "Tool";
  summary: string;
  /** Internal href when the resource is live; undefined when in development */
  href?: string;
};

export const resources: Resource[] = [
  {
    id: "ai-readiness-assessment",
    title: "AI Readiness Assessment",
    type: "Tool",
    summary: "A free, indicative self-assessment across six dimensions of AI readiness, with tailored recommendations.",
    href: "/ai-readiness",
  },
  {
    id: "praxis-method",
    title: "The Praxis Method",
    type: "Framework",
    summary: "Our five-stage cycle for building AI capability: Understand, Envision, Enable, Execute, Evolve.",
    href: "/insights/the-praxis-method",
  },
  {
    id: "ai-use-case-prioritization",
    title: "AI Use Case Prioritization Playbook",
    type: "Playbook",
    summary: "A structured approach to scoring and sequencing AI opportunities by value, feasibility and risk.",
  },
  {
    id: "ai-governance-starter",
    title: "AI Governance Starter Guide",
    type: "Guide",
    summary: "A proportionate starting point for AI policies, decision rights and risk controls.",
  },
  {
    id: "context-engineering-canvas",
    title: "Context Engineering Canvas",
    type: "Framework",
    summary: "A one-page canvas for designing the knowledge and context an AI system needs to perform reliably.",
  },
];

export const statusLabel: Record<AcademyStatus, string> = {
  "available-on-request": "Available on request",
  "in-development": "In development",
};
