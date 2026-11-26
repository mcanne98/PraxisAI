/**
 * Global site configuration.
 * Values marked CONFIRM require owner sign-off before public launch.
 */
export const site = {
  name: "Praxis Intelligence",
  tagline: "From Knowledge to Impact.",
  brandStatement: "Learn. Apply. Transform.",
  description:
    "Praxis Intelligence is an AI advisory, consulting and education firm helping leaders move from AI experimentation to measurable business outcomes.",
  /** Canonical origin. Set NEXT_PUBLIC_SITE_URL in each environment. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  /** CONFIRM: operating location used for local SEO. */
  location: {
    region: "Ontario",
    country: "Canada",
    countryCode: "CA",
    display: "Ontario, Canada",
  },
  areaServed: ["Canada", "United States"],
  /** Public contact address (Cloudflare Email Routing → owner's inbox). */
  email: "praxis@cedricanne.com",
  founder: {
    name: "Cedric Anne",
    linkedin: "https://www.linkedin.com/in/cedricanne/",
    blog: "https://blog.cedricanne.com",
  },
  cta: {
    primary: { label: "Let’s Talk AI", href: "/contact" },
    secondary: { label: "Explore Our Services", href: "/#practices" },
    start: { label: "Start Your AI Journey", href: "/ai-readiness" },
  },
} as const;

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Advisory", href: "/advisory" },
  { label: "Consulting", href: "/consulting" },
  { label: "Academy", href: "/academy" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Practices",
    items: [
      { label: "Praxis Advisory", href: "/advisory" },
      { label: "Praxis Consulting", href: "/consulting" },
      { label: "Praxis Academy", href: "/academy" },
    ],
  },
  {
    title: "Academy",
    items: [
      { label: "Courses", href: "/academy/courses" },
      { label: "Workshops", href: "/academy/workshops" },
      { label: "Resources", href: "/academy/resources" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Insights", href: "/insights" },
      { label: "AI Readiness Assessment", href: "/ai-readiness" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];
