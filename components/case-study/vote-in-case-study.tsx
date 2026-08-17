"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { HalftoneDots } from "@paper-design/shaders-react";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "the-problem", label: "The Problem" },
  { id: "problem-buckets", label: "Problem Buckets" },
  { id: "breaking-problem", label: "Breaking Problem" },
  { id: "verification-complexity", label: "Verification Complexity" },
  { id: "trust-in-digital-systems", label: "Trust in Digital Systems" },
  { id: "phase-1", label: "Phase I" },
  { id: "phase-2", label: "Phase II" },
  { id: "fluid-interface", label: "Fluid Interface" },
  { id: "solving-3ts", label: "Solving for 3Ts" },
  { id: "impact", label: "Impact" },
  { id: "reflection", label: "Reflection" },
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

  useEffect(() => {
    setMounted(true);
  }, []);

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
      {/* FIXED LEFT-SIDE NAVIGATION (Borderless floating text + indicator dot)     */}
      {/* ========================================================================= */}
      <aside
        className="hidden xl:flex fixed left-8 2xl:left-14 top-1/2 -translate-y-1/2 z-50 pointer-events-auto flex-col gap-[18px]"
        style={{
          width: "150px",
        }}
        aria-label="Case study sections"
      >
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => {
                setActiveSection(sec.id);
                scrollTo(sec.id);
              }}
              className="group flex items-center gap-3 text-left transition-colors cursor-pointer"
            >
              <div
                className={`size-1.5 shrink-0 rounded-full transition-all ${
                  isActive
                    ? "bg-[#B81919] scale-110"
                    : "bg-transparent group-hover:bg-neutral-600"
                }`}
              />
              <span
                style={{
                  fontFamily: HELVETICA,
                  fontSize: "14px",
                  lineHeight: "100%",
                  letterSpacing: "normal",
                  color: isActive ? "#FFFFFF" : "#8F8F8F",
                  fontWeight: 400,
                }}
                className="transition-colors group-hover:text-white"
              >
                {sec.label}
              </span>
            </button>
          );
        })}
      </aside>

      {/* ========================================================================= */}
      {/* FIXED BACK BUTTON (Anchored on the left margin of the centered column)    */}
      {/* ========================================================================= */}
      <div className="hidden sm:block fixed top-24 left-[max(20px,calc(50%-360px))] z-50">
        <Link
          href="/case-studies"
          className="group flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white border border-[#E6E6E6] shadow-[inset_0_0_0_1px_rgba(10,13,18,0.04),0_1px_2px_rgba(10,13,18,0.08)] transition-transform hover:scale-105 active:scale-95"
          aria-label="Back to Case Studies"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0 transition-transform group-hover:-translate-x-0.5"
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

            {/* 4. BREAKDOWN / PROBLEM BUCKETS SECTION (3-COLUMN BENTO CARDS) */}
            <section id="problem-buckets" className="flex w-full flex-col items-start gap-3 scroll-mt-24">
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
                Let&apos;s stream down the actual problem statement.
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
                    So before directly jumping on the solution, I usually break
                    the problem statements into buckets.
                  </p>
                  <p>
                    So during my brainstorming session, I broke it down into
                    three main problem buckets.
                  </p>
                </div>

                {/* 3 Square Cards in a Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                  {/* Bucket Card 1: Verification */}
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
                          image="https://app.paper.design/file-assets/01M03KW12YSNP0MEZXDDWH0QJZ/01M05PVRTNZR3D0P3C0YXYBQWC.jpg"
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
                          Verification
                        </div>
                        <div className="self-stretch text-white text-base leading-5">
                          Seamless account verification
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bucket Card 2: Voting Process */}
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
                          image="https://app.paper.design/file-assets/01M03KW12YSNP0MEZXDDWH0QJZ/01M05PWCW46Z7Z0HRMYCKHKXDE.jpg"
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
                          Voting Process
                        </div>
                        <div className="self-stretch whitespace-pre-wrap text-white text-base leading-5">
                          Streamline Flow for Voting
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bucket Card 3: Fraud Concerns */}
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
                          image="https://app.paper.design/file-assets/01M03KW12YSNP0MEZXDDWH0QJZ/01M05PZD5JM3XGJ9VH2X66HKC9.jpg"
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
                          Verifying vote in one click
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SEPARATOR 4 */}
            <GrungeSeparator />

            {/* 5. BREAKING PROBLEM STATEMENT SECTION (NEW SECTION) */}
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

                {/* 3 Taller Cards in a Row (Text focus, h-73.5 = 294px) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full h-auto sm:h-[294px]">
                  {/* Card 1: Verification Complexity */}
                  <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 flex-1 shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                    <div
                      className="flex rounded-xl overflow-clip flex-col items-center justify-center self-stretch flex-1 px-2.5 py-3 border-[0.5px] border-[#FFFFFF1A]"
                      style={{
                        backgroundImage:
                          "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                      }}
                    >
                      <div className="items-start flex flex-col justify-between gap-1.5 flex-1 self-stretch h-full">
                        <div className="w-fit whitespace-pre text-white text-base leading-[18px]">
                          Verification{"\n"}Complexity
                        </div>
                        <div className="self-stretch text-[#747474] text-sm leading-5">
                          Users used to struggle with identity verification
                          steps, especially if they involve multiple documents.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Trust in Digital Systems */}
                  <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 flex-1 shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                    <div
                      className="flex rounded-xl overflow-clip flex-col items-center justify-center self-stretch flex-1 px-2.5 py-3 border-[0.5px] border-[#FFFFFF1A]"
                      style={{
                        backgroundImage:
                          "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                      }}
                    >
                      <div className="items-start flex flex-col justify-between gap-1.5 flex-1 self-stretch h-full">
                        <div className="w-fit whitespace-pre text-white text-base leading-[18px]">
                          Trust in Digital{"\n"}Systems
                        </div>
                        <div className="self-stretch text-[#747474] text-sm leading-5">
                          Users feel apprehensive about the security and
                          transparency of the online voting process.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Fraud Concerns */}
                  <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 flex-1 shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                    <div
                      className="flex rounded-xl overflow-clip flex-col items-center justify-center self-stretch flex-1 px-2.5 py-3 border-[0.5px] border-[#FFFFFF1A]"
                      style={{
                        backgroundImage:
                          "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                      }}
                    >
                      <div className="items-start flex flex-col justify-between gap-1.5 flex-1 self-stretch h-full">
                        <div className="w-fit text-white text-base leading-[18px]">
                          Fraud Concerns
                        </div>
                        <div className="self-stretch text-[#747474] text-sm leading-5">
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

                    {/* Card 1: Login Page */}
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
                              "url(https://app.paper.design/file-assets/01M03KW12YSNP0MEZXDDWH0QJZ/7GN69EPV75NRVXHCDTJFA6TDPZ.png)",
                            left: "349px",
                            top: "-114px",
                            width: "219px",
                            height: "446px",
                          }}
                        />

                        {/* Text Description */}
                        <div className="w-[266px] text-justify relative z-10 text-[13px] leading-5 text-white font-normal">
                          A clear progress bar helps users understand where they are in the verification process, while real-time notifications keep them informed of important updates. A prominent CTA guides users through each step, creating a familiar, form-like experience that feels clear and intuitive.
                        </div>

                        {/* Tag Label */}
                        <div className="w-fit relative z-10 text-[#FFFFFF66] text-base leading-5 font-normal">
                          Login Page
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

                    {/* Card 2: Digilocker Integration */}
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
                            top: "-118px",
                            width: "219px",
                            height: "449px",
                          }}
                        />

                        {/* Text Description */}
                        <div className="w-[266px] text-justify relative z-10 text-[13px] leading-5 text-white font-normal">
                          Users no longer need to wait for manual document verification. They simply enter their phone number, and the required documents are securely retrieved from DigiLocker, making the verification process faster and more seamless.
                        </div>

                        {/* Tag Label */}
                        <div className="w-fit relative z-10 text-[#FFFFFF66] text-base leading-5 font-normal">
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
                            top: "-60px",
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

            {/* 7. TRUST IN DIGITAL SYSTEMS SECTION */}
            <section
              id="trust-in-digital-systems"
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

                    {/* Card 1: Login Page */}
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
                              "url(https://app.paper.design/file-assets/01M03KW12YSNP0MEZXDDWH0QJZ/7GN69EPV75NRVXHCDTJFA6TDPZ.png)",
                            left: "349px",
                            top: "-114px",
                            width: "219px",
                            height: "446px",
                          }}
                        />

                        {/* Text Description */}
                        <div className="w-[266px] text-justify relative z-10 text-[13px] leading-5 text-white font-normal">
                          A clear progress bar helps users understand where they are in the verification process, while real-time notifications keep them informed of important updates. A prominent CTA guides users through each step, creating a familiar, form-like experience that feels clear and intuitive.
                        </div>

                        {/* Tag Label */}
                        <div className="w-fit relative z-10 text-[#FFFFFF66] text-base leading-5 font-normal">
                          Login Page
                        </div>
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

                    {/* Card 2: Digilocker Integration */}
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
                            top: "-118px",
                            width: "219px",
                            height: "449px",
                          }}
                        />

                        {/* Text Description */}
                        <div className="w-[266px] text-justify relative z-10 text-[13px] leading-5 text-white font-normal">
                          Users no longer need to wait for manual document verification. They simply enter their phone number, and the required documents are securely retrieved from DigiLocker, making the verification process faster and more seamless.
                        </div>

                        {/* Tag Label */}
                        <div className="w-fit relative z-10 text-[#FFFFFF66] text-base leading-5 font-normal">
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
                            top: "-60px",
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

            {/* SEPARATOR 7 */}
            <GrungeSeparator />
          </div>
        </main>
      </div>
    </div>
  );
}
