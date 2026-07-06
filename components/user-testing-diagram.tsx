"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import type { UserTestingData } from "@/content/case-studies";
import { AnnotationCard } from "@/components/annotation-card";
import { cn } from "@/lib/utils";

const LINE = "rgba(255,255,255,0.3)"; // connector line (monochrome)
const DOT = "rgba(255,255,255,0.55)"; // connector endpoint dot

/** The shadcn dashboard-01 "top card" wash, so each annotation Card matches
 * the KPI cards used elsewhere in the case study. */
const CARD_3D =
  "*:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card";

/** The "User Testing" diagram: finding cards (left) linked by connector lines
 * to the flagged spots on the tested mockup (right). Stacks on mobile. */
export function UserTestingDiagram({ phone, findings }: UserTestingData) {
  const gridRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [paths, setPaths] = useState<string[]>([]);
  const [dots, setDots] = useState<{ x: number; y: number }[]>([]);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  const measure = useCallback(() => {
    const grid = gridRef.current;
    const ph = phoneRef.current;
    if (!grid || !ph) return;
    const g = grid.getBoundingClientRect();
    const p = ph.getBoundingClientRect();
    const nextPaths: string[] = [];
    const nextDots: { x: number; y: number }[] = [];
    findings.forEach((f, i) => {
      if (f.markerY == null) return;
      const card = cardRefs.current[i]?.getBoundingClientRect();
      if (!card) return;
      const cardRightX = card.right - g.left;
      const cardY = card.top - g.top + card.height / 2;
      const phoneLeftX = p.left - g.left;
      const targetY = p.top - g.top + (f.markerY / 100) * p.height;
      const midX = (cardRightX + phoneLeftX) / 2;
      nextPaths.push(
        `M ${cardRightX} ${cardY} L ${midX} ${cardY} L ${midX} ${targetY} L ${phoneLeftX} ${targetY}`,
      );
      nextDots.push({ x: cardRightX, y: cardY });
      nextDots.push({ x: phoneLeftX, y: targetY });
    });
    setPaths(nextPaths);
    setDots(nextDots);
    setDims({ w: g.width, h: g.height });
  }, [findings]);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(() => measure());
    if (gridRef.current) ro.observe(gridRef.current);
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 400);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, [measure]);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#0c0c0e] p-6 ring-1 ring-white/[0.07] sm:p-8">
      {/* backdrop */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-48"
        style={{
          background:
            "radial-gradient(ellipse 70% 100% at 50% 0%, rgba(255,255,255,0.05), transparent 70%)",
        }}
      />

      {/* ── Desktop (md+) ─────────────────────────────────────────── */}
      <div
        ref={gridRef}
        className={cn(
          "relative hidden md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,230px)] md:items-center md:gap-10",
          CARD_3D,
        )}
      >
        {/* connector overlay */}
        <svg
          className="pointer-events-none absolute inset-0 z-0"
          width={dims.w}
          height={dims.h}
          style={{ overflow: "visible" }}
          aria-hidden
        >
          {paths.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="none"
              stroke={LINE}
              strokeWidth={1.5}
              strokeLinejoin="round"
              strokeDasharray="4 3"
            />
          ))}
          {dots.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={2.5} fill={DOT} fillOpacity={0.9} />
          ))}
        </svg>

        {/* finding cards */}
        <div className="relative z-10 flex flex-col gap-4">
          {findings.map((f, i) => (
            <AnnotationCard
              key={i}
              label="Finding"
              index={i}
              title={f.title}
              desc={f.desc}
              cardRef={(el) => {
                cardRefs.current[i] = el;
              }}
            />
          ))}
        </div>

        {/* tested mockup */}
        <div ref={phoneRef} className="relative z-10 mx-auto w-full max-w-[230px]">
          <Image
            src={phone.src}
            alt={phone.alt}
            width={phone.w}
            height={phone.h}
            sizes="230px"
            quality={95}
            className="h-auto w-full select-none"
          />
        </div>
      </div>

      {/* ── Mobile (mockup over stacked cards) ────────────────────── */}
      <div className="relative flex flex-col gap-6 md:hidden">
        <div className="mx-auto w-full max-w-[210px]">
          <Image
            src={phone.src}
            alt={phone.alt}
            width={phone.w}
            height={phone.h}
            sizes="210px"
            quality={95}
            className="h-auto w-full select-none"
          />
        </div>
        <div className={cn("flex flex-col gap-3", CARD_3D)}>
          {findings.map((f, i) => (
            <AnnotationCard key={i} label="Finding" index={i} title={f.title} desc={f.desc} />
          ))}
        </div>
      </div>
    </div>
  );
}
