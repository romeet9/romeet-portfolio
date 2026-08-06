"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export type CaseStudyNavItem = { id: string; label: string };

/**
 * The floating scroll-spy nav in the left gutter of a case study. Renders a
 * dot + label per section; the section whose top has crossed ~28% down the
 * viewport gets the accent dot. Clicking smooth-scrolls to the section.
 * Visible only on wide viewports (see .cs-nav media query).
 *
 * Uses a deterministic scroll listener (like the reference design's
 * syncActive) rather than an IntersectionObserver: IO only fires on band-edge
 * crossings, so a tall section fully covering the scan band can leave the nav
 * stuck on an earlier section. The scroll pass picks the last section whose
 * top is above the line on every frame, so it can never lag behind.
 */
export function CaseStudyNav({ items }: { items: CaseStudyNavItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    // Continuous rAF loop, not a scroll-event listener. Scroll events can be
    // swallowed by smooth-scroll wrappers (Lenis), `overflow: hidden` on
    // body, or nested scroll containers — which is exactly how the nav got
    // stuck on one section. Recomputing the active section every frame never
    // depends on an event firing, so it can't lag or freeze.
    let raf = 0;

    const syncActive = () => {
      raf = requestAnimationFrame(syncActive);

      const line = window.innerHeight * 0.28;
      // The last section whose top has crossed the line wins. Sections are in
      // document order, so iterating forward leaves `current` at the deepest
      // section already scrolled past — even when several are on screen.
      let current = sections[0].id;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) current = section.id;
      }

      // At the very bottom, the last section is active even if its top never
      // reaches the line (short content can't scroll that far).
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = sections[sections.length - 1].id;
      }

      // React bails out when the value is unchanged, so no redundant renders.
      setActive(current);
    };

    raf = requestAnimationFrame(syncActive);
    return () => cancelAnimationFrame(raf);
  }, [items]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = (window as { __lenis?: { scrollTo: (t: HTMLElement, o?: object) => void } })
      .__lenis;
    if (lenis && !reduceMotion) {
      lenis.scrollTo(el, { offset: -96 });
    } else {
      el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }
  };

  return (
    <nav className="cs-nav" aria-label="Case study sections">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={cn("cs-nav-item", active === item.id && "active")}
          onClick={(e) => {
            e.preventDefault();
            setActive(item.id);
            scrollTo(item.id);
          }}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
