"use client";

import { BAKED } from "@/components/halftone";

/**
 * The Socials card (kpi-card-5 in Paper), the KPI-style tile that fills the
 * notch under the Projects card. Eyebrow "Socials" on top, two social links
 * along the bottom; each link brightens from 60% to full white on hover — the
 * only change between the onIdeal and onHover artboards.
 *
 * `h-full` so it stretches to whatever height the bento column gives it, which
 * is what lines its bottom edge up with the KPI cards beside it.
 */

/** Same base gradient as the other KPI cards. */
const SURFACE =
  "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)";

const LINKEDIN_URL = "https://www.linkedin.com/in/romeet-in/";
const INSTAGRAM_URL = "https://www.instagram.com/rom33t/";

export function SocialsCard() {
  return (
    <div
      className="relative flex h-full flex-col overflow-clip rounded-[22px] border border-white/10 p-5 antialiased [font-synthesis:none]"
      style={{ backgroundImage: SURFACE }}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${BAKED.socials})` }}
      />

      {/* Eyebrow top, links bottom — the block fills the card and splits them. */}
      <div className="relative flex flex-1 flex-col items-start justify-between gap-1.5 self-stretch">
        <span className="w-fit text-base/4.5 text-[#FFFFFF8C]">
          Socials
        </span>
        <div className="flex items-start gap-2 text-2xl/7">
          {/* The comma hugs "Linkedin"; only the words are links. */}
          <span className="flex items-start">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 transition-colors hover:text-white"
            >
              Linkedin
            </a>
            <span className="shrink-0 text-white/60">,</span>
          </span>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-white/60 transition-colors hover:text-white"
          >
            Instagram
          </a>
        </div>
      </div>
    </div>
  );
}
