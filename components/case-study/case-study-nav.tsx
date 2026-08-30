"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export type CaseStudyNavItem = { id: string; label: string };

export const HELVETICA =
  "\"Helvetica Neue\", Helvetica, Arial, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif";

/**
 * Standard Floating Back Button for Case Studies.
 * Anchored to the top-left margin (left-8 2xl:left-14).
 */
export function CaseStudyBackButton({ href = "/case-studies" }: { href?: string }) {
  return (
    <Link
      href={href}
      className="fixed z-50 top-8 left-8 2xl:left-14 items-center h-7 w-7 hidden sm:flex justify-center rounded-full shrink-0 shadow-[inset_0_0_0_1px_rgba(10,13,18,0.04),0_1px_2px_rgba(10,13,18,0.08)] bg-white border border-[#E6E6E6] hover:scale-105 active:scale-95 transition-transform"
      aria-label="Back to case studies"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform group-hover:-translate-x-0.5"
      >
        <path
          d="M12 5L7 10L12 15"
          stroke="#463F3F"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}

/**
 * Standard Floating Scroll-Spy Sidebar Navigation for Case Studies.
 * Anchored to the extreme left margin (left-8 2xl:left-14) vertically centered.
 */
export function CaseStudyNav({
  items,
  activeId,
  onSelect,
}: {
  items: CaseStudyNavItem[];
  activeId?: string;
  onSelect?: (id: string) => void;
}) {
  const [internalActive, setInternalActive] = useState(items[0]?.id ?? "");
  const active = activeId !== undefined ? activeId : internalActive;

  useEffect(() => {
    let raf = 0;
    const syncActive = () => {
      raf = requestAnimationFrame(syncActive);
      const line = window.innerHeight * 0.35;

      const elements = items
        .map((s) => ({
          id: s.id,
          el: document.getElementById(s.id),
        }))
        .filter((item): item is { id: string; el: HTMLElement } => item.el !== null);

      if (elements.length === 0) return;

      let current = elements[0].id;
      for (const item of elements) {
        if (item.el.getBoundingClientRect().top <= line) {
          current = item.id;
        }
      }

      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 10
      ) {
        current = elements[elements.length - 1].id;
      }

      setInternalActive(current);
    };

    raf = requestAnimationFrame(syncActive);
    return () => cancelAnimationFrame(raf);
  }, [items]);

  const scrollTo = (id: string) => {
    if (onSelect) onSelect(id);
    setInternalActive(id);
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement, o?: object) => void } })
      ?.__lenis;
    if (lenis) {
      lenis.scrollTo(el, { offset: -80 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      className="hidden xl:flex fixed left-8 2xl:left-14 top-1/2 -translate-y-1/2 z-50 pointer-events-auto flex-col items-start gap-[18px] w-[150px]"
      aria-label="Table of contents"
    >
      {items.map((sec) => {
        const isActive = active === sec.id;
        return (
          <button
            key={sec.id}
            type="button"
            onClick={() => scrollTo(sec.id)}
            className="group flex items-center gap-3 text-left transition-colors cursor-pointer"
          >
            <div
              className={`size-1.5 shrink-0 rounded-[50%] transition-all ${
                isActive
                  ? "bg-[#B81919] scale-110"
                  : "bg-[#555] group-hover:bg-neutral-300"
              }`}
            />
            <span
              style={{
                fontFamily: HELVETICA,
                fontSize: "15px",
                lineHeight: "100%",
                letterSpacing: "normal",
              }}
              className={`transition-colors select-none ${
                isActive
                  ? "text-white font-medium"
                  : "text-[#8F8F8F] font-normal group-hover:text-white"
              }`}
            >
              {sec.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
