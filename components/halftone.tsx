import * as React from "react";

/**
 * The halftone field behind the project, case study and vibe cards.
 *
 * This used to be a live WebGL shader. Every shader in the app was `speed={0}` —
 * a fixed image drawn through a GPU pipeline — and nine of them ran at once on
 * the overview, costing ~60MB of GPU memory. Mobile browsers reclaim WebGL
 * contexts under that kind of pressure and re-initialise them later, which is
 * why the cards would blank out and come back.
 *
 * They are now pre-baked to images (see app/shader-bake and BAKING.md), so there
 * is no WebGL on the site at all and nothing that can be evicted.
 */

/** Every baked field, for preloading. Keep in sync with app/shader-bake. */
export const BAKED = {
  kpi1: "/baked/kpi-1.jpg",
  kpi2: "/baked/kpi-2.jpg",
  kpi3: "/baked/kpi-3.jpg",
  kpi4: "/baked/kpi-4.jpg",
  shell: "/baked/pc-shell.jpg",
  tasky: "/baked/card-tasky.jpg",
  inspo: "/baked/card-inspo.jpg",
  study: "/baked/card-study.jpg",
  complai: "/baked/card-complai.jpg",
  claudebar: "/baked/card-claudebar.jpg",
} as const;

export const BAKED_SRCS = Object.values(BAKED);

/**
 * The hover lift. The shader used to raise its `contrast` uniform; with a baked
 * image a CSS filter gets the same read, transitions smoothly, and costs nothing.
 */
const HOVER_FILTER = "contrast(1.12) brightness(1.06)";

export function Halftone({ src, hovered = false }: { src: string; hovered?: boolean }) {
  return (
    <div
      aria-hidden
      // The -top/-bottom bleed is carried over from the shader: it hides the
      // seam at the card's rounded edges.
      className="absolute inset-x-0 -top-0.75 -bottom-0.75 bg-cover bg-center transition-[filter] duration-300 ease-out motion-reduce:transition-none"
      style={{
        backgroundImage: `url(${src})`,
        filter: hovered ? HOVER_FILTER : undefined,
      }}
    />
  );
}

export function LiveIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="size-4 shrink-0">
      <path
        d="M3.05 3.05a7 7 0 0 0 0 9.9.5.5 0 0 1-.707.707 8 8 0 0 1 0-11.314.5.5 0 0 1 .707.707m2.122 2.122a4 4 0 0 0 0 5.656.5.5 0 1 1-.708.708 5 5 0 0 1 0-7.072.5.5 0 0 1 .708.708m5.656-.708a.5.5 0 0 1 .708 0 5 5 0 0 1 0 7.072.5.5 0 1 1-.708-.708 4 4 0 0 0 0-5.656.5.5 0 0 1 0-.708m2.122-2.12a.5.5 0 0 1 .707 0 8 8 0 0 1 0 11.313.5.5 0 0 1-.707-.707 7 7 0 0 0 0-9.9.5.5 0 0 1 0-.707zM10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0"
        fill="#000000"
      />
    </svg>
  );
}

export function GithubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="size-4 shrink-0">
      <path
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"
        fill="#FFFFFF"
      />
    </svg>
  );
}
