"use client";

import * as React from "react";
import { GemSmoke, StaticRadialGradient } from "@paper-design/shaders-react";

/**
 * The "Interactive prototypes" KPI card, from its Paper design (kpi-card-1 in
 * "Gentle nebula"): a near-black card — the Claude Code terminal ghosted under a
 * dark StaticRadialGradient — with a coral GemSmoke burst top-right and the
 * caption "Ships a clickable build" in Instrument Sans.
 *
 * The real Paper shaders (@paper-design/shaders-react), live and animated, props
 * carried over verbatim from the Paper export. WebGL, so client-only.
 */
export function PrototypesCard() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <div className="relative flex min-h-[268px] flex-col justify-end overflow-hidden rounded-[22px] border-2 border-[#2d2d2d] bg-[#191919] p-5 shadow-[inset_0_0_27px_-20px_#131313]">
      {/* The Claude Code terminal, in the upper area, ghosted. Positioned to
          Paper's crop (429×250 at -65,-32 within a 302 card). */}
      <div
        aria-hidden
        className="pointer-events-none absolute bg-[url('/kpi/terminal.png')] bg-cover bg-center opacity-30"
        style={{ width: "142.1%", height: "82.8%", left: "-21.5%", top: "-10.6%" }}
      />

      {mounted && (
        <>
          {/* Dark radial — the StaticRadialGradient shader, at Paper's own offset
              (958×718 shifted up-and-right), so its dark falloff lands at the
              bottom-left behind the caption rather than filling flat. */}
          <StaticRadialGradient
            scale={1}
            offsetX={0}
            offsetY={0}
            radius={0.9}
            focalDistance={1.84}
            focalAngle={0}
            falloff={0.12}
            mixing={0.5}
            distortionShift={-1}
            distortionFreq={28}
            distortion={0.43}
            grainMixer={0}
            grainOverlay={0.3}
            colors={["#202020", "#1C1C1C", "#191919"]}
            colorBack="#00000000"
            style={{ position: "absolute", width: "317.2%", height: "237.7%", left: "-93.7%", top: "-73.2%" }}
          />

          {/* Coral gem-smoke burst, top-right. */}
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
            image="/kpi/gem-card1.svg"
            colors={["#FFFFFF", "#DA775A"]}
            colorInner="#DA775A"
            colorBack="#00000000"
            style={{ position: "absolute", width: "55.3%", height: "41.4%", left: "49.3%", top: "1.3%" }}
          />
        </>
      )}

      <p className="relative font-[family-name:var(--font-instrument)] text-[24px] leading-[26px] font-medium tracking-[-0.06em] text-white">
        Ships a clickable
        <br />
        build
      </p>
    </div>
  );
}
