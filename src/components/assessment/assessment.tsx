"use client";

import Link from "next/link";
import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { dimensions, questions, scale } from "@/lib/assessment/questions";
import { maturityLevels, scoreAssessment, type Answers, type AssessmentResult } from "@/lib/assessment/scoring";
import { buildRecommendations } from "@/lib/assessment/recommendations";
import { submitAssessmentLead } from "@/app/actions";
import { idleState } from "@/lib/forms/types";
import { buttonClasses } from "@/components/ui/primitives";
import {
  AntiSpamFields,
  Checkbox,
  DeliveryNotice,
  FormStatusMessage,
  FormValuesProvider,
  SubmitButton,
  TextField,
  fieldError,
} from "@/components/forms/fields";
import { cn } from "@/lib/utils";

type Step = { kind: "intro" } | { kind: "dimension"; index: number } | { kind: "results" };

export function Assessment({ deliveryEnabled }: { deliveryEnabled: boolean }) {
  const [step, setStep] = useState<Step>({ kind: "intro" });
  const [answers, setAnswers] = useState<Answers>({});
  const headingRef = useRef<HTMLHeadingElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
    rootRef.current?.scrollIntoView({ block: "start" });
  }, [step]);

  const answeredCount = Object.keys(answers).length;
  const result = useMemo(() => (step.kind === "results" ? scoreAssessment(answers) : null), [step, answers]);

  if (step.kind === "intro") {
    return (
      <div ref={rootRef} className="rounded-2xl border border-ink/10 bg-white p-7 sm:p-10">
        <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-bold sm:text-3xl">
          {questions.length} questions. About ten minutes.
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
          Rate how well each statement describes your organization today. Answer for the organization as it is, not as you hope it will be.
          No personal information is required to see your results, and your answers stay in your browser.
        </p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {dimensions.map((d, i) => (
            <li key={d.id} className="flex gap-3 rounded-xl bg-paper p-4">
              <span className="font-display text-sm font-bold text-blue-ink">0{i + 1}</span>
              <span>
                <span className="block font-semibold">{d.name}</span>
                <span className="text-sm text-ink-muted">{d.description}</span>
              </span>
            </li>
          ))}
        </ul>
        <button type="button" onClick={() => setStep({ kind: "dimension", index: 0 })} className={cn(buttonClasses("primary"), "mt-10")}>
          Start the assessment <ArrowRight aria-hidden className="size-4" />
        </button>
      </div>
    );
  }

  if (step.kind === "dimension") {
    const dim = dimensions[step.index];
    const dimQuestions = questions.filter((q) => q.dimension === dim.id);
    const complete = dimQuestions.every((q) => answers[q.id]);
    const isLast = step.index === dimensions.length - 1;
    const progress = Math.round((answeredCount / questions.length) * 100);

    return (
      <div ref={rootRef} className="rounded-2xl border border-ink/10 bg-white p-6 sm:p-10">
        <div>
          <div className="flex items-center justify-between text-sm font-medium text-ink-muted">
            <span>
              Section {step.index + 1} of {dimensions.length}
            </span>
            <span>
              {answeredCount} of {questions.length} answered
            </span>
          </div>
          <div
            role="progressbar"
            aria-label="Assessment progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            className="mt-3 h-1.5 overflow-hidden rounded-full bg-rule"
          >
            <div className="h-full rounded-full bg-blue-ink transition-[width] duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <h2 ref={headingRef} tabIndex={-1} className="mt-8 text-2xl font-bold sm:text-3xl">
          {dim.name}
        </h2>
        <p className="mt-2 text-ink-muted">{dim.description}</p>

        <div className="mt-8 space-y-8">
          {dimQuestions.map((q, qi) => (
            <fieldset key={q.id} className="border-t border-rule pt-6">
              <legend className="float-left w-full text-lg font-medium text-ink">
                <span className="mr-2 font-display text-sm font-bold text-blue-ink">{step.index * 4 + qi + 1}.</span>
                {q.text}
              </legend>
              <div className="clear-both grid grid-cols-5 gap-2 pt-4">
                {scale.map((s) => {
                  const id = `${q.id}-${s.value}`;
                  const checked = answers[q.id] === s.value;
                  return (
                    <div key={s.value}>
                      <input
                        type="radio"
                        id={id}
                        name={q.id}
                        value={s.value}
                        checked={checked}
                        onChange={() => setAnswers((a) => ({ ...a, [q.id]: s.value }))}
                        className="peer sr-only"
                      />
                      <label
                        htmlFor={id}
                        className="flex h-full min-h-16 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-ink/15 px-1 py-3 text-center transition-colors peer-checked:border-blue-ink peer-checked:bg-blue-ink peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-blue-ink peer-focus-visible:ring-offset-2 hover:border-blue-ink"
                      >
                        <span className="font-display text-lg font-bold">{s.value}</span>
                        <span className="text-[0.7rem] leading-tight sm:text-xs">{s.label}</span>
                      </label>
                    </div>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>

        <div className="mt-10 flex flex-col-reverse gap-3 border-t border-rule pt-6 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => setStep(step.index === 0 ? { kind: "intro" } : { kind: "dimension", index: step.index - 1 })}
            className={buttonClasses("secondary")}
          >
            <ArrowLeft aria-hidden className="size-4" /> Back
          </button>
          <div className="flex flex-col items-stretch gap-2 sm:items-end">
            <button
              type="button"
              disabled={!complete}
              aria-describedby={!complete ? "next-hint" : undefined}
              onClick={() => setStep(isLast ? { kind: "results" } : { kind: "dimension", index: step.index + 1 })}
              className={buttonClasses("primary")}
            >
              {isLast ? "See my results" : "Next section"} <ArrowRight aria-hidden className="size-4" />
            </button>
            {!complete && (
              <p id="next-hint" className="text-sm text-ink-muted">
                Answer all {dimQuestions.length} statements to continue.
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={rootRef}>
      <Results
        result={result!}
        headingRef={headingRef}
        deliveryEnabled={deliveryEnabled}
        onRestart={() => {
          setAnswers({});
          setStep({ kind: "intro" });
        }}
      />
    </div>
  );
}

function MaturityScale({ score }: { score: number }) {
  return (
    <div>
      <div className="relative">
        <div className="grid grid-cols-5 gap-1" aria-hidden>
          {maturityLevels.map((l, i) => (
            <div
              key={l.id}
              className="h-3 rounded-sm"
              style={{ background: `color-mix(in oklab, var(--color-blue) ${20 + i * 20}%, var(--color-rule))` }}
            />
          ))}
        </div>
        <div
          aria-hidden
          className="absolute -top-1.5 h-6 w-1 -translate-x-1/2 rounded-full bg-midnight ring-2 ring-white"
          style={{ left: `${Math.min(99, Math.max(1, score))}%` }}
        />
      </div>
      <div className="mt-2 grid grid-cols-5 gap-1 text-[0.7rem] font-medium text-ink-muted sm:text-xs" aria-hidden>
        {maturityLevels.map((l) => (
          <span key={l.id}>{l.name}</span>
        ))}
      </div>
    </div>
  );
}

function Results({
  result,
  headingRef,
  deliveryEnabled,
  onRestart,
}: {
  result: AssessmentResult;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  deliveryEnabled: boolean;
  onRestart: () => void;
}) {
  const recs = buildRecommendations(result);
  const summary = [
    `Overall: ${result.overall}/100 (${result.level.name})`,
    ...result.dimensions.map((d) => `${d.name}: ${d.score}/100 (${d.level.name})`),
  ].join("\n");

  return (
    <div className="space-y-8">
      <section aria-labelledby="results-heading" className="rounded-2xl bg-midnight p-7 text-paper sm:p-10">
        <p className="font-display text-xs font-semibold tracking-[0.18em] text-teal uppercase">Your indicative AI readiness</p>
        <h2 id="results-heading" ref={headingRef} tabIndex={-1} className="mt-4 text-3xl font-bold sm:text-4xl">
          {result.level.name} <span className="text-mist">·</span> {result.overall}
          <span className="text-xl text-mist">/100</span>
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-mist">{result.level.description}</p>
        <div className="mt-8 rounded-xl bg-paper p-5 text-ink">
          <MaturityScale score={result.overall} />
        </div>
      </section>

      <section aria-labelledby="dimensions-heading" className="rounded-2xl border border-ink/10 bg-white p-7 sm:p-10">
        <h3 id="dimensions-heading" className="text-2xl font-bold">
          Scores by dimension
        </h3>
        <ul className="mt-8 space-y-6">
          {result.dimensions.map((d) => (
            <li key={d.id}>
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-semibold">{d.name}</span>
                <span className="shrink-0 text-sm text-ink-muted">
                  <span className="font-display text-base font-bold text-ink">{d.score}</span>/100 · {d.level.name}
                </span>
              </div>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-rule" aria-hidden>
                <div
                  className={cn("h-full rounded-full", d.id === result.priorities[0].id ? "bg-teal-ink" : "bg-blue-ink")}
                  style={{ width: `${Math.max(2, d.score)}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-ink-muted">
          <span className="mr-1.5 inline-block size-2.5 rounded-full bg-teal-ink align-middle" aria-hidden />
          Highlighted: your lowest-scoring dimension, which is likely to cap the value of the others.
        </p>
      </section>

      <section aria-labelledby="recs-heading" className="rounded-2xl border border-ink/10 bg-white p-7 sm:p-10">
        <h3 id="recs-heading" className="text-2xl font-bold">
          Where to focus first
        </h3>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {recs.priority.map((r) => (
            <div key={r.dimension} className="rounded-xl bg-paper p-6">
              <p className="text-sm font-semibold text-teal-ink">{r.dimensionName}</p>
              <p className="mt-2 font-display text-lg font-semibold">{r.title}</p>
              <ul className="mt-4 space-y-2 text-ink-muted">
                {r.actions.map((a) => (
                  <li key={a} className="flex gap-2.5">
                    <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-sm bg-blue-ink" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <details className="group mt-8 border-t border-rule pt-6">
          <summary className="cursor-pointer font-semibold text-blue-ink">Show recommendations for all six dimensions</summary>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {recs.all.map((r) => (
              <div key={r.dimension}>
                <p className="text-sm font-semibold text-teal-ink">{r.dimensionName}</p>
                <p className="mt-1 font-semibold">{r.title}</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-muted">
                  {r.actions.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </details>
      </section>

      <section aria-labelledby="next-heading" className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-midnight p-7 text-paper sm:p-10">
          <p className="font-display text-xs font-semibold tracking-[0.18em] text-teal uppercase">Suggested next step</p>
          <h3 id="next-heading" className="mt-3 text-2xl font-bold">
            {recs.nextStep.title}
          </h3>
          <p className="mt-3 text-mist">{recs.nextStep.description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className={buttonClasses("primary", "dark")}>
              Request a consultation
            </Link>
            <Link href={recs.nextStep.href} className={buttonClasses("secondary", "dark")}>
              {recs.nextStep.cta}
            </Link>
          </div>
        </div>
        <div className="rounded-2xl border border-ink/10 bg-white p-7 sm:p-10">
          <h3 className="text-xl font-bold">Want a walkthrough of your results?</h3>
          <p className="mt-2 text-ink-muted">
            Optional. Share your email and we will follow up with a short interpretation of your scores.
          </p>
          <div className="mt-6">
            <AssessmentLeadForm summary={summary} deliveryEnabled={deliveryEnabled} />
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-muted">This is an indicative self-assessment, not a validated certification or formal audit.</p>
        <button type="button" onClick={onRestart} className={buttonClasses("secondary")}>
          <RotateCcw aria-hidden className="size-4" /> Retake the assessment
        </button>
      </div>
    </div>
  );
}

function AssessmentLeadForm({ summary, deliveryEnabled }: { summary: string; deliveryEnabled: boolean }) {
  const [state, action] = useActionState(submitAssessmentLead, idleState);
  const err = (n: string) => fieldError(state, n);
  if (state.status === "success") return <FormStatusMessage state={state} />;
  return (
    <FormValuesProvider state={state}>
      <form key={JSON.stringify(state)} action={action} noValidate className="relative space-y-5">
        <DeliveryNotice enabled={deliveryEnabled} />
        <TextField name="email" type="email" label="Email" required autoComplete="email" error={err("email")} />
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField name="fullName" label="Name" autoComplete="name" error={err("fullName")} />
          <TextField name="organization" label="Organization" autoComplete="organization" error={err("organization")} />
        </div>
        <input type="hidden" name="summary" value={summary} />
        <Checkbox name="consentContact" required error={err("consentContact")}>
          I agree that Praxis Intelligence may email me about my assessment results.{" "}
          <span className="text-red-700" aria-hidden>
            *
          </span>
        </Checkbox>
        <Checkbox name="consentMarketing">I would also like occasional insights and updates by email. (optional)</Checkbox>
        <AntiSpamFields />
        <FormStatusMessage state={state} />
        <SubmitButton>Send my results</SubmitButton>
      </form>
    </FormValuesProvider>
  );
}
