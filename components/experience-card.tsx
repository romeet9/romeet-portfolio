import { KpiCard, type HalftoneConfig } from "@/components/kpi-parts";

/**
 * kpi-card-3 from Paper's "Graceful petal" (artboard 3X-0): the white briefcase
 * logo over a halftone image, "Experience" / "I have 2 year's of experience."
 */
const SHADER: HalftoneConfig = {
  image: "/kpi/halftone-3.jpg",
  contrast: 0.37,
  radius: 1,
  colorFront: "#222222",
  mask: "radial-gradient(ellipse 43.585% 47.43% at 69.72% 30.94% in oklab, oklab(100% 0 0) 0%, oklab(21.7% -.0002 0.001) 100%)",
};

export function ExperienceCard() {
  return (
    <KpiCard
      shader={SHADER}
      icon={
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/kpi/logo-briefcase.svg" alt="" width={40} height={40} className="shrink-0" />
      }
      eyebrow="Experience"
      caption={"I have 2 year's of\nexperience."}
    />
  );
}
