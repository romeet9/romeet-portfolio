"use client";

import { KpiBurst, KpiPlate, KpiScrim, KpiShell, KpiText } from "@/components/kpi-parts";

/**
 * kpi-card-3 from Paper's "Gentle nebula" (artboard 2D-0): the room photograph
 * under a dark scrim, with the orange briefcase burst top-right.
 *
 * Paper nodes: 2Y-0 plate 302x453 at (-2,-77), 34-0 scrim, 2E-0 burst 80x80 at
 * (210,6). The scrim is the dark twin of card 2's — same ellipse, same falloff,
 * resolving to oklab(24.4%) rather than white.
 */

/** Node 34-0, verbatim. */
const SCRIM =
  "radial-gradient(ellipse 72.43% 61.65% at 21.41% -5.68% in oklab, oklab(24.4% 0 0 / 0%) 0%, oklab(24.4% 0 0) 100%)";

export function ExperienceCard() {
  return (
    <KpiShell style={{ backgroundColor: "#191919" }}>
      <KpiPlate className="bg-[url('/kpi/card3-bg.png')]" width={302} height={453} x={-2} y={-77} />
      <KpiScrim image={SCRIM} />

      <KpiBurst image="/kpi/gem-briefcase.svg" colorInner="#FF4E00" x={210} y={6} />

      <KpiText eyebrow="Experience" tone="dark">
        {"I have 2 year’s of\nexperience"}
      </KpiText>
    </KpiShell>
  );
}
