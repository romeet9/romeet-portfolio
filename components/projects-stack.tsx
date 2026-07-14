"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ArrowUpRightIcon, XIcon } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import type { Project } from "@/content/projects";
import { projects } from "@/content/projects";
import { cn } from "@/lib/utils";

/**
 * The four projects as a fanned deck of watch-face tiles — click and they spring
 * out of the stack into a centred cluster over a frosted backdrop, the way the
 * Watch face picker and Control Center behave.
 *
 * The morph is a shared-element transition: each tile carries the same
 * `layoutId` in both states, so motion interpolates the real geometry between
 * them. Only one of the two states is mounted at a time — render both and the
 * layoutId is ambiguous and the animation breaks.
 */

// Fanned deck: rotation and offset per tile, back to front. The tiles are 84px
// wide and sit 72px apart, so each one overlaps its neighbour by a sliver — a
// stack, not a row — while every name still clears the card in front of it.
const FAN = [
  { x: -105, y: 10, rotate: -9, z: 10 },
  { x: -35, y: -4, rotate: -3, z: 20 },
  { x: 35, y: -4, rotate: 3, z: 30 },
  { x: 105, y: 10, rotate: 9, z: 40 },
];

const SPRING = {
  type: "spring",
  stiffness: 420,
  damping: 34,
  mass: 0.9,
} as const;

/**
 * Film grain. The mesh is pure CSS, so without it the gradients band visibly on
 * the deep stops; the turbulence breaks the ramps into noise the way the mockup
 * does. Inline SVG rather than an asset — it's smaller than the request that
 * would fetch it.
 */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")";

/**
 * A portrait tile in the shape of a watch face, carrying a mesh gradient mixed
 * from the project's own icon colours: a deep ground, a bright bloom, and a
 * contrasting warm hue so it never flattens into a duotone.
 *
 * The bloom is anchored to the *right* of centre and the deep stop is pulled
 * into the bottom-left, because that's the corner both labels sit in — the type
 * always lands on the darkest part of the mesh, so white stays legible no matter
 * how poppy the palette gets.
 *
 * Every size is a percentage of the tile and the type is in `em`, so one
 * component serves both the small deck and the large cluster off a single
 * font-size.
 */
