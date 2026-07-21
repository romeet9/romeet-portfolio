"use client";

import * as React from "react";
import Lenis from "lenis";

/**
 * Site-wide smooth scrolling — the web equivalent of Framer's smooth-scroll
 * component. Lenis intercepts wheel and touch input and interpolates the scroll
 * position each frame, so the page eases toward where you scrolled instead of
 * jumping to it.
 *
 * Renders nothing; it only drives the scroll loop.
 */
export function SmoothScroll() {
  React.useEffect(() => {
    // Honour the OS setting. Forcing eased scrolling on someone who asked for
    // reduced motion is exactly the kind of thing that setting exists to stop.
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const lenis = new Lenis({
      // Gentle easing, and a duration short enough that the page still feels
      // responsive rather than laggy.
      duration: 1.05,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      // Touch devices already have native momentum; smoothing it again fights
      // the platform and feels wrong.
      smoothWheel: true,
      syncTouch: false,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
