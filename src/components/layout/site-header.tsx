import Link from "next/link";
import { Suspense } from "react";
import { mainNav, site } from "@/content/site";
import { Wordmark } from "@/components/brand/wordmark";
import { ButtonLink, Container } from "@/components/ui/primitives";
import { DesktopNav, MobileNav } from "./nav-client";

function StaticDesktopNav() {
  return (
    <ul className="flex items-center gap-1">
      {mainNav.slice(0, 5).map((item) => (
        <li key={item.href}>
          <Link href={item.href} className="rounded-full px-3.5 py-2 text-sm font-medium text-mist hover:text-paper">
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function SiteHeader() {
  return (
    <header className="dark-surface sticky top-0 z-50 border-b border-paper/10 bg-midnight">
      <Container className="flex h-16 items-center justify-between gap-6 sm:h-[4.5rem]">
        <Link href="/" className="rounded-md" aria-label={`${site.name} — home`}>
          <Wordmark />
        </Link>
        <nav aria-label="Main" className="hidden lg:block">
          <Suspense fallback={<StaticDesktopNav />}>
            <DesktopNav />
          </Suspense>
        </nav>
        <div className="flex items-center gap-2">
          <ButtonLink href={site.cta.primary.href} tone="dark" className="hidden min-h-10 px-5 py-2 text-sm sm:inline-flex">
            {site.cta.primary.label}
          </ButtonLink>
          <Suspense fallback={null}>
            <MobileNav />
          </Suspense>
        </div>
      </Container>
    </header>
  );
}
