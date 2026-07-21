"use client";

import * as React from "react";
import { HalftoneDots } from "@paper-design/shaders-react";

/**
 * Shared shell for the four KPI cards, from Paper's "Graceful petal" redesign.
 *
 * Each card is a dark panel with a HalftoneDots shader rendering a per-card image
 * as a field of halftone dots — bright in the top-right, dissolving to dark at
 * the bottom-left behind the text (the fade comes from the shader's radial mask).
 * A logo sits top-left, an eyebrow + caption at the bottom.
 */

/** The base gradient under the shader, identical on every card. */
const SURFACE =
  "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)";

export type HalftoneConfig = {
  image: string;
  contrast: number;
  radius: number;
  colorFront: string;
  /** The radial mask Paper puts on the shader div — bright focus, dark falloff. */
  mask: string;
};

/**
 * The HalftoneDots shader — WebGL, so client-only and mount-gated. Before mount
 * it falls back to the card's base surface so there's no flash. Four cards, four
 * contexts (the budget that renders cleanly on mobile). Params carried over
 * verbatim from Paper's export.
 */
function KpiShaderBg({ cfg }: { cfg: HalftoneConfig }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <HalftoneDots
      // speed 0 stops the render loop entirely — the halftone is a static
      // texture, so this drops four animating image shaders to a one-time render
      // with no recurring GPU/battery cost.
      speed={0}
      image={cfg.image}
      contrast={cfg.contrast}
      radius={cfg.radius}
      colorFront={cfg.colorFront}
      colorBack="#00000000"
      originalColors={false}
      inverted={false}
      grid="hex"
      size={0.5}
      scale={1}
      type="gooey"
      fit="cover"
      grainSize={0.5}
      grainMixer={0.2}
      grainOverlay={0.2}
      className="absolute inset-0"
      style={{ backgroundImage: cfg.mask }}
    />
  );
}

export function KpiCard({
  shader,
  icon,
  iconRowClassName = "",
  eyebrow,
  caption,
}: {
  shader: HalftoneConfig;
  icon: React.ReactNode;
  /** Extra classes for the icon row (card 4 spreads its three tools). */
  iconRowClassName?: string;
  eyebrow: string;
  /** Caption text; a literal "\n" becomes a hard line break. */
  caption: string;
}) {
  return (
    <div
      className="relative flex min-h-[276px] flex-col justify-between gap-6 overflow-clip rounded-xl p-5 antialiased ring-1 ring-white/15 [font-synthesis:none]"
      style={{ backgroundImage: SURFACE }}
    >
      <KpiShaderBg cfg={shader} />

      <div
        className={`relative flex items-center self-stretch p-2.5 ${iconRowClassName}`}
      >
        {icon}
      </div>

      <div className="relative flex flex-col items-start gap-1.5 self-stretch">
        <div className="w-fit font-['Instrument_Sans',system-ui,sans-serif] text-base/4.5 tracking-[-0.06em] text-white/55">
          {eyebrow}
        </div>
        <div className="w-fit font-['Instrument_Sans',system-ui,sans-serif] text-2xl/7 tracking-[-0.06em] whitespace-pre-line text-white">
          {caption}
        </div>
      </div>
    </div>
  );
}
