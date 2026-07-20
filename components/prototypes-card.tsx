"use client";

import { KpiBurst, KpiShell, KpiText, p } from "@/components/kpi-parts";

/**
 * kpi-card-1 from Paper's "Gentle nebula" (artboard W-0): the Claude Code
 * terminal, a dark radial wash over it, and the coral Claude burst top-right.
 *
 * Paper nodes: 11-0 terminal 429x250 at (-65,-32), 10-0 StaticRadialGradient
 * 958x718 at (-283,-221), 13-0 burst 80x80 at (210,6).
 *
 * This is the one card Paper builds with a shader gradient rather than the flat
 * oklab scrim the other three use. Child order is back-to-front — terminal, then
 * the gradient painted OVER it, then the captions, then the burst — so the
 * terminal carries no opacity of its own and the gradient's transparency is what
 * sinks it. Fading the terminal instead inverts that and flattens both.
 */

/**
 * Node 10-0 is roughly 3x the artboard, pushed left and up, so the card is a
 * small window onto it: it sees x 29.5-61.1%, y 30.8-72.9%, a gentle slice well
 * outside the bright core. Re-centering this gradient on the card collapses the
 * falloff and reads flat.
 */
const RADIAL_BOX = {
  width: p(958),
  height: p(718),
  left: p(-283),
  top: p(-221),
} as const;

/**
 * The shader's own stops (#202020, #1C1C1C, #191919) carried at partial alpha.
 * Paper renders this in WebGL over a transparent colorBack; the CSS equivalent is
 * a wash that thins toward the core, letting the terminal read through the upper
 * right and going near-solid at the bottom-left behind the captions.
 */
const DARK_RADIAL =
  "radial-gradient(circle at 50% 50%, rgba(32,32,32,0.74) 0%, rgba(28,28,28,0.9) 50%, rgba(25,25,25,0.99) 90%)";

/** Node 11-0. */
const TERMINAL_BOX = {
  width: p(429),
  height: p(250),
  left: p(-65),
  top: p(-32),
} as const;

export function PrototypesCard() {
  return (
    <KpiShell style={{ backgroundColor: "#191919" }}>
      <div
        aria-hidden
        className="pointer-events-none absolute bg-[url('/kpi/terminal.png')] bg-cover bg-center"
        style={TERMINAL_BOX}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{ ...RADIAL_BOX, backgroundImage: DARK_RADIAL }}
      />

      <KpiBurst
        image="/kpi/gem-card1.svg"
        colors={["#FFFFFF", "#DA775A"]}
        colorInner="#DA775A"
        x={210}
        y={6}
      />

      {/* Paper's own eyebrow reads "Interactive prototyes" — a typo on the
          canvas, kept spelled correctly here. */}
      <KpiText eyebrow="Interactive prototypes" tone="dark">
        Ships a clickable
        <br />
        build
      </KpiText>
    </KpiShell>
  );
}
