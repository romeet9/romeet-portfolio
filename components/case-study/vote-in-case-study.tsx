"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { HalftoneDots } from "@paper-design/shaders-react";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "the-problem", label: "The Problem" },
  { id: "problem-buckets", label: "Problem Buckets" },
  { id: "breaking-problem", label: "Breaking Problem" },
  { id: "simplifying-verification", label: "Verification Flow" },
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
              <div className="relative flex w-full flex-col items-center justify-center rounded-lg bg-[#242424] p-1 border-[0.5px] border-[#FFFFFF0F] shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)]">
                <div className="relative h-[378px] w-full overflow-hidden rounded-sm bg-[#9A8DE9] shadow-[0_0_5px_rgba(0,0,0,0.2)]">
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
                            "linear-gradient(in oklab 180deg, oklab(64.3% 0.037 -0.078 / 0%) 0%, oklab(80.4% 0.037 -0.078) 100%)",
                        }}
                      />
                    </div>
                  )}

                  {/* Headline Banner */}
                  <div className="absolute left-0 right-0 top-7 z-10 flex flex-col items-center justify-center py-2">
                    <h2
                      style={{
                        fontFamily: HELVETICA,
                        fontSize: "24px",
                        lineHeight: "30px",
                        letterSpacing: "normal",
                        fontWeight: 400,
                        color: "#FFFFFF",
                      }}
                    >
                      Voting at your fingerprints
                    </h2>
                  </div>

                  {/* Smartphone App Screen Mockup */}
                  <div
                    className="absolute left-1/2 top-[118px] h-[550px] w-[272px] -translate-x-1/2 rounded-[47px] bg-cover bg-center shadow-[0_2px_35px_rgba(0,0,0,0.3)] z-10"
                    style={{
                      backgroundImage:
                        "url(https://app.paper.design/file-assets/01M03KW12YSNP0MEZXDDWH0QJZ/01M04G53XKS8SPJ4M4TVNHJBVD.png)",
                    }}
                  />
                </div>
              </div>

              {/* PURPLE ACCENT CALLOUT */}
              <div
                className="flex h-6 w-full items-center gap-3 rounded-[1px] px-0.5"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, rgba(157, 157, 157, 0.16) 50%, rgba(204, 204, 204, 0) 100%)",
                }}
              >
                <div className="h-full w-0.5 rounded-full bg-[#A26ED7]" />
                <div
                  className="flex items-center gap-1.5"
                  style={{
                    fontFamily: HELVETICA,
                    fontSize: "14px",
                    lineHeight: "18px",
                    letterSpacing: "normal",
                  }}
                >
                  <span
                    style={{
                      fontStyle: "italic",
                      fontWeight: 300,
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
                    fontWeight: 300,
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
                </div>
              </div>
            </section>

            {/* SEPARATOR 2 */}
            <GrungeSeparator />

            {/* 3. PROBLEM STATEMENT SECTION (CONTAINER CARD WITH 3 COLUMNS) */}
            <section id="the-problem" className="flex w-full flex-col items-start gap-4 scroll-mt-24">
              <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 w-full shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                <div
                  className="flex rounded-xl overflow-hidden flex-col items-start justify-between w-full px-3.5 py-4 min-h-[220px] sm:min-h-[240px]"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                  }}
                >
                  <div className="w-fit text-white text-base font-normal mb-4">
                    Problem Statement.
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full items-end">
                    <div className="text-white/70 text-sm sm:text-base leading-5 font-light">
                      The Government of India is transitioning from traditional offline voting to a centralized online voting system.
                    </div>
                    <div className="text-white/70 text-sm sm:text-base leading-5 font-light">
                      This system will enable citizens to cast their votes digitally, eliminating the need for physical polling stations.
                    </div>
                    <div className="text-white/70 text-sm sm:text-base leading-5 font-light">
                      A secure, seamless voting platform for identity verification & transparent voting, protected against fraud, duplicate votes.
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
                    fontWeight: 300,
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
                    fontWeight: 300,
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

                {/* 3 Square Cards in a Row (Text focus) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                  {/* Card 1: Verification Complexity */}
                  <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 flex-1 shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                    <div
                      className="aspect-square flex rounded-xl overflow-clip flex-col items-center justify-center self-stretch flex-1 px-2.5 py-3 border-[0.5px] border-[#FFFFFF1A]"
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
                      className="aspect-square flex rounded-xl overflow-clip flex-col items-center justify-center self-stretch flex-1 px-2.5 py-3 border-[0.5px] border-[#FFFFFF1A]"
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
                      className="aspect-square flex rounded-xl overflow-clip flex-col items-center justify-center self-stretch flex-1 px-2.5 py-3 border-[0.5px] border-[#FFFFFF1A]"
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

            {/* 6. SIMPLIFYING THE VERIFICATION PROCESS (ANNOTATED SCREEN WITH CONNECTING LINES) */}
            <section id="simplifying-verification" className="flex w-full flex-col items-start gap-3 scroll-mt-24">
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
                Simplifying the Verification Process
              </h2>

              <div className="flex w-full flex-col gap-8">
                <div
                  className="flex flex-col gap-3"
                  style={{
                    fontFamily: HELVETICA,
                    fontSize: "16px",
                    lineHeight: "20px",
                    letterSpacing: "normal",
                    fontWeight: 300,
                    color: "rgba(255, 255, 255, 0.7)",
                  }}
                >
                  <p>
                    These solutions focus on reducing frustration and providing
                    clear guidance throughout the process.
                  </p>
                  <p className="text-white font-normal">
                    So, I stood with three problem buckets.
                  </p>
                </div>

                {/* Annotated Interface Showcase Card */}
                <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 w-full shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                  <div
                    className="relative flex rounded-xl overflow-hidden items-center justify-between w-full h-[357px] px-2.5 py-3 border-[0.5px] border-[#FFFFFF1A]"
                    style={{
                      backgroundImage:
                        "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                    }}
                  >
                    {/* Screen Tag */}
                    <div className="absolute left-4 top-4.5 text-white text-xl font-normal">
                      Login Page
                    </div>

                    {/* Smartphone Screen Mockup */}
                    <div
                      className="absolute left-[348px] -top-[114px] w-[219px] h-[446px] bg-cover bg-center pointer-events-none z-10 shadow-2xl"
                      style={{
                        backgroundImage:
                          "url(https://app.paper.design/file-assets/01M03KW12YSNP0MEZXDDWH0QJZ/7GN69EPV75NRVXHCDTJFA6TDPZ.png)",
                      }}
                    />

                    {/* Left Side Callout Texts */}
                    <div className="absolute left-7 top-[140px] flex flex-col gap-5 w-[266px] z-10">
                      <p className="text-[13px] leading-5 text-white text-justify font-normal">
                        A progress bar, so the user is familiar where are they in the verification process.
                      </p>
                      <p className="text-[13px] leading-5 text-white text-justify font-normal">
                        A section to show real time notification of the user
                      </p>
                      <p className="text-[13px] leading-5 text-white text-justify font-normal">
                        Added prominent &lsquo;CTA&rsquo; ,ensuring users feel that physically they are feeling a form
                      </p>
                    </div>

                    {/* SVG Connecting Lines and Indicator Dots */}
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none z-20"
                      viewBox="0 0 589 357"
                      preserveAspectRatio="none"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Path 1: Progress Bar Annotation */}
                      <circle cx="298.75" cy="171.22" r="2.5" fill="#DDDDDD" />
                      <polyline
                        points="298.75,171.22 320.75,171.22 320.75,209.22 363.75,209.22"
                        stroke="#DDDDDD"
                        strokeWidth="1"
                        fill="none"
                      />
                      <circle cx="363.75" cy="209.22" r="2.5" fill="#DDDDDD" />

                      {/* Path 2: Notification Area Annotation */}
                      <circle cx="91.75" cy="231.22" r="2.5" fill="#DDDDDD" />
                      <polyline
                        points="91.75,231.22 320.75,231.22 320.75,262.22 411.75,262.22"
                        stroke="#DDDDDD"
                        strokeWidth="1"
                        fill="none"
                      />
                      <circle cx="411.75" cy="262.22" r="2.5" fill="#DDDDDD" />

                      {/* Path 3: CTA Button Annotation */}
                      <circle cx="299.75" cy="291.22" r="2.5" fill="#DDDDDD" />
                      <line
                        x1="299.75"
                        y1="291.22"
                        x2="379.75"
                        y2="291.22"
                        stroke="#DDDDDD"
                        strokeWidth="1"
                      />
                      <circle cx="379.75" cy="291.22" r="2.5" fill="#DDDDDD" />
                    </svg>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
