"use client";

import * as React from "react";
import { GemSmoke, StaticRadialGradient } from "@paper-design/shaders-react";

/**
 * The "Shipped to production" KPI card, from its Paper design (kpi-card-2 in
 * "Gentle nebula"): a light metallic card — a silver StaticRadialGradient over an
 * editorial poster plate — with two live GemSmoke bursts (an orange Swift shape
 * left, a black orb right) and the captions "Next.js & SwiftUI" / "4 Real,
 * Working products".
 *
 * These are the *real* Paper shaders (@paper-design/shaders-react), rendered live
 * and animated — props carried over verbatim from the Paper export. They're
 * WebGL, so they only mount on the client to keep SSR clean.
 */
export function ShippedCard() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <div className="relative flex min-h-[268px] flex-col justify-end overflow-hidden rounded-[22px] border-2 border-[#2d2d2d] bg-[#b8b8b8] p-5 shadow-[inset_0_0_27px_-20px_#131313]">
      {/* The editorial poster plate, at Paper's crop (427×600 at -65,-151),
          washed by the radial above it. */}
      <div
        aria-hidden
        className="pointer-events-none absolute bg-[url('/kpi/card2-bg.png')] bg-cover bg-center opacity-50"
        style={{ width: "141.6%", height: "198.7%", left: "-21.5%", top: "-50%" }}
      />

      {mounted && (
        <>
          {/* Silver metallic radial — the StaticRadialGradient shader, at Paper's
              own offset so its light falloff lands at the bottom behind the
              caption rather than filling flat. */}
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
            colors={["#F7F7F7", "#B5B5B5", "#747474"]}
            colorBack="#00000000"
            style={{ position: "absolute", width: "317.2%", height: "237.7%", left: "-93.7%", top: "-73.2%" }}
          />

          {/* Orange Swift-shaped burst, left. */}
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
            image="/kpi/gem-swift.svg"
            colors={["#FFFFFF"]}
            colorInner="#FF4E00"
            colorBack="#00000000"
            style={{ position: "absolute", width: "55.3%", height: "41.4%", left: "13.6%", top: "1.3%" }}
          />

          {/* Black orb-shaped burst, right. */}
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
            image="/kpi/gem-orb.svg"
            colors={["#FFFFFF"]}
            colorInner="#000000"
            colorBack="#00000000"
            style={{ position: "absolute", width: "55.3%", height: "41.4%", left: "49.3%", top: "1.3%" }}
          />
        </>
      )}

      <p className="relative font-[family-name:var(--font-instrument)] text-[16px] leading-none tracking-[-0.06em] text-[#5f5f5f]">
        Next.js &amp; SwiftUI
      </p>
      <p className="relative mt-2 font-[family-name:var(--font-instrument)] text-[24px] leading-[26px] font-medium tracking-[-0.06em] text-black">
        4 Real, Working
        <br />
        products
      </p>
    </div>
  );
}
