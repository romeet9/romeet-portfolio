"use client";

import { KpiBurst, KpiCard } from "@/components/kpi-parts";

/**
 * kpi-card-2 from Paper's "Gentle nebula" (artboard 3O-0): the Swift and Next.js
 * bursts, "Next.js & SwiftUI" / "4 Real, working products".
 *
 * The Next.js burst inverts the usual pair — colors ['#000000'] over a white
 * inner, rather than white over a coloured inner.
 */
export function ShippedCard() {
  return (
    <KpiCard
      icons={
        <div className="flex h-20 shrink-0 items-center justify-end gap-2.75 self-stretch">
          <KpiBurst image="/kpi/gem-swift.svg" colors={["#FFFFFF"]} colorInner="#FF4E00" />
          <KpiBurst image="/kpi/gem-next.svg" colors={["#000000"]} colorInner="#FFFFFF" />
        </div>
      }
      eyebrow="Next.js & SwiftUI"
      caption={"4 Real, working\nproducts"}
    />
  );
}
