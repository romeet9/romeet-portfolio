"use client";

/** @paper-design/shaders-react@0.0.80 */
import React from "react";
import Link from "next/link";
import { HalftoneDots } from "@paper-design/shaders-react";

export function EdgeCrmTestCaseStudy() {
  return (
    <div className="[font-synthesis:none] wrap-anywhere overflow-clip relative bg-black antialiased text-xs/4 min-h-screen">
      {/* Sidebar TOC matching Paper Canvas YC-0 */}
      <div
        className="hidden xl:flex flex-col top-[calc(50%-1163px)] left-8 2xl:left-19.5 fixed w-29.25 h-61.5 gap-4.5 bg-black z-40"
        style={{ translate: "0 -50%" }}
      >
        <div className="items-center flex gap-3">
          <div className="shrink-0 rounded-[50%] bg-[#B81919] size-1.5" />
          <div className="inline-block text-[15px] leading-[100%] font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-white">
            About
          </div>
        </div>
        <div className="items-center flex gap-3">
          <div className="shrink-0 rounded-[50%] size-1.5 bg-[#8F8F8F]/30" />
          <div className="inline-block text-[15px] leading-[100%] font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#8F8F8F]">
            Phase I
          </div>
        </div>
        <div className="items-center flex gap-3">
          <div className="shrink-0 rounded-[50%] size-1.5 bg-[#8F8F8F]/30" />
          <div className="inline-block text-[15px] leading-[100%] font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#8F8F8F]">
            The Problem
          </div>
        </div>
        <div className="items-center flex gap-3">
          <div className="shrink-0 rounded-[50%] size-1.5 bg-[#8F8F8F]/30" />
          <div className="inline-block text-[15px] leading-[100%] font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#8F8F8F]">
            Phase II
          </div>
        </div>
        <div className="items-center flex gap-3">
          <div className="shrink-0 rounded-[50%] size-1.5 bg-[#8F8F8F]/30" />
          <div className="inline-block text-[15px] leading-[100%] font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#8F8F8F]">
            Fluid Interface
          </div>
        </div>
        <div className="items-center flex gap-3">
          <div className="shrink-0 rounded-[50%] size-1.5 bg-[#8F8F8F]/30" />
          <div className="inline-block text-[15px] leading-[100%] font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#8F8F8F]">
            Solving for 3Ts
          </div>
        </div>
        <div className="items-center flex gap-3">
          <div className="shrink-0 rounded-[50%] size-1.5 bg-[#8F8F8F]/30" />
          <div className="inline-block text-[15px] leading-[100%] font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#8F8F8F]">
            Impact
          </div>
        </div>
        <div className="items-center flex gap-3">
          <div className="shrink-0 rounded-[50%] size-1.5 bg-[#8F8F8F]/30" />
          <div className="inline-block text-[15px] leading-[100%] font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#8F8F8F]">
            Reflection
          </div>
        </div>
      </div>

      {/* Main Content Column matching Paper Canvas Z1-0 */}
      <div className="flex justify-center items-start gap-10.75 pt-20 sm:pt-24 lg:pt-32 pb-36 px-4">
        {/* Back Button */}
        <Link
          href="/case-studies"
          className="items-center h-6.5 flex w-6.5 justify-center rounded-[50%] shrink-0 [box-shadow:#0A0D120A_0px_0px_0px_1px_inset,#0A0D120D_0px_1px_2px] bg-white [border-width:0.5px] border-solid border-[#E6E6E6] hover:opacity-80 transition-opacity"
          aria-label="Back to Case Studies"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            fontSize="13.333px"
            style={{ height: "14px", width: "14px", overflow: "clip", flexShrink: "0" }}
          >
            <path
              d="M12 5L7 10L12 15"
              fontSize="13.333px"
              fill="none"
              stroke="#463F3F"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ boxSizing: "border-box", transformOrigin: "0px 0px" }}
            />
          </svg>
        </Link>

        {/* Content Column Frame */}
        <div className="flex flex-col items-start gap-11 w-full max-w-150 shrink-0">
          {/* Header Frame */}
          <div className="flex flex-col items-center gap-10.75 pb-4 border-b border-b-solid border-b-[#FFFFFF33] w-full">
            <div className="tracking-[-0.02em] w-full font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-white text-[26px]/8">
              A digital platform for the Indian citizens to cast and verify their vote online.
            </div>
            <div className="flex items-center gap-8 w-full justify-between">
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

          {/* Body Sections Frame */}
          <div className="flex flex-col items-center gap-18.5 self-stretch w-full">
            {/* Hero Card & Narrative */}
            <div className="flex flex-col items-start gap-7.25 w-full">
              <div className="flex w-full flex-col items-center rounded-2xl justify-center gap-1.5 p-1 [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
                <div className="overflow-clip h-94.5 rounded-xl self-stretch relative shrink-0 [box-shadow:#00000033_0px_0px_5px] bg-[#9A8DE9]">
                  <div className="[left:-0.75px] [top:-0.273px] w-full h-94.5 absolute bg-[#2B2B2B]" />
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
                        "linear-gradient(in oklab 178.97000000000003deg, oklab(71.5% -0.021 -0.137) 39.15%, oklab(40% 0 0 / 0%) 79.28%)",
                      translate: "-50% -50%",
                    }}
                  />
                  <div className="flex flex-col items-center justify-center py-4 left-0 top-[29.516px] w-full absolute">
                    <div className="w-fit tracking-[-0.02em] font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-white text-2xl/7.5">
                      Voting at your fingerprints
                    </div>
                  </div>
                  <div
                    className="aspect-[151/304] w-53.25 max-w-full overflow-clip left-[calc(50%+0.5px)] top-[113.5px] h-107.5 absolute filter-[drop-shadow(#000000A6_0px_20px_45px)] bg-size-[100%_100%] bg-position-[50%] bg-no-repeat"
                    style={{
                      backgroundImage:
                        "url(https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/4G3P97EH01JT5JG5EANWEFJKQ3.webp)",
                      translate: "-50%",
                    }}
                  />
                </div>
              </div>

              <div
                className="flex items-center rounded-[1px] gap-3 w-full h-8.5 shrink-0"
                style={{
                  backgroundImage:
                    "linear-gradient(in oklab 90.67000000000002deg, oklab(61.5% 0 0 / 16%) 50%, oklab(80% 0 0 / 0%) 99.99%)",
                }}
              >
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

              <div className="flex flex-col items-start gap-3 w-full">
                <div className="w-full font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
                  So the PM came and told me that our sales representatives are facing some issues with the app.
                </div>
                <div className="w-full font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
                  When I reached out to them, they said that it&apos;s taking them way too long to add a case for a particular client.
                </div>
                <div className="w-full font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
                  I thought, why will it matter for a sales representative to actually do it?
                </div>
                <div className="w-full font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
                  I learned that it&apos;s one of the main reasons why the sales reps are taking way too long with a particular client and eventually missing their deadlines.
                </div>
              </div>
            </div>

            {/* Separator Graphic */}
            <div
              className="w-49.25 h-2.5 shrink-0 bg-cover bg-position-[50%]"
              style={{
                backgroundImage:
                  "url(https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M05ZA7AQR379995KJKXBG29X.png)",
              }}
            />

            {/* About Section */}
            <div className="flex flex-col items-start gap-3 self-stretch w-full">
              <div className="tracking-[-0.02em] w-full font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-white text-xl/6">
                About
              </div>
              <div className="flex flex-col items-start gap-14 self-stretch w-full">
                <div className="flex flex-col items-start gap-3 w-full">
                  <div className="w-full font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
                    Edge CRM is basically a B2B SaaS product, and I was designing the mobile experience.
                  </div>
                  <div className="w-full font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
                    It was a tool mostly used by the sales representatives to directly communicate with the client.
                  </div>
                </div>
                <div className="flex items-start gap-4 self-stretch flex-1 w-full">
                  {/* Card 1: Audit records */}
                  <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 flex-1 [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
                    <div
                      className="aspect-square flex [font-synthesis-small-caps:none] [font-synthesis-style:none] [font-synthesis-weight:none] rounded-xl overflow-clip flex-col items-center justify-center self-stretch flex-1 px-2.5 py-3 relative bg-origin-border"
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
                        image="https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M05PSD8DDRMVX6V0K90RJ3Q3.jpg"
                        grainSize={0.5}
                        type="soft"
                        fit="cover"
                        grainMixer={0.05}
                        grainOverlay={0.3}
                        colorFront="#6BA0FF"
                        colorBack="#00000000"
                        className="w-102.75 h-77.25 absolute left-[calc(50%-0.25px)] top-[calc(50%+0.001px)] bg-[#141414]"
                        style={{ translate: "-50% -50%" }}
                      />
                      <div
                        className="w-47.5 h-47.5 absolute [left:-5.164px] [top:-4.5px]"
                        style={{
                          backgroundImage:
                            "linear-gradient(in oklab 180deg, oklab(20.1% 0 0) 0%, oklab(71.8% 0 0 / 0%) 300.1%)",
                        }}
                      />
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

                  {/* Card 2: Frequency */}
                  <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 flex-1 [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
                    <div
                      className="aspect-square flex [font-synthesis-small-caps:none] [font-synthesis-style:none] [font-synthesis-weight:none] rounded-xl overflow-clip flex-col items-center justify-center self-stretch flex-1 px-2.5 py-3 relative bg-origin-border"
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
                        image="https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M05PSD8DDRMVX6V0K90RJ3Q3.jpg"
                        grainSize={0.5}
                        type="soft"
                        fit="cover"
                        grainMixer={0.05}
                        grainOverlay={0.3}
                        colorFront="#6BA0FF"
                        colorBack="#00000000"
                        className="w-102.75 h-77.25 absolute left-[calc(50%-0.25px)] top-[50%] bg-[#141414]"
                        style={{ translate: "-50% -50%" }}
                      />
                      <div
                        className="w-47.75 h-47.5 absolute [left:-5.5px] [top:-4.5px]"
                        style={{
                          backgroundImage:
                            "linear-gradient(in oklab 180deg, oklab(20.1% 0 0) 0%, oklab(71.8% 0 0 / 0%) 300.1%)",
                        }}
                      />
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

                  {/* Card 3: Communication */}
                  <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 flex-1 [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
                    <div
                      className="aspect-square flex [font-synthesis-small-caps:none] [font-synthesis-style:none] [font-synthesis-weight:none] rounded-xl overflow-clip flex-col items-center justify-center self-stretch flex-1 px-2.5 py-3 relative bg-origin-border"
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
                      <div
                        className="w-46.25 h-46.5 absolute left-[0.25px] [top:-0.273px]"
                        style={{
                          backgroundImage:
                            "linear-gradient(in oklab 180deg, oklab(20.1% 0 0) 0%, oklab(71.8% 0 0 / 0%) 300.1%)",
                        }}
                      />
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

            {/* Separator Graphic */}
            <div
              className="w-49.25 h-2.5 shrink-0 bg-cover bg-position-[50%]"
              style={{
                backgroundImage:
                  "url(https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M05ZA7AQR379995KJKXBG29X.png)",
              }}
            />

            {/* Discovering the problem statement */}
            <div className="flex flex-col items-start gap-3 self-stretch w-full">
              <div className="tracking-[-0.02em] w-full font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-white text-xl/6">
                Discovering the problem statement.
              </div>
              <div className="flex flex-col items-start gap-14 self-stretch w-full">
                <div className="flex flex-col items-start gap-3 w-full">
                  <div className="w-full font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
                    I basically got it from my PM that the sales representatives are not able to complete their targets and complete their deadlines.
                  </div>
                  <div className="w-full font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
                    So after actually talking with the sales rep, I found out this.
                  </div>
                </div>
                <div className="flex flex-col items-start gap-3 self-stretch w-full">
                  <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 self-stretch h-77.5 shrink-0 [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
                    <div
                      className="aspect-square flex [font-synthesis-small-caps:none] [font-synthesis-style:none] [font-synthesis-weight:none] rounded-xl flex-col items-start justify-between self-stretch px-2.5 py-3 h-74.75 overflow-clip relative shrink-0 bg-origin-border"
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
                        image="https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M04G80ZAAH1PVPV1FAHY4PSW.jpg"
                        colorFront="#6BA0FF"
                        colorBack="#00000000"
                        className="w-166.5 h-125 absolute left-[50%] top-[50%]"
                        style={{
                          backgroundImage:
                            "linear-gradient(in oklab 178.97000000000003deg, oklab(71.1% -0.023 -0.149) 41.45%, oklab(40% 0 0 / 0%) 79.28%)",
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

            {/* Separator Graphic */}
            <div
              className="w-49.25 h-2.5 shrink-0 bg-cover bg-position-[50%]"
              style={{
                backgroundImage:
                  "url(https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M05ZA7AQR379995KJKXBG29X.png)",
              }}
            />

            {/* How might we? */}
            <div className="flex flex-col items-start gap-3 self-stretch w-full">
              <div className="tracking-[-0.02em] w-full font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-white text-xl/6">
                How might we?
              </div>
              <div className="flex flex-col items-start gap-14 self-stretch w-full">
                <div className="flex flex-col items-start gap-3 w-full">
                  <div className="w-full font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
                    Thus, to actually narrow it down a little bit, I create a “how might we” statement.
                  </div>
                  <div className="w-full font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
                    It basically helps me narrow down the problem statement and stay focused on working on it rather than solving some other issue.
                  </div>
                </div>
                <div
                  className="flex flex-col items-start gap-3 p-4 self-stretch bg-origin-border [border-left-width:3px] border-l-solid border-l-[#6597F1] w-full"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 90deg, oklab(100% 0 0 / 10%) 0.74%, oklab(80% 0 0 / 0%) 100%)",
                  }}
                >
                  <div className="w-fit font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-white text-xl/4.5">
                    Which case needs me right now?
                  </div>
                  <div className="text-justify self-stretch font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
                    A single question that redesign had to answer.
                  </div>
                </div>
              </div>
            </div>

            {/* Separator Graphic */}
            <div
              className="w-49.25 h-2.5 shrink-0 bg-cover bg-position-[50%]"
              style={{
                backgroundImage:
                  "url(https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M05ZA7AQR379995KJKXBG29X.png)",
              }}
            />

            {/* Turning the triage problem into a design direction (Lead Callout) */}
            <div className="flex flex-col items-start gap-3 self-stretch w-full">
              <div className="tracking-[-0.02em] w-full font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-white text-xl/6">
                Turning the triage problem into a design direction.
              </div>
              <div className="flex flex-col items-start gap-14 self-stretch w-full">
                <div className="flex flex-col items-start gap-3 w-full">
                  <div className="w-full font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
                    I broke the screen down into three main failures: visual hierarchy, information architecture, and interaction design.
                  </div>
                  <div className="w-full font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
                    Eventually, I walked each one into a concrete direction.
                  </div>
                </div>
                <div
                  className="flex flex-col items-start gap-3 p-4 self-stretch bg-origin-border [border-left-width:3px] border-l-solid border-l-[#6597F1] w-full"
                  style={{
                    backgroundImage:
                      "linear-gradient(in oklab 90deg, oklab(100% 0 0 / 10%) 0.74%, oklab(80% 0 0 / 0%) 100%)",
                  }}
                >
                  <div className="w-fit font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-white text-xl/4.5">
                    Which case needs me right now?
                  </div>
                  <div className="text-justify self-stretch font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
                    A single question that redesign had to answer.
                  </div>
                </div>
              </div>
            </div>

            {/* TABLE FRAME: 1PN-0 from Paper Canvas */}
            <div className="flex flex-col items-start gap-9 self-stretch w-full">
              <div className="flex flex-col items-start gap-3 self-stretch w-full">
                <div className="tracking-[-0.02em] w-full font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-white text-xl/6">
                  Turning the triage problem into a design direction.
                </div>
                <div className="flex flex-col items-start gap-14 self-stretch w-full">
                  <div className="flex flex-col items-start gap-3 w-full">
                    <div className="w-full font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
                      I broke the screen down into three main failures: visual hierarchy, information architecture, and interaction design.
                    </div>
                    <div className="w-full font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
                      Eventually, I walked each one into a concrete direction.
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start gap-15 w-full">
                <div className="flex flex-col items-start gap-3 w-full">
                  <div className="tracking-[-0.02em] w-full font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-white text-lg/5.5">
                    1. Unstructured long form
                  </div>
                  <div className="flex flex-col items-start gap-9 w-full">
                    <div className="flex flex-col items-start gap-6 w-full">
                      <div className="w-full font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
                        The form felt overwhelming because reps had no clear sense of progress or where one information group ended and another began.
                      </div>
                      <div className="w-full font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-white text-base/5">
                        What actions do I need to take?
                      </div>
                      <div className="flex flex-col items-start gap-3 w-full">
                        <div className="w-full font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
                          • Break the long form into clear, manageable sections.
                        </div>
                        <div className="w-full font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
                          • Give users a clear sense of progress and context.
                        </div>
                        <div className="w-full font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
                          • Make each stage easy to scan before filling.
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 self-stretch h-78 shrink-0 w-full">
                      {/* Card 1: Progress bar */}
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
                          image="https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M04G80ZAAH1PVPV1FAHY4PSW.jpg"
                          colorFront="#6BA0FF"
                          colorBack="#00000000"
                          className="w-166.5 h-125 absolute left-[50%] top-[50%]"
                          style={{
                            backgroundImage:
                              "linear-gradient(in oklab 178.97000000000003deg, oklab(71.5% -0.021 -0.137) 39.15%, oklab(40% 0 0 / 0%) 79.28%)",
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
                              Progress bar
                            </div>
                            <div className="self-stretch font-['Instrument_Sans',system-ui,sans-serif] text-white text-base/5">
                              Add a step progress bar at the top so reps immediately understand how much of the form remains.
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card 2: Clear labels */}
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
                          image="https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M04G80ZAAH1PVPV1FAHY4PSW.jpg"
                          colorFront="#6BA0FF"
                          colorBack="#00000000"
                          className="w-166.5 h-125 absolute left-[50%] top-[50%]"
                          style={{
                            backgroundImage:
                              "linear-gradient(in oklab 178.97000000000003deg, oklab(71.5% -0.021 -0.137) 39.15%, oklab(40% 0 0 / 0%) 79.28%)",
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
                              Clear labels
                            </div>
                            <div className="self-stretch font-['Instrument_Sans',system-ui,sans-serif] text-white text-base/5">
                              Add prominent section labels so users always understand what type of information they’re entering.
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card 3: Break the fields */}
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
                          image="https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M04G80ZAAH1PVPV1FAHY4PSW.jpg"
                          colorFront="#6BA0FF"
                          colorBack="#00000000"
                          className="w-166.5 h-125 absolute left-[50%] top-[50%]"
                          style={{
                            backgroundImage:
                              "linear-gradient(in oklab 178.97000000000003deg, oklab(71.5% -0.021 -0.137) 39.15%, oklab(40% 0 0 / 0%) 79.28%)",
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
                              Break the fields
                            </div>
                            <div className="self-stretch whitespace-pre-wrap font-['Instrument_Sans',system-ui,sans-serif] text-white text-base/5">
                              Divide the long form into focused sections like Overview, <br />Case Details, and Business Details.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
