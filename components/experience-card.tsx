"use client";

import * as React from "react";
import { GemSmoke } from "@paper-design/shaders-react";

/**
 * The third KPI card, from Paper's kpi-card-3: a near-black card with a live
 * orange briefcase GemSmoke burst top-right, and "Experience" / "I have 2 year's
 * of experience". Same treatment as card-1 — live burst, CSS dark radial.
 */
const DARK_RADIAL =
  "radial-gradient(135% 120% at 72% 16%, #242424 0%, #1b1b1b 45%, #131313 100%)";

export function ExperienceCard() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <div
      className="relative flex min-h-[268px] flex-col justify-end overflow-hidden rounded-[22px] border-2 border-[#2d2d2d] p-5 shadow-[inset_0_0_27px_-20px_#131313]"
      style={{ backgroundColor: "#191919", backgroundImage: DARK_RADIAL }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute bg-[url('/kpi/card3-bg.png')] bg-cover bg-center opacity-[0.14] mix-blend-luminosity"
        style={{ width: "100%", height: "150%", left: "-0.7%", top: "-25.5%" }}
      />

      {mounted && (
        <GemSmoke
          speed={3}
          size={0.8}
          outerDistortion={0}
          innerDistortion={1}
          outerGlow={0.46}
          innerGlow={1}
          offset={0}
          scale={0.6}
          angle={-360}
          shape="diamond"
          image="/kpi/gem-briefcase.svg"
          colors={["#FFFFFF"]}
          colorInner="#FF4E00"
          colorBack="#00000000"
          style={{ position: "absolute", width: "55.3%", height: "41.4%", left: "49.3%", top: "1.3%" }}
        />
      )}

      <p className="relative font-[family-name:var(--font-instrument)] text-[16px] leading-none tracking-[-0.06em] text-white/50">
        Experience
      </p>
      <p className="relative mt-2 font-[family-name:var(--font-instrument)] text-[24px] leading-[26px] font-medium tracking-[-0.06em] text-white">
        I have 2 year&rsquo;s of
        <br />
        experience
      </p>
    </div>
  );
}
