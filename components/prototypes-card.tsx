import { KpiCard, type HalftoneConfig } from "@/components/kpi-parts";

/**
 * kpi-card-1 from Paper's "Graceful petal" (artboard 31-0): the coral Claude
 * logo over a halftone petal image, "Interactive prototypes" / "Ships a
 * clickable build."
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
      icon={
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/kpi/logo-claude.svg" alt="" width={40} height={40} className="shrink-0" />
      }
      eyebrow="Interactive prototypes"
      caption={"Ships a clickable\nbuild."}
    />
  );
}
