import { KpiCard, type HalftoneConfig } from "@/components/kpi-parts";

/**
 * kpi-card-2 from Paper's "Graceful petal" (artboard GB-0).
 */
const SHADER: HalftoneConfig = {
  image: "/kpi/halftone-2.avif",
  contrast: 0.37,
  radius: 1,
  colorFront: "#060606",
  mask: "radial-gradient(ellipse 43.585% 47.43% at 69.72% 30.94% in oklab, oklab(100% 0 0) 0%, oklab(21.7% -.0002 0.001) 100%)",
};

export function ShippedCard() {
  return (
    <KpiCard
      shader={SHADER}
      eyebrow="Next.js & SwiftUI"
      caption={"4 Real, working\nproducts."}
    />
  );
}
