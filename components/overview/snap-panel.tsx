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

// No vertical offset: a `y` shift moves every un-focused card the same direction
// (down), which tightens the gap above a centred card and opens the one below —
// asymmetric. The settle is scale + fade only, so the space around each card
// stays equal top and bottom.
const REST = { scale: 0.92, opacity: 0.5 };
const SNAPPED = { scale: 1, opacity: 1 };

// Bouncy, settles in ~0.4s.
const SETTLE = { type: "spring", visualDuration: 0.42, bounce: 0.38 } as const;

// The trigger band is the middle ~40% of the viewport, biased upward: the
// snapport's centre sits (112 - 30) / 2 = 41px *above* the raw viewport's,
// because the dock's inset is far deeper than the top's. The bigger bottom
// margin is what pulls the band up to meet it.
const VIEWPORT = { margin: "-25% 0px -35% 0px", amount: 0.4, once: false } as const;

export function SnapPanel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();

  // The card keeps its own 4:5 shape; the panel just holds it full-width and, on
  // mobile, takes that card's height so the deck reads as a feed of 4:5 cards.
  if (!isMobile || reduced) {
    return (
      <div className={cn("snap-panel flex w-full justify-center", className)}>
        <div className="w-full">{children}</div>
      </div>
    );
  }

  return (
    <div className={cn("snap-panel flex w-full justify-center", className)}>
      <motion.div
        className="w-full"
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
