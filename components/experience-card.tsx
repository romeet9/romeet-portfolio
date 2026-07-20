"use client";

import { KpiBurst, KpiScrim, KpiShell, KpiText, p } from "@/components/kpi-parts";

/**
 * kpi-card-3 from Paper's "Gentle nebula" (artboard 2D-0): the room photograph
 * under a dark scrim, with the orange briefcase burst top-right.
 *
 * Paper nodes: 2Y-0 image 302x453 at (-2,-77), 34-0 scrim, 2E-0 burst 80x80 at
 * (210,6). The scrim is the dark twin of card 2's — same ellipse, same falloff,
 * but resolving to oklab(24.4%) rather than white.
 */
const IMAGE_BOX = {
  width: p(302),
  height: p(453),
  left: p(-2),
  top: p(-77),
} as const;

/** Node 34-0, verbatim. */
const SCRIM =
  "radial-gradient(ellipse 72.43% 61.65% at 21.41% -5.68% in oklab, oklab(24.4% 0 0 / 0%) 0%, oklab(24.4% 0 0) 100%)";

export function ExperienceCard() {
  return (
    <KpiShell style={{ backgroundColor: "#191919" }}>
      <div
        aria-hidden
        className="pointer-events-none absolute bg-[url('/kpi/card3-bg.png')] bg-cover bg-center"
        style={IMAGE_BOX}
      />
      <KpiScrim image={SCRIM} />

      <KpiBurst image="/kpi/gem-briefcase.svg" colorInner="#FF4E00" x={210} y={6} />

      <KpiText eyebrow="Experience" tone="dark">
        I have 2 year&rsquo;s of
        <br />
        experience
      </KpiText>
    </KpiShell>
  );
}
