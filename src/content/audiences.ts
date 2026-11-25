export type Audience = {
  id: string;
  title: string;
  challenge: string;
  howWeHelp: string;
  href: string;
};

export const audiences: Audience[] = [
  {
    id: "executives",
    title: "CEOs and executive teams",
    challenge: "Pressure to act on AI without a clear view of where it pays off.",
    howWeHelp: "An independent strategy, a defensible investment case and governance that lets you move with confidence.",
    href: "/advisory",
  },
  {
    id: "technology",
    title: "Technology and product leaders",
    challenge: "Pilots that impress in demos but stall before production.",
    howWeHelp: "Architecture, context engineering and delivery practices that get AI into the workflows that matter.",
    href: "/consulting",
  },
  {
    id: "healthcare",
    title: "Healthcare organizations",
    challenge: "Real potential, constrained by clinical workflows, privacy and regulation.",
    howWeHelp: "AI strategy and implementation designed around care delivery, data stewardship and trust.",
    href: "/consulting",
  },
  {
    id: "smb",
    title: "Small and medium-sized businesses",
    challenge: "Limited time and budget, and no room for expensive experiments.",
    howWeHelp: "Focused, right-sized engagements that target a few high-value workflows first.",
    href: "/contact",
  },
  {
    id: "learning",
    title: "Learning and development teams",
    challenge: "Demand for AI skills that generic courses do not meet.",
    howWeHelp: "Tailored programs, executive workshops and frameworks your people can apply the next day.",
    href: "/academy",
  },
  {
    id: "professionals",
    title: "Professionals preparing for an AI-first future",
    challenge: "Uncertainty about which skills will matter and where to start.",
    howWeHelp: "Practical learning paths in AI fundamentals, prompt and context engineering and AI-enabled work.",
    href: "/academy",
  },
];
