"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { HalftoneDots } from "@paper-design/shaders-react";
import { CaseStudyNav, CaseStudyBackButton } from "./case-study-nav";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "the-problem", label: "The Problem" },
  { id: "breaking-problem", label: "Breaking Problem" },
  { id: "before-after", label: "Before & After" },
  { id: "form-architecture", label: "Form Architecture" },
  { id: "field-ambiguity", label: "Field Ambiguity" },
  { id: "validation-prefill", label: "Validation & Pre-fill" },
  { id: "impact", label: "Impact" },
  { id: "reflection", label: "Reflection" },
  { id: "ui-mockups", label: "UI Mockups" },
];

const HELVETICA =
  "\"Helvetica Neue\", Helvetica, Arial, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif";
const FIRA_CODE = "\"Fira Code\", ui-monospace, SFMono-Regular, Menlo, monospace";

function GrungeSeparator() {
  return (
    <div className="flex w-full justify-center py-2" aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://app.paper.design/file-assets/01M03KW12YSNP0MEZXDDWH0QJZ/01M05ZA7AQR379995KJKXBG29X.png"
        alt=""
        className="w-[197px] h-[10px] object-contain opacity-60 select-none pointer-events-none"
      />
    </div>
  );
}

export function EdgeCrmCaseStudy() {
  const [activeSection, setActiveSection] = useState("about");
  const [mounted, setMounted] = useState(false);
  const [expandedFraud1, setExpandedFraud1] = useState(false);
  const [expandedFraud2, setExpandedFraud2] = useState(false);
  const [expandedFraud3, setExpandedFraud3] = useState(false);
  const [expandedTrust1, setExpandedTrust1] = useState(false);
  const [isPlaygroundOpen, setIsPlaygroundOpen] = useState(false);
  const [canvasZoom, setCanvasZoom] = useState(0.75);
  const [canvasPan, setCanvasPan] = useState({ x: 0, y: 0 });
  const [isDraggingCanvas, setIsDraggingCanvas] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number; panX: number; panY: number }>({ x: 0, y: 0, panX: 0, panY: 0 });
  const mockupScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle escape key to close playground modal & freeze body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isPlaygroundOpen) {
        setIsPlaygroundOpen(false);
      }
    };
    if (isPlaygroundOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPlaygroundOpen]);

  // Continuous rAF loop scroll-spy for accurate active section highlight
  useEffect(() => {
    let raf = 0;
    const syncActive = () => {
      raf = requestAnimationFrame(syncActive);
      const line = window.innerHeight * 0.35;

      const elements = SECTIONS.map((s) => ({
        id: s.id,
        el: document.getElementById(s.id),
      })).filter((item): item is { id: string; el: HTMLElement } => item.el !== null);

      if (elements.length === 0) return;

      let current = elements[0].id;
      for (const item of elements) {
        if (item.el.getBoundingClientRect().top <= line) {
          current = item.id;
        }
      }

      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 10
      ) {
        current = elements[elements.length - 1].id;
      }

      setActiveSection(current);
    };

    raf = requestAnimationFrame(syncActive);
    return () => cancelAnimationFrame(raf);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement, o?: object) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(el, { offset: -80 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      className="relative w-full text-white antialiased pt-16 sm:pt-20 lg:pt-28 pb-36 px-4"
      style={{
        fontFamily: HELVETICA,
        letterSpacing: "normal",
        fontFeatureSettings: "normal",
      }}
    >
      {/* ========================================================================= */}
      {/* FIXED LEFT-SIDE NAVIGATION & BACK BUTTON (Anchored to the left margin)    */}
      {/* ========================================================================= */}
      <CaseStudyNav items={SECTIONS} />
      <CaseStudyBackButton href="/case-studies" />

      {/* ========================================================================= */}
      {/* CENTER-ALIGNED MAIN READING CONTAINER (600px column centered in screen)   */}
      {/* ========================================================================= */}
      <div className="relative mx-auto w-full max-w-[600px]">
        {/* Mobile-only back button */}
        <div className="sm:hidden mb-6">
          <Link
            href="/case-studies"
            className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white border border-[#E6E6E6] shadow-xs"
            aria-label="Back to Case Studies"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5L7 10L12 15"
                stroke="#463F3F"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        {/* Content Column */}
        <main className="flex w-full flex-col items-start gap-12">
          {/* Header Title & Metadata */}
          <div className="flex w-full flex-col gap-8 pb-6 border-b border-[#FFFFFF33]">
            <h1
              style={{
                fontFamily: HELVETICA,
                fontSize: "26px",
                lineHeight: "34px",
                letterSpacing: "normal",
                fontWeight: 500,
                color: "#FFFFFF",
              }}
            >
              Redesigning a mobile case-management flow to cut cognitive load for B2B sales teams.
            </h1>

            {/* Metadata columns */}
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex flex-col items-start gap-1">
                <span
                  style={{
                    fontFamily: FIRA_CODE,
                    fontSize: "12px",
                    lineHeight: "16px",
                    letterSpacing: "normal",
                    fontWeight: 400,
                    color: "rgba(255, 255, 255, 0.7)",
                  }}
                >
                  ROLE
                </span>
                <span
                  style={{
                    fontFamily: HELVETICA,
                    fontSize: "14px",
                    lineHeight: "18px",
                    letterSpacing: "normal",
                    fontWeight: 400,
                    color: "#FFFFFF",
                  }}
                >
                  Sole UI/UX Designer
                </span>
              </div>

              <div className="flex flex-col items-start gap-1">
                <span
                  style={{
                    fontFamily: FIRA_CODE,
                    fontSize: "12px",
                    lineHeight: "16px",
                    letterSpacing: "normal",
                    fontWeight: 400,
                    color: "rgba(255, 255, 255, 0.7)",
                  }}
                >
                  COMPANY
                </span>
                <span
                  style={{
                    fontFamily: HELVETICA,
                    fontSize: "14px",
                    lineHeight: "18px",
                    letterSpacing: "normal",
                    fontWeight: 400,
                    color: "#FFFFFF",
                  }}
                >
                  12 Grids
                </span>
              </div>

              <div className="flex flex-col items-start gap-1">
                <span
                  style={{
                    fontFamily: FIRA_CODE,
                    fontSize: "12px",
                    lineHeight: "16px",
                    letterSpacing: "normal",
                    fontWeight: 400,
                    color: "rgba(255, 255, 255, 0.7)",
                  }}
                >
                  DELIVERABLES
                </span>
                <span
                  style={{
                    fontFamily: HELVETICA,
                    fontSize: "14px",
                    lineHeight: "18px",
                    letterSpacing: "normal",
                    fontWeight: 400,
                    color: "#FFFFFF",
                  }}
                >
                  Mobile App Redesign
                </span>
              </div>
            </div>
          </div>

          {/* ================= CASE STUDY BODY ================= */}
          <div className="flex w-full flex-col items-start gap-14">
            {/* 1. INTRO HERO SECTION */}
            <section className="flex w-full flex-col items-start gap-7">
              {/* HERO MOCKUP CARD WITH HALFTONE SHADER */}
              <div className="relative flex w-full flex-col items-center justify-center rounded-2xl bg-[#242424] p-1 border-[0.5px] border-[#FFFFFF0F] shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)]">
                <div className="relative h-[378px] w-full overflow-hidden rounded-xl bg-[#9A8DE9] shadow-[0_0_5px_rgba(0,0,0,0.2)]">
                  {/* Background Base */}
                  <div className="absolute inset-0 bg-[#2B2B2B]" />

                  {/* Halftone Shader Layer */}
                  {mounted && (
                    <div className="absolute -inset-10 opacity-90">
                      <HalftoneDots
                        contrast={0.4}
                        originalColors={false}
                        inverted={false}
                        grid="hex"
                        radius={1.25}
                        size={0.5}
                        scale={1}
                        image="https://app.paper.design/file-assets/01M03KW12YSNP0MEZXDDWH0QJZ/01M04G80ZAAH1PVPV1FAHY4PSW.jpg"
                        grainMixer={0.2}
                        grainOverlay={0.2}
                        grainSize={0.5}
                        type="gooey"
                        fit="cover"
                        colorFront="#2B2B2B"
                        colorBack="#00000000"
                        className="h-full w-full"
                        style={{
                          backgroundImage:
                            "linear-gradient(in oklab 180deg, oklab(0% 0 0 / 0%) 0%, oklab(80.4% -0.050 0.070) 100.01%)",
                        }}
                      />
                    </div>
                  )}

                  {/* Headline Banner */}
                  <div className="absolute left-0 right-0 top-[29.5px] z-10 flex flex-col items-center justify-center py-4">
                    <h2
                      style={{
                        fontFamily: HELVETICA,
                        fontSize: "24px",
                        lineHeight: "30px",
                        letterSpacing: "-0.02em",
                        fontWeight: 400,
                        color: "#FFFFFF",
                      }}
                    >
                      Case logging at speed
                    </h2>
                  </div>

                  {/* Smartphone App Screen Mockup */}
                  <div
                    className="absolute left-1/2 top-[104.5px] w-[219px] h-[446px] -translate-x-1/2 bg-contain bg-top bg-no-repeat pointer-events-none z-10"
                    style={{
                      backgroundImage: "url(/projects/edge-crm/06-final.png)",
                    }}
                  />
                </div>
              </div>

              {/* BRAND ACCENT CALLOUT */}
              <div
                className="flex h-8.5 w-full items-center gap-3 rounded-[1px] px-0.5"
                style={{
                  backgroundImage:
                    "linear-gradient(in oklab 90.67deg, oklab(61.5% 0 0 / 16%) 50%, oklab(80% 0 0 / 0%) 99.99%)",
                }}
              >
                <div className="h-full w-0.5 rounded-full bg-[#989100] shrink-0" />
                <div
                  className="flex items-center gap-1.25"
                  style={{
                    fontFamily: HELVETICA,
                    fontSize: "16px",
                    lineHeight: "20px",
                    letterSpacing: "-0.02em",
                  }}
                >
                  <span
                    style={{
                      fontStyle: "italic",
                      fontWeight: 400,
                      color: "rgba(255, 255, 255, 0.5)",
                    }}
                  >
                    Reps can now log a complex client case under
                  </span>
                  <span
                    style={{
                      fontStyle: "italic",
                      fontWeight: 400,
                      color: "rgba(255, 255, 255, 0.7)",
                    }}
                  >
                    2
                  </span>
                  <span
                    style={{
                      fontStyle: "italic",
                      fontWeight: 400,
                      color: "rgba(255, 255, 255, 0.7)",
                    }}
                  >
                    minutes
                  </span>
                </div>
              </div>

              {/* NARRATIVE PARAGRAPHS */}
              <div
                className="flex flex-col gap-3"
                style={{
                  fontFamily: HELVETICA,
                  fontSize: "15px",
                  lineHeight: "22px",
                  letterSpacing: "normal",
                  fontWeight: 400,
                  color: "rgba(255, 255, 255, 0.75)",
                }}
              >
                <p>That was what I thought before actually redesigning this flow.</p>
                <p>
                  Edge CRM is an AI-driven platform that helps B2B sales and support teams log, track, and resolve client cases every single day.
                </p>
                <p>
                  Field sales reps at 12 Grids open it many times a day—often mid-client-call, in high-pressure moments where every second counts.
                </p>
                <p>
                  Every case starts on one screen: Add Case. It was the entry point of the whole flow, and where most reps gave up.
                </p>
              </div>
            </section>

            {/* SEPARATOR 1 */}
            <GrungeSeparator />

            {/* 2. ABOUT SECTION (3-COLUMN BENTO CARDS) */}
            <section id="about" className="flex w-full flex-col items-start gap-3 scroll-mt-24">
              <h2
                style={{
                  fontFamily: HELVETICA,
                  fontSize: "20px",
                  lineHeight: "24px",
                  letterSpacing: "normal",
                  fontWeight: 400,
                  color: "#FFFFFF",
                }}
              >
                About
              </h2>

              <div className="flex w-full flex-col gap-8">
                <div
                  className="flex flex-col gap-3"
                  style={{
                    fontFamily: HELVETICA,
                    fontSize: "16px",
                    lineHeight: "20px",
                    letterSpacing: "normal",
                    fontWeight: 400,
                    color: "rgba(255, 255, 255, 0.7)",
                  }}
                >
                  <p>
                    Edge CRM is an enterprise productivity suite engineered to streamline client relationship management.
                  </p>
                  <p>
                    Sales reps can register cases, track live statuses, and route tickets instantly, all in one consolidated mobile platform.
                  </p>
                </div>

                {/* 3 Square Cards in a Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                  {/* Card 1: 40% Faster */}
                  <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 flex-1 shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                    <div
                      className="aspect-square flex rounded-xl overflow-clip flex-col items-center justify-center self-stretch flex-1 px-2.5 py-3 relative bg-origin-border"
                      style={{
                        backgroundImage:
                          "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                      }}
                    >
                      {mounted && (
                        <HalftoneDots
                          contrast={0.4}
                          originalColors
                          inverted
                          grid="hex"
                          radius={0.71}
                          size={0.62}
                          scale={1}
                          image="https://app.paper.design/file-assets/01M03KW12YSNP0MEZXDDWH0QJZ/01M05MHM5GY8RQ6K3W7DNJ7EMK.jpg"
                          grainMixer={0.91}
                          grainOverlay={0.2}
                          grainSize={0.61}
                          type="gooey"
                          fit="cover"
                          colorFront="#0D0D0D"
                          colorBack="#00000000"
                          className="w-[180%] h-[180%] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#62626200]"
                        />
                      )}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          backgroundImage:
                            "linear-gradient(in oklab 180deg, oklab(20.1% 0 0) 0%, oklab(71.8% 0 0 / 0%) 300.1%)",
                        }}
                      />
                      <div className="items-start flex flex-col justify-between gap-1.5 flex-1 self-stretch relative z-10 h-full">
                        <div className="w-fit text-white text-base leading-[18px]">
                          40% Faster
                        </div>
                        <div className="self-stretch text-white text-base leading-5">
                          Cut case logging from 4 min down to under 2 min.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Field Errors */}
                  <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 flex-1 shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                    <div
                      className="aspect-square flex rounded-xl overflow-clip flex-col items-center justify-center self-stretch flex-1 px-2.5 py-3 relative bg-origin-border"
                      style={{
                        backgroundImage:
                          "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                      }}
                    >
                      {mounted && (
                        <HalftoneDots
                          contrast={0.4}
                          originalColors
                          inverted
                          grid="hex"
                          radius={0.71}
                          size={0.62}
                          scale={1}
                          image="https://app.paper.design/file-assets/01M03KW12YSNP0MEZXDDWH0QJZ/01M05PSD8DDRMVX6V0K90RJ3Q3.jpg"
                          grainMixer={0.91}
                          grainOverlay={0.2}
                          grainSize={0.61}
                          type="gooey"
                          fit="cover"
                          colorFront="#0D0D0D"
                          colorBack="#00000000"
                          className="w-[180%] h-[180%] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#62626200]"
                        />
                      )}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          backgroundImage:
                            "linear-gradient(in oklab 180deg, oklab(20.1% 0 0) 0%, oklab(71.8% 0 0 / 0%) 300.1%)",
                        }}
                      />
                      <div className="items-start flex flex-col justify-between gap-1.5 flex-1 self-stretch relative z-10 h-full">
                        <div className="w-fit text-white text-base leading-[18px]">
                          Error Reduction
                        </div>
                        <div className="self-stretch text-white text-base leading-5">
                          Eliminated recurring 80% field error rates.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: 3-Step Flow */}
                  <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 flex-1 shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                    <div
                      className="aspect-square flex rounded-xl overflow-clip flex-col items-center justify-center self-stretch flex-1 px-2.5 py-3 relative bg-origin-border"
                      style={{
                        backgroundImage:
                          "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                      }}
                    >
                      {mounted && (
                        <HalftoneDots
                          contrast={0.4}
                          originalColors
                          inverted
                          grid="hex"
                          radius={0.71}
                          size={0.62}
                          scale={1}
                          image="https://app.paper.design/file-assets/01M03KW12YSNP0MEZXDDWH0QJZ/01M05PST8J25JQRT8JR53JG7M4.jpg"
                          grainMixer={0.91}
                          grainOverlay={0.2}
                          grainSize={0.61}
                          type="gooey"
                          fit="cover"
                          colorFront="#0D0D0D"
                          colorBack="#00000000"
                          className="w-[180%] h-[180%] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#62626200]"
                        />
                      )}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          backgroundImage:
                            "linear-gradient(in oklab 180deg, oklab(20.1% 0 0) 0%, oklab(71.8% 0 0 / 0%) 300.1%)",
                        }}
                      />
                      <div className="items-start flex flex-col justify-between gap-1.5 flex-1 self-stretch relative z-10 h-full">
                        <div className="w-fit text-white text-base leading-[18px]">
                          3-Step Flow
                        </div>
                        <div className="self-stretch text-white text-base leading-5">
                          Progressive stepped disclosure architecture.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SEPARATOR 2 */}
            <GrungeSeparator />

            {/* 3. PROBLEM STATEMENT SECTION (2×2 LAYOUT CONTAINER CARD) */}
            <section id="the-problem" className="flex w-full flex-col items-start gap-4 scroll-mt-24">
              <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 w-full shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                <div
                  className="flex rounded-xl overflow-hidden flex-col items-start justify-between w-full px-2.5 py-3 h-[310px]"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                  }}
                >
                  {/* Top Row: Title + Description */}
                  <div className="flex items-start gap-[142px] w-full">
                    <div className="w-fit shrink-0 text-white text-base leading-[18px]">
                      Problem Statement.
                    </div>
                    <div className="flex-1 font-normal text-[rgba(255,255,255,0.7)] text-base leading-5">
                      A fast, unambiguous case-logging workflow to reduce cognitive load, prevent validation errors, and keep sales reps focused.
                    </div>
                  </div>
                  {/* Bottom Row: 2 Columns */}
                  <div className="flex items-end gap-3 w-full justify-center">
                    <div className="flex-1 font-normal text-[rgba(255,255,255,0.7)] text-base leading-5">
                      12 Grids field reps handle dozens of urgent client calls daily on mobile devices under tight time constraints.
                    </div>
                    <div className="flex-1 font-normal text-[rgba(255,255,255,0.7)] text-base leading-5">
                      The legacy single-page form caused cognitive fatigue, repetitive validation failures, and prolonged call resolution times.
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SEPARATOR 3 */}
            <GrungeSeparator />

            {/* 4. BREAKING PROBLEM STATEMENT SECTION */}
            <section id="breaking-problem" className="flex w-full flex-col items-start gap-3 scroll-mt-24">
              <h2
                style={{
                  fontFamily: HELVETICA,
                  fontSize: "20px",
                  lineHeight: "24px",
                  letterSpacing: "normal",
                  fontWeight: 400,
                  color: "#FFFFFF",
                }}
              >
                Breaking problem statement.
              </h2>

              <div className="flex w-full flex-col gap-8">
                <div
                  className="flex flex-col gap-3"
                  style={{
                    fontFamily: HELVETICA,
                    fontSize: "16px",
                    lineHeight: "20px",
                    letterSpacing: "normal",
                    fontWeight: 400,
                    color: "rgba(255, 255, 255, 0.7)",
                  }}
                >
                  <p>
                    I usually try to break the problem statement into small blocks, then eventually pick the ones which actually align with the main goal.
                  </p>
                  <p className="text-white font-normal">
                    So, I stood with three problem buckets.
                  </p>
                </div>

                {/* 3 Taller Cards in a Row with HalftoneDots shader */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full h-auto sm:h-[294px]">
                  {/* Card 1: Form Overload */}
                  <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 flex-1 shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                    <div
                      className="aspect-square flex rounded-xl overflow-clip flex-col items-center justify-center self-stretch flex-1 px-2.5 py-3 relative bg-origin-border border-[0.5px] border-[#FFFFFF1A]"
                      style={{
                        backgroundImage:
                          "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                      }}
                    >
                      {mounted && (
                        <HalftoneDots
                          contrast={0.4}
                          originalColors
                          inverted
                          grid="hex"
                          radius={0.71}
                          size={0.62}
                          scale={1}
                          image="https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M05PVRTNZR3D0P3C0YXYBQWC.jpg"
                          grainMixer={0.91}
                          grainOverlay={0.2}
                          grainSize={0.61}
                          type="gooey"
                          fit="cover"
                          colorFront="#0D0D0D"
                          colorBack="#00000000"
                          className="w-[180%] h-[180%] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#62626200]"
                        />
                      )}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          backgroundImage:
                            "linear-gradient(in oklab 180deg, oklab(20.1% 0 0) 0%, 215.41%, oklab(71.8% 0 0 / 0%) 300.1%)",
                        }}
                      />
                      <div className="items-start flex flex-col justify-between gap-1.5 flex-1 self-stretch relative z-10 h-full">
                        <div
                          className="w-fit whitespace-pre text-white text-base leading-[18px]"
                          style={{ fontFamily: HELVETICA }}
                        >
                          Form{"\n"}Overload
                        </div>
                        <div
                          className="self-stretch text-[#747474] text-sm leading-5"
                          style={{ fontFamily: HELVETICA }}
                        >
                          Reps felt lost in one massive vertical scroll with zero sense of completion or remaining effort.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Visual Ambiguity */}
                  <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 flex-1 shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                    <div
                      className="aspect-square flex rounded-xl overflow-clip flex-col items-center justify-center self-stretch flex-1 px-2.5 py-3 relative bg-origin-border border-[0.5px] border-[#FFFFFF1A]"
                      style={{
                        backgroundImage:
                          "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                      }}
                    >
                      {mounted && (
                        <HalftoneDots
                          contrast={0.4}
                          originalColors
                          inverted
                          grid="hex"
                          radius={0.71}
                          size={0.62}
                          scale={1}
                          image="https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M0A06WWM5VXW3Z9XY10931SY.jpg"
                          grainMixer={0.91}
                          grainOverlay={0.2}
                          grainSize={0.61}
                          type="gooey"
                          fit="cover"
                          colorFront="#0D0D0D"
                          colorBack="#00000000"
                          className="w-[180%] h-[180%] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#62626200]"
                        />
                      )}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          backgroundImage:
                            "linear-gradient(in oklab 180deg, oklab(20.1% 0 0) 0%, 215.41%, oklab(71.8% 0 0 / 0%) 300.1%)",
                        }}
                      />
                      <div className="items-start flex flex-col justify-between gap-1.5 flex-1 self-stretch relative z-10 h-full">
                        <div
                          className="w-fit whitespace-pre text-white text-base leading-[18px]"
                          style={{ fontFamily: HELVETICA }}
                        >
                          Visual Field{"\n"}Ambiguity
                        </div>
                        <div
                          className="self-stretch text-[#747474] text-sm leading-5"
                          style={{ fontFamily: HELVETICA }}
                        >
                          Identical underline styling made it impossible to distinguish between free text inputs and selectable dropdowns.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Error Validation */}
                  <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 flex-1 shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                    <div
                      className="aspect-square flex rounded-xl overflow-clip flex-col items-center justify-center self-stretch flex-1 px-2.5 py-3 relative bg-origin-border border-[0.5px] border-[#FFFFFF1A]"
                      style={{
                        backgroundImage:
                          "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                      }}
                    >
                      {mounted && (
                        <HalftoneDots
                          contrast={0.4}
                          originalColors
                          inverted
                          grid="hex"
                          radius={0.71}
                          size={0.62}
                          scale={1}
                          image="https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M0A0743YCW2T79PNCNJGA2S0.jpg"
                          grainMixer={0.91}
                          grainOverlay={0.2}
                          grainSize={0.61}
                          type="gooey"
                          fit="cover"
                          colorFront="#0D0D0D"
                          colorBack="#00000000"
                          className="w-[180%] h-[180%] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#62626200]"
                        />
                      )}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          backgroundImage:
                            "linear-gradient(in oklab 180deg, oklab(20.1% 0 0) 0%, 215.41%, oklab(71.8% 0 0 / 0%) 300.1%)",
                        }}
                      />
                      <div className="items-start flex flex-col justify-between gap-1.5 flex-1 self-stretch relative z-10 h-full">
                        <div
                          className="w-fit whitespace-pre text-white text-base leading-[18px]"
                          style={{ fontFamily: HELVETICA }}
                        >
                          Silent Error{"\n"}Validation
                        </div>
                        <div
                          className="self-stretch text-[#747474] text-sm leading-5"
                          style={{ fontFamily: HELVETICA }}
                        >
                          Errors weren&apos;t surfaced inline, causing reps to submit multiple times and refill identical fields.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SEPARATOR 4 */}
            <GrungeSeparator />

            {/* 5. BEFORE & AFTER SECTION */}
            <section
              id="before-after"
              className="flex w-full flex-col items-start gap-9 scroll-mt-24"
            >
              {/* Section Title Bar */}
              <div className="flex items-center gap-3 w-full">
                <h2
                  style={{
                    fontFamily: HELVETICA,
                    fontSize: "20px",
                    lineHeight: "24px",
                    letterSpacing: "normal",
                    fontWeight: 500,
                    color: "#FFFFFF",
                  }}
                >
                  Before & After
                </h2>
                <span
                  style={{
                    fontFamily: HELVETICA,
                    fontSize: "12px",
                    lineHeight: "16px",
                    letterSpacing: "normal",
                    fontWeight: 400,
                    color: "rgba(255, 255, 255, 0.4)",
                  }}
                >
                  Tracing the Transformation
                </span>
              </div>

              <div className="flex w-full flex-col items-start gap-8">
                <div
                  className="flex flex-col gap-3"
                  style={{
                    fontFamily: HELVETICA,
                    fontSize: "16px",
                    lineHeight: "20px",
                    letterSpacing: "normal",
                    fontWeight: 400,
                    color: "rgba(255, 255, 255, 0.7)",
                  }}
                >
                  <p>
                    Comparing the legacy 1-page form against the stepped, validated 3-stage interface.
                  </p>
                </div>

                {/* Primary Annotated Before & After Card in Vote IN Gradient Box */}
                <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 w-full shrink-0 shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                  <div
                    className="rounded-xl overflow-hidden self-stretch flex-1 relative bg-origin-border border-[0.5px] border-[#FFFFFF1A] p-4 sm:p-6 flex flex-col gap-6"
                    style={{
                      backgroundImage:
                        "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                    }}
                  >
                    {/* Top Legend Badges */}
                    <div className="flex items-center justify-between w-full border-b border-white/10 pb-3">
                      <span className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs text-white font-mono backdrop-blur-md">
                        <span className="size-1.5 rounded-full bg-[#B81919]" />
                        BEFORE — Unstructured Scroll
                      </span>
                      <span className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs text-white font-mono backdrop-blur-md">
                        <span className="size-1.5 rounded-full bg-[#10B981]" />
                        AFTER — 3-Step Validated Flow
                      </span>
                    </div>

                    {/* Desktop Annotated Diagram */}
                    <div className="hidden sm:grid grid-cols-[160px_1fr_160px] gap-4 items-center relative py-2">
                      {/* Left Before Device */}
                      <div className="flex flex-col items-center gap-2 relative">
                        <img
                          src="/projects/edge-crm/01-before.png"
                          alt="Before redesign"
                          className="h-[380px] w-auto object-contain select-none pointer-events-none"
                        />
                        <span className="text-[11px] font-mono text-white/50 uppercase">Before</span>
                      </div>

                      {/* Middle Annotation Cards with Connectors */}
                      <div className="flex flex-col gap-3 justify-center z-10">
                        {/* Change 01 */}
                        <div className="flex flex-col gap-1 rounded-lg border border-white/10 bg-black/60 p-2.5 backdrop-blur-md">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] text-white/50 uppercase tracking-wider">Change 01</span>
                          </div>
                          <div className="text-white text-xs font-medium" style={{ fontFamily: HELVETICA }}>
                            Stepped flow + progress bar
                          </div>
                          <div className="text-[11px] text-neutral-400 leading-tight" style={{ fontFamily: HELVETICA }}>
                            One long scroll replaced by clear 3-step sections with progress tracking.
                          </div>
                        </div>

                        {/* Change 02 */}
                        <div className="flex flex-col gap-1 rounded-lg border border-white/10 bg-black/60 p-2.5 backdrop-blur-md">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] text-white/50 uppercase tracking-wider">Change 02</span>
                          </div>
                          <div className="text-white text-xs font-medium" style={{ fontFamily: HELVETICA }}>
                            Notification banner
                          </div>
                          <div className="text-[11px] text-neutral-400 leading-tight" style={{ fontFamily: HELVETICA }}>
                            Proactive alerts flag missing required fields before form submission.
                          </div>
                        </div>

                        {/* Change 03 */}
                        <div className="flex flex-col gap-1 rounded-lg border border-white/10 bg-black/60 p-2.5 backdrop-blur-md">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] text-white/50 uppercase tracking-wider">Change 03</span>
                          </div>
                          <div className="text-white text-xs font-medium" style={{ fontFamily: HELVETICA }}>
                            Grouped, pre-filled fields
                          </div>
                          <div className="text-[11px] text-neutral-400 leading-tight" style={{ fontFamily: HELVETICA }}>
                            Known CRM values pre-filled with green verification checkmarks.
                          </div>
                        </div>

                        {/* Change 04 */}
                        <div className="flex flex-col gap-1 rounded-lg border border-white/10 bg-black/60 p-2.5 backdrop-blur-md">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] text-white/50 uppercase tracking-wider">Change 04</span>
                          </div>
                          <div className="text-white text-xs font-medium" style={{ fontFamily: HELVETICA }}>
                            Full-width sticky CTA
                          </div>
                          <div className="text-[11px] text-neutral-400 leading-tight" style={{ fontFamily: HELVETICA }}>
                            One prominent primary action button always positioned within thumb reach.
                          </div>
                        </div>
                      </div>

                      {/* Right After Device */}
                      <div className="flex flex-col items-center gap-2 relative">
                        <img
                          src="/projects/edge-crm/06-final.png"
                          alt="After redesign"
                          className="h-[380px] w-auto object-contain select-none pointer-events-none"
                        />
                        <span className="text-[11px] font-mono text-emerald-400/80 uppercase">After</span>
                      </div>
                    </div>

                    {/* Mobile Annotated Diagram */}
                    <div className="flex flex-col gap-5 sm:hidden">
                      <div className="flex items-center justify-center gap-4">
                        <div className="flex flex-col items-center gap-1.5">
                          <img
                            src="/projects/edge-crm/01-before.png"
                            alt="Before"
                            className="h-[220px] w-auto object-contain"
                          />
                          <span className="text-[10px] font-mono text-white/50 uppercase">Before</span>
                        </div>
                        <div className="flex flex-col items-center gap-1.5">
                          <img
                            src="/projects/edge-crm/06-final.png"
                            alt="After"
                            className="h-[220px] w-auto object-contain"
                          />
                          <span className="text-[10px] font-mono text-emerald-400/80 uppercase">After</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2.5">
                        <div className="rounded-lg border border-white/10 bg-black/60 p-3">
                          <span className="font-mono text-[10px] text-white/50 uppercase">Change 01</span>
                          <div className="text-white text-xs font-medium mt-0.5">Stepped flow + progress bar</div>
                          <div className="text-[11px] text-neutral-400 mt-1">One long scroll replaced by 3 stepped sections.</div>
                        </div>
                        <div className="rounded-lg border border-white/10 bg-black/60 p-3">
                          <span className="font-mono text-[10px] text-white/50 uppercase">Change 02</span>
                          <div className="text-white text-xs font-medium mt-0.5">Notification banner</div>
                          <div className="text-[11px] text-neutral-400 mt-1">Proactive alerts flag issues before submit.</div>
                        </div>
                        <div className="rounded-lg border border-white/10 bg-black/60 p-3">
                          <span className="font-mono text-[10px] text-white/50 uppercase">Change 03</span>
                          <div className="text-white text-xs font-medium mt-0.5">Grouped, pre-filled fields</div>
                          <div className="text-[11px] text-neutral-400 mt-1">Known values pre-filled with green ticks.</div>
                        </div>
                        <div className="rounded-lg border border-white/10 bg-black/60 p-3">
                          <span className="font-mono text-[10px] text-white/50 uppercase">Change 04</span>
                          <div className="text-white text-xs font-medium mt-0.5">Full-width sticky CTA</div>
                          <div className="text-[11px] text-neutral-400 mt-1">Prominent primary button in thumb reach.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3 Transformation Bento Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full pt-1">
                  {/* Transformation Card 1 */}
                  <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 flex-1 shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                    <div
                      className="aspect-square flex rounded-xl overflow-clip flex-col items-center justify-center self-stretch flex-1 px-2.5 py-3 relative bg-origin-border"
                      style={{
                        backgroundImage:
                          "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                      }}
                    >
                      {mounted && (
                        <HalftoneDots
                          contrast={0.4}
                          originalColors
                          inverted
                          grid="hex"
                          radius={0.71}
                          size={0.62}
                          scale={1}
                          image="https://app.paper.design/file-assets/01M03KW12YSNP0MEZXDDWH0QJZ/01M05MHM5GY8RQ6K3W7DNJ7EMK.jpg"
                          grainMixer={0.91}
                          grainOverlay={0.2}
                          grainSize={0.61}
                          type="gooey"
                          fit="cover"
                          colorFront="#0D0D0D"
                          colorBack="#00000000"
                          className="w-[180%] h-[180%] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#62626200]"
                        />
                      )}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          backgroundImage:
                            "linear-gradient(in oklab 180deg, oklab(20.1% 0 0) 0%, oklab(71.8% 0 0 / 0%) 300.1%)",
                        }}
                      />
                      <div className="items-start flex flex-col justify-between gap-1.5 flex-1 self-stretch relative z-10 h-full">
                        <div className="w-fit text-white text-base leading-[18px]">
                          Stepped Flow
                        </div>
                        <div className="self-stretch text-white text-base leading-5">
                          Converted 1 endless scroll into 3 logical steps.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Transformation Card 2 */}
                  <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 flex-1 shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                    <div
                      className="aspect-square flex rounded-xl overflow-clip flex-col items-center justify-center self-stretch flex-1 px-2.5 py-3 relative bg-origin-border"
                      style={{
                        backgroundImage:
                          "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                      }}
                    >
                      {mounted && (
                        <HalftoneDots
                          contrast={0.4}
                          originalColors
                          inverted
                          grid="hex"
                          radius={0.71}
                          size={0.62}
                          scale={1}
                          image="https://app.paper.design/file-assets/01M03KW12YSNP0MEZXDDWH0QJZ/01M05PSD8DDRMVX6V0K90RJ3Q3.jpg"
                          grainMixer={0.91}
                          grainOverlay={0.2}
                          grainSize={0.61}
                          type="gooey"
                          fit="cover"
                          colorFront="#0D0D0D"
                          colorBack="#00000000"
                          className="w-[180%] h-[180%] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#62626200]"
                        />
                      )}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          backgroundImage:
                            "linear-gradient(in oklab 180deg, oklab(20.1% 0 0) 0%, oklab(71.8% 0 0 / 0%) 300.1%)",
                        }}
                      />
                      <div className="items-start flex flex-col justify-between gap-1.5 flex-1 self-stretch relative z-10 h-full">
                        <div className="w-fit text-white text-base leading-[18px]">
                          Field Differentiation
                        </div>
                        <div className="self-stretch text-white text-base leading-5">
                          Bordered card inputs with explicit chevrons.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Transformation Card 3 */}
                  <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 flex-1 shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                    <div
                      className="aspect-square flex rounded-xl overflow-clip flex-col items-center justify-center self-stretch flex-1 px-2.5 py-3 relative bg-origin-border"
                      style={{
                        backgroundImage:
                          "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                      }}
                    >
                      {mounted && (
                        <HalftoneDots
                          contrast={0.4}
                          originalColors
                          inverted
                          grid="hex"
                          radius={0.71}
                          size={0.62}
                          scale={1}
                          image="https://app.paper.design/file-assets/01M03KW12YSNP0MEZXDDWH0QJZ/01M05PST8J25JQRT8JR53JG7M4.jpg"
                          grainMixer={0.91}
                          grainOverlay={0.2}
                          grainSize={0.61}
                          type="gooey"
                          fit="cover"
                          colorFront="#0D0D0D"
                          colorBack="#00000000"
                          className="w-[180%] h-[180%] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#62626200]"
                        />
                      )}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          backgroundImage:
                            "linear-gradient(in oklab 180deg, oklab(20.1% 0 0) 0%, oklab(71.8% 0 0 / 0%) 300.1%)",
                        }}
                      />
                      <div className="items-start flex flex-col justify-between gap-1.5 flex-1 self-stretch relative z-10 h-full">
                        <div className="w-fit text-white text-base leading-[18px]">
                          Inline Validation
                        </div>
                        <div className="self-stretch text-white text-base leading-5">
                          Top warning banner + actionable inline fix cues.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SEPARATOR 5 */}
            <GrungeSeparator />

            {/* 6. FORM ARCHITECTURE SECTION */}
            <section
              id="form-architecture"
              className="flex w-full flex-col items-start gap-9 scroll-mt-24"
            >
              {/* Section Title Bar */}
              <div className="flex items-center gap-3 w-full">
                <h2
                  style={{
                    fontFamily: HELVETICA,
                    fontSize: "20px",
                    lineHeight: "24px",
                    letterSpacing: "normal",
                    fontWeight: 500,
                    color: "#FFFFFF",
                  }}
                >
                  Form Architecture
                </h2>
                <span
                  style={{
                    fontFamily: HELVETICA,
                    fontSize: "12px",
                    lineHeight: "16px",
                    letterSpacing: "normal",
                    fontWeight: 400,
                    color: "rgba(255, 255, 255, 0.4)",
                  }}
                >
                  Breaking Cognitive Overload
                </span>
              </div>

              <div className="flex w-full flex-col items-start gap-15">
                {/* Subsection 1 */}
                <div className="flex w-full flex-col items-start gap-3">
                  <h3
                    style={{
                      fontFamily: HELVETICA,
                      fontSize: "18px",
                      lineHeight: "22px",
                      letterSpacing: "normal",
                      fontWeight: 500,
                      color: "#FFFFFF",
                    }}
                  >
                    1. Stepped Progressive Flow
                  </h3>
                  <div className="flex w-full flex-col items-start gap-9">
                    <div className="flex w-full flex-col items-start gap-6">
                      <p
                        className="w-full font-normal text-[rgba(255,255,255,0.7)] text-base leading-5"
                        style={{ fontFamily: HELVETICA }}
                      >
                        Instead of dumping twenty fields onto a single screen, we grouped related fields into three progressive steps: Overview, Type, and Assignee.
                      </p>
                      <p
                        className="w-full font-medium text-white text-base leading-5"
                        style={{ fontFamily: HELVETICA }}
                      >
                        For the new stepped flow, we improved clarity by:
                      </p>
                      <div className="flex w-full flex-col items-start gap-3">
                        <p className="w-full text-[rgba(255,255,255,0.7)] text-base leading-5" style={{ fontFamily: HELVETICA }}>
                          • Introducing a stepped progress indicator showing exact remaining steps
                        </p>
                        <p className="w-full text-[rgba(255,255,255,0.7)] text-base leading-5" style={{ fontFamily: HELVETICA }}>
                          • Adding clear section headers to maintain rep context throughout
                        </p>
                        <p className="w-full text-[rgba(255,255,255,0.7)] text-base leading-5" style={{ fontFamily: HELVETICA }}>
                          • Placing a full-width bottom CTA within easy thumb reach
                        </p>
                      </div>
                    </div>

                    {/* Annotated Mockup Card 1 */}
                    <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 w-full h-[366px] shrink-0 shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                      <div
                        className="relative flex rounded-xl overflow-hidden items-start w-full flex-1 flex-col border-[0.5px] border-[#FFFFFF1A]"
                        style={{
                          backgroundImage:
                            "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                        }}
                      >
                        {/* Smartphone Mockup */}
                        <div
                          className="w-[327px] h-[664px] top-[-324px] left-[235px] absolute bg-cover bg-center pointer-events-none z-10"
                          style={{
                            backgroundImage: "url(/projects/edge-crm/06-final.png)",
                          }}
                        />

                        {/* Tag Label at Top-Left */}
                        <div className="w-fit absolute left-5 top-[18px] text-[#FFFFFF66] text-base leading-5 font-normal z-10">
                          Stepped Add Case
                        </div>

                        {/* Annotation 1 */}
                        <div className="w-[162px] text-justify left-[29px] top-[134px] absolute text-white text-[13px] leading-5 font-normal z-10">
                          Step progress bar lets reps know exactly where they are in the ticket flow.
                        </div>
                        {/* Connecting Line 1 */}
                        <div className="w-[63px] h-[3px] left-[202px] top-[157px] absolute z-10 pointer-events-none">
                          <div className="top-[1px] h-px absolute bg-[#5E5E5E] inset-x-0" />
                          <div className="-left-px top-0 w-[3px] h-[3px] rounded-full absolute bg-[#5E5E5E]" />
                          <div className="top-0 w-[3px] h-[3px] rounded-full right-0 absolute bg-[#5E5E5E]" />
                        </div>

                        {/* Annotation 2 */}
                        <div className="w-[162px] text-justify left-[29px] top-[220px] absolute text-white text-[13px] leading-5 font-normal z-10">
                          Notification section flags incomplete required fields before submission.
                        </div>
                        {/* Connecting Line 2 */}
                        <div className="w-[136px] h-[3px] left-[202px] top-[236px] absolute z-10 pointer-events-none">
                          <div className="top-[1px] h-px absolute bg-[#5E5E5E] inset-x-0" />
                          <div className="-left-px top-0 w-[3px] h-[3px] rounded-full absolute bg-[#5E5E5E]" />
                          <div className="top-0 w-[3px] h-[3px] rounded-full right-0 absolute bg-[#5E5E5E]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SEPARATOR 5 */}
            <GrungeSeparator />

            {/* 6. FIELD AMBIGUITY SECTION */}
            <section
              id="field-ambiguity"
              className="flex w-full flex-col items-start gap-9 scroll-mt-24"
            >
              {/* Section Title Bar */}
              <div className="flex items-center gap-3 w-full">
                <h2
                  style={{
                    fontFamily: HELVETICA,
                    fontSize: "20px",
                    lineHeight: "24px",
                    letterSpacing: "normal",
                    fontWeight: 500,
                    color: "#FFFFFF",
                  }}
                >
                  Field Ambiguity
                </h2>
                <span
                  style={{
                    fontFamily: HELVETICA,
                    fontSize: "12px",
                    lineHeight: "16px",
                    letterSpacing: "normal",
                    fontWeight: 400,
                    color: "rgba(255, 255, 255, 0.4)",
                  }}
                >
                  Distinct Interaction Grammar
                </span>
              </div>

              <div className="flex w-full flex-col items-start gap-15">
                {/* Subsection 1 */}
                <div className="flex w-full flex-col items-start gap-3">
                  <h3
                    style={{
                      fontFamily: HELVETICA,
                      fontSize: "18px",
                      lineHeight: "22px",
                      letterSpacing: "normal",
                      fontWeight: 500,
                      color: "#FFFFFF",
                    }}
                  >
                    1. Card-Style Bordered Inputs
                  </h3>
                  <div className="flex w-full flex-col items-start gap-9">
                    <div className="flex w-full flex-col items-start gap-6">
                      <p
                        className="w-full text-[rgba(255,255,255,0.7)] text-base leading-5 font-normal"
                        style={{ fontFamily: HELVETICA }}
                      >
                        We replaced flat underlines with card-style bordered containers and explicit chevron icons, making dropdowns instantly recognizable at a glance.
                      </p>
                    </div>

                    {/* Expandable Card 1 */}
                    <div
                      className={`flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 w-full shrink-0 shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F] transition-all duration-500 ease-in-out ${
                        expandedFraud1 ? "h-[640px]" : "h-[366px]"
                      }`}
                    >
                      <div
                        className="relative flex rounded-xl overflow-hidden items-start w-full flex-1 p-5 flex-col justify-between border-[0.5px] border-[#FFFFFF1A] transition-all duration-500 ease-in-out"
                        style={{
                          backgroundImage:
                            "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                        }}
                      >
                        <div className="w-[203px] text-justify relative z-10 text-[13px] leading-5 text-white font-normal">
                          Clear bordered surfaces help reps immediately understand where interactive inputs live, eliminating missed taps.
                        </div>

                        <div
                          className={`w-[300px] h-[614px] left-[279px] absolute bg-cover bg-position-[50%] pointer-events-none z-10 transition-all duration-500 ease-in-out ${
                            expandedFraud1 ? "top-3" : "top-[-76px]"
                          }`}
                          style={{
                            backgroundImage: "url(/projects/edge-crm/06-final.png)",
                          }}
                        />

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="17"
                          viewBox="0 -819.68 680 680"
                          width="17"
                          onClick={() => setExpandedFraud1(!expandedFraud1)}
                          className="cursor-pointer z-20 hover:opacity-80 transition-opacity"
                          style={{ bottom: 18, left: 18, position: "absolute" }}
                          aria-label={expandedFraud1 ? "Collapse card" : "Enlarge card"}
                          role="button"
                          tabIndex={0}
                        >
                          <path
                            d="M85.001-224.986v-226.667h56.667v130.334l357-357H368.334v-56.667h226.667v226.667h-56.667v-130.334L181.334-281.653h130.334v56.667H85.001Z"
                            fill="#7F7F7F"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SEPARATOR 6 */}
            <GrungeSeparator />

            {/* 7. VALIDATION & PRE-FILL SECTION */}
            <section
              id="validation-prefill"
              className="flex w-full flex-col items-start gap-9 scroll-mt-24"
            >
              <div className="flex w-full items-center gap-3">
                <h2
                  style={{
                    fontFamily: HELVETICA,
                    fontSize: "20px",
                    lineHeight: "24px",
                    letterSpacing: "normal",
                    fontWeight: 500,
                    color: "#FFFFFF",
                  }}
                >
                  Validation & Pre-fill
                </h2>
                <span
                  style={{
                    fontFamily: HELVETICA,
                    fontSize: "12px",
                    lineHeight: "16px",
                    letterSpacing: "normal",
                    fontWeight: 400,
                    color: "rgba(255, 255, 255, 0.4)",
                  }}
                >
                  Intelligent Feedback Loop
                </span>
              </div>

              <div className="flex w-full flex-col items-start gap-15">
                <div className="flex w-full flex-col items-start gap-3">
                  <h3
                    style={{
                      fontFamily: HELVETICA,
                      fontSize: "18px",
                      lineHeight: "22px",
                      letterSpacing: "normal",
                      fontWeight: 500,
                      color: "#FFFFFF",
                    }}
                  >
                    1. Reassuring Pre-filled State
                  </h3>
                  <div className="flex w-full flex-col items-start gap-9">
                    <div className="flex w-full flex-col items-start gap-6">
                      <p
                        className="w-full text-[rgba(255,255,255,0.7)] text-base leading-5 font-normal"
                        style={{ fontFamily: HELVETICA }}
                      >
                        Green checkmarks and subtle borders indicate fields pre-populated by the CRM, preventing reps from wasting time re-verifying known account details.
                      </p>
                    </div>

                    {/* 3 Metric Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full h-auto md:h-[294px]">
                      <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 flex-1 shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                        <div
                          className="flex rounded-xl overflow-hidden flex-col items-start justify-between w-full h-full p-4 border-[0.5px] border-[#FFFFFF1A]"
                          style={{
                            backgroundImage:
                              "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                          }}
                        >
                          <div className="text-white text-base leading-[1.2] font-medium" style={{ fontFamily: HELVETICA }}>
                            Pre-fill Clarity
                          </div>
                          <div className="text-[#747474] text-sm leading-5 font-normal" style={{ fontFamily: HELVETICA }}>
                            Reps instantly recognize account details populated automatically by the system.
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 flex-1 shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                        <div
                          className="flex rounded-xl overflow-hidden flex-col items-start justify-between w-full h-full p-4 border-[0.5px] border-[#FFFFFF1A]"
                          style={{
                            backgroundImage:
                              "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                          }}
                        >
                          <div className="text-white text-base leading-[1.2] font-medium" style={{ fontFamily: HELVETICA }}>
                            Inline Warnings
                          </div>
                          <div className="text-[#747474] text-sm leading-5 font-normal" style={{ fontFamily: HELVETICA }}>
                            Specific error cues pinpoint exactly what failed before form submission.
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 flex-1 shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                        <div
                          className="flex rounded-xl overflow-hidden flex-col items-start justify-between w-full h-full p-4 border-[0.5px] border-[#FFFFFF1A]"
                          style={{
                            backgroundImage:
                              "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                          }}
                        >
                          <div className="text-white text-base leading-[1.2] font-medium" style={{ fontFamily: HELVETICA }}>
                            Instant Resolution
                          </div>
                          <div className="text-[#747474] text-sm leading-5 font-normal" style={{ fontFamily: HELVETICA }}>
                            Clear prompts guide reps on how to fix issues in one single step.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SEPARATOR 7 */}
            <GrungeSeparator />

            {/* 8. THE OVERALL IMPACT */}
            <section
              id="impact"
              className="flex w-full flex-col items-start gap-9 scroll-mt-24"
            >
              <div className="flex w-full items-center gap-3">
                <h2
                  style={{
                    fontFamily: HELVETICA,
                    fontSize: "20px",
                    lineHeight: "24px",
                    letterSpacing: "normal",
                    fontWeight: 500,
                    color: "#FFFFFF",
                  }}
                >
                  The Overall Impact
                </h2>
                <span
                  style={{
                    fontFamily: HELVETICA,
                    fontSize: "12px",
                    lineHeight: "16px",
                    letterSpacing: "normal",
                    fontWeight: 400,
                    color: "rgba(255, 255, 255, 0.4)",
                  }}
                >
                  Outcomes & Field Adoption
                </span>
              </div>

              <div className="flex w-full flex-col items-start gap-6">
                <p
                  className="w-full text-[rgba(255,255,255,0.7)] text-base leading-5 font-normal"
                  style={{ fontFamily: HELVETICA }}
                >
                  By structuring the flow with progressive disclosure and unambiguous field grammar, we transformed a frustrating chore into an efficient tool reps trust daily.
                </p>

                {/* 4 Impact Bento Cards Grid (2x2) */}
                <div className="flex flex-col gap-4 w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    {/* Impact Card 1 */}
                    <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 w-full shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                      <div
                        className="flex rounded-xl overflow-hidden flex-col items-start justify-between w-full h-full min-h-[285px] p-4 border-[0.5px] border-[#FFFFFF1A]"
                        style={{
                          backgroundImage:
                            "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 0 24 24" width="48" fill="#FFFFFF" className="shrink-0">
                          <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z" />
                        </svg>
                        <div className="flex flex-col items-start gap-3 w-full">
                          <div className="text-white text-base leading-[1.2] font-medium" style={{ fontFamily: HELVETICA }}>
                            40% Logging Speed
                          </div>
                          <div className="text-[#747474] text-sm leading-5 font-normal" style={{ fontFamily: HELVETICA }}>
                            Reduced average completion time from ~4 minutes to under 2 minutes per case.
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Impact Card 2 */}
                    <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 w-full shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                      <div
                        className="flex rounded-xl overflow-hidden flex-col items-start justify-between w-full h-full min-h-[285px] p-4 border-[0.5px] border-[#FFFFFF1A]"
                        style={{
                          backgroundImage:
                            "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 0 24 24" width="48" fill="#FFFFFF" className="shrink-0">
                          <path d="m23 12-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69L23 12zm-12.91 4.72-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z" />
                        </svg>
                        <div className="flex flex-col items-start gap-3 w-full">
                          <div className="text-white text-base leading-[1.2] font-medium" style={{ fontFamily: HELVETICA }}>
                            Zero Validation Churn
                          </div>
                          <div className="text-[#747474] text-sm leading-5 font-normal" style={{ fontFamily: HELVETICA }}>
                            Eliminated recurring field validation failures with real-time inline guidance.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    {/* Impact Card 3 */}
                    <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 w-full shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                      <div
                        className="flex rounded-xl overflow-hidden flex-col items-start justify-between w-full h-full min-h-[285px] p-4 border-[0.5px] border-[#FFFFFF1A]"
                        style={{
                          backgroundImage:
                            "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 0 24 24" width="48" fill="#FFFFFF" className="shrink-0">
                          <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
                        </svg>
                        <div className="flex flex-col items-start gap-3 w-full">
                          <div className="text-white text-base leading-[1.2] font-medium" style={{ fontFamily: HELVETICA }}>
                            Higher Rep Confidence
                          </div>
                          <div className="text-[#747474] text-sm leading-5 font-normal" style={{ fontFamily: HELVETICA }}>
                            Enhanced rep confidence during live client calls without awkward pauses.
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Impact Card 4 */}
                    <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 w-full shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                      <div
                        className="flex rounded-xl overflow-hidden flex-col items-start justify-between w-full h-full min-h-[285px] p-4 border-[0.5px] border-[#FFFFFF1A]"
                        style={{
                          backgroundImage:
                            "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 0 24 24" width="48" fill="#FFFFFF" className="shrink-0">
                          <path d="M9 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 8c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm-6 4c.22-.72 3.31-2 6-2 2.7 0 5.8 1.29 6 2H3zm15.6-7.6l-3.2-3.2-1.4 1.4 4.6 4.6 7.4-7.4-1.4-1.4z" />
                        </svg>
                        <div className="flex flex-col items-start gap-3 w-full">
                          <div className="text-white text-base leading-[1.2] font-medium" style={{ fontFamily: HELVETICA }}>
                            Enterprise Adoption
                          </div>
                          <div className="text-[#747474] text-sm leading-5 font-normal" style={{ fontFamily: HELVETICA }}>
                            Adopted across the entire 12 Grids national field sales organization.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SEPARATOR 8 */}
            <GrungeSeparator />

            {/* 9. MY LEARNING SECTION */}
            <section
              id="reflection"
              className="flex w-full flex-col items-start gap-9 scroll-mt-24"
            >
              <div className="flex w-full items-center gap-3">
                <h2
                  style={{
                    fontFamily: HELVETICA,
                    fontSize: "20px",
                    lineHeight: "24px",
                    letterSpacing: "normal",
                    fontWeight: 500,
                    color: "#FFFFFF",
                  }}
                >
                  My Learning from this Case Study
                </h2>
                <span
                  style={{
                    fontFamily: HELVETICA,
                    fontSize: "12px",
                    lineHeight: "16px",
                    letterSpacing: "normal",
                    fontWeight: 400,
                    color: "rgba(255, 255, 255, 0.4)",
                  }}
                >
                  Reflection & Principles
                </span>
              </div>

              <div
                className="flex flex-col gap-4 text-sm sm:text-base leading-relaxed text-neutral-300"
                style={{ fontFamily: HELVETICA }}
              >
                <p>
                  Designing for high-pressure B2B workflows is never about adding more interface; it is about ruthlessly eliminating cognitive noise.
                </p>
                <p>
                  By testing early with real reps under actual mid-call conditions, we uncovered friction points that no static wireframe could ever have revealed.
                </p>
              </div>
            </section>

            {/* SEPARATOR 9 */}
            <GrungeSeparator />

            {/* 10. UI MOCKUPS & PLAYGROUND SECTION */}
            <section
              id="ui-mockups"
              className="flex w-full flex-col items-start gap-9 scroll-mt-24"
            >
              <div className="flex w-full items-center gap-3">
                <h2
                  style={{
                    fontFamily: HELVETICA,
                    fontSize: "20px",
                    lineHeight: "24px",
                    letterSpacing: "normal",
                    fontWeight: 500,
                    color: "#FFFFFF",
                  }}
                >
                  UI Mockups
                </h2>
                <span
                  style={{
                    fontFamily: HELVETICA,
                    fontSize: "12px",
                    lineHeight: "16px",
                    letterSpacing: "normal",
                    fontWeight: 400,
                    color: "rgba(255, 255, 255, 0.4)",
                  }}
                >
                  Interactive Flow & Playground
                </span>
              </div>

              {/* IDLE STATE PLAYGROUND CARD */}
              <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 w-full shrink-0 shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                <div
                  className="rounded-xl overflow-hidden self-stretch flex-1 relative bg-origin-border border-[0.5px] border-[#FFFFFF1A] px-4 py-8 sm:px-6 sm:py-10 flex flex-col items-center justify-center gap-8"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                  }}
                >
                  {/* Mockups Row */}
                  <div className="flex items-center justify-center gap-6 sm:gap-10">
                    <img
                      src="/projects/edge-crm/01-before.png"
                      alt="Before screen"
                      className="h-[260px] sm:h-[340px] w-auto object-contain select-none pointer-events-none"
                    />
                    <img
                      src="/projects/edge-crm/06-final.png"
                      alt="After screen"
                      className="h-[260px] sm:h-[340px] w-auto object-contain select-none pointer-events-none"
                    />
                  </div>

                  {/* Open Playground Button */}
                  <button
                    onClick={() => setIsPlaygroundOpen(true)}
                    className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105 active:scale-95 cursor-pointer"
                    style={{ fontFamily: HELVETICA }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polygon points="10 8 16 12 10 16 10 8" />
                    </svg>
                    Open Playground
                  </button>
                </div>
              </div>

              {/* Bottom Nav Links */}
              <div className="w-full flex items-center justify-between pt-6 border-t border-white/10 mt-4">
                <Link
                  href="/case-studies"
                  className="text-sm font-mono text-neutral-400 hover:text-white transition-colors"
                >
                  ← All Case Studies
                </Link>
                <Link
                  href="/case-studies/vote-in"
                  className="text-sm font-mono text-neutral-400 hover:text-white transition-colors"
                >
                  Next: Vote IN →
                </Link>
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* ========================================================================= */}
      {/* INFINITE CANVAS PLAYGROUND MODAL (playground/onClick)                      */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isPlaygroundOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl overflow-hidden select-none"
          >
            {/* Modal Header Bar */}
            <div className="absolute top-4 left-6 right-6 z-50 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-white/50 uppercase tracking-wider">
                  Interactive Canvas
                </span>
                <span className="text-white/30">•</span>
                <span className="text-xs text-white/70" style={{ fontFamily: HELVETICA }}>
                  Drag to pan · Scroll to zoom
                </span>
              </div>

              <button
                onClick={() => setIsPlaygroundOpen(false)}
                className="pointer-events-auto flex size-8 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white cursor-pointer"
                aria-label="Close playground"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Canvas Surface with Drag Pan & Wheel Zoom */}
            <div
              className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center overflow-hidden"
              onPointerDown={(e) => {
                setIsDraggingCanvas(true);
                dragStartRef.current = {
                  x: e.clientX,
                  y: e.clientY,
                  panX: canvasPan.x,
                  panY: canvasPan.y,
                };
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
              onPointerUp={() => setIsDraggingCanvas(false)}
              onPointerLeave={() => setIsDraggingCanvas(false)}
              onWheel={(e) => {
                e.preventDefault();
                const delta = e.deltaY * -0.0015;
                setCanvasZoom((prev) => Math.min(Math.max(0.35, prev + delta), 2.5));
              }}
            >
              {/* Canvas Content Plane */}
              <div
                style={{
                  transform: `translate(${canvasPan.x}px, ${canvasPan.y}px) scale(${canvasZoom})`,
                  transformOrigin: "center center",
                  transition: isDraggingCanvas ? "none" : "transform 0.1s ease-out",
                }}
                className="flex items-center justify-center gap-12 sm:gap-20 p-20"
              >
                <img
                  src="/projects/edge-crm/01-before.png"
                  alt="Before screen"
                  className="h-[520px] w-auto object-contain pointer-events-none select-none"
                />
                <img
                  src="/projects/edge-crm/06-final.png"
                  alt="After screen"
                  className="h-[520px] w-auto object-contain pointer-events-none select-none"
                />
              </div>
            </div>

            {/* Bottom Floating Canvas Toolbar */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-4 py-2 backdrop-blur-md shadow-2xl">
              <button
                onClick={() => setCanvasZoom((prev) => Math.max(0.35, prev - 0.15))}
                className="flex size-7 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                aria-label="Zoom out"
              >
                -
              </button>
              <span className="font-mono text-xs text-white/70 min-w-12 text-center select-none">
                {Math.round(canvasZoom * 100)}%
              </span>
              <button
                onClick={() => setCanvasZoom((prev) => Math.min(2.5, prev + 0.15))}
                className="flex size-7 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                aria-label="Zoom in"
              >
                +
              </button>
              <div className="h-3 w-px bg-white/20 mx-1" />
              <button
                onClick={() => {
                  setCanvasZoom(0.75);
                  setCanvasPan({ x: 0, y: 0 });
                }}
                className="text-xs font-mono text-white/50 hover:text-white transition-colors px-1 cursor-pointer"
              >
                Reset
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
