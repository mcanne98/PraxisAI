/** Form option lists. Kept free of Zod so client components can import them without shipping the validator. */
export const interestAreas = [
  "AI Advisory",
  "AI Consulting",
  "AI Training",
  "Corporate Workshops",
  "Speaking Engagements",
  "Technology Partnerships",
  "Other",
] as const;

export const organizationSizes = ["1–10", "11–50", "51–200", "201–1,000", "1,001–5,000", "5,000+"] as const;
