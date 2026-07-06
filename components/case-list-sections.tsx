import Image from "next/image";

import { AnnotationCard } from "@/components/annotation-card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/* ── The F-shaped card anatomy ────────────────────────────────────────── */

/** One arm of the F: the muted data it holds, above the question it answers. */
function FArm({
  labels,
  question,
  align = "left",
  tick = true,
}: {
  labels: string[];
  question: string;
  align?: "left" | "right";
  tick?: boolean;
}) {
  return (
    <div className={cn("relative", align === "right" && "sm:text-right")}>
      {tick && (
        <span
          className="absolute top-2.5 -left-6 hidden h-px w-4 bg-border sm:block sm:-left-8 sm:w-6"
          aria-hidden
        />
      )}
      <div className="space-y-0.5 text-sm leading-snug text-muted-foreground">
        {labels.map((l) => (
          <p key={l}>{l}</p>
        ))}
      </div>
      <p className="mt-2 text-xl font-medium tracking-tight text-foreground sm:text-2xl">
        {question}
      </p>
    </div>
  );
}

export function CaseCardAnatomy() {
  return (
    <div className="rounded-2xl border bg-muted/30 p-8 sm:p-12">
      {/* The three questions, arranged so the eye traces the F: a wide top
          pass, a drop down the left stem, then a second pass. The left rule
          is the stem; the two ticked arms are the strokes. No mockup — the
          layout itself is the point. */}
      <div className="flex flex-col gap-14 border-l border-border pl-6 sm:pl-10">
        <FArm
          labels={["Case name,", "Date registered, Company name"]}
          question="What is this case? When? Who is it for?"
        />
        <div className="flex flex-col gap-12 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
          <FArm
            labels={["In Review. Queued. Resolved."]}
            question="Is this case active or done?"
          />
          <FArm
            labels={["High, Standard, Low."]}
            question="How urgent is this?"
            align="right"
            tick={false}
          />
        </div>
      </div>
    </div>
  );
}

/* ── Component breakdown: four iterations ─────────────────────────────── */

const ITERATIONS = [
  {
    n: 1,
    title: "Built for the system",
    src: "/case-studies/case-list/iterations/iteration-1.png",
    alt: "Iteration 1 — a case card led by an alphanumeric case ID",
    w: 1544,
    h: 542,
    critique:
      "Led with an alphanumeric case ID — no human context, no scanability. The date range ate space. Built for the system, not the rep.",
  },
  {
    n: 2,
    title: "Named, but noisy",
    src: "/case-studies/case-list/iterations/iteration-2.png",
    alt: "Iteration 2 — a case name, but three metadata rows and two competing colours",
    w: 1544,
    h: 542,
    critique:
      "Swapped the ID for a case name — but three metadata rows and two competing colours piled on cognitive load.",
  },
  {
    n: 3,
    title: "One line, wrong order",
    src: "/case-studies/case-list/iterations/iteration-3.png",
    alt: "Iteration 3 — one-line metadata, but priority still reads before the case name",
    w: 1544,
    h: 542,
    critique:
      "One-line metadata — cleaner density. But priority dominated before the case name, so reps were reading, not scanning.",
  },
  {
    n: 4,
    final: true,
    title: "The F-shape clicked",
    src: "/case-studies/case-list/iterations/iteration-4.png",
    alt: "Iteration 4, final — status pill bottom-left, priority bottom-right: the F-shape",
    w: 1544,
    h: 542,
    critique:
      "Status pill bottom-left, priority bottom-right. The F-shape clicked — what, when, who, answered in sequence.",
  },
];

export function CaseIterations() {
  return (
    <ol className="flex flex-col [&_[data-slot=card]]:bg-linear-to-t [&_[data-slot=card]]:from-primary/5 [&_[data-slot=card]]:to-card [&_[data-slot=card]]:shadow-xs dark:[&_[data-slot=card]]:bg-card">
      {ITERATIONS.map((it, i) => {
        const last = i === ITERATIONS.length - 1;
        return (
          <li key={it.n} className="flex gap-5 sm:gap-6">
            {/* rail: numbered node + connector to the next iteration */}
            <div className="flex w-7 shrink-0 flex-col items-center">
              <span className="flex size-7 items-center justify-center rounded-full border bg-background font-mono text-[11px] font-medium text-foreground">
                {it.n}
              </span>
              {!last && <span className="w-px flex-1 bg-border" />}
            </div>

            {/* content */}
            <div className="min-w-0 flex-1 pb-10">
              <div className="mb-3 flex items-center gap-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Iteration 0{it.n}
                </span>
                {it.final && (
                  <Badge
                    variant="outline"
                    className="h-4 px-1.5 font-mono text-[10px] uppercase"
                  >
                    Final
                  </Badge>
                )}
              </div>

              <div className="grid items-center gap-5 md:grid-cols-2 md:gap-8">
                {/* the iteration UI — no background, floats on the page. The
                    PNGs are trimmed to the card bounds, so full-width renders
                    all four at the same size. */}
                <Image
                  src={it.src}
                  alt={it.alt}
                  width={it.w}
                  height={it.h}
                  sizes="(min-width: 768px) 44vw, 90vw"
                  quality={95}
                  className="w-full drop-shadow-[0_8px_20px_rgba(0,0,0,0.08)] dark:drop-shadow-[0_10px_26px_rgba(0,0,0,0.5)]"
                />
                {/* annotation, on the right of the UI */}
                <AnnotationCard
                  label="Annotation"
                  index={it.n - 1}
                  title={it.title}
                  desc={it.critique}
                />
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
