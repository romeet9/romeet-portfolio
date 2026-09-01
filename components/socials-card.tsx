"use client";

import * as React from "react";

const SURFACE =
  "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)";

const LINKEDIN_URL = "https://www.linkedin.com/in/romeet-in/";
const INSTAGRAM_URL = "https://www.instagram.com/rom33t/";

export function SocialsCard() {
  return (
    <div
      className="relative flex aspect-[406/296] w-full flex-col overflow-clip rounded-[22px] border border-white/10 p-5 antialiased [font-synthesis:none]"
      style={{ backgroundImage: SURFACE }}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://app.paper.design/file-assets/01M1C873668CZYG1N1TF5EFR38/5TPFP7AXPF338H52T45PQ6EW49.jpg)",
        }}
      />

      {/* Eyebrow top, links bottom */}
      <div className="relative flex flex-1 flex-col items-start justify-between gap-1.5 self-stretch">
        <span className="w-fit text-base/4.5 text-[#FFFFFF8C]">
          Socials
        </span>
        <div className="flex items-start gap-2 text-2xl/7">
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
