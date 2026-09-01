"use client";

import * as React from "react";

const SURFACE =
  "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)";

export function PrototypesCard() {
  return (
    <div
      className="relative flex aspect-[406/296] w-full flex-col overflow-clip rounded-[22px] border border-white/10 p-5 antialiased [font-synthesis:none]"
      style={{ backgroundImage: SURFACE }}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-position-[50%]"
        style={{
          backgroundImage:
            "url(https://app.paper.design/file-assets/01M1C873668CZYG1N1TF5EFR38/2F3B0V8CZE6QMEEMGS5H5YCVE0.jpg)",
        }}
      />

      <div className="relative flex flex-1 flex-col items-start justify-between gap-1.5 self-stretch">
        <span className="w-fit wrap-normal font-['Instrument_Sans',system-ui,sans-serif] text-[#FFFFFF8C] text-base/4.5">
          Next.js &amp; SwiftUI
        </span>
        <span className="w-fit wrap-normal font-['Instrument_Sans',system-ui,sans-serif] text-white text-2xl/7">
          4 Real, working products.
        </span>
      </div>
    </div>
  );
}
