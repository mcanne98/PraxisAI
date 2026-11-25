import type { DimensionId } from "./questions";
import type { AssessmentResult, DimensionScore } from "./scoring";

/**
 * Rules-based recommendations. Each dimension has guidance for three bands:
 *   foundation (< 40), build (40–69), optimize (>= 70).
 * The top recommendations are drawn from the two lowest-scoring dimensions,
 * because the weakest dimension usually caps the value of the others.
 */

type Band = "foundation" | "build" | "optimize";

export type Recommendation = {
  dimension: DimensionId;
  dimensionName: string;
  band: Band;
  title: string;
  actions: string[];
};

export function bandFor(score: number): Band {
  if (score < 40) return "foundation";
  if (score < 70) return "build";
  return "optimize";
}

const library: Record<DimensionId, Record<Band, { title: string; actions: string[] }>> = {
  leadership: {
    foundation: {
      title: "Establish executive ownership and a shared point of view",
      actions: [
        "Name one accountable executive for the AI agenda.",
        "Run a leadership session to agree why you are investing in AI and what success looks like.",
        "Inventory current AI activity so leadership can see what already exists.",
      ],
    },
    build: {
      title: "Turn intent into a prioritized portfolio",
      actions: [
        "Score candidate use cases against value, feasibility and risk.",
        "Define how AI initiatives are funded, reviewed and stopped.",
        "Link each priority initiative to a measurable business outcome.",
      ],
    },
    optimize: {
      title: "Steer AI as a strategic portfolio",
      actions: [
        "Review the AI portfolio quarterly against realized outcomes.",
        "Build AI considerations into business planning, not alongside it.",
      ],
    },
  },
  people: {
    foundation: {
      title: "Build baseline AI literacy",
      actions: [
        "Provide practical AI fundamentals training for all staff.",
        "Publish plain-language guidance on approved tools and acceptable use.",
        "Identify and support early adopters who can help peers.",
      ],
    },
    build: {
      title: "Move from awareness to role-specific capability",
      actions: [
        "Design training around the real workflows of priority roles.",
        "Equip managers to lead AI adoption in their teams.",
        "Create communities of practice to share what works.",
      ],
    },
    optimize: {
      title: "Make AI capability self-sustaining",
      actions: [
        "Build AI skills into role profiles, onboarding and development plans.",
        "Measure adoption and confidence over time, not just training completion.",
      ],
    },
  },
  data: {
    foundation: {
      title: "Get the information foundations in order",
      actions: [
        "Identify the data and knowledge your top use cases depend on.",
        "Assign owners for critical data and knowledge assets.",
        "Start documenting essential policies and procedures in a single, current source.",
      ],
    },
    build: {
      title: "Engineer context for AI",
      actions: [
        "Structure key knowledge so AI systems can use it with permissions intact.",
        "Address data quality issues that block priority use cases.",
        "Establish a process to keep shared knowledge current.",
      ],
    },
    optimize: {
      title: "Treat knowledge as a managed asset",
      actions: [
        "Apply knowledge-protocol practices so AI behaviour stays consistent as knowledge changes.",
        "Measure the quality and freshness of the context AI systems rely on.",
      ],
    },
  },
  technology: {
    foundation: {
      title: "Create a secure, sanctioned path for AI use",
      actions: [
        "Select and secure a small set of approved AI tools.",
        "Extend identity and access controls to those tools.",
        "Document the integration points with your core systems.",
      ],
    },
    build: {
      title: "Make AI integration repeatable",
      actions: [
        "Establish reusable integration patterns rather than one-off builds.",
        "Introduce monitoring for AI quality, usage and cost.",
        "Define vendor evaluation criteria aligned to your requirements.",
      ],
    },
    optimize: {
      title: "Operate AI as a platform capability",
      actions: [
        "Standardize evaluation and monitoring across AI systems.",
        "Plan architecture for agentic workflows with clear guardrails.",
      ],
    },
  },
  governance: {
    foundation: {
      title: "Put proportionate guardrails in place",
      actions: [
        "Publish a concise AI use policy and communicate it widely.",
        "Define who can approve new AI use cases and how quickly.",
        "Review current AI use for privacy and security exposure.",
      ],
    },
    build: {
      title: "Make governance an enabler",
      actions: [
        "Introduce risk-tiered review so low-risk use cases move fast.",
        "Assess use cases for privacy, fairness and regulatory obligations.",
        "Clarify human accountability for AI-supported decisions.",
      ],
    },
    optimize: {
      title: "Mature responsible AI practice",
      actions: ["Monitor deployed AI for drift, bias and incidents.", "Report AI risk and performance to leadership and the board."],
    },
  },
  process: {
    foundation: {
      title: "Understand the work before changing it",
      actions: [
        "Map two or three high-volume workflows end to end.",
        "Capture baseline time, cost and quality measures.",
        "Identify where judgement-light work creates bottlenecks.",
      ],
    },
    build: {
      title: "Redesign workflows, not just tasks",
      actions: [
        "Redesign one priority workflow end to end around AI and people.",
        "Measure results against the baseline and share them.",
        "Define how exceptions and errors are caught and handled.",
      ],
    },
    optimize: {
      title: "Scale what works",
      actions: ["Create a repeatable approach for scaling proven improvements.", "Build continuous improvement into AI-enabled processes."],
    },
  },
};

export function recommendationFor(d: DimensionScore): Recommendation {
  const band = bandFor(d.score);
  const entry = library[d.id][band];
  return { dimension: d.id, dimensionName: d.name, band, ...entry };
}

export type NextStep = {
  title: string;
  description: string;
  href: string;
  cta: string;
};

/** Suggests a practice based on the overall picture. */
export function nextStepFor(result: AssessmentResult): NextStep {
  const lowest = result.priorities[0];
  if (result.overall < 40) {
    return {
      title: "Start with shared understanding",
      description:
        "Your results suggest the biggest gains will come from building leadership alignment and AI literacy before larger investments.",
      href: "/academy/workshops",
      cta: "Explore executive workshops",
    };
  }
  if (lowest.id === "data" || lowest.id === "technology" || lowest.id === "process") {
    return {
      title: "Strengthen the foundations for execution",
      description:
        "Your organization has direction, but execution foundations are holding back value. A focused implementation roadmap can close the gap.",
      href: "/consulting",
      cta: "Explore Praxis Consulting",
    };
  }
  return {
    title: "Sharpen strategy, governance and ownership",
    description:
      "Your results point to leadership, people or governance as the constraint. Independent advisory can help focus priorities and put the right guardrails in place.",
    href: "/advisory",
    cta: "Explore Praxis Advisory",
  };
}

export function buildRecommendations(result: AssessmentResult): {
  priority: Recommendation[];
  all: Recommendation[];
  nextStep: NextStep;
} {
  const all = result.dimensions.map(recommendationFor);
  const priority = result.priorities.slice(0, 2).map(recommendationFor);
  return { priority, all, nextStep: nextStepFor(result) };
}
