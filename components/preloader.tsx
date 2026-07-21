"use client";

import * as React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

/**
 * Full-screen preloader shown until the page's assets have finished loading.
 *
 * "Loaded" means the browser's `load` event: every image, font and subresource
 * on the page is done. That matters here because the heavy things are the
 * halftone AVIF/WebP fields and the case study mockups, which pop in visibly if
 * you reveal the page too early.
 *
 * Two safeguards, because an overlay that covers the whole site is a bad thing
 * to get stuck:
 *  - a hard timeout releases it even if `load` never fires (a hung request, a
 *    blocked third-party asset), so content is never permanently trapped;
 *  - it is inert to screen readers and lets the page underneath stay readable
 *    to assistive tech.
 */

/** Give up waiting after this and show the page regardless. */
const MAX_WAIT_MS = 6000;
/** Fade duration — kept in sync with the CSS transition below. */
const FADE_MS = 450;

export function Preloader() {
  const [done, setDone] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);

  React.useEffect(() => {
    let released = false;
    const release = () => {
      if (released) return;
      released = true;
      setDone(true);
    };

    if (document.readyState === "complete") {
      release();
    } else {
      window.addEventListener("load", release);
    }

    // Safety valve: never let a stalled asset hold the whole page hostage.
    const timeout = window.setTimeout(release, MAX_WAIT_MS);

    return () => {
      window.removeEventListener("load", release);
      window.clearTimeout(timeout);
    };
  }, []);

  // Unmount only after the fade finishes, so the animation doesn't cut out.
  React.useEffect(() => {
    if (!done) return;
    const t = window.setTimeout(() => setHidden(true), FADE_MS);
    return () => window.clearTimeout(t);
  }, [done]);

  // Hold the page still while the overlay is up.
  React.useEffect(() => {
    if (hidden) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [hidden]);

  if (hidden) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity ease-out"
      style={{
        opacity: done ? 0 : 1,
        transitionDuration: `${FADE_MS}ms`,
      }}
    >
      <DotLottieReact src="/pre-loader.lottie" autoplay loop className="size-40" />
    </div>
  );
}
