"use client";

import * as React from "react";
import { GemSmoke } from "@paper-design/shaders-react";

import { KpiGrain } from "@/components/kpi-grain";

/**
 * The "Shipped to production" KPI card, from Paper's kpi-card-2: a light metallic
 * card over the editorial poster plate, with two live GemSmoke bursts (an orange
 * Swift shape left, a black orb right) and "Next.js & SwiftUI" / "4 Real, Working
 * products".
 *
 * The bursts are the real Paper shaders, live. The static silver radial is a CSS
 * gradient + grain here (see PrototypesCard).
 */
const LIGHT_RADIAL =
  "radial-gradient(130% 125% at 66% 20%, #f4f4f4 0%, #cbcbcb 52%, #9a9a9a 100%)";

export function ShippedCard() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <div
      className="relative flex min-h-[268px] flex-col justify-end overflow-hidden rounded-[22px] border-2 border-[#2d2d2d] p-5 shadow-[inset_0_0_27px_-20px_#131313]"
      style={{ backgroundColor: "#b8b8b8", backgroundImage: LIGHT_RADIAL }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute bg-[url('/kpi/card2-bg.png')] bg-cover bg-center opacity-[0.22] mix-blend-luminosity"
        style={{ width: "141.6%", height: "198.7%", left: "-21.5%", top: "-50%" }}
      />
      <KpiGrain />

      {mounted && (
        <>
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
