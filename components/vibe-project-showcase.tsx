"use client";

import * as React from "react";
import Link from "next/link";

import { projects, type Project } from "@/content/projects";
import { Halftone, GithubIcon, LiveIcon, type Shader } from "@/components/halftone";

/**
 * The Vibe Coded Projects grid, in the mini-card style from Paper's
 * "Graceful petal" project cards: a halftone shader panel with the Live Link /
 * Github pills on top and the description sitting above the title at the bottom.
 *
 * The canvas only defines artboards for Tasky AI and InspoFlow, so the two
 * halftone images are alternated across the four projects. Each card gets its
 * own radial mask focal point so the reused images don't read as duplicates.
 */

const TASKY_IMG = "/kpi/pc-tasky.webp";
const SHELL_IMG = "/kpi/pc-shell.avif";

/** Mask focal points: the two from the canvas, plus two distinct ones. */
const SHADERS: Record<string, Shader> = {
  "tasky-ai": {
    image: TASKY_IMG,
    grid: "hex",
    size: 0.55,
    mask: "radial-gradient(ellipse 44.47% 48.395% at 78.15% 50% in oklab, oklab(57.7% 0 0) 0%, oklab(27.2% 0 0) 100%)",
  },
  complai: {
    image: SHELL_IMG,
    grid: "hex",
    size: 0.55,
    // Pushed to the lower right so it doesn't read as a twin of InspoFlow,
    // which shares this image with an upper-left focus.
    mask: "radial-gradient(ellipse 44.47% 48.395% at 74% 70% in oklab, oklab(57.7% 0 0) 0%, oklab(27.2% 0 0) 100%)",
  },
  inspoflow: {
    image: SHELL_IMG,
    grid: "hex",
    size: 0.55,
    mask: "radial-gradient(ellipse 44.305% 48.215% at 18.24% 9.16% in oklab, oklab(57.7% 0 0) 0%, oklab(27.2% 0 0) 100%)",
  },
  claudebar: {
    image: TASKY_IMG,
    grid: "hex",
    size: 0.55,
    mask: "radial-gradient(ellipse 44.47% 48.395% at 82% 78% in oklab, oklab(57.7% 0 0) 0%, oklab(27.2% 0 0) 100%)",
  },
};

/** Idle vs hover contrast — hovering lifts the halftone rather than moving the card. */
const CONTRAST_IDLE = 0.22;
const CONTRAST_HOVER = 0.4;

function ProjectCard({ project }: { project: Project }) {
  const { slug, name, tagline, links } = project;
  const [hovered, setHovered] = React.useState(false);
  const shader = SHADERS[slug] ?? SHADERS["tasky-ai"];

  return (
    <div
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      className="relative flex aspect-square flex-col justify-between overflow-clip rounded-[22px] border border-white/10 p-5 antialiased [box-shadow:#000000_0px_2px_70px] [font-synthesis:none]"
    >
      <Halftone cfg={shader} contrast={hovered ? CONTRAST_HOVER : CONTRAST_IDLE} />

      {/* Link pills. Github sits right; Live Link only when the project has one. */}
      <div
        className={`relative z-20 flex items-center self-stretch px-1.5 py-2 ${
          links.live ? "justify-between" : "justify-end"
        }`}
      >
        {links.live && (
          <a
            href={links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-full bg-white px-3 py-2 text-xs/3.5 font-medium tracking-[-0.06em] text-[#000000F2] transition-transform hover:scale-105"
          >
            <LiveIcon />
            Live Link
          </a>
        )}
        {links.github && (
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full border-solid border-white px-3 py-2 text-base/4.5 tracking-[-0.06em] text-white transition-transform [border-width:0.2px] hover:scale-105"
          >
            <GithubIcon />
            Github
          </a>
        )}
      </div>

      {/* Description above the title, as in the artboard. */}
      <div className="relative flex flex-col items-start gap-1.5 self-stretch">
        <span className="self-stretch text-base/4.5 tracking-[-0.06em] text-[#FFFFFF8C]">
          {tagline}
        </span>
        <span className="self-stretch text-2xl/7 tracking-[-0.06em] text-white">{name}</span>
      </div>

      {/* The card surface opens the detail page; the pills above it win the click. */}
      <Link
        href={`/projects/${slug}`}
        aria-label={name}
        className="absolute inset-0 z-10 rounded-[22px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      />
    </div>
  );
}

export function VibeProjectShowcase() {
  return (
    <div className="grid items-stretch gap-4 @2xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
