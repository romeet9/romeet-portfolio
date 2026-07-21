import { KpiCard, type HalftoneConfig } from "@/components/kpi-parts";

/**
 * kpi-card-4 from Paper's "Graceful petal" (artboard GL-0). The artboard
 * still carries card 2's placeholder copy mid-edit; the real copy is used here.
 */
const SHADER: HalftoneConfig = {
  image: "/kpi/halftone-4.avif",
  contrast: 0.83,
  radius: 1,
  colorFront: "#111111",
  mask: "radial-gradient(ellipse 43.585% 47.43% at 69.72% 30.94% in oklab, oklab(100% 0 0) 0%, oklab(21.7% -.0002 0.001) 100%)",
};

export function ToolsCard() {
  return (
    <KpiCard
      shader={SHADER}
      eyebrow="Most used Tools"
      caption={"Altogether I use\n3 tools."}
    />
  );
}
