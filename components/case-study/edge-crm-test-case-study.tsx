"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { LazyHalftoneDots as HalftoneDots } from "./lazy-halftone-dots";
import { CaseStudyNav, CaseStudyBackButton } from "./case-study-nav";

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

const SECTIONS = [
  { id: "hero", label: "About" },
  { id: "phase-1", label: "Phase I" },
  { id: "the-problem", label: "The Problem" },
  { id: "phase-2", label: "Phase II" },
  { id: "table", label: "Fluid Interface" },
  { id: "solving-3ts", label: "Solving for 3Ts" },
  { id: "impact", label: "Impact" },
  { id: "reflection", label: "Reflection" },
];

export interface AnimationConfig {
  mode: "spring" | "tween";
  stiffness: number;
  damping: number;
  mass: number;
  duration: number;
  easePreset: "apple" | "easeOut" | "backOut" | "easeInOut" | "linear";
  scale: number;
  backdropOpacity: number;
  backdropBlur: number;
}

export const EASE_PRESETS = {
  apple: [0.16, 1, 0.3, 1],
  easeOut: [0, 0, 0.2, 1],
  backOut: [0.34, 1.56, 0.64, 1],
  easeInOut: [0.42, 0, 0.58, 1],
  linear: [0, 0, 1, 1],
};

export const DEFAULT_ANIM_CONFIG: AnimationConfig = {
  mode: "spring",
  stiffness: 350,
  damping: 32,
  mass: 1,
  duration: 0.45,
  easePreset: "apple",
  scale: 1.75,
  backdropOpacity: 0.8,
  backdropBlur: 12,
};

interface ChangeCardProps {
  id: "change-01" | "change-02" | "change-03" | "change-04";
  onCardClick?: () => void;
  isPopup?: boolean;
  transition?: any;
  scale?: number;
}

