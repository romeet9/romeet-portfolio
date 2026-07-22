"use client";

import * as React from "react";

/**
 * Shared shell for the four KPI cards, from Paper's "Graceful petal" redesign
 * (artboards kpi-card-1..4).
 *
 * A dark panel with a halftone image field, the eyebrow pinned to the top and
 * the caption to the bottom.
 *
 * The field used to be a live WebGL shader at `speed={0}` — a fixed image drawn
 * through a GPU pipeline. It is now pre-baked (see app/shader-bake), so nothing
 * here holds a WebGL context that a mobile browser can reclaim.
 */

/** The base gradient under the field, identical on every card. */
const SURFACE =
  "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)";

/** Hover lift, matching the other cards. */
const HOVER_FILTER = "contrast(1.12) brightness(1.06)";

export function KpiCard({
  field,
  eyebrow,
  caption,
}: {
  /** Baked halftone image for this card. */
  field: string;
  eyebrow: string;
  /** Caption text; a literal "\n" becomes a hard line break. */
  caption: string;
}) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      className="relative flex min-h-[276px] flex-col overflow-clip rounded-[22px] border border-white/10 p-5 antialiased [font-synthesis:none]"
      style={{ backgroundImage: SURFACE }}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center transition-[filter] duration-300 ease-out motion-reduce:transition-none"
        style={{
          backgroundImage: `url(${field})`,
          filter: hovered ? HOVER_FILTER : undefined,
        }}
      />

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
