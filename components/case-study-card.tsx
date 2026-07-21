"use client";

import * as React from "react";
import Link from "next/link";

import { Halftone, type Shader } from "@/components/halftone";

/**
 * The case study preview card, from Paper's "Graceful petal" artboard
 * `add-case-preview-card` (9Q-0).
 *
 * A 406x516 panel: a halftone shader field, a tall phone mockup rotated and
 * bled off the top edge, and a bottom row carrying the title, the tagline and a
 * white "View all" pill.
 *
 * Geometry is expressed in `cqw` against the 406px artboard, so the whole
 * composition scales as one unit inside whatever column the grid gives it.
 */

const FRAME = 406;
/** Artboard px -> a share of the card's width. */
const q = (px: number) => `${((px / FRAME) * 100).toFixed(4)}cqw`;

const SHADER: Shader = {
  image: "/kpi/pc-shell.avif",
  grid: "hex",
  size: 0.55,
  mask: "radial-gradient(ellipse 44.305% 48.215% at 18.24% 9.16% in oklab, oklab(57.7% 0 0) 0%, oklab(20% 0 0) 100%)",
};

/** Hover lifts the halftone, matching the KPI and Vibe cards. */
const CONTRAST_IDLE = 0.22;
const CONTRAST_HOVER = 0.4;


/**
 * The artboard writes the title with a hyphen rather than the em dash the data
 * carries, which also keeps Romeet's no-em-dash rule. Display only.
 */
const asTitle = (s: string) => s.replace(/\s*—\s*/g, " - ");
/** Same rule for the tagline: an em dash mid-sentence becomes a colon. */
const asSentence = (s: string) => s.replace(/\s*—\s*/g, ": ");

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
 * Takes plain strings rather than the CaseStudy object: the study carries
 * Lucide icon *functions* in its metrics and acts, which cannot cross the
 * server/client boundary.
 */
export function CaseStudyCard({
  href,
  name,
  tagline,
  mock,
}: {
  href: string;
  name: string;
  tagline: string;
  mock: string;
}) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <Link
      href={href}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      className="group relative block aspect-[406/516] w-full overflow-clip rounded-[22px] border border-white/10 bg-[#131313] antialiased [font-synthesis:none] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      style={{ containerType: "inline-size" }}
    >
      <Halftone cfg={SHADER} contrast={hovered ? CONTRAST_HOVER : CONTRAST_IDLE} />

      {/* The mockup, rotated and bled off the top-left corner. Static — the
          hover travel from the onHover artboard is deliberately not wired up. */}
      <div
        aria-hidden
        className="absolute origin-top-left bg-cover bg-center"
        style={{
          width: q(319),
          height: q(640),
          left: "50%",
          top: 0,
          translate: `calc(-50% - ${q(170.5)}) ${q(-232)}`,
          rotate: "344.61deg",
          filter: "brightness(85%)",
          backgroundImage: `url(${mock})`,
        }}
      />

      {/* Pill pinned top-right, title and tagline along the bottom. */}
      <div
        className="relative flex h-full flex-col justify-between"
        style={{ padding: q(20) }}
      >
        <div
          className="flex items-center justify-end"
          style={{ paddingInline: q(12), paddingBlock: q(8) }}
        >
          <span
            className="flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-white font-medium tracking-[-0.06em] text-[#000000F2] transition-transform group-hover:scale-105"
            style={{ paddingInline: q(12), paddingBlock: q(8), fontSize: q(12) }}
          >
            View all
            <ArrowIcon />
          </span>
        </div>

        {/* Stays visible: with the mockup static, hiding this would just leave
            a gap. */}
        <div
          className="flex flex-col items-start gap-1.5"
          style={{ paddingInline: q(12), paddingBlock: q(16) }}
        >
          <span
            className="self-stretch tracking-[-0.06em] text-white"
            style={{ fontSize: q(24), lineHeight: q(28) }}
          >
            {asTitle(name)}
          </span>
          <span
            className="self-stretch tracking-[-0.06em] text-[#FFFFFF8C]"
            style={{ fontSize: q(16), lineHeight: q(18) }}
          >
            {asSentence(tagline)}
          </span>
        </div>
      </div>
    </Link>
  );
}
