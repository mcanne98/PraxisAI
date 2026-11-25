/** The Praxis Method — a continuous five-stage capability cycle. */
export type MethodStage = {
  number: number;
  name: string;
  summary: string;
  detail: string;
  question: string;
};

export const methodStages: MethodStage[] = [
  {
    number: 1,
    name: "Understand",
    summary: "Build AI literacy and establish organizational context.",
    detail:
      "Shared understanding comes before strategy. We establish what AI can and cannot do for your organization, and where you stand today.",
    question: "What do we know, and what do we need to learn?",
  },
  {
    number: 2,
    name: "Envision",
    summary: "Identify opportunities and define strategic direction.",
    detail:
      "We translate understanding into a prioritized set of opportunities tied to business outcomes, with clear criteria for what not to pursue.",
    question: "Where will AI create the most value for us?",
  },
  {
    number: 3,
    name: "Enable",
    summary: "Develop the people, processes and technology capabilities.",
    detail:
      "Capability is the constraint. We build the skills, data foundations, governance and operating model that make execution possible.",
    question: "What must be true for this to work?",
  },
  {
    number: 4,
    name: "Execute",
    summary: "Implement solutions and redesign workflows.",
    detail:
      "We deliver working solutions inside real workflows — measured against a baseline and designed for the people who will use them.",
    question: "How do we turn intent into results?",
  },
  {
    number: 5,
    name: "Evolve",
    summary: "Measure outcomes, learn and continuously improve.",
    detail:
      "Results feed the next cycle. We measure what changed, capture what was learned and raise the organization’s baseline for the next round.",
    question: "What did we learn, and what comes next?",
  },
];