function ChangeCard({ id, onCardClick, isPopup = false, transition, scale = 1 }: ChangeCardProps) {
  const currentTransition = transition || {
    type: "spring",
    stiffness: 350,
    damping: 32,
  };

  if (id === "change-01") {
    return (
      <motion.div
        layoutId={`card-${id}`}
        transition={currentTransition}
        initial={isPopup ? { scale: 1 } : false}
        animate={{ scale: isPopup ? scale : 1 }}
        exit={{ scale: 1 }}
        whileHover={isPopup ? undefined : { scale: 1.012 }}
        onClick={isPopup ? undefined : onCardClick}
        className={`origin-center transform-gpu will-change-transform flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 self-stretch overflow-clip [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F] w-full relative ${
          isPopup
            ? "shadow-2xl border-[#FFFFFF26]"
            : "group cursor-pointer hover:border-white/30 hover:shadow-[0_12px_32px_rgba(0,0,0,0.6)] transition-colors duration-200"
        }`}
      >
        <div
          className="[container-name:card] @container flex flex-col pt-3 rounded-[14px] overflow-clip gap-3 relative self-stretch [box-shadow:#FAFAFA1A_0px_0px_0px_1px,#0000000D_0px_1px_2px] bg-[#171717] w-full"
          style={{
            backgroundImage:
              "linear-gradient(in oklab 0deg, oklab(92.2% 0 0 / 5%) 0%, oklab(20.5% 0 0) 100%)",
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
            priority={isPopup}
            image="https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M04G80ZAAH1PVPV1FAHY4PSW.jpg"
            colorFront="#6BA0FF"
            colorBack="#00000000"
            className="w-166.5 h-125 absolute left-[calc(50%+0.016px)] top-[calc(50%-46.5px)]"
            style={{
              backgroundImage:
                "linear-gradient(in oklab 178.97000000000003deg, oklab(71.5% -0.021 -0.137) 39.15%, oklab(40% 0 0 / 0%) 79.28%)",
              translate: "-50% -50%",
            }}
          />
          <div
            className="w-150.25 h-79.5 absolute left-[50%] top-[calc(50%+97px)]"
            style={{
              backgroundImage:
                "linear-gradient(in oklab 180deg, oklab(71.8% 0 0 / 0%) -122.12%, oklab(20.1% 0 0) 102.12%)",
              translate: "-50% -50%",
            }}
          />
          <div className="items-start [container-name:card-header] @container grid auto-rows-min grid-rows-[auto_auto] px-3 rounded-tl-[14px] rounded-tr-[14px] gap-1 relative">
            <div
              className="text-[14px] leading-[142.857%] wrap-normal uppercase text-white"
              style={{ fontFamily: '"M PLUS Code Latin", monospace, sans-serif' }}
            >
              Change 01
            </div>
            <div className="text-[14px] leading-[137.5%] wrap-normal font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-[#FAFAFA]">
              Stepped flow + progress bar
            </div>
          </div>
          <div className="items-center flex p-3 rounded-br-[14px] rounded-bl-[14px] relative bg-[#191919] border-t border-t-solid border-t-[#FFFFFF1A]">
            <div className="flex text-[12px] leading-[133.333%] wrap-normal font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#A1A1A1]">
              One long scroll, now clear stepped sections.
            </div>
          </div>
        </div>
        <div
          className="flex [font-synthesis-small-caps:none] [font-synthesis-style:none] [font-synthesis-weight:none] rounded-xl items-start justify-between self-stretch px-4.5 py-5 h-74.75 overflow-clip gap-8 relative shrink-0 bg-origin-border border border-solid border-[#FFFFFF1A] group-hover:border-white/30 transition-colors duration-300 w-full"
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
            priority={isPopup}
            image="https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M04G80ZAAH1PVPV1FAHY4PSW.jpg"
            colorFront="#343434"
            colorBack="#00000000"
            className="w-166.5 h-125 absolute left-[50%] top-[50%]"
            style={{
              backgroundImage:
                "linear-gradient(in oklab 178.97000000000003deg, oklab(0% 0 0) 41.45%, oklab(40% 0 0 / 0%) 79.28%)",
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
          <div className="flex items-center relative">
            <div
              className="aspect-[151/304] w-64.5 max-w-full overflow-clip h-130.5 shrink-0 bg-size-[100%_100%] bg-position-[50%] bg-no-repeat"
              style={{
                backgroundImage:
                  "url(https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/6Y2P03ECMSJGXKC3AR5WN92K3K.webp)",
              }}
            />
          </div>
          <div className="flex items-center relative">
            <div
              className="aspect-[151/304] w-64.5 max-w-full overflow-clip h-130.5 shrink-0 bg-size-[100%_100%] bg-position-[50%] bg-no-repeat"
              style={{
                backgroundImage:
                  "url(https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/2F6BWG8EWY0N00F2KHFKSQDQDR.webp)",
              }}
            />
          </div>
        </div>
      </motion.div>
    );
  }

  if (id === "change-02") {
    return (
      <motion.div
        layoutId={`card-${id}`}
        transition={currentTransition}
        initial={isPopup ? { scale: 1 } : false}
        animate={{ scale: isPopup ? scale : 1 }}
        exit={{ scale: 1 }}
        whileHover={isPopup ? undefined : { scale: 1.012 }}
        onClick={isPopup ? undefined : onCardClick}
        className={`origin-center transform-gpu will-change-transform flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 self-stretch overflow-clip [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F] w-full relative ${
          isPopup
            ? "shadow-2xl border-[#FFFFFF26]"
            : "group cursor-pointer hover:border-white/30 hover:shadow-[0_12px_32px_rgba(0,0,0,0.6)] transition-colors duration-200"
        }`}
      >
        <div
          className="[container-name:card] @container flex flex-col pt-3 rounded-[14px] overflow-clip gap-3 relative self-stretch [box-shadow:#FAFAFA1A_0px_0px_0px_1px,#0000000D_0px_1px_2px] bg-[#171717] w-full"
          style={{
            backgroundImage:
              "linear-gradient(in oklab 0deg, oklab(92.2% 0 0 / 5%) 0%, oklab(20.5% 0 0) 100%)",
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
            priority={isPopup}
            image="https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M04G80ZAAH1PVPV1FAHY4PSW.jpg"
            colorFront="#6BA0FF"
            colorBack="#00000000"
            className="w-166.5 h-125 absolute left-[calc(50%+0.016px)] top-[calc(50%-46.5px)]"
            style={{
              backgroundImage:
                "linear-gradient(in oklab 178.97000000000003deg, oklab(71.5% -0.021 -0.137) 39.15%, oklab(40% 0 0 / 0%) 79.28%)",
              translate: "-50% -50%",
            }}
          />
          <div
            className="w-150.25 h-79.5 absolute left-[50%] top-[calc(50%+97px)]"
            style={{
              backgroundImage:
                "linear-gradient(in oklab 180deg, oklab(71.8% 0 0 / 0%) -122.12%, oklab(20.1% 0 0) 102.12%)",
              translate: "-50% -50%",
            }}
          />
          <div className="items-start [container-name:card-header] @container grid auto-rows-min grid-rows-[auto_auto] px-3 rounded-tl-[14px] rounded-tr-[14px] gap-1 relative">
            <div
              className="text-[14px] leading-[142.857%] uppercase text-white"
              style={{ fontFamily: '"M PLUS Code Latin", monospace, sans-serif' }}
            >
              Change 02
            </div>
            <div className="text-[14px] leading-[137.5%] font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-[#FAFAFA]">
              Notification section
            </div>
          </div>
          <div className="items-center flex p-3 rounded-br-[14px] rounded-bl-[14px] relative bg-[#191919] border-t border-t-solid border-t-[#FFFFFF1A]">
            <div className="flex text-[12px] leading-[133.333%] font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#A1A1A1]">
              Flags any issues before reps submit.
            </div>
          </div>
        </div>
        <div
          className="flex [font-synthesis-small-caps:none] [font-synthesis-style:none] [font-synthesis-weight:none] rounded-xl items-start justify-center self-stretch px-4.5 py-5 h-74.75 overflow-clip gap-8 relative shrink-0 bg-origin-border border border-solid border-[#FFFFFF1A] group-hover:border-white/30 transition-colors duration-300 w-full"
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
            priority={isPopup}
            image="https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M04G80ZAAH1PVPV1FAHY4PSW.jpg"
            colorFront="#343434"
            colorBack="#00000000"
            className="w-166.5 h-125 absolute left-[50%] top-[50%]"
            style={{
              backgroundImage:
                "linear-gradient(in oklab 178.97000000000003deg, oklab(0% 0 0) 41.45%, oklab(40% 0 0 / 0%) 79.28%)",
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
          <div className="flex items-start justify-center relative">
            <div
              className="aspect-[151/304] w-111.25 max-w-full overflow-clip h-225.5 shrink-0 bg-size-[100%_100%] bg-position-[50%] bg-no-repeat"
              style={{
                backgroundImage:
                  "url(https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/2F6BWG8EWY0N00F2KHFKSQDQDR.webp)",
              }}
            />
          </div>
        </div>
      </motion.div>
    );
  }

  if (id === "change-03") {
    return (
      <motion.div
        layoutId={`card-${id}`}
        transition={currentTransition}
        initial={isPopup ? { scale: 1 } : false}
        animate={{ scale: isPopup ? scale : 1 }}
        exit={{ scale: 1 }}
        whileHover={isPopup ? undefined : { scale: 1.012 }}
        onClick={isPopup ? undefined : onCardClick}
        className={`origin-center transform-gpu will-change-transform flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 self-stretch overflow-clip [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F] w-full relative ${
          isPopup
            ? "shadow-2xl border-[#FFFFFF26]"
            : "group cursor-pointer hover:border-white/30 hover:shadow-[0_12px_32px_rgba(0,0,0,0.6)] transition-colors duration-200"
        }`}
      >
        <div
          className="[container-name:card] @container flex flex-col pt-3 rounded-[14px] overflow-clip gap-3 relative self-stretch [box-shadow:#FAFAFA1A_0px_0px_0px_1px,#0000000D_0px_1px_2px] bg-[#171717] w-full"
          style={{
            backgroundImage:
              "linear-gradient(in oklab 0deg, oklab(92.2% 0 0 / 5%) 0%, oklab(20.5% 0 0) 100%)",
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
            priority={isPopup}
            image="https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M04G80ZAAH1PVPV1FAHY4PSW.jpg"
            colorFront="#6BA0FF"
            colorBack="#00000000"
            className="w-166.5 h-125 absolute left-[calc(50%+0.016px)] top-[calc(50%-46.5px)]"
            style={{
              backgroundImage:
                "linear-gradient(in oklab 178.97000000000003deg, oklab(71.5% -0.021 -0.137) 39.15%, oklab(40% 0 0 / 0%) 79.28%)",
              translate: "-50% -50%",
            }}
          />
          <div
            className="w-150.25 h-79.5 absolute left-[50%] top-[calc(50%+97px)]"
            style={{
              backgroundImage:
                "linear-gradient(in oklab 180deg, oklab(71.8% 0 0 / 0%) -122.12%, oklab(20.1% 0 0) 102.12%)",
              translate: "-50% -50%",
            }}
          />
          <div className="items-start [container-name:card-header] @container grid auto-rows-min grid-rows-[auto_auto] px-3 rounded-tl-[14px] rounded-tr-[14px] gap-1 relative">
            <div
              className="text-[14px] leading-[142.857%] uppercase text-white"
              style={{ fontFamily: '"M PLUS Code Latin", monospace, sans-serif' }}
            >
              Change 03
            </div>
            <div className="text-[14px] leading-[137.5%] font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-[#FAFAFA]">
              Grouped, pre-filled fields
            </div>
          </div>
          <div className="items-center flex p-3 rounded-br-[14px] rounded-bl-[14px] relative bg-[#191919] border-t border-t-solid border-t-[#FFFFFF1A]">
            <div className="flex text-[12px] leading-[133.333%] font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#A1A1A1]">
              Grouped card fields, known values pre-filled.
            </div>
          </div>
        </div>
        <div
          className="flex [font-synthesis-small-caps:none] [font-synthesis-style:none] [font-synthesis-weight:none] rounded-xl items-center justify-between self-stretch px-4.5 py-5 h-74.75 overflow-clip gap-8 relative shrink-0 bg-origin-border border border-solid border-[#FFFFFF1A] group-hover:border-white/30 transition-colors duration-300 w-full"
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
            priority={isPopup}
            image="https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M04G80ZAAH1PVPV1FAHY4PSW.jpg"
            colorFront="#343434"
            colorBack="#00000000"
            className="w-166.5 h-125 absolute left-[50%] top-[50%]"
            style={{
              backgroundImage:
                "linear-gradient(in oklab 178.97000000000003deg, oklab(0% 0 0) 41.45%, oklab(40% 0 0 / 0%) 79.28%)",
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
          <div className="flex items-center relative">
            <div
              className="aspect-[151/304] w-64.5 max-w-full overflow-clip h-130.5 shrink-0 bg-size-[100%_100%] bg-position-[50%] bg-no-repeat"
              style={{
                backgroundImage:
                  "url(https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/6Y2P03ECMSJGXKC3AR5WN92K3K.webp)",
              }}
            />
          </div>
          <div className="flex items-start justify-center relative">
            <div
              className="aspect-[151/304] w-64.5 max-w-full overflow-clip h-130.5 shrink-0 bg-size-[100%_100%] bg-position-[50%] bg-no-repeat"
              style={{
                backgroundImage:
                  "url(https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/2F6BWG8EWY0N00F2KHFKSQDQDR.webp)",
              }}
            />
          </div>
        </div>
      </motion.div>
    );
  }

  // Change 04
  return (
    <motion.div
      layoutId={`card-${id}`}
      transition={currentTransition}
      initial={isPopup ? { scale: 1 } : false}
      animate={{ scale: isPopup ? scale : 1 }}
      exit={{ scale: 1 }}
      whileHover={isPopup ? undefined : { scale: 1.012 }}
      onClick={isPopup ? undefined : onCardClick}
      className={`origin-center transform-gpu will-change-transform flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 self-stretch overflow-clip [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F] w-full relative ${
        isPopup
          ? "shadow-2xl border-[#FFFFFF26]"
          : "group cursor-pointer hover:border-white/30 hover:shadow-[0_12px_32px_rgba(0,0,0,0.6)] transition-colors duration-200"
      }`}
    >
      <div
        className="[container-name:card] @container flex flex-col pt-3 rounded-[14px] overflow-clip gap-3 relative self-stretch [box-shadow:#FAFAFA1A_0px_0px_0px_1px,#0000000D_0px_1px_2px] bg-[#171717] w-full"
        style={{
          backgroundImage:
            "linear-gradient(in oklab 0deg, oklab(92.2% 0 0 / 5%) 0%, oklab(20.5% 0 0) 100%)",
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
          priority={isPopup}
          image="https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M04G80ZAAH1PVPV1FAHY4PSW.jpg"
          colorFront="#6BA0FF"
          colorBack="#00000000"
          className="w-166.5 h-125 absolute left-[calc(50%+0.016px)] top-[calc(50%-46.5px)]"
          style={{
            backgroundImage:
              "linear-gradient(in oklab 178.97000000000003deg, oklab(71.5% -0.021 -0.137) 39.15%, oklab(40% 0 0 / 0%) 79.28%)",
            translate: "-50% -50%",
          }}
        />
        <div
          className="w-150.25 h-79.5 absolute left-[50%] top-[calc(50%+97px)]"
          style={{
            backgroundImage:
              "linear-gradient(in oklab 180deg, oklab(71.8% 0 0 / 0%) -122.12%, oklab(20.1% 0 0) 102.12%)",
            translate: "-50% -50%",
          }}
        />
        <div className="items-start [container-name:card-header] @container grid auto-rows-min grid-rows-[auto_auto] px-3 rounded-tl-[14px] rounded-tr-[14px] gap-1 relative">
          <div
            className="text-[14px] leading-[142.857%] uppercase text-white"
            style={{ fontFamily: '"M PLUS Code Latin", monospace, sans-serif' }}
          >
            Change 04
          </div>
          <div className="text-[14px] leading-[137.5%] font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-[#FAFAFA]">
            Full-width primary CTA
          </div>
        </div>
        <div className="items-center flex p-3 rounded-br-[14px] rounded-bl-[14px] relative bg-[#191919] border-t border-t-solid border-t-[#FFFFFF1A]">
          <div className="flex text-[12px] leading-[133.333%] font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#A1A1A1]">
            One full-width button, always in reach.
          </div>
        </div>
      </div>
      <div
        className="flex [font-synthesis-small-caps:none] [font-synthesis-style:none] [font-synthesis-weight:none] rounded-xl items-center justify-between self-stretch px-4.5 py-5 h-74.75 overflow-clip gap-8 relative shrink-0 bg-origin-border border border-solid border-[#FFFFFF1A] group-hover:border-white/30 transition-colors duration-300 w-full"
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
          priority={isPopup}
          image="https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M04G80ZAAH1PVPV1FAHY4PSW.jpg"
          colorFront="#343434"
          colorBack="#00000000"
          className="w-166.5 h-125 absolute left-[50%] top-[50%]"
          style={{
            backgroundImage:
              "linear-gradient(in oklab 178.97000000000003deg, oklab(0% 0 0) 41.45%, oklab(40% 0 0 / 0%) 79.28%)",
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
        <div className="flex items-start justify-center relative self-stretch">
          <div
            className="aspect-[151/304] w-64.5 max-w-full overflow-clip h-130.5 shrink-0 bg-size-[100%_100%] bg-position-[50%] bg-no-repeat"
            style={{
              backgroundImage:
                "url(https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/6Y2P03ECMSJGXKC3AR5WN92K3K.webp)",
            }}
          />
        </div>
        <div className="flex items-end justify-center relative self-stretch">
          <div
            className="aspect-[151/304] w-64.5 max-w-full overflow-clip h-130.5 shrink-0 bg-size-[100%_100%] bg-position-[50%] bg-no-repeat"
            style={{
              backgroundImage:
                "url(https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/2F6BWG8EWY0N00F2KHFKSQDQDR.webp)",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

function AnimationControlPanel({
  config,
  onChange,
}: {
  config: AnimationConfig;
  onChange: (newConfig: AnimationConfig) => void;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const copyConfigCode = () => {
    let snippet = "";
    if (config.mode === "spring") {
      snippet = `const cardTransition = {\n  type: "spring",\n  stiffness: ${config.stiffness},\n  damping: ${config.damping},\n  mass: ${config.mass},\n};`;
    } else {
      snippet = `const cardTransition = {\n  type: "tween",\n  duration: ${config.duration},\n  ease: ${JSON.stringify(EASE_PRESETS[config.easePreset])},\n};`;
    }
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const PRESETS = [
    {
      name: "⚡ Snappy & Crisp",
      config: {
        mode: "spring" as const,
        stiffness: 450,
        damping: 34,
        mass: 0.8,
        duration: 0.35,
        easePreset: "apple" as const,
        scale: 1.75,
        backdropOpacity: 0.85,
        backdropBlur: 12,
      },
    },
    {
      name: "🍏 Apple Fluid",
      config: {
        mode: "tween" as const,
        stiffness: 350,
        damping: 32,
        mass: 1,
        duration: 0.45,
        easePreset: "apple" as const,
        scale: 1.75,
        backdropOpacity: 0.8,
        backdropBlur: 14,
      },
    },
    {
      name: "🎈 Playful Bounce",
      config: {
        mode: "spring" as const,
        stiffness: 320,
        damping: 18,
        mass: 1,
        duration: 0.5,
        easePreset: "backOut" as const,
        scale: 1.75,
        backdropOpacity: 0.85,
        backdropBlur: 10,
      },
    },
    {
      name: "🧘 Gentle / Slow",
      config: {
        mode: "spring" as const,
        stiffness: 180,
        damping: 28,
        mass: 1.2,
        duration: 0.6,
        easePreset: "easeInOut" as const,
        scale: 1.75,
        backdropOpacity: 0.8,
        backdropBlur: 16,
      },
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[999] font-sans">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-2xl border border-white/20 transition-all duration-200 hover:scale-105"
        >
          <span className="text-sm">🎛️</span>
          <span>Tune Animation</span>
          <span className="px-1.5 py-0.5 rounded bg-black/30 text-[10px] text-blue-200 font-mono">
            {config.mode === "spring" ? `S:${config.stiffness} D:${config.damping}` : `T:${config.duration}s`}
          </span>
        </button>
      ) : (
        <div className="w-80 max-h-[85vh] overflow-y-auto bg-[#141417]/95 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] p-4 flex flex-col gap-3 text-white">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-base">🎛️</span>
              <span className="text-xs font-bold tracking-wide uppercase text-white/90">
                Animation Tuner
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onChange(DEFAULT_ANIM_CONFIG)}
                title="Reset to default"
                className="p-1 rounded-md text-white/50 hover:text-white hover:bg-white/10 text-xs transition"
              >
                ↺
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Collapse panel"
                className="p-1 rounded-md text-white/50 hover:text-white hover:bg-white/10 text-xs transition"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-medium text-white/60">Quick Presets</label>
            <div className="grid grid-cols-2 gap-1.5">
              {PRESETS.map((p) => (
                <button
                  key={p.name}
                  onClick={() => onChange(p.config)}
                  className="px-2 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-[10px] font-medium text-left truncate transition"
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-medium text-white/60">Motion Engine</label>
            <div className="grid grid-cols-2 p-0.5 rounded-lg bg-black/40 border border-white/10">
              <button
                onClick={() => onChange({ ...config, mode: "spring" })}
                className={`py-1 rounded-md text-xs font-semibold transition ${
                  config.mode === "spring"
                    ? "bg-blue-600 text-white shadow"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Spring Physics
              </button>
              <button
                onClick={() => onChange({ ...config, mode: "tween" })}
                className={`py-1 rounded-md text-xs font-semibold transition ${
                  config.mode === "tween"
                    ? "bg-blue-600 text-white shadow"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Duration & Curve
              </button>
            </div>
          </div>

          {/* Sliders */}
          {config.mode === "spring" ? (
            <div className="flex flex-col gap-2 pt-0.5">
              {/* Stiffness */}
              <div className="flex flex-col gap-0.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-white/70">Stiffness (Speed / Snap)</span>
                  <span className="font-mono text-blue-400 font-bold">{config.stiffness}</span>
                </div>
                <input
                  type="range"
                  min={80}
                  max={800}
                  step={10}
                  value={config.stiffness}
                  onChange={(e) => onChange({ ...config, stiffness: Number(e.target.value) })}
                  className="w-full accent-blue-500 h-1.5 bg-white/20 rounded-lg cursor-pointer"
                />
              </div>

              {/* Damping */}
              <div className="flex flex-col gap-0.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-white/70">Damping (Friction / Bounce)</span>
                  <span className="font-mono text-blue-400 font-bold">{config.damping}</span>
                </div>
                <input
                  type="range"
                  min={8}
                  max={60}
                  step={1}
                  value={config.damping}
                  onChange={(e) => onChange({ ...config, damping: Number(e.target.value) })}
                  className="w-full accent-blue-500 h-1.5 bg-white/20 rounded-lg cursor-pointer"
                />
              </div>

              {/* Mass */}
              <div className="flex flex-col gap-0.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-white/70">Mass (Weight Inertia)</span>
                  <span className="font-mono text-blue-400 font-bold">{config.mass.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min={0.2}
                  max={3.0}
                  step={0.1}
                  value={config.mass}
                  onChange={(e) => onChange({ ...config, mass: Number(e.target.value) })}
                  className="w-full accent-blue-500 h-1.5 bg-white/20 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2 pt-0.5">
              {/* Duration */}
              <div className="flex flex-col gap-0.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-white/70">Duration</span>
                  <span className="font-mono text-blue-400 font-bold">{config.duration.toFixed(2)}s</span>
                </div>
                <input
                  type="range"
                  min={0.1}
                  max={1.5}
                  step={0.05}
                  value={config.duration}
                  onChange={(e) => onChange({ ...config, duration: Number(e.target.value) })}
                  className="w-full accent-blue-500 h-1.5 bg-white/20 rounded-lg cursor-pointer"
                />
              </div>

              {/* Easing Preset */}
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] text-white/70">Ease Curve</span>
                <select
                  value={config.easePreset}
                  onChange={(e) => onChange({ ...config, easePreset: e.target.value as any })}
                  className="bg-black/50 border border-white/15 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="apple">Apple Fluid [0.16, 1, 0.3, 1]</option>
                  <option value="easeOut">Standard Ease-Out</option>
                  <option value="backOut">Back-Out (Overshoot)</option>
                  <option value="easeInOut">Ease-In-Out</option>
                  <option value="linear">Linear</option>
                </select>
              </div>
            </div>
          )}

          {/* Popup Visuals */}
          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            {/* Scale */}
            <div className="flex flex-col gap-0.5">
              <div className="flex justify-between text-[11px]">
                <span className="text-white/70">Enlarge Scale</span>
                <span className="font-mono text-emerald-400 font-bold">{config.scale.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min={1.2}
                max={2.2}
                step={0.05}
                value={config.scale}
                onChange={(e) => onChange({ ...config, scale: Number(e.target.value) })}
                className="w-full accent-emerald-500 h-1.5 bg-white/20 rounded-lg cursor-pointer"
              />
            </div>

            {/* Backdrop Darkness */}
            <div className="flex flex-col gap-0.5">
              <div className="flex justify-between text-[11px]">
                <span className="text-white/70">Backdrop Opacity</span>
                <span className="font-mono text-emerald-400 font-bold">{Math.round(config.backdropOpacity * 100)}%</span>
              </div>
              <input
                type="range"
                min={0.2}
                max={0.95}
                step={0.05}
                value={config.backdropOpacity}
                onChange={(e) => onChange({ ...config, backdropOpacity: Number(e.target.value) })}
                className="w-full accent-emerald-500 h-1.5 bg-white/20 rounded-lg cursor-pointer"
              />
            </div>

            {/* Backdrop Blur */}
            <div className="flex flex-col gap-0.5">
              <div className="flex justify-between text-[11px]">
                <span className="text-white/70">Backdrop Blur</span>
                <span className="font-mono text-emerald-400 font-bold">{config.backdropBlur}px</span>
              </div>
              <input
                type="range"
                min={0}
                max={24}
                step={2}
                value={config.backdropBlur}
                onChange={(e) => onChange({ ...config, backdropBlur: Number(e.target.value) })}
                className="w-full accent-emerald-500 h-1.5 bg-white/20 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Copy Config Button */}
          <button
            onClick={copyConfigCode}
            className="mt-0.5 w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold flex items-center justify-center gap-2 transition"
          >
            <span>{copied ? "✓ Copied to Clipboard!" : "📋 Copy Config Code"}</span>
          </button>
        </div>
      )}
    </div>
  );
}

export function EdgeCrmTestCaseStudy() {
  const [poppedCardId, setPoppedCardId] = React.useState<string | null>(null);
  const [animConfig, setAnimConfig] = React.useState<AnimationConfig>(DEFAULT_ANIM_CONFIG);

  const handleOpenCard = React.useCallback((id: string) => {
    React.startTransition(() => {
      setPoppedCardId(id);
    });
  }, []);

  const handleCloseCard = React.useCallback(() => {
    React.startTransition(() => {
      setPoppedCardId(null);
    });
  }, []);

  const activeTransition = React.useMemo(() => {
    if (animConfig.mode === "spring") {
      return {
        type: "spring",
        stiffness: animConfig.stiffness,
        damping: animConfig.damping,
        mass: animConfig.mass,
      };
    }
    return {
      type: "tween",
      duration: animConfig.duration,
      ease: EASE_PRESETS[animConfig.easePreset],
    };
  }, [animConfig]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseCard();
      }
    };

    let rafId: number;
    if (poppedCardId) {
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
  }, [poppedCardId, handleCloseCard]);
  return (
    <div
      className="relative w-full text-white antialiased pt-20 sm:pt-24 lg:pt-28 pb-36 px-4"
      style={{
        fontFamily: HELVETICA,
        letterSpacing: "normal",
        fontFeatureSettings: "normal",
      }}
    >
      {/* ========================================================================= */}
      {/* 1. FIXED LEFT-SIDE NAVIGATION (Template Component)                         */}
      {/* ========================================================================= */}
      <CaseStudyNav items={SECTIONS} />

      {/* ========================================================================= */}
      {/* 2. CENTER-ALIGNED MAIN READING CONTAINER (600px column centered in screen) */}
      {/* ========================================================================= */}
      <div className="relative mx-auto w-full max-w-[600px]">
        {/* Fixed Back Button anchored beside title */}
        <CaseStudyBackButton href="/case-studies" />

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
              A digital platform for the Indian citizens to cast and verify their vote online.
            </h1>

            {/* Metadata row */}
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
                    fontWeight: 300,
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
                    fontWeight: 300,
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
                    fontWeight: 300,
                    color: "#FFFFFF",
                  }}
                >
                  0 to 1 product design
                </span>
              </div>
            </div>
          </div>

          {/* ================================================================ */}
          {/* HERO SECTION: Bento Card with Shader & Discovery Story           */}
          {/* ================================================================ */}
          <section id="hero" className="scroll-mt-28 flex flex-col items-start gap-7 w-full">
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
          </section>

          <GrungeSeparator />

          {/* ================================================================ */}
          {/* ABOUT SECTION: 3 Feature Bento Cards                             */}
          {/* ================================================================ */}
          <section id="phase-1" className="scroll-mt-28 flex flex-col items-start gap-3 self-stretch w-full">
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
          </section>

          <GrungeSeparator />

          {/* ================================================================ */}
          {/* THE PROBLEM: Problem Statement Shader Bento Card                  */}
          {/* ================================================================ */}
          <section id="the-problem" className="scroll-mt-28 flex flex-col items-start gap-3 self-stretch w-full">
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
          </section>

          <GrungeSeparator />

          {/* ================================================================ */}
          {/* HOW MIGHT WE: 3px Blue Left-Border Callout                       */}
          {/* ================================================================ */}
          <section id="phase-2" className="scroll-mt-28 flex flex-col items-start gap-3 self-stretch w-full">
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
          </section>


          {/* ================================================================ */}
          {/* TABLE FRAME (1PN-0): 3 Failure Breakdowns & Direction Bento Cards*/}
          {/* ================================================================ */}
          <section id="table" className="scroll-mt-28 flex flex-col items-start gap-9 self-stretch w-full">
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
              {/* 1. Unstructured long form */}
              <div className="flex flex-col items-start w-full">
                <div className="flex flex-col items-start gap-15 w-full">
                  <div className="flex flex-col items-start gap-3 w-full">
                    <div className="tracking-[-0.02em] w-fit font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-white text-lg/5.5">
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
                        <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 flex-1 overflow-clip p-1 relative self-stretch [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
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

              {/* 2. Fields looked visually identical. */}
              <div className="flex flex-col items-start w-full">
                <div className="flex flex-col items-start gap-15 w-full">
                  <div className="flex flex-col items-start gap-3 w-full">
                    <div className="tracking-[-0.02em] w-fit font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-white text-lg/5.5">
                      2. Fields looked visually identical.
                    </div>
                    <div className="flex flex-col items-start gap-9 w-full">
                      <div className="flex flex-col items-start gap-6 w-full">
                        <div className="w-full font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
                          Different field types looked the same, making it difficult for reps to understand how each field should be interacted with before tapping it.
                        </div>
                        <div className="w-full font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-white text-base/5">
                          What actions do I need to take?
                        </div>
                        <div className="flex flex-col items-start gap-3 w-full">
                          <div className="w-full font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
                            • Visually differentiate fields based on their interaction type.
                          </div>
                          <div className="w-full font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
                            • Make interactive elements recognizable before users engage with them.
                          </div>
                          <div className="w-full font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
                            • Establish a consistent visual language for different field types.
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 self-stretch h-78 shrink-0 w-full">
                        {/* Card 1: Distinct field styles */}
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
                                Distinct field styles
                              </div>
                              <div className="self-stretch font-['Instrument_Sans',system-ui,sans-serif] text-white text-base/5">
                                Replace the existing underline inputs with bordered, card-style fields that clearly define where interaction happens.
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Card 2: Clear hierarchy */}
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
                                Clear hierarchy
                              </div>
                              <div className="self-stretch font-['Instrument_Sans',system-ui,sans-serif] text-white text-base/5">
                                Use spacing, labels, and field treatments to create a stronger distinction between different types of inputs.
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Card 3: Dropdown indicators */}
                        <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 flex-1 overflow-clip p-1 relative self-stretch [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
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
                                Dropdown indicators
                              </div>
                              <div className="self-stretch font-['Instrument_Sans',system-ui,sans-serif] text-white text-base/5">
                                Add a chevron icon to dropdown fields so users can immediately recognize selectable lists.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Validation feedback was unclear. */}
              <div className="flex flex-col items-start w-full">
                <div className="flex flex-col items-start gap-15 w-full">
                  <div className="flex flex-col items-start gap-3 w-full">
                    <div className="tracking-[-0.02em] w-fit font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-white text-lg/5.5">
                      3. Validation feedback was unclear.
                    </div>
                    <div className="flex flex-col items-start gap-9 w-full">
                      <div className="flex flex-col items-start gap-6 w-full">
                        <div className="w-full font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
                          When errors occurred, reps had to repeatedly scan and refill the form because the interface didn't clearly explain what had gone wrong.
                        </div>
                        <div className="w-full font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-white text-base/5">
                          What actions do I need to take?
                        </div>
                        <div className="flex flex-col items-start gap-3 w-full">
                          <div className="w-full font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
                            • Tell users exactly what needs to be fixed.
                          </div>
                          <div className="w-full font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
                            • Surface errors where users can immediately see them.
                          </div>
                          <div className="w-full font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
                            • Reduce the need to rescan or refill the entire form.
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 self-stretch h-78 shrink-0 w-full">
                        {/* Card 1: Error summary */}
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
                                Error summary
                              </div>
                              <div className="self-stretch font-['Instrument_Sans',system-ui,sans-serif] text-white text-base/5">
                                Display a clear error banner at the top that summarizes what needs to be fixed before submission.
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Card 2: Specific guidance */}
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
                                Specific guidance
                              </div>
                              <div className="self-stretch font-['Instrument_Sans',system-ui,sans-serif] text-white text-base/5">
                                Replace generic validation messages with actionable feedback like “Please add a case subject.”
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Card 3: Error states */}
                        <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 flex-1 overflow-clip p-1 relative self-stretch [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
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
                              <div className="w-fit whitespace-pre font-['Instrument_Sans',system-ui,sans-serif] text-white text-base/4.5">
                                Error states<br />
                              </div>
                              <div className="self-stretch font-['Instrument_Sans',system-ui,sans-serif] text-white text-base/5">
                                Highlight invalid fields with a distinct red border so users can immediately locate the problem.
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
          </section>

          {/* ================================================================ */}
          {/* SECTION: Every step added time, effort, and doubt (1VM-0)        */}
          {/* ================================================================ */}
          <GrungeSeparator />

          <section id="solving-3ts" className="scroll-mt-28 flex flex-col items-start gap-15 self-stretch w-full">
            {/* Part 1: Every step added time, effort, and doubt */}
            <div className="flex flex-col items-start gap-3 self-stretch w-full">
              <div className="tracking-[-0.02em] w-full font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-white text-xl/6">
                Every step added time, effort, and doubt
              </div>
              <div className="flex flex-col items-start gap-14 self-stretch w-full">
                <div className="flex flex-col items-start gap-3 w-full">
                  <div className="w-full font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
                    By the time a rep had an answer, the client had already lost confidence.
                  </div>
                  <div className="w-full font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
                    Timing the old flow end-to-end showed how the seconds stacked up. A heuristic audit showed why.
                  </div>
                </div>
                <div className="flex flex-col items-start gap-3 self-stretch w-full">
                  <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 self-stretch h-77.5 shrink-0 [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
                    <div
                      className="aspect-square flex [font-synthesis-small-caps:none] [font-synthesis-style:none] [font-synthesis-weight:none] rounded-xl flex-col items-start justify-between self-stretch h-74.75 overflow-clip py-5 px-4.5 relative shrink-0 bg-origin-border"
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
                        colorFront="#343434"
                        colorBack="#00000000"
                        className="w-166.5 h-125 absolute left-[50%] top-[50%]"
                        style={{
                          backgroundImage:
                            "linear-gradient(in oklab 178.97000000000003deg, oklab(0% 0 0) 41.45%, oklab(40% 0 0 / 0%) 79.28%)",
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
                        Time to answer a client
                      </div>
                      <div className="flex items-center justify-between p-2 relative self-stretch w-full">
                        <div className="flex flex-col items-center gap-4.5 w-19 justify-center shrink-0 self-stretch">
                          <div className="text-center font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] flex justify-center flex-wrap text-[#FFFFFFB3] text-xs/4">
                            14% slower
                          </div>
                          <div className="text-justify w-fit font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-white text-xl/6">
                            - 8 sec
                          </div>
                          <div className="flex items-center pt-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ flexShrink: "0" }}>
                              <path d="M5 12h14" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="m12 5 7 7-7 7" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <div className="text-center self-stretch font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] flex justify-center flex-wrap text-[#FFFFFFB3] text-xs/4">
                            Opens app to find the required case
                          </div>
                        </div>
                        <div className="flex flex-col items-center gap-4.5 w-19 justify-center shrink-0">
                          <div className="text-center font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] flex justify-center flex-wrap text-[#FFFFFFB3] text-xs/4">
                            14% slower
                          </div>
                          <div className="text-justify w-fit font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-white text-xl/6">
                            +14 sec
                          </div>
                          <div className="flex items-center pt-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ flexShrink: "0" }}>
                              <path d="M5 12h14" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="m12 5 7 7-7 7" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <div className="text-center self-stretch font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] flex justify-center flex-wrap text-[#FFFFFFB3] text-xs/4">
                            Scrolls entire list to locate the case
                          </div>
                        </div>
                        <div className="flex flex-col items-center gap-4.5 w-19 justify-center shrink-0">
                          <div className="text-center font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] flex justify-center flex-wrap text-[#FFFFFFB3] text-xs/4">
                            22 % slower
                          </div>
                          <div className="text-justify w-fit font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-white text-xl/6">
                            +11 sec
                          </div>
                          <div className="flex items-center pt-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ flexShrink: "0" }}>
                              <path d="M5 12h14" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="m12 5 7 7-7 7" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <div className="text-center self-stretch font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] flex justify-center flex-wrap text-[#FFFFFFB3] text-xs/4">
                            Taps into individual case detail
                          </div>
                        </div>
                        <div className="flex flex-col items-center gap-4.5 w-19 justify-center shrink-0">
                          <div className="text-center font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] flex justify-center flex-wrap text-[#FFFFFFB3] text-xs/4">
                            31% slower
                          </div>
                          <div className="text-justify w-fit font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-white text-xl/6">
                            +19 sec
                          </div>
                          <div className="flex items-center pt-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ flexShrink: "0" }}>
                              <path d="M5 12h14" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="m12 5 7 7-7 7" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <div className="text-center self-stretch font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] flex justify-center flex-wrap text-[#FFFFFFB3] text-xs/4">
                            Scans wall of data to find information
                          </div>
                        </div>
                        <div className="flex flex-col items-center gap-4.5 w-19 justify-center shrink-0">
                          <div className="text-center font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] flex justify-center flex-wrap text-[#FFFFFFB3] text-xs/4">
                            52 sec total
                          </div>
                          <div className="text-justify w-fit font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-white text-xl/6">
                            +52 sec
                          </div>
                          <div className="flex items-center pt-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ flexShrink: "0" }}>
                              <path d="M5 12h14" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="m12 5 7 7-7 7" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <div className="text-center self-stretch font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] flex justify-center flex-wrap text-[#FFFFFFB3] text-xs/4">
                            Answers the client with information
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Part 2: Eventually creating frictions at three areas : */}
            <div className="flex flex-col items-start gap-7 self-stretch w-full">
              <div className="tracking-[-0.02em] w-full font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-white text-xl/6">
                Eventually creating frictions at three areas :
              </div>
              <div className="flex items-start gap-4 self-stretch h-78 shrink-0 w-full">
                {/* Card 1: Entire form, no end */}
                <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 flex-1 overflow-clip p-1 relative self-stretch [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
                  <div
                    className="aspect-square flex [font-synthesis-small-caps:none] [font-synthesis-style:none] [font-synthesis-weight:none] rounded-xl overflow-clip flex-col items-center justify-center self-stretch flex-1 px-4.5 py-5 relative bg-origin-border"
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
                      className="w-166.5 h-125 absolute left-[50%] top-[50%] origin-top-left"
                      style={{
                        backgroundImage:
                          "linear-gradient(in oklab 178.97000000000003deg, oklab(71.5% -0.021 -0.137) 39.15%, oklab(40% 0 0 / 0%) 79.28%)",
                        rotate: "48.49deg",
                        translate: "calc(-50% + 299.53px) calc(-50% - 165.053px)",
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
                    <div className="items-start flex flex-col justify-between gap-1.5 flex-1 self-stretch relative">
                      <div className="w-fit font-['Instrument_Sans',system-ui,sans-serif] text-white text-base/4.5">
                        Entire form, no end
                      </div>
                      <div className="self-stretch font-['Instrument_Sans',system-ui,sans-serif] text-white text-base/5">
                        One endless scroll with zero progress indicator. The rep can&apos;t gauge how long it will take, so the brain defaults to avoidance.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 2: Dropdown vs text field */}
                <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 flex-1 overflow-clip p-1 relative self-stretch [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
                  <div
                    className="aspect-square flex [font-synthesis-small-caps:none] [font-synthesis-style:none] [font-synthesis-weight:none] rounded-xl overflow-clip flex-col items-center justify-center self-stretch flex-1 px-4.5 py-5 relative bg-origin-border"
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
                      className="w-166.5 h-125 absolute left-[50%] top-[50%] origin-top-left"
                      style={{
                        backgroundImage:
                          "linear-gradient(in oklab 178.97000000000003deg, oklab(71.5% -0.021 -0.137) 39.15%, oklab(40% 0 0 / 0%) 79.28%)",
                        rotate: "48.49deg",
                        translate: "calc(-50% + 299.53px) calc(-50% - 165.053px)",
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
                    <div className="items-start flex flex-col justify-between gap-1.5 flex-1 self-stretch relative">
                      <div className="w-fit font-['Instrument_Sans',system-ui,sans-serif] text-white text-base/4.5">
                        Dropdown vs text field
                      </div>
                      <div className="self-stretch font-['Instrument_Sans',system-ui,sans-serif] text-white text-base/5">
                        Every field looks identical: an underline with a chevron. You can&apos;t tell a dropdown from a text field until you tap.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Important fields hidden */}
              <div className="flex items-start gap-4 self-stretch h-78 shrink-0 w-full">
                <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 flex-1 overflow-clip p-1 relative self-stretch [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
                  <div
                    className="flex [font-synthesis-small-caps:none] [font-synthesis-style:none] [font-synthesis-weight:none] rounded-xl overflow-clip flex-col items-center justify-center self-stretch flex-1 px-4.5 py-5 relative bg-origin-border"
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
                      className="w-166.5 h-125 absolute left-[calc(50%+0.016px)] top-[calc(50%-0.002px)]"
                      style={{
                        backgroundImage:
                          "linear-gradient(in oklab 178.97000000000003deg, oklab(71.5% -0.021 -0.137) 39.15%, oklab(40% 0 0 / 0%) 79.28%)",
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
                    <div className="items-start flex flex-col justify-between gap-1.5 flex-1 self-stretch relative">
                      <div className="w-fit font-['Instrument_Sans',system-ui,sans-serif] text-white text-base/4.5">
                        Important fields hidden
                      </div>
                      <div className="self-stretch font-['Instrument_Sans',system-ui,sans-serif] text-white text-base/5">
                        Required and optional fields look the same. A red asterisk is the only signal. No grouping, no hierarchy, no sense of what is critical.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <GrungeSeparator />

          {/* ================================================================ */}
          {/* SECTION: Climax (2JY-0)                                          */}
          {/* ================================================================ */}
          <section id="climax" className="scroll-mt-28 flex flex-col items-start gap-3 self-stretch w-full">
            <div className="tracking-[-0.02em] w-full font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-white text-xl/6">
              Climax
            </div>
            <div className="flex flex-col items-start gap-3 w-full">
              <div className="w-full font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-white text-[40px]/12 font-normal">
                The fix was clear. Stop asking for everything at once. Break the form into steps. Make every field say what it is.
              </div>
              <div className="w-fit font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-2xl/7.5">
                Pre-fill what the system already knows.
              </div>
            </div>
          </section>

          <GrungeSeparator />

          {/* ================================================================ */}
          {/* SECTION: Turning decisions into a flow reps could trust (2KQ-0) */}
          {/* ================================================================ */}
          <section id="turning-decisions" className="scroll-mt-28 flex flex-col items-start gap-3 self-stretch w-full">
            <div className="tracking-[-0.02em] w-full font-['HelveticaNeue-Medium','Helvetica_Neue',system-ui,sans-serif] font-medium text-white text-xl/6">
              Turning decisions into a flow reps could trust
            </div>
            <div className="flex flex-col items-start gap-14 self-stretch w-full">
              <div className="flex flex-col items-start gap-3 w-full">
                <div className="w-full font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
                  I did four key design changes, that will be make the scanning and filling the form faster
                </div>
                <div className="w-full font-['HelveticaNeue','Helvetica_Neue',system-ui,sans-serif] text-[#FFFFFFB3] text-base/5">
                  I have included the before and after screens.
                </div>
              </div>

              {/* Change 01 */}
              <ChangeCard id="change-01" transition={activeTransition} onCardClick={() => handleOpenCard("change-01")} />

              {/* Change 02 */}
              <ChangeCard id="change-02" transition={activeTransition} onCardClick={() => handleOpenCard("change-02")} />

              {/* Change 03 */}
              <ChangeCard id="change-03" transition={activeTransition} onCardClick={() => handleOpenCard("change-03")} />

              {/* Change 04 */}
              <ChangeCard id="change-04" transition={activeTransition} onCardClick={() => handleOpenCard("change-04")} />
            </div>
          </section>

          <GrungeSeparator />
        </main>
      </div>

      {/* 2x Enlarged Card Popup */}
      <AnimatePresence>
        {poppedCardId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 cursor-zoom-out overflow-hidden transform-gpu will-change-[opacity]"
            style={{
              backgroundColor: `rgba(0, 0, 0, ${animConfig.backdropOpacity})`,
              backdropFilter: `blur(${animConfig.backdropBlur}px)`,
              WebkitBackdropFilter: `blur(${animConfig.backdropBlur}px)`,
            }}
            onClick={handleCloseCard}
          >
            <div
              className="w-[580px] max-w-[90vw] flex items-center justify-center origin-center shrink-0 drop-shadow-[0_25px_60px_rgba(0,0,0,0.9)] cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <ChangeCard
                id={poppedCardId as any}
                transition={activeTransition}
                scale={animConfig.scale}
                isPopup
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live Visual Slider Panel */}
      <AnimationControlPanel config={animConfig} onChange={setAnimConfig} />
    </div>
  );
}
