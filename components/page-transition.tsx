"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

/**
 * Replays the page-enter animation on every route change.
 * Once the animation completes, we remove the animation class so that
 * child fixed/sticky elements (like the case study left sidebar nav)
 * remain properly anchored to the viewport without being trapped by CSS transforms.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setAnimating(true);
    const timer = setTimeout(() => {
      setAnimating(false);
    }, 750);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div
      key={pathname}
      onAnimationEnd={() => setAnimating(false)}
      className={`flex flex-1 flex-col ${animating ? "animate-page-enter" : ""}`}
    >
      {children}
    </div>
  );
}
