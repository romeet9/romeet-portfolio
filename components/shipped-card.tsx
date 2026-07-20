import { KpiCard } from "@/components/kpi-parts";

/**
 * kpi-card-2 from Paper's "Gentle nebula" (artboard 3O-0): the white Next.js
 * logo over "Next.js & SwiftUI" / "4 Real, working products."
 */
export function ShippedCard() {
  return (
    <KpiCard
      icon={
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/kpi/logo-next.svg" alt="" width={40} height={40} className="shrink-0" />
      }
      eyebrow="Next.js & SwiftUI"
      caption="4 Real, working products."
    />
  );
}
