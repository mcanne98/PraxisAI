import { describe, expect, it } from "vitest";
import { dimensions, questions } from "@/lib/assessment/questions";
import { isComplete, levelFor, scoreAssessment, toScore, type Answers } from "@/lib/assessment/scoring";
import { bandFor, buildRecommendations, nextStepFor } from "@/lib/assessment/recommendations";

function answerAll(value: number | ((dim: string) => number)): Answers {
  return Object.fromEntries(questions.map((q) => [q.id, typeof value === "number" ? value : value(q.dimension)]));
}

describe("assessment questions", () => {
  it("has 18–24 questions spread evenly across six dimensions", () => {
    expect(dimensions).toHaveLength(6);
    expect(questions.length).toBeGreaterThanOrEqual(18);
    expect(questions.length).toBeLessThanOrEqual(24);
    for (const d of dimensions) {
      expect(questions.filter((q) => q.dimension === d.id)).toHaveLength(questions.length / 6);
    }
  });

  it("has unique question ids", () => {
    expect(new Set(questions.map((q) => q.id)).size).toBe(questions.length);
  });
});

describe("scoring", () => {
  it("maps means to a 0–100 scale", () => {
    expect(toScore(1)).toBe(0);
    expect(toScore(3)).toBe(50);
    expect(toScore(5)).toBe(100);
    expect(toScore(2.25)).toBe(31);
  });

  it("assigns maturity levels at band boundaries", () => {
    expect(levelFor(0).id).toBe("exploring");
    expect(levelFor(19).id).toBe("exploring");
    expect(levelFor(20).id).toBe("emerging");
    expect(levelFor(59).id).toBe("developing");
    expect(levelFor(60).id).toBe("scaling");
    expect(levelFor(100).id).toBe("leading");
  });

  it("scores all-minimum and all-maximum answers", () => {
    expect(scoreAssessment(answerAll(1)).overall).toBe(0);
    expect(scoreAssessment(answerAll(5)).overall).toBe(100);
    expect(scoreAssessment(answerAll(3)).level.id).toBe("developing");
  });

  it("computes per-dimension scores and orders priorities lowest first", () => {
    const result = scoreAssessment(answerAll((d) => (d === "data" ? 1 : d === "governance" ? 2 : 4)));
    expect(result.dimensions.find((d) => d.id === "data")?.score).toBe(0);
    expect(result.dimensions.find((d) => d.id === "governance")?.score).toBe(25);
    expect(result.priorities[0].id).toBe("data");
    expect(result.priorities[1].id).toBe("governance");
    // overall = mean of (0, 25, 75, 75, 75, 75)
    expect(result.overall).toBe(54);
  });

  it("rejects incomplete or invalid answers", () => {
    const partial = answerAll(3);
    delete partial[questions[0].id];
    expect(isComplete(partial)).toBe(false);
    expect(() => scoreAssessment(partial)).toThrow();
    expect(isComplete({ ...answerAll(3), [questions[0].id]: 6 })).toBe(false);
    expect(isComplete({ ...answerAll(3), [questions[0].id]: 2.5 })).toBe(false);
  });
});

describe("recommendations", () => {
  it("selects bands by score", () => {
    expect(bandFor(0)).toBe("foundation");
    expect(bandFor(39)).toBe("foundation");
    expect(bandFor(40)).toBe("build");
    expect(bandFor(69)).toBe("build");
    expect(bandFor(70)).toBe("optimize");
  });

  it("returns two priority recommendations from the lowest dimensions and one per dimension overall", () => {
    const result = scoreAssessment(answerAll((d) => (d === "people" ? 1 : d === "process" ? 2 : 5)));
    const recs = buildRecommendations(result);
    expect(recs.priority.map((r) => r.dimension)).toEqual(["people", "process"]);
    expect(recs.priority[0].band).toBe("foundation");
    expect(recs.all).toHaveLength(6);
    expect(recs.all.every((r) => r.actions.length > 0)).toBe(true);
  });

  it("suggests the Academy for low overall readiness", () => {
    expect(nextStepFor(scoreAssessment(answerAll(1))).href).toBe("/academy/workshops");
  });

  it("suggests Consulting when execution foundations are weakest", () => {
    const result = scoreAssessment(answerAll((d) => (d === "technology" ? 2 : 4)));
    expect(nextStepFor(result).href).toBe("/consulting");
  });

  it("suggests Advisory when leadership, people or governance is weakest", () => {
    const result = scoreAssessment(answerAll((d) => (d === "governance" ? 2 : 4)));
    expect(nextStepFor(result).href).toBe("/advisory");
  });
});
