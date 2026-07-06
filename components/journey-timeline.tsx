import { cn } from "@/lib/utils";

/** One node on the time-to-answer journey. `segment` labels the gap that
 * follows this node (e.g. "14% slower"); the last node has none. */
type TimelineStep = {
  time: string;
  caption: string;
  segment?: string;
};

const steps: TimelineStep[] = [
  { time: "~8 sec", caption: "Opens app to find the case", segment: "14% slower" },
  { time: "+14 sec", caption: "Scrolls entire list to locate the case", segment: "22% slower" },
  { time: "+11 sec", caption: "Taps into individual case detail", segment: "31% slower" },
  { time: "+19 sec", caption: "Scans wall of data to find information", segment: "~52 sec total" },
  { time: "~52 sec", caption: "Answers the client with information" },
];

/** node centres sit at (i + 0.5) / n; segment labels at the midpoint after. */
const pct = (n: number) => `${n * 100}%`;
const nodeAt = (i: number) => pct((i + 0.5) / steps.length);
const midAt = (i: number) => pct((i + 1) / steps.length);

/** Restrained monochrome backdrop: faint dot grid + a soft centre glow. */
function Backdrop() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 50% 46%, rgba(255,255,255,0.05), transparent 72%)",
        }}
      />
    </>
  );
}

function Node({ last }: { last?: boolean }) {
  return (
    <span
      className={cn(
        "block rounded-full ring-1",
        last ? "size-3 bg-white ring-white/25" : "size-2.5 bg-white/65 ring-white/10",
      )}
    />
  );
}

export function JourneyTimeline() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#0c0c0e] px-6 py-10 ring-1 ring-white/[0.07] sm:px-10 sm:py-12">
      <Backdrop />
      <div className="relative">
        {/* Heading */}
        <div className="mb-9 flex flex-col gap-1">
          <h3 className="text-base font-medium text-white">Time to answer a client</h3>
          <p className="text-sm text-white/50">
            Every step added time. ~52s from open to answer, before the redesign.
          </p>
        </div>

        {/* ── Horizontal (md and up) ────────────────────────────────── */}
        <div className="hidden md:block">
          {/* time labels */}
          <div className="grid grid-cols-5">
            {steps.map((s, i) => (
              <div key={i} className="text-center">
                <span
                  className={cn(
                    "text-2xl font-semibold tracking-tight tabular-nums",
                    i === steps.length - 1 ? "text-white" : "text-white/80",
                  )}
                >
                  {s.time}
                </span>
              </div>
            ))}
          </div>

          {/* connector rail: thin dashed line, segment labels above, nodes on it */}
          <div className="relative my-5 h-8">
            <div
              className="absolute top-1/2 border-t border-dashed border-white/20"
              style={{ left: nodeAt(0), right: nodeAt(0) }}
            />
            {steps.map((s, i) =>
              s.segment ? (
                <span
                  key={i}
                  className="absolute bottom-1/2 mb-2.5 -translate-x-1/2 whitespace-nowrap text-[11px] tracking-wide text-white/40"
                  style={{ left: midAt(i) }}
                >
                  {s.segment}
                </span>
              ) : null,
            )}
            {steps.map((s, i) => (
              <span
                key={i}
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ left: nodeAt(i) }}
              >
                <Node last={i === steps.length - 1} />
              </span>
            ))}
          </div>

          {/* captions */}
          <div className="grid grid-cols-5">
            {steps.map((s, i) => (
              <p key={i} className="px-3 text-center text-sm leading-snug text-white/55">
                {s.caption}
              </p>
            ))}
          </div>
        </div>

        {/* ── Vertical (mobile) ─────────────────────────────────────── */}
        <div className="flex flex-col md:hidden">
          {steps.map((s, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center pt-1">
                <Node last={i === steps.length - 1} />
                {i < steps.length - 1 && (
                  <span className="my-1 w-0 flex-1 border-l border-dashed border-white/20" />
                )}
              </div>
              <div className={cn("flex flex-col items-start gap-1", i < steps.length - 1 && "pb-5")}>
                <span
                  className={cn(
                    "text-xl font-semibold leading-none tabular-nums",
                    i === steps.length - 1 ? "text-white" : "text-white/80",
                  )}
                >
                  {s.time}
                </span>
                <p className="text-sm text-white/55">{s.caption}</p>
                {s.segment && (
                  <span className="text-[11px] tracking-wide text-white/40">{s.segment}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
