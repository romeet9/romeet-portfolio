"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LazyHalftoneDots as HalftoneDots } from "@/components/case-study/lazy-halftone-dots";
import { CaseStudyNav, CaseStudyBackButton } from "./case-study-nav";

const SECTIONS = [
  { id: "hero", label: "Overview" },
  { id: "the-problem", label: "The Challenge" },
  { id: "ia-pillars", label: "Architecture" },
  { id: "agenda-system", label: "Multi-City Agenda" },
  { id: "speakers-trust", label: "Executive Proof" },
  { id: "sponsorship-matrix", label: "Sponsorship Tiers" },
  { id: "resource-funnel", label: "Resource Funnel" },
  { id: "venue-logistics", label: "Venue & Logistics" },
  { id: "metrics", label: "Impact & Outcomes" },
  { id: "ui-mockups", label: "UI Playground" },
];

function GrungeSeparator() {
  return (
    <div className="flex w-full justify-center py-4" aria-hidden>
      <div
        className="h-2.5 w-49.25 max-w-full opacity-[0.6] overflow-clip shrink-0 bg-contain bg-position-[50%] bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://app.paper.design/file-assets/01M1C873668CZYG1N1TF5EFR38/0EJYRD3PQK1KEHD7XR35H3Q555.png)",
        }}
      />
    </div>
  );
}

