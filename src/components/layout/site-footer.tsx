import Link from "next/link";
import { footerNav, site } from "@/content/site";
import { Wordmark } from "@/components/brand/wordmark";
import { Container } from "@/components/ui/primitives";

/** Evaluated at build time (pages are static); refreshed on every deploy. */
function CopyrightYear() {
  return <>{new Date().getFullYear()}</>;
}

export function SiteFooter() {
  return (
    <footer className="dark-surface bg-midnight text-paper">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Wordmark />
            <p className="mt-6 max-w-sm font-display text-2xl leading-snug font-semibold text-paper">{site.tagline}</p>
            <p className="mt-2 text-sm text-mist">{site.brandStatement}</p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerNav.map((group) => (
              <div key={group.title}>
                <h2 className="font-display text-xs font-semibold tracking-[0.16em] text-mist uppercase">{group.title}</h2>
                <ul className="mt-4 space-y-3">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="text-sm text-paper/85 hover:text-teal">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="mt-16 flex flex-col gap-4 border-t border-paper/10 pt-8 text-sm text-mist sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear /> {site.name}. {site.location.display}.
          </p>
          <ul className="flex gap-5">
            <li>
              <a href={site.founder.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-teal">
                LinkedIn<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a href={site.founder.blog} target="_blank" rel="noopener noreferrer" className="hover:text-teal">
                Blog<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
