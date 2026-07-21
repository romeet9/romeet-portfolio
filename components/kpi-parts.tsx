"use client";

import * as React from "react";
import { HalftoneDots } from "@paper-design/shaders-react";

/**
 * Shared shell for the four KPI cards, from Paper's "Graceful petal" redesign
 * (artboards kpi-card-1..4).
 *
 * A dark panel with a halftone image field, the eyebrow pinned to the top and
 * the caption to the bottom. The logos of the previous pass are gone — the card
 * is now just the shader and the two lines of type.
 */

/** How much hovering lifts the halftone contrast — matches the Vibe cards' 0.22 -> 0.4. */
const CONTRAST_LIFT = 0.18;

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
 * it falls back to the card's base surface so there's no flash. Params carried
 * over verbatim from Paper's export.
 */
function KpiShaderBg({ cfg, contrast }: { cfg: HalftoneConfig; contrast: number }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <HalftoneDots
      // speed 0 stops the render loop entirely — the halftone is a static
      // texture, so this is a one-time render with no recurring GPU cost.
      speed={0}
      image={cfg.image}
      contrast={contrast}
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
  eyebrow,
  caption,
}: {
  shader: HalftoneConfig;
  eyebrow: string;
  /** Caption text; a literal "\n" becomes a hard line break. */
  caption: string;
}) {
  const [hovered, setHovered] = React.useState(false);

  // Hovering crisps the halftone rather than moving the card. Each card keeps
  // its own base contrast, so the boost is relative and clamped.
  const contrast = hovered
    ? Math.min(1, shader.contrast + CONTRAST_LIFT)
    : shader.contrast;

  return (
    <div
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      className="relative flex min-h-[276px] flex-col overflow-clip rounded-[22px] border border-white/10 p-5 antialiased [font-synthesis:none]"
      style={{ backgroundImage: SURFACE }}
    >
      <KpiShaderBg cfg={shader} contrast={contrast} />

      {/* Eyebrow top, caption bottom — the block fills the card and splits them. */}
      <div className="relative flex flex-1 flex-col items-start justify-between gap-1.5 self-stretch">
        <span className="w-fit text-base/4.5 tracking-[-0.06em] whitespace-pre-line text-[#FFFFFF8C]">
          {eyebrow}
        </span>
        <span className="w-fit text-2xl/7 tracking-[-0.06em] whitespace-pre-line text-white">
          {caption}
        </span>
      </div>
    </div>
  );
}
