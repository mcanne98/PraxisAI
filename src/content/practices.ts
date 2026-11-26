/**
 * The three Praxis practices. Each practice page is rendered from this data,
 * so adding or editing a service never requires layout changes.
 */

export type PracticeSlug = "advisory" | "consulting" | "academy";

export type Service = {
  title: string;
  summary: string;
};

export type Practice = {
  slug: PracticeSlug;
  name: string;
  verb: "Lead" | "Build" | "Learn";
  cardTitle: string;
  coreMessage: string;
  summary: string;
  /** Long-form intro for the practice page */
  intro: string[];
  /** The question this practice answers for a client */
  question: string;
  services: Service[];
  /** Typical outputs a client walks away with */
  outcomes: string[];
  /** How an engagement usually runs */
  engagement: { step: string; detail: string }[];
  seo: { title: string; description: string; keywords: string[] };
};

export const practices: Practice[] = [
  {
    slug: "advisory",
    name: "Praxis Advisory",
    verb: "Lead",
    cardTitle: "Lead with intelligence.",
    coreMessage: "Make better decisions about AI.",
    summary:
      "Strategic counsel for executives and boards who need a clear point of view on where AI creates value, what it will take, and how to govern it.",
    question: "Where should we place our bets — and how do we know they are paying off?",
    intro: [
      "Most AI decisions are made too early or too late. Too early, and organizations buy tools before they understand the problem. Too late, and competitors have already redesigned the work.",
      "Praxis Advisory gives leadership teams an independent view of where AI fits their strategy, what capabilities they need to build, and how to measure whether it is working. We focus on decisions, not decks.",
    ],
    services: [
      {
        title: "Enterprise AI strategy",
        summary: "A prioritized view of where AI supports your strategy, grounded in value, feasibility and risk.",
      },
      {
        title: "AI readiness and maturity assessments",
        summary: "A structured diagnostic across leadership, people, data, technology, governance and process.",
      },
      {
        title: "Fractional Chief AI Officer",
        summary: "Senior AI leadership on a part-time basis while you decide what the permanent role should be.",
      },
      {
        title: "Executive and board advisory",
        summary: "Briefings and working sessions that build a shared, realistic understanding of AI at the top.",
      },
      {
        title: "AI governance and responsible AI",
        summary: "Policies, decision rights and controls proportionate to how you actually use AI.",
      },
      {
        title: "AI investment and ROI frameworks",
        summary: "A consistent way to size, fund and evaluate AI initiatives before and after launch.",
      },
      { title: "AI operating model design", summary: "Who owns AI, how work flows, and how capability scales beyond a central team." },
      {
        title: "Organizational change management",
        summary: "Adoption plans that treat behaviour change as the main event, not an afterthought.",
      },
      { title: "Workforce transformation", summary: "Role redesign and skills planning for work that humans and AI now share." },
      {
        title: "Technology and vendor selection",
        summary: "Independent evaluation of platforms and partners against your requirements, not a vendor’s roadmap.",
      },
    ],
    outcomes: [
      "A prioritized AI portfolio tied to business objectives",
      "Clear governance and decision rights",
      "An investment case leadership can defend",
      "A realistic view of capability gaps and how to close them",
    ],
    engagement: [
      { step: "Diagnose", detail: "Interviews, readiness assessment and a review of current initiatives." },
      { step: "Decide", detail: "Facilitated sessions to agree priorities, guardrails and ownership." },
      { step: "Direct", detail: "A roadmap, operating model and measures leadership can steer by." },
    ],
    seo: {
      title: "AI Advisory Services & Fractional Chief AI Officer",
      description:
        "Enterprise AI strategy, readiness assessments, AI governance and fractional Chief AI Officer services for executives and boards in Canada.",
      keywords: [
        "AI advisory services",
        "Enterprise AI strategy",
        "Fractional Chief AI Officer",
        "AI governance",
        "AI readiness assessment",
      ],
    },
  },
  {
    slug: "consulting",
    name: "Praxis Consulting",
    verb: "Build",
    cardTitle: "Build with intelligence.",
    coreMessage: "Turn AI ambition into execution.",
    summary:
      "Hands-on design and implementation that turns AI strategy into redesigned workflows, working systems and measurable operational results.",
    question: "How do we get from a promising pilot to something the business relies on?",
    intro: [
      "Pilots are easy. Production is hard. The gap is rarely the model — it is the data, the context, the process around it and the people expected to use it.",
      "Praxis Consulting designs and builds AI solutions with that gap in mind. We start from the workflow, engineer the knowledge and context the system needs, and build for adoption from the first sprint.",
    ],
    services: [
      {
        title: "Agentic AI architecture and implementation",
        summary: "Design and delivery of AI agents that take bounded, auditable action inside real workflows.",
      },
      {
        title: "Enterprise AI integration",
        summary: "Connecting AI capabilities to the systems, data and identity controls you already run.",
      },
      { title: "Business process transformation", summary: "Redesigning end-to-end processes around what AI and people each do best." },
      { title: "Intelligent workflow automation", summary: "Automation that handles judgement-light work and escalates the rest cleanly." },
      {
        title: "AI-powered knowledge management",
        summary: "Making institutional knowledge findable, current and usable by both people and AI.",
      },
      {
        title: "Knowledge Protocol Engineering",
        summary: "Structuring expertise, rules and context so AI systems behave consistently and explainably.",
      },
      { title: "AI solution prototyping", summary: "Fast, evidence-producing prototypes that answer a specific business question." },
      {
        title: "Enterprise data and context architecture",
        summary: "The data foundations and context layers that make AI outputs reliable.",
      },
      { title: "AI implementation roadmaps", summary: "Sequenced delivery plans that balance quick wins against durable foundations." },
      { title: "Custom AI solutions", summary: "Purpose-built solutions where off-the-shelf tools do not fit the problem." },
      {
        title: "AI for regulated industries",
        summary: "AI design and delivery that respects privacy, compliance and risk obligations in regulated environments.",
      },
    ],
    outcomes: [
      "Redesigned workflows with measurable before-and-after baselines",
      "Production-grade AI solutions your teams can operate",
      "Reusable knowledge and context assets",
      "Internal capability to extend what was built",
    ],
    engagement: [
      { step: "Frame", detail: "Define the workflow, the outcome and how success will be measured." },
      { step: "Prove", detail: "Prototype against real data and real users to test value early." },
      { step: "Scale", detail: "Harden, integrate and hand over with documentation and enablement." },
    ],
    seo: {
      title: "AI Transformation Consulting & Agentic AI Implementation",
      description:
        "Agentic AI consulting, enterprise AI integration, intelligent workflow automation and responsible AI implementation that turns strategy into operational outcomes.",
      keywords: [
        "AI transformation consulting",
        "Agentic AI consulting",
        "Responsible AI consulting",
        "AI consulting Canada",
        "AI consulting Ontario",
      ],
    },
  },
  {
    slug: "academy",
    name: "Praxis Academy",
    verb: "Learn",
    cardTitle: "Learn with intelligence.",
    coreMessage: "Build the capabilities to lead in an AI-first world.",
    summary:
      "AI education for leaders, teams and professionals — practical, framework-driven learning designed to change how people work, not just what they know.",
    question: "How do we build the confidence and skill to use AI well — across the whole organization?",
    intro: [
      "AI adoption stalls when knowledge stays with a few specialists. Capability has to be distributed: leaders who can make informed decisions, teams who can redesign their own work, and professionals who can use AI with judgement.",
      "Praxis Academy builds that capability through workshops, corporate programs and learning resources grounded in real workflows rather than tool demonstrations.",
    ],
    services: [
      {
        title: "AI literacy and fundamentals",
        summary: "A clear, hype-free foundation in what AI is, what it does well and where it fails.",
      },
      { title: "AI for business leaders", summary: "Decision-focused learning for executives who need to lead AI, not build it." },
      { title: "AI-first leadership", summary: "How leadership, team design and accountability change when AI is part of the work." },
      {
        title: "Prompt and context engineering",
        summary: "Practical techniques for getting reliable, high-quality output from AI systems.",
      },
      { title: "Agentic AI fundamentals", summary: "How AI agents work, where they fit and how to deploy them responsibly." },
      { title: "AI workflow design", summary: "Mapping and redesigning everyday work to use AI deliberately." },
      { title: "Enterprise AI adoption", summary: "Programs that move whole teams from experimentation to everyday use." },
      { title: "Executive workshops", summary: "Focused sessions for leadership teams working on real decisions." },
      { title: "Corporate training programs", summary: "Multi-cohort programs tailored to your roles, tools and policies." },
      { title: "Self-paced digital courses", summary: "On-demand learning for individuals and distributed teams (in development)." },
      { title: "Playbooks and frameworks", summary: "Downloadable tools that turn concepts into repeatable practice (in development)." },
      { title: "Custom learning content", summary: "Learning content designed around your organization’s context and systems." },
    ],
    outcomes: [
      "Leaders who can make informed AI decisions",
      "Teams that redesign their own workflows",
      "Shared language and frameworks across the organization",
      "Measurable shifts in adoption and confidence",
    ],
    engagement: [
      { step: "Assess", detail: "Understand current literacy, roles and the work people actually do." },
      { step: "Design", detail: "Tailor content and format to audiences and outcomes." },
      { step: "Embed", detail: "Deliver, reinforce with practice, and measure adoption." },
    ],
    seo: {
      title: "AI Training for Executives & Corporate AI Training",
      description:
        "AI leadership training, executive workshops and corporate AI training programs that build practical, organization-wide AI capability.",
      keywords: ["AI training for executives", "Corporate AI training", "AI leadership training", "AI literacy"],
    },
  },
];

export function getPractice(slug: PracticeSlug): Practice {
  const practice = practices.find((p) => p.slug === slug);
  if (!practice) throw new Error(`Unknown practice: ${slug}`);
  return practice;
}
