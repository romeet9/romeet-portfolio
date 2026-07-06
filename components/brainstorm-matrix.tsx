import type { BrainstormRow } from "@/content/case-studies";

/** A subtle dark backdrop: dot grid + a soft top glow. Shared look with the
 * timeline / spotlight cards, but calm enough to sit behind dense text. */
function Backdrop() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{
          background:
            "radial-gradient(ellipse 70% 100% at 50% 0%, rgba(255,255,255,0.06), transparent 70%)",
        }}
      />
    </>
  );
}

/** The "Brainstorming & Ideating" matrix: Finding → Action → Ideas.
 * A 3-column table on desktop; stacks into grouped blocks on mobile. */
export function BrainstormMatrix({ rows }: { rows: BrainstormRow[] }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#0c0c0e] ring-1 ring-white/[0.07]">
      <Backdrop />
      <div className="relative">
        {/* Column header — desktop only */}
        <div className="hidden grid-cols-[1fr_1fr_1.4fr] gap-6 border-b border-white/10 px-6 py-4 md:grid">
          {["Major findings", "Action to take", "How I'd solve it"].map((h) => (
            <span
              key={h}
              className="font-mono text-xs uppercase tracking-wider text-white/45"
            >
              {h}
            </span>
          ))}
        </div>

        {/* Rows */}
        {rows.map((row, i) => (
          <div
            key={i}
            className="grid gap-5 border-b border-white/10 px-6 py-6 last:border-0 md:grid-cols-[1fr_1fr_1.4fr] md:gap-6 md:py-7"
          >
            {/* Finding */}
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[10px] uppercase tracking-wider text-white/35 md:hidden">
                Finding
              </span>
              <h4 className="w-fit text-sm font-medium text-white underline decoration-white/25 decoration-2 underline-offset-4">
                {row.finding}
              </h4>
              {row.findingNote && (
                <p className="text-xs leading-relaxed text-white/45">
                  {row.findingNote}
                </p>
              )}
            </div>

            {/* Action */}
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[10px] uppercase tracking-wider text-white/35 md:hidden">
                Action
              </span>
              <h4 className="w-fit text-sm font-medium text-white underline decoration-white/30 decoration-2 underline-offset-4">
                {row.action}
              </h4>
              {row.actionNote && (
                <p className="text-xs leading-relaxed text-white/45">
                  {row.actionNote}
                </p>
              )}
            </div>

            {/* Ideas */}
            <div className="flex flex-col gap-2.5">
              <span className="font-mono text-[10px] uppercase tracking-wider text-white/35 md:hidden">
                How I'd solve it
              </span>
              {row.ideas.map((idea, j) => (
                <div key={j} className="flex gap-2.5">
                  <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-white/45" />
                  <p className="text-sm leading-relaxed text-white/70">{idea}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
