"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { ChevronDownIcon } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { useIsMobile } from "@/hooks/use-mobile";

/**
 * The scroll hint: pinned to the top of the viewport, not to the hero card, so
 * it holds its position rather than riding the deck. It's there while you're at
 * the top and leaves the moment you scroll — once you've done the thing it's
 * asking for, it's noise.
 *
 * Portalled to <body>: PageTransition ends on `filter: blur(0)`, and any filter
 * other than `none` makes an element the containing block for its `fixed`
 * descendants — rendered in place, this would pin itself to the page wrapper
 * instead of the viewport.
 *
 * Mobile only. The desktop layout is a grid, not a deck; there's nothing to
 * flick through.
 */
export function ScrollPill() {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();
  const [mounted, setMounted] = React.useState(false);
  const [atTop, setAtTop] = React.useState(true);

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    if (!isMobile) return;

    // A snapped deck rests at discrete offsets, so anything past a few pixels is
    // a real scroll rather than a rubber-band.
    const onScroll = () => setAtTop(window.scrollY < 8);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  if (!mounted || !isMobile) return null;

  return createPortal(
    <AnimatePresence>
      {atTop && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: reduced ? 0 : 0.25, ease: "easeOut" }}
          className="pointer-events-none fixed top-4 left-1/2 z-50 -translate-x-1/2 print:hidden"
        >
          <span className="flex items-center gap-1 rounded-full border border-white/15 bg-black/50 px-3 py-1 backdrop-blur-md">
            <span className="text-[10px] font-medium tracking-[0.08em] text-white/80 uppercase">
              Scroll
            </span>
            <ChevronDownIcon className="size-3 animate-bounce text-white/80" />
          </span>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
