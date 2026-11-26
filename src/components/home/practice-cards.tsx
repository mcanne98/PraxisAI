import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { practices } from "@/content/practices";

const accents = {
  advisory: "from-blue/25",
  consulting: "from-teal/25",
  academy: "from-blue-soft/25",
} as const;

export function PracticeCards() {
  return (
    <ul className="grid gap-5 lg:grid-cols-3">
      {practices.map((p, i) => (
        <li key={p.slug}>
          <Link
            href={`/${p.slug}`}
            className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-paper/10 bg-slate-deep p-7 transition-all duration-300 hover:-translate-y-1 hover:border-paper/25 sm:p-8"
          >
            <span
              aria-hidden
              className={`pointer-events-none absolute -top-24 -right-24 size-56 rounded-full bg-gradient-to-br ${accents[p.slug]} to-transparent opacity-60 blur-2xl transition-opacity duration-300 group-hover:opacity-100`}
            />
            <div className="flex items-center justify-between">
              <span className="font-display text-xs font-semibold tracking-[0.18em] text-teal uppercase">
                0{i + 1} · {p.verb}
              </span>
              <ArrowUpRight
                aria-hidden
                className="size-5 text-mist transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-paper"
              />
            </div>
            <h3 className="mt-8 text-2xl font-bold text-paper">{p.name}</h3>
            <p className="mt-1 font-serif text-xl text-blue-soft italic">{p.cardTitle}</p>
            <p className="mt-5 leading-relaxed text-mist">{p.summary}</p>
            <ul className="mt-6 space-y-2 border-t border-paper/10 pt-6 text-sm text-paper/85">
              {p.services.slice(0, 4).map((s) => (
                <li key={s.title} className="flex gap-2.5">
                  <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-teal" />
                  {s.title}
                </li>
              ))}
            </ul>
            <span className="mt-auto pt-8 text-sm font-semibold text-paper">
              Explore {p.name}
              <span className="sr-only">: {p.coreMessage}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
