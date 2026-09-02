"use client";

import * as React from "react";

/**
 * Video card from Paper design (frame 5FA-0) embedding autoplaying video.
 */
export function VideoCard() {
  return (
    <div className="group [font-synthesis:none] wrap-anywhere flex items-center rounded-[27px] p-1 self-stretch bg-[#232323] border border-solid border-[#383838] antialiased text-xs/4 transition-all duration-300 hover:border-white/20 hover:shadow-[0_12px_32px_rgba(0,0,0,0.6)]">
      <div className="relative w-full aspect-[347.33/360] overflow-hidden rounded-[22px] bg-[#131313] border border-solid border-[#FFFFFF1A]">
        <video
          src="/videos/animo-focus-slider-720p.webm"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover rounded-[22px]"
        />
      </div>
    </div>
  );
}

export { VideoCard as ExperienceCard };
