"use client";

import { KpiBurst, KpiCard } from "@/components/kpi-parts";

/**
 * kpi-card-4 from Paper's "Gentle nebula" (artboard 2M-0): the Claude, VS Code
 * and Figma bursts, "Most used Tools" / "Altogether I use 3 tools".
 *
 * The only card whose icon row is `justify-between` rather than `justify-end`,
 * with the trailing two bursts pulled back by `-ml-2`.
 */
export function ToolsCard() {
  return (
    <KpiCard
      icons={
        <div className="flex items-center justify-between self-stretch">
          <KpiBurst image="/kpi/gem-card1.svg" colors={["#FFFFFF"]} colorInner="#FF4E00" />
          <KpiBurst
            image="/kpi/gem-vscode.svg"
            colors={["#000000"]}
            colorInner="#FFFFFF"
            className="-ml-2"
          />
          <KpiBurst
            image="/kpi/gem-figma.png"
            colors={["#FFFFFF"]}
            colorInner="#FF4E00"
            className="-ml-2"
          />
        </div>
      }
      eyebrow="Most used Tools"
      caption={"Altogether I use\n3 tools"}
    />
  );
}
