"use client";

import { useState } from "react";
import { methodStages } from "@/content/method";
import { cn } from "@/lib/utils";

const SIZE = 360;
const CENTER = SIZE / 2;
const RADIUS = 138;

function position(i: number) {
  const angle = (-90 + i * (360 / methodStages.length)) * (Math.PI / 180);
  return { x: CENTER + RADIUS * Math.cos(angle), y: CENTER + RADIUS * Math.sin(angle) };
}

/**
 * Interactive cycle diagram. Stages are real buttons; the detail panel updates
 * with a short CSS transition (disabled under prefers-reduced-motion globally).
 * Deliberately dependency-free: see docs/DECISIONS.md (ADR-006).
 */
export function PraxisMethod() {
  const [active, setActive] = useState(0);
  const stage = methodStages[active];

  return (
    <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
      {/* Cycle diagram */}
      <div className="relative mx-auto w-full max-w-[400px]">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-auto w-full" aria-hidden="true">
          <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="var(--color-rule)" strokeWidth="1.5" />
          <circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
            stroke="var(--color-blue-ink)"
            strokeWidth="2.5"
            strokeLinecap="round"
            transform={`rotate(-90 ${CENTER} ${CENTER})`}
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset={1 - (active + 1) / methodStages.length}
            style={{ transition: "stroke-dashoffset 0.6s var(--ease-praxis)" }}
          />
          {/* direction arrow */}
          <path d={`M${CENTER - 8} ${CENTER - RADIUS - 6} l8 6 l-8 6`} fill="none" stroke="var(--color-blue-ink)" strokeWidth="2" />
          <text
            x={CENTER}
            y={CENTER - 6}
            textAnchor="middle"
            fontFamily="var(--font-display)"
            fontSize="13"
            fontWeight="600"
            letterSpacing="2.5"
            fill="var(--color-ink-muted)"
          >
            THE PRAXIS
          </text>
          <text
            x={CENTER}
            y={CENTER + 16}
            textAnchor="middle"
            fontFamily="var(--font-display)"
            fontSize="13"
            fontWeight="600"
            letterSpacing="2.5"
            fill="var(--color-ink-muted)"
          >
            METHOD
          </text>
        </svg>
        <div role="group" aria-label="Praxis Method stages" className="absolute inset-0">
          {methodStages.map((s, i) => {
            const { x, y } = position(i);
            const selected = i === active;
            return (
              <button
                key={s.name}
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                style={{ left: `${(x / SIZE) * 100}%`, top: `${(y / SIZE) * 100}%` }}
                className={cn("absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 rounded-full")}
              >
                <span
                  className={cn(
                    "flex size-12 items-center justify-center rounded-full border-2 font-display text-sm font-bold transition-all duration-300 sm:size-14",
                    selected
                      ? "scale-110 border-blue-ink bg-blue-ink text-white shadow-lg shadow-blue/30"
                      : "border-rule bg-paper text-ink hover:border-blue-ink",
                  )}
                >
                  {s.number}
                </span>
                <span
                  className={cn(
                    "rounded-full bg-paper px-2 text-xs font-semibold sm:text-sm",
                    selected ? "text-blue-ink" : "text-ink-muted",
                  )}
                >
                  {s.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail panel */}
      <div aria-live="polite" className="min-h-[260px]">
        <div key={stage.name} className="animate-[method-in_0.32s_var(--ease-praxis)]">
          <p className="font-display text-sm font-semibold tracking-[0.18em] text-teal-ink uppercase">
            Stage {stage.number} of {methodStages.length}
          </p>
          <h3 className="mt-3 text-4xl font-bold text-ink">{stage.name}</h3>
          <p className="mt-3 text-xl font-medium text-ink">{stage.summary}</p>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">{stage.detail}</p>
          <p className="mt-6 border-l-2 border-blue-ink pl-4 font-serif text-xl text-ink italic">“{stage.question}”</p>
        </div>
      </div>
    </div>
  );
}
