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
  { id: "verification-complexity", label: "Verification Complexity" },
  { id: "fraud-concerns", label: "Fraud Concerns" },
  { id: "trust-in-digital-systems", label: "Trust in Digital Systems" },
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

export function VoteInCaseStudy() {
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
              A digital platform for the Indian citizens to cast and verify
              their vote online.
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
                  Product Designer
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
                  TIMELINE
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
                  Jan - Feb 2024
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
                  0 to 1 product design
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
                      Voting at your fingerprints
                    </h2>
                  </div>

                  {/* Smartphone App Screen Mockup */}
                  <div
                    className="absolute left-1/2 top-[104.5px] w-[219px] h-[446px] -translate-x-1/2 bg-cover bg-center pointer-events-none z-10"
                    style={{
                      backgroundImage:
                        "url(https://app.paper.design/file-assets/01M03KW12YSNP0MEZXDDWH0QJZ/7GN69EPV75NRVXHCDTJFA6TDPZ.png)",
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
                    User can literally cast there vote under
                  </span>
                  <span
                    style={{
                      fontStyle: "italic",
                      fontWeight: 400,
                      color: "rgba(255, 255, 255, 0.7)",
                    }}
                  >
                    10
                  </span>
                  <span
                    style={{
                      fontStyle: "italic",
                      fontWeight: 400,
                      color: "rgba(255, 255, 255, 0.7)",
                    }}
                  >
                    clicks
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
                <p>That was what I thought before actually designing this app.</p>
                <p>
                  But eventually during my research and one-to-one interview with
                  all the representatives who showed their interest for this
                  product, I came to know that it won&apos;t be possible. So
                  that&apos;s why I had to change some things.
                </p>
                <p>
                  Although the main issue was eventually fixed with the help of
                  some key important KPIs that I got from the user research.
                </p>
                <p>
                  I&apos;m thankful that I did the user research to know the
                  actual pain points rather than designing this product taking me
                  as the ideal user base.
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
                    Vote IN is a democracy app that simplifies access to the
                    voting process.
                  </p>
                  <p>
                    Citizens can register, verify their status, and cast their
                    votes instantly, all in one simple, user-friendly platform.
                    (a brief intro)
                  </p>
                </div>

                {/* 3 Square Cards in a Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                  {/* Card 1: Fraud Concerns */}
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
                          Fraud Concerns
                        </div>
                        <div className="self-stretch text-white text-base leading-5">
                          Fraudulent actions reduced by huge margin
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Long Queues */}
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
                          Long Queues
                        </div>
                        <div className="self-stretch text-white text-base leading-5">
                          Verifying individual votes got easier.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Fraud Concerns */}
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
                          Fraud Concerns
                        </div>
                        <div className="self-stretch text-white text-base leading-5">
                          Fraudulent actions reduced by huge margin
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
                      A secure, seamless voting platform for identity verification & transparent voting, protected against fraud, duplicate votes.
                    </div>
                  </div>
                  {/* Bottom Row: 2 Columns */}
                  <div className="flex items-end gap-3 w-full justify-center">
                    <div className="flex-1 font-normal text-[rgba(255,255,255,0.7)] text-base leading-5">
                      The Government of India is transitioning from traditional offline voting to a centralized online voting system.
                    </div>
                    <div className="flex-1 font-normal text-[rgba(255,255,255,0.7)] text-base leading-5">
                      This system will enable citizens to cast their votes digitally, eliminating the need for physical polling stations.
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
                    I usually try to break the problem statement into small
                    blocks, then eventually pick the ones which actually align
                    with the main goal, which is giving the Indian citizens a
                    platform to cast there vote in online.
                  </p>
                  <p className="text-white font-normal">
                    So, I stood with three problem buckets.
                  </p>
                </div>

                {/* 3 Taller Cards in a Row with HalftoneDots shader and gradient overlay */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full h-auto sm:h-[294px]">
                  {/* Card 1: Verification Complexity */}
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
                          Verification{"\n"}Complexity
                        </div>
                        <div
                          className="self-stretch text-[#747474] text-sm leading-5"
                          style={{ fontFamily: HELVETICA }}
                        >
                          Users used to struggle with identity verification
                          steps, especially if they involve multiple documents.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Trust in Digital Systems */}
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
                          Trust in Digital{"\n"}Systems
                        </div>
                        <div
                          className="self-stretch text-[#747474] text-sm leading-5"
                          style={{ fontFamily: HELVETICA }}
                        >
                          Users feel apprehensive about the security and
                          transparency of the online voting process.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Fraud Concerns */}
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
                          className="w-fit text-white text-base leading-[18px]"
                          style={{ fontFamily: HELVETICA }}
                        >
                          Fraud Concerns
                        </div>
                        <div
                          className="self-stretch text-[#747474] text-sm leading-5"
                          style={{ fontFamily: HELVETICA }}
                        >
                          Users may worry about the possibility of their identity
                          being misused for duplicate voting or other fraudulent
                          activities.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SEPARATOR 5 */}
            <GrungeSeparator />

            {/* 6. VERIFICATION COMPLEXITY SECTION */}
            <section
              id="verification-complexity"
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
                  Verification Complexity
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
                  Simplifying the Verification Process
                </span>
              </div>

              <div className="flex w-full flex-col items-start gap-15">
                {/* Subsection 1: 1. Lack of Visibility */}
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
                    1. Lack of Visibility
                  </h3>
                  <div className="flex w-full flex-col items-start gap-9">
                    <div className="flex w-full flex-col items-start gap-6">
                      <p
                        className="w-full font-normal text-[rgba(255,255,255,0.7)] text-base leading-5"
                        style={{ fontFamily: HELVETICA }}
                      >
                        Users had limited visibility into where they were in the verification process, making the journey feel uncertain and disconnected.
                      </p>
                      <p
                        className="w-full font-medium text-white text-base leading-5"
                        style={{ fontFamily: HELVETICA }}
                      >
                        For the new verification flow, we improved clarity by:
                      </p>
                      <div className="flex w-full flex-col items-start gap-3">
                        <p className="w-full text-[rgba(255,255,255,0.7)] text-base leading-5" style={{ fontFamily: HELVETICA }}>
                          • Introducing a progress bar to show users where they are in the process
                        </p>
                        <p className="w-full text-[rgba(255,255,255,0.7)] text-base leading-5" style={{ fontFamily: HELVETICA }}>
                          • Adding real-time notifications to keep users informed of verification updates
                        </p>
                        <p className="w-full text-[rgba(255,255,255,0.7)] text-base leading-5" style={{ fontFamily: HELVETICA }}>
                          • Using a prominent CTA to create a familiar, form-like experience and guide users
                        </p>
                      </div>
                    </div>

                    {/* Card 1: Login Page with Annotations */}
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
                            backgroundImage:
                              "url(https://app.paper.design/file-assets/01M03KW12YSNP0MEZXDDWH0QJZ/7GN69EPV75NRVXHCDTJFA6TDPZ.png)",
                          }}
                        />

                        {/* Tag Label at Top-Left */}
                        <div className="w-fit absolute left-5 top-[18px] text-[#FFFFFF66] text-base leading-5 font-normal z-10">
                          Login Page
                        </div>

                        {/* Annotation 1: Progress Bar */}
                        <div className="w-[162px] text-justify left-[29px] top-[134px] absolute text-white text-[13px] leading-5 font-normal z-10">
                          Progress bar to let the user know where are they in the verification process
                        </div>
                        {/* Connecting Line 1 */}
                        <div className="w-[63px] h-[3px] left-[202px] top-[157px] absolute z-10 pointer-events-none">
                          <div className="top-[1px] h-px absolute bg-[#5E5E5E] inset-x-0" />
                          <div className="-left-px top-0 w-[3px] h-[3px] rounded-full absolute bg-[#5E5E5E]" />
                          <div className="top-0 w-[3px] h-[3px] rounded-full right-0 absolute bg-[#5E5E5E]" />
                        </div>

                        {/* Annotation 2: Notification Section */}
                        <div className="w-[162px] text-justify left-[29px] top-[220px] absolute text-white text-[13px] leading-5 font-normal z-10">
                          Notification section to give feeadback to the user
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

                {/* Subsection 2: 2. Time-Consuming Verification */}
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
                    2. Time-Consuming Verification
                  </h3>
                  <div className="flex w-full flex-col items-start gap-9">
                    <div className="flex w-full flex-col items-start gap-6">
                      <p
                        className="w-full font-normal text-[rgba(255,255,255,0.7)] text-base leading-5"
                        style={{ fontFamily: HELVETICA }}
                      >
                        Users previously had to wait while their documents were manually verified, making the process unnecessarily slow.
                      </p>
                      <p
                        className="w-full font-medium text-white text-base leading-5"
                        style={{ fontFamily: HELVETICA }}
                      >
                        We streamlined verification by:
                      </p>
                      <div className="flex w-full flex-col items-start gap-3">
                        <p className="w-full text-[rgba(255,255,255,0.7)] text-base leading-5" style={{ fontFamily: HELVETICA }}>
                          • Requiring users to enter only their phone number
                        </p>
                        <p className="w-full text-[rgba(255,255,255,0.7)] text-base leading-5" style={{ fontFamily: HELVETICA }}>
                          • Automatically retrieving required documents from DigiLocker
                        </p>
                        <p className="w-full text-[rgba(255,255,255,0.7)] text-base leading-5" style={{ fontFamily: HELVETICA }}>
                          • Eliminating unnecessary manual document uploads and verification steps
                        </p>
                      </div>
                    </div>

                    {/* Card 2: Digilocker Integration with Annotations */}
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
                          className="w-[327px] h-[664px] top-[-324px] left-[236px] absolute bg-cover bg-center pointer-events-none z-10"
                          style={{
                            backgroundImage:
                              "url(https://app.paper.design/file-assets/01M03KW12YSNP0MEZXDDWH0QJZ/01M070C9C1JDDENP7HQ2RWSQA8.png)",
                          }}
                        />

                        {/* Annotation 1: Notification section feedback */}
                        <div className="w-[162px] text-justify left-[34px] top-[68px] absolute text-white text-[13px] leading-5 font-normal z-10">
                          The notification section gives the user a feedback that there informations are fetched properly.
                        </div>
                        {/* Connecting Line 1 */}
                        <div className="w-[136px] h-[3px] left-[145px] top-[138px] absolute z-10 pointer-events-none">
                          <div className="top-[1px] h-px absolute bg-[#5E5E5E] inset-x-0" />
                          <div className="-left-px top-0 w-[3px] h-[3px] rounded-full absolute bg-[#5E5E5E]" />
                          <div className="top-0 w-[3px] h-[3px] rounded-full right-0 absolute bg-[#5E5E5E]" />
                        </div>

                        {/* Annotation 2: Refetch data */}
                        <div className="w-[162px] text-justify left-[34px] top-[175px] absolute text-white text-[13px] leading-5 font-normal z-10">
                          Users can refetch there data if there is some issue in the server or so some data is incorrect.
                        </div>
                        {/* Stepped Connecting Line 2 */}
                        <div className="w-[153px] h-[33px] left-[204px] top-[164px] absolute z-10 pointer-events-none">
                          <div className="left-px top-[31px] h-px right-[133px] absolute bg-[#5E5E5E]" />
                          <div className="left-[19px] top-px h-px right-px absolute bg-[#5E5E5E]" />
                          <div className="left-[19px] top-px w-px h-[31px] absolute bg-[#5E5E5E]" />
                          <div className="top-[30px] -left-px w-[3px] h-[3px] rounded-full absolute bg-[#5E5E5E]" />
                          <div className="top-0 right-0 w-[3px] h-[3px] rounded-full absolute bg-[#5E5E5E]" />
                        </div>

                        {/* Tag Label at Bottom-Left */}
                        <div className="w-fit absolute left-5 top-[317px] text-[#FFFFFF66] text-base leading-5 font-normal z-10">
                          Digilocker Integration
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subsection 3: 3. Uncertainty During Document Retrieval */}
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
                    3. Uncertainty During Document Retrieval
                  </h3>
                  <div className="flex w-full flex-col items-start gap-9">
                    <div className="flex w-full flex-col items-start gap-6">
                      <p
                        className="w-full font-normal text-[rgba(255,255,255,0.7)] text-base leading-5"
                        style={{ fontFamily: HELVETICA }}
                      >
                        Fetching documents from DigiLocker can take some time, leaving users unsure whether the process is still running.
                      </p>
                      <p
                        className="w-full font-medium text-white text-base leading-5"
                        style={{ fontFamily: HELVETICA }}
                      >
                        To keep users informed, we introduced:
                      </p>
                      <div className="flex w-full flex-col items-start gap-3">
                        <p className="w-full text-[rgba(255,255,255,0.7)] text-base leading-5" style={{ fontFamily: HELVETICA }}>
                          • A real-time notification section showing the current retrieval status
                        </p>
                        <p className="w-full text-[rgba(255,255,255,0.7)] text-base leading-5" style={{ fontFamily: HELVETICA }}>
                          • Clear updates while documents are being fetched from DigiLocker
                        </p>
                        <p className="w-full text-[rgba(255,255,255,0.7)] text-base leading-5" style={{ fontFamily: HELVETICA }}>
                          • A Refetch Data option if the information is not retrieved successfully
                        </p>
                      </div>
                    </div>

                    {/* Card 3: Retrieving Documents */}
                    <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 w-full h-[366px] shrink-0 shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                      <div
                        className="relative flex rounded-xl overflow-hidden items-start w-full flex-1 px-4.5 py-5 flex-col justify-between border-[0.5px] border-[#FFFFFF1A]"
                        style={{
                          backgroundImage:
                            "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                        }}
                      >
                        {/* Smartphone Mockup */}
                        <div
                          className="absolute bg-cover bg-center pointer-events-none z-10"
                          style={{
                            backgroundImage:
                              "url(https://app.paper.design/file-assets/01M03KW12YSNP0MEZXDDWH0QJZ/01M070C9C1JDDENP7HQ2RWSQA8.png)",
                            left: "349px",
                            top: "-113px",
                            width: "219px",
                            height: "449px",
                          }}
                        />

                        {/* Text Description */}
                        <div className="w-[266px] text-justify relative z-10 text-[13px] leading-5 text-white font-normal">
                          I used a notification section to provide real-time updates while documents are being fetched from DigiLocker. Since the retrieval process can take some time, these updates keep users informed about the verification status and reduce uncertainty or the need to wait without feedback.
                        </div>

                        {/* Tag Label */}
                        <div className="w-fit relative z-10 text-[#FFFFFF66] text-base leading-5 font-normal">
                          Retriving Documents
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SEPARATOR 6 */}
            <GrungeSeparator />

            {/* 7. FRAUD CONCERNS SECTION */}
            <section
              id="fraud-concerns"
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
                  Fraud Concerns
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
                  Ensuring Trust and Preventing Fraud
                </span>
              </div>

              <div className="flex w-full flex-col items-start gap-15">
                {/* Subsection 1: 1. Vote Confirmation */}
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
                    1. Vote Confirmation
                  </h3>
                  <div className="flex w-full flex-col items-start gap-9">
                    <div className="flex w-full flex-col items-start gap-6">
                      <p
                        className="w-full text-[rgba(255,255,255,0.7)] text-base leading-5 font-normal"
                        style={{ fontFamily: HELVETICA }}
                      >
                        Once the user successfully casts their vote, the system generates a unique voting ID as a digital proof of submission. This gives users a clear confirmation that their vote has been successfully recorded without requiring them to rely solely on the confirmation screen.
                      </p>
                      <p
                        className="w-full font-medium text-white text-base leading-5"
                        style={{ fontFamily: HELVETICA }}
                      >
                        The flow was designed to:
                      </p>
                      <div className="flex w-full flex-col items-start gap-3">
                        <p className="w-full text-[rgba(255,255,255,0.7)] text-base leading-5" style={{ fontFamily: HELVETICA }}>
                          • Generate a unique ID immediately after voting
                        </p>
                        <p className="w-full text-[rgba(255,255,255,0.7)] text-base leading-5" style={{ fontFamily: HELVETICA }}>
                          • Clearly communicate that the vote has been recorded
                        </p>
                        <p className="w-full text-[rgba(255,255,255,0.7)] text-base leading-5" style={{ fontFamily: HELVETICA }}>
                          • Give users a reference they can save for later verification
                        </p>
                        <p className="w-full text-[rgba(255,255,255,0.7)] text-base leading-5" style={{ fontFamily: HELVETICA }}>
                          • Create a clear separation between casting the vote and verifying the vote
                        </p>
                      </div>
                    </div>

                    {/* Card 1: Vote Confirmation */}
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
                        {/* Text Description on Left */}
                        <div className="w-[203px] text-justify relative z-10 text-[13px] leading-5 text-white font-normal">
                          A clear progress bar helps users understand where they are in the verification process, while real-time notifications keep them informed of important updates. A prominent CTA guides users through each step, creating a familiar, form-like experience that feels clear and intuitive.
                        </div>

                        {/* Smartphone Mockup - expands from cropped to full view */}
                        <div
                          className={`w-[300px] h-[614px] left-[279px] absolute bg-cover bg-position-[50%] pointer-events-none z-10 transition-all duration-500 ease-in-out ${
                            expandedFraud1 ? "top-3" : "top-[-76px]"
                          }`}
                          style={{
                            backgroundImage:
                              "url(https://app.paper.design/file-assets/01M03KW12YSNP0MEZXDDWH0QJZ/01M09QHN4SN8XPHHGTMD6DE1D6.png)",
                          }}
                        />

                        {/* Enlarge Icon from Paper Canvas */}
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

                {/* Subsection 2: 2. Independent Vote Verification */}
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
                    2. Independent Vote Verification
                  </h3>
                  <div className="flex w-full flex-col items-start gap-9">
                    <div className="flex w-full flex-col items-start gap-6">
                      <p
                        className="w-full text-[rgba(255,255,255,0.7)] text-base leading-5 font-normal"
                        style={{ fontFamily: HELVETICA }}
                      >
                        After receiving their unique ID, users can return to the verification section and enter the ID to independently confirm their vote. The system checks the ID against the recorded voting data and shows the party associated with that vote, allowing users to validate that their vote was recorded as intended.
                      </p>
                      <p
                        className="w-full font-medium text-white text-base leading-5"
                        style={{ fontFamily: HELVETICA }}
                      >
                        This helps to:
                      </p>
                      <div className="flex w-full flex-col items-start gap-3">
                        <p className="w-full text-[rgba(255,255,255,0.7)] text-base leading-5" style={{ fontFamily: HELVETICA }}>
                          • Let users verify their vote independently
                        </p>
                        <p className="w-full text-[rgba(255,255,255,0.7)] text-base leading-5" style={{ fontFamily: HELVETICA }}>
                          • Confirm that their unique ID is valid
                        </p>
                        <p className="w-full text-[rgba(255,255,255,0.7)] text-base leading-5" style={{ fontFamily: HELVETICA }}>
                          • Show the party linked to the recorded vote
                        </p>
                        <p className="w-full text-[rgba(255,255,255,0.7)] text-base leading-5" style={{ fontFamily: HELVETICA }}>
                          • Increase transparency and trust in the voting process
                        </p>
                      </div>
                    </div>

                    {/* Card 2: Independent Vote Verification */}
                    <div
                      className={`flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 w-full shrink-0 shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F] transition-all duration-500 ease-in-out ${
                        expandedFraud2 ? "h-[600px]" : "h-[366px]"
                      }`}
                    >
                      <div
                        className="relative flex rounded-xl overflow-hidden items-start w-full flex-1 p-5 flex-col justify-between border-[0.5px] border-[#FFFFFF1A] transition-all duration-500 ease-in-out"
                        style={{
                          backgroundImage:
                            "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                        }}
                      >
                        {/* Text Description on Left */}
                        <div className="w-[266px] text-justify relative z-10 text-[13px] leading-5 text-white font-normal">
                          Users no longer need to wait for manual document verification. They simply enter their phone number, and the required documents are securely retrieved from DigiLocker, making the verification process faster and more seamless.
                        </div>

                        {/* Smartphone Mockup - expands from cropped to full view */}
                        <div
                          className={`w-[270px] h-[551px] left-[314px] absolute bg-cover bg-position-[50%] pointer-events-none z-10 transition-all duration-500 ease-in-out ${
                            expandedFraud2 ? "top-5" : "top-[10px]"
                          }`}
                          style={{
                            backgroundImage:
                              "url(https://app.paper.design/file-assets/01M03KW12YSNP0MEZXDDWH0QJZ/01M09QDFD1C23RFRA0RJQB88JY.png)",
                          }}
                        />

                        {/* Enlarge Icon from Paper Canvas */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="17"
                          viewBox="0 -819.68 680 680"
                          width="17"
                          onClick={() => setExpandedFraud2(!expandedFraud2)}
                          className="cursor-pointer z-20 hover:opacity-80 transition-opacity"
                          style={{ bottom: 18, left: 22, position: "absolute" }}
                          aria-label={expandedFraud2 ? "Collapse card" : "Enlarge card"}
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

                {/* Subsection 3: 3. Uncertainty During Document Retrieval */}
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
                    3. Uncertainty During Document Retrieval
                  </h3>
                  <div className="flex w-full flex-col items-start gap-9">
                    <div className="flex w-full flex-col items-start gap-6">
                      <p
                        className="w-full text-[rgba(255,255,255,0.7)] text-base leading-5 font-normal"
                        style={{ fontFamily: HELVETICA }}
                      >
                        Fetching documents from DigiLocker can take some time, leaving users unsure whether the process is still running.
                      </p>
                      <p
                        className="w-full font-medium text-white text-base leading-5"
                        style={{ fontFamily: HELVETICA }}
                      >
                        To keep users informed, we introduced:
                      </p>
                      <div className="flex w-full flex-col items-start gap-3">
                        <p className="w-full text-[rgba(255,255,255,0.7)] text-base leading-5" style={{ fontFamily: HELVETICA }}>
                          • A real-time notification section showing the current retrieval status
                        </p>
                        <p className="w-full text-[rgba(255,255,255,0.7)] text-base leading-5" style={{ fontFamily: HELVETICA }}>
                          • Clear updates while documents are being fetched from DigiLocker
                        </p>
                        <p className="w-full text-[rgba(255,255,255,0.7)] text-base leading-5" style={{ fontFamily: HELVETICA }}>
                          • A Refetch Data option if the information is not retrieved successfully
                        </p>
                      </div>
                    </div>

                    {/* Card 3: Uncertainty During Document Retrieval */}
                    <div
                      className={`flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 w-full shrink-0 shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F] transition-all duration-500 ease-in-out ${
                        expandedFraud3 ? "h-[600px]" : "h-[366px]"
                      }`}
                    >
                      <div
                        className="relative flex rounded-xl overflow-hidden items-start w-full flex-1 p-5 flex-col justify-between border-[0.5px] border-[#FFFFFF1A] transition-all duration-500 ease-in-out"
                        style={{
                          backgroundImage:
                            "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                        }}
                      >
                        {/* Text Description on Left */}
                        <div className="w-[266px] text-justify relative z-10 text-[13px] leading-5 text-white font-normal">
                          I used a notification section to provide real-time updates while documents are being fetched from DigiLocker. Since the retrieval process can take some time, these updates keep users informed about the verification status and reduce uncertainty or the need to wait without feedback.
                        </div>

                        <div className="relative z-10 text-[rgba(255,255,255,0.4)] text-base leading-5" style={{ fontFamily: HELVETICA }}>
                          Retriving Documents
                        </div>

                        {/* Smartphone Mockup - expands from cropped to full view */}
                        <div
                          className={`w-[219px] h-[449px] left-[349px] absolute bg-cover bg-position-[50%] pointer-events-none z-10 transition-all duration-500 ease-in-out ${
                            expandedFraud3 ? "top-5" : "top-[-60px]"
                          }`}
                          style={{
                            backgroundImage:
                              "url(https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M070C9C1JDDENP7HQ2RWSQA8.png)",
                          }}
                        />

                        {/* Enlarge Icon from Paper Canvas */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="17"
                          viewBox="0 -819.68 680 680"
                          width="17"
                          onClick={() => setExpandedFraud3(!expandedFraud3)}
                          className="cursor-pointer z-20 hover:opacity-80 transition-opacity"
                          style={{ bottom: 18, left: 18, position: "absolute" }}
                          aria-label={expandedFraud3 ? "Collapse card" : "Enlarge card"}
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

            {/* SEPARATOR 7 */}
            <GrungeSeparator />

            {/* SECTION 8: TRUST IN DIGITAL SYSTEMS */}
            <section
              id="trust-in-digital-systems"
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
                  Trust in DigitalSystems
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
                  Ensuring Trust and Preventing Fraud
                </span>
              </div>

              <div className="flex w-full flex-col items-start gap-15">
                {/* Subsection 1: 1. Familiarity Through Physical Interaction */}
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
                    1. Familiarity Through Physical Interaction
                  </h3>
                  <div className="flex w-full flex-col items-start gap-9">
                    <div className="flex w-full flex-col items-start gap-6">
                      <p
                        className="w-full text-[rgba(255,255,255,0.7)] text-base leading-5 font-normal"
                        style={{ fontFamily: HELVETICA }}
                      >
                        For a digital voting experience, one of the biggest challenges was making the interaction feel as trustworthy and tangible as the physical voting process. Instead of designing a conventional candidate-selection list, I intentionally took visual and interaction cues from the Electronic Voting Machine (EVM) used in physical elections.
                      </p>

                      {/* Accent Callout Bar matching Paper Canvas */}
                      <div
                        className="flex items-center rounded-[1px] gap-3 w-full py-2"
                        style={{
                          backgroundImage:
                            "linear-gradient(in oklab 90.67deg, oklab(61.5% 0 0 / 16%) 50%, oklab(80% 0 0 / 0%) 99.99%)",
                        }}
                      >
                        <div className="w-0.5 rounded-full self-stretch shrink-0 bg-[#989100]" />
                        <div
                          className="flex-1 font-normal italic text-[rgba(255,255,255,0.5)] text-base leading-5 tracking-[-0.02em]"
                          style={{ fontFamily: HELVETICA }}
                        >
                          The goal was to make the digital interaction feel familiar, so users immediately understand who they are selecting, where they need to tap, and when their choice has been registered.
                        </div>
                      </div>

                      <p
                        className="w-full font-medium text-white text-base leading-5"
                        style={{ fontFamily: HELVETICA }}
                      >
                        Building Trust Through Familiarity :
                      </p>
                      <p
                        className="w-full text-white text-base leading-5 font-normal"
                        style={{ fontFamily: HELVETICA }}
                      >
                        I designed the candidate-selection interface to resemble the structure of a physical voting machine:
                      </p>
                      {/* 5 Feature Cards Grid matching Paper Canvas */}
                      <div className="flex flex-col gap-4 w-full">
                        {/* Row 1: Familiar Layout & Clear Choices */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                          {/* Card 1: Familiar Layout */}
                          <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 w-full shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                            <div
                              className="flex rounded-xl overflow-hidden flex-col items-start justify-between w-full h-full min-h-[285px] p-3 border-[0.5px] border-[#FFFFFF1A]"
                              style={{
                                backgroundImage:
                                  "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="64"
                                viewBox="0 -960.32 2560 2560"
                                width="64"
                                className="shrink-0"
                              >
                                <path
                                  d="M1158.904 282.399q-64.64 0-110.267-45.627-45.627-45.627-45.626-110.266v-350.16q0-65.547 45.626-109.387 45.627-43.84 110.267-43.84h878.08q65.547 0 109.387 43.84 43.84 43.84 43.84 109.387v350.16q0 64.64-43.84 110.266-43.84 45.627-109.387 45.627H1158.904Zm627.84 734.48q-64.667 0-110.293-45.627-45.627-45.6-45.627-110.266v-351.52q0-64.48 45.627-108.854t110.293-44.373h250.24q65.547 0 109.387 44.373 43.84 44.373 43.84 108.854v351.52q0 64.667-43.84 110.266-43.84 45.627-109.387 45.627h-250.24Zm-627.84 0q-64.64 0-110.267-45.627-45.627-45.6-45.626-110.266v-351.52q0-64.48 45.626-108.854t110.267-44.373h244.854q65.547 0 109.386 44.373 43.84 44.373 43.84 108.854v351.52q0 64.667-43.84 110.266-43.84 45.627-109.386 45.627h-244.854Zm-633.227 0q-64.667 0-110.266-45.627-45.627-45.6-45.627-110.266v-1084.64q0-65.547 45.627-109.387 45.6-43.84 110.266-43.84h250.24q65.547 0 109.387 43.84 43.867 43.84 43.867 109.387v1084.64q0 64.667-43.867 110.266-43.84 45.627-109.387 45.627h-250.24Z"
                                  fill="#FFFFFF"
                                />
                              </svg>
                              <div className="flex flex-col items-start gap-3 w-full">
                                <div
                                  className="text-white text-base leading-[1.2] font-medium"
                                  style={{ fontFamily: HELVETICA }}
                                >
                                  Familiar Layout
                                </div>
                                <div
                                  className="text-[#747474] text-sm leading-5 font-normal"
                                  style={{ fontFamily: HELVETICA }}
                                >
                                  Candidate information and party symbols are presented in a structured row, similar to how they appear on an EVM.
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Card 2: Clear Choices */}
                          <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 w-full shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                            <div
                              className="flex rounded-xl overflow-hidden flex-col items-start justify-between w-full h-full min-h-[285px] p-3 border-[0.5px] border-[#FFFFFF1A]"
                              style={{
                                backgroundImage:
                                  "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="64"
                                viewBox="0 -960.32 2560 2560"
                                width="64"
                                className="shrink-0"
                              >
                                <path
                                  d="M1684.316 1258.666q-57.173 0-99.253-42.08-42.08-42.08-42.08-99.254v-483.68q0-57.173 42.08-99.253 42.08-42.08 99.253-42.08H2167.996q57.173 0 99.254 42.08Q2309.33 576.479 2309.33 633.652V1117.332q0 57.173-42.08 99.254Q2225.17 1258.666 2167.996 1258.666H1684.316ZM250.663 963.492v-176h947.28v176H250.663Zm1433.653-815.813q-57.173 0-99.253-42.08-42.08-42.08-42.08-99.253V-477.334q0-57.173 42.08-99.254Q1627.143-618.668 1684.316-618.668H2167.996q57.173 0 99.254 42.08Q2309.33-534.508 2309.33-477.334v483.68q0 57.173-42.08 99.253-42.08 42.08-99.254 42.08H1684.316ZM250.663-147.494v-176h947.28v176H250.663Z"
                                  fill="#FFFFFF"
                                />
                              </svg>
                              <div className="flex flex-col items-start gap-3 w-full">
                                <div
                                  className="text-white text-base leading-[1.2] font-medium"
                                  style={{ fontFamily: HELVETICA }}
                                >
                                  Clear Choices
                                </div>
                                <div
                                  className="text-[#747474] text-sm leading-5 font-normal"
                                  style={{ fontFamily: HELVETICA }}
                                >
                                  The large selection control on the right creates the feeling of physically pressing a voting button.
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Row 2: Physical Press & Visual Cues */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                          {/* Card 3: Physical Press */}
                          <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 w-full shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                            <div
                              className="flex rounded-xl overflow-hidden flex-col items-start justify-between w-full h-full min-h-[285px] p-3 border-[0.5px] border-[#FFFFFF1A]"
                              style={{
                                backgroundImage:
                                  "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="65"
                                viewBox="0 -960.32 2600 2600"
                                width="65"
                                className="shrink-0"
                              >
                                <path
                                  d="M1242.288 1401.648q-109.985 0-211.548-44.795t-170.11-133.738L325.625 505.813l20.421-33.963q35.208-51.458 91.461-73.016 56.252-21.558 114.373-1.761l303.116 118.111v-847.492q0-36.562 26.434-62.969t63.023-26.406q36.59 0 61.912 26.406 25.296 26.406 25.296 62.969v584.377h745.225q152.696 0 260.406 107.711T2145.002 620.186v366.952q0 174.308-121.468 294.396Q1902.065 1401.648 1728.542 1401.648H1242.288ZM580.425-121.058q-28.952-49.156-42.412-101.21-13.433-52.054-13.433-107.332 0-175.635 120.737-296.345 120.737-120.737 296.346-120.738 175.635 0 296.373 120.738 120.71 120.71 120.71 296.075 0 56.09-13.433 107.873-13.433 51.783-42.386 100.939l-93.139-54.167q21.667-35.208 31.146-73.125t9.479-81.25q0-130-89.375-219.374t-219.375-89.375q-130 0-219.375 89.375t-89.375 219.374q0 43.333 9.479 81.25t31.146 73.125l-93.113 54.167Z"
                                  fill="#FFFFFF"
                                />
                              </svg>
                              <div className="flex flex-col items-start gap-3 w-full">
                                <div
                                  className="text-white text-base leading-[1.2] font-medium"
                                  style={{ fontFamily: HELVETICA }}
                                >
                                  Physical Press
                                </div>
                                <div
                                  className="text-[#747474] text-sm leading-5 font-normal"
                                  style={{ fontFamily: HELVETICA }}
                                >
                                  Clear separation between candidates prevents accidental selection and makes each choice easy to distinguish.
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Card 4: Visual Cues */}
                          <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 w-full shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                            <div
                              className="flex rounded-xl overflow-hidden flex-col items-start justify-between w-full h-full min-h-[285px] p-3 border-[0.5px] border-[#FFFFFF1A]"
                              style={{
                                backgroundImage:
                                  "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="64"
                                viewBox="0 -960.32 2560 2560"
                                width="64"
                                className="shrink-0"
                              >
                                <path
                                  d="M137.65 584v-176H567.996v176H137.65Zm576.613-530.266L402.663-259.893l121.44-119.387 311.573 311.6-121.413 121.414ZM765.33 920v-282.666h1029.333v282.666H765.33Zm426.666-1136v-537.013h176V-216h-176Zm649.654 270.347l-121.44-126.133L2033.836-381.333l119.387 126.16-311.573 309.52ZM1991.996 584v-176h430.347v176H1991.996Z"
                                  fill="#FFFCFB"
                                />
                              </svg>
                              <div className="flex flex-col items-start gap-3 w-full">
                                <div
                                  className="text-white text-base leading-[1.2] font-medium"
                                  style={{ fontFamily: HELVETICA }}
                                >
                                  Visual Cues
                                </div>
                                <div
                                  className="text-[#747474] text-sm leading-5 font-normal"
                                  style={{ fontFamily: HELVETICA }}
                                >
                                  Familiar party symbols provide an additional visual cue, helping users identify their preferred representative quickly.
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Row 3: Safe Selection (Full width card) */}
                        <div className="w-full">
                          <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 w-full shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                            <div
                              className="flex rounded-xl overflow-hidden flex-col items-start justify-between w-full h-full min-h-[285px] p-3 border-[0.5px] border-[#FFFFFF1A]"
                              style={{
                                backgroundImage:
                                  "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="64"
                                viewBox="0 -960.32 2560 2560"
                                width="64"
                                className="shrink-0"
                              >
                                <path
                                  d="M1167.998 678.136L1755.491 90.643l-124.107-124.107L1167.998 429.923l-236.107-236.107-124.107 124.107L1167.998 678.136Zm112 688.4q-356.107-95.387-591.387-417.44Q453.331 627.043 453.331 223.976v-635.493l826.667-310.96 826.666 310.96V223.976q0 403.067-235.28 725.12Q1636.104 1271.149 1279.998 1366.536Z"
                                  fill="#FFFFFF"
                                />
                              </svg>
                              <div className="flex flex-col items-start gap-3 w-full">
                                <div
                                  className="text-white text-base leading-[1.2] font-medium"
                                  style={{ fontFamily: HELVETICA }}
                                >
                                  Safe Selection
                                </div>
                                <div
                                  className="text-[#747474] text-sm leading-5 font-normal"
                                  style={{ fontFamily: HELVETICA }}
                                >
                                  The minimal interface removes unnecessary actions and keeps the user&apos;s focus on the single decision that matters: selecting a candidate.
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card: EVM Candidate Selection Interaction */}
                    <div
                      className={`flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 w-full shrink-0 shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F] transition-all duration-500 ease-in-out ${
                        expandedTrust1 ? "h-[670px]" : "h-[366px]"
                      }`}
                    >
                      <div
                        className="relative flex rounded-xl overflow-hidden items-start w-full flex-1 p-5 flex-col justify-between border-[0.5px] border-[#FFFFFF1A] transition-all duration-500 ease-in-out"
                        style={{
                          backgroundImage:
                            "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                        }}
                      >
                        {/* Text Description on Left */}
                        <div className="w-[203px] text-justify relative z-10 text-[13px] leading-5 text-white font-normal">
                          The interaction was designed around the mental model of “pressing a button to vote.” Rather than using a conventional checkbox or radio button, the large control gives the user a more deliberate tap target.
                        </div>

                        {/* Smartphone Mockup - expands from cropped to full view */}
                        <div
                          className={`w-[330px] h-[674px] left-[248px] absolute bg-cover bg-position-[50%] pointer-events-none z-10 transition-all duration-500 ease-in-out ${
                            expandedTrust1 ? "top-3" : "top-[10px]"
                          }`}
                          style={{
                            backgroundImage:
                              "url(https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/6BXBYPSSZPQ64C6RJNCJZMWW80.png)",
                          }}
                        />

                        {/* Enlarge Icon from Paper Canvas */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="17"
                          viewBox="0 -819.68 680 680"
                          width="17"
                          onClick={() => setExpandedTrust1(!expandedTrust1)}
                          className="cursor-pointer z-20 hover:opacity-80 transition-opacity"
                          style={{ bottom: 18, left: 18, position: "absolute" }}
                          aria-label={expandedTrust1 ? "Collapse card" : "Enlarge card"}
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

                {/* Subsection 2: 2. Why This Interaction Matters */}
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
                    2. Why This Interaction Matters
                  </h3>
                  <div className="flex w-full flex-col items-start gap-14 self-stretch">
                    <div className="flex w-full flex-col items-start gap-6">
                      <div className="flex w-full flex-col items-start gap-3">
                        <p
                          className="w-full text-[rgba(255,255,255,0.7)] text-base leading-5 font-normal"
                          style={{ fontFamily: HELVETICA }}
                        >
                          I translated the familiarity of a physical EVM into the digital experience, making the interaction feel recognizable, intentional, and trustworthy while keeping candidate selection simple and clear.
                        </p>
                        <p
                          className="w-full text-white text-base leading-5 font-normal"
                          style={{ fontFamily: HELVETICA }}
                        >
                          So, I stood with three main reasons.
                        </p>
                      </div>
                    </div>

                    {/* 3 Metric / Reason Cards Side-by-Side */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full h-auto md:h-[294px]">
                      {/* Reason Card 1 */}
                      <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 flex-1 shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                        <div
                          className="flex rounded-xl overflow-hidden flex-col items-start justify-between w-full h-full p-4 border-[0.5px] border-[#FFFFFF1A]"
                          style={{
                            backgroundImage:
                              "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                          }}
                        >
                          <div className="text-white text-base leading-[1.2] font-medium" style={{ fontFamily: HELVETICA }}>
                            Builds trust <br />through familiarity
                          </div>
                          <div className="text-[#747474] text-sm leading-5 font-normal" style={{ fontFamily: HELVETICA }}>
                            Mirroring the physical EVM makes the digital voting process feel recognizable and credible.
                          </div>
                        </div>
                      </div>

                      {/* Reason Card 2 */}
                      <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 flex-1 shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                        <div
                          className="flex rounded-xl overflow-hidden flex-col items-start justify-between w-full h-full p-4 border-[0.5px] border-[#FFFFFF1A]"
                          style={{
                            backgroundImage:
                              "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                          }}
                        >
                          <div className="text-white text-base leading-[1.2] font-medium" style={{ fontFamily: HELVETICA }}>
                            Creates a sense <br />of intent
                          </div>
                          <div className="text-[#747474] text-sm leading-5 font-normal" style={{ fontFamily: HELVETICA }}>
                            A large, button-like interaction makes selecting a candidate feel deliberate, similar to physically pressing a voting button.
                          </div>
                        </div>
                      </div>

                      {/* Reason Card 3 */}
                      <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 flex-1 shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                        <div
                          className="flex rounded-xl overflow-hidden flex-col items-start justify-between w-full h-full p-4 border-[0.5px] border-[#FFFFFF1A]"
                          style={{
                            backgroundImage:
                              "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                          }}
                        >
                          <div className="text-white text-base leading-[1.2] font-medium" style={{ fontFamily: HELVETICA }}>
                            Reduces selection <br />errors
                          </div>
                          <div className="text-[#747474] text-sm leading-5 font-normal" style={{ fontFamily: HELVETICA }}>
                            Clear candidate rows, party symbols, and distinct touch targets help users quickly identify and confidently select their representative.
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

            {/* SECTION 9: THE OVERALL IMPACT */}
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
                  Outcomes & Civic Adoption
                </span>
              </div>

              <div className="flex w-full flex-col items-start gap-6">
                <p
                  className="w-full text-[rgba(255,255,255,0.7)] text-base leading-5 font-normal"
                  style={{ fontFamily: HELVETICA }}
                >
                  By decoupling voting from physical boundaries and introducing real-time independent verification, Vote IN transformed the digital election experience into a transparent, dependable civic platform.
                </p>

                {/* 4 Impact Bento Cards Grid (2x2) */}
                <div className="flex flex-col gap-4 w-full">
                  {/* Row 1 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    {/* Impact Card 1: Improved Accessibility */}
                    <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 w-full shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                      <div
                        className="flex rounded-xl overflow-hidden flex-col items-start justify-between w-full h-full min-h-[285px] p-4 border-[0.5px] border-[#FFFFFF1A]"
                        style={{
                          backgroundImage:
                            "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="48"
                          viewBox="0 0 24 24"
                          width="48"
                          fill="#FFFFFF"
                          className="shrink-0"
                        >
                          <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z" />
                        </svg>
                        <div className="flex flex-col items-start gap-3 w-full">
                          <div
                            className="text-white text-base leading-[1.2] font-medium"
                            style={{ fontFamily: HELVETICA }}
                          >
                            Improved Accessibility
                          </div>
                          <div
                            className="text-[#747474] text-sm leading-5 font-normal"
                            style={{ fontFamily: HELVETICA }}
                          >
                            Improved accessibility and ease-of-use in the voting process.
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Impact Card 2: Increased Confidence */}
                    <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 w-full shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                      <div
                        className="flex rounded-xl overflow-hidden flex-col items-start justify-between w-full h-full min-h-[285px] p-4 border-[0.5px] border-[#FFFFFF1A]"
                        style={{
                          backgroundImage:
                            "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="48"
                          viewBox="0 0 24 24"
                          width="48"
                          fill="#FFFFFF"
                          className="shrink-0"
                        >
                          <path d="m23 12-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69L23 12zm-12.91 4.72-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z" />
                        </svg>
                        <div className="flex flex-col items-start gap-3 w-full">
                          <div
                            className="text-white text-base leading-[1.2] font-medium"
                            style={{ fontFamily: HELVETICA }}
                          >
                            Increased User Confidence
                          </div>
                          <div
                            className="text-[#747474] text-sm leading-5 font-normal"
                            style={{ fontFamily: HELVETICA }}
                          >
                            Increased user confidence through transparent and secure interactions.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    {/* Impact Card 3: Enhanced User Engagement */}
                    <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 w-full shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                      <div
                        className="flex rounded-xl overflow-hidden flex-col items-start justify-between w-full h-full min-h-[285px] p-4 border-[0.5px] border-[#FFFFFF1A]"
                        style={{
                          backgroundImage:
                            "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="48"
                          viewBox="0 0 24 24"
                          width="48"
                          fill="#FFFFFF"
                          className="shrink-0"
                        >
                          <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
                        </svg>
                        <div className="flex flex-col items-start gap-3 w-full">
                          <div
                            className="text-white text-base leading-[1.2] font-medium"
                            style={{ fontFamily: HELVETICA }}
                          >
                            Enhanced User Engagement
                          </div>
                          <div
                            className="text-[#747474] text-sm leading-5 font-normal"
                            style={{ fontFamily: HELVETICA }}
                          >
                            Enhanced user engagement by making digital voting trustworthy and intuitive.
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Impact Card 4: Civic Duty Adoption */}
                    <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 w-full shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                      <div
                        className="flex rounded-xl overflow-hidden flex-col items-start justify-between w-full h-full min-h-[285px] p-4 border-[0.5px] border-[#FFFFFF1A]"
                        style={{
                          backgroundImage:
                            "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="48"
                          viewBox="0 0 24 24"
                          width="48"
                          fill="#FFFFFF"
                          className="shrink-0"
                        >
                          <path d="M9 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 8c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm-6 4c.22-.72 3.31-2 6-2 2.7 0 5.8 1.29 6 2H3zm15.6-7.6l-3.2-3.2-1.4 1.4 4.6 4.6 7.4-7.4-1.4-1.4z" />
                        </svg>
                        <div className="flex flex-col items-start gap-3 w-full">
                          <div
                            className="text-white text-base leading-[1.2] font-medium"
                            style={{ fontFamily: HELVETICA }}
                          >
                            Civic Duty Adoption
                          </div>
                          <div
                            className="text-[#747474] text-sm leading-5 font-normal"
                            style={{ fontFamily: HELVETICA }}
                          >
                            Fostered a greater willingness to adopt online voting for civic duties.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SEPARATOR 9 */}
            <GrungeSeparator />

            {/* SECTION 10: MY LEARNING FROM THIS CASE STUDY */}
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
                  Reflection & Design Principles
                </span>
              </div>

              <div className="flex w-full flex-col items-start gap-6">
                {/* Accent Callout Bar matching Paper Canvas */}
                <div
                  className="flex items-center rounded-[1px] gap-3 w-full py-2"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 90.67deg, oklab(61.5% 0 0 / 16%) 50%, oklab(80% 0 0 / 0%) 99.99%)",
                  }}
                >
                  <div className="w-0.5 rounded-full self-stretch shrink-0 bg-[#989100]" />
                  <div
                    className="flex-1 font-normal italic text-[rgba(255,255,255,0.5)] text-base leading-5 tracking-[-0.02em]"
                    style={{ fontFamily: HELVETICA }}
                  >
                    Designing for democracy requires balancing effortless usability with perceptible, undeniable security. Trust is not assumed—it must be intentionally designed at every touchpoint.
                  </div>
                </div>

                {/* 4 Reflection Bento Cards Grid (2x2) */}
                <div className="flex flex-col gap-4 w-full">
                  {/* Row 1 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    {/* Learning Card 1: Simplifying Complexity */}
                    <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 w-full shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                      <div
                        className="flex rounded-xl overflow-hidden flex-col items-start justify-between w-full h-full min-h-[285px] p-4 border-[0.5px] border-[#FFFFFF1A]"
                        style={{
                          backgroundImage:
                            "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="48"
                          viewBox="0 0 24 24"
                          width="48"
                          fill="#FFFFFF"
                          className="shrink-0"
                        >
                          <path d="M7.5 5.6L10 7 8.6 4.5 10 2 7.5 3.4 5 2l1.4 2.5L5 7zm12 9.8L17 14l1.4 2.5L17 19l2.5-1.4L22 19l-1.4-2.5L22 14zM22 2l-2.5 1.4L17 2l1.4 2.5L17 7l2.5-1.4L22 7l-1.4-2.5zm-7.63 5.29c-.39-.39-1.02-.39-1.41 0L1.29 18.96c-.39.39-.39 1.02 0 1.41l2.34 2.34c.39.39 1.02.39 1.41 0L16.7 11.05c.39-.39.39-1.02 0-1.41l-2.33-2.35zm-1.06 3.11l-1.41-1.41 1.41-1.41 1.41 1.41-1.41 1.41z" />
                        </svg>
                        <div className="flex flex-col items-start gap-3 w-full">
                          <div
                            className="text-white text-base leading-[1.2] font-medium"
                            style={{ fontFamily: HELVETICA }}
                          >
                            Simplifying Complexity
                          </div>
                          <div
                            className="text-[#747474] text-sm leading-5 font-normal"
                            style={{ fontFamily: HELVETICA }}
                          >
                            Simplifying complex processes like verification and voting is crucial for user satisfaction.
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Learning Card 2: Familiar Mental Models */}
                    <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 w-full shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                      <div
                        className="flex rounded-xl overflow-hidden flex-col items-start justify-between w-full h-full min-h-[285px] p-4 border-[0.5px] border-[#FFFFFF1A]"
                        style={{
                          backgroundImage:
                            "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="48"
                          viewBox="0 0 24 24"
                          width="48"
                          fill="#FFFFFF"
                          className="shrink-0"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                        </svg>
                        <div className="flex flex-col items-start gap-3 w-full">
                          <div
                            className="text-white text-base leading-[1.2] font-medium"
                            style={{ fontFamily: HELVETICA }}
                          >
                            Familiar Mental Models
                          </div>
                          <div
                            className="text-[#747474] text-sm leading-5 font-normal"
                            style={{ fontFamily: HELVETICA }}
                          >
                            Breaking down steps and using familiar patterns helps users navigate confidently.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    {/* Learning Card 3: Building Systemic Trust */}
                    <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 w-full shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                      <div
                        className="flex rounded-xl overflow-hidden flex-col items-start justify-between w-full h-full min-h-[285px] p-4 border-[0.5px] border-[#FFFFFF1A]"
                        style={{
                          backgroundImage:
                            "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="48"
                          viewBox="0 0 24 24"
                          width="48"
                          fill="#FFFFFF"
                          className="shrink-0"
                        >
                          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                        </svg>
                        <div className="flex flex-col items-start gap-3 w-full">
                          <div
                            className="text-white text-base leading-[1.2] font-medium"
                            style={{ fontFamily: HELVETICA }}
                          >
                            Building Systemic Trust
                          </div>
                          <div
                            className="text-[#747474] text-sm leading-5 font-normal"
                            style={{ fontFamily: HELVETICA }}
                          >
                            Addressing security and transparency concerns builds trust in digital systems.
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Learning Card 4: Empathy-Driven Insights */}
                    <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 w-full shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                      <div
                        className="flex rounded-xl overflow-hidden flex-col items-start justify-between w-full h-full min-h-[285px] p-4 border-[0.5px] border-[#FFFFFF1A]"
                        style={{
                          backgroundImage:
                            "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="48"
                          viewBox="0 0 24 24"
                          width="48"
                          fill="#FFFFFF"
                          className="shrink-0"
                        >
                          <path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z" />
                        </svg>
                        <div className="flex flex-col items-start gap-3 w-full">
                          <div
                            className="text-white text-base leading-[1.2] font-medium"
                            style={{ fontFamily: HELVETICA }}
                          >
                            Empathy-Driven Insights
                          </div>
                          <div
                            className="text-[#747474] text-sm leading-5 font-normal"
                            style={{ fontFamily: HELVETICA }}
                          >
                            Insights from user surveys guided the design to meet both functional and emotional needs.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SEPARATOR 10 */}
            <GrungeSeparator />

            {/* SECTION 11: UI MOCKUPS (Paper Canvas: playground/onIdeal & playground/onClick) */}
            <section
              id="ui-mockups"
              className="[font-synthesis:none] flex flex-col items-center gap-9 self-stretch justify-center antialiased w-full pb-12 scroll-mt-24"
            >
              {/* Section Header matching Paper */}
              <div className="flex items-center gap-3 self-stretch">
                <h2
                  className="tracking-[-0.02em] font-medium text-white text-xl/6"
                  style={{ fontFamily: HELVETICA }}
                >
                  UI Mockups
                </h2>
              </div>

              {/* Bento Card Outer Frame: playground/onIdeal (598x598) */}
              <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 w-full max-w-[598px] h-[598px] shrink-0 [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
                <div
                  className="aspect-square [font-synthesis-small-caps:none] [font-synthesis-style:none] [font-synthesis-weight:none] rounded-xl self-stretch flex-1 overflow-clip relative bg-origin-border [border-width:0.5px] border-solid border-[#FFFFFF1A] w-full h-full"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                  }}
                >
                  {/* Scattered Mockups matching Paper playground/onIdeal (no shadows) */}
                  <div
                    className="w-[242px] h-[490px] left-32 top-[387px] absolute bg-cover bg-center rounded-[32px] opacity-90 pointer-events-none"
                    style={{
                      backgroundImage:
                        "url(https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/7GN69EPV75NRVXHCDTJFA6TDPZ.png)",
                    }}
                  />
                  <div
                    className="w-[239px] h-[490px] -left-40 top-48 absolute bg-cover bg-center rounded-[32px] opacity-90 pointer-events-none"
                    style={{
                      backgroundImage:
                        "url(https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M070C9C1JDDENP7HQ2RWSQA8.png)",
                    }}
                  />
                  <div
                    className="w-[239px] h-[490px] left-3.75 -top-[336px] absolute bg-cover bg-center rounded-[32px] opacity-90 pointer-events-none"
                    style={{
                      backgroundImage:
                        "url(https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M09QHN4SN8XPHHGTMD6DE1D6.png)",
                    }}
                  />
                  <div
                    className="w-[241px] h-[490px] -top-[262px] left-71 absolute bg-cover bg-center rounded-[32px] opacity-90 pointer-events-none"
                    style={{
                      backgroundImage:
                        "url(https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M09QDFD1C23RFRA0RJQB88JY.png)",
                    }}
                  />
                  <div
                    className="w-[239px] h-[490px] left-[418px] top-[421px] absolute bg-cover bg-center rounded-[32px] opacity-90 pointer-events-none"
                    style={{
                      backgroundImage:
                        "url(https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M070C9C1JDDENP7HQ2RWSQA8.png)",
                    }}
                  />
                  <div
                    className="w-[241px] h-[490px] left-[550px] -top-[111px] absolute bg-cover bg-center rounded-[32px] opacity-90 pointer-events-none"
                    style={{
                      backgroundImage:
                        "url(https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/6BXBYPSSZPQ64C6RJNCJZMWW80.png)",
                    }}
                  />

                  {/* Open Playground Button Card in Center matching Paper */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsPlaygroundOpen(true);
                      setCanvasZoom(0.75);
                      setCanvasPan({ x: 0, y: 0 });
                    }}
                    className="group flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 left-1/2 top-1/2 absolute [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F] -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 z-10 shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                  >
                    <div
                      className="flex rounded-xl overflow-clip flex-col items-center justify-center px-4 py-3 bg-origin-border [border-width:0.5px] border-solid border-[#FFFFFF1A] transition-colors group-hover:border-white/30"
                      style={{
                        backgroundImage:
                          "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                      }}
                    >
                      <div
                        className="w-fit text-white text-base font-medium flex items-center gap-2"
                        style={{ fontFamily: HELVETICA }}
                      >
                        <span>Open Playground</span>
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </section>

            {/* Interactive Canvas Modal (playground/onClick) */}
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
                  <div className="relative w-full max-w-[1200px] h-[88vh] max-h-[920px] rounded-3xl overflow-hidden bg-[#161616] border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.9)] flex flex-col">
                    {/* Top Header Bar */}
                    <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                      <div
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#242424]/90 border border-white/10 backdrop-blur-md text-xs text-neutral-300 pointer-events-auto shadow-lg"
                        style={{ fontFamily: HELVETICA }}
                      >
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="font-medium text-white">UI Playground</span>
                        <span className="text-neutral-500">|</span>
                        <span className="text-neutral-400">Drag to pan · Scroll to zoom</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsPlaygroundOpen(false)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#242424]/90 border border-white/10 hover:bg-[#333333] hover:border-white/20 text-white text-xs font-medium backdrop-blur-md cursor-pointer transition-all duration-200 pointer-events-auto shadow-lg"
                        style={{ fontFamily: HELVETICA }}
                      >
                        <span>Close</span>
                        <span
                          className="text-[10px] text-neutral-400 bg-white/10 px-1.5 py-0.5 rounded"
                          style={{ fontFamily: FIRA_CODE }}
                        >
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
                        const zoomDelta = e.deltaY < 0 ? 0.08 : -0.08;
                        setCanvasZoom((prev) =>
                          Math.min(Math.max(Number((prev + zoomDelta).toFixed(2)), 0.35), 2.5)
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

                      {/* Unified Zoom & Pan Workspace (Mockups float directly without outer box) */}
                      <div
                        className="absolute left-1/2 top-1/2 transition-transform duration-75 will-change-transform"
                        style={{
                          transform: `translate(calc(-50% + ${canvasPan.x}px), calc(-50% + ${canvasPan.y}px)) scale(${canvasZoom})`,
                          transformOrigin: "center center",
                        }}
                      >
                        {/* Direct 6 Mockups Workspace (1041px x 1094px, no bounding box, no shadows) */}
                        <div className="relative w-[1041px] h-[1094px]">
                          {/* 6 Mockups (clean PNGs with no CSS borders) */}
                          <div
                            className="w-[242px] h-[490px] left-1/2 bottom-[31.5px] absolute -translate-x-1/2 bg-cover bg-center"
                            style={{
                              backgroundImage:
                                "url(https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/7GN69EPV75NRVXHCDTJFA6TDPZ.png)",
                            }}
                          />
                          <div
                            className="w-[239px] h-[490px] left-[31.5px] bottom-[31.5px] absolute bg-cover bg-center"
                            style={{
                              backgroundImage:
                                "url(https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M070C9C1JDDENP7HQ2RWSQA8.png)",
                            }}
                          />
                          <div
                            className="w-[239px] h-[490px] left-[31.5px] top-[31.5px] absolute bg-cover bg-center"
                            style={{
                              backgroundImage:
                                "url(https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M09QHN4SN8XPHHGTMD6DE1D6.png)",
                            }}
                          />
                          <div
                            className="w-[241px] h-[490px] top-[31.5px] left-1/2 absolute -translate-x-1/2 bg-cover bg-center"
                            style={{
                              backgroundImage:
                                "url(https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M09QDFD1C23RFRA0RJQB88JY.png)",
                            }}
                          />
                          <div
                            className="w-[239px] h-[490px] bottom-[31.5px] right-[31.5px] absolute bg-cover bg-center"
                            style={{
                              backgroundImage:
                                "url(https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M070C9C1JDDENP7HQ2RWSQA8.png)",
                            }}
                          />
                          <div
                            className="w-[241px] h-[490px] top-[31.5px] right-[31.5px] absolute bg-cover bg-center"
                            style={{
                              backgroundImage:
                                "url(https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/6BXBYPSSZPQ64C6RJNCJZMWW80.png)",
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Floating Zoom & Controls Toolbar at Bottom */}
                    <div
                      className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#242424]/95 border border-white/15 backdrop-blur-lg shadow-[0_10px_30px_rgba(0,0,0,0.7)]"
                      style={{ fontFamily: HELVETICA }}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setCanvasZoom((prev) => Math.max(Number((prev - 0.15).toFixed(2)), 0.35))
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
                          setCanvasZoom(0.75);
                          setCanvasPan({ x: 0, y: 0 });
                        }}
                        className="px-2.5 py-1 text-xs text-white font-medium hover:bg-white/10 rounded-md transition-colors cursor-pointer"
                        style={{ fontFamily: FIRA_CODE }}
                        title="Click to reset view"
                      >
                        {Math.round(canvasZoom * 100)}%
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setCanvasZoom((prev) => Math.min(Number((prev + 0.15).toFixed(2)), 2.5))
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
                          setCanvasZoom(0.75);
                          setCanvasPan({ x: 0, y: 0 });
                        }}
                        className="px-2.5 py-1 text-xs text-neutral-300 hover:text-white hover:bg-white/10 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer font-medium"
                        style={{ fontFamily: HELVETICA }}
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
        </main>
      </div>
    </div>
  );
}
