import { describe, expect, it } from "vitest";
import { clean, contactSchema, fieldErrorsFrom, interestSchema } from "@/lib/validation/schemas";

const valid = {
  fullName: "  Alex Morgan ",
  email: "Alex@Example.COM",
  organization: "Example Co",
  jobTitle: "COO",
  interest: "AI Advisory",
  organizationSize: "51–200",
  message: "We would like to discuss an AI readiness assessment for our operations team.",
  consentContact: "on",
  website: "",
  startedAt: "1700000000000",
};

describe("clean", () => {
  it("strips control characters and trims, keeping newlines", () => {
    expect(clean("  hi\u0000 there\u0007\n ok ")).toBe("hi there\n ok");
  });
});

describe("contactSchema", () => {
  it("accepts and normalizes a valid submission", () => {
    const r = contactSchema.safeParse(valid);
    expect(r.success).toBe(true);
    if (r.success) {
      expect(r.data.fullName).toBe("Alex Morgan");
      expect(r.data.email).toBe("alex@example.com");
      expect(r.data.consentContact).toBe(true);
      expect(r.data.consentMarketing).toBe(false);
    }
  });

  it("requires consent to be contacted", () => {
    const r = contactSchema.safeParse({ ...valid, consentContact: undefined });
    expect(r.success).toBe(false);
    if (!r.success) expect(fieldErrorsFrom(r.error).consentContact).toBeDefined();
  });

  it("reports field-level errors", () => {
    const r = contactSchema.safeParse({ ...valid, email: "not-an-email", message: "short", interest: "Bogus" });
    expect(r.success).toBe(false);
    if (!r.success) {
      const errors = fieldErrorsFrom(r.error);
      expect(Object.keys(errors).sort()).toEqual(["email", "interest", "message"]);
    }
  });

  it("rejects a filled honeypot", () => {
    expect(contactSchema.safeParse({ ...valid, website: "http://spam.example" }).success).toBe(false);
  });

  it("enforces length limits", () => {
    expect(contactSchema.safeParse({ ...valid, message: "x".repeat(4001) }).success).toBe(false);
  });
});

describe("interestSchema", () => {
  it("requires explicit marketing consent (CASL)", () => {
    const base = { email: "a@b.co", topic: "Agentic AI", website: "", startedAt: "0" };
    expect(interestSchema.safeParse(base).success).toBe(false);
    expect(interestSchema.safeParse({ ...base, consentMarketing: "on" }).success).toBe(true);
  });
});
