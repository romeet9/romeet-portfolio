"use client";

import * as React from "react";
import { GemSmoke } from "@paper-design/shaders-react";

/**
 * Shared pieces of the four KPI cards, from Paper's "Gentle nebula".
 *
 * The redesign stripped these back to one shape: a dark card carrying a single
 * vertical gradient, a right-aligned row of GemSmoke bursts, and an eyebrow +
 * caption block. No photographic plates, no scrims, no blur, no radial washes —
 * all four artboards are now identical apart from their icons and copy.
 *
 * Everything here is Paper's own Tailwind, carried across verbatim.
 */

/** The card's only background — artboard-level, identical on all four. */
const SURFACE =
  "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)";

/**
 * Every burst shares one prop set; only the mask and its two colours change.
 * Paper sizes them all `size-20` (80x80, square) — the diamond mask smears into a
 * featureless blob if the box is ever stretched.
 *
 * The mask is a texture the shader fetches after mount, so a burst renders as a
 * plain glow for a beat. It also needs the SVG to carry a concrete fill and size;
 * a `currentColor` / `1em` export never resolves standalone.
 */
export function KpiBurst({
  image,
  colors,
  colorInner,
  className = "",
}: {
  image: string;
  colors: string[];
  colorInner: string;
  className?: string;
}) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return <div className={`size-20 shrink-0 ${className}`} />;

  return (
    <GemSmoke
      speed={3}
      size={0.8}
      outerDistortion={0}
      innerDistortion={1}
      outerGlow={0.46}
      innerGlow={1}
      offset={0}
      scale={0.6}
      angle={-360}
      shape="diamond"
      image={image}
      colors={colors}
      colorInner={colorInner}
      colorBack="#00000000"
      className={`size-20 shrink-0 ${className}`}
    />
  );
}

/**
 * The card shell: Paper's own classes, with the icon row and the text block as
 * the two children it lays out.
 *
 * `min-h-[304px]` is the artboard height. Width is left to the grid rather than
 * pinned to Paper's `w-75` — the row is responsive, and every child is fixed-size
 * so the composition holds at any column width.
 */
export function KpiCard({
  icons,
  eyebrow,
  caption,
}: {
  icons: React.ReactNode;
  eyebrow: string;
  caption: string;
}) {
  return (
    <div
      className="flex min-h-[304px] flex-col items-end justify-center gap-25 overflow-clip rounded-[22px] border-2 border-solid border-[#2D2D2D] p-5 antialiased [box-shadow:#131313_0px_0px_27px_-20px_inset] [font-synthesis:none]"
      style={{ backgroundImage: SURFACE }}
    >
      {icons}

      {/* Eyebrow and caption share one line-height (/7 = 1.75rem) and one
          letter-spacing (-0.06em) so the small and large text read as a single
          type treatment. Only the glyph size differs: 16px label, 24px caption
          (down from Paper's 28px per Romeet). Line-height stays 28px so the
          two-line caption keeps its spacing regardless of glyph size. */}
      <div className="flex flex-col items-start gap-1.5 self-stretch">
        <div className="w-fit font-['Instrument_Sans',system-ui,sans-serif] text-base/7 tracking-[-0.06em] text-[#5F5F5F]">
          {eyebrow}
        </div>
        <div className="w-fit font-['Instrument_Sans',system-ui,sans-serif] text-2xl/7 tracking-[-0.06em] whitespace-pre text-white">
          {caption}
        </div>
      </div>
    </div>
  );
}
