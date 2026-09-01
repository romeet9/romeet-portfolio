"use client";

import * as React from "react";
import Link from "next/link";
import { LazyHalftoneDots as HalftoneDots } from "@/components/case-study/lazy-halftone-dots";

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

function LiveIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      style={{ height: "16px", width: "16px", flexShrink: 0, overflow: "clip" }}
    >
      <path
        d="M3.05 3.05a7 7 0 0 0 0 9.9.5.5 0 0 1-.707.707 8 8 0 0 1 0-11.314.5.5 0 0 1 .707.707m2.122 2.122a4 4 0 0 0 0 5.656.5.5 0 1 1-.708.708 5 5 0 0 1 0-7.072.5.5 0 0 1 .708.708m5.656-.708a.5.5 0 0 1 .708 0 5 5 0 0 1 0 7.072.5.5 0 1 1-.708-.708 4 4 0 0 0 0-5.656.5.5 0 0 1 0-.708m2.122-2.12a.5.5 0 0 1 .707 0 8 8 0 0 1 0 11.313.5.5 0 0 1-.707-.707 7 7 0 0 0 0-9.9.5.5 0 0 1 0-.707zM10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0"
        fill="#000000"
      />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      style={{ height: "16px", width: "16px", flexShrink: 0, overflow: "clip" }}
    >
      <path
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function ProjectsCard() {
  return (
    <div className="group [font-synthesis:none] wrap-anywhere flex items-center rounded-[27px] p-1 self-stretch bg-[#232323] border border-solid border-[#383838] antialiased text-xs/4 transition-all duration-300 hover:border-white/20 hover:shadow-[0_12px_32px_rgba(0,0,0,0.6)]">
      <div
        className="aspect-[406/516] @container [font-synthesis-small-caps:none] [font-synthesis-style:none] [font-synthesis-weight:none] w-full rounded-[22px] overflow-clip relative bg-[#131313] border border-solid border-[#FFFFFF1A]"
        style={{ containerType: "inline-size" }}
      >
        <div
          className="w-106 h-135 absolute left-[50%] top-[50%] bg-[#484848]"
          style={{ translate: "-50% -50%" }}
        />

        {/* Halftone Shader Pink Theme */}
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
          colorFront="#E477B2"
          colorBack="#00000000"
          className="w-106 h-135 absolute left-[50%] top-[50%]"
          style={{
            backgroundImage:
              "linear-gradient(in oklab 178.97000000000003deg, oklab(71% 0.148 -0.031) 14.53%, oklab(40% 0 0 / 0%) 79.28%)",
            translate: "-50% -50%",
          }}
        />

        <div
          className="w-106 h-135 absolute left-[calc(50%+424.006px)] top-[calc(50%+539.994px)] origin-top-left"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 89.815% 70.515% at 50.03999999999999% 20.47% in oklab, oklab(71.8% 0 0 / 0%) 0%, 9.42%, oklab(20.1% 0 0) 100%)",
            rotate: "180deg",
            translate: "-50% -50%",
          }}
        />

        {/* Content Layer */}
        <div className="h-full flex flex-col p-[17.5px] items-center relative">
          {/* Header Row */}
          <div className="items-start flex flex-col gap-1.5 self-stretch p-2">
            <div className="flex items-start gap-1.5 self-stretch">
              <div className="flex-1 font-['Instrument_Sans',system-ui,sans-serif] text-white text-[21px] leading-[24.5px]">
                Projects
              </div>
              <Link
                href="/projects"
                className="items-center flex shrink-0 justify-center py-1.5 px-3 rounded-full gap-1.5 bg-white transition-transform hover:scale-105"
              >
                <div className="inline-block text-[10.5px] leading-[150%] wrap-normal font-['Instrument_Sans',system-ui,sans-serif] font-medium text-[#000000F2]">
                  View all
                </div>
                <ArrowIcon />
              </Link>
            </div>
            <div className="w-41.75 whitespace-pre-wrap font-['Instrument_Sans',system-ui,sans-serif] text-[#FFFFFF8C] text-[14px] leading-5">
              Real, shipped products{"\n"}I designed &amp; built
            </div>
          </div>

          {/* Mini-Card 1: Tasky AI */}
          <div
            className="h-[240.063px] flex flex-col w-[260px] top-0 left-0 justify-between absolute p-[17.33px] rounded-[22px] overflow-clip [box-shadow:#0000004D_0px_2px_70px] border border-solid border-[#424242] origin-top-left transition-all duration-500 group-hover:translate-x-[-12px] group-hover:translate-y-[180px] group-hover:rotate-[-8deg]"
            style={{ rotate: "-5.24deg", translate: "31.199px 166.39px" }}
          >
            <div
              className="-bottom-0.75 -top-0.75 right-0 left-0 absolute bg-cover bg-position-[50%]"
              style={{
                backgroundImage:
                  "url(https://app.paper.design/file-assets/01M1C873668CZYG1N1TF5EFR38/0BSJ8M49W81MF56N3SNA7S15C6.jpg)",
              }}
            />
            <div className="items-center self-stretch flex justify-between py-[6.93px] px-[5.2px] relative z-10">
              <a
                href="https://task-planner-seven-zeta.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="items-center flex justify-center py-[6.93px] px-[10.4px] rounded-full gap-1.5 bg-white hover:opacity-90 transition-opacity"
              >
                <LiveIcon />
                <div className="inline-block text-[10.4px] leading-[150%] wrap-normal font-['Instrument_Sans',system-ui,sans-serif] font-medium text-[#000000F2]">
                  Live Link
                </div>
              </a>
              <a
                href="https://github.com/romeet9/tasky-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="items-center flex py-[6.93px] px-[10.4px] rounded-full gap-1.5 [border-width:0.5px] border-solid border-[#FFFFFF] hover:bg-white/10 transition-colors"
              >
                <GithubIcon />
                <div className="inline-block text-[13.87px] leading-[150%] wrap-normal font-['Instrument_Sans',system-ui,sans-serif] text-white">
                  Github
                </div>
              </a>
            </div>
            <div className="items-start self-stretch flex flex-col gap-1.5 relative z-10">
              <div className="self-stretch wrap-normal font-['Instrument_Sans',system-ui,sans-serif] text-[#FFFFFF8C] text-[13.87px] leading-[15.6px]">
                Say your morning brief out loud &amp; get a structured, prioritized plan back.
              </div>
              <div className="self-stretch wrap-normal font-['Instrument_Sans',system-ui,sans-serif] text-white text-[20.8px] leading-[24.3px]">
                Tasky AI
              </div>
            </div>
          </div>

          {/* Mini-Card 2: InspoFlow */}
          <div
            className="h-[240.063px] flex flex-col w-[260px] top-0 left-0 justify-between absolute p-[17.33px] rounded-[22px] overflow-clip [box-shadow:#0000004D_0px_2px_70px] border border-solid border-[#424242] origin-top-left transition-all duration-500 group-hover:translate-x-[195px] group-hover:translate-y-[150px] group-hover:rotate-[15deg]"
            style={{ rotate: "11.94deg", translate: "175.066px 130.86px" }}
          >
            <div
              className="-bottom-0.75 -top-0.75 right-0 left-0 absolute bg-cover bg-position-[50%]"
              style={{
                backgroundImage:
                  "url(https://app.paper.design/file-assets/01M1C873668CZYG1N1TF5EFR38/5PAPM2ZEKSSJ1TWBE08YSD3S3V.jpg)",
              }}
            />
            <div className="items-center self-stretch flex justify-end py-[6.93px] px-[5.2px] relative z-10">
              <a
                href="https://github.com/romeet9/InspoFlow"
                target="_blank"
                rel="noopener noreferrer"
                className="items-center flex py-[6.93px] px-[10.4px] rounded-full gap-1.5 [border-width:0.5px] border-solid border-[#FFFFFF] hover:bg-white/10 transition-colors"
              >
                <GithubIcon />
                <div className="inline-block text-[13.87px] leading-[150%] wrap-normal font-['Instrument_Sans',system-ui,sans-serif] text-white">
                  Github
                </div>
              </a>
            </div>
            <div className="items-start self-stretch flex flex-col gap-1.5 relative z-10">
              <div className="self-stretch wrap-normal font-['Instrument_Sans',system-ui,sans-serif] text-[#FFFFFF8C] text-[13.87px] leading-[15.6px]">
                Turn a messy screenshot camera roll into a searchable inspiration library.
              </div>
              <div className="self-stretch wrap-normal font-['Instrument_Sans',system-ui,sans-serif] text-white text-[20.8px] leading-[24.3px]">
                InspoFlow
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
