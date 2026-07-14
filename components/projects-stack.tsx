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
 * A portrait tile in the shape of a watch face: the project's name small at the
 * top, its category large at the bottom, on the same neutral card surface the
 * rest of the dashboard uses — `bg-card` on a hairline ring, no colour of its
 * own.
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
  return (
    <div
      className={cn(
        // Neutral shadcn surface: `bg-muted` rather than `bg-card`, so the tiles
        // still separate from the Projects card they sit on — which is itself
        // `bg-card`, and would swallow them.
        "relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-[var(--tile-radius)] bg-muted p-[var(--tile-padding)] ring-1 ring-foreground/10 shadow-[0_14px_30px_-10px_rgba(0,0,0,0.22)] dark:shadow-[0_14px_30px_-8px_rgba(0,0,0,0.5)]",
        className,
      )}
    >
      <span className="truncate text-[0.55em] font-medium tracking-tight text-muted-foreground">
        {project.name}
      </span>

      <span className="text-[1.05em] leading-none font-medium tracking-tight text-foreground">
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
