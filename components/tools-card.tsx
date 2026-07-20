"use client";

import { KpiBurst, KpiScrim, KpiShell, KpiText, p } from "@/components/kpi-parts";

/**
 * kpi-card-4 from Paper's "Gentle nebula" (artboard 2M-0): the typographic plate
 * under a blurred white scrim, with the Claude, VS Code and Figma bursts in a row.
 *
 * Paper nodes: 2X-0 image 540x540 at (-121,-121), 35-0 scrim (the only one that
 * carries a 4px blur), 30-0 burst frame 224x80 at (72,14) holding three size-20
 * GemSmokes on a 72px pitch.
 *
 * This card previously shipped four tools on a PNG marquee — Framer has since
 * been dropped from the design, and the three that remain are live shaders.
 */
const IMAGE_BOX = {
  width: p(540),
  height: p(540),
  left: p(-121),
  top: p(-121),
} as const;

/** Node 35-0, verbatim. */
const SCRIM =
  "radial-gradient(ellipse 82.51% 70.23% at 4.98% -2.18% in oklab, oklab(100% 0 0 / 0%) 0%, oklab(100% 0 0) 100%)";

export function ToolsCard() {
  return (
    <KpiShell style={{ backgroundColor: "#b8b8b8" }}>
      <div
        aria-hidden
        className="pointer-events-none absolute bg-[url('/kpi/card4-bg.png')] bg-cover bg-center"
        style={IMAGE_BOX}
      />
      <KpiScrim image={SCRIM} blur />

      <KpiBurst image="/kpi/gem-card1.svg" colorInner="#FF4E00" x={72} y={14} />
      <KpiBurst image="/kpi/gem-vscode.svg" colorInner="#000000" x={144} y={14} />
      <KpiBurst image="/kpi/gem-figma.png" colorInner="#FF4E00" x={216} y={14} />

      <KpiText eyebrow="Most used Tools" tone="light">
        Altogether I use
        <br />3 tools
      </KpiText>
    </KpiShell>
  );
}
