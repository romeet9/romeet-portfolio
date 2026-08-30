"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { HalftoneDots } from "@paper-design/shaders-react";
import { CaseStudyNav, CaseStudyBackButton } from "./case-study-nav";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "phase-1", label: "Phase I" },
  { id: "the-problem", label: "The Problem" },
  { id: "phase-2", label: "Phase II" },
  { id: "fluid-interface", label: "Fluid Interface" },
  { id: "solving-3ts", label: "Solving for 3Ts" },
  { id: "impact", label: "Impact" },
  { id: "reflection", label: "Reflection" },
];

export function EdgeCrmTestCaseStudy() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative w-full text-white antialiased pt-20 sm:pt-24 lg:pt-28 pb-36 px-4" style={{ background: "transparent" }}>
      {/* FIXED LEFT-SIDE NAVIGATION */}
      <CaseStudyNav items={SECTIONS} />

      {/* Main 600px Content Column */}
      <div className="relative mx-auto w-full max-w-[600px]">
        <CaseStudyBackButton href="/case-studies" />
        <main className="flex flex-col">
<div className="[font-synthesis:none] wrap-anywhere flex flex-col items-start gap-11 w-149.5 shrink-0 antialiased text-xs/4">
      <div className="flex flex-col items-center gap-10.75 pb-4 border-b border-b-solid border-b-[#FFFFFF33]">
        <div className="tracking-[-0.02em] w-150 font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-white text-[26px]/8">
          A digital platform for the Indian citizens to cast and verify their vote online. 
        </div>
        <div className="flex items-center gap-8 w-149 justify-between">
          <div className="flex flex-col items-start gap-1">
            <div className="tracking-[0.07em] w-fit font-['Fira_Code',system-ui,sans-serif] font-light text-[#FFFFFFB3] text-xs/4">
              ROLE
            </div>
            <div className="w-fit font-['HelveticaNeue-Light','Helvetica_Neue',system-ui,sans-serif] font-light text-white text-sm/4.5">
              Product Designer
            </div>
          </div>
          <div className="flex flex-col items-start gap-1">
            <div className="tracking-[0.07em] w-fit font-['Fira_Code',system-ui,sans-serif] font-light text-[#FFFFFFB3] text-xs/4">
              TIMELINE
            </div>
            <div className="w-fit font-['HelveticaNeue-Light','Helvetica_Neue',system-ui,sans-serif] font-light text-white text-sm/4.5">
              Jan - Feb 2024
            </div>
          </div>
          <div className="flex flex-col items-start gap-1">
            <div className="tracking-[0.07em] w-fit font-['Fira_Code',system-ui,sans-serif] font-light text-[#FFFFFFB3] text-xs/4">
              DELIVERABLES
            </div>
            <div className="w-fit font-['HelveticaNeue-Light','Helvetica_Neue',system-ui,sans-serif] font-light text-white text-sm/4.5">
              0 to 1 product design
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-18.5 self-stretch">
        <div className="flex flex-col items-start gap-7.25">
          <div className="flex w-150 flex-col items-center rounded-2xl justify-center gap-1.5 p-1 [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
            <div className="overflow-clip h-94.5 rounded-xl self-stretch relative shrink-0 [box-shadow:#00000033_0px_0px_5px] bg-[#9A8DE9]">
              <div className="[left:-0.75px] [top:-0.273px] w-148 h-94.5 absolute bg-[#2B2B2B]" />
              <HalftoneDots contrast={1} originalColors={false} inverted grid="square" radius={1} size={0.8} scale={1} grainSize={0.5} type="soft" fit="cover" grainMixer={0.05} grainOverlay={0.3} image="https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M04G80ZAAH1PVPV1FAHY4PSW.jpg" colorFront="#6BA0FF" colorBack="#00000000" className="w-166.5 h-125 absolute left-[50%] top-[50%]" style={{ backgroundImage: 'linear-gradient(in oklab 178.97000000000003deg, oklab(71.5% -0.021 -0.137) 39.15%, oklab(40% 0 0 / 0%) 79.28%)', translate: '-50% -50%' }} />
              <div className="flex flex-col items-center justify-center py-4 [left:-0.484px] top-[29.516px] w-146.75 absolute">
                <div className="w-fit tracking-[-0.02em] font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-white text-2xl/7.5">
                  Voting at your fingerprints
                </div>
              </div>
              <div className="aspect-[151/304] w-53.25 max-w-full overflow-clip left-[calc(50%+0.5px)] top-[113.5px] h-107.5 absolute filter-[drop-shadow(#000000A6_0px_20px_45px)] bg-size-[100%_100%] bg-position-[50%] bg-no-repeat" style={{ backgroundImage: 'url(https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/4G3P97EH01JT5JG5EANWEFJKQ3.webp)', translate: '-50%' }} />
            </div>
          </div>
          <div className="flex items-center rounded-[1px] gap-3 w-150 h-8.5 shrink-0" style={{ backgroundImage: 'linear-gradient(in oklab 90.67000000000002deg, oklab(61.5% 0 0 / 16%) 50%, oklab(80% 0 0 / 0%) 99.99%)' }}>
            <div className="w-0.5 rounded-full self-stretch shrink-0 bg-[#6BA0FF]" />
            <div className="flex items-start gap-1.25">
              <div className="tracking-[-0.02em] w-fit shrink-0 font-['HelveticaNeue-LightItalic','Helvetica_Neue',system-ui,sans-serif] font-light italic text-[#FFFFFF80] text-base/5">
                User can literally cast there vote under
              </div>
              <div className="tracking-[-0.02em] w-fit shrink-0 font-['HelveticaNeue-Italic','Helvetica_Neue',system-ui,sans-serif] italic text-[#FFFFFFB3] text-base/5">
                10
              </div>
              <div className="tracking-[-0.02em] w-fit shrink-0 font-['HelveticaNeue-Italic','Helvetica_Neue',system-ui,sans-serif] italic text-[#FFFFFFB3] text-base/5">
                clicks
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-3">
            <div className="w-150 font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
              So the PM came and told me that our sales representatives are facing some issues with the app. 
            </div>
            <div className="w-150 font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
              When I reached out to them, they said that it's taking them way too long to add a case for a particular client. 
            </div>
            <div className="w-150 font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
              I thought, why will it matter for a sales representative to actually do it? 
            </div>
            <div className="w-150 font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
              I learned that it's one of the main reasons why the sales reps are taking way too long with a particular client and eventually missing their deadlines. 
            </div>
          </div>
        </div>
        <div className="w-49.25 h-2.5 shrink-0 bg-cover bg-position-[50%]" style={{ backgroundImage: 'url(https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M05ZA7AQR379995KJKXBG29X.png)' }} />
        <div className="flex flex-col items-start gap-3 self-stretch">
          <div className="tracking-[-0.02em] w-150 font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-white text-xl/6">
            About
          </div>
          <div className="flex flex-col items-start gap-14 self-stretch">
            <div className="flex flex-col items-start gap-3">
              <div className="w-150 font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
                Edge CRM is basically a B2B SaaS product, and I was designing the mobile experience. 
              </div>
              <div className="w-150 font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
                It was a tool mostly used by the sales representatives to directly communicate with the client. 
              </div>
            </div>
            <div className="flex items-start gap-4 self-stretch flex-1">
              <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 flex-1 [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
                <div className="aspect-square flex [font-synthesis-small-caps:none] [font-synthesis-style:none] [font-synthesis-weight:none] rounded-xl overflow-clip flex-col items-center justify-center self-stretch flex-1 px-2.5 py-3 relative bg-origin-border" style={{ backgroundImage: 'linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)' }}>
                  <HalftoneDots contrast={1} originalColors={false} inverted grid="square" radius={1} size={0.8} scale={1} image="https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M05PSD8DDRMVX6V0K90RJ3Q3.jpg" grainSize={0.5} type="holes" fit="cover" grainMixer={0.05} grainOverlay={0.3} colorFront="#6BA0FF" colorBack="#00000000" className="w-102.75 h-77.25 absolute left-[calc(50%-0.25px)] top-[calc(50%+0.001px)] bg-[#141414]" style={{ translate: '-50% -50%' }} />
                  <div className="w-47.5 h-47.5 absolute [left:-5.164px] [top:-4.5px]" style={{ backgroundImage: 'linear-gradient(in oklab 180deg, oklab(20.1% 0 0) 0%, oklab(71.8% 0 0 / 0%) 300.1%)' }} />
                  <div className="items-start flex flex-col justify-between gap-1.5 flex-1 self-stretch relative">
                    <div className="w-fit font-['Instrument_Sans',system-ui,sans-serif] text-white text-base/4.5">
                      Audit records
                    </div>
                    <div className="self-stretch font-['Instrument_Sans',system-ui,sans-serif] text-white text-base/5">
                      Used to track records of a particular feature or issue. 
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 flex-1 [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
                <div className="aspect-square flex [font-synthesis-small-caps:none] [font-synthesis-style:none] [font-synthesis-weight:none] rounded-xl overflow-clip flex-col items-center justify-center self-stretch flex-1 px-2.5 py-3 relative bg-origin-border" style={{ backgroundImage: 'linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)' }}>
                  <HalftoneDots contrast={1} originalColors={false} inverted grid="square" radius={1} size={0.8} scale={1} image="https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M05PSD8DDRMVX6V0K90RJ3Q3.jpg" grainSize={0.5} type="holes" fit="cover" grainMixer={0.05} grainOverlay={0.3} colorFront="#6BA0FF" colorBack="#00000000" className="w-102.75 h-77.25 absolute left-[calc(50%-0.25px)] top-[50%] bg-[#141414]" style={{ translate: '-50% -50%' }} />
                  <div className="w-47.75 h-47.5 absolute [left:-5.5px] [top:-4.5px]" style={{ backgroundImage: 'linear-gradient(in oklab 180deg, oklab(20.1% 0 0) 0%, oklab(71.8% 0 0 / 0%) 300.1%)' }} />
                  <div className="items-start flex flex-col justify-between gap-1.5 flex-1 self-stretch relative">
                    <div className="w-fit font-['Instrument_Sans',system-ui,sans-serif] text-white text-base/4.5">
                      Frequency
                    </div>
                    <div className="self-stretch font-['Instrument_Sans',system-ui,sans-serif] text-white text-base/5">
                      Used by sales reps each and every day. 
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 flex-1 [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
                <div className="aspect-square flex [font-synthesis-small-caps:none] [font-synthesis-style:none] [font-synthesis-weight:none] rounded-xl overflow-clip flex-col items-center justify-center self-stretch flex-1 px-2.5 py-3 relative bg-origin-border" style={{ backgroundImage: 'linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)' }}>
                  <HalftoneDots contrast={1} originalColors={false} inverted grid="square" radius={1} size={0.8} scale={1} image="https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M05PST8J25JQRT8JR53JG7M4.jpg" grainSize={0.5} type="soft" fit="cover" grainOverlay={0.3} grainMixer={0.05} colorFront="#6BA0FF" colorBack="#00000000" className="w-67 h-50.5 absolute left-[50%] top-[50%] bg-[#141414]" style={{ translate: '-50% -50%' }} />
                  <div className="w-46.25 h-46.5 absolute left-[0.25px] [top:-0.273px]" style={{ backgroundImage: 'linear-gradient(in oklab 180deg, oklab(20.1% 0 0) 0%, oklab(71.8% 0 0 / 0%) 300.1%)' }} />
                  <div className="items-start flex flex-col justify-between gap-1.5 flex-1 self-stretch relative">
                    <div className="w-fit font-['Instrument_Sans',system-ui,sans-serif] text-white text-base/4.5">
                      Communication
                    </div>
                    <div className="self-stretch font-['Instrument_Sans',system-ui,sans-serif] text-white text-base/5">
                      To directly communicate with the client. 
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-49.25 h-2.5 shrink-0 bg-cover bg-position-[50%]" style={{ backgroundImage: 'url(https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M05ZA7AQR379995KJKXBG29X.png)' }} />
        <div className="flex flex-col items-start gap-3 self-stretch">
          <div className="tracking-[-0.02em] w-150 font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-white text-xl/6">
            Discovering the problem statement. 
          </div>
          <div className="flex flex-col items-start gap-14 self-stretch">
            <div className="flex flex-col items-start gap-3">
              <div className="w-150 font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
                I basically got it from my PM that the sales representatives are not able to complete their targets and complete their deadlines. 
              </div>
              <div className="w-150 font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
                So after actually talking with the sales rep, I found out this. 
              </div>
            </div>
            <div className="flex flex-col items-start gap-3 self-stretch">
              <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 self-stretch h-77.5 shrink-0 [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
                <div className="aspect-square flex [font-synthesis-small-caps:none] [font-synthesis-style:none] [font-synthesis-weight:none] rounded-xl flex-col items-start justify-between self-stretch px-2.5 py-3 h-74.75 overflow-clip relative shrink-0 bg-origin-border" style={{ backgroundImage: 'linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)' }}>
                  <HalftoneDots contrast={1} originalColors={false} inverted grid="square" radius={1} size={0.8} scale={1} grainSize={0.5} type="soft" fit="cover" grainMixer={0.05} grainOverlay={0.3} image="https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M04G80ZAAH1PVPV1FAHY4PSW.jpg" colorFront="#6BA0FF" colorBack="#00000000" className="w-166.5 h-125 absolute left-[50%] top-[50%]" style={{ backgroundImage: 'linear-gradient(in oklab 178.97000000000003deg, oklab(71.1% -0.023 -0.149) 41.45%, oklab(40% 0 0 / 0%) 79.28%)', translate: '-50% -50%' }} />
                  <div className="w-150.25 h-79.5 absolute left-[50%] top-[50%]" style={{ backgroundImage: 'linear-gradient(in oklab 180deg, oklab(71.8% 0 0 / 0%) -122.12%, oklab(20.1% 0 0) 102.12%)', translate: '-50% -50%' }} />
                  <div className="w-fit relative font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-white text-xl/4.5">
                    Problem Statement. 
                  </div>
                  <div className="text-justify relative self-stretch font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
                    The sales representatives were facing an issue adding a case for a particular client, and it was taking the most scheduled time for that client. 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-49.25 h-2.5 shrink-0 bg-cover bg-position-[50%]" style={{ backgroundImage: 'url(https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M05ZA7AQR379995KJKXBG29X.png)' }} />
        <div className="flex flex-col items-start gap-3 self-stretch">
          <div className="tracking-[-0.02em] w-150 font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-white text-xl/6">
            How might we? 
          </div>
          <div className="flex flex-col items-start gap-14 self-stretch">
            <div className="flex flex-col items-start gap-3">
              <div className="w-150 font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
                Thus, to actually narrow it down a little bit, I create a “how might we” statement. 
              </div>
              <div className="w-150 font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
                It basically helps me narrow down the problem statement and stay focused on working on it rather than solving some other issue. 
              </div>
            </div>
            <div className="flex flex-col items-start gap-3 p-4 self-stretch bg-origin-border [border-left-width:3px] border-l-solid border-l-[#6597F1]" style={{ backgroundImage: 'linear-gradient(in oklab 90deg, oklab(100% 0 0 / 10%) 0.74%, oklab(80% 0 0 / 0%) 100%)' }}>
              <div className="w-fit font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-white text-xl/4.5">
                Which case needs me right now? 
              </div>
              <div className="text-justify self-stretch font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
                A single question that redesign had to answer. 
              </div>
            </div>
          </div>
        </div>
        <div className="w-49.25 h-2.5 shrink-0 bg-cover bg-position-[50%]" style={{ backgroundImage: 'url(https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M05ZA7AQR379995KJKXBG29X.png)' }} />
        <div className="flex flex-col w-149.5 pt-2 gap-8">
          <div className="flex items-center gap-3">
            <div className="inline-block font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-white text-xl/6">
              Before & After
            </div>
            <div className="inline-block font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFF66] text-xs/4">
              Tracing the Transformation
            </div>
          </div>
          <div className="font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
            Comparing the legacy 1-page form against the stepped, validated 3-stage interface.
          </div>
          <div className="flex flex-col w-149.5 [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] p-1 rounded-2xl [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
            <div className="flex flex-col [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] rounded-xl overflow-clip bg-origin-border [border-width:0.5px] border-solid border-[#FFFFFF1A]" style={{ backgroundImage: 'linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)' }}>
              <div className="flex items-center justify-between pt-4 pb-3.5 px-5 [border-bottom-width:0.5px] border-b-solid border-b-[#FFFFFF1A]">
                <div className="flex items-center [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] py-1 px-3 rounded-[999px] gap-1.5 bg-[#00000080] [border-width:0.5px] border-solid border-[#FFFFFF33]">
                  <div className="rounded-[50%] shrink-0 bg-[#B81919] size-1.5" />
                  <div className="inline-block font-['Fira_Code',system-ui,sans-serif] text-white text-[10px]/3">
                    BEFORE — Unstructured Scroll
                  </div>
                </div>
                <div className="flex items-center [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] py-1 px-3 rounded-[999px] gap-1.5 bg-[#00000080] [border-width:0.5px] border-solid border-[#FFFFFF33]">
                  <div className="rounded-[50%] shrink-0 bg-[#10B981] size-1.5" />
                  <div className="inline-block font-['Fira_Code',system-ui,sans-serif] text-white text-[10px]/3">
                    AFTER — 3-Step Validated Flow
                  </div>
                </div>
              </div>
              <div className="flex items-start justify-between py-6 px-5 gap-4">
                <div className="flex flex-col items-center grow basis-[0%] gap-2.5">
                  <div className="w-40 h-85 [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] flex flex-col rounded-[28px] overflow-clip shrink-0 bg-[#1A1A1A] border border-solid border-[#FFFFFF26]">
                    <div className="h-full flex flex-col bg-[#F5F5F5]">
                      <div className="flex flex-col pt-3 pb-2 gap-1 px-3.5 bg-white">
                        <div className="flex items-center justify-between">
                          <div className="inline-block font-['HelveticaNeue-Bold','Helvetica_Neue',system-ui,sans-serif] font-bold text-[#111111] text-[11px]/3.5">
                            Add Case
                          </div>
                          <div className="inline-block font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#999999] text-[9px]/3">
                            Cancel
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col overflow-clip">
                        <div className="py-2.5 px-3.5 bg-white [border-bottom-width:0.5px] border-b-solid border-b-[#E5E5E5]">
                          <div className="font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#999999] text-[9px]/3">
                            CASE TITLE *
                          </div>
                          <div className="h-4 mt-1 rounded-[3px] bg-[#F5F5F5]" />
                        </div>
                        <div className="py-2.5 px-3.5 bg-white [border-bottom-width:0.5px] border-b-solid border-b-[#E5E5E5]">
                          <div className="font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#999999] text-[9px]/3">
                            CASE TYPE *
                          </div>
                          <div className="h-4 mt-1 rounded-[3px] bg-[#F5F5F5]" />
                        </div>
                        <div className="py-2.5 px-3.5 bg-white [border-bottom-width:0.5px] border-b-solid border-b-[#E5E5E5]">
                          <div className="font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#999999] text-[9px]/3">
                            CLIENT *
                          </div>
                          <div className="h-4 mt-1 rounded-[3px] bg-[#F5F5F5]" />
                        </div>
                        <div className="py-2.5 px-3.5 bg-white [border-bottom-width:0.5px] border-b-solid border-b-[#E5E5E5]">
                          <div className="font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#999999] text-[9px]/3">
                            PRIORITY *
                          </div>
                          <div className="h-4 mt-1 rounded-[3px] bg-[#F5F5F5]" />
                        </div>
                        <div className="py-2.5 px-3.5 bg-white [border-bottom-width:0.5px] border-b-solid border-b-[#E5E5E5]">
                          <div className="font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#999999] text-[9px]/3">
                            ASSIGN TO *
                          </div>
                          <div className="h-4 mt-1 rounded-[3px] bg-[#F5F5F5]" />
                        </div>
                        <div className="py-2.5 px-3.5 bg-white [border-bottom-width:0.5px] border-b-solid border-b-[#E5E5E5]">
                          <div className="font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#999999] text-[9px]/3">
                            DESCRIPTION
                          </div>
                          <div className="h-7.5 mt-1 rounded-[3px] bg-[#F5F5F5]" />
                        </div>
                        <div className="py-2.5 px-3.5 bg-white [border-bottom-width:0.5px] border-b-solid border-b-[#E5E5E5]">
                          <div className="font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#999999] text-[9px]/3">
                            DUE DATE *
                          </div>
                          <div className="h-4 mt-1 rounded-[3px] bg-[#F5F5F5]" />
                        </div>
                        <div className="py-2.5 px-3.5 bg-white [border-bottom-width:0.5px] border-b-solid border-b-[#E5E5E5]">
                          <div className="font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#999999] text-[9px]/3">
                            DEPARTMENT *
                          </div>
                          <div className="h-4 mt-1 rounded-[3px] bg-[#F5F5F5]" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="[letter-spacing:0.05em] inline-block font-['Fira_Code',system-ui,sans-serif] text-[#FFFFFF80] text-[9px]/3">
                    BEFORE
                  </div>
                </div>
                <div className="flex flex-col grow-[1.4] basis-[0%] pt-2 gap-2">
                  <div className="flex flex-col [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] p-2.5 rounded-lg gap-1 bg-[#00000099] [border-width:0.5px] border-solid border-[#FFFFFF1A]">
                    <div className="tracking-[0.08em] inline-block font-['Fira_Code',system-ui,sans-serif] text-[#FFFFFF66] text-[9px]/3">
                      CHANGE 01
                    </div>
                    <div className="mt-0.5 font-['HelveticaNeue-Bold','Helvetica_Neue',system-ui,sans-serif] font-bold text-white text-[11px]/3.5">
                      Stepped flow + progress bar
                    </div>
                    <div className="mt-0.5 font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFF8C] text-[10px]/3.5">
                      One long scroll replaced by clear 3-step sections with progress tracking.
                    </div>
                  </div>
                  <div className="flex flex-col [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] p-2.5 rounded-lg gap-1 bg-[#00000099] [border-width:0.5px] border-solid border-[#FFFFFF1A]">
                    <div className="tracking-[0.08em] inline-block font-['Fira_Code',system-ui,sans-serif] text-[#FFFFFF66] text-[9px]/3">
                      CHANGE 02
                    </div>
                    <div className="mt-0.5 font-['HelveticaNeue-Bold','Helvetica_Neue',system-ui,sans-serif] font-bold text-white text-[11px]/3.5">
                      Notification banner
                    </div>
                    <div className="mt-0.5 font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFF8C] text-[10px]/3.5">
                      Proactive alerts flag missing required fields before submission.
                    </div>
                  </div>
                  <div className="flex flex-col [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] p-2.5 rounded-lg gap-1 bg-[#00000099] [border-width:0.5px] border-solid border-[#FFFFFF1A]">
                    <div className="tracking-[0.08em] inline-block font-['Fira_Code',system-ui,sans-serif] text-[#FFFFFF66] text-[9px]/3">
                      CHANGE 03
                    </div>
                    <div className="mt-0.5 font-['HelveticaNeue-Bold','Helvetica_Neue',system-ui,sans-serif] font-bold text-white text-[11px]/3.5">
                      Grouped, pre-filled fields
                    </div>
                    <div className="mt-0.5 font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFF8C] text-[10px]/3.5">
                      Known CRM values pre-filled with green verification checkmarks.
                    </div>
                  </div>
                  <div className="flex flex-col [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] p-2.5 rounded-lg gap-1 bg-[#00000099] [border-width:0.5px] border-solid border-[#FFFFFF1A]">
                    <div className="tracking-[0.08em] inline-block font-['Fira_Code',system-ui,sans-serif] text-[#FFFFFF66] text-[9px]/3">
                      CHANGE 04
                    </div>
                    <div className="mt-0.5 font-['HelveticaNeue-Bold','Helvetica_Neue',system-ui,sans-serif] font-bold text-white text-[11px]/3.5">
                      Full-width sticky CTA
                    </div>
                    <div className="mt-0.5 font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFF8C] text-[10px]/3.5">
                      Prominent primary action button always within thumb reach.
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center grow basis-[0%] gap-2.5">
                  <div className="w-40 h-85 [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] flex flex-col rounded-[28px] overflow-clip shrink-0 bg-[#1A1A1A] border border-solid border-[#FFFFFF26]">
                    <div className="h-full flex flex-col bg-white">
                      <div className="flex flex-col pt-3 pb-2 gap-1.5 px-3.5 bg-white">
                        <div className="flex items-center justify-between">
                          <div className="inline-block font-['HelveticaNeue-Bold','Helvetica_Neue',system-ui,sans-serif] font-bold text-[#111111] text-[11px]/3.5">
                            Add Case
                          </div>
                          <div className="inline-block font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#007AFF] text-[9px]/3">
                            Save
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="h-0.75 grow basis-[0%] rounded-xs bg-[#007AFF]" />
                          <div className="h-0.75 grow basis-[0%] rounded-xs bg-[#E5E5E5]" />
                          <div className="h-0.75 grow basis-[0%] rounded-xs bg-[#E5E5E5]" />
                        </div>
                        <div className="inline-block font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#007AFF] text-[8px]/2.5">
                          Step 1 of 3 — Overview
                        </div>
                      </div>
                      <div className="flex items-center py-2 px-3.5 gap-1.5 bg-[#FFF3CD] [border-left-width:3px] border-l-solid border-l-[#F59E0B]">
                        <div className="inline-block font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#92400E] text-[9px]/3">
                          2 required fields missing
                        </div>
                      </div>
                      <div className="flex flex-col overflow-clip">
                        <div className="[border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] mt-2 flex items-center justify-between py-2.5 px-3 rounded-lg bg-white border border-solid border-[#E5E5E5] mx-3.5">
                          <div className="">
                            <div className="font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#999999] text-[8px]/2.5">
                              CASE TITLE
                            </div>
                            <div className="mt-0.5 font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#111111] text-[10px]/3">
                              Client escalation
                            </div>
                          </div>
                        </div>
                        <div className="[border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] mt-1.5 flex items-center justify-between py-2.5 px-3 rounded-lg bg-white border border-solid border-[#E5E5E5] mx-3.5">
                          <div className="">
                            <div className="font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#999999] text-[8px]/2.5">
                              CASE TYPE
                            </div>
                            <div className="mt-0.5 font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#111111] text-[10px]/3">
                              Support
                            </div>
                          </div>
                          <div className="flex items-center gap-0.75">
                            <div className="rounded-[50%] shrink-0 bg-[#10B981] size-2.5" />
                          </div>
                        </div>
                        <div className="[border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] mt-1.5 py-2.5 px-3 rounded-lg bg-white border border-solid border-[#E5E5E5] mx-3.5">
                          <div className="font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#999999] text-[8px]/2.5">
                            PRIORITY
                          </div>
                          <div className="mt-0.5 font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#111111] text-[10px]/3">
                            High
                          </div>
                        </div>
                      </div>
                      <div className="grow basis-[0%]" />
                      <div className="mb-3.5 flex items-center justify-center p-3 rounded-[10px] bg-[#007AFF] mx-3.5">
                        <div className="inline-block font-['HelveticaNeue-Bold','Helvetica_Neue',system-ui,sans-serif] font-bold text-white text-[11px]/3.5">
                          Next → Type
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="inline-block font-['Fira_Code',system-ui,sans-serif] text-[#10B981] text-[9px]/3">
                    AFTER
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-149.5 pt-1 gap-3">
            <div className="flex flex-col grow basis-[0%] [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] p-1 rounded-2xl [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
              <div className="grow basis-[0%] [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] flex flex-col justify-between min-h-30 p-2.5 rounded-xl bg-origin-border [border-width:0.5px] border-solid border-[#FFFFFF1A]" style={{ backgroundImage: 'linear-gradient(in oklab 180deg, oklab(32.9% 0 0) 0%, oklab(30.1% 0 0) 100%)' }}>
                <div className="inline-block font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-white text-[13px]/4">
                  Stepped Flow
                </div>
                <div className="inline-block font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-xs/4">
                  Converted 1 endless scroll into 3 logical steps.
                </div>
              </div>
            </div>
            <div className="flex flex-col grow basis-[0%] [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] p-1 rounded-2xl [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
              <div className="grow basis-[0%] [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] flex flex-col justify-between min-h-30 p-2.5 rounded-xl bg-origin-border [border-width:0.5px] border-solid border-[#FFFFFF1A]" style={{ backgroundImage: 'linear-gradient(in oklab 180deg, oklab(32.9% 0 0) 0%, oklab(30.1% 0 0) 100%)' }}>
                <div className="inline-block font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-white text-[13px]/4">
                  Field Differentiation
                </div>
                <div className="inline-block font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-xs/4">
                  Bordered card inputs with explicit chevrons.
                </div>
              </div>
            </div>
            <div className="flex flex-col grow basis-[0%] [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] p-1 rounded-2xl [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
              <div className="grow basis-[0%] [border-image-source:none] [border-image-slice:100%] [border-image-width:1] [border-image-outset:0] [border-image-repeat:stretch] flex flex-col justify-between min-h-30 p-2.5 rounded-xl bg-origin-border [border-width:0.5px] border-solid border-[#FFFFFF1A]" style={{ backgroundImage: 'linear-gradient(in oklab 180deg, oklab(32.9% 0 0) 0%, oklab(30.1% 0 0) 100%)' }}>
                <div className="inline-block font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-white text-[13px]/4">
                  Inline Validation
                </div>
                <div className="inline-block font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-xs/4">
                  Top warning banner + actionable inline fix cues.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      </main>
      </div>
    </div>
  );
}
