import { KpiCard } from "@/components/kpi-parts";
import { BAKED } from "@/components/halftone";

/**
 * kpi-card-4 from Paper's "Graceful petal" (artboard GL-0).
 * The artboard still carries card 2's placeholder copy mid-edit; the real
 * copy is used here.
 */
export function ToolsCard() {
  return (
    <KpiCard
      field={BAKED.kpi4}
      eyebrow="Most used Tools"
      caption={"Altogether I use\n3 tools."}
    />
  );
}
