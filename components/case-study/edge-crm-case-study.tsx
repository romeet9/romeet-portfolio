"use client";

import React, { useState, useEffect } from "react";
import { HalftoneDots } from "@paper-design/shaders-react";
import { CaseStudyNav, CaseStudyBackButton } from "./case-study-nav";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "the-problem", label: "The Problem" },
  { id: "hmw", label: "How might we?" },
  { id: "before-after", label: "Before & After" },
];

const HELVETICA =
  "\"Helvetica Neue\", Helvetica, Arial, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif";
const FIRA_CODE = "\"Fira Code\", ui-monospace, SFMono-Regular, Menlo, monospace";

function GrungeSeparator() {
  return (
    <div className="flex w-full justify-center py-2" aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M05ZA7AQR379995KJKXBG29X.png"
        alt=""
        className="w-[197px] h-[10px] object-contain opacity-60 select-none pointer-events-none"
      />
    </div>
  );
}

export function EdgeCrmCaseStudy() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className="relative w-full text-white antialiased pt-20 sm:pt-24 lg:pt-28 pb-36 px-4"
      style={{
        fontFamily: HELVETICA,
        letterSpacing: "normal",
        fontFeatureSettings: "normal",
      }}
    >
      {/* FIXED LEFT-SIDE NAVIGATION */}
      <CaseStudyNav items={SECTIONS} />

      {/* Main 600px Content Column */}
      <div className="relative mx-auto w-full max-w-[600px]">
        <CaseStudyBackButton href="/case-studies" />

        <main className="flex w-full flex-col items-start gap-11">
          {/* Header Title & Metadata */}
          <div className="flex w-full flex-col gap-8 pb-6 border-b border-[#FFFFFF33]">
            <h1
              style={{
                fontFamily: HELVETICA,
                fontSize: "26px",
                lineHeight: "32px",
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
                  Mobile App Redesign
                </span>
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <div className="flex flex-col items-center gap-18.5 w-full">
            <div className="flex flex-col items-start gap-7.25 w-full">
              {/* Hero Shader Card */}
              <div className="flex w-full flex-col items-center rounded-2xl justify-center gap-1.5 p-1 shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                <div className="overflow-clip h-[378px] rounded-xl w-full relative shrink-0 shadow-[0_0_5px_rgba(0,0,0,0.2)] bg-[#9A8DE9]">
                  <div className="w-full h-full absolute bg-[#2B2B2B]" />
                  {mounted && (
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
                      className="w-166.5 h-125 absolute left-[50%] top-[50%]"
                      style={{
                        backgroundImage:
                          "linear-gradient(in oklab 178.97deg, oklab(71.5% -0.021 -0.137) 39.15%, oklab(40% 0 0 / 0%) 79.28%)",
                        translate: "-50% -50%",
                      }}
                    />
                  )}
                  <div className="flex flex-col items-center justify-center py-4 left-0 right-0 top-[29.5px] absolute z-10">
                    <div className="w-fit tracking-[-0.02em] font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-white text-2xl/7.5">
                      Case logging at speed
                    </div>
                  </div>
                  <div
                    className="aspect-[151/304] w-53.25 max-w-full overflow-clip left-1/2 top-[113.5px] h-107.5 absolute filter-[drop-shadow(#000000A6_0px_20px_45px)] bg-size-[100%_100%] bg-position-[50%] bg-no-repeat pointer-events-none z-10"
                    style={{
                      backgroundImage:
                        "url(https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/4G3P97EH01JT5JG5EANWEFJKQ3.webp)",
                      translate: "-50%",
                    }}
                  />
                </div>
              </div>

              {/* Stat Callout */}
              <div
                className="flex items-center rounded-[1px] gap-3 w-full h-8.5 shrink-0 px-3"
                style={{
                  backgroundImage:
                    "linear-gradient(in oklab 90.67deg, oklab(61.5% 0 0 / 16%) 50%, oklab(80% 0 0 / 0%) 99.99%)",
                }}
              >
                <div className="w-0.5 rounded-full self-stretch shrink-0 bg-[#6BA0FF]" />
                <div className="flex items-start gap-1.25">
                  <div className="tracking-[-0.02em] w-fit shrink-0 font-light italic text-[#FFFFFF80] text-base/5">
                    User can log a high-priority case in under
                  </div>
                  <div className="tracking-[-0.02em] w-fit shrink-0 italic text-[#FFFFFFB3] text-base/5 font-medium">
                    10
                  </div>
                  <div className="tracking-[-0.02em] w-fit shrink-0 italic text-[#FFFFFFB3] text-base/5">
                    clicks
                  </div>
                </div>
              </div>

              {/* Problem Discovery Narrative */}
              <div className="flex flex-col items-start gap-3 w-full">
                <div className="w-full text-[#FFFFFFB3] text-base/5">
                  So the PM came and told me that our sales representatives are facing some issues with the app.
                </div>
                <div className="w-full text-[#FFFFFFB3] text-base/5">
                  When I reached out to them, they said that it&apos;s taking them way too long to add a case for a particular client.
                </div>
                <div className="w-full text-[#FFFFFFB3] text-base/5">
                  I thought, why will it matter for a sales representative to actually do it?
                </div>
                <div className="w-full text-[#FFFFFFB3] text-base/5">
                  I learned that it&apos;s one of the main reasons why the sales reps are taking way too long with a particular client and eventually missing their deadlines.
                </div>
              </div>
            </div>

            <GrungeSeparator />

            {/* 1. ABOUT SECTION */}
            <section id="about" className="flex flex-col items-start gap-3 w-full scroll-mt-24">
              <h2 className="tracking-[-0.02em] w-full font-medium text-white text-xl/6">
                About
              </h2>
              <div className="flex flex-col items-start gap-14 w-full">
                <div className="flex flex-col items-start gap-3 w-full">
                  <div className="w-full text-[#FFFFFFB3] text-base/5">
                    Edge CRM is basically a B2B SaaS product, and I was designing the mobile experience.
                  </div>
                  <div className="w-full text-[#FFFFFFB3] text-base/5">
                    It was a tool mostly used by the sales representatives to directly communicate with the client.
                  </div>
                </div>

                {/* 3 Feature Bento Cards */}
                <div className="flex items-start gap-4 w-full">
                  {/* Card 1 */}
                  <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 flex-1 shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                    <div
                      className="aspect-square flex rounded-xl overflow-hidden flex-col items-center justify-center w-full flex-1 px-2.5 py-3 relative bg-origin-border"
                      style={{
                        backgroundImage:
                          "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                      }}
                    >
                      {mounted && (
                        <HalftoneDots
                          contrast={1}
                          originalColors={false}
                          inverted
                          grid="square"
                          radius={1}
                          size={0.8}
                          scale={1}
                          image="https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M05PSD8DDRMVX6V0K90RJ3Q3.jpg"
                          grainSize={0.5}
                          type="holes"
                          fit="cover"
                          grainMixer={0.05}
                          grainOverlay={0.3}
                          colorFront="#6BA0FF"
                          colorBack="#00000000"
                          className="w-102.75 h-77.25 absolute left-[calc(50%-0.25px)] top-[calc(50%+0.001px)] bg-[#141414]"
                          style={{ translate: "-50% -50%" }}
                        />
                      )}
                      <div
                        className="w-47.5 h-47.5 absolute -left-[5.16px] -top-[4.5px]"
                        style={{
                          backgroundImage:
                            "linear-gradient(in oklab 180deg, oklab(20.1% 0 0) 0%, oklab(71.8% 0 0 / 0%) 300.1%)",
                        }}
                      />
                      <div className="items-start flex flex-col justify-between gap-1.5 flex-1 w-full relative z-10">
                        <div className="w-fit font-['Instrument_Sans',system-ui,sans-serif] text-white text-base/4.5 font-medium">
                          Audit records
                        </div>
                        <div className="w-full font-['Instrument_Sans',system-ui,sans-serif] text-white/90 text-sm/4.5">
                          Used to track records of a particular feature or issue.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 flex-1 shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                    <div
                      className="aspect-square flex rounded-xl overflow-hidden flex-col items-center justify-center w-full flex-1 px-2.5 py-3 relative bg-origin-border"
                      style={{
                        backgroundImage:
                          "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                      }}
                    >
                      {mounted && (
                        <HalftoneDots
                          contrast={1}
                          originalColors={false}
                          inverted
                          grid="square"
                          radius={1}
                          size={0.8}
                          scale={1}
                          image="https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M05PSD8DDRMVX6V0K90RJ3Q3.jpg"
                          grainSize={0.5}
                          type="holes"
                          fit="cover"
                          grainMixer={0.05}
                          grainOverlay={0.3}
                          colorFront="#6BA0FF"
                          colorBack="#00000000"
                          className="w-102.75 h-77.25 absolute left-[calc(50%-0.25px)] top-[50%] bg-[#141414]"
                          style={{ translate: "-50% -50%" }}
                        />
                      )}
                      <div
                        className="w-47.75 h-47.5 absolute -left-[5.5px] -top-[4.5px]"
                        style={{
                          backgroundImage:
                            "linear-gradient(in oklab 180deg, oklab(20.1% 0 0) 0%, oklab(71.8% 0 0 / 0%) 300.1%)",
                        }}
                      />
                      <div className="items-start flex flex-col justify-between gap-1.5 flex-1 w-full relative z-10">
                        <div className="w-fit font-['Instrument_Sans',system-ui,sans-serif] text-white text-base/4.5 font-medium">
                          Frequency
                        </div>
                        <div className="w-full font-['Instrument_Sans',system-ui,sans-serif] text-white/90 text-sm/4.5">
                          Used by sales reps each and every day.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 flex-1 shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                    <div
                      className="aspect-square flex rounded-xl overflow-hidden flex-col items-center justify-center w-full flex-1 px-2.5 py-3 relative bg-origin-border"
                      style={{
                        backgroundImage:
                          "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                      }}
                    >
                      {mounted && (
                        <HalftoneDots
                          contrast={1}
                          originalColors={false}
                          inverted
                          grid="square"
                          radius={1}
                          size={0.8}
                          scale={1}
                          image="https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M05PST8J25JQRT8JR53JG7M4.jpg"
                          grainSize={0.5}
                          type="soft"
                          fit="cover"
                          grainOverlay={0.3}
                          grainMixer={0.05}
                          colorFront="#6BA0FF"
                          colorBack="#00000000"
                          className="w-67 h-50.5 absolute left-[50%] top-[50%] bg-[#141414]"
                          style={{ translate: "-50% -50%" }}
                        />
                      )}
                      <div
                        className="w-46.25 h-46.5 absolute left-[0.25px] -top-[0.27px]"
                        style={{
                          backgroundImage:
                            "linear-gradient(in oklab 180deg, oklab(20.1% 0 0) 0%, oklab(71.8% 0 0 / 0%) 300.1%)",
                        }}
                      />
                      <div className="items-start flex flex-col justify-between gap-1.5 flex-1 w-full relative z-10">
                        <div className="w-fit font-['Instrument_Sans',system-ui,sans-serif] text-white text-base/4.5 font-medium">
                          Communication
                        </div>
                        <div className="w-full font-['Instrument_Sans',system-ui,sans-serif] text-white/90 text-sm/4.5">
                          To directly communicate with the client.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <GrungeSeparator />

            {/* 2. THE PROBLEM SECTION */}
            <section id="the-problem" className="flex flex-col items-start gap-3 w-full scroll-mt-24">
              <h2 className="tracking-[-0.02em] w-full font-medium text-white text-xl/6">
                Discovering the problem statement.
              </h2>
              <div className="flex flex-col items-start gap-14 w-full">
                <div className="flex flex-col items-start gap-3 w-full">
                  <div className="w-full text-[#FFFFFFB3] text-base/5">
                    I basically got it from my PM that the sales representatives are not able to complete their targets and complete their deadlines.
                  </div>
                  <div className="w-full text-[#FFFFFFB3] text-base/5">
                    So after actually talking with the sales rep, I found out this.
                  </div>
                </div>

                {/* Problem Statement Shader Card */}
                <div className="flex flex-col items-start gap-3 w-full">
                  <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 w-full h-[310px] shrink-0 shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                    <div
                      className="aspect-square flex rounded-xl flex-col items-start justify-between w-full px-5 py-6 h-full overflow-hidden relative shrink-0 bg-origin-border"
                      style={{
                        backgroundImage:
                          "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                      }}
                    >
                      {mounted && (
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
                          className="w-166.5 h-125 absolute left-[50%] top-[50%]"
                          style={{
                            backgroundImage:
                              "linear-gradient(in oklab 178.97deg, oklab(71.1% -0.023 -0.149) 41.45%, oklab(40% 0 0 / 0%) 79.28%)",
                            translate: "-50% -50%",
                          }}
                        />
                      )}
                      <div
                        className="w-[600px] h-[318px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                        style={{
                          backgroundImage:
                            "linear-gradient(in oklab 180deg, oklab(71.8% 0 0 / 0%) -122.12%, oklab(20.1% 0 0) 102.12%)",
                        }}
                      />
                      <div className="w-fit relative font-medium text-white text-xl/4.5 z-10">
                        Problem Statement.
                      </div>
                      <div className="text-justify relative w-full text-[#FFFFFFB3] text-base/5 z-10">
                        The sales representatives were facing an issue adding a case for a particular client, and it was taking the most scheduled time for that client.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <GrungeSeparator />

            {/* 3. HOW MIGHT WE SECTION */}
            <section id="hmw" className="flex flex-col items-start gap-3 w-full scroll-mt-24">
              <h2 className="tracking-[-0.02em] w-full font-medium text-white text-xl/6">
                How might we?
              </h2>
              <div className="flex flex-col items-start gap-14 w-full">
                <div className="flex flex-col items-start gap-3 w-full">
                  <div className="w-full text-[#FFFFFFB3] text-base/5">
                    Thus, to actually narrow it down a little bit, I create a “how might we” statement.
                  </div>
                  <div className="w-full text-[#FFFFFFB3] text-base/5">
                    It basically helps me narrow down the problem statement and stay focused on working on it rather than solving some other issue.
                  </div>
                </div>

                <div
                  className="flex flex-col items-start gap-3 p-4 w-full bg-origin-border border-l-[3px] border-l-[#6597F1] rounded-r-lg"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 90deg, oklab(100% 0 0 / 10%) 0.74%, oklab(80% 0 0 / 0%) 100%)",
                  }}
                >
                  <div className="w-fit font-medium text-white text-xl/4.5">
                    Which case needs me right now?
                  </div>
                  <div className="text-justify w-full text-[#FFFFFFB3] text-base/5">
                    A single question that redesign had to answer.
                  </div>
                </div>
              </div>
            </section>

            <GrungeSeparator />

            {/* 4. BEFORE & AFTER SECTION */}
            <section id="before-after" className="flex flex-col w-full pt-2 gap-8 scroll-mt-24">
              <div className="flex items-center gap-3">
                <h2 className="font-medium text-white text-xl/6">
                  Before &amp; After
                </h2>
                <span className="text-[#FFFFFF66] text-xs/4">
                  Tracing the Transformation
                </span>
              </div>
              <p className="text-[#FFFFFFB3] text-base/5">
                Comparing the legacy 1-page form against the stepped, validated 3-stage interface.
              </p>

              {/* Before & After Interactive Comparison Box */}
              <div className="flex flex-col w-full p-1 rounded-2xl shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                <div
                  className="flex flex-col rounded-xl overflow-hidden bg-origin-border border-[0.5px] border-[#FFFFFF1A]"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                  }}
                >
                  <div className="flex items-center justify-between pt-4 pb-3.5 px-5 border-b-[0.5px] border-b-[#FFFFFF1A]">
                    <div className="flex items-center py-1 px-3 rounded-full gap-1.5 bg-[#00000080] border-[0.5px] border-[#FFFFFF33]">
                      <div className="rounded-full shrink-0 bg-[#B81919] size-1.5" />
                      <span className="font-['Fira_Code',system-ui,sans-serif] text-white text-[10px]/3">
                        BEFORE — Unstructured Scroll
                      </span>
                    </div>
                    <div className="flex items-center py-1 px-3 rounded-full gap-1.5 bg-[#00000080] border-[0.5px] border-[#FFFFFF33]">
                      <div className="rounded-full shrink-0 bg-[#10B981] size-1.5" />
                      <span className="font-['Fira_Code',system-ui,sans-serif] text-white text-[10px]/3">
                        AFTER — 3-Step Validated Flow
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start justify-between py-6 px-5 gap-4">
                    {/* Before Phone Mockup */}
                    <div className="flex flex-col items-center grow basis-[0%] gap-2.5">
                      <div className="w-40 h-85 flex flex-col rounded-[28px] overflow-hidden shrink-0 bg-[#1A1A1A] border border-[#FFFFFF26]">
                        <div className="h-full flex flex-col bg-[#F5F5F5]">
                          <div className="flex flex-col pt-3 pb-2 gap-1 px-3.5 bg-white">
                            <div className="flex items-center justify-between">
                              <div className="font-bold text-[#111111] text-[11px]/3.5">
                                Add Case
                              </div>
                              <div className="text-[#999999] text-[9px]/3">
                                Cancel
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col overflow-hidden">
                            <div className="py-2 px-3.5 bg-white border-b-[0.5px] border-b-[#E5E5E5]">
                              <div className="text-[#999999] text-[9px]/3">
                                CASE TITLE *
                              </div>
                              <div className="h-3.5 mt-1 rounded-[3px] bg-[#F5F5F5]" />
                            </div>
                            <div className="py-2 px-3.5 bg-white border-b-[0.5px] border-b-[#E5E5E5]">
                              <div className="text-[#999999] text-[9px]/3">
                                CASE TYPE *
                              </div>
                              <div className="h-3.5 mt-1 rounded-[3px] bg-[#F5F5F5]" />
                            </div>
                            <div className="py-2 px-3.5 bg-white border-b-[0.5px] border-b-[#E5E5E5]">
                              <div className="text-[#999999] text-[9px]/3">
                                CLIENT *
                              </div>
                              <div className="h-3.5 mt-1 rounded-[3px] bg-[#F5F5F5]" />
                            </div>
                            <div className="py-2 px-3.5 bg-white border-b-[0.5px] border-b-[#E5E5E5]">
                              <div className="text-[#999999] text-[9px]/3">
                                PRIORITY *
                              </div>
                              <div className="h-3.5 mt-1 rounded-[3px] bg-[#F5F5F5]" />
                            </div>
                            <div className="py-2 px-3.5 bg-white border-b-[0.5px] border-b-[#E5E5E5]">
                              <div className="text-[#999999] text-[9px]/3">
                                ASSIGN TO *
                              </div>
                              <div className="h-3.5 mt-1 rounded-[3px] bg-[#F5F5F5]" />
                            </div>
                            <div className="py-2 px-3.5 bg-white border-b-[0.5px] border-b-[#E5E5E5]">
                              <div className="text-[#999999] text-[9px]/3">
                                DESCRIPTION
                              </div>
                              <div className="h-6 mt-1 rounded-[3px] bg-[#F5F5F5]" />
                            </div>
                            <div className="py-2 px-3.5 bg-white border-b-[0.5px] border-b-[#E5E5E5]">
                              <div className="text-[#999999] text-[9px]/3">
                                DUE DATE *
                              </div>
                              <div className="h-3.5 mt-1 rounded-[3px] bg-[#F5F5F5]" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <span className="tracking-[0.05em] font-['Fira_Code',system-ui,sans-serif] text-[#FFFFFF80] text-[9px]/3">
                        BEFORE
                      </span>
                    </div>

                    {/* Middle Transformation Badges */}
                    <div className="flex flex-col grow-[1.4] basis-[0%] pt-2 gap-2">
                      <div className="flex flex-col p-2.5 rounded-lg gap-1 bg-[#00000099] border-[0.5px] border-[#FFFFFF1A]">
                        <span className="tracking-[0.08em] font-['Fira_Code',system-ui,sans-serif] text-[#FFFFFF66] text-[9px]/3">
                          CHANGE 01
                        </span>
                        <div className="mt-0.5 font-bold text-white text-[11px]/3.5">
                          Stepped flow + progress bar
                        </div>
                        <div className="mt-0.5 text-[#FFFFFF8C] text-[10px]/3.5">
                          One long scroll replaced by clear 3-step sections with progress tracking.
                        </div>
                      </div>
                      <div className="flex flex-col p-2.5 rounded-lg gap-1 bg-[#00000099] border-[0.5px] border-[#FFFFFF1A]">
                        <span className="tracking-[0.08em] font-['Fira_Code',system-ui,sans-serif] text-[#FFFFFF66] text-[9px]/3">
                          CHANGE 02
                        </span>
                        <div className="mt-0.5 font-bold text-white text-[11px]/3.5">
                          Notification banner
                        </div>
                        <div className="mt-0.5 text-[#FFFFFF8C] text-[10px]/3.5">
                          Proactive alerts flag missing required fields before submission.
                        </div>
                      </div>
                      <div className="flex flex-col p-2.5 rounded-lg gap-1 bg-[#00000099] border-[0.5px] border-[#FFFFFF1A]">
                        <span className="tracking-[0.08em] font-['Fira_Code',system-ui,sans-serif] text-[#FFFFFF66] text-[9px]/3">
                          CHANGE 03
                        </span>
                        <div className="mt-0.5 font-bold text-white text-[11px]/3.5">
                          Grouped, pre-filled fields
                        </div>
                        <div className="mt-0.5 text-[#FFFFFF8C] text-[10px]/3.5">
                          Known CRM values pre-filled with green verification checkmarks.
                        </div>
                      </div>
                      <div className="flex flex-col p-2.5 rounded-lg gap-1 bg-[#00000099] border-[0.5px] border-[#FFFFFF1A]">
                        <span className="tracking-[0.08em] font-['Fira_Code',system-ui,sans-serif] text-[#FFFFFF66] text-[9px]/3">
                          CHANGE 04
                        </span>
                        <div className="mt-0.5 font-bold text-white text-[11px]/3.5">
                          Full-width sticky CTA
                        </div>
                        <div className="mt-0.5 text-[#FFFFFF8C] text-[10px]/3.5">
                          Prominent primary action button always within thumb reach.
                        </div>
                      </div>
                    </div>

                    {/* After Phone Mockup */}
                    <div className="flex flex-col items-center grow basis-[0%] gap-2.5">
                      <div className="w-40 h-85 flex flex-col rounded-[28px] overflow-hidden shrink-0 bg-[#1A1A1A] border border-[#FFFFFF26]">
                        <div className="h-full flex flex-col bg-white">
                          <div className="flex flex-col pt-3 pb-2 gap-1.5 px-3.5 bg-white">
                            <div className="flex items-center justify-between">
                              <div className="font-bold text-[#111111] text-[11px]/3.5">
                                Add Case
                              </div>
                              <div className="text-[#007AFF] text-[9px]/3">
                                Save
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="h-0.75 grow basis-[0%] rounded-xs bg-[#007AFF]" />
                              <div className="h-0.75 grow basis-[0%] rounded-xs bg-[#E5E5E5]" />
                              <div className="h-0.75 grow basis-[0%] rounded-xs bg-[#E5E5E5]" />
                            </div>
                            <div className="text-[#007AFF] text-[8px]/2.5">
                              Step 1 of 3 — Overview
                            </div>
                          </div>
                          <div className="flex items-center py-2 px-3.5 gap-1.5 bg-[#FFF3CD] border-l-[3px] border-l-[#F59E0B]">
                            <div className="text-[#92400E] text-[9px]/3 font-medium">
                              2 required fields missing
                            </div>
                          </div>
                          <div className="flex flex-col overflow-hidden">
                            <div className="mt-2 flex items-center justify-between py-2 px-3 rounded-lg bg-white border border-[#E5E5E5] mx-3">
                              <div>
                                <div className="text-[#999999] text-[8px]/2.5">
                                  CASE TITLE
                                </div>
                                <div className="mt-0.5 text-[#111111] text-[10px]/3 font-medium">
                                  Client escalation
                                </div>
                              </div>
                            </div>
                            <div className="mt-1.5 flex items-center justify-between py-2 px-3 rounded-lg bg-white border border-[#E5E5E5] mx-3">
                              <div>
                                <div className="text-[#999999] text-[8px]/2.5">
                                  CASE TYPE
                                </div>
                                <div className="mt-0.5 text-[#111111] text-[10px]/3 font-medium">
                                  Support
                                </div>
                              </div>
                              <div className="rounded-full shrink-0 bg-[#10B981] size-2.5 flex items-center justify-center text-white text-[7px]">
                                ✓
                              </div>
                            </div>
                            <div className="mt-1.5 py-2 px-3 rounded-lg bg-white border border-[#E5E5E5] mx-3">
                              <div className="text-[#999999] text-[8px]/2.5">
                                PRIORITY
                              </div>
                              <div className="mt-0.5 text-[#111111] text-[10px]/3 font-medium">
                                High
                              </div>
                            </div>
                          </div>
                          <div className="grow basis-[0%]" />
                          <div className="mb-3 flex items-center justify-center p-2.5 rounded-[10px] bg-[#007AFF] mx-3">
                            <div className="font-bold text-white text-[11px]/3.5">
                              Next → Type
                            </div>
                          </div>
                        </div>
                      </div>
                      <span className="font-['Fira_Code',system-ui,sans-serif] text-[#10B981] text-[9px]/3">
                        AFTER
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3 Outcome Summary Cards */}
              <div className="flex w-full pt-1 gap-3">
                <div className="flex flex-col grow basis-[0%] p-1 rounded-2xl shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                  <div
                    className="grow basis-[0%] flex flex-col justify-between min-h-30 p-3 rounded-xl bg-origin-border border-[0.5px] border-[#FFFFFF1A]"
                    style={{
                      backgroundImage:
                        "linear-gradient(in oklab 180deg, oklab(32.9% 0 0) 0%, oklab(30.1% 0 0) 100%)",
                    }}
                  >
                    <div className="font-medium text-white text-[14px]/4">
                      Stepped Flow
                    </div>
                    <div className="text-[#FFFFFFB3] text-xs/4 mt-2">
                      Converted 1 endless scroll into 3 logical steps.
                    </div>
                  </div>
                </div>
                <div className="flex flex-col grow basis-[0%] p-1 rounded-2xl shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                  <div
                    className="grow basis-[0%] flex flex-col justify-between min-h-30 p-3 rounded-xl bg-origin-border border-[0.5px] border-[#FFFFFF1A]"
                    style={{
                      backgroundImage:
                        "linear-gradient(in oklab 180deg, oklab(32.9% 0 0) 0%, oklab(30.1% 0 0) 100%)",
                    }}
                  >
                    <div className="font-medium text-white text-[14px]/4">
                      Field Differentiation
                    </div>
                    <div className="text-[#FFFFFFB3] text-xs/4 mt-2">
                      Bordered card inputs with explicit chevrons.
                    </div>
                  </div>
                </div>
                <div className="flex flex-col grow basis-[0%] p-1 rounded-2xl shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
                  <div
                    className="grow basis-[0%] flex flex-col justify-between min-h-30 p-3 rounded-xl bg-origin-border border-[0.5px] border-[#FFFFFF1A]"
                    style={{
                      backgroundImage:
                        "linear-gradient(in oklab 180deg, oklab(32.9% 0 0) 0%, oklab(30.1% 0 0) 100%)",
                    }}
                  >
                    <div className="font-medium text-white text-[14px]/4">
                      Inline Validation
                    </div>
                    <div className="text-[#FFFFFFB3] text-xs/4 mt-2">
                      Top warning banner + actionable inline fix cues.
                    </div>
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
