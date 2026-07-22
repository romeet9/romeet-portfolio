"use client";

import * as React from "react";
import { HalftoneDots } from "@paper-design/shaders-react";

/**
 * Renders every static shader surface in the portfolio at a fixed size so each
 * one can be screenshotted to an image.
 *
 * Every shader in the app is `speed={0}` — a fixed image drawn through a WebGL
 * pipeline. Running nine of them at once cost ~60MB of GPU memory and made
 * mobile browsers reclaim the contexts, which is why the cards would blank out
 * and come back. Baking them removes WebGL from the site entirely.
 *
 * This page is the source of truth for the shader definitions. After a Paper
 * redesign, update the config here and re-bake (see the bake procedure in
 * BAKING.md).
 */

/** Base gradient behind the KPI shaders, from kpi-parts.tsx. */
const KPI_SURFACE =
  "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)";

/** Base card colour behind the halftone.tsx shaders. */
const CARD_BASE = "#131313";

type Bake = {
  name: string;
  w: number;
  h: number;
  image: string;
  grid: "hex" | "square";
  size: number;
  contrast: number;
  radius: number;
  colorFront: string;
  grainSize: number;
  mask: string;
  /** Positioning of the shader inside its card, copied from the real component. */
  shaderClass: string;
  base: string;
};

/** KPI cards — kpi-parts.tsx params, one entry per card. */
const KPI = {
  grid: "hex" as const,
  size: 0.5,
  radius: 1,
  grainSize: 0.5,
  shaderClass: "absolute inset-0",
  base: KPI_SURFACE,
  w: 440,
  h: 460,
};

/** Projects / case study / vibe cards — halftone.tsx SHADER_BASE params. */
const CARD = {
  size: 0.55,
  contrast: 0.22,
  radius: 1.22,
  colorFront: "#000000",
  grainSize: 0.33,
  grid: "hex" as const,
  shaderClass: "absolute inset-x-0 -top-0.75 -bottom-0.75",
  base: CARD_BASE,
};

const MASK_KPI_A =
  "radial-gradient(ellipse 43.585% 47.43% at 80.13% 21.07% in oklab, oklab(100% 0 0) 0%, oklab(21.7% -.0002 0.001) 100%)";
const MASK_KPI_B =
  "radial-gradient(ellipse 43.585% 47.43% at 69.72% 30.94% in oklab, oklab(100% 0 0) 0%, oklab(21.7% -.0002 0.001) 100%)";

export const BAKES: Bake[] = [
  { ...KPI, name: "kpi-1", image: "/kpi/halftone-1.avif", contrast: 0.4, radius: 1.25, colorFront: "#2B2B2B", mask: MASK_KPI_A },
  { ...KPI, name: "kpi-2", image: "/kpi/halftone-2.avif", contrast: 0.37, colorFront: "#060606", mask: MASK_KPI_B },
  { ...KPI, name: "kpi-3", image: "/kpi/halftone-3.jpg", contrast: 0.37, colorFront: "#222222", mask: MASK_KPI_B },
  { ...KPI, name: "kpi-4", image: "/kpi/halftone-4.avif", contrast: 0.83, colorFront: "#111111", mask: MASK_KPI_B },

  // Projects card shell — the only square-grid surface.
  {
    ...CARD, name: "pc-shell", w: 616, h: 776, image: "/kpi/pc-shell.avif",
    grid: "square", size: 0.66,
    mask: "radial-gradient(ellipse 46.01% 60.155% at 82.36% 18.8% in oklab, oklab(57.7% 0 0) 0%, oklab(24.1% 0 0) 100%)",
  },
  // Shared by the Projects mini-card and the vibe Tasky AI card.
  {
    ...CARD, name: "card-tasky", w: 460, h: 460, image: "/kpi/pc-tasky.webp",
    mask: "radial-gradient(ellipse 44.47% 48.395% at 78.15% 50% in oklab, oklab(57.7% 0 0) 0%, oklab(27.2% 0 0) 100%)",
  },
  // Shared by the Projects mini-card and the vibe InspoFlow card.
  {
    ...CARD, name: "card-inspo", w: 460, h: 460, image: "/kpi/pc-shell.avif",
    mask: "radial-gradient(ellipse 44.305% 48.215% at 18.24% 9.16% in oklab, oklab(57.7% 0 0) 0%, oklab(27.2% 0 0) 100%)",
  },
  // Case study card — same focus as card-inspo but a darker falloff (20% vs 27.2%).
  {
    ...CARD, name: "card-study", w: 610, h: 776, image: "/kpi/pc-shell.avif",
    mask: "radial-gradient(ellipse 44.305% 48.215% at 18.24% 9.16% in oklab, oklab(57.7% 0 0) 0%, oklab(20% 0 0) 100%)",
  },
  {
    ...CARD, name: "card-complai", w: 460, h: 460, image: "/kpi/pc-shell.avif",
    mask: "radial-gradient(ellipse 44.47% 48.395% at 74% 70% in oklab, oklab(57.7% 0 0) 0%, oklab(27.2% 0 0) 100%)",
  },
  {
    ...CARD, name: "card-claudebar", w: 460, h: 460, image: "/kpi/pc-tasky.webp",
    mask: "radial-gradient(ellipse 44.47% 48.395% at 82% 78% in oklab, oklab(57.7% 0 0) 0%, oklab(27.2% 0 0) 100%)",
  },
];

/**
 * Renders exactly one surface, pinned to the top-left of a full-screen overlay.
 *
 * One at a time, always in view: the bake route inherits the root layout, so a
 * scrolling board puts targets outside the viewport where the screenshot tool
 * cannot scroll them into view (they end up captured with the site header and
 * dock painted over them). Bake with `/shader-bake?only=<name>`.
 */
export function BakeBoard() {
  const [only, setOnly] = React.useState<string | null>(null);

  React.useEffect(() => {
    setOnly(new URLSearchParams(window.location.search).get("only"));
  }, []);

  const target = BAKES.find((b) => b.name === only);

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden bg-neutral-900">
      {/* Hide the site chrome while baking.
          z-index alone is not enough: PageTransition applies a CSS `filter`,
          which creates a stacking context, so this board's z-9999 is trapped
          inside it and the TopScrim (a white gradient at z-30) paints straight
          over the targets. That got baked into the top of every image as a
          near-white band. */}
      <style
        dangerouslySetInnerHTML={{
          __html: `header, nav[aria-label="Primary"], div[aria-hidden].fixed { display: none !important; }`,
        }}
      />
      {target ? (
        <div
          data-bake={target.name}
          className="absolute top-0 left-0 overflow-clip"
          style={{ width: target.w, height: target.h, background: target.base }}
        >
          <HalftoneDots
            speed={0}
            image={target.image}
            contrast={target.contrast}
            radius={target.radius}
            colorFront={target.colorFront}
            colorBack="#00000000"
            originalColors={false}
            inverted={false}
            grid={target.grid}
            size={target.size}
            scale={1}
            type="gooey"
            fit="cover"
            grainSize={target.grainSize}
            grainMixer={0.2}
            grainOverlay={0.2}
            className={target.shaderClass}
            style={{ backgroundImage: target.mask }}
          />
        </div>
      ) : (
        <ul className="p-8 text-sm text-white/70">
          {BAKES.map((b) => (
            <li key={b.name}>
              <a className="underline" href={`/shader-bake?only=${b.name}`}>
                {b.name}
              </a>{" "}
              · {b.w}×{b.h}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
