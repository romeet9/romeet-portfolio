"use client";

import React, { useState } from "react";
import Image from "next/image";
import { HalftoneDots } from "@paper-design/shaders-react";
import { CaseStudyNav, CaseStudyBackButton } from "@/components/case-study/case-study-nav";

const HELVETICA =
  "\"Helvetica Neue\", Helvetica, Arial, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif";

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

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "the-problem", label: "The Problem" },
  { id: "hmw", label: "How Might We" },
  { id: "table", label: "Design Direction" },
  { id: "before-after", label: "Before & After" },
];

export function EdgeCrmTestCaseStudy() {
  const [activeTab, setActiveTab] = useState<"before" | "after">("after");

  return (
    <div
      className="relative w-full text-white antialiased pt-20 sm:pt-24 lg:pt-28 pb-36 px-4"
      style={{
        fontFamily: HELVETICA,
      }}
    >
      {/* Sidebar Navigation */}
      <CaseStudyNav items={SECTIONS} />

      {/* Back Button beside the title */}
      <CaseStudyBackButton href="/case-studies" />

      {/* Main Single Column Container */}
      <div className="w-full max-w-[600px] mx-auto flex flex-col gap-9">
        {/* ================================================================ */}
        {/* 1. Header (Title + Meta Information) */}
        {/* ================================================================ */}
        <section className="flex flex-col gap-6">
          <h1
            className="text-2xl sm:text-[32px] font-medium leading-tight tracking-tight text-white"
            style={{ fontFamily: HELVETICA }}
          >
            Redesigning Edge CRM for B2B Field Sales Teams to Log Cases at Speed
          </h1>

          <div
            className="flex items-center justify-between border-t border-b border-white/10 py-3 text-xs tracking-wider uppercase text-neutral-400"
            style={{ fontFamily: HELVETICA }}
          >
            <div>
              <span className="block text-[10px] text-neutral-500 font-medium">ROLE</span>
              <span className="text-white normal-case font-normal text-sm">Product Designer</span>
            </div>
            <div>
              <span className="block text-[10px] text-neutral-500 font-medium">TIMELINE</span>
              <span className="text-white normal-case font-normal text-sm">Jan - Feb 2024</span>
            </div>
            <div>
              <span className="block text-[10px] text-neutral-500 font-medium">DELIVERABLES</span>
              <span className="text-white normal-case font-normal text-sm">0 to 1 Mobile Redesign</span>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 2. Hero Shader Bento Card + Discovery Quotes */}
        {/* ================================================================ */}
        <section className="flex flex-col gap-6">
          {/* Bento Card with Halftone Dots Shader & Phone Mockup */}
          <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 w-full shrink-0 [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
            <div
              className="rounded-xl overflow-hidden self-stretch flex-1 relative bg-origin-border [border-width:0.5px] border-solid border-[#FFFFFF1A] min-h-[380px] p-6 flex flex-col justify-between"
              style={{
                backgroundImage:
                  "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
              }}
            >
              <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-80">
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
                  image="https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M04G80ZAAH1PVPV1FAHY4PSW.jpg"
                  colorFront="#6BA0FF"
                  colorBack="#00000000"
                  className="w-full h-full absolute inset-0"
                />
              </div>

              {/* Card Title */}
              <div className="relative z-10">
                <h3 className="text-xl font-medium text-white tracking-tight">Case logging at speed</h3>
                <p className="text-sm text-neutral-300 mt-1">
                  Simplified multi-step flow with live field validation.
                </p>
              </div>

              {/* Mockup in card center */}
              <div className="relative z-10 flex justify-center items-center py-4">
                <div className="relative w-[180px] sm:w-[210px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
                  <Image
                    src="/projects/edge-crm/06-final.png"
                    alt="Edge CRM Redesigned Screen"
                    width={400}
                    height={800}
                    className="w-full h-auto object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Stat highlight with blue accent bar */}
          <div className="flex items-center gap-3 pl-3 border-l-2 border-[#6BA0FF]">
            <p className="text-sm text-neutral-300">
              Users can log a complete client case in under <span className="text-white font-medium">2 minutes</span> (reduced from 4+ minutes).
            </p>
          </div>

          {/* Discovery Narrative Paragraphs */}
          <div className="flex flex-col gap-3 text-sm text-neutral-300 leading-relaxed">
            <p>
              So the PM came and told me that our sales representatives are taking about 3 to 4 minutes just to log a single case.
            </p>
            <p>
              When I reached out to them, they said that it&apos;s taking them around 52 seconds just to answer a single question.
            </p>
            <p>
              I thought, why will it matter for a sales representative to take 3 to 4 minutes to log a case?
            </p>
            <p>
              I learned that it&apos;s one of the main reasons why the sales representatives are frustrated with the current system. And because of this, they are failing to reach their daily KPIs.
            </p>
          </div>
        </section>

        <GrungeSeparator />

        {/* ================================================================ */}
        {/* 3. About Section + 3 Bento Cards */}
        {/* ================================================================ */}
        <section id="about" className="scroll-mt-24 flex flex-col gap-4">
          <h2 className="text-lg font-medium text-white tracking-tight">About</h2>
          <div className="flex flex-col gap-3 text-sm text-neutral-300 leading-relaxed">
            <p>
              Edge CRM is basically a B2B SaaS product, and I was designing for the mobile application of Edge CRM.
            </p>
            <p>
              It was a tool mostly used by the sales representatives to dial client calls, log cases, and track interactions on the go.
            </p>
          </div>

          {/* 3 Feature Bento Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {/* Bento 1: Audit records */}
            <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 w-full shrink-0 [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
              <div
                className="rounded-xl overflow-hidden self-stretch flex-1 relative bg-origin-border [border-width:0.5px] border-solid border-[#FFFFFF1A] p-4 flex flex-col justify-between min-h-[170px]"
                style={{
                  backgroundImage:
                    "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                }}
              >
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60">
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
                    image="https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M04G80ZAAH1PVPV1FAHY4PSW.jpg"
                    colorFront="#6BA0FF"
                    colorBack="#00000000"
                    className="w-full h-full absolute inset-0"
                  />
                </div>
                <div className="relative z-10">
                  <div className="text-xs font-medium text-white mb-1">Audit records</div>
                  <div className="text-[11px] text-neutral-300 leading-snug">
                    Capture comprehensive call logs and notes for every client interaction seamlessly.
                  </div>
                </div>
              </div>
            </div>

            {/* Bento 2: Frequency */}
            <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 w-full shrink-0 [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
              <div
                className="rounded-xl overflow-hidden self-stretch flex-1 relative bg-origin-border [border-width:0.5px] border-solid border-[#FFFFFF1A] p-4 flex flex-col justify-between min-h-[170px]"
                style={{
                  backgroundImage:
                    "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                }}
              >
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60">
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
                    image="https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M04G80ZAAH1PVPV1FAHY4PSW.jpg"
                    colorFront="#6BA0FF"
                    colorBack="#00000000"
                    className="w-full h-full absolute inset-0"
                  />
                </div>
                <div className="relative z-10">
                  <div className="text-xs font-medium text-white mb-1">Frequency</div>
                  <div className="text-[11px] text-neutral-300 leading-snug">
                    Track touchpoint cadence to ensure consistent client relationship management.
                  </div>
                </div>
              </div>
            </div>

            {/* Bento 3: Communication */}
            <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 w-full shrink-0 [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
              <div
                className="rounded-xl overflow-hidden self-stretch flex-1 relative bg-origin-border [border-width:0.5px] border-solid border-[#FFFFFF1A] p-4 flex flex-col justify-between min-h-[170px]"
                style={{
                  backgroundImage:
                    "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                }}
              >
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60">
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
                    image="https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M04G80ZAAH1PVPV1FAHY4PSW.jpg"
                    colorFront="#6BA0FF"
                    colorBack="#00000000"
                    className="w-full h-full absolute inset-0"
                  />
                </div>
                <div className="relative z-10">
                  <div className="text-xs font-medium text-white mb-1">Communication</div>
                  <div className="text-[11px] text-neutral-300 leading-snug">
                    Streamline follow-ups and internal handoffs across the entire sales team.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <GrungeSeparator />

        {/* ================================================================ */}
        {/* 4. The Problem Section */}
        {/* ================================================================ */}
        <section id="the-problem" className="scroll-mt-24 flex flex-col gap-4">
          <h2 className="text-lg font-medium text-white tracking-tight">
            Discovering the problem statement.
          </h2>
          <div className="flex flex-col gap-3 text-sm text-neutral-300 leading-relaxed">
            <p>
              I basically got it from my PM that the sales representatives are not able to complete their targets and complete their deadlines.
            </p>
            <p>
              So after actually talking with the sales rep, I found out this.
            </p>
          </div>

          {/* Problem Statement Bento Card with Halftone Dots Shader */}
          <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 w-full shrink-0 [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
            <div
              className="rounded-xl overflow-hidden self-stretch flex-1 relative bg-origin-border [border-width:0.5px] border-solid border-[#FFFFFF1A] min-h-[220px] p-6 flex flex-col justify-between"
              style={{
                backgroundImage:
                  "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
              }}
            >
              <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-70">
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
                  image="https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M04G80ZAAH1PVPV1FAHY4PSW.jpg"
                  colorFront="#6BA0FF"
                  colorBack="#00000000"
                  className="w-full h-full absolute inset-0"
                />
              </div>
              <div className="relative z-10">
                <span className="text-xs uppercase tracking-wider text-[#6BA0FF] font-medium block mb-1">
                  Problem Statement
                </span>
                <p className="text-base text-neutral-200 leading-relaxed font-normal">
                  The sales representatives were facing an issue adding a case for a particular client, and it was taking the most scheduled time for that client.
                </p>
              </div>
            </div>
          </div>
        </section>

        <GrungeSeparator />

        {/* ================================================================ */}
        {/* 5. How Might We Section */}
        {/* ================================================================ */}
        <section id="hmw" className="scroll-mt-24 flex flex-col gap-4">
          <h2 className="text-lg font-medium text-white tracking-tight">How might we?</h2>
          <div className="flex flex-col gap-3 text-sm text-neutral-300 leading-relaxed">
            <p>
              Thus, to actually narrow it down a little bit, I create a “how might we” statement.
            </p>
            <p>
              It basically helps me narrow down the problem statement and stay focused on working on it rather than solving some other issue.
            </p>
          </div>

          {/* HMW Callout with blue gradient accent */}
          <div
            className="flex flex-col items-start gap-2 p-5 rounded-lg border-l-4 border-[#6597F1] relative overflow-hidden"
            style={{
              backgroundImage:
                "linear-gradient(in oklab 90deg, oklab(100% 0 0 / 8%) 0%, oklab(80% 0 0 / 0%) 100%)",
            }}
          >
            <div className="text-lg font-medium text-white">Which case needs me right now?</div>
            <div className="text-sm text-neutral-400">A single question that redesign had to answer.</div>
          </div>
        </section>

        <GrungeSeparator />

        {/* ================================================================ */}
        {/* 6. TABLE FRAME: Turning the triage problem into a design direction */}
        {/* ================================================================ */}
        <section id="table" className="scroll-mt-24 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h2 className="text-xl font-medium text-white tracking-tight">
              Turning the triage problem into a design direction.
            </h2>
            <div className="flex flex-col gap-2 text-sm text-neutral-300 leading-relaxed">
              <p>
                I broke the screen down into three main failures: visual hierarchy, information architecture, and interaction design.
              </p>
              <p>
                Eventually, I walked each one into a concrete direction.
              </p>
            </div>
          </div>

          {/* Subheading: 1. Unstructured long form */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-medium text-white tracking-tight">
              1. Unstructured long form
            </h3>
            <div className="flex flex-col gap-3 text-sm text-neutral-300 leading-relaxed">
              <p>
                The form felt overwhelming because reps had no clear sense of progress or where one information group ended and another began.
              </p>
              <p className="text-white font-medium pt-1">
                What actions do I need to take?
              </p>
              <ul className="flex flex-col gap-1.5 text-neutral-300 pl-1">
                <li>• Break the long form into clear, manageable sections.</li>
                <li>• Give users a clear sense of progress and context.</li>
                <li>• Make each stage easy to scan before filling.</li>
              </ul>
            </div>

            {/* 3 Bento Direction Cards with HalftoneDots Shaders */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {/* Card 1: Progress bar */}
              <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 w-full shrink-0 [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
                <div
                  className="rounded-xl overflow-hidden self-stretch flex-1 relative bg-origin-border [border-width:0.5px] border-solid border-[#FFFFFF1A] px-4 py-5 flex flex-col justify-between min-h-[220px]"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                  }}
                >
                  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60">
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
                      image="https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M04G80ZAAH1PVPV1FAHY4PSW.jpg"
                      colorFront="#6BA0FF"
                      colorBack="#00000000"
                      className="w-full h-full absolute inset-0"
                    />
                  </div>
                  <div className="relative z-10 flex flex-col justify-between flex-1 gap-2">
                    <div className="text-sm font-medium text-white">Progress bar</div>
                    <div className="text-xs text-neutral-300 leading-relaxed">
                      Add a step progress bar at the top so reps immediately understand how much of the form remains.
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Clear labels */}
              <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 w-full shrink-0 [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
                <div
                  className="rounded-xl overflow-hidden self-stretch flex-1 relative bg-origin-border [border-width:0.5px] border-solid border-[#FFFFFF1A] px-4 py-5 flex flex-col justify-between min-h-[220px]"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                  }}
                >
                  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60">
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
                      image="https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M04G80ZAAH1PVPV1FAHY4PSW.jpg"
                      colorFront="#6BA0FF"
                      colorBack="#00000000"
                      className="w-full h-full absolute inset-0"
                    />
                  </div>
                  <div className="relative z-10 flex flex-col justify-between flex-1 gap-2">
                    <div className="text-sm font-medium text-white">Clear labels</div>
                    <div className="text-xs text-neutral-300 leading-relaxed">
                      Add prominent section labels so users always understand what type of information they’re entering.
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Break the fields */}
              <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 w-full shrink-0 [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
                <div
                  className="rounded-xl overflow-hidden self-stretch flex-1 relative bg-origin-border [border-width:0.5px] border-solid border-[#FFFFFF1A] px-4 py-5 flex flex-col justify-between min-h-[220px]"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                  }}
                >
                  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60">
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
                      image="https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M04G80ZAAH1PVPV1FAHY4PSW.jpg"
                      colorFront="#6BA0FF"
                      colorBack="#00000000"
                      className="w-full h-full absolute inset-0"
                    />
                  </div>
                  <div className="relative z-10 flex flex-col justify-between flex-1 gap-2">
                    <div className="text-sm font-medium text-white">Break the fields</div>
                    <div className="text-xs text-neutral-300 leading-relaxed">
                      Divide the long form into focused sections like Overview, Case Details, and Business Details.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <GrungeSeparator />

        {/* ================================================================ */}
        {/* 7. Interactive Before & After Comparison Showcase */}
        {/* ================================================================ */}
        <section id="before-after" className="scroll-mt-24 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-medium text-white tracking-tight">
              Before &amp; After Redesign Comparison
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Transforming an unstructured 1-page form into a streamlined 3-step validated workflow.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center justify-center gap-2 p-1 rounded-xl bg-neutral-900/90 border border-white/10 w-fit mx-auto">
            <button
              onClick={() => setActiveTab("before")}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === "before"
                  ? "bg-red-500/20 text-red-300 border border-red-500/30"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Before Redesign (Legacy)
            </button>
            <button
              onClick={() => setActiveTab("after")}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === "after"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              After Redesign (Validated Flow)
            </button>
          </div>

          {/* Interactive Phone Showcase */}
          <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 w-full shrink-0 [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
            <div
              className="rounded-xl overflow-hidden self-stretch flex-1 relative bg-origin-border [border-width:0.5px] border-solid border-[#FFFFFF1A] min-h-[460px] p-6 flex flex-col items-center justify-center gap-4"
              style={{
                backgroundImage:
                  "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
              }}
            >
              <div className="relative w-[210px] sm:w-[240px] drop-shadow-[0_25px_50px_rgba(0,0,0,0.85)]">
                <Image
                  src={
                    activeTab === "before"
                      ? "/projects/edge-crm/01-before.png"
                      : "/projects/edge-crm/06-final.png"
                  }
                  alt={
                    activeTab === "before"
                      ? "Before Redesign Form"
                      : "After Redesign Flow"
                  }
                  width={400}
                  height={800}
                  className="w-full h-auto object-contain transition-all duration-300"
                />
              </div>

              {/* Status Badge */}
              <div className="mt-2 text-center">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase border ${
                    activeTab === "before"
                      ? "bg-red-950/60 text-red-300 border-red-500/30"
                      : "bg-emerald-950/60 text-emerald-300 border-emerald-500/30"
                  }`}
                >
                  {activeTab === "before"
                    ? "Legacy 1-Page Form (High Drop-off)"
                    : "3-Step Flow with Inline Validation"}
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
