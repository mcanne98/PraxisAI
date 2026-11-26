import type { Metadata } from "next";
import { site } from "@/content/site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  keywords?: readonly string[];
  type?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
};

/** Builds consistent per-page metadata with canonical URL and social tags. */
export function pageMetadata({ title, description, path, keywords, type = "website", publishedTime, noIndex }: PageMetaInput): Metadata {
  return {
    title,
    description,
    keywords: keywords ? [...keywords] : undefined,
    alternates: { canonical: path },
    openGraph: {
      type,
      title,
      description,
      url: path,
      siteName: site.name,
      locale: "en_CA",
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: { card: "summary_large_image", title, description },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}

/* ---------- JSON-LD builders (only facts that are true today) ---------- */

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    logo: `${site.url}/icon.svg`,
    slogan: site.tagline,
    email: site.email,
    description: site.description,
    founder: { "@type": "Person", name: site.founder.name, sameAs: [site.founder.linkedin, site.founder.blog] },
  };
}

export function professionalServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#service`,
    name: site.name,
    url: site.url,
    description: site.description,
    parentOrganization: { "@id": `${site.url}/#organization` },
    address: { "@type": "PostalAddress", addressRegion: site.location.region, addressCountry: site.location.countryCode },
    areaServed: site.areaServed.map((name) => ({ "@type": "Country", name })),
    knowsAbout: [
      "Enterprise AI strategy",
      "AI governance",
      "Agentic AI",
      "AI transformation consulting",
      "AI training for executives",
      "Healthcare AI",
    ],
  };
}

export function serviceJsonLd(name: string, description: string, path: string, services: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${site.url}${path}`,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: site.areaServed.map((n) => ({ "@type": "Country", name: n })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name,
      itemListElement: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s } })),
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

export function articleJsonLd(a: {
  title: string;
  description: string;
  path: string;
  published: string;
  updated?: string;
  author: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    url: `${site.url}${a.path}`,
    mainEntityOfPage: `${site.url}${a.path}`,
    datePublished: a.published,
    dateModified: a.updated ?? a.published,
    author: { "@type": "Organization", name: a.author, url: site.url },
    publisher: { "@id": `${site.url}/#organization` },
  };
}
