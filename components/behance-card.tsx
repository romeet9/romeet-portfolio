"use client";

import * as React from "react";
import { LazyHalftoneDots as HalftoneDots } from "@/components/case-study/lazy-halftone-dots";

const BEHANCE_URL = "https://www.behance.net/romeet09";

function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      style={{ height: "10.5px", width: "10.5px", flexShrink: 0, overflow: "clip" }}
    >
      <path
        d="m224.49 136.49l-72 72a12 12 0 0 1-17-17L187 140H40a12 12 0 0 1 0-24h147l-51.49-51.52a12 12 0 0 1 17-17l72 72a12 12 0 0 1-.02 17.01"
        fill="#000000"
      />
    </svg>
  );
}

export function BehanceCard() {
  return (
    <a
      href={BEHANCE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group [font-synthesis:none] wrap-anywhere flex items-center rounded-[27px] p-1 self-stretch bg-[#232323] border border-solid border-[#383838] antialiased text-xs/4 transition-all duration-300 hover:border-white/20 hover:shadow-[0_12px_32px_rgba(0,0,0,0.6)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <div
        className="aspect-[406/516] @container [font-synthesis-small-caps:none] [font-synthesis-style:none] [font-synthesis-weight:none] w-full rounded-[22px] overflow-clip relative bg-[#131313] border border-solid border-[#FFFFFF1A]"
        style={{ containerType: "inline-size" }}
      >
        <div
          className="w-106 h-135 absolute left-[50%] top-[50%] bg-[#484848]"
          style={{ translate: "-50% -50%" }}
        />

        {/* Halftone Dots Background */}
        <HalftoneDots
          contrast={1}
          originalColors={false}
          inverted
          grid="square"
          radius={1}
          size={0.8}
          scale={1}
          grainSize={0.5}
          type="soft"
          fit="cover"
          grainMixer={0.05}
          grainOverlay={0.3}
          image="https://app.paper.design/file-assets/01M1C873668CZYG1N1TF5EFR38/01M04G80ZAAH1PVPV1FAHY4PSW.jpg"
          colorFront="#F17969"
          colorBack="#00000000"
          className="w-106 h-135 absolute left-[50%] top-[50%]"
          style={{
            backgroundImage:
              "linear-gradient(in oklab 178.97000000000003deg, oklab(71% 0.132 0.074) 14.53%, oklab(40% 0 0 / 0%) 79.28%)",
            translate: "-50% -50%",
          }}
        />

        {/* Dark Vignette Radial Gradient Overlay */}
        <div
          className="w-106 h-135 absolute left-[calc(50%+424.006px)] top-[calc(50%+539.994px)] origin-top-left"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 89.815% 70.515% at 50.04% 20.47% in oklab, oklab(71.8% 0 0 / 0%) 0%, 9.42%, oklab(20.1% 0 0) 100%)",
            rotate: "180deg",
            translate: "-50% -50%",
          }}
        />

        {/* 3 Posters Fan Out */}
        <div
          aria-hidden
          className="h-[314.726px] w-[250.9px] top-0 left-0 absolute rounded-[12.9997px] [box-shadow:#0000004D_0px_2px_70px] bg-origin-border bg-cover bg-position-[50%] border border-solid border-[#FFFFFF4D] origin-top-left transition-transform duration-500 ease-out group-hover:translate-x-[245px] group-hover:translate-y-[170px]"
          style={{
            backgroundImage:
              "url(https://app.paper.design/file-assets/01M1C873668CZYG1N1TF5EFR38/2DZ83MSRFYNER8AMMZGKWXDRR8.jpg)",
            rotate: "7.31deg",
            translate: "229.672px 179px",
          }}
        />
        <div
          aria-hidden
          className="h-[225.804px] w-[180.903px] top-0 left-0 absolute rounded-[12.9997px] [box-shadow:#0000004D_0px_2px_70px] bg-origin-border bg-cover bg-position-[50%] border border-solid border-[#FFFFFF4D] origin-top-left transition-transform duration-500 ease-out group-hover:translate-x-[-35px] group-hover:translate-y-[260px]"
          style={{
            backgroundImage:
              "url(https://app.paper.design/file-assets/01M1C873668CZYG1N1TF5EFR38/3RJ6V9EV05S8DP06FY7WA0TCJ3.jpg)",
            rotate: "8.16deg",
            translate: "-21.328px 265px",
          }}
        />
        <div
          aria-hidden
          className="h-[225.33px] w-[181.131px] top-0 left-0 absolute rounded-[12.9997px] [box-shadow:#0000004D_0px_2px_70px] bg-origin-border bg-cover bg-position-[50%] border border-solid border-[#FFFFFF4D] origin-top-left transition-transform duration-500 ease-out group-hover:translate-y-[360px]"
          style={{
            backgroundImage:
              "url(https://app.paper.design/file-assets/01M1C873668CZYG1N1TF5EFR38/66X4G8Q2MXMJ7TXWC8PFSEAV6Q.jpg)",
            rotate: "-14.46deg",
            translate: "86.672px 349px",
          }}
        />

        {/* Content Header */}
        <div className="h-full flex flex-col p-[17.5px] items-center relative">
          <div className="items-start flex flex-col gap-1.5 self-stretch p-2">
            <div className="flex items-start gap-1.5 self-stretch">
              <div className="flex-1 font-['Instrument_Sans',system-ui,sans-serif] text-white text-[21px] leading-[24.5px]">
                Visual Branding
              </div>
              <div className="items-center flex shrink-0 justify-center py-1.5 px-3 rounded-full gap-1.5 bg-white transition-transform group-hover:scale-105">
                <div className="inline-block text-[10.5px] leading-[150%] wrap-normal font-['Instrument_Sans',system-ui,sans-serif] font-medium text-[#000000F2]">
                  View all
                </div>
                <ArrowIcon />
              </div>
            </div>
            <div className="w-48 font-['Instrument_Sans',system-ui,sans-serif] text-[#FFFFFF8C] text-[14px] leading-5">
              Yup I do branding as well, check out all my branding works in behance
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

