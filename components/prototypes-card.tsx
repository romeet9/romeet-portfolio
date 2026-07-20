"use client";

import { KpiBurst, KpiCard } from "@/components/kpi-parts";

/**
 * kpi-card-1 from Paper's "Gentle nebula" (artboard 3Y-0): the coral Claude
 * burst, "Interactive prototypes" / "Ships a clickable build".
 *
 * The only card whose burst carries a two-stop `colors` pair rather than a flat
 * white.
 */
export function PrototypesCard() {
  return (
    <KpiCard
      icons={
        <div className="flex items-center justify-end self-stretch">
          <KpiBurst
            image="/kpi/gem-card1.svg"
            colors={["#FFFFFF", "#DA775A"]}
            colorInner="#DA775A"
          />
        </div>
      }
      eyebrow="Interactive prototypes"
      caption={"Ships a clickable\nbuild"}
    />
  );
}
