"use client";

import * as React from "react";
import { toast } from "sonner";

import { useIsMobile } from "@/hooks/use-mobile";

/**
 * Hiding the scrollbar on the deck removes the one affordance that told a
 * visitor there was more below. This puts it back, once: a toast at the top of
 * the screen that says so, and gets out of the way the moment they scroll.
 *
 * Once per session, and only if they haven't already scrolled — a hint you've
 * already acted on is noise.
 */
const KEY = "overview-scroll-hint";

export function ScrollHint() {
  const isMobile = useIsMobile();

  React.useEffect(() => {
    if (!isMobile) return;
    if (sessionStorage.getItem(KEY)) return;
    if (window.scrollY > 0) return;

    sessionStorage.setItem(KEY, "1");

    const id = toast("Scroll to explore", {
      description: "One flick per card.",
      duration: 6000,
    });

    const dismiss = () => toast.dismiss(id);
    window.addEventListener("scroll", dismiss, { once: true, passive: true });

    return () => {
      window.removeEventListener("scroll", dismiss);
      toast.dismiss(id);
    };
  }, [isMobile]);

  return null;
}
