import { methodStages } from "@/content/method";

/** Static, fully accessible list version — used for no-JS / print and as a summary. */
export function PraxisMethodList() {
  return (
    <ol className="grid gap-px overflow-hidden rounded-2xl border border-rule bg-rule sm:grid-cols-5">
      {methodStages.map((s) => (
        <li key={s.name} className="bg-paper p-6">
          <span className="font-display text-sm font-bold text-blue-ink">0{s.number}</span>
          <p className="mt-2 font-display text-lg font-semibold">{s.name}</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.summary}</p>
        </li>
      ))}
    </ol>
  );
}
