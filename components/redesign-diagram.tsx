"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import type { RedesignData, RedesignMarker } from "@/content/case-studies";
import { AnnotationCard } from "@/components/annotation-card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const LINE = "rgba(255,255,255,0.3)"; // connector line (monochrome)
const DOT = "rgba(255,255,255,0.55)"; // connector endpoint dot

/** The shadcn dashboard-01 "top card" wash: subtle gradient + soft shadow. */
const CARD_3D =
  "*:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card";

/** A before/after phone screenshot. The marker divs are invisible anchors —
 * they stay positioned so the connector lines have something to attach to, but
 * no box is drawn on the mockup itself. */
function Phone({
  src,
  alt,
  w,
  h,
  markers,
  small,
  framed,
  phoneRef,
  markerRefs,
  onImgLoad,
}: {
  src: string;
  alt: string;
  w: number;
  h: number;
  markers: RedesignMarker[];
  small?: boolean;
  /** Image is already a device mockup — skip the ring/clip so it isn't double-framed. */
  framed?: boolean;
  phoneRef?: React.Ref<HTMLDivElement>;
  markerRefs?: React.MutableRefObject<(HTMLDivElement | null)[]>;
  onImgLoad?: () => void;
}) {
  return (
    <div
      ref={phoneRef}
      className={cn(
        "relative mx-auto",
        !framed && "overflow-hidden rounded-[1.3rem] ring-1 ring-white/12",
        small ? "w-[128px]" : "w-full max-w-[240px]",
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={w}
        height={h}
        sizes="(min-width: 768px) 260px, 150px"
        quality={95}
        className="h-auto w-full select-none"
        onLoad={onImgLoad}
      />
      {markers.map((m, i) => (
        <div
          key={i}
          ref={(el) => {
            if (markerRefs) markerRefs.current[i] = el;
          }}
          className="absolute"
          style={{
            top: `${m.top}%`,
            left: `${m.left}%`,
            width: `${m.width}%`,
            height: `${m.height}%`,
          }}
        />
      ))}
    </div>
  );
}

/** The before → reason → after connector diagram, reused by the Re-designing
 * and Solutions acts. `cardLabel` sets the annotation prefix ("Change" / "Fix");
 * `drawBeforeMarkers` = false when the before screenshot is pre-annotated. */
export function RedesignDiagram({
  before,
  after,
  changes,
  cardLabel = "Change",
  framed = false,
}: RedesignData) {
  const gridRef = useRef<HTMLDivElement>(null);
  const beforePhoneRef = useRef<HTMLDivElement>(null);
  const afterPhoneRef = useRef<HTMLDivElement>(null);
  const beforeMarkerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const afterMarkerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [paths, setPaths] = useState<{ red: string[]; green: string[] }>({
    red: [],
    green: [],
  });
  const [dots, setDots] = useState<{ x: number; y: number; tone: string }[]>([]);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  const measure = useCallback(() => {
    const grid = gridRef.current;
    const bp = beforePhoneRef.current;
    const ap = afterPhoneRef.current;
    if (!grid || !bp || !ap) return;
    const g = grid.getBoundingClientRect();
    const bpr = bp.getBoundingClientRect();
    const apr = ap.getBoundingClientRect();

    const red: string[] = [];
    const green: string[] = [];
    const nextDots: { x: number; y: number; tone: string }[] = [];

    changes.forEach((_, i) => {
      const card = cardRefs.current[i]?.getBoundingClientRect();
      const bm = beforeMarkerRefs.current[i]?.getBoundingClientRect();
      const am = afterMarkerRefs.current[i]?.getBoundingClientRect();
      if (!card) return;

      const cardLeftX = card.left - g.left;
      const cardRightX = card.right - g.left;
      const cardY = card.top - g.top + card.height / 2;

      // before-marker → reason card
      if (bm) {
        const ax = bpr.right - g.left;
        const ay = bm.top - g.top + bm.height / 2;
        const midX = (ax + cardLeftX) / 2;
        red.push(`M ${ax} ${ay} L ${midX} ${ay} L ${midX} ${cardY} L ${cardLeftX} ${cardY}`);
        nextDots.push({ x: ax, y: ay, tone: DOT });
        nextDots.push({ x: cardLeftX, y: cardY, tone: DOT });
      }
      // reason card → after-marker
      if (am) {
        const dx = apr.left - g.left;
        const dy = am.top - g.top + am.height / 2;
        const midX = (cardRightX + dx) / 2;
        green.push(`M ${cardRightX} ${cardY} L ${midX} ${cardY} L ${midX} ${dy} L ${dx} ${dy}`);
        nextDots.push({ x: cardRightX, y: cardY, tone: DOT });
        nextDots.push({ x: dx, y: dy, tone: DOT });
      }
    });

    setPaths({ red, green });
    setDots(nextDots);
    setDims({ w: g.width, h: g.height });
  }, [changes]);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(() => measure());
    if (gridRef.current) ro.observe(gridRef.current);
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 400); // after fonts/images settle
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

      {/* legend */}
      <div className="relative mb-6 flex flex-wrap items-center gap-2">
        <Badge variant="outline" className="border-white/20 text-white/60">
          Before — the problem
        </Badge>
        <Badge variant="outline" className="border-white/20 text-white/60">
          After — what it became
        </Badge>
      </div>

      {/* ── Desktop diagram (md+) ─────────────────────────────────── */}
      <div
        ref={gridRef}
        className="relative hidden md:grid md:grid-cols-[minmax(0,240px)_minmax(0,1fr)_minmax(0,240px)] md:items-center md:gap-6 lg:gap-10"
      >
        {/* connector overlay (behind cards, only in the gutters) */}
        <svg
          className="pointer-events-none absolute inset-0 z-0"
          width={dims.w}
          height={dims.h}
          style={{ overflow: "visible" }}
          aria-hidden
        >
          {paths.red.map((d, i) => (
            <path key={`r${i}`} d={d} fill="none" stroke={LINE} strokeWidth={1.5} strokeLinejoin="round" />
          ))}
          {paths.green.map((d, i) => (
            <path key={`g${i}`} d={d} fill="none" stroke={LINE} strokeWidth={1.5} strokeLinejoin="round" strokeDasharray="4 3" />
          ))}
          {dots.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={2.5} fill={p.tone} fillOpacity={0.9} />
          ))}
        </svg>

        <div className="relative z-10">
          <Phone
            {...before}
            markers={changes.map((c) => c.before)}
            framed={framed}
            phoneRef={beforePhoneRef}
            markerRefs={beforeMarkerRefs}
            onImgLoad={measure}
          />
        </div>

        <div className={cn("relative z-10 flex flex-col gap-4", CARD_3D)}>
          {changes.map((c, i) => (
            <AnnotationCard
              key={i}
              label={cardLabel}
              index={i}
              title={c.title}
              desc={c.reason}
              cardRef={(el) => {
                cardRefs.current[i] = el;
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          <Phone
            {...after}
            markers={changes.map((c) => c.after)}
            framed={framed}
            phoneRef={afterPhoneRef}
            markerRefs={afterMarkerRefs}
            onImgLoad={measure}
          />
        </div>
      </div>

      {/* ── Mobile (phones side by side, reason list below) ───────── */}
      <div className="relative flex flex-col gap-6 md:hidden">
        <div className="flex items-start justify-center gap-5">
          <div className="flex flex-col items-center gap-2">
            <Phone {...before} markers={changes.map((c) => c.before)} framed={framed} small />
            <Badge variant="outline" className="border-white/20 text-white/60">
              Before
            </Badge>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Phone {...after} markers={changes.map((c) => c.after)} framed={framed} small />
            <Badge variant="outline" className="border-white/20 text-white/60">
              After
            </Badge>
          </div>
        </div>
        <div className={cn("flex flex-col gap-3", CARD_3D)}>
          {changes.map((c, i) => (
            <AnnotationCard key={i} label={cardLabel} index={i} title={c.title} desc={c.reason} />
          ))}
        </div>
      </div>
    </div>
  );
}
