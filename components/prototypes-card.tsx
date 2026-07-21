import { KpiCard, type HalftoneConfig } from "@/components/kpi-parts";

/**
 * kpi-card-1 from Paper's "Graceful petal" (artboard GG-0).
 */
const SHADER: HalftoneConfig = {
  image: "/kpi/halftone-1.avif",
  contrast: 0.4,
  radius: 1.25,
  colorFront: "#2B2B2B",
  mask: "radial-gradient(ellipse 43.585% 47.43% at 80.13% 21.07% in oklab, oklab(100% 0 0) 0%, oklab(21.7% -.0002 0.001) 100%)",
};

export function PrototypesCard() {
  return (
    <KpiCard
      shader={SHADER}
      eyebrow="Interactive prototypes"
      caption={"Ships a clickable\nbuild."}
    />
  );
}
