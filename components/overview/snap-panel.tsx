"use client";

import { motion, useReducedMotion } from "motion/react";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

/**
 * One panel of the mobile deck: a card centred in the band between the header
 * and the dock, that springs as it settles.
 *
 * The spring lives on the card *inside* the panel, never on the panel itself —
 * the panel is the snap target, and animating a snap target's transform fights
 * the snap engine.
 *
 * On desktop this collapses to a plain cell: `.snap-panel`'s sizing only exists
 * inside the mobile media query in globals.css, and the motion wrapper is
 * dropped entirely, so the nine cards of the grid don't dim and spring as the
 * page scrolls past them.
 */

const REST = { scale: 0.9, opacity: 0.45, y: 16 };
const SNAPPED = { scale: 1, opacity: 1, y: 0 };

// Bouncy, settles in ~0.4s.
const SETTLE = { type: "spring", visualDuration: 0.42, bounce: 0.38 } as const;

// The trigger band is the middle ~40% of the viewport, biased downward: the
// snapport's centre sits (112 - 64) / 2 = 24px below the raw viewport's, because
// the dock's inset is deeper than the header's.
const VIEWPORT = { margin: "-27% 0px -33% 0px", amount: 0.4, once: false } as const;

export function SnapPanel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();

  // The card can never be taller than the band it has to fit in — a panel that
  // overflows the snapport under mandatory snapping is content you can't reach.
  const cap =
    "w-full max-w-[min(100%,calc((100svh-var(--snap-top)-var(--snap-bottom)-1rem)*0.8))] md:max-w-none";

  if (!isMobile || reduced) {
    return (
      <div className={cn("snap-panel flex items-center justify-center", className)}>
        <div className={cap}>{children}</div>
      </div>
    );
  }

  return (
    <div className={cn("snap-panel flex items-center justify-center", className)}>
      <motion.div
        className={cap}
        variants={{ rest: REST, snapped: SNAPPED }}
        initial="rest"
        whileInView="snapped"
        viewport={VIEWPORT}
        transition={SETTLE}
      >
        {children}
      </motion.div>
    </div>
  );
}
