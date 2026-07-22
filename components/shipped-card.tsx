import { KpiCard } from "@/components/kpi-parts";
import { BAKED } from "@/components/halftone";

/**
 * kpi-card-2 from Paper's "Graceful petal" (artboard GB-0).
 */
export function ShippedCard() {
  return (
    <KpiCard
      field={BAKED.kpi2}
      eyebrow="Next.js & SwiftUI"
      caption={"4 Real, working\nproducts."}
    />
  );
}
