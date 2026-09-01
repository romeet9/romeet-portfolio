"use client";

import * as React from "react";
import Link from "next/link";
import { LazyHalftoneDots as HalftoneDots } from "@/components/case-study/lazy-halftone-dots";

const asTitle = (s: string) => s.replace(/\s*—\s*/g, " - ");
const asSentence = (s: string) => s.replace(/\s*—\s*/g, ": ");

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

export function CaseStudyCard({
  href,
  name,
  tagline,
  mock,
  badge,
  slug,
}: {
  href: string;
  name: string;
  tagline: string;
  mock?: string;
  badge?: string;
  slug?: string;
}) {
  const isVoteIn = slug === "vote-in" || name.toLowerCase().includes("vote");

  const colorFront = isVoteIn ? "#A4AA1A" : "#6BA0FF";
  const halftoneGradient = isVoteIn
    ? "linear-gradient(in oklab 178.97deg, oklab(71% -0.057 0.140) 14.53%, oklab(40% 0 0 / 0%) 79.28%)"
    : "linear-gradient(in oklab 178.97deg, oklab(71.1% -0.023 -0.149) 14.53%, oklab(40% 0 0 / 0%) 79.28%)";

  const defaultMock = isVoteIn
    ? "https://app.paper.design/file-assets/01M1C873668CZYG1N1TF5EFR38/7GN69EPV75NRVXHCDTJFA6TDPZ.png"
    : "https://app.paper.design/file-assets/01M1C873668CZYG1N1TF5EFR38/7BY0CGXFY41QH07T7H8TVZRSFT.png";

  const phoneMock = mock || defaultMock;
  const badgeLabel = isVoteIn ? "Concept work" : (badge || "B2B Product");
  const displayTitle = isVoteIn
    ? "Vote IN"
    : (name.includes("Add case") || name.includes("Add Case")
      ? "Edge CRM - Add case"
      : asTitle(name));

  return (
    <Link
      href={href}
      className="group [font-synthesis:none] wrap-anywhere flex items-center rounded-[27px] p-1 self-stretch bg-[#232323] border border-solid border-[#383838] antialiased text-xs/4 transition-all duration-300 hover:border-white/20 hover:shadow-[0_12px_32px_rgba(0,0,0,0.6)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <div
        className="aspect-[406/516] @container [font-synthesis-small-caps:none] [font-synthesis-style:none] [font-synthesis-weight:none] w-full rounded-[22px] overflow-clip relative bg-[#131313] border border-solid border-[#FFFFFF1A]"
        style={{ containerType: "inline-size" }}
      >
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
          colorFront={colorFront}
          colorBack="#00000000"
          className="w-106 h-135 absolute left-[50%] top-[50%]"
          style={{
            backgroundImage: halftoneGradient,
            translate: "-50% -50%",
          }}
        />

        {/* Dark Vignette Radial Gradient Overlay */}
        <div
          className="w-106 h-135 absolute left-[50%] top-[50%]"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 89.815% 70.515% at 50.04% 20.47% in oklab, oklab(71.8% 0 0 / 0%) 0%, 9.42%, oklab(20.1% 0 0) 100%)",
            translate: "-50% -50%",
          }}
        />

        {/* Rotated & Bled Phone Mockup */}
        <div
          aria-hidden
          className="h-[560.123px] w-[279.186px] top-0 left-[50%] absolute filter-[brightness(85%)] bg-cover bg-position-[50%] origin-top-left transition-transform duration-500 group-hover:scale-[1.02]"
          style={{
            backgroundImage: `url(${phoneMock})`,
            rotate: "344.61deg",
            translate: isVoteIn
              ? "calc(-50% - 149.22px) -203.045px"
              : "calc(-50% - 149.217px) -203.036px",
          }}
        />

        {/* Content Overlay */}
        <div className="h-full flex flex-col justify-between p-[17.5px] relative">
          {/* Top Pill Row */}
          <div className="items-center flex justify-between py-0.5">
            <div className="items-center flex py-1.5 px-3 rounded-full gap-1.5 justify-center shrink-0 [backdrop-filter:blur(12px)] bg-[#505050] border border-solid border-[#FFFFFF33]">
              <div className="rounded-full shrink-0 [box-shadow:#B81919_0px_0px_8px] bg-[#B81919] size-1.5" />
              <div className="inline-block text-[10.5px] leading-[150%] font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-[#FFFFFFF2]">
                {badgeLabel}
              </div>
            </div>

            <div className="items-center flex shrink-0 justify-center py-1.5 px-3 rounded-full gap-1.5 bg-white transition-transform group-hover:scale-105">
              <div className="inline-block text-[10.5px] leading-[150%] font-['Instrument_Sans',system-ui,sans-serif] font-medium text-[#000000F2]">
                View case study
              </div>
              <ArrowIcon />
            </div>
          </div>

          {/* Bottom Title & Description */}
          <div className="items-start flex flex-col gap-1.5 pb-2 px-2">
            <div className="wrap-normal self-stretch font-['Instrument_Sans',system-ui,sans-serif] text-white text-[21px] leading-[24.5px]">
              {displayTitle}
            </div>
            <div className="self-stretch wrap-normal font-['Instrument_Sans',system-ui,sans-serif] text-[#FFFFFF8C] text-[14px] leading-5">
              {asSentence(tagline)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

