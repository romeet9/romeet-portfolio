import Image from "next/image";

/**
 * The "Interactive prototypes" KPI card, built from its Paper design (kpi-card-1
 * in "Gentle nebula"): a near-black card with the Claude Code terminal ghosted
 * behind a dark radial vignette, a coral "gem smoke" burst top-right, and the
 * caption "Ships a clickable build" in Instrument Sans.
 *
 * Two of the Paper layers were procedural shaders with no CSS equivalent — the
 * radial gradient is reproduced in CSS here; the coral burst was exported as a
 * PNG. Exact values carried over from Paper: #191919 ground, 2px #2D2D2D border,
 * 22px radius, the inset shadow, and the 32px / -0.06em caption.
 */
export function PrototypesCard() {
  // Deliberately not data-slot="card": the row's light wash targets those, and
  // would paint over this card's dark ground.
  return (
    <div className="relative flex min-h-[268px] flex-col justify-end overflow-hidden rounded-[22px] border-2 border-[#2d2d2d] bg-[#191919] p-5 shadow-[inset_0_0_27px_-20px_#131313]">
      {/* The Claude Code terminal, ghosted. In Paper a near-opaque dark radial
          shader sits over it; here the low opacity plus the vignette below do the
          same job. */}
      <Image
        src="/kpi/terminal.png"
        alt=""
        fill
        sizes="(min-width: 1280px) 320px, (min-width: 576px) 45vw, 90vw"
        className="pointer-events-none object-cover object-[35%_38%] opacity-[0.26]"
      />

      {/* Dark radial vignette — the StaticRadialGradient shader, in CSS. Deepest
          at the bottom-left where the caption sits. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_110%_at_70%_15%,rgba(25,25,25,0.55),#191919_72%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#191919] via-[#191919]/70 to-transparent"
      />

      {/* The coral gem-smoke burst, top-right. */}
      <Image
        src="/kpi/gem-smoke.png"
        alt=""
        width={168}
        height={126}
        className="pointer-events-none absolute top-1 -right-3 w-[56%] max-w-[176px] select-none"
      />

      <p
        className="relative font-[family-name:var(--font-instrument)] text-[24px] leading-[26px] font-medium tracking-[-0.06em] text-white"
      >
        Ships a clickable
        <br />
        build
      </p>
    </div>
  );
}
