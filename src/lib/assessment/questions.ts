export type DimensionId = "leadership" | "people" | "data" | "technology" | "governance" | "process";

export type Dimension = {
  id: DimensionId;
  name: string;
  short: string;
  description: string;
};

export type Question = {
  id: string;
  dimension: DimensionId;
  text: string;
};

export const dimensions: Dimension[] = [
  {
    id: "leadership",
    name: "Leadership and strategy",
    short: "Leadership",
    description: "Executive ownership, strategic clarity and how AI investment is prioritized.",
  },
  {
    id: "people",
    name: "People and AI literacy",
    short: "People",
    description: "Understanding, skills and confidence to use AI with judgement.",
  },
  {
    id: "data",
    name: "Data and knowledge readiness",
    short: "Data",
    description: "Quality and accessibility of data and institutional knowledge.",
  },
  {
    id: "technology",
    name: "Technology and infrastructure",
    short: "Technology",
    description: "Ability to integrate, secure and operate AI within existing systems.",
  },
  {
    id: "governance",
    name: "Governance and responsible AI",
    short: "Governance",
    description: "Policies, decision rights and controls for safe, accountable use.",
  },
  {
    id: "process",
    name: "Process and operational readiness",
    short: "Process",
    description: "Understanding of workflows and ability to redesign and measure them.",
  },
];

/** Five-point agreement scale. Value 1–5. */
export const scale = [
  { value: 1, label: "Not at all" },
  { value: 2, label: "Slightly" },
  { value: 3, label: "Partially" },
  { value: 4, label: "Largely" },
  { value: 5, label: "Fully" },
] as const;

export const questions: Question[] = [
  // Leadership and strategy
  {
    id: "l1",
    dimension: "leadership",
    text: "Our leadership team shares a clear view of why we are investing in AI and what success looks like.",
  },
  { id: "l2", dimension: "leadership", text: "A named executive is accountable for our AI agenda." },
  { id: "l3", dimension: "leadership", text: "Our AI initiatives are prioritized against defined business outcomes." },
  { id: "l4", dimension: "leadership", text: "We have a consistent way to fund, evaluate and stop AI initiatives." },
  // People and AI literacy
  { id: "p1", dimension: "people", text: "Most employees understand what AI can and cannot reliably do." },
  { id: "p2", dimension: "people", text: "People know which AI tools they are allowed to use, and how." },
  { id: "p3", dimension: "people", text: "We provide role-relevant AI training beyond introductory awareness." },
  { id: "p4", dimension: "people", text: "Managers actively encourage teams to experiment with AI in their work." },
  // Data and knowledge readiness
  { id: "d1", dimension: "data", text: "The data needed for our priority use cases is accessible and of known quality." },
  { id: "d2", dimension: "data", text: "Key institutional knowledge (policies, procedures, expertise) is documented and current." },
  { id: "d3", dimension: "data", text: "Data ownership and stewardship responsibilities are clearly defined." },
  { id: "d4", dimension: "data", text: "We can provide AI systems with relevant, permission-aware context from our own information." },
  // Technology and infrastructure
  {
    id: "t1",
    dimension: "technology",
    text: "We can integrate AI capabilities with our core business systems without bespoke projects each time.",
  },
  { id: "t2", dimension: "technology", text: "Identity, access and security controls extend to the AI tools we use." },
  { id: "t3", dimension: "technology", text: "We can monitor the quality, cost and behaviour of AI systems in use." },
  { id: "t4", dimension: "technology", text: "We have a deliberate approach to selecting AI platforms and vendors." },
  // Governance and responsible AI
  { id: "g1", dimension: "governance", text: "We have an AI use policy that people know about and follow." },
  { id: "g2", dimension: "governance", text: "Decision rights for approving new AI use cases are clear and proportionate." },
  { id: "g3", dimension: "governance", text: "We assess AI use cases for privacy, security, fairness and regulatory risk." },
  { id: "g4", dimension: "governance", text: "Humans remain accountable for decisions supported by AI, with clear oversight." },
  // Process and operational readiness
  { id: "o1", dimension: "process", text: "Our core workflows are documented well enough to be redesigned." },
  { id: "o2", dimension: "process", text: "We measure baselines (time, cost, quality) before changing a process." },
  { id: "o3", dimension: "process", text: "We have redesigned at least one workflow end to end around AI." },
  { id: "o4", dimension: "process", text: "Successful AI improvements are systematically scaled to other teams." },
];
