import { KpiCard } from "@/components/kpi-parts";
import { BAKED } from "@/components/halftone";

/**
 * kpi-card-1 from Paper's "Graceful petal" (artboard GG-0).
 */
export function PrototypesCard() {
  return (
    <KpiCard
      field={BAKED.kpi1}
      eyebrow="Interactive prototypes"
      caption={"Ships a clickable\nbuild."}
    />
  );
}