function ProjectTile({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const { deep, base, bloom, warm } = project.mesh;

  const mesh = [
    `radial-gradient(75% 60% at 72% 78%, ${bloom} 0%, transparent 62%)`,
    `radial-gradient(65% 50% at 78% 14%, ${warm} 0%, transparent 60%)`,
    `radial-gradient(90% 75% at 22% 30%, ${base} 0%, transparent 70%)`,
    `radial-gradient(120% 110% at 8% 100%, ${deep} 10%, transparent 75%)`,
    `linear-gradient(155deg, ${base} 0%, ${deep} 100%)`,
  ].join(", ");

  return (
    <div
      className={cn(
        "relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-[14%] p-[9%] shadow-[0_14px_30px_-8px_rgba(0,0,0,0.4)]",
        className,
      )}
      style={{ backgroundColor: base, backgroundImage: mesh }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay"
        style={{ backgroundImage: GRAIN }}
      />

      {/* A short scrim under the type. The mesh is bright by design; this is what
          buys the last of the contrast without dulling the gradient above it. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/30 to-transparent"
      />

      <span className="relative truncate text-[0.55em] font-medium tracking-tight text-white/70">
        {project.name}
      </span>

      <span className="relative text-[1.05em] leading-none font-medium tracking-tight text-white">
        {project.category}
      </span>
    </div>
  );
}

export function ProjectsStack() {
  const [open, setOpen] = React.useState(false);
  const [focused, setFocused] = React.useState<string | null>(null);
  const [mounted, setMounted] = React.useState(false);
  const reduced = useReducedMotion();

  const spring = reduced ? { duration: 0 } : SPRING;

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    // The page behind is frozen while the cluster is up.
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [open]);

  const active = projects.find((p) => p.slug === focused) ?? null;

  return (
    <>
      {/* ── Idle: the deck ───────────────────────────────────────────────── */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-label="Expand projects"
        className="group/deck flex flex-1 cursor-pointer flex-col items-center justify-center gap-6 rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        {/* Only ONE element may carry a given layoutId at a time. Leaving the
            deck mounted (just faded) while the cluster renders makes the id
            ambiguous and motion animates to the wrong geometry — so the deck
            unmounts entirely while expanded. */}
        <div className="relative flex h-40 w-full items-center justify-center">
          {!open &&
            projects.slice(0, 4).map((p, i) => {
              const fan = FAN[i] ?? FAN[0];
              return (
                <motion.div
                  key={p.slug}
                  layoutId={`project-icon-${p.slug}`}
                  transition={spring}
                  style={{
                    zIndex: fan.z,
                    x: fan.x,
                    y: fan.y,
                    rotate: fan.rotate,
                  }}
                  whileHover={
                    reduced ? undefined : { scale: 1.07, y: fan.y - 10 }
                  }
                  className="absolute"
                >
                  <ProjectTile project={p} className="w-[96px] text-[16px]" />
                </motion.div>
              );
            })}
        </div>

        <span className="text-xs text-muted-foreground transition-colors group-hover/deck:text-foreground">
          {projects.length} projects · tap to expand
        </span>
      </button>

      {/* ── Expanded: the cluster ─────────────────────────────────────────
          Portalled to <body>. The page-transition wrapper finishes on
          `filter: blur(0)`, and any filter other than `none` makes an element
          the containing block for its fixed descendants — so an overlay
          rendered in place would centre itself inside that wrapper, not the
          viewport. */}
      {mounted &&
        createPortal(
          <>
            {/* Backdrop and chrome live in AnimatePresence so they can fade out.
                The CLUSTER cannot: an exiting element keeps its layoutId alive,
                so while it faded the deck would remount with the same id and the
                two would fight — which is why the collapse used to snap. The
                cluster mounts and unmounts in one frame instead, and motion
                springs the icons between the two positions in both directions. */}
            <AnimatePresence>
              {open && (
                <motion.div
                  key="chrome"
                  className="fixed inset-0 z-60"
                  initial="hidden"
                  animate="shown"
                  exit="hidden"
                >
                  <motion.div
                    onClick={() => setOpen(false)}
                    variants={{
                      hidden: { opacity: 0, backdropFilter: "blur(0px)" },
                      shown: { opacity: 1, backdropFilter: "blur(24px)" },
                    }}
                    transition={{
                      duration: reduced ? 0 : 0.35,
                      ease: "easeOut",
                    }}
                    className="absolute inset-0 bg-background/60"
                  />

                  <motion.button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                    variants={{ hidden: { opacity: 0 }, shown: { opacity: 1 } }}
                    transition={{ duration: reduced ? 0 : 0.25 }}
                    className="absolute top-6 right-6 flex size-10 items-center justify-center rounded-full border bg-background/70 text-muted-foreground backdrop-blur-md transition-colors hover:text-foreground"
                  >
                    <XIcon className="size-4" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {open && (
              <div className="pointer-events-none fixed inset-0 z-60 flex items-center justify-center p-6">
                <div
                  className="pointer-events-auto relative grid grid-cols-2 gap-x-10 gap-y-12 sm:grid-cols-4 sm:gap-x-14"
                  onMouseLeave={() => setFocused(null)}
                >
                  {projects.slice(0, 4).map((p, i) => (
                    <motion.div
                      key={p.slug}
                      layoutId={`project-icon-${p.slug}`}
                      transition={{
                        ...spring,
                        delay: reduced ? 0 : i * 0.045,
                      }}
                      className="flex flex-col items-center gap-3"
                      onMouseEnter={() => setFocused(p.slug)}
                      onFocus={() => setFocused(p.slug)}
                    >
                      <Link
                        href={`/projects/${p.slug}`}
                        aria-label={p.name}
                        className="flex flex-col items-center rounded-[24px] outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                      >
                        <motion.div
                          whileHover={
                            reduced ? undefined : { scale: 1.06, y: -6 }
                          }
                          whileTap={reduced ? undefined : { scale: 0.97 }}
                          transition={SPRING}
                        >
                          <ProjectTile
                            project={p}
                            className="w-[136px] text-[22px] sm:w-[168px] sm:text-[26px]"
                          />
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Detail for the focused icon — the only text in the view, so the
                cluster stays icon-first until you point at something. */}
                <div className="pointer-events-none absolute inset-x-6 bottom-10 flex justify-center">
                  <AnimatePresence mode="wait">
                    {active && (
                      <motion.div
                        key={active.slug}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{
                          duration: reduced ? 0 : 0.18,
                          ease: "easeOut",
                        }}
                        className="pointer-events-auto flex max-w-md flex-col items-center gap-2 text-center"
                      >
                        <p className="text-sm text-muted-foreground">
                          {active.tagline}
                        </p>
                        <Link
                          href={`/projects/${active.slug}`}
                          className="inline-flex items-center gap-1 text-sm font-medium hover:underline"
                        >
                          View project
                          <ArrowUpRightIcon className="size-3.5" />
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </>,
          document.body,
        )}
    </>
  );
}
