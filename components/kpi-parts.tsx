"use client";

import * as React from "react";
import { StaticRadialGradient } from "@paper-design/shaders-react";

/**
 * Shared shell for the four KPI cards, from Paper's "Gentle nebula" redesign.
 *
 * Each card is a dark panel: a flat vertical oklab gradient with a grainy
 * StaticRadialGradient shader laid over it, a white 56px logo top-left, and an
 * eyebrow + caption pinned to the bottom. The bursts of the previous design are
 * gone. All four artboards are identical apart from their logo(s) and copy.
 */

/** The base gradient, identical on every card. */
const SURFACE =
  "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)";

/**
 * The grainy dark radial Paper lays over each card — same params on all four.
 * It's WebGL, so client-only and mount-gated; before mount (and in the SSR
 * pass) it falls back to the solid #1B1B1B the shader itself carries, over the
 * base gradient. Four cards = four shader contexts, the budget that renders
 * cleanly on mobile.
 */
function KpiShaderBg() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted)
    return <div aria-hidden className="absolute inset-0 bg-[#1B1B1B]" />;

  return (
    <StaticRadialGradient
      scale={1.26}
      offsetX={0.2}
      offsetY={0}
      radius={1.76}
      focalDistance={3}
      focalAngle={-147}
      falloff={1}
      mixing={1}
      distortionShift={0}
      distortionFreq={12}
      grainMixer={1}
      grainOverlay={0.1}
      colors={["#1D1D1D", "#1B1B1B", "#0B0B0B"]}
      colorBack="#00000000"
      className="absolute inset-0 bg-[#1B1B1B]"
    />
  );
}

export function KpiCard({
  icon,
  iconRowClassName = "",
  eyebrow,
  caption,
}: {
  icon: React.ReactNode;
  /** Extra classes for the icon row (card 4 spreads its three tools). */
  iconRowClassName?: string;
  eyebrow: string;
  caption: string;
}) {
  return (
    <div
      className="relative flex min-h-[272px] flex-col justify-between gap-6 overflow-clip rounded-[22px] border-2 border-solid border-[#2D2D2D] p-5 antialiased [box-shadow:#131313_0px_0px_27px_-20px_inset] [font-synthesis:none]"
      style={{ backgroundImage: SURFACE }}
    >
      <KpiShaderBg />

      <div
        className={`relative flex items-center self-stretch p-2.5 ${iconRowClassName}`}
      >
        {icon}
      </div>

      <div className="relative flex flex-col items-start gap-1.5 self-stretch">
        <div className="w-fit font-['Instrument_Sans',system-ui,sans-serif] text-base/4.5 tracking-[-0.06em] text-[#5F5F5F]">
          {eyebrow}
        </div>
        <div className="w-fit font-['Instrument_Sans',system-ui,sans-serif] text-2xl/7 tracking-[-0.06em] text-white">
          {caption}
        </div>
      </div>
    </div>
  );
}