export function GpactsCaseStudy() {
  const [isPlaygroundOpen, setIsPlaygroundOpen] = useState(false);
  const [canvasZoom, setCanvasZoom] = useState(0.45);
  const [canvasPan, setCanvasPan] = useState({ x: 0, y: 0 });
  const [isDraggingCanvas, setIsDraggingCanvas] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isPlaygroundOpen) {
          setIsPlaygroundOpen(false);
        }
      }
    };

    let rafId: number;
    if (isPlaygroundOpen) {
      rafId = requestAnimationFrame(() => {
        document.body.style.overflow = "hidden";
      });
      window.addEventListener("keydown", handleKeyDown);
    } else {
      rafId = requestAnimationFrame(() => {
        document.body.style.overflow = "";
      });
    }
    return () => {
      cancelAnimationFrame(rafId);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPlaygroundOpen]);

  return (
    <div className="relative w-full text-white antialiased pt-20 sm:pt-24 lg:pt-28 pb-36 px-4 [font-synthesis:none]">
      {/* 1. FIXED LEFT-SIDE NAVIGATION */}
      <CaseStudyNav items={SECTIONS} />

      {/* 2. CENTER-ALIGNED MAIN READING CONTAINER (600px column) */}
      <div className="relative mx-auto w-full max-w-[600px]">
        <CaseStudyBackButton href="/case-studies" />

        <main className="wrap-anywhere items-start flex flex-col w-full gap-12 antialiased">
          {/* Header Title & Metadata */}
          <div className="flex flex-col w-full pb-6 gap-8 border-b border-b-solid border-b-[#FFFFFF33]">
            <div className="wrap-normal font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-white text-[26px]/8.5">
              Designing a high-conversion digital summit experience for India&apos;s top pharma technology leaders.
            </div>
            <div className="items-center flex flex-wrap justify-between gap-6">
              <div className="items-start flex flex-col gap-1">
                <div className="wrap-normal font-['Fira_Code',system-ui,sans-serif] text-[#FFFFFFB3] text-xs/4">
                  ROLE
                </div>
                <div className="wrap-normal font-['HelveticaNeue-Light','Helvetica_Neue',system-ui,sans-serif] font-light text-white text-sm/4.5">
                  Lead Product &amp; Web Designer
                </div>
              </div>
              <div className="items-start flex flex-col gap-1">
                <div className="wrap-normal font-['Fira_Code',system-ui,sans-serif] text-[#FFFFFFB3] text-xs/4">
                  TIMELINE
                </div>
                <div className="wrap-normal font-['HelveticaNeue-Light','Helvetica_Neue',system-ui,sans-serif] font-light text-white text-sm/4.5">
                  4 Weeks (0 to 1)
                </div>
              </div>
              <div className="items-start flex flex-col gap-1">
                <div className="wrap-normal font-['Fira_Code',system-ui,sans-serif] text-[#FFFFFFB3] text-xs/4">
                  DELIVERABLES
                </div>
                <div className="wrap-normal font-['HelveticaNeue-Light','Helvetica_Neue',system-ui,sans-serif] font-light text-white text-sm/4.5">
                  Web Experience &amp; IA
                </div>
              </div>
            </div>
          </div>

          {/* ================================================================ */}
          {/* SECTION 1: OVERVIEW / HERO (2ZN-0)                                */}
          {/* ================================================================ */}
          <section id="hero" className="items-start flex flex-col w-full scroll-mt-28 gap-7">
            <div className="flex w-full flex-col items-center rounded-2xl justify-center gap-1.5 p-1 [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
              <div className="overflow-clip h-94.5 rounded-xl self-stretch relative shrink-0 [box-shadow:#00000033_0px_0px_5px] bg-[#9A8DE9] w-full">
                <div className="left-[-0.75px] top-[-0.273px] w-full h-94.5 absolute bg-[#2B2B2B]" />
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
                  colorFront="#7553ED"
                  colorBack="#00000000"
                  className="w-166.5 h-125 absolute left-[50%] top-[50%]"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 178.97000000000003deg, oklab(56.6% 0.065 -0.210) 39.15%, oklab(40% 0 0 / 0%) 79.28%)",
                    translate: "-50% -50%",
                  }}
                />
                <div className="flex flex-col items-center justify-center py-4 left-[-0.484px] top-[29.516px] w-full absolute">
                  <div className="w-fit tracking-[-0.02em] font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-white text-2xl/7.5">
                    GPACTS Website Design
                  </div>
                </div>
                <div
                  className="h-92.5 w-131.5 top-[129.5px] left-[50%] absolute [box-shadow:#00000040_0px_25px_50px_-12px] bg-origin-border bg-cover bg-position-[50%_0%] border border-solid border-[#FFFFFF1A]"
                  style={{
                    backgroundImage:
                      "url(https://app.paper.design/file-assets/01M1C873668CZYG1N1TF5EFR38/6M4434P275787PSYFYGE0BVWG7.png)",
                    translate: "-50%",
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col items-start gap-3 self-stretch w-full">
              <div className="tracking-[-0.02em] w-full font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-white text-xl/6">
                Executive Summary
              </div>
              <div className="flex flex-col items-start gap-14 self-stretch w-full">
                <div className="flex flex-col items-start gap-3 w-full">
                  <div className="w-full font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
                    GPACTS (Global Pharma AI, Cloud &amp; Technology Summit) is India&apos;s largest congress for life sciences technology leaders.
                  </div>
                  <div className="w-full font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
                    The summit brings together CIOs, CDOs, and Chief Data Scientists from leading pharmaceutical manufacturers to discuss mission-critical AI implementations, GxP-compliant cloud architectures, and digital clinical trial pipelines.
                  </div>
                  <div className="w-full font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
                    The objective was to transform a highly complex, multi-city conference program into a frictionless, authoritative web experience that drives high-ticket enterprise sponsorships, CXO delegate registrations, and technical whitepaper downloads.
                  </div>
                </div>

                <div className="flex items-start gap-4 self-stretch h-48.5 shrink-0 w-full">
                  {/* KPI Card 1 */}
                  <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 flex-1 overflow-clip p-1 relative self-stretch [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
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
                      colorFront="#7553ED"
                      colorBack="#00000000"
                      className="w-166.5 h-125 absolute left-[50%] top-[50%]"
                      style={{
                        backgroundImage:
                          "linear-gradient(in oklab 178.97000000000003deg, oklab(71.5% 0.061 -0.124) 39.15%, oklab(40% 0 0 / 0%) 79.28%)",
                        translate: "-50% -50%",
                      }}
                    />
                    <div
                      className="aspect-square flex [font-synthesis-small-caps:none] [font-synthesis-style:none] [font-synthesis-weight:none] rounded-xl overflow-clip flex-col items-center justify-center self-stretch flex-1 px-4.5 py-5 relative bg-origin-border"
                      style={{
                        backgroundImage:
                          "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                      }}
                    >
                      <div className="items-start flex flex-col justify-between gap-1.5 flex-1 self-stretch">
                        <div className="w-fit whitespace-pre font-['Instrument_Sans',system-ui,sans-serif] text-white text-base/4.5">
                          Curated <br />Delegates
                        </div>
                        <div className="self-stretch font-['Instrument_Sans',system-ui,sans-serif] font-medium text-white text-5xl/12">
                          1200+
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* KPI Card 2 */}
                  <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 flex-1 overflow-clip p-1 relative self-stretch [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
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
                      colorFront="#7553ED"
                      colorBack="#00000000"
                      className="w-166.5 h-125 absolute left-[50%] top-[50%]"
                      style={{
                        backgroundImage:
                          "linear-gradient(in oklab 178.97000000000003deg, oklab(71.5% 0.061 -0.124) 39.15%, oklab(40% 0 0 / 0%) 79.28%)",
                        translate: "-50% -50%",
                      }}
                    />
                    <div
                      className="aspect-square flex [font-synthesis-small-caps:none] [font-synthesis-style:none] [font-synthesis-weight:none] rounded-xl overflow-clip flex-col items-center justify-center self-stretch flex-1 px-4.5 py-5 relative bg-origin-border"
                      style={{
                        backgroundImage:
                          "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                      }}
                    >
                      <div className="items-start flex flex-col justify-between gap-1.5 flex-1 self-stretch">
                        <div className="w-fit whitespace-pre font-['Instrument_Sans',system-ui,sans-serif] text-white text-base/4.5">
                          Deep dive<br />sessions
                        </div>
                        <div className="self-stretch font-['Instrument_Sans',system-ui,sans-serif] font-medium text-white text-5xl/12">
                          09
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* KPI Card 3 */}
                  <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 flex-1 overflow-clip p-1 relative self-stretch [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
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
                      colorFront="#7553ED"
                      colorBack="#00000000"
                      className="w-166.5 h-125 absolute left-[50%] top-[50%]"
                      style={{
                        backgroundImage:
                          "linear-gradient(in oklab 178.97000000000003deg, oklab(71.5% 0.061 -0.124) 39.15%, oklab(40% 0 0 / 0%) 79.28%)",
                        translate: "-50% -50%",
                      }}
                    />
                    <div
                      className="aspect-square flex [font-synthesis-small-caps:none] [font-synthesis-style:none] [font-synthesis-weight:none] rounded-xl overflow-clip flex-col items-center justify-center self-stretch flex-1 px-4.5 py-5 relative bg-origin-border"
                      style={{
                        backgroundImage:
                          "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                      }}
                    >
                      <div className="items-start flex flex-col justify-between gap-1.5 flex-1 self-stretch">
                        <div className="w-fit font-['Instrument_Sans',system-ui,sans-serif] text-white text-base/4.5">
                          Keynote CXO&apos;s
                        </div>
                        <div className="self-stretch font-['Instrument_Sans',system-ui,sans-serif] font-medium text-white text-5xl/12">
                          15+
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <GrungeSeparator />

          {/* ================================================================ */}
          {/* SECTION 2: THE CHALLENGE (30Q-0)                                 */}
          {/* ================================================================ */}
          <section id="the-problem" className="items-start flex flex-col w-full scroll-mt-28 gap-7">
            <div className="items-start flex flex-col w-full gap-3">
              <div className="wrap-normal font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-white text-xl/6.5">
                The Challenge: Enterprise Information Overload
              </div>
              <div className="font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFCC] text-base/5.5">
                B2B enterprise technology congresses are notorious for high cognitive bounce rates. When a C-level executive visits a conference website, they are faced with four simultaneous mental hurdles:
              </div>
              <div className="font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-white text-base/5.5">
                • Evaluating whether the speakers are actual peers
              </div>
              <div className="font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-white text-base/5.5">
                • Determining if the technical agenda justifies taking two days out of the boardroom
              </div>
              <div className="font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-white text-base/5.5">
                • Deciphering multi-city dates, and navigating convoluted ticket packages
              </div>
              <div className="font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-white text-base/5.5">
                • Navigating convoluted ticket packages
              </div>
              <div className="wrap-normal font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFCC] text-base/5.5">
                Our user research highlighted three primary friction points that caused dropped registrations in previous conference editions:
              </div>
            </div>

            {/* Friction Cards Row 1 */}
            <div className="flex items-start gap-4 self-stretch h-78 shrink-0 w-full">
              {/* Card 1 */}
              <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 flex-1 overflow-clip p-1 relative self-stretch [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
                <div
                  className="aspect-square flex [font-synthesis-small-caps:none] [font-synthesis-style:none] [font-synthesis-weight:none] rounded-xl overflow-clip flex-col items-center justify-center self-stretch flex-1 px-4.5 py-5 relative bg-origin-border"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                  }}
                >
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
                    colorFront="#7553ED"
                    colorBack="#00000000"
                    className="w-166.5 h-125 absolute left-[50%] top-[50%] origin-top-left"
                    style={{
                      backgroundImage:
                        "linear-gradient(in oklab 178.97000000000003deg, oklab(56.6% 0.065 -0.210) 39.15%, oklab(40% 0 0 / 0%) 79.28%)",
                      rotate: "48.49deg",
                      translate: "calc(-50% + 299.53px) calc(-50% - 165.053px)",
                    }}
                  />
                  <div
                    className="w-150.25 h-79.5 absolute left-[50%] top-[50%]"
                    style={{
                      backgroundImage:
                        "linear-gradient(in oklab 180deg, oklab(71.8% 0 0 / 0%) -122.12%, oklab(20.1% 0 0) 102.12%)",
                      translate: "-50% -50%",
                    }}
                  />
                  <div className="items-end flex flex-col justify-between gap-1.5 flex-1 self-stretch relative">
                    <div className="w-fit uppercase font-['M_PLUS_1_Code',system-ui,sans-serif] text-white text-base/4.5">
                      Bounce on Hero: 62%
                    </div>
                    <div className="flex flex-col items-start gap-4 self-stretch">
                      <div className="w-fit font-['Instrument_Sans',system-ui,sans-serif] font-medium text-white text-lg/4.5">
                        Unclear Value Density
                      </div>
                      <div className="self-stretch font-['Instrument_Sans',system-ui,sans-serif] text-[#FFFFFF99] text-base/5">
                        Conferences filled with superficial sales pitches alienate serious technical leaders. The site had to prove deep, real-world case study depth immediately.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 flex-1 overflow-clip p-1 relative self-stretch [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
                <div
                  className="aspect-square flex [font-synthesis-small-caps:none] [font-synthesis-style:none] [font-synthesis-weight:none] rounded-xl overflow-clip flex-col items-center justify-center self-stretch flex-1 px-4.5 py-5 relative bg-origin-border"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                  }}
                >
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
                    colorFront="#7553ED"
                    colorBack="#00000000"
                    className="w-166.5 h-125 absolute left-[50%] top-[50%] origin-top-left"
                    style={{
                      backgroundImage:
                        "linear-gradient(in oklab 178.97000000000003deg, oklab(56.6% 0.065 -0.210) 39.15%, oklab(40% 0 0 / 0%) 79.28%)",
                      rotate: "48.49deg",
                      translate: "calc(-50% + 299.53px) calc(-50% - 165.053px)",
                    }}
                  />
                  <div
                    className="w-150.25 h-79.5 absolute left-[50%] top-[50%]"
                    style={{
                      backgroundImage:
                        "linear-gradient(in oklab 180deg, oklab(71.8% 0 0 / 0%) -122.12%, oklab(20.1% 0 0) 102.12%)",
                      translate: "-50% -50%",
                    }}
                  />
                  <div className="items-end flex flex-col justify-between gap-1.5 flex-1 self-stretch relative">
                    <div className="w-fit uppercase font-['M_PLUS_1_Code',system-ui,sans-serif] text-white text-base/4.5">
                      Agenda Abandonment: 48%
                    </div>
                    <div className="flex flex-col items-start gap-4 self-stretch">
                      <div className="w-fit font-['Instrument_Sans',system-ui,sans-serif] font-medium text-white text-lg/4.5">
                        Multi-City Fragmentation
                      </div>
                      <div className="self-stretch font-['Instrument_Sans',system-ui,sans-serif] text-[#FFFFFF99] text-base/5">
                        Spanning Mumbai, Hyderabad, Bangalore, and Ahmedabad created schedule confusion when presented in standard endless tables.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Friction Card 3 */}
            <div className="flex items-start gap-4 self-stretch h-78 shrink-0 w-full">
              <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 flex-1 overflow-clip p-1 relative self-stretch [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
                <div
                  className="flex [font-synthesis-small-caps:none] [font-synthesis-style:none] [font-synthesis-weight:none] rounded-xl overflow-clip flex-col items-center justify-center self-stretch flex-1 px-4.5 py-5 relative bg-origin-border"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                  }}
                >
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
                    colorFront="#7553ED"
                    colorBack="#00000000"
                    className="w-166.5 h-125 absolute left-[calc(50%+0.016px)] top-[calc(50%-0.002px)]"
                    style={{
                      backgroundImage:
                        "linear-gradient(in oklab 178.97000000000003deg, oklab(56.6% 0.065 -0.210) 39.15%, oklab(40% 0 0 / 0%) 79.28%)",
                      translate: "-50% -50%",
                    }}
                  />
                  <div
                    className="w-150.25 h-79.5 absolute left-[50%] top-[50%]"
                    style={{
                      backgroundImage:
                        "linear-gradient(in oklab 180deg, oklab(71.8% 0 0 / 0%) -122.12%, oklab(20.1% 0 0) 102.12%)",
                      translate: "-50% -50%",
                    }}
                  />
                  <div className="items-end flex flex-col justify-between gap-1.5 flex-1 self-stretch relative">
                    <div className="w-fit uppercase font-['M_PLUS_1_Code',system-ui,sans-serif] text-white text-base/4.5">
                      Lead Inquiries Dropped: 35%
                    </div>
                    <div className="flex flex-col items-start gap-4 self-stretch">
                      <div className="w-fit font-['Instrument_Sans',system-ui,sans-serif] font-medium text-white text-lg/4.5">
                        Opaque Sponsorship Tiers
                      </div>
                      <div className="self-stretch font-['Instrument_Sans',system-ui,sans-serif] text-[#FFFFFF99] text-base/5">
                        Enterprise sponsors investing $20k–$50k couldn&apos;t scan ROI, stage presence, or delegate entitlement differences at a glance.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <GrungeSeparator />

          {/* ================================================================ */}
          {/* SECTION 3: THE ARCHITECTURE (31J-0)                              */}
          {/* ================================================================ */}
          <section id="ia-pillars" className="items-start flex flex-col w-full scroll-mt-28 gap-7">
            <div className="items-start flex flex-col w-full gap-3">
              <div className="wrap-normal font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-white text-xl/6.5">
                The Architecture: Structuring for Scannability &amp; Conversion
              </div>
              <div className="font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFCC] text-base/5.5">
                To eliminate cognitive drag, we re-architected the entire page around a progressive disclosure funnel.
              </div>
              <div className="font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFCC] text-base/5.5">
                Instead of dumping every session and speaker into a monolithic feed, the website is structured into three clear pillars:
              </div>
              <div className="font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFCC] text-base/5.5">
                Instead of dumping every session and speaker into a monolithic feed, the website is structured into three clear pillars: Authority Building, Interactive Multi-City Schedule Exploration, and Multi-Persona Conversion Funnels.
              </div>
            </div>

            {/* 3 Pillar Summary Cards */}
            <div className="flex items-start gap-4 self-stretch h-48.5 shrink-0 w-full">
              <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 flex-1 overflow-clip p-1 self-stretch [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
                <div
                  className="flex [font-synthesis-small-caps:none] [font-synthesis-style:none] [font-synthesis-weight:none] rounded-xl overflow-clip flex-col items-center justify-center self-stretch flex-1 px-4.5 py-5 bg-origin-border border border-solid border-[#FFFFFF1A]"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                  }}
                >
                  <div className="items-start flex flex-col justify-between gap-1.5 flex-1 self-stretch">
                    <div className="w-fit font-['Instrument_Sans',system-ui,sans-serif] font-medium text-[#A389E3] text-lg/4.5">
                      Pillar one
                    </div>
                    <div className="whitespace-pre-wrap self-stretch font-['Instrument_Sans',system-ui,sans-serif] text-[#FFFFFF80] text-base/4.5">
                      Interactive<br />Multi-City Schedule Exploration
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 flex-1 overflow-clip p-1 self-stretch [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
                <div
                  className="aspect-square flex [font-synthesis-small-caps:none] [font-synthesis-style:none] [font-synthesis-weight:none] rounded-xl overflow-clip flex-col items-center justify-center self-stretch flex-1 px-4.5 py-5 bg-origin-border border border-solid border-[#FFFFFF1A]"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                  }}
                >
                  <div className="items-start flex flex-col justify-between gap-1.5 flex-1 self-stretch">
                    <div className="w-fit font-['Instrument_Sans',system-ui,sans-serif] font-medium text-[#A389E3] text-lg/4.5">
                      Pillar two
                    </div>
                    <div className="w-fit whitespace-pre font-['Instrument_Sans',system-ui,sans-serif] text-[#FFFFFF80] text-base/4.5">
                      Authority <br />Building
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 flex-1 overflow-clip p-1 self-stretch [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
                <div
                  className="flex [font-synthesis-small-caps:none] [font-synthesis-style:none] [font-synthesis-weight:none] rounded-xl overflow-clip flex-col items-center justify-center self-stretch flex-1 px-4.5 py-5 bg-origin-border border border-solid border-[#FFFFFF1A]"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                  }}
                >
                  <div className="items-start flex flex-col justify-between gap-1.5 flex-1 self-stretch">
                    <div className="w-fit font-['Instrument_Sans',system-ui,sans-serif] font-medium text-[#A389E3] text-lg/4.5">
                      Pillar three
                    </div>
                    <div className="self-stretch font-['Instrument_Sans',system-ui,sans-serif] text-[#FFFFFF80] text-base/4.5">
                      Multi-Persona Conversion Funnels
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote Callout */}
            <div
              className="items-start self-stretch flex flex-col w-full p-4 gap-3 bg-origin-border [border-left-width:3px] border-l-solid border-l-[#6597F1]"
              style={{
                backgroundImage:
                  "linear-gradient(in oklab 90deg, oklab(100% 0 0 / 10%) 0.74%, oklab(80% 0 0 / 0%) 100%)",
              }}
            >
              <div className="text-[16px] leading-[162.5%] wrap-normal font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-white">
                “Every single section answers one executive question before they ask it: Why should I care? Who else is in the room? What tangible frameworks will my engineering team take back?”
              </div>
            </div>

            {/* Detailed Cards Row 1 */}
            <div className="flex items-start gap-4 self-stretch h-72.75 shrink-0 w-full">
              <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 flex-1 overflow-clip p-1 relative self-stretch [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
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
                  colorFront="#7553ED"
                  colorBack="#00000000"
                  className="w-166.5 h-125 absolute left-[50%] top-[50%]"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 178.97000000000003deg, oklab(71.5% 0.061 -0.124) 39.15%, oklab(40% 0 0 / 0%) 79.28%)",
                    translate: "-50% -50%",
                  }}
                />
                <div
                  className="aspect-square flex [font-synthesis-small-caps:none] [font-synthesis-style:none] [font-synthesis-weight:none] rounded-xl overflow-clip flex-col items-center justify-center self-stretch flex-1 px-4.5 py-5 relative bg-origin-border"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                  }}
                >
                  <div className="items-end flex flex-col justify-between gap-1.5 flex-1 self-stretch">
                    <div className="w-fit uppercase font-['M_PLUS_1_Code',system-ui,sans-serif] text-white text-base/4.5">
                      Focus: CXO Trust
                    </div>
                    <div className="flex flex-col items-start gap-4 self-stretch">
                      <div className="w-fit font-['Instrument_Sans',system-ui,sans-serif] font-medium text-white text-lg/4.5">
                        Instant Authority
                      </div>
                      <div className="self-stretch font-['Instrument_Sans',system-ui,sans-serif] text-[#FFFFFF99] text-base/5">
                        Hero value lockup, validated delegate counts, and high-contrast monochrome speaker cards establish peer credibility within 3 seconds.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 flex-1 overflow-clip p-1 relative self-stretch [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
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
                  colorFront="#7553ED"
                  colorBack="#00000000"
                  className="w-166.5 h-125 absolute left-[50%] top-[50%]"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 178.97000000000003deg, oklab(71.5% 0.061 -0.124) 39.15%, oklab(40% 0 0 / 0%) 79.28%)",
                    translate: "-50% -50%",
                  }}
                />
                <div
                  className="aspect-square flex [font-synthesis-small-caps:none] [font-synthesis-style:none] [font-synthesis-weight:none] rounded-xl overflow-clip flex-col items-center justify-center self-stretch flex-1 px-4.5 py-5 relative bg-origin-border"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                  }}
                >
                  <div className="items-end flex flex-col justify-between gap-1.5 flex-1 self-stretch">
                    <div className="w-fit uppercase font-['M_PLUS_1_Code',system-ui,sans-serif] text-white text-base/4.5">
                      Focus: Cognitive Ease
                    </div>
                    <div className="flex flex-col items-start gap-4 self-stretch">
                      <div className="w-fit font-['Instrument_Sans',system-ui,sans-serif] font-medium text-white text-lg/4.5">
                        Chunked Agenda
                      </div>
                      <div className="self-stretch font-['Instrument_Sans',system-ui,sans-serif] text-[#FFFFFF99] text-base/5">
                        City tabs with 3D landmark icons (Gateway of India, Charminar, etc.) allow users to isolate their exact city and parallel technical track in one tap.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Cards Row 2 */}
            <div className="flex items-start gap-4 self-stretch h-72.75 shrink-0 w-full">
              <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 flex-1 overflow-clip p-1 relative self-stretch [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
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
                  colorFront="#7553ED"
                  colorBack="#00000000"
                  className="w-166.5 h-125 absolute left-[50%] top-[50%]"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 178.97000000000003deg, oklab(71.5% 0.061 -0.124) 39.15%, oklab(40% 0 0 / 0%) 79.28%)",
                    translate: "-50% -50%",
                  }}
                />
                <div
                  className="flex [font-synthesis-small-caps:none] [font-synthesis-style:none] [font-synthesis-weight:none] rounded-xl overflow-clip flex-col items-center justify-center self-stretch flex-1 px-4.5 py-5 relative bg-origin-border"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                  }}
                >
                  <div className="items-end flex flex-col justify-between gap-1.5 flex-1 self-stretch">
                    <div className="w-fit uppercase font-['M_PLUS_1_Code',system-ui,sans-serif] text-white text-base/4.5">
                      Focus: Conversion
                    </div>
                    <div className="flex flex-col items-start gap-4 self-stretch">
                      <div className="w-fit font-['Instrument_Sans',system-ui,sans-serif] font-medium text-white text-lg/4.5">
                        Multi-Tier Funnel
                      </div>
                      <div className="self-stretch font-['Instrument_Sans',system-ui,sans-serif] text-[#FFFFFF99] text-base/5">
                        Distinct paths for Sponsors (Tier comparison), CXO Delegates (Direct Register), and Research Evaluators (Download Playbook).
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <GrungeSeparator />

          {/* ================================================================ */}
          {/* SECTION 4: MULTI-CITY AGENDA (32D-0)                             */}
          {/* ================================================================ */}
          <section id="agenda-system" className="items-start flex flex-col w-full scroll-mt-28 gap-7">
            <div className="items-start flex flex-col w-full gap-3">
              <div className="wrap-normal font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-white text-xl/6.5">
                Multi-City Agenda: Solving Complex Scheduling Overwhelm
              </div>
              <div className="wrap-normal font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFCC] text-base/5.5">
                The congress is hosted across four major Indian pharmaceutical hubs: Mumbai, Hyderabad, Bangalore, and Ahmedabad. Each hub runs three simultaneous tracks: AI &amp; Intelligent Automation, Cloud &amp; GxP Infrastructure, and Clinical Data Science.
              </div>
              <div className="wrap-normal font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFCC] text-base/5.5">
                Instead of a standard dropdown or separate web pages, we designed an interactive city hub switch with 3D architectural landmarks that immediately updates parallel timeline tracks without page reloads.
              </div>
            </div>

            <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 self-stretch overflow-clip [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F] w-full">
              <div
                className="[container-name:card] @container flex flex-col pt-3 rounded-[14px] overflow-clip gap-3 relative self-stretch [box-shadow:#FAFAFA1A_0px_0px_0px_1px,#0000000D_0px_1px_2px] bg-[#171717] w-full"
                style={{
                  backgroundImage:
                    "linear-gradient(in oklab 0deg, oklab(92.2% 0 0 / 5%) 0%, oklab(20.5% 0 0) 100%)",
                }}
              >
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
                  colorFront="#7553ED"
                  colorBack="#00000000"
                  className="w-166.5 h-125 absolute left-[50%] top-[50%]"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 178.97000000000003deg, oklab(71.5% 0.061 -0.124) 39.15%, oklab(40% 0 0 / 0%) 79.28%)",
                    translate: "-50% -50%",
                  }}
                />
                <div
                  className="w-150.25 h-79.5 absolute left-[50%] top-[calc(50%+97px)]"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 180deg, oklab(71.8% 0 0 / 0%) -122.12%, oklab(20.1% 0 0) 102.12%)",
                    translate: "-50% -50%",
                  }}
                />
                <div className="items-start [container-name:card-header] @container grid auto-rows-min grid-rows-[auto_auto] px-3 rounded-tl-[14px] rounded-tr-[14px] gap-1 relative">
                  <div className="text-[14px] leading-[142.857%] uppercase font-['M_PLUS_Code_Latin','M_PLUS_1_Code',system-ui,sans-serif] text-white">
                    3d Landmarks
                  </div>
                  <div className="text-[14px] leading-[137.5%] font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-[#FAFAFA]">
                    Multi-city Agenda
                  </div>
                </div>
                <div className="items-center flex p-3 rounded-br-[14px] rounded-bl-[14px] relative bg-[#191919] border-t border-t-solid border-t-[#FFFFFF1A]">
                  <div className="flex text-[12px] leading-[133.333%] font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#A1A1A1]">
                    3D Landmark Hub Tabs: Distinct regional visual anchors make location selection tangible and fast.
                  </div>
                </div>
              </div>

              <div
                className="flex [font-synthesis-small-caps:none] [font-synthesis-style:none] [font-synthesis-weight:none] rounded-xl items-start justify-center self-stretch px-22.75 py-5 h-74.75 overflow-clip gap-8 relative shrink-0 bg-origin-border border border-solid border-[#FFFFFF1A] w-full"
                style={{
                  backgroundImage:
                    "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                }}
              >
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
                  colorFront="#343434"
                  colorBack="#00000000"
                  className="w-166.5 h-125 absolute left-[50%] top-[50%]"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 178.97000000000003deg, oklab(0% 0 0) 41.45%, oklab(40% 0 0 / 0%) 79.28%)",
                    translate: "-50% -50%",
                  }}
                />
                <div
                  className="w-150.25 h-79.5 absolute left-[50%] top-[50%]"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 180deg, oklab(71.8% 0 0 / 0%) -122.12%, oklab(20.1% 0 0) 102.12%)",
                    translate: "-50% -50%",
                  }}
                />
                <div className="flex items-end w-135.25 relative shrink-0 self-stretch">
                  <div
                    className="h-174.25 w-168.75 shrink-0 [box-shadow:#00000040_0px_25px_50px_-12px] bg-origin-border bg-cover bg-position-[50%_0%] border border-solid border-[#FFFFFF1A]"
                    style={{
                      backgroundImage:
                        "url(https://app.paper.design/file-assets/01M1C873668CZYG1N1TF5EFR38/01M1EN2N72BZK9EYAD0EBVYQFY.png)",
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          <GrungeSeparator />

          {/* ================================================================ */}
          {/* SECTION 5: EXECUTIVE PROOF (333-0)                               */}
          {/* ================================================================ */}
          <section id="speakers-trust" className="items-start flex flex-col w-full scroll-mt-28 gap-7">
            <div className="items-start flex flex-col w-full gap-3">
              <div className="wrap-normal font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-white text-xl/6.5">
                Executive Social Proof: High-Contrast Speaker System
              </div>
              <div className="wrap-normal font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFCC] text-base/5.5">
                In high-ticket enterprise summits, delegates do not buy tickets for generic topics; they buy access to the peer network in the room. We designed a high-contrast, editorial speaker roster with monochrome photography that communicates gravitas and executive focus.
              </div>
            </div>

            <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 self-stretch overflow-clip [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F] w-full">
              <div
                className="[container-name:card] @container flex flex-col pt-3 rounded-[14px] overflow-clip gap-3 relative self-stretch [box-shadow:#FAFAFA1A_0px_0px_0px_1px,#0000000D_0px_1px_2px] bg-[#171717] w-full"
                style={{
                  backgroundImage:
                    "linear-gradient(in oklab 0deg, oklab(92.2% 0 0 / 5%) 0%, oklab(20.5% 0 0) 100%)",
                }}
              >
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
                  colorFront="#7553ED"
                  colorBack="#00000000"
                  className="w-166.5 h-125 absolute left-[50%] top-[50%]"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 178.97000000000003deg, oklab(71.5% 0.061 -0.124) 39.15%, oklab(40% 0 0 / 0%) 79.28%)",
                    translate: "-50% -50%",
                  }}
                />
                <div
                  className="w-150.25 h-79.5 absolute left-[50%] top-[calc(50%+97px)]"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 180deg, oklab(71.8% 0 0 / 0%) -122.12%, oklab(20.1% 0 0) 102.12%)",
                    translate: "-50% -50%",
                  }}
                />
                <div className="items-start [container-name:card-header] @container grid auto-rows-min grid-rows-[auto_auto] px-3 rounded-tl-[14px] rounded-tr-[14px] gap-1 relative">
                  <div className="text-[14px] leading-[142.857%] uppercase font-['M_PLUS_Code_Latin','M_PLUS_1_Code',system-ui,sans-serif] text-white">
                    Keynote speakers
                  </div>
                  <div className="text-[14px] leading-[137.5%] font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-[#FAFAFA]">
                    Horizontal Carousel
                  </div>
                </div>
                <div className="items-center flex p-3 rounded-br-[14px] rounded-bl-[14px] relative bg-[#191919] border-t border-t-solid border-t-[#FFFFFF1A]">
                  <div className="flex text-[12px] leading-[133.333%] font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#A1A1A1]">
                    Uniform Monochrome Portraits: Removes disparate lighting and creates a unified executive aesthetic.
                  </div>
                </div>
              </div>

              <div
                className="flex [font-synthesis-small-caps:none] [font-synthesis-style:none] [font-synthesis-weight:none] rounded-xl items-start justify-center self-stretch px-22.75 py-5 h-74.75 overflow-clip gap-8 relative shrink-0 bg-origin-border border border-solid border-[#FFFFFF1A] w-full"
                style={{
                  backgroundImage:
                    "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                }}
              >
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
                  colorFront="#343434"
                  colorBack="#00000000"
                  className="w-166.5 h-125 absolute left-[50%] top-[50%]"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 178.97000000000003deg, oklab(0% 0 0) 41.45%, oklab(40% 0 0 / 0%) 79.28%)",
                    translate: "-50% -50%",
                  }}
                />
                <div
                  className="w-150.25 h-79.5 absolute left-[50%] top-[50%]"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 180deg, oklab(71.8% 0 0 / 0%) -122.12%, oklab(20.1% 0 0) 102.12%)",
                    translate: "-50% -50%",
                  }}
                />
                <div className="flex items-end w-135.25 justify-end relative shrink-0 self-stretch">
                  <div
                    className="h-106.25 w-160 shrink-0 [box-shadow:#00000040_0px_25px_50px_-12px] bg-origin-border bg-cover bg-position-[50%_0%] border border-solid border-[#FFFFFF1A]"
                    style={{
                      backgroundImage:
                        "url(https://app.paper.design/file-assets/01M1C873668CZYG1N1TF5EFR38/01M1ENDZTV402AMZX0RRR8W6QK.png)",
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          <GrungeSeparator />

          {/* ================================================================ */}
          {/* SECTION 6: SPONSORSHIP TIERS (33S-0)                             */}
          {/* ================================================================ */}
          <section id="sponsorship-matrix" className="items-start flex flex-col w-full scroll-mt-28 gap-7">
            <div className="items-start flex flex-col w-full gap-3">
              <div className="wrap-normal font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-white text-xl/6.5">
                Sponsorship Architecture: Differentiating ROI &amp; Tiers
              </div>
              <div className="wrap-normal font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFCC] text-base/5.5">
                For enterprise sponsors (cloud hyperscalers, AI vendors, GxP software providers), pricing transparency is balanced with prestige. We designed a 3-tier Bento card comparison that visually prioritizes the flagship tier while giving clear entitlement breakdowns for each level.
              </div>
            </div>

            <div className="flex w-full flex-col items-center rounded-2xl justify-center gap-1.5 p-1 [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
              <div className="overflow-clip h-94.5 rounded-xl self-stretch relative shrink-0 [box-shadow:#00000033_0px_0px_5px] bg-[#9A8DE9] w-full">
                <div className="left-[-0.75px] top-[-0.273px] w-full h-94.5 absolute bg-[#2B2B2B]" />
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
                  colorFront="#7553ED"
                  colorBack="#00000000"
                  className="w-166.5 h-125 absolute left-[50%] top-[50%]"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 178.97000000000003deg, oklab(56.6% 0.065 -0.210) 39.15%, oklab(40% 0 0 / 0%) 79.28%)",
                    translate: "-50% -50%",
                  }}
                />
                <div className="flex flex-col items-center justify-center py-4 left-[-0.484px] top-[29.516px] w-full absolute">
                  <div className="w-fit tracking-[-0.02em] font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-white text-2xl/7.5">
                    Sponsorship Packages
                  </div>
                </div>
                <div
                  className="h-146.5 w-183.25 top-[-272.5px] left-[calc(50%-151.5px)] absolute [box-shadow:#00000040_0px_25px_50px_-12px] bg-origin-border bg-cover bg-position-[50%_0%] border border-solid border-[#FFFFFF1A]"
                  style={{
                    backgroundImage:
                      "url(https://app.paper.design/file-assets/01M1C873668CZYG1N1TF5EFR38/01M1EK917B7NT7QA97B6WXJ24Q.png)",
                    translate: "-50%",
                  }}
                />
              </div>
            </div>
          </section>

          <GrungeSeparator />

          {/* ================================================================ */}
          {/* SECTION 7: RESOURCE FUNNEL (35T-0)                               */}
          {/* ================================================================ */}
          <section id="resource-funnel" className="items-start flex flex-col w-full scroll-mt-28 gap-7">
            <div className="items-start flex flex-col w-full gap-3">
              <div className="wrap-normal font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-white text-xl/6.5">
                Lead Capture: High-Intent Collateral &amp; Whitepaper Funnels
              </div>
              <div className="wrap-normal font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFCC] text-base/5.5">
                Not all visitors are ready to buy a delegate pass on their first visit. We designed secondary lead magnets (Event Brochure, Sponsorship Deck, and the AI in Pharma Whitepaper) to capture qualified enterprise contacts and nurture them into attendees.
              </div>
            </div>

            <div className="flex w-full flex-col items-center rounded-2xl justify-center gap-1.5 p-1 [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
              <div className="overflow-clip h-94.5 rounded-xl self-stretch relative shrink-0 [box-shadow:#00000033_0px_0px_5px] bg-[#9A8DE9] w-full">
                <div className="left-[-0.75px] top-[-0.273px] w-full h-94.5 absolute bg-[#2B2B2B]" />
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
                  colorFront="#7553ED"
                  colorBack="#00000000"
                  className="w-166.5 h-125 absolute left-[50%] top-[50%]"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 178.97000000000003deg, oklab(56.6% 0.065 -0.210) 39.15%, oklab(40% 0 0 / 0%) 79.28%)",
                    translate: "-50% -50%",
                  }}
                />
                <div className="flex flex-col items-center justify-center py-4 left-[-0.484px] top-[29.516px] w-full absolute">
                  <div className="w-fit tracking-[-0.02em] font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-white text-2xl/7.5">
                    Download Collateral
                  </div>
                </div>
                <div
                  className="h-128.75 w-177.5 top-[-182.5px] left-[calc(50%+110px)] absolute [box-shadow:#00000040_0px_25px_50px_-12px] bg-origin-border bg-cover bg-position-[50%_0%] border border-solid border-[#FFFFFF1A]"
                  style={{
                    backgroundImage:
                      "url(https://app.paper.design/file-assets/01M1C873668CZYG1N1TF5EFR38/01M1EJR1R208ZS0GNBCC6D2DQH.png)",
                    translate: "-50%",
                  }}
                />
              </div>
            </div>

            {/* Collateral Breakdown Row 1 */}
            <div className="flex items-start gap-4 self-stretch h-72.75 shrink-0 w-full">
              <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 flex-1 overflow-clip p-1 relative self-stretch [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
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
                  colorFront="#7553ED"
                  colorBack="#00000000"
                  className="w-166.5 h-125 absolute left-[50%] top-[50%]"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 178.97000000000003deg, oklab(71.5% 0.061 -0.124) 39.15%, oklab(40% 0 0 / 0%) 79.28%)",
                    translate: "-50% -50%",
                  }}
                />
                <div
                  className="aspect-square flex [font-synthesis-small-caps:none] [font-synthesis-style:none] [font-synthesis-weight:none] rounded-xl overflow-clip flex-col items-center justify-center self-stretch flex-1 px-4.5 py-5 relative bg-origin-border"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                  }}
                >
                  <div className="items-end flex flex-col justify-between gap-1.5 flex-1 self-stretch">
                    <div className="w-fit uppercase font-['M_PLUS_1_Code',system-ui,sans-serif] text-white text-base/4.5">
                      PDF Document
                    </div>
                    <div className="flex flex-col items-start gap-4 self-stretch">
                      <div className="w-fit font-['Instrument_Sans',system-ui,sans-serif] font-medium text-white text-lg/4.5">
                        Event Brochure
                      </div>
                      <div className="self-stretch font-['Instrument_Sans',system-ui,sans-serif] text-[#FFFFFF99] text-base/5">
                        Complete overview of the summit dates, keynote speakers, and session schedule.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 flex-1 overflow-clip p-1 relative self-stretch [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
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
                  colorFront="#7553ED"
                  colorBack="#00000000"
                  className="w-166.5 h-125 absolute left-[50%] top-[50%]"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 178.97000000000003deg, oklab(71.5% 0.061 -0.124) 39.15%, oklab(40% 0 0 / 0%) 79.28%)",
                    translate: "-50% -50%",
                  }}
                />
                <div
                  className="aspect-square flex [font-synthesis-small-caps:none] [font-synthesis-style:none] [font-synthesis-weight:none] rounded-xl overflow-clip flex-col items-center justify-center self-stretch flex-1 px-4.5 py-5 relative bg-origin-border"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                  }}
                >
                  <div className="items-end flex flex-col justify-between gap-1.5 flex-1 self-stretch">
                    <div className="w-fit uppercase font-['M_PLUS_1_Code',system-ui,sans-serif] text-white text-base/4.5">
                      Partner Kit
                    </div>
                    <div className="flex flex-col items-start gap-4 self-stretch">
                      <div className="w-fit font-['Instrument_Sans',system-ui,sans-serif] font-medium text-white text-lg/4.5">
                        Sponsorship Deck
                      </div>
                      <div className="self-stretch font-['Instrument_Sans',system-ui,sans-serif] text-[#FFFFFF99] text-base/5">
                        Partnership opportunities, booth dimensions, stage time slots, and pricing.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Collateral Breakdown Row 2 */}
            <div className="flex items-start gap-4 self-stretch h-72.75 shrink-0 w-full">
              <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 flex-1 overflow-clip p-1 relative self-stretch [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
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
                  colorFront="#7553ED"
                  colorBack="#00000000"
                  className="w-166.5 h-125 absolute left-[50%] top-[50%]"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 178.97000000000003deg, oklab(71.5% 0.061 -0.124) 39.15%, oklab(40% 0 0 / 0%) 79.28%)",
                    translate: "-50% -50%",
                  }}
                />
                <div
                  className="flex [font-synthesis-small-caps:none] [font-synthesis-style:none] [font-synthesis-weight:none] rounded-xl overflow-clip flex-col items-center justify-center self-stretch flex-1 px-4.5 py-5 relative bg-origin-border"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                  }}
                >
                  <div className="items-end flex flex-col justify-between gap-1.5 flex-1 self-stretch">
                    <div className="w-fit uppercase font-['M_PLUS_1_Code',system-ui,sans-serif] text-white text-base/4.5">
                      Research Report
                    </div>
                    <div className="flex flex-col items-start gap-4 self-stretch">
                      <div className="w-fit font-['Instrument_Sans',system-ui,sans-serif] font-medium text-white text-lg/4.5">
                        AI in Pharma 2026
                      </div>
                      <div className="self-stretch font-['Instrument_Sans',system-ui,sans-serif] text-[#FFFFFF99] text-base/5">
                        State of AI adoption in Indian pharma: drug discovery to regulatory compliance.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <GrungeSeparator />

          {/* ================================================================ */}
          {/* SECTION 8: LOGISTICS & FAQ (36L-0)                               */}
          {/* ================================================================ */}
          <section id="venue-logistics" className="items-start flex flex-col w-full scroll-mt-28 gap-7">
            <div className="items-start flex flex-col w-full gap-3">
              <div className="wrap-normal font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-white text-xl/6.5">
                Logistics &amp; FAQ: Eliminating Last-Mile Friction
              </div>
              <div className="wrap-normal font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFCC] text-base/5.5">
                For interstate CXO travelers, hotel proximity to international airport terminals and clear venue navigation are major booking considerations. We integrated direct distance indicators (~4km, 15 min drive from BOM Airport to The Leela Mumbai) and an interactive FAQ accordion to answer common procurement questions.
              </div>
            </div>

            <div className="flex w-full flex-col items-center rounded-2xl justify-center gap-1.5 p-1 [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
              <div className="overflow-clip h-94.5 rounded-xl self-stretch relative shrink-0 [box-shadow:#00000033_0px_0px_5px] bg-[#9A8DE9] w-full">
                <div className="left-[-0.75px] top-[-0.273px] w-full h-94.5 absolute bg-[#2B2B2B]" />
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
                  colorFront="#7553ED"
                  colorBack="#00000000"
                  className="w-166.5 h-125 absolute left-[50%] top-[50%]"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 178.97000000000003deg, oklab(56.6% 0.065 -0.210) 39.15%, oklab(40% 0 0 / 0%) 79.28%)",
                    translate: "-50% -50%",
                  }}
                />
                <div
                  className="w-118.5 h-87.25 absolute left-[62.5px] top-[-15.5px] bg-cover bg-position-[50%]"
                  style={{
                    backgroundImage:
                      "url(https://app.paper.design/file-assets/01M1C873668CZYG1N1TF5EFR38/01M1EK1FDBS7W9TGPT6R6W5RZR.png)",
                  }}
                />
              </div>
            </div>
          </section>

          <GrungeSeparator />

          {/* ================================================================ */}
          {/* SECTION 9: IMPACT & OUTCOMES (596-0)                              */}
          {/* ================================================================ */}
          <section id="metrics" className="flex flex-col items-start gap-9 self-stretch w-full scroll-mt-28">
            <div className="flex items-center gap-3 self-stretch">
              <div className="tracking-[-0.02em] font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-white text-xl/6">
                Impact &amp; Measurable Outcomes
              </div>
            </div>

            <div className="flex flex-col items-start gap-15 w-full">
              <div className="flex flex-col items-start gap-5 w-full">
                <div className="flex flex-col items-start gap-6 w-full">
                  <div className="w-full font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
                    The new website architecture transformed the event&apos;s digital funnel. By decoupling the multi-city agenda into interactive city hubs, highlighting executive social proof, and clarifying sponsorship tiers, GPACTS achieved record conversion rates across all registration funnels.
                  </div>

                  <div className="flex items-start gap-4 self-stretch h-73.5 shrink-0 w-full">
                    {/* Stat Card 1 */}
                    <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 flex-1 self-stretch [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
                      <div
                        className="flex [font-synthesis-small-caps:none] [font-synthesis-style:none] [font-synthesis-weight:none] rounded-xl overflow-clip flex-col items-center justify-center self-stretch flex-1 px-4.5 py-5 aspect-square bg-origin-border [border-width:0.5px] border-solid border-[#FFFFFF1A]"
                        style={{
                          backgroundImage:
                            "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                        }}
                      >
                        <div className="items-start flex flex-col justify-between gap-1.5 flex-1 self-stretch">
                          <div className="flex items-center gap-2 justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              style={{
                                rotate: "270deg",
                                flexShrink: "0",
                                transformOrigin: "50% 50%",
                              }}
                            >
                              <path
                                d="M5 12h14"
                                fill="none"
                                stroke="oklch(76.5% 0.177 163.2)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="m12 5 7 7-7 7"
                                fill="none"
                                stroke="oklch(76.5% 0.177 163.2)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="tracking-[-0.02em] w-fit shrink-0 font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-white text-[50px]/15">
                              +54%
                            </div>
                          </div>
                          <div className="flex flex-col items-start gap-3 self-stretch">
                            <div className="self-stretch font-['Instrument_Sans',system-ui,sans-serif] text-[#747474] text-sm/5">
                              Increase in early bird delegate registrations compared to previous single-page format.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stat Card 2 */}
                    <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 flex-1 self-stretch [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
                      <div
                        className="flex [font-synthesis-small-caps:none] [font-synthesis-style:none] [font-synthesis-weight:none] rounded-xl overflow-clip flex-col items-center justify-center self-stretch flex-1 px-4.5 py-5 aspect-square bg-origin-border [border-width:0.5px] border-solid border-[#FFFFFF1A]"
                        style={{
                          backgroundImage:
                            "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                        }}
                      >
                        <div className="items-start flex flex-col justify-between gap-1.5 flex-1 self-stretch">
                          <div className="flex items-center gap-2 justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              style={{
                                rotate: "270deg",
                                flexShrink: "0",
                                transformOrigin: "50% 50%",
                              }}
                            >
                              <path
                                d="M5 12h14"
                                fill="none"
                                stroke="oklch(76.5% 0.177 163.2)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="m12 5 7 7-7 7"
                                fill="none"
                                stroke="oklch(76.5% 0.177 163.2)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="tracking-[-0.02em] w-fit shrink-0 font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-white text-[50px]/15">
                              3.2x
                            </div>
                          </div>
                          <div className="flex flex-col items-start gap-3 self-stretch">
                            <div className="self-stretch font-['Instrument_Sans',system-ui,sans-serif] text-[#747474] text-sm/5">
                              Growth in qualified sponsorship deck downloads and partner inquiries within the first 14 days.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <GrungeSeparator />

          {/* ================================================================ */}
          {/* SECTION 10: UI PLAYGROUND & CANVAS (37U-0)                       */}
          {/* ================================================================ */}
          <section id="ui-mockups" className="items-start self-stretch flex flex-col w-full scroll-mt-28 gap-9">
            <div className="items-center self-stretch flex gap-3">
              <div className="text-[20px] [letter-spacing:-0.4px] leading-[140%] wrap-normal font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-white">
                UI Mockups &amp; Full Canvas
              </div>
            </div>

            <div className="items-center h-149.5 flex flex-col shrink-0 w-full justify-center max-w-149.5 p-1 rounded-2xl gap-1.5 [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
              <div
                className="self-stretch aspect-square basis-[0%] grow rounded-[14px] overflow-clip relative bg-origin-border [border-width:0.5px] border-solid border-[#FFFFFF1A] size-full"
                style={{
                  backgroundImage:
                    "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                }}
              >
                <div
                  className="h-125 w-130 top-10 left-[50%] opacity-[0.8] rounded-[14px] absolute [box-shadow:#00000040_0px_25px_50px_-12px] bg-origin-border bg-cover bg-position-[50%_0%] border border-solid border-[#FFFFFF1A]"
                  style={{
                    backgroundImage:
                      "url(https://app.paper.design/file-assets/01M1C873668CZYG1N1TF5EFR38/334GAQXHTR15HFPF6DARFQ0RET.png)",
                    translate: "-50%",
                  }}
                />

                <button
                  type="button"
                  onClick={() => {
                    setIsPlaygroundOpen(true);
                    setCanvasZoom(0.45);
                    setCanvasPan({ x: 0, y: 0 });
                  }}
                  className="items-center flex flex-col top-[50%] left-[50%] justify-center p-1 rounded-2xl gap-1.5 absolute [box-shadow:#000000B3_0px_20px_40px] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F] cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200 z-10"
                  style={{ translate: "-50% -50%" }}
                >
                  <div
                    className="items-center flex flex-col justify-center py-3 px-5 rounded-[14px] overflow-clip bg-origin-border [border-width:0.5px] border-solid border-[#FFFFFF1A]"
                    style={{
                      backgroundImage:
                        "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                    }}
                  >
                    <div className="items-center flex w-fit gap-2">
                      <div className="text-[16px] text-center leading-[150%] wrap-normal font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium flex justify-center flex-wrap text-white">
                        Open Canvas Playground
                      </div>
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fontSize="16px"
                        fontWeight="500"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                          height: "15px",
                          width: "15px",
                          overflow: "clip",
                          flexShrink: "0",
                        }}
                      >
                        <path
                          d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                          fontSize="16px"
                          fontWeight="500"
                          fill="none"
                          stroke="#FFFFFF"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ boxSizing: "border-box", transformOrigin: "0px 0px" }}
                        />
                        <polyline
                          points="15 3 21 3 21 9"
                          fontSize="16px"
                          fontWeight="500"
                          fill="none"
                          stroke="#FFFFFF"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ boxSizing: "border-box", transformOrigin: "0px 0px" }}
                        />
                        <line
                          x1="10"
                          y1="14"
                          x2="21"
                          y2="3"
                          fontSize="16px"
                          fontWeight="500"
                          stroke="#FFFFFF"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ boxSizing: "border-box", transformOrigin: "0px 0px" }}
                        />
                      </svg>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Interactive Fullscreen Canvas Modal */}
      <AnimatePresence>
        {isPlaygroundOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 select-none"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsPlaygroundOpen(false);
            }}
          >
            {/* Modal Container */}
            <div className="relative w-full max-w-[1300px] h-[90vh] max-h-[960px] rounded-3xl overflow-hidden bg-[#161616] border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.9)] flex flex-col">
              {/* Top Header Bar */}
              <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#242424]/90 border border-white/10 backdrop-blur-md text-xs text-neutral-300 pointer-events-auto shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-medium text-white">GPACTS Homescreen Canvas</span>
                  <span className="text-neutral-500">|</span>
                  <span className="text-neutral-400">Drag to pan · Scroll to zoom</span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsPlaygroundOpen(false)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#242424]/90 border border-white/10 hover:bg-[#333333] hover:border-white/20 text-white text-xs font-medium backdrop-blur-md cursor-pointer transition-all duration-200 pointer-events-auto shadow-lg"
                >
                  <span>Close</span>
                  <span className="text-[10px] text-neutral-400 bg-white/10 px-1.5 py-0.5 rounded font-mono">
                    Esc
                  </span>
                </button>
              </div>

              {/* Pannable & Zoomable Viewport */}
              <div
                className={`relative w-full flex-1 overflow-hidden ${isDraggingCanvas ? "cursor-grabbing" : "cursor-grab"}`}
                onPointerDown={(e) => {
                  setIsDraggingCanvas(true);
                  dragStartRef.current = {
                    x: e.clientX,
                    y: e.clientY,
                    panX: canvasPan.x,
                    panY: canvasPan.y,
                  };
                  (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
                }}
                onPointerMove={(e) => {
                  if (!isDraggingCanvas) return;
                  const dx = e.clientX - dragStartRef.current.x;
                  const dy = e.clientY - dragStartRef.current.y;
                  setCanvasPan({
                    x: dragStartRef.current.panX + dx,
                    y: dragStartRef.current.panY + dy,
                  });
                }}
                onPointerUp={(e) => {
                  setIsDraggingCanvas(false);
                  try {
                    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
                  } catch (_) {}
                }}
                onWheel={(e) => {
                  e.preventDefault();
                  const zoomDelta = e.deltaY < 0 ? 0.05 : -0.05;
                  setCanvasZoom((prev) =>
                    Math.min(Math.max(Number((prev + zoomDelta).toFixed(2)), 0.15), 2.0)
                  );
                }}
              >
                {/* Infinite Workspace Grid Background */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
                    backgroundSize: "24px 24px",
                  }}
                />

                {/* Unified Zoom & Pan Workspace */}
                <div
                  className="absolute left-1/2 top-1/2 transition-transform duration-75 will-change-transform"
                  style={{
                    transform: `translate(calc(-50% + ${canvasPan.x}px), calc(-50% + ${canvasPan.y}px)) scale(${canvasZoom})`,
                    transformOrigin: "center center",
                  }}
                >
                  {/* Full High-Resolution Website Frame */}
                  <div className="w-[1280px] bg-[#0A0A0A] rounded-2xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.9)] border border-white/20">
                    <div className="w-full bg-[#1A1A1A] border-b border-white/10 px-4 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                        <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                        <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
                      </div>
                      <div className="text-xs text-neutral-400 bg-black/40 px-6 py-1 rounded-md border border-white/5 font-mono">
                        https://gpacts.com/summit-2026
                      </div>
                      <div className="w-12" />
                    </div>

                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/case-studies/gpacts/homescreen.png"
                      alt="GPACTS Complete Homescreen Design"
                      className="w-full h-auto block select-none pointer-events-none"
                    />
                  </div>
                </div>
              </div>

              {/* Floating Zoom & Controls Toolbar at Bottom */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#242424]/95 border border-white/15 backdrop-blur-lg shadow-[0_10px_30px_rgba(0,0,0,0.7)]">
                <button
                  type="button"
                  onClick={() =>
                    setCanvasZoom((prev) => Math.max(Number((prev - 0.1).toFixed(2)), 0.15))
                  }
                  className="w-7 h-7 rounded-full flex items-center justify-center text-neutral-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Zoom out"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCanvasZoom(0.45);
                    setCanvasPan({ x: 0, y: 0 });
                  }}
                  className="px-2.5 py-1 text-xs text-white font-medium hover:bg-white/10 rounded-md transition-colors cursor-pointer font-mono"
                >
                  {Math.round(canvasZoom * 100)}%
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setCanvasZoom((prev) => Math.min(Number((prev + 0.1).toFixed(2)), 2.0))
                  }
                  className="w-7 h-7 rounded-full flex items-center justify-center text-neutral-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Zoom in"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>

                <div className="w-[1px] h-4 bg-white/20 mx-1" />

                <button
                  type="button"
                  onClick={() => {
                    setCanvasZoom(0.45);
                    setCanvasPan({ x: 0, y: 0 });
                  }}
                  className="px-2 py-1 text-xs text-neutral-300 hover:text-white hover:bg-white/10 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                  </svg>
                  <span>Reset</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
