"use client";

import { useEffect, useState } from "react";

export type CaseStudyNavItem = { id: string; label: string };

const HELVETICA =
  "\"Helvetica Neue\", Helvetica, Arial, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif";

/**
 * The floating scroll-spy navigation matching the Vote IN case study side nav bar.
 * Renders borderless section labels with active red indicator dot (#B81919).
 */
export function CaseStudyNav({ items }: { items: CaseStudyNavItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

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

      setActive(current);
    };

    raf = requestAnimationFrame(syncActive);
    return () => cancelAnimationFrame(raf);
  }, [items]);

  const scrollTo = (id: string) => {
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
    <aside
      className="hidden xl:flex fixed left-8 2xl:left-14 top-1/2 -translate-y-1/2 z-50 pointer-events-auto flex-col gap-[18px]"
      style={{ width: "150px" }}
      aria-label="Case study sections"
    >
      {items.map((sec) => {
        const isActive = active === sec.id;
        return (
          <button
            key={sec.id}
            type="button"
            onClick={() => {
              setActive(sec.id);
              scrollTo(sec.id);
            }}
            className="group flex items-center gap-3 text-left transition-colors cursor-pointer"
          >
            <div
              className={`size-1.5 shrink-0 rounded-full transition-all ${
                isActive
                  ? "bg-[#B81919] scale-110"
                  : "bg-transparent group-hover:bg-neutral-600"
              }`}
            />
            <span
              style={{
                fontFamily: HELVETICA,
                fontSize: "14px",
                lineHeight: "20px",
              }}
              className={`transition-colors select-none ${
                isActive
                  ? "text-white font-medium"
                  : "text-[#747474] font-normal group-hover:text-neutral-300"
              }`}
            >
              {sec.label}
            </span>
          </button>
        );
      })}
    </aside>
  );
}
