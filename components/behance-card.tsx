"use client";

import * as React from "react";

import { Halftone, BAKED } from "@/components/halftone";

/**
 * The Visual Branding / Behance card, from Paper's "Graceful petal" artboard
 * `behance-card` (GV-0).
 *
 * A 410x516 panel: a halftone shader shell, a "Visual Branding" header with a
 * white "Behance" pill, and three branding-poster mockups tilted and clipped by
 * the card's edges — the whole surface links out to Behance.
 *
 * Geometry is expressed in `cqw` against the 410px artboard, so the whole
 * composition scales as one unit inside whatever column the grid gives it.
 */

const FRAME = 410;
/** Artboard height, for the card's aspect ratio. */
const FRAME_H = 516;
/** Artboard px -> a share of the card's width. */
const q = (px: number) => `${((px / FRAME) * 100).toFixed(4)}cqw`;

const BEHANCE_URL = "https://www.behance.net/romeet09";

function ArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="size-[1em] shrink-0">
      <path
        d="m224.49 136.49l-72 72a12 12 0 0 1-17-17L187 140H40a12 12 0 0 1 0-24h147l-51.49-51.52a12 12 0 0 1 17-17l72 72a12 12 0 0 1-.02 17.01"
        fill="#000000"
      />
    </svg>
  );
}

/**
 * A tilted branding-poster mockup, bled off the card edges. Values from the
 * artboards: on hover the posters fan out — each slides away from the stack
 * (rotation held constant) — so only the translate differs between states.
 */
function Poster({
  src,
  w,
  h,
  r,
  idle,
  hover,
  hovered,
}: {
  src: string;
  w: number;
  h: number;
  r: number;
  idle: { x: number; y: number };
  hover: { x: number; y: number };
  hovered: boolean;
}) {
  const pos = hovered ? hover : idle;
  return (
    <div
      aria-hidden
      className="absolute left-0 top-0 origin-top-left bg-cover bg-center border-solid border-white/30 [border-width:1px] [box-shadow:#000000_0px_2px_70px] transition-[translate] duration-500 ease-out motion-reduce:transition-none"
      style={{
        width: q(w),
        height: q(h),
        translate: `${q(pos.x)} ${q(pos.y)}`,
        rotate: `${r}deg`,
        borderRadius: q(15),
        backgroundImage: `url(${src})`,
      }}
    />
  );
}

export function BehanceCard() {
  const [hovered, setHovered] = React.useState(false);

  return (
    <a
      href={BEHANCE_URL}
      target="_blank"
      rel="noopener noreferrer"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      className="group relative block w-full overflow-clip rounded-[22px] border border-white/10 bg-[#131313] antialiased [font-synthesis:none] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      style={{ containerType: "inline-size", aspectRatio: `${FRAME} / ${FRAME_H}` }}
    >
      <Halftone src={BAKED.behance} hovered={hovered} />

      {/* Posters first so they sit behind the header. Painted back-to-front:
          camouflage (deepest), democracy, then the red "future" poster on top —
          matching the artboard's stacking. Hover fans them out. */}
      <Poster
        src="/behance/camouflage.jpg"
        w={289.5045}
        h={363.1504}
        r={7.31}
        idle={{ x: 265.062, y: 138.315 }}
        hover={{ x: 331, y: 138 }}
        hovered={hovered}
      />
      <Poster
        src="/behance/democracy.jpg"
        w={208.7376}
        h={260.5466}
        r={8.16}
        idle={{ x: -25, y: 237 }}
        hover={{ x: -76, y: 237 }}
        hovered={hovered}
      />
      <Poster
        src="/behance/future.jpg"
        w={209}
        h={260}
        r={-14.46}
        idle={{ x: 99, y: 334 }}
        hover={{ x: 99, y: 415 }}
        hovered={hovered}
      />

      {/* Header: title + subtitle on the left, the Behance pill on the right. */}
      <div
        className="relative flex items-start justify-between"
        style={{ padding: q(20), paddingInline: q(32), paddingTop: q(36) }}
      >
        <div className="flex flex-col items-start" style={{ gap: q(6) }}>
          <span
            className="self-stretch tracking-[-0.06em] text-white"
            style={{ fontSize: q(24), lineHeight: q(28) }}
          >
            Visual Branding
          </span>
          <span
            className="self-stretch whitespace-pre-wrap tracking-[-0.06em] text-[#FFFFFF8C]"
            style={{ fontSize: q(16), lineHeight: q(18) }}
          >
            Yup I do branding as well, check{"\n"}out all my branding works in behance
          </span>
        </div>

        <span
          className="flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-white font-medium tracking-[-0.06em] text-[#000000F2] transition-transform group-hover:scale-105"
          style={{ paddingInline: q(12), paddingBlock: q(8), fontSize: q(12) }}
        >
          Behance
          <ArrowIcon />
        </span>
      </div>
    </a>
  );
}
