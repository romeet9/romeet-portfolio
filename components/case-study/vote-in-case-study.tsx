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
  { id: "fraud-concerns", label: "Fraud Concerns" },
  { id: "trust-in-digital-systems", label: "Trust in Digital Systems" },
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
          </div>
        </main>
      </div>
    </div>
  );
}
