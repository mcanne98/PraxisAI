import { dimensions, questions, type DimensionId } from "./questions";

/**
 * Scoring methodology (also explained on /ai-readiness):
 * - Each answer is 1–5.
 * - A dimension score is the mean of its answers, rescaled to 0–100:
 *     score = (mean − 1) / 4 × 100
 * - The overall score is the unweighted mean of the six dimension scores.
 * - Maturity levels are fixed 20-point bands.
 */

export type Answers = Record<string, number>;

export type MaturityLevel = {
  id: "exploring" | "emerging" | "developing" | "scaling" | "leading";
  name: string;
  min: number;
  description: string;
};

export const maturityLevels: MaturityLevel[] = [
  { id: "exploring", name: "Exploring", min: 0, description: "AI is mostly ad hoc. Foundations for value creation are not yet in place." },
  { id: "emerging", name: "Emerging", min: 20, description: "Early activity exists, but direction, skills and controls are inconsistent." },
  {
    id: "developing",
    name: "Developing",
    min: 40,
    description: "Key foundations are forming. The priority now is focus, enablement and measurement.",
  },
  { id: "scaling", name: "Scaling", min: 60, description: "AI is creating value in places. The challenge is consistency and scale." },
  { id: "leading", name: "Leading", min: 80, description: "AI is embedded in strategy and operations, with continuous improvement." },
];

export type DimensionScore = {
  id: DimensionId;
  name: string;
  short: string;
  score: number;
  level: MaturityLevel;
};

export type AssessmentResult = {
  overall: number;
  level: MaturityLevel;
  dimensions: DimensionScore[];
  /** Lowest-scoring dimensions first */
  priorities: DimensionScore[];
};

export function toScore(mean: number): number {
  return Math.round(((mean - 1) / 4) * 100);
}

export function levelFor(score: number): MaturityLevel {
  return [...maturityLevels].reverse().find((l) => score >= l.min) ?? maturityLevels[0];
}

export function isComplete(answers: Answers): boolean {
  return questions.every((q) => isValidAnswer(answers[q.id]));
}

function isValidAnswer(v: unknown): v is number {
  return typeof v === "number" && Number.isInteger(v) && v >= 1 && v <= 5;
}

export function scoreAssessment(answers: Answers): AssessmentResult {
  if (!isComplete(answers)) {
    throw new Error("All questions must be answered with a value from 1 to 5.");
  }
  const dimensionScores: DimensionScore[] = dimensions.map((d) => {
    const values = questions.filter((q) => q.dimension === d.id).map((q) => answers[q.id]);
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const score = toScore(mean);
    return { id: d.id, name: d.name, short: d.short, score, level: levelFor(score) };
  });
  const overall = Math.round(dimensionScores.reduce((a, d) => a + d.score, 0) / dimensionScores.length);
  const priorities = [...dimensionScores].sort((a, b) => a.score - b.score);
  return { overall, level: levelFor(overall), dimensions: dimensionScores, priorities };
}
