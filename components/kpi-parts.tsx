"use client";

import * as React from "react";
import { GemSmoke } from "@paper-design/shaders-react";

/**
 * Shared pieces of the four KPI cards, taken from Paper's "Gentle nebula" file.
 *
 * Every card is authored on a 302x302 artboard, so all geometry here is stated
 * in Paper's own pixels and converted to a percentage of the card. That keeps
 * the composition intact on the web, where the cards are neither 302 wide nor
 * square.
 */
const ARTBOARD = 302;

/** Paper pixels -> percentage of the card. */
export const p = (px: number) => `${((px / ARTBOARD) * 100).toFixed(3)}%`;

/**
 * A GemSmoke burst. Paper gives every one of them `size-20` (80x80, square) and
 * an identical prop set — only the mask image and inner colour change. Square
 * matters: the diamond mask smears into a featureless blob if the box is
 * stretched, which is what a 167x125 box did here before.
 *
 * The mask is a texture the shader loads asynchronously, so the burst renders as
 * a plain glow for the first moment. It also needs the SVG to carry a concrete
 * fill and size — a `currentColor` / `1em` export never resolves standalone.
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
  /** Paper-space position of the burst's top-left, in artboard pixels. */
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
        width: p(80),
        height: p(80),
        left: p(x),
        top: p(y),
      }}
    />
  );
}

/**
 * The eyebrow + caption block, identical on all four cards: eyebrow at (22,178)
 * in 16px/32 #5F5F5F, caption at (22,210) in 32px/32. Only the caption colour
 * changes between the dark and light cards.
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
      <p className="relative font-[family-name:var(--font-instrument)] text-[16px] leading-8 tracking-[-0.06em] text-[#5F5F5F]">
        {eyebrow}
      </p>
      <p
        className={`relative font-[family-name:var(--font-instrument)] text-[32px] leading-8 tracking-[-0.06em] ${
          tone === "dark" ? "text-white" : "text-black"
        }`}
      >
        {children}
      </p>
    </>
  );
}

/** The card box itself — border, radius, and the bottom-anchored text stack. */
export function KpiShell({
  className = "",
  style,
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`relative flex min-h-[268px] flex-col justify-end overflow-hidden rounded-[22px] border-2 border-[#2d2d2d] px-[7.28%] pb-[9.27%] shadow-[inset_0_0_27px_-20px_#131313] ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

/**
 * The full-bleed scrim Paper lays over each photographic card (nodes 33-0, 34-0,
 * 35-0). It is a plain oklab radial that fades from transparent at the top-left
 * to solid at the bottom-right, sinking the image behind the captions. Cards 2-4
 * use this instead of card 1's StaticRadialGradient shader.
 */
export function KpiScrim({ image, blur = false }: { image: string; blur?: boolean }) {
  return (
    <div
      aria-hidden
      // Paper sizes these 302x302 at (-2,-2) — a deliberate overhang so card 4's
      // 4px blur has material to sample past the edge instead of feathering into
      // transparency and leaving a seam.
      className={`pointer-events-none absolute ${blur ? "-inset-2" : "-inset-0.5"}`}
      style={{ backgroundImage: image, filter: blur ? "blur(4px)" : undefined }}
    />
  );
}
