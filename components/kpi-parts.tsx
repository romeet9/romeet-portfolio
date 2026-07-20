"use client";

import * as React from "react";
import { GemSmoke } from "@paper-design/shaders-react";

/**
 * Shared pieces of the four KPI cards, from Paper's "Gentle nebula".
 *
 * Every card is authored on a 302x302 artboard. To reproduce the design exactly
 * rather than approximately, the card is a query container and EVERY dimension
 * below — type, padding, image boxes, burst boxes — is expressed in `cqw`, a
 * percentage of the card's own width. The card is then locked to `aspect-square`.
 *
 * That combination is what makes this a true scale model of the artboard: at any
 * card width the whole composition scales together, exactly as Paper draws it.
 *
 * Two traps this avoids:
 *  - Literal px type (32px) is ~14% oversized once the card renders narrower
 *    than 302, which crowds the captions against the edges.
 *  - Percentage `height` resolves against the card's HEIGHT while `width`
 *    resolves against its WIDTH, so a "square" 26.5%/26.5% burst is only square
 *    if the card happens to be. A stretched box smears the diamond mask into a
 *    featureless blob.
 */
const ARTBOARD = 302;

/** Paper artboard pixels -> a share of the card's width. */
export const q = (px: number) => `${((px / ARTBOARD) * 100).toFixed(4)}cqw`;

/**
 * A GemSmoke burst. Paper gives every one of them `size-20` (80x80) and an
 * identical prop set — only the mask image and inner colour change.
 *
 * The mask is a texture the shader loads asynchronously, so the burst renders as
 * a plain glow for a beat after mount. It also needs the SVG to carry a concrete
 * fill and size; a `currentColor` / `1em` export never resolves standalone.
 */
export function KpiBurst({
  image,
  colorInner,
  colors = ["#FFFFFF"],
  x,
  y,
}: {
  image: string;
  colorInner: string;
  colors?: string[];
  /** Top-left of the burst in Paper artboard pixels. */
  x: number;
  y: number;
}) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

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
      style={{
        position: "absolute",
        width: q(80),
        height: q(80),
        left: q(x),
        top: q(y),
      }}
    />
  );
}

/**
 * A full-bleed layer positioned by Paper's own box. Used for the photographic
 * plates, which all overhang the artboard.
 */
export function KpiPlate({
  className,
  x,
  y,
  width,
  height,
}: {
  className: string;
  x: number;
  y: number;
  width: number;
  height: number;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute bg-cover bg-center ${className}`}
      style={{ width: q(width), height: q(height), left: q(x), top: q(y) }}
    />
  );
}

/**
 * The eyebrow + caption block, identical on all four cards: eyebrow at (22,178)
 * in 16px/32 #5F5F5F, caption at (22,210) in 32px/32. Only the caption colour
 * changes between the dark and light cards.
 *
 * Paper positions both by absolute y, so they are placed that way here rather
 * than stacked with flow padding — it keeps the baselines where the design puts
 * them regardless of how the caption wraps.
 */
export function KpiText({
  eyebrow,
  children,
  tone,
}: {
  eyebrow: string;
  children: React.ReactNode;
  tone: "light" | "dark";
}) {
  return (
    <>
      <p
        className="pointer-events-none absolute font-[family-name:var(--font-instrument)] tracking-[-0.06em] whitespace-pre text-[#5F5F5F]"
        style={{ left: q(22), top: q(178), fontSize: q(16), lineHeight: q(32) }}
      >
        {eyebrow}
      </p>
      <p
        className={`pointer-events-none absolute font-[family-name:var(--font-instrument)] tracking-[-0.06em] whitespace-pre ${
          tone === "dark" ? "text-white" : "text-black"
        }`}
        style={{ left: q(22), top: q(210), fontSize: q(32), lineHeight: q(32) }}
      >
        {children}
      </p>
    </>
  );
}

/**
 * The card box. `aspect-square` matches Paper's 302x302 artboard, and
 * `container-type: inline-size` is what makes every `cqw` above resolve against
 * this element's width.
 */
export function KpiShell({
  style,
  children,
}: {
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <div
      className="relative aspect-square overflow-hidden rounded-[22px] border-2 border-[#2d2d2d] shadow-[inset_0_0_27px_-20px_#131313]"
      style={{ containerType: "inline-size", ...style }}
    >
      {children}
    </div>
  );
}

/**
 * The scrim Paper lays over each photographic card (nodes 33-0, 34-0, 35-0): a
 * plain oklab radial fading from transparent at the top-left to solid at the
 * bottom-right, sinking the plate behind the captions. Cards 2-4 use this in
 * place of card 1's StaticRadialGradient shader.
 *
 * Paper sizes these 302x302 at (-2,-2) — a deliberate overhang so card 4's 4px
 * blur has material to sample past the edge instead of feathering into
 * transparency and leaving a seam.
 */
export function KpiScrim({ image, blur = false }: { image: string; blur?: boolean }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute ${blur ? "-inset-2" : "-inset-0.5"}`}
      style={{ backgroundImage: image, filter: blur ? "blur(4px)" : undefined }}
    />
  );
}
