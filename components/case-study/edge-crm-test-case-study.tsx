"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { HalftoneDots } from "@paper-design/shaders-react";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "the-problem", label: "The Problem" },
  { id: "how-might-we", label: "How Might We?" },
  { id: "before-after", label: "Before & After" },
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

/** Small square bento card with HalftoneDots shader */
function BentoShaderCard({
  title,
  description,
  imageUrl,
}: {
  title: string;
  description: string;
  imageUrl: string;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
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
            image={imageUrl}
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
          <div className="w-fit text-white text-base leading-[18px]">{title}</div>
          <div className="self-stretch text-white text-base leading-5">{description}</div>
        </div>
      </div>
    </div>
  );
}

export function EdgeCrmTestCaseStudy() {
  const [activeSection, setActiveSection] = useState("about");
  const [mounted, setMounted] = useState(false);
  const [isPlaygroundOpen, setIsPlaygroundOpen] = useState(false);
  const [canvasZoom, setCanvasZoom] = useState(0.75);
  const [canvasPan, setCanvasPan] = useState({ x: 0, y: 0 });
  const [isDraggingCanvas, setIsDraggingCanvas] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number; panX: number; panY: number }>({
    x: 0,
    y: 0,
    panX: 0,
    panY: 0,
  });
  const mockupScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isPlaygroundOpen) setIsPlaygroundOpen(false);
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

  // Continuous rAF scroll-spy
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
        if (item.el.getBoundingClientRect().top <= line) current = item.id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10)
        current = elements[elements.length - 1].id;
      setActiveSection(current);
    };
    raf = requestAnimationFrame(syncActive);
    return () => cancelAnimationFrame(raf);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = (
      window as unknown as { __lenis?: { scrollTo: (t: HTMLElement, o?: object) => void } }
    ).__lenis;
    if (lenis) lenis.scrollTo(el, { offset: -80 });
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Canvas drag & zoom
  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    setIsDraggingCanvas(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY, panX: canvasPan.x, panY: canvasPan.y };
  };
  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingCanvas) return;
    setCanvasPan({
      x: dragStartRef.current.panX + e.clientX - dragStartRef.current.x,
      y: dragStartRef.current.panY + e.clientY - dragStartRef.current.y,
    });
  };
  const handleCanvasMouseUp = () => setIsDraggingCanvas(false);
  const handleCanvasWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setCanvasZoom((z) => Math.min(2.5, Math.max(0.35, z - e.deltaY * 0.001)));
  };

  return (
    <div
      className="relative min-h-screen w-full"
      style={{ background: "oklch(10.7% 0 0)" }}
    >
      {/* ── Fixed left TOC ───────────────────────────────── */}
      <nav
        className="fixed top-1/2 -translate-y-1/2 z-30 flex-col items-start gap-1 hidden lg:flex"
        style={{ left: "max(20px, calc(50% - 380px))" }}
        aria-label="Table of contents"
      >
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className="flex items-center gap-2 group"
          >
            <div
              className="rounded-full transition-all duration-200"
              style={{
                width: activeSection === s.id ? 6 : 4,
                height: activeSection === s.id ? 6 : 4,
                background: activeSection === s.id ? "#B81919" : "rgba(255,255,255,0.25)",
              }}
            />
            <span
              className="text-[11px] transition-colors duration-200"
              style={{
                fontFamily: FIRA_CODE,
                color:
                  activeSection === s.id ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
              }}
            >
              {s.label}
            </span>
          </button>
        ))}
      </nav>

      {/* ── Fixed back button ────────────────────────────── */}
      <Link
        href="/case-studies"
        className="fixed z-30 top-8 flex items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-colors hover:bg-white/10"
        style={{
          left: "max(20px, calc(50% - 360px))",
          width: 32,
          height: 32,
        }}
        aria-label="Back to case studies"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M9 2L4 7L9 12"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      {/* ── Main content column ──────────────────────────── */}
      <main className="mx-auto max-w-[600px] px-4 pt-16 sm:pt-20 lg:pt-28 pb-36 flex flex-col gap-16">

        {/* ── HERO ─────────────────────────────────────── */}
        <div className="flex flex-col gap-6">
          {/* Hero card */}
          <div
            className="flex flex-col items-center rounded-2xl gap-1.5 p-1 w-full shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]"
          >
            <div
              className="rounded-xl overflow-hidden self-stretch relative border-[0.5px] border-[#FFFFFF1A]"
              style={{
                backgroundImage:
                  "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                minHeight: 260,
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
                  className="w-[200%] h-[200%] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              )}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(in oklab 180deg, oklab(20.1% 0 0) 0%, oklab(71.8% 0 0 / 0%) 200%)",
                }}
              />
              <div className="relative z-10 p-6 flex flex-col gap-3">
                <div
                  className="text-white"
                  style={{
                    fontFamily: HELVETICA,
                    fontSize: 22,
                    fontWeight: 500,
                    lineHeight: "28px",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Edge CRM — Add Case
                </div>
                <div
                  style={{
                    fontFamily: HELVETICA,
                    fontSize: 14,
                    color: "rgba(255,255,255,0.5)",
                    lineHeight: "20px",
                  }}
                >
                  Redesigning a mobile case-management flow to cut cognitive load for B2B sales teams.
                </div>
              </div>
            </div>
          </div>

          {/* Metadata row */}
          <div
            className="grid grid-cols-3 gap-4"
            style={{ fontFamily: HELVETICA }}
          >
            {[
              { label: "ROLE", value: "Product Designer" },
              { label: "TIMELINE", value: "Jan – Feb 2024" },
              { label: "DELIVERABLES", value: "0 to 1 redesign" },
            ].map((m) => (
              <div key={m.label} className="flex flex-col gap-0.5">
                <span
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.06em",
                    color: "rgba(255,255,255,0.35)",
                    fontWeight: 500,
                  }}
                >
                  {m.label}
                </span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.75)" }}>{m.value}</span>
              </div>
            ))}
          </div>

          {/* Accent callout ribbon */}
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
              style={{ fontFamily: HELVETICA, fontSize: 16, lineHeight: "20px", letterSpacing: "-0.02em" }}
            >
              <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.5)" }}>
                Reps can now log a complex client case under
              </span>
              <span style={{ fontStyle: "italic", fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>
                {" "}2 minutes
              </span>
            </div>
          </div>

          {/* Intro paragraphs */}
          <div
            className="flex flex-col gap-3"
            style={{
              fontFamily: HELVETICA,
              fontSize: 15,
              lineHeight: "22px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.75)",
            }}
          >
            <p>So the PM came and told me that our sales representatives are facing some issues with the app.</p>
            <p>When I reached out to them, they said that it&apos;s taking them way too long to add a case for a particular client.</p>
            <p>I thought, why will it matter for a sales representative to actually do it?</p>
            <p>I learned that it&apos;s one of the main reasons why the sales reps are taking way too long with a particular client and eventually missing their deadlines.</p>
          </div>
        </div>

        <GrungeSeparator />

        {/* ── 1. ABOUT ──────────────────────────────────── */}
        <section id="about" className="flex flex-col gap-8 scroll-mt-24">
          <h2
            style={{
              fontFamily: HELVETICA,
              fontSize: 20,
              lineHeight: "24px",
              fontWeight: 400,
              color: "#fff",
            }}
          >
            About
          </h2>
          <div
            className="flex flex-col gap-3"
            style={{
              fontFamily: HELVETICA,
              fontSize: 16,
              lineHeight: "20px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.7)",
            }}
          >
            <p>Edge CRM is basically a B2B SaaS product, and I was designing the mobile experience.</p>
            <p>It was a tool mostly used by the sales representatives to directly communicate with the client.</p>
          </div>

          {/* 3 square bento cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            <BentoShaderCard
              title="Audit records"
              description="Used to track records of a particular feature or issue."
              imageUrl="https://app.paper.design/file-assets/01M03KW12YSNP0MEZXDDWH0QJZ/01M05MHM5GY8RQ6K3W7DNJ7EMK.jpg"
            />
            <BentoShaderCard
              title="Frequency"
              description="Used by sales reps each and every day."
              imageUrl="https://app.paper.design/file-assets/01M03KW12YSNP0MEZXDDWH0QJZ/01M05PSD8DDRMVX6V0K90RJ3Q3.jpg"
            />
            <BentoShaderCard
              title="Communication"
              description="To directly communicate with the client."
              imageUrl="https://app.paper.design/file-assets/01M03KW12YSNP0MEZXDDWH0QJZ/01M05PST8J25JQRT8JR53JG7M4.jpg"
            />
          </div>
        </section>

        <GrungeSeparator />

        {/* ── 2. THE PROBLEM ────────────────────────────── */}
        <section id="the-problem" className="flex flex-col gap-8 scroll-mt-24">
          <h2
            style={{
              fontFamily: HELVETICA,
              fontSize: 20,
              lineHeight: "24px",
              fontWeight: 400,
              color: "#fff",
            }}
          >
            Discovering the problem statement.
          </h2>

          <div
            className="flex flex-col gap-3"
            style={{
              fontFamily: HELVETICA,
              fontSize: 16,
              lineHeight: "20px",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            <p>I basically got it from my PM that the sales representatives are not able to complete their targets and complete their deadlines.</p>
            <p>So after actually talking with the sales rep, I found out this.</p>
          </div>

          {/* Problem Statement card */}
          <div className="flex flex-col items-center rounded-2xl gap-1.5 p-1 w-full shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
            <div
              className="rounded-xl overflow-hidden self-stretch border-[0.5px] border-[#FFFFFF1A] relative"
              style={{
                backgroundImage:
                  "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
                minHeight: 310,
              }}
            >
              {mounted && (
                <HalftoneDots
                  contrast={0.25}
                  originalColors
                  inverted
                  grid="hex"
                  radius={0.6}
                  size={0.55}
                  scale={1}
                  image="https://app.paper.design/file-assets/01M09SD99TMVY4HEC83XWHCFEP/01M05PVRTNZR3D0P3C0YXYBQWC.jpg"
                  grainMixer={0.8}
                  grainOverlay={0.15}
                  grainSize={0.5}
                  type="gooey"
                  fit="cover"
                  colorFront="#0D0D0D"
                  colorBack="#00000000"
                  className="w-[200%] h-[200%] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              )}
              <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(in oklab 180deg, oklab(20.1% 0 0) 0%, oklab(71.8% 0 0 / 0%) 200%)" }} />
              <div className="relative z-10 p-5 flex flex-col justify-between h-full" style={{ minHeight: 310 }}>
                <div
                  style={{
                    fontFamily: HELVETICA,
                    fontSize: 18,
                    fontWeight: 500,
                    color: "#fff",
                  }}
                >
                  Problem Statement.
                </div>
                <div
                  style={{
                    fontFamily: HELVETICA,
                    fontSize: 14,
                    lineHeight: "20px",
                    color: "rgba(255,255,255,0.65)",
                  }}
                >
                  The sales representatives were facing an issue adding a case for a particular client, and it was taking the most scheduled time for that client.
                </div>
              </div>
            </div>
          </div>
        </section>

        <GrungeSeparator />

        {/* ── 3. HOW MIGHT WE? ──────────────────────────── */}
        <section id="how-might-we" className="flex flex-col gap-8 scroll-mt-24">
          <h2
            style={{
              fontFamily: HELVETICA,
              fontSize: 20,
              lineHeight: "24px",
              fontWeight: 400,
              color: "#fff",
            }}
          >
            How might we?
          </h2>

          <div
            className="flex flex-col gap-3"
            style={{
              fontFamily: HELVETICA,
              fontSize: 16,
              lineHeight: "20px",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            <p>Thus, to actually narrow it down a little bit, I create a &ldquo;how might we&rdquo; statement.</p>
            <p>It basically helps me narrow down the problem statement and stay focused on working on it rather than solving some other issue.</p>
          </div>

          {/* HMW card */}
          <div className="flex flex-col items-center rounded-2xl gap-1.5 p-1 w-full shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
            <div
              className="rounded-xl self-stretch border-[0.5px] border-[#FFFFFF1A] p-5 flex flex-col gap-2"
              style={{
                backgroundImage:
                  "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
              }}
            >
              <div
                style={{
                  fontFamily: HELVETICA,
                  fontSize: 15,
                  fontWeight: 500,
                  color: "#fff",
                  lineHeight: "22px",
                }}
              >
                Which case needs me right now?
              </div>
              <div
                style={{
                  fontFamily: HELVETICA,
                  fontSize: 14,
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: "20px",
                }}
              >
                A single question that redesign had to answer.
              </div>
            </div>
          </div>
        </section>

        <GrungeSeparator />

        {/* ── 4. BEFORE & AFTER ─────────────────────────── */}
        <section id="before-after" className="flex flex-col gap-8 scroll-mt-24">
          {/* Section header */}
          <div className="flex items-center gap-3 w-full">
            <h2
              style={{
                fontFamily: HELVETICA,
                fontSize: 20,
                lineHeight: "24px",
                fontWeight: 500,
                color: "#fff",
              }}
            >
              Before &amp; After
            </h2>
            <span
              style={{
                fontFamily: HELVETICA,
                fontSize: 12,
                color: "rgba(255,255,255,0.4)",
              }}
            >
              Tracing the Transformation
            </span>
          </div>

          <p
            style={{
              fontFamily: HELVETICA,
              fontSize: 16,
              lineHeight: "20px",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            Comparing the legacy 1-page form against the stepped, validated 3-stage interface.
          </p>

          {/* ── Main Before/After card ── */}
          <div className="flex flex-col items-center rounded-2xl gap-1.5 p-1 w-full shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F]">
            <div
              className="rounded-xl overflow-hidden self-stretch border-[0.5px] border-[#FFFFFF1A] flex flex-col"
              style={{
                backgroundImage:
                  "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
              }}
            >
              {/* Legend bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                <span
                  className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-[10px] backdrop-blur-md"
                  style={{ fontFamily: FIRA_CODE, color: "#fff" }}
                >
                  <span className="size-1.5 rounded-full bg-[#B81919]" />
                  BEFORE — Unstructured Scroll
                </span>
                <span
                  className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-[10px] backdrop-blur-md"
                  style={{ fontFamily: FIRA_CODE, color: "#fff" }}
                >
                  <span className="size-1.5 rounded-full bg-[#10B981]" />
                  AFTER — 3-Step Validated Flow
                </span>
              </div>

              {/* 3-column annotated layout */}
              <div className="grid grid-cols-[1fr_1.5fr_1fr] gap-3 p-4 sm:p-6 items-start">

                {/* LEFT: Before phone */}
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="w-full max-w-[130px] rounded-[22px] border border-white/15 overflow-hidden bg-[#f5f5f5] flex flex-col"
                    style={{ height: 320 }}
                  >
                    {/* Phone header */}
                    <div className="bg-white px-3 py-2 flex items-center justify-between border-b border-gray-100">
                      <span className="text-[10px] font-semibold text-gray-900" style={{ fontFamily: HELVETICA }}>Add Case</span>
                      <span className="text-[9px] text-gray-400" style={{ fontFamily: HELVETICA }}>Cancel</span>
                    </div>
                    {/* All fields flat scroll */}
                    {["CASE TITLE *", "CASE TYPE *", "CLIENT *", "PRIORITY *", "ASSIGN TO *", "DESCRIPTION", "DUE DATE *", "DEPARTMENT *"].map((f) => (
                      <div key={f} className="bg-white border-b border-gray-100 px-3 py-2">
                        <span className="text-[7.5px] text-gray-400 block" style={{ fontFamily: HELVETICA }}>{f}</span>
                        <div className="h-3 bg-gray-100 rounded mt-1" />
                      </div>
                    ))}
                  </div>
                  <span className="text-[9px] text-white/50 uppercase" style={{ fontFamily: FIRA_CODE }}>Before</span>
                </div>

                {/* CENTER: Annotation cards */}
                <div className="flex flex-col gap-2 pt-1">
                  {[
                    {
                      n: "CHANGE 01",
                      title: "Stepped flow + progress bar",
                      desc: "One long scroll replaced by clear 3-step sections with progress tracking.",
                    },
                    {
                      n: "CHANGE 02",
                      title: "Notification banner",
                      desc: "Proactive alerts flag missing required fields before submission.",
                    },
                    {
                      n: "CHANGE 03",
                      title: "Grouped, pre-filled fields",
                      desc: "Known CRM values pre-filled with green verification checkmarks.",
                    },
                    {
                      n: "CHANGE 04",
                      title: "Full-width sticky CTA",
                      desc: "Prominent primary action button always within thumb reach.",
                    },
                  ].map((c) => (
                    <div
                      key={c.n}
                      className="flex flex-col gap-1 rounded-lg border border-white/10 bg-black/60 p-2.5 backdrop-blur-md"
                    >
                      <span
                        className="text-[9px] text-white/40 uppercase tracking-wider"
                        style={{ fontFamily: FIRA_CODE }}
                      >
                        {c.n}
                      </span>
                      <div
                        className="text-white text-[11px] font-semibold"
                        style={{ fontFamily: HELVETICA }}
                      >
                        {c.title}
                      </div>
                      <div
                        className="text-[10px] text-neutral-400 leading-tight"
                        style={{ fontFamily: HELVETICA }}
                      >
                        {c.desc}
                      </div>
                    </div>
                  ))}
                </div>

                {/* RIGHT: After phone */}
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="w-full max-w-[130px] rounded-[22px] border border-white/15 overflow-hidden bg-white flex flex-col"
                    style={{ height: 320 }}
                  >
                    {/* Header */}
                    <div className="bg-white px-3 py-2 flex flex-col gap-1.5 border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold text-gray-900" style={{ fontFamily: HELVETICA }}>Add Case</span>
                        <span className="text-[9px] text-blue-500" style={{ fontFamily: HELVETICA }}>Save</span>
                      </div>
                      {/* Step progress */}
                      <div className="flex gap-1">
                        <div className="h-1 flex-1 rounded-full bg-blue-500" />
                        <div className="h-1 flex-1 rounded-full bg-gray-200" />
                        <div className="h-1 flex-1 rounded-full bg-gray-200" />
                      </div>
                      <span className="text-[7.5px] text-blue-500" style={{ fontFamily: HELVETICA }}>Step 1 of 3 — Overview</span>
                    </div>
                    {/* Alert banner */}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border-b border-amber-200">
                      <span className="text-[7.5px] text-amber-700" style={{ fontFamily: HELVETICA }}>2 required fields missing</span>
                    </div>
                    {/* Grouped fields */}
                    <div className="flex flex-col gap-1 p-2 flex-1">
                      {[
                        { label: "CASE TITLE", value: "Client escalation", verified: false },
                        { label: "CASE TYPE", value: "Support", verified: true },
                        { label: "PRIORITY", value: "High", verified: false },
                      ].map((f) => (
                        <div
                          key={f.label}
                          className="border border-gray-200 rounded-lg px-2 py-1.5 flex items-center justify-between bg-white"
                        >
                          <div>
                            <span className="text-[7px] text-gray-400 block" style={{ fontFamily: HELVETICA }}>{f.label}</span>
                            <span className="text-[9px] text-gray-900" style={{ fontFamily: HELVETICA }}>{f.value}</span>
                          </div>
                          {f.verified && (
                            <div className="size-2 rounded-full bg-emerald-500" />
                          )}
                        </div>
                      ))}
                    </div>
                    {/* CTA */}
                    <div className="mx-2 mb-2 bg-blue-500 rounded-lg py-2 flex items-center justify-center">
                      <span className="text-[9px] font-semibold text-white" style={{ fontFamily: HELVETICA }}>Next → Type</span>
                    </div>
                  </div>
                  <span className="text-[9px] text-emerald-400/80 uppercase" style={{ fontFamily: FIRA_CODE }}>After</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── 3 Transformation bento cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            <BentoShaderCard
              title="Stepped Flow"
              description="Converted 1 endless scroll into 3 logical steps."
              imageUrl="https://app.paper.design/file-assets/01M03KW12YSNP0MEZXDDWH0QJZ/01M05MHM5GY8RQ6K3W7DNJ7EMK.jpg"
            />
            <BentoShaderCard
              title="Field Differentiation"
              description="Bordered card inputs with explicit chevrons."
              imageUrl="https://app.paper.design/file-assets/01M03KW12YSNP0MEZXDDWH0QJZ/01M05PSD8DDRMVX6V0K90RJ3Q3.jpg"
            />
            <BentoShaderCard
              title="Inline Validation"
              description="Top warning banner + actionable inline fix cues."
              imageUrl="https://app.paper.design/file-assets/01M03KW12YSNP0MEZXDDWH0QJZ/01M05PST8J25JQRT8JR53JG7M4.jpg"
            />
          </div>
        </section>

        <GrungeSeparator />

        {/* ── 5. UI MOCKUPS & PLAYGROUND ─────────────────── */}
        <section id="ui-mockups" className="flex flex-col gap-8 scroll-mt-24">
          <h2
            style={{
              fontFamily: HELVETICA,
              fontSize: 20,
              lineHeight: "24px",
              fontWeight: 400,
              color: "#fff",
            }}
          >
            UI Mockups
          </h2>

          {/* Playground launcher card */}
          <div
            className="flex flex-col items-center rounded-2xl gap-1.5 p-1 w-full shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)] bg-[#242424] border-[0.5px] border-[#FFFFFF0F] cursor-pointer group"
            onClick={() => setIsPlaygroundOpen(true)}
          >
            <div
              className="rounded-xl self-stretch border-[0.5px] border-[#FFFFFF1A] relative overflow-hidden flex flex-col items-center justify-center gap-4 py-12"
              style={{
                backgroundImage:
                  "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
              }}
            >
              {mounted && (
                <HalftoneDots
                  contrast={0.3}
                  originalColors
                  inverted
                  grid="hex"
                  radius={0.6}
                  size={0.55}
                  scale={1}
                  image="https://app.paper.design/file-assets/01M03KW12YSNP0MEZXDDWH0QJZ/01M05MHM5GY8RQ6K3W7DNJ7EMK.jpg"
                  grainMixer={0.7}
                  grainOverlay={0.15}
                  grainSize={0.5}
                  type="gooey"
                  fit="cover"
                  colorFront="#0D0D0D"
                  colorBack="#00000000"
                  className="w-[200%] h-[200%] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              )}
              <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(in oklab 180deg, oklab(20.1% 0 0) 0%, oklab(71.8% 0 0 / 0%) 200%)" }} />
              <div className="relative z-10 flex flex-col items-center gap-3">
                <p
                  className="text-center"
                  style={{
                    fontFamily: HELVETICA,
                    fontSize: 15,
                    color: "rgba(255,255,255,0.6)",
                    lineHeight: "22px",
                    maxWidth: 340,
                  }}
                >
                  Explore the full redesigned Add Case flow in the interactive canvas.
                </p>
                <button
                  className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm text-white backdrop-blur-md transition-colors group-hover:bg-white/20"
                  style={{ fontFamily: HELVETICA }}
                >
                  Open Playground
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Infinite Canvas Playground Modal ─────────────── */}
      <AnimatePresence>
        {isPlaygroundOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col"
            style={{ background: "oklch(9% 0 0)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Modal top bar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="size-2.5 rounded-full bg-[#B81919]" />
                <span
                  style={{
                    fontFamily: FIRA_CODE,
                    fontSize: 12,
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  Edge CRM — Add Case · UI Mockups
                </span>
              </div>
              <button
                onClick={() => setIsPlaygroundOpen(false)}
                className="flex items-center gap-1.5 text-white/50 hover:text-white transition-colors text-xs"
                style={{ fontFamily: FIRA_CODE }}
              >
                Esc to close
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Canvas area */}
            <div
              className="flex-1 overflow-hidden relative"
              ref={mockupScrollRef}
              style={{ cursor: isDraggingCanvas ? "grabbing" : "grab" }}
              onMouseDown={handleCanvasMouseDown}
              onMouseMove={handleCanvasMouseMove}
              onMouseUp={handleCanvasMouseUp}
              onMouseLeave={handleCanvasMouseUp}
              onWheel={handleCanvasWheel}
            >
              <div
                className="absolute"
                style={{
                  transform: `translate(calc(-50% + ${canvasPan.x}px), calc(-50% + ${canvasPan.y}px)) scale(${canvasZoom})`,
                  left: "50%",
                  top: "50%",
                  transformOrigin: "center center",
                }}
              >
                <div className="flex gap-8 items-start p-8">
                  {/* Placeholder mockup cards */}
                  {["Step 1 — Overview", "Step 2 — Type", "Step 3 — Assign"].map((label, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center gap-3"
                    >
                      <div
                        className="rounded-[32px] border border-white/15 overflow-hidden bg-white flex flex-col"
                        style={{ width: 240, height: 480 }}
                      >
                        <div className="bg-white px-4 py-3 border-b border-gray-100 flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-gray-900" style={{ fontFamily: HELVETICA }}>Add Case</span>
                            <span className="text-xs text-blue-500" style={{ fontFamily: HELVETICA }}>{i === 2 ? "Save" : "Next"}</span>
                          </div>
                          <div className="flex gap-1">
                            {[0, 1, 2].map((j) => (
                              <div
                                key={j}
                                className="h-1 flex-1 rounded-full"
                                style={{ background: j <= i ? "#3B82F6" : "#E5E7EB" }}
                              />
                            ))}
                          </div>
                          <span className="text-[10px] text-blue-500" style={{ fontFamily: HELVETICA }}>{label}</span>
                        </div>
                        <div className="flex flex-col gap-2 p-3 flex-1">
                          {Array.from({ length: i === 0 ? 3 : i === 1 ? 4 : 3 }).map((_, k) => (
                            <div key={k} className="border border-gray-200 rounded-xl px-3 py-2.5">
                              <div className="h-2 w-16 bg-gray-200 rounded mb-1.5" />
                              <div className="h-3 w-24 bg-gray-100 rounded" />
                            </div>
                          ))}
                        </div>
                        {i < 2 && (
                          <div className="mx-3 mb-3 bg-blue-500 rounded-xl py-3 flex items-center justify-center">
                            <span className="text-sm font-semibold text-white" style={{ fontFamily: HELVETICA }}>
                              Next →
                            </span>
                          </div>
                        )}
                        {i === 2 && (
                          <div className="mx-3 mb-3 bg-blue-500 rounded-xl py-3 flex items-center justify-center">
                            <span className="text-sm font-semibold text-white" style={{ fontFamily: HELVETICA }}>
                              Submit Case
                            </span>
                          </div>
                        )}
                      </div>
                      <span
                        className="text-xs text-white/40"
                        style={{ fontFamily: FIRA_CODE }}
                      >
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating zoom controls */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full border border-white/15 bg-black/70 px-4 py-2 backdrop-blur-md">
              <button
                className="text-white/60 hover:text-white text-sm transition-colors"
                onClick={() => setCanvasZoom((z) => Math.max(0.35, z - 0.15))}
                style={{ fontFamily: FIRA_CODE }}
              >
                −
              </button>
              <span className="text-white/50 text-xs w-10 text-center" style={{ fontFamily: FIRA_CODE }}>
                {Math.round(canvasZoom * 100)}%
              </span>
              <button
                className="text-white/60 hover:text-white text-sm transition-colors"
                onClick={() => setCanvasZoom((z) => Math.min(2.5, z + 0.15))}
                style={{ fontFamily: FIRA_CODE }}
              >
                +
              </button>
              <div className="w-px h-4 bg-white/15 mx-1" />
              <button
                className="text-white/50 text-xs hover:text-white transition-colors"
                onClick={() => { setCanvasZoom(0.75); setCanvasPan({ x: 0, y: 0 }); }}
                style={{ fontFamily: FIRA_CODE }}
              >
                Reset
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
