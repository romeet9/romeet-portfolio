import { KpiCard, type HalftoneConfig } from "@/components/kpi-parts";

/**
 * kpi-card-4 from Paper's "Graceful petal" (artboard 3I-0): three white tool
 * marks over a halftone image. The canvas artboard still carries card 2's
 * placeholder copy (mid-edit); the intended copy is "Most used Tools" /
 * "Altogether I use 3 tools."
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
      iconRowClassName="gap-3.5"
      icon={
        <>
          <div
            className="size-10 shrink-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/kpi/tool-claude.png')" }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/kpi/tool-mid.svg" alt="" width={28} height={41} className="shrink-0" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/kpi/tool-right.svg" alt="" width={40} height={40} className="shrink-0" />
        </>
      }
      eyebrow="Most used Tools"
      caption={"Altogether I use\n3 tools."}
    />
  );
}
