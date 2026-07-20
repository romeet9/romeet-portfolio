"use client";

import { KpiBurst, KpiScrim, KpiShell, KpiText, p } from "@/components/kpi-parts";

/**
 * kpi-card-2 from Paper's "Gentle nebula" (artboard 1V-0): the monochrome letter
 * plate, a white scrim over it, and the Swift and Next.js bursts side by side.
 *
 * Paper nodes: 1Z-0 image 427.5x600 at (-65,-151), 33-0 scrim, 2Z-0 burst frame
 * 152x80 at (135.5,6) holding two size-20 GemSmokes overlapped by 8px.
 *
 * There is no metallic gradient and no grain on this card — an earlier pass here
 * invented both. Paper composites the plate at full strength and lets the scrim
 * alone carry it.
 */
const IMAGE_BOX = {
  width: p(427.5),
  height: p(600),
  left: p(-65),
  top: p(-151),
} as const;

/** Node 33-0, verbatim. */
const SCRIM =
  "radial-gradient(ellipse 72.43% 61.65% at 20.73% -3.58% in oklab, oklab(100% 0 0 / 0%) 0%, oklab(100% 0 0) 100%)";

export function ShippedCard() {
  return (
    <KpiShell style={{ backgroundColor: "#b8b8b8" }}>
      <div
        aria-hidden
        className="pointer-events-none absolute bg-[url('/kpi/card2-bg.png')] bg-cover bg-center"
        style={IMAGE_BOX}
      />
      <KpiScrim image={SCRIM} />

      <KpiBurst image="/kpi/gem-swift.svg" colorInner="#FF4E00" x={135.5} y={6} />
      <KpiBurst image="/kpi/gem-next.svg" colorInner="#000000" x={207.5} y={6} />

      <KpiText eyebrow="Next.js & SwiftUI" tone="light">
        4 Real, Working
        <br />
        products
      </KpiText>
    </KpiShell>
  );
}
