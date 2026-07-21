"use client";

import * as React from "react";
import Link from "next/link";

import { Halftone, GithubIcon, LiveIcon, type Shader } from "@/components/halftone";

/**
 * The Projects card, from Paper's "Graceful petal" artboards
 * `projects-card/onIdeal` (7L-0) and `projects-card/onHover` (8K-0).
 *
 * A 410x410 panel: a halftone shader shell, a "Projects" header with a white
 * "View all" pill, and two project mini-cards clipped by the card's edges.
 *
 * Idle: the mini-cards are tilted and overlapping, fanned like a hand of cards.
 * Hover: they straighten to 0deg and spread apart. Only left/top/rotate differ
 * between the two artboards, so hover is a pure transition of those three.
 *
 * Geometry is expressed in `cqw` against the 410px artboard, so the whole
 * composition scales as one unit inside whatever column the grid gives it.
 */

const FRAME = 410;
/** Artboard px -> a share of the card's width. */
const q = (px: number) => `${((px / FRAME) * 100).toFixed(4)}cqw`;

const SHELL: Shader = {
  image: "/kpi/pc-shell.avif",
  grid: "square",
  size: 0.66,
  mask: "radial-gradient(ellipse 46.01% 60.155% at 82.36% 18.8% in oklab, oklab(57.7% 0 0) 0%, oklab(24.1% 0 0) 100%)",
};

const TASKY: Shader = {
  image: "/kpi/pc-tasky.webp",
  grid: "hex",
  size: 0.55,
  mask: "radial-gradient(ellipse 44.47% 48.395% at 78.15% 50% in oklab, oklab(57.7% 0 0) 0%, oklab(27.2% 0 0) 100%)",
};

const INSPO: Shader = {
  image: "/kpi/pc-shell.avif",
  grid: "hex",
  size: 0.55,
  mask: "radial-gradient(ellipse 44.305% 48.215% at 18.24% 9.16% in oklab, oklab(57.7% 0 0) 0%, oklab(27.2% 0 0) 100%)",
};

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

/** A mini project card. Idle and hover coordinates come straight from the artboards. */
function MiniCard({
  shader,
  title,
  desc,
  live,
  github,
  idle,
  hover,
}: {
  shader: Shader;
  title: string;
  desc: string;
  live?: string;
  github: string;
  idle: { x: number; y: number; r: number };
  hover: { x: number; y: number; r: number };
}) {
  return (
    <div
      className={[
        "absolute flex origin-top-left flex-col justify-between overflow-clip rounded-[22px]",
        "border border-white/10 [box-shadow:#000000_0px_2px_70px]",
        // Only these three properties differ between the two artboards.
        "left-[var(--l)] top-[var(--t)] rotate-[var(--r)]",
        "group-hover:left-[var(--lh)] group-hover:top-[var(--th)] group-hover:rotate-[var(--rh)]",
        "transition-[left,top,rotate] duration-500 ease-out motion-reduce:transition-none",
      ].join(" ")}
      style={
        {
          width: q(300),
          height: q(277),
          padding: q(20),
          "--l": q(idle.x),
          "--t": q(idle.y),
          "--r": `${idle.r}deg`,
          "--lh": q(hover.x),
          "--th": q(hover.y),
          "--rh": `${hover.r}deg`,
        } as React.CSSProperties
      }
    >
      <Halftone cfg={shader} />

      {/* Link pills */}
      <div
        className={`relative flex items-center ${live ? "justify-between" : "justify-end"} self-stretch`}
        style={{ paddingBlock: q(8), paddingInline: q(6) }}
      >
        {live && (
          <span
            className="flex items-center justify-center gap-1.5 rounded-full bg-white font-medium tracking-[-0.06em] text-[#000000F2]"
            style={{ paddingInline: q(12), paddingBlock: q(8), fontSize: q(12) }}
          >
            <LiveIcon />
            Live Link
          </span>
        )}
        <span
          className="flex items-center gap-1.5 rounded-full border-solid border-white tracking-[-0.06em] text-white [border-width:0.2px]"
          style={{ paddingInline: q(12), paddingBlock: q(8), fontSize: q(16) }}
        >
          <GithubIcon />
          Github
        </span>
      </div>

      {/* Description sits above the title, as in the artboard. */}
      <div className="relative flex flex-col items-start gap-1.5 self-stretch">
        <span
          className="self-stretch tracking-[-0.06em] text-[#FFFFFF8C]"
          style={{ fontSize: q(16), lineHeight: q(18) }}
        >
          {desc}
        </span>
        <span
          className="self-stretch tracking-[-0.06em] text-white"
          style={{ fontSize: q(24), lineHeight: q(28) }}
        >
          {title}
        </span>
      </div>

      {/* The whole mini-card is a link to its live build or repo. */}
      <a
        href={live ?? github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={title}
        className="absolute inset-0 z-10"
      />
    </div>
  );
}

export function ProjectsCard() {
  return (
    <div
      className="group relative aspect-square w-full overflow-clip rounded-[22px] border border-white/10 bg-[#131313] antialiased [font-synthesis:none]"
      style={{ containerType: "inline-size" }}
    >
      <Halftone cfg={SHELL} />

      {/* Header */}
      <div
        className="relative flex items-center justify-between"
        style={{ padding: q(20), paddingInline: q(32) }}
      >
        <div className="flex flex-col items-start gap-1.5">
          <span
            className="tracking-[-0.06em] text-white"
            style={{ fontSize: q(24), lineHeight: q(28) }}
          >
            Projects
          </span>
          <span
            className="whitespace-pre-wrap tracking-[-0.06em] text-[#FFFFFF8C]"
            style={{ fontSize: q(16), lineHeight: q(18) }}
          >
            Real, shipped products{"\n"}I designed &amp; built
          </span>
        </div>

        <Link
          href="/projects"
          className="relative z-20 flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-white font-medium tracking-[-0.06em] text-[#000000F2] transition-transform hover:scale-105"
          style={{ paddingInline: q(12), paddingBlock: q(8), fontSize: q(12) }}
        >
          View all
          <ArrowIcon />
        </Link>
      </div>

      <MiniCard
        shader={TASKY}
        title="Tasky AI"
        desc="Say your morning brief out loud & get a structured, prioritized plan back."
        live="https://task-planner-seven-zeta.vercel.app"
        github="https://github.com/romeet9/tasky-ai"
        idle={{ x: 36, y: 157, r: -5.24 }}
        hover={{ x: -49, y: 158.72, r: 0 }}
      />

      <MiniCard
        shader={INSPO}
        title="InspoFlow"
        desc="Turn a messy screenshot camera roll into a searchable inspiration library."
        github="https://github.com/romeet9/InspoFlow"
        idle={{ x: 202, y: 116, r: 11.94 }}
        hover={{ x: 175, y: 252, r: 0 }}
      />
    </div>
  );
}
