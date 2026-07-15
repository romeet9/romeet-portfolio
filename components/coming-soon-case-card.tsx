/**
 * The third case study, still in progress.
 *
 * The artwork speaks the same language as the rising-action illustrations in
 * the Add Case study: a near-black #0c0c0e canvas, a faint dotted grid,
 * concentric dashed rings, a few star specks, and a subject built from soft
 * rounded "glass" plates receding in perspective over a radial glow — fading
 * out toward the bottom so the caption reads. Here the plates stand in for the
 * Case Detail screen's sections: header, tabs, timeline, attachments, actions.
 */

// The plates, front to back. Each is dimmer and narrower than the one before it.
const PLATES = [
  "w-[76%] opacity-90",
  "w-[80%] opacity-75",
  "w-[84%] opacity-[0.55]",
  "w-[88%] opacity-40",
  "w-[92%] opacity-25",
  "w-[96%] opacity-[0.12]",
];

// Scattered specks, positioned like the ones in the rendered illustrations.
const SPECKS = [
  "top-[12%] left-[18%] size-[3px] opacity-70",
  "top-[8%] left-[62%] size-[3px] opacity-60",
  "top-[26%] left-[86%] size-[3px] opacity-50",
  "top-[46%] left-[9%] size-[3px] opacity-45",
  "top-[58%] left-[92%] size-[3px] opacity-40",
];

export function ComingSoonCaseCard() {
  return (
    <div className="relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-[22px] bg-[#0c0c0e] ring-1 ring-white/[0.07]">
      {/* Dotted grid */}
      <div
        aria-hidden
        className="absolute inset-0 [background-image:radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:22px_22px]"
      />

      {/* Concentric dashed rings, centred on the subject */}
      <div
        aria-hidden
        className="absolute top-[34%] left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        {["size-[220px]", "size-[340px]", "size-[460px]", "size-[580px]"].map(
          (size) => (
            <div
              key={size}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/[0.035] ${size}`}
            />
          ),
        )}
      </div>

      {/* The glow the plates sit in front of */}
      <div
        aria-hidden
        className="absolute top-[32%] left-1/2 size-80 -translate-x-1/2 -translate-y-1/2 animate-glow rounded-full bg-white/[0.11] blur-3xl"
      />

      {/* Star specks */}
      {SPECKS.map((s) => (
        <span
          key={s}
          aria-hidden
          className={`absolute rounded-full bg-white ${s}`}
        />
      ))}

      {/* Subject — the plates, tilted back in perspective and dissolving downward */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-[14%] flex flex-col items-center gap-[3.5%] [mask-image:linear-gradient(to_bottom,black_0%,black_55%,transparent_92%)] [perspective:900px]"
      >
        <div className="flex w-[78%] flex-col items-center gap-[6px] [transform:rotateX(16deg)_rotate(-3deg)] [transform-style:preserve-3d]">
          {PLATES.map((plate, i) => (
            <div
              key={i}
              className={`h-[26px] rounded-[7px] border border-white/[0.18] bg-gradient-to-b from-white/[0.14] to-white/[0.03] shadow-lg shadow-black/40 ${plate}`}
            />
          ))}
        </div>
      </div>

      {/* Status — hairline pill, matching the case-study chrome */}
      <div className="absolute top-5 right-5 z-10 flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.08] px-2.5 py-1 backdrop-blur-md">
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-white/70" />
          <span className="relative inline-flex size-1.5 rounded-full bg-white/90" />
        </span>
        <span className="text-[10px] font-medium tracking-[0.08em] text-white/70 uppercase">
          In progress
        </span>
      </div>

      {/* Caption fade — the same ramp the rising-action bento uses */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-[#0c0c0e] via-[#0c0c0e]/85 to-transparent"
      />

      <div className="relative flex flex-col gap-1.5 p-5 sm:p-6">
        <span className="text-[11px] font-medium tracking-[0.08em] text-white/45 uppercase">
          12 Grids · 2026
        </span>

        <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
          Edge CRM · Case Detail
        </h3>

        <p className="line-clamp-2 max-w-[34ch] text-sm leading-relaxed text-white/45">
          The third screen. Deep case context: timeline, attachments and actions
          in one view. Currently in the works.
        </p>
      </div>
    </div>
  );
}
