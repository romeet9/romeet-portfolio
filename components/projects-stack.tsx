"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon, XIcon } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { projects } from "@/content/projects";
import { cn } from "@/lib/utils";

/**
 * The four projects as a fanned deck of app icons — click and they spring out
 * of the stack into a centred cluster over a frosted backdrop, the way the
 * Watch face picker and Control Center behave.
 *
 * The morph is a shared-element transition: each icon carries the same
 * `layoutId` in both states, so motion interpolates the real geometry between
 * them. Only one of the two states is mounted at a time — render both and the
 * layoutId is ambiguous and the animation breaks.
 */

// Fanned deck: rotation and offset per icon, back to front.
const FAN = [
  { x: -96, y: 10, rotate: -12, z: 10 },
  { x: -32, y: -4, rotate: -4, z: 20 },
  { x: 32, y: -4, rotate: 4, z: 30 },
  { x: 96, y: 10, rotate: 12, z: 40 },
];

const SPRING = {
  type: "spring",
  stiffness: 420,
  damping: 34,
  mass: 0.9,
} as const;

function ProjectIcon({
  src,
  name,
  className,
}: {
  src?: string;
  name: string;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      {src ? (
        // The icon assets carry ~10% transparent padding of their own. A tile
        // with a background behind them shows that padding as a frame — which
        // is the "border" here. So the tile is transparent and the shadow lives
        // on the image, where it follows the icon's real rounded silhouette.
        <Image
          src={src}
          alt=""
          fill
          sizes="112px"
          className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.28)]"
        />
      ) : (
        <span className="flex size-full items-center justify-center rounded-[22%] bg-muted text-lg font-medium shadow-xl shadow-black/25">
          {name.slice(0, 1)}
        </span>
      )}
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
        <div className="relative flex h-32 w-full items-center justify-center">
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
                  <ProjectIcon src={p.icon} name={p.name} className="size-20" />
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
                        className="group flex flex-col items-center gap-3 rounded-3xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                      >
                        <motion.div
                          whileHover={
                            reduced ? undefined : { scale: 1.08, y: -6 }
                          }
                          whileTap={reduced ? undefined : { scale: 0.97 }}
                          transition={SPRING}
                        >
                          <ProjectIcon
                            src={p.icon}
                            name={p.name}
                            className="size-24 sm:size-28"
                          />
                        </motion.div>

                        <span className="text-sm font-medium">{p.name}</span>
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
