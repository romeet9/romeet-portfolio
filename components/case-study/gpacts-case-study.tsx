"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
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

const HELVETICA =
  "\"Helvetica Neue\", Helvetica, Arial, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif";
const FIRA_CODE = "\"Fira Code\", ui-monospace, SFMono-Regular, Menlo, monospace";

function GrungeSeparator() {
  return (
    <div className="flex w-full justify-center py-4" aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://app.paper.design/file-assets/01M03KW12YSNP0MEZXDDWH0QJZ/01M05ZA7AQR379995KJKXBG29X.png"
        alt=""
        className="w-[197px] h-[10px] object-contain opacity-60 select-none pointer-events-none"
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

  // FAQ Accordion State
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

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
    <div
      className="relative w-full text-white antialiased pt-20 sm:pt-24 lg:pt-28 pb-36 px-4"
      style={{
        fontFamily: HELVETICA,
        letterSpacing: "normal",
        fontFeatureSettings: "normal",
      }}
    >
      {/* 1. FIXED LEFT-SIDE NAVIGATION */}
      <CaseStudyNav items={SECTIONS} />

      {/* 2. CENTER-ALIGNED MAIN READING CONTAINER (600px column) */}
      <div className="relative mx-auto w-full max-w-[600px]">
        <CaseStudyBackButton href="/case-studies" />

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
              Designing a high-conversion digital summit experience for India&apos;s top pharma technology leaders.
            </h1>

            {/* Metadata row */}
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex flex-col items-start gap-1">
                <span
                  style={{
                    fontFamily: FIRA_CODE,
                    fontSize: "12px",
                    lineHeight: "16px",
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
                    fontWeight: 300,
                    color: "#FFFFFF",
                  }}
                >
                  Lead Product &amp; Web Designer
                </span>
              </div>

              <div className="flex flex-col items-start gap-1">
                <span
                  style={{
                    fontFamily: FIRA_CODE,
                    fontSize: "12px",
                    lineHeight: "16px",
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
                    fontWeight: 300,
                    color: "#FFFFFF",
                  }}
                >
                  4 Weeks (0 to 1)
                </span>
              </div>

              <div className="flex flex-col items-start gap-1">
                <span
                  style={{
                    fontFamily: FIRA_CODE,
                    fontSize: "12px",
                    lineHeight: "16px",
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
                    fontWeight: 300,
                    color: "#FFFFFF",
                  }}
                >
                  Web Experience &amp; IA
                </span>
              </div>
            </div>
          </div>

          {/* ================================================================ */}
          {/* SECTION 1: OVERVIEW / HERO                                       */}
          {/* ================================================================ */}
          <section id="hero" className="scroll-mt-28 flex flex-col items-start gap-7 w-full">
            <div className="flex flex-col items-start gap-3 w-full">
              <span
                style={{
                  fontFamily: FIRA_CODE,
                  fontSize: "12px",
                  lineHeight: "16px",
                  color: "rgba(255, 255, 255, 0.7)",
                  textTransform: "uppercase",
                }}
              >
                Executive Summary
              </span>
              <p
                style={{
                  fontFamily: HELVETICA,
                  fontSize: "16px",
                  lineHeight: "22px",
                  color: "rgba(255, 255, 255, 0.8)",
                  fontWeight: 400,
                }}
              >
                GPACTS (Global Pharma AI, Cloud &amp; Technology Summit) is India&apos;s largest congress for life sciences technology leaders. The summit brings together CIOs, CDOs, and Chief Data Scientists from leading pharmaceutical manufacturers to discuss mission-critical AI implementations, GxP-compliant cloud architectures, and digital clinical trial pipelines.
              </p>
              <p
                style={{
                  fontFamily: HELVETICA,
                  fontSize: "16px",
                  lineHeight: "22px",
                  color: "rgba(255, 255, 255, 0.8)",
                  fontWeight: 400,
                }}
              >
                The objective was to transform a highly complex, multi-city conference program into a frictionless, authoritative web experience that drives high-ticket enterprise sponsorships, CXO delegate registrations, and technical whitepaper downloads.
              </p>
            </div>

            {/* Scale KPI Strip */}
            <div className="flex items-start gap-4 self-stretch w-full">
              <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 flex-1 self-stretch shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                <div
                  className="flex rounded-xl overflow-hidden flex-col items-center justify-center self-stretch flex-1 px-4 py-5 border-[0.5px] border-[#FFFFFF1A]"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                  }}
                >
                  <div className="tracking-[-0.02em] font-medium text-white text-[38px] sm:text-[44px] leading-tight">
                    1200+
                  </div>
                  <div className="text-xs text-[#8F8F8F] uppercase tracking-wider mt-1 text-center" style={{ fontFamily: FIRA_CODE }}>
                    Curated Delegates
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 flex-1 self-stretch shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                <div
                  className="flex rounded-xl overflow-hidden flex-col items-center justify-center self-stretch flex-1 px-4 py-5 border-[0.5px] border-[#FFFFFF1A]"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                  }}
                >
                  <div className="tracking-[-0.02em] font-medium text-white text-[38px] sm:text-[44px] leading-tight">
                    09
                  </div>
                  <div className="text-xs text-[#8F8F8F] uppercase tracking-wider mt-1 text-center" style={{ fontFamily: FIRA_CODE }}>
                    Deep Dive Sessions
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 flex-1 self-stretch shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                <div
                  className="flex rounded-xl overflow-hidden flex-col items-center justify-center self-stretch flex-1 px-4 py-5 border-[0.5px] border-[#FFFFFF1A]"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                  }}
                >
                  <div className="tracking-[-0.02em] font-medium text-white text-[38px] sm:text-[44px] leading-tight">
                    15+
                  </div>
                  <div className="text-xs text-[#8F8F8F] uppercase tracking-wider mt-1 text-center" style={{ fontFamily: FIRA_CODE }}>
                    Keynote CXOs
                  </div>
                </div>
              </div>
            </div>

            {/* Annotated Hero UI Mockup Card (Vote IN Style) */}
            <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 w-full shrink-0 shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
              <div
                className="relative flex rounded-xl overflow-hidden items-start w-full h-[460px] flex-col border-[0.5px] border-[#FFFFFF1A]"
                style={{
                  backgroundImage:
                    "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                }}
              >
                {/* Scaled Desktop Hero Screenshot */}
                <div
                  className="w-[1020px] h-[720px] top-4 left-[240px] absolute bg-cover bg-top rounded-xl shadow-2xl border border-white/10 pointer-events-none z-10"
                  style={{
                    backgroundImage: "url(/case-studies/gpacts/01-hero.png)",
                  }}
                />

                {/* Tag Label at Top-Left */}
                <div className="w-fit absolute left-5 top-[18px] text-[#FFFFFF66] text-sm leading-5 font-normal z-10" style={{ fontFamily: FIRA_CODE }}>
                  Hero Viewport · Desktop
                </div>

                {/* Annotation 1: Above-the-fold Value Proposition */}
                <div className="w-[170px] text-left left-[24px] top-[100px] absolute text-white text-[13px] leading-5 font-normal z-10">
                  Instant value clarity: headline highlights &quot;Real AI implementations — not theory&quot; to attract enterprise buyers.
                </div>
                <div className="w-[60px] h-[3px] left-[200px] top-[125px] absolute z-10 pointer-events-none">
                  <div className="top-[1px] h-px absolute bg-[#5E5E5E] inset-x-0" />
                  <div className="-left-px top-0 w-[3px] h-[3px] rounded-full absolute bg-[#5E5E5E]" />
                  <div className="top-0 w-[3px] h-[3px] rounded-full right-0 absolute bg-[#5E5E5E]" />
                </div>

                {/* Annotation 2: Dual Conversion Pathway */}
                <div className="w-[170px] text-left left-[24px] top-[230px] absolute text-white text-[13px] leading-5 font-normal z-10">
                  Dual CTA hierarchy: &quot;Agenda&quot; anchors high-intent discovery, while &quot;Know More&quot; caters to exploratory CXOs.
                </div>
                <div className="w-[85px] h-[3px] left-[200px] top-[255px] absolute z-10 pointer-events-none">
                  <div className="top-[1px] h-px absolute bg-[#5E5E5E] inset-x-0" />
                  <div className="-left-px top-0 w-[3px] h-[3px] rounded-full absolute bg-[#5E5E5E]" />
                  <div className="top-0 w-[3px] h-[3px] rounded-full right-0 absolute bg-[#5E5E5E]" />
                </div>

                {/* Annotation 3: Enterprise Social Proof */}
                <div className="w-[170px] text-left left-[24px] top-[360px] absolute text-white text-[13px] leading-5 font-normal z-10">
                  Tier-1 tech partner strip establishes immediate industry legitimacy before the fold.
                </div>
                <div className="w-[110px] h-[3px] left-[200px] top-[385px] absolute z-10 pointer-events-none">
                  <div className="top-[1px] h-px absolute bg-[#5E5E5E] inset-x-0" />
                  <div className="-left-px top-0 w-[3px] h-[3px] rounded-full absolute bg-[#5E5E5E]" />
                  <div className="top-0 w-[3px] h-[3px] rounded-full right-0 absolute bg-[#5E5E5E]" />
                </div>
              </div>
            </div>
          </section>

          <GrungeSeparator />

          {/* ================================================================ */}
          {/* SECTION 2: THE CHALLENGE                                         */}
          {/* ================================================================ */}
          <section id="the-problem" className="scroll-mt-28 flex flex-col items-start gap-7 w-full">
            <div className="flex flex-col items-start gap-3 w-full">
              <h2
                style={{
                  fontFamily: HELVETICA,
                  fontSize: "20px",
                  lineHeight: "26px",
                  fontWeight: 500,
                  color: "#FFFFFF",
                }}
              >
                The Challenge: Enterprise Information Overload
              </h2>
              <p
                style={{
                  fontFamily: HELVETICA,
                  fontSize: "16px",
                  lineHeight: "22px",
                  color: "rgba(255, 255, 255, 0.8)",
                  fontWeight: 400,
                }}
              >
                B2B enterprise technology congresses are notorious for high cognitive bounce rates. When a C-level executive visits a conference website, they are faced with four simultaneous mental hurdles: evaluating whether the speakers are actual peers, determining if the technical agenda justifies taking two days out of the boardroom, deciphering multi-city dates, and navigating convoluted ticket packages.
              </p>
              <p
                style={{
                  fontFamily: HELVETICA,
                  fontSize: "16px",
                  lineHeight: "22px",
                  color: "rgba(255, 255, 255, 0.8)",
                  fontWeight: 400,
                }}
              >
                Our user research highlighted three primary friction points that caused dropped registrations in previous conference editions:
              </p>
            </div>

            {/* 3-PART BENTO GRID: User Friction Points */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
              {/* Card 1 */}
              <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 self-stretch shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                <div
                  className="flex rounded-xl overflow-hidden flex-col items-start justify-between self-stretch flex-1 p-4 border-[0.5px] border-[#FFFFFF1A] min-h-[220px]"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                  }}
                >
                  <span className="text-xs text-[#E5484D] uppercase font-mono" style={{ fontFamily: FIRA_CODE }}>
                    Friction 01
                  </span>
                  <div className="flex flex-col gap-2 my-auto">
                    <h3 className="text-white text-base font-medium">Unclear Value Density</h3>
                    <p className="text-xs text-[#A1A1A1] leading-relaxed">
                      Conferences filled with superficial sales pitches alienate serious technical leaders. The site had to prove deep, real-world case study depth immediately.
                    </p>
                  </div>
                  <div className="text-[11px] text-[#747474] font-mono">Bounce on Hero: 62%</div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 self-stretch shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                <div
                  className="flex rounded-xl overflow-hidden flex-col items-start justify-between self-stretch flex-1 p-4 border-[0.5px] border-[#FFFFFF1A] min-h-[220px]"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                  }}
                >
                  <span className="text-xs text-[#E5484D] uppercase font-mono" style={{ fontFamily: FIRA_CODE }}>
                    Friction 02
                  </span>
                  <div className="flex flex-col gap-2 my-auto">
                    <h3 className="text-white text-base font-medium">Multi-City Fragmentation</h3>
                    <p className="text-xs text-[#A1A1A1] leading-relaxed">
                      Spanning Mumbai, Hyderabad, Bangalore, and Ahmedabad created schedule confusion when presented in standard endless tables.
                    </p>
                  </div>
                  <div className="text-[11px] text-[#747474] font-mono">Agenda Abandonment: 48%</div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 self-stretch shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                <div
                  className="flex rounded-xl overflow-hidden flex-col items-start justify-between self-stretch flex-1 p-4 border-[0.5px] border-[#FFFFFF1A] min-h-[220px]"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                  }}
                >
                  <span className="text-xs text-[#E5484D] uppercase font-mono" style={{ fontFamily: FIRA_CODE }}>
                    Friction 03
                  </span>
                  <div className="flex flex-col gap-2 my-auto">
                    <h3 className="text-white text-base font-medium">Opaque Sponsorship Tiers</h3>
                    <p className="text-xs text-[#A1A1A1] leading-relaxed">
                      Enterprise sponsors investing $20k–$50k couldn&apos;t scan ROI, stage presence, or delegate entitlement differences at a glance.
                    </p>
                  </div>
                  <div className="text-[11px] text-[#747474] font-mono">Lead Inquiries Dropped: 35%</div>
                </div>
              </div>
            </div>
          </section>

          <GrungeSeparator />

          {/* ================================================================ */}
          {/* SECTION 3: THE 3-PILLAR INFORMATION ARCHITECTURE                 */}
          {/* ================================================================ */}
          <section id="ia-pillars" className="scroll-mt-28 flex flex-col items-start gap-7 w-full">
            <div className="flex flex-col items-start gap-3 w-full">
              <h2
                style={{
                  fontFamily: HELVETICA,
                  fontSize: "20px",
                  lineHeight: "26px",
                  fontWeight: 500,
                  color: "#FFFFFF",
                }}
              >
                The Architecture: Structuring for Scannability &amp; Conversion
              </h2>
              <p
                style={{
                  fontFamily: HELVETICA,
                  fontSize: "16px",
                  lineHeight: "22px",
                  color: "rgba(255, 255, 255, 0.8)",
                  fontWeight: 400,
                }}
              >
                To eliminate cognitive drag, we re-architected the entire page around a progressive disclosure funnel. Instead of dumping every session and speaker into a monolithic feed, the website is structured into three clear pillars: Authority Building, Interactive Multi-City Schedule Exploration, and Multi-Persona Conversion Funnels.
              </p>
            </div>

            {/* Core Rationale Callout */}
            <div
              className="flex flex-col items-start gap-3 p-4 self-stretch border-l-[3px] border-[#6597F1] w-full"
              style={{
                backgroundImage:
                  "linear-gradient(in oklab 90deg, oklab(100% 0 0 / 10%) 0.74%, oklab(80% 0 0 / 0%) 100%)",
              }}
            >
              <div className="text-white text-base font-medium leading-relaxed">
                &ldquo;Every single section answers one executive question before they ask it: Why should I care? Who else is in the room? What tangible frameworks will my engineering team take back?&rdquo;
              </div>
            </div>

            {/* 3-PART BENTO GRID: Architectural Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
              {/* Pillar 1 */}
              <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 self-stretch shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                <div
                  className="flex rounded-xl overflow-hidden flex-col items-start justify-between self-stretch flex-1 p-4 border-[0.5px] border-[#FFFFFF1A] min-h-[220px]"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                  }}
                >
                  <div className="w-2 h-2 rounded-full bg-[#6597F1] shadow-[0_0_8px_#6597F1]" />
                  <div className="flex flex-col gap-2 my-auto">
                    <h3 className="text-white text-base font-medium">1. Instant Authority</h3>
                    <p className="text-xs text-[#A1A1A1] leading-relaxed">
                      Hero value lockup, validated delegate counts, and high-contrast monochrome speaker cards establish peer credibility within 3 seconds.
                    </p>
                  </div>
                  <div className="text-[11px] text-[#6597F1] font-mono">Focus: CXO Trust</div>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 self-stretch shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                <div
                  className="flex rounded-xl overflow-hidden flex-col items-start justify-between self-stretch flex-1 p-4 border-[0.5px] border-[#FFFFFF1A] min-h-[220px]"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                  }}
                >
                  <div className="w-2 h-2 rounded-full bg-[#A4AA1A] shadow-[0_0_8px_#A4AA1A]" />
                  <div className="flex flex-col gap-2 my-auto">
                    <h3 className="text-white text-base font-medium">2. Chunked Agenda</h3>
                    <p className="text-xs text-[#A1A1A1] leading-relaxed">
                      City tabs with 3D landmark icons (Gateway of India, Charminar, etc.) allow users to isolate their exact city and parallel technical track in one tap.
                    </p>
                  </div>
                  <div className="text-[11px] text-[#A4AA1A] font-mono">Focus: Cognitive Ease</div>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 self-stretch shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                <div
                  className="flex rounded-xl overflow-hidden flex-col items-start justify-between self-stretch flex-1 p-4 border-[0.5px] border-[#FFFFFF1A] min-h-[220px]"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                  }}
                >
                  <div className="w-2 h-2 rounded-full bg-[#F17969] shadow-[0_0_8px_#F17969]" />
                  <div className="flex flex-col gap-2 my-auto">
                    <h3 className="text-white text-base font-medium">3. Multi-Tier Funnel</h3>
                    <p className="text-xs text-[#A1A1A1] leading-relaxed">
                      Distinct paths for Sponsors (Tier comparison), CXO Delegates (Direct Register), and Research Evaluators (Download Playbook).
                    </p>
                  </div>
                  <div className="text-[11px] text-[#F17969] font-mono">Focus: Conversion</div>
                </div>
              </div>
            </div>
          </section>

          <GrungeSeparator />

          {/* ================================================================ */}
          {/* SECTION 4: MULTI-CITY & MULTI-TRACK INTERACTIVE AGENDA           */}
          {/* ================================================================ */}
          <section id="agenda-system" className="scroll-mt-28 flex flex-col items-start gap-7 w-full">
            <div className="flex flex-col items-start gap-3 w-full">
              <h2
                style={{
                  fontFamily: HELVETICA,
                  fontSize: "20px",
                  lineHeight: "26px",
                  fontWeight: 500,
                  color: "#FFFFFF",
                }}
              >
                Multi-City Agenda: Solving Complex Scheduling Overwhelm
              </h2>
              <p
                style={{
                  fontFamily: HELVETICA,
                  fontSize: "16px",
                  lineHeight: "22px",
                  color: "rgba(255, 255, 255, 0.8)",
                  fontWeight: 400,
                }}
              >
                The congress is hosted across four major Indian pharmaceutical hubs: Mumbai, Hyderabad, Bangalore, and Ahmedabad. Each hub runs three simultaneous tracks: AI &amp; Intelligent Automation, Cloud &amp; GxP Infrastructure, and Clinical Data Science.
              </p>
              <p
                style={{
                  fontFamily: HELVETICA,
                  fontSize: "16px",
                  lineHeight: "22px",
                  color: "rgba(255, 255, 255, 0.8)",
                  fontWeight: 400,
                }}
              >
                Instead of a standard dropdown or separate web pages, we designed an interactive city hub switch with 3D architectural landmarks that immediately updates parallel timeline tracks without page reloads.
              </p>
            </div>

            {/* Annotated Agenda UI Mockup Card (Vote IN Style) */}
            <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 w-full shrink-0 shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
              <div
                className="relative flex rounded-xl overflow-hidden items-start w-full h-[470px] flex-col border-[0.5px] border-[#FFFFFF1A]"
                style={{
                  backgroundImage:
                    "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                }}
              >
                {/* Scaled Agenda Section Screenshot */}
                <div
                  className="w-[980px] h-[760px] top-4 left-[240px] absolute bg-cover bg-top rounded-xl shadow-2xl border border-white/10 pointer-events-none z-10"
                  style={{
                    backgroundImage: "url(/case-studies/gpacts/03-agenda.png)",
                  }}
                />

                {/* Tag Label at Top-Left */}
                <div className="w-fit absolute left-5 top-[18px] text-[#FFFFFF66] text-sm leading-5 font-normal z-10" style={{ fontFamily: FIRA_CODE }}>
                  Agenda Engine · Interactive Tracks
                </div>

                {/* Annotation 1: City Hubs */}
                <div className="w-[170px] text-left left-[24px] top-[105px] absolute text-white text-[13px] leading-5 font-normal z-10">
                  3D Landmark Hub Tabs: Distinct regional visual anchors make location selection tangible and fast.
                </div>
                <div className="w-[60px] h-[3px] left-[200px] top-[128px] absolute z-10 pointer-events-none">
                  <div className="top-[1px] h-px absolute bg-[#5E5E5E] inset-x-0" />
                  <div className="-left-px top-0 w-[3px] h-[3px] rounded-full absolute bg-[#5E5E5E]" />
                  <div className="top-0 w-[3px] h-[3px] rounded-full right-0 absolute bg-[#5E5E5E]" />
                </div>

                {/* Annotation 2: Multi-Track Columns */}
                <div className="w-[170px] text-left left-[24px] top-[240px] absolute text-white text-[13px] leading-5 font-normal z-10">
                  Parallel Track Matrix: AI, Cloud, and Data tracks laid out synchronously with standardized timestamp badges.
                </div>
                <div className="w-[85px] h-[3px] left-[200px] top-[265px] absolute z-10 pointer-events-none">
                  <div className="top-[1px] h-px absolute bg-[#5E5E5E] inset-x-0" />
                  <div className="-left-px top-0 w-[3px] h-[3px] rounded-full absolute bg-[#5E5E5E]" />
                  <div className="top-0 w-[3px] h-[3px] rounded-full right-0 absolute bg-[#5E5E5E]" />
                </div>

                {/* Annotation 3: Session Density */}
                <div className="w-[170px] text-left left-[24px] top-[370px] absolute text-white text-[13px] leading-5 font-normal z-10">
                  Session Card Anatomy: Formatted for glanceability (Speaker + Title + Time + Room badge).
                </div>
                <div className="w-[110px] h-[3px] left-[200px] top-[395px] absolute z-10 pointer-events-none">
                  <div className="top-[1px] h-px absolute bg-[#5E5E5E] inset-x-0" />
                  <div className="-left-px top-0 w-[3px] h-[3px] rounded-full absolute bg-[#5E5E5E]" />
                  <div className="top-0 w-[3px] h-[3px] rounded-full right-0 absolute bg-[#5E5E5E]" />
                </div>
              </div>
            </div>
          </section>

          <GrungeSeparator />

          {/* ================================================================ */}
          {/* SECTION 5: EXECUTIVE PROOF & EVENT EXPERIENCE                    */}
          {/* ================================================================ */}
          <section id="speakers-trust" className="scroll-mt-28 flex flex-col items-start gap-7 w-full">
            <div className="flex flex-col items-start gap-3 w-full">
              <h2
                style={{
                  fontFamily: HELVETICA,
                  fontSize: "20px",
                  lineHeight: "26px",
                  fontWeight: 500,
                  color: "#FFFFFF",
                }}
              >
                Executive Social Proof: High-Contrast Speaker System
              </h2>
              <p
                style={{
                  fontFamily: HELVETICA,
                  fontSize: "16px",
                  lineHeight: "22px",
                  color: "rgba(255, 255, 255, 0.8)",
                  fontWeight: 400,
                }}
              >
                In high-ticket enterprise summits, delegates do not buy tickets for generic topics; they buy access to the peer network in the room. We designed a high-contrast, editorial speaker roster with monochrome photography that communicates gravitas and executive focus.
              </p>
            </div>

            {/* Annotated Speaker & Gallery Card */}
            <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 w-full shrink-0 shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
              <div
                className="relative flex rounded-xl overflow-hidden items-start w-full h-[460px] flex-col border-[0.5px] border-[#FFFFFF1A]"
                style={{
                  backgroundImage:
                    "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                }}
              >
                {/* Scaled Speaker + Gallery Screenshot */}
                <div
                  className="w-[980px] h-[740px] top-4 left-[240px] absolute bg-cover bg-top rounded-xl shadow-2xl border border-white/10 pointer-events-none z-10"
                  style={{
                    backgroundImage: "url(/case-studies/gpacts/04-speakers.png)",
                  }}
                />

                {/* Tag Label at Top-Left */}
                <div className="w-fit absolute left-5 top-[18px] text-[#FFFFFF66] text-sm leading-5 font-normal z-10" style={{ fontFamily: FIRA_CODE }}>
                  Keynote Speakers · Roster UI
                </div>

                {/* Annotation 1: Editorial Photography */}
                <div className="w-[170px] text-left left-[24px] top-[110px] absolute text-white text-[13px] leading-5 font-normal z-10">
                  Uniform Monochrome Portraits: Removes disparate lighting and creates a unified executive aesthetic.
                </div>
                <div className="w-[60px] h-[3px] left-[200px] top-[135px] absolute z-10 pointer-events-none">
                  <div className="top-[1px] h-px absolute bg-[#5E5E5E] inset-x-0" />
                  <div className="-left-px top-0 w-[3px] h-[3px] rounded-full absolute bg-[#5E5E5E]" />
                  <div className="top-0 w-[3px] h-[3px] rounded-full right-0 absolute bg-[#5E5E5E]" />
                </div>

                {/* Annotation 2: Micro-Interaction Navigation */}
                <div className="w-[170px] text-left left-[24px] top-[240px] absolute text-white text-[13px] leading-5 font-normal z-10">
                  Horizontal Carousel Controls: Smooth kinetic arrows allow seamless scanning without breaking vertical scroll flow.
                </div>
                <div className="w-[85px] h-[3px] left-[200px] top-[265px] absolute z-10 pointer-events-none">
                  <div className="top-[1px] h-px absolute bg-[#5E5E5E] inset-x-0" />
                  <div className="-left-px top-0 w-[3px] h-[3px] rounded-full absolute bg-[#5E5E5E]" />
                  <div className="top-0 w-[3px] h-[3px] rounded-full right-0 absolute bg-[#5E5E5E]" />
                </div>

                {/* Annotation 3: Categorized Experience Gallery */}
                <div className="w-[170px] text-left left-[24px] top-[370px] absolute text-white text-[13px] leading-5 font-normal z-10">
                  Experience Tags: Categorized into Networking, CXO Roundtables, Workshops, and Demos.
                </div>
                <div className="w-[110px] h-[3px] left-[200px] top-[395px] absolute z-10 pointer-events-none">
                  <div className="top-[1px] h-px absolute bg-[#5E5E5E] inset-x-0" />
                  <div className="-left-px top-0 w-[3px] h-[3px] rounded-full absolute bg-[#5E5E5E]" />
                  <div className="top-0 w-[3px] h-[3px] rounded-full right-0 absolute bg-[#5E5E5E]" />
                </div>
              </div>
            </div>
          </section>

          <GrungeSeparator />

          {/* ================================================================ */}
          {/* SECTION 6: TIERED ENTERPRISE SPONSORSHIP MATRIX                  */}
          {/* ================================================================ */}
          <section id="sponsorship-matrix" className="scroll-mt-28 flex flex-col items-start gap-7 w-full">
            <div className="flex flex-col items-start gap-3 w-full">
              <h2
                style={{
                  fontFamily: HELVETICA,
                  fontSize: "20px",
                  lineHeight: "26px",
                  fontWeight: 500,
                  color: "#FFFFFF",
                }}
              >
                Sponsorship Architecture: Differentiating ROI &amp; Tiers
              </h2>
              <p
                style={{
                  fontFamily: HELVETICA,
                  fontSize: "16px",
                  lineHeight: "22px",
                  color: "rgba(255, 255, 255, 0.8)",
                  fontWeight: 400,
                }}
              >
                For enterprise sponsors (cloud hyperscalers, AI vendors, GxP software providers), pricing transparency is balanced with prestige. We designed a 3-tier Bento card comparison that visually prioritizes the flagship tier while giving clear entitlement breakdowns for each level.
              </p>
            </div>

            {/* 3-PART BENTO GRID: Pricing Tiers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
              {/* Platinum */}
              <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 self-stretch shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#6597F1]/40">
                <div
                  className="flex rounded-xl overflow-hidden flex-col items-start justify-between self-stretch flex-1 p-4 border-[0.5px] border-[#6597F1]/30 min-h-[300px]"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 180deg, oklab(25% 0 -0.05) 0%, oklab(20% 0 0) 100%)",
                  }}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs text-[#6597F1] uppercase font-mono" style={{ fontFamily: FIRA_CODE }}>
                      Flagship Tier
                    </span>
                    <span className="text-[10px] bg-[#6597F1]/20 text-[#6597F1] px-2 py-0.5 rounded-full font-mono">
                      Exclusive
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5 my-2">
                    <h3 className="text-white text-lg font-medium">Platinum Partner</h3>
                    <p className="text-xs text-[#A1A1A1]">Maximum visibility and prime keynote stage takeover.</p>
                  </div>

                  <ul className="flex flex-col gap-1.5 text-xs text-neutral-300 w-full my-auto border-t border-b border-white/10 py-3">
                    <li className="flex items-center gap-2">
                      <span className="text-[#6597F1]">✓</span> Exclusive keynote slot
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#6597F1]">✓</span> Branded stage presence
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#6597F1]">✓</span> 10 delegate passes
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#6597F1]">✓</span> Full lead generation access
                    </li>
                  </ul>

                  <button type="button" className="w-full py-2 rounded-lg bg-white text-black text-xs font-medium hover:bg-neutral-200 transition-colors mt-2">
                    Register Interest
                  </button>
                </div>
              </div>

              {/* Gold */}
              <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 self-stretch shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                <div
                  className="flex rounded-xl overflow-hidden flex-col items-start justify-between self-stretch flex-1 p-4 border-[0.5px] border-[#FFFFFF1A] min-h-[300px]"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                  }}
                >
                  <span className="text-xs text-[#F1B969] uppercase font-mono" style={{ fontFamily: FIRA_CODE }}>
                    Mid Tier
                  </span>

                  <div className="flex flex-col gap-1.5 my-2">
                    <h3 className="text-white text-lg font-medium">Gold Partner</h3>
                    <p className="text-xs text-[#A1A1A1]">Strong brand presence with panel moderation rights.</p>
                  </div>

                  <ul className="flex flex-col gap-1.5 text-xs text-neutral-300 w-full my-auto border-t border-b border-white/10 py-3">
                    <li className="flex items-center gap-2">
                      <span className="text-[#F1B969]">✓</span> Panel moderation slot
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#F1B969]">✓</span> 5 delegate passes
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#F1B969]">✓</span> Exhibition demo space
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#F1B969]">✓</span> Premium logo placement
                    </li>
                  </ul>

                  <button type="button" className="w-full py-2 rounded-lg bg-white/10 text-white text-xs font-medium hover:bg-white/20 transition-colors mt-2 border border-white/15">
                    Register Interest
                  </button>
                </div>
              </div>

              {/* Silver */}
              <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 self-stretch shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                <div
                  className="flex rounded-xl overflow-hidden flex-col items-start justify-between self-stretch flex-1 p-4 border-[0.5px] border-[#FFFFFF1A] min-h-[300px]"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                  }}
                >
                  <span className="text-xs text-[#A1A1A1] uppercase font-mono" style={{ fontFamily: FIRA_CODE }}>
                    Entry Tier
                  </span>

                  <div className="flex flex-col gap-1.5 my-2">
                    <h3 className="text-white text-lg font-medium">Silver Partner</h3>
                    <p className="text-xs text-[#A1A1A1]">Core sponsorship support with digital visibility.</p>
                  </div>

                  <ul className="flex flex-col gap-1.5 text-xs text-neutral-300 w-full my-auto border-t border-b border-white/10 py-3">
                    <li className="flex items-center gap-2">
                      <span className="text-white/60">✓</span> Logo placement
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-white/60">✓</span> 3 delegate passes
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-white/60">✓</span> Networking lounge access
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-white/60">✓</span> Digital promo reach
                    </li>
                  </ul>

                  <button type="button" className="w-full py-2 rounded-lg bg-white/10 text-white text-xs font-medium hover:bg-white/20 transition-colors mt-2 border border-white/15">
                    Register Interest
                  </button>
                </div>
              </div>
            </div>
          </section>

          <GrungeSeparator />

          {/* ================================================================ */}
          {/* SECTION 7: RESOURCE FUNNEL & LEAD MAGNETS                        */}
          {/* ================================================================ */}
          <section id="resource-funnel" className="scroll-mt-28 flex flex-col items-start gap-7 w-full">
            <div className="flex flex-col items-start gap-3 w-full">
              <h2
                style={{
                  fontFamily: HELVETICA,
                  fontSize: "20px",
                  lineHeight: "26px",
                  fontWeight: 500,
                  color: "#FFFFFF",
                }}
              >
                Lead Capture: High-Intent Collateral &amp; Whitepaper Funnels
              </h2>
              <p
                style={{
                  fontFamily: HELVETICA,
                  fontSize: "16px",
                  lineHeight: "22px",
                  color: "rgba(255, 255, 255, 0.8)",
                  fontWeight: 400,
                }}
              >
                Not all visitors are ready to buy a delegate pass on their first visit. We designed secondary lead magnets (Event Brochure, Sponsorship Deck, and the AI in Pharma Whitepaper) to capture qualified enterprise contacts and nurture them into attendees.
              </p>
            </div>

            {/* 3-PART BENTO GRID: Downloadable Collateral */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
              {/* Card 1 */}
              <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 self-stretch shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                <div
                  className="flex rounded-xl overflow-hidden flex-col items-start justify-between self-stretch flex-1 p-4 border-[0.5px] border-[#FFFFFF1A] min-h-[200px]"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                  }}
                >
                  <div className="text-xs text-[#6597F1] font-mono">PDF Document</div>
                  <div className="flex flex-col gap-1 my-auto">
                    <h3 className="text-white text-base font-medium">Event Brochure</h3>
                    <p className="text-xs text-[#A1A1A1] leading-relaxed">
                      Complete overview of the summit dates, keynote speakers, and session schedule.
                    </p>
                  </div>
                  <span className="text-xs text-white underline underline-offset-4 hover:text-[#6597F1] cursor-pointer">
                    Download PDF →
                  </span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 self-stretch shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                <div
                  className="flex rounded-xl overflow-hidden flex-col items-start justify-between self-stretch flex-1 p-4 border-[0.5px] border-[#FFFFFF1A] min-h-[200px]"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                  }}
                >
                  <div className="text-xs text-[#A4AA1A] font-mono">Partner Kit</div>
                  <div className="flex flex-col gap-1 my-auto">
                    <h3 className="text-white text-base font-medium">Sponsorship Deck</h3>
                    <p className="text-xs text-[#A1A1A1] leading-relaxed">
                      Partnership opportunities, booth dimensions, stage time slots, and pricing.
                    </p>
                  </div>
                  <span className="text-xs text-white underline underline-offset-4 hover:text-[#A4AA1A] cursor-pointer">
                    Download Deck →
                  </span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 self-stretch shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                <div
                  className="flex rounded-xl overflow-hidden flex-col items-start justify-between self-stretch flex-1 p-4 border-[0.5px] border-[#FFFFFF1A] min-h-[200px]"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                  }}
                >
                  <div className="text-xs text-[#F17969] font-mono">Research Report</div>
                  <div className="flex flex-col gap-1 my-auto">
                    <h3 className="text-white text-base font-medium">AI in Pharma 2026</h3>
                    <p className="text-xs text-[#A1A1A1] leading-relaxed">
                      State of AI adoption in Indian pharma: drug discovery to regulatory compliance.
                    </p>
                  </div>
                  <span className="text-xs text-white underline underline-offset-4 hover:text-[#F17969] cursor-pointer">
                    Download Report →
                  </span>
                </div>
              </div>
            </div>
          </section>

          <GrungeSeparator />

          {/* ================================================================ */}
          {/* SECTION 8: VENUE, LOGISTICS & FAQ ACCORDION                      */}
          {/* ================================================================ */}
          <section id="venue-logistics" className="scroll-mt-28 flex flex-col items-start gap-7 w-full">
            <div className="flex flex-col items-start gap-3 w-full">
              <h2
                style={{
                  fontFamily: HELVETICA,
                  fontSize: "20px",
                  lineHeight: "26px",
                  fontWeight: 500,
                  color: "#FFFFFF",
                }}
              >
                Logistics &amp; FAQ: Eliminating Last-Mile Friction
              </h2>
              <p
                style={{
                  fontFamily: HELVETICA,
                  fontSize: "16px",
                  lineHeight: "22px",
                  color: "rgba(255, 255, 255, 0.8)",
                  fontWeight: 400,
                }}
              >
                For interstate CXO travelers, hotel proximity to international airport terminals and clear venue navigation are major booking considerations. We integrated direct distance indicators (~4km, 15 min drive from BOM Airport to The Leela Mumbai) and an interactive FAQ accordion to answer common procurement questions.
              </p>
            </div>

            {/* FAQ Accordion */}
            <div className="flex flex-col gap-2 w-full">
              {[
                {
                  q: "What exactly does GPACTS focus on?",
                  a: "GPACTS focuses on the intersection of pharma IT infrastructure, digital transformation, and regulatory compliance. We provide deep dive technical sessions on GxP compliant automation, data integrity, and scalable cloud architectures specific to pharmaceutical manufacturing and distribution.",
                },
                {
                  q: "Who should attend GPACTS 2026?",
                  a: "CIOs, CDOs, VP of Engineering, Heads of Data Science, and Regulatory Technology Directors from mid-to-large life sciences and pharmaceutical enterprises.",
                },
                {
                  q: "How is GPACTS different from generic IT conferences?",
                  a: "GPACTS is strictly curated for life sciences. Every case study presented is pre-audited for real production validation, regulatory adherence (USFDA/21 CFR Part 11), and measurable ROI.",
                },
              ].map((item, idx) => {
                const isOpen = expandedFaq === idx;
                return (
                  <div
                    key={idx}
                    className="flex flex-col rounded-xl overflow-hidden border border-white/10 bg-[#171717] transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedFaq(isOpen ? null : idx)}
                      className="flex items-center justify-between p-4 text-left w-full cursor-pointer hover:bg-white/5"
                    >
                      <span className="text-sm font-medium text-white">{item.q}</span>
                      <span className="text-neutral-400 text-base">{isOpen ? "−" : "+"}</span>
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs text-[#A1A1A1] leading-relaxed border-t border-white/5 pt-3">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          <GrungeSeparator />

          {/* ================================================================ */}
          {/* SECTION 9: IMPACT & OUTCOMES                                     */}
          {/* ================================================================ */}
          <section id="metrics" className="scroll-mt-28 flex flex-col items-start gap-9 self-stretch w-full">
            <div className="flex items-center gap-3 self-stretch">
              <div className="tracking-[-0.02em] font-medium text-white text-xl">
                Impact &amp; Measurable Outcomes
              </div>
            </div>

            <div className="flex flex-col items-start gap-6 w-full">
              <p
                style={{
                  fontFamily: HELVETICA,
                  fontSize: "16px",
                  lineHeight: "22px",
                  color: "rgba(255, 255, 255, 0.8)",
                  fontWeight: 400,
                }}
              >
                The new website architecture transformed the event&apos;s digital funnel. By decoupling the multi-city agenda into interactive city hubs, highlighting executive social proof, and clarifying sponsorship tiers, GPACTS achieved record conversion rates across all registration funnels.
              </p>

              {/* Outcome Stat Cards */}
              <div className="flex items-start gap-4 self-stretch w-full">
                <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 flex-1 self-stretch shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                  <div
                    className="flex rounded-xl overflow-hidden flex-col items-start justify-between self-stretch flex-1 p-5 border-[0.5px] border-[#FFFFFF1A]"
                    style={{
                      backgroundImage:
                        "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="rotate-270 text-emerald-400">
                        <path d="M5 12h14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="m12 5 7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="text-[40px] font-medium text-white tracking-tight leading-none">
                        +54%
                      </div>
                    </div>
                    <div className="text-xs text-[#A1A1A1] mt-3">
                      Increase in early-bird delegate registrations compared to previous single-page format.
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 flex-1 self-stretch shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                  <div
                    className="flex rounded-xl overflow-hidden flex-col items-start justify-between self-stretch flex-1 p-5 border-[0.5px] border-[#FFFFFF1A]"
                    style={{
                      backgroundImage:
                        "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="rotate-270 text-emerald-400">
                        <path d="M5 12h14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="m12 5 7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="text-[40px] font-medium text-white tracking-tight leading-none">
                        3.2x
                      </div>
                    </div>
                    <div className="text-xs text-[#A1A1A1] mt-3">
                      Growth in qualified sponsorship deck downloads and partner inquiries within the first 14 days.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <GrungeSeparator />

          {/* ================================================================ */}
          {/* SECTION 10: INTERACTIVE UI MOCKUPS / PLAYGROUND                  */}
          {/* ================================================================ */}
          <section id="ui-mockups" className="scroll-mt-28 flex flex-col items-start gap-9 self-stretch w-full">
            <div className="flex items-center gap-3 self-stretch">
              <div className="tracking-[-0.02em] font-medium text-white text-xl">
                UI Mockups &amp; Full Canvas
              </div>
            </div>

            {/* Bento Card Outer Preview Frame */}
            <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 w-full max-w-[598px] h-[598px] shrink-0 shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
              <div
                className="aspect-square rounded-xl self-stretch flex-1 overflow-hidden relative border-[0.5px] border-[#FFFFFF1A] w-full h-full"
                style={{
                  backgroundImage:
                    "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                }}
              >
                {/* Floating Preview Browser Mockup */}
                <div
                  className="w-[520px] h-[500px] left-1/2 top-10 -translate-x-1/2 absolute bg-cover bg-top rounded-xl opacity-80 pointer-events-none shadow-2xl border border-white/10"
                  style={{
                    backgroundImage: "url(/case-studies/gpacts/homescreen.png)",
                  }}
                />

                {/* Open Playground Button Card in Center */}
                <button
                  type="button"
                  onClick={() => {
                    setIsPlaygroundOpen(true);
                    setCanvasZoom(0.45);
                    setCanvasPan({ x: 0, y: 0 });
                  }}
                  className="group flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 left-1/2 top-1/2 absolute bg-[#242424] border-[0.5px] border-[#FFFFFF0F] -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 z-10 shadow-[0_20px_40px_rgba(0,0,0,0.7)]"
                >
                  <div
                    className="flex rounded-xl overflow-hidden flex-col items-center justify-center px-5 py-3 border-[0.5px] border-[#FFFFFF1A] transition-colors group-hover:border-white/30"
                    style={{
                      backgroundImage:
                        "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                    }}
                  >
                    <div
                      className="w-fit text-white text-base font-medium flex items-center gap-2"
                      style={{ fontFamily: HELVETICA }}
                    >
                      <span>Open Canvas Playground</span>
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
                <div
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#242424]/90 border border-white/10 backdrop-blur-md text-xs text-neutral-300 pointer-events-auto shadow-lg"
                  style={{ fontFamily: HELVETICA }}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-medium text-white">GPACTS Homescreen Canvas</span>
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
                    {/* Browser Chrome Header */}
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
              <div
                className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#242424]/95 border border-white/15 backdrop-blur-lg shadow-[0_10px_30px_rgba(0,0,0,0.7)]"
                style={{ fontFamily: HELVETICA }}
              >
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
                  className="px-2.5 py-1 text-xs text-white font-medium hover:bg-white/10 rounded-md transition-colors cursor-pointer"
                  style={{ fontFamily: FIRA_CODE }}
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
  );
}
