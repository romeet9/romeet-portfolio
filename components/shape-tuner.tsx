"use client";

import * as React from "react";
import { CheckIcon, CopyIcon, SlidersHorizontalIcon, XIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Dev-only tuning panel for card shape. Scrub the sliders until the cards look
 * right, hit Copy, and the CSS lands in `app/globals.css` — these are the same
 * four custom properties the cards actually read, so what you see while dragging
 * is exactly what shipping those values produces. Nothing here is a live user
 * setting; it's a way to *find* the numbers, not a preference to keep.
 *
 * Visible on localhost, or anywhere with `?tune=1` on the URL — so the values
 * can be dialled in against the real deployment too.
 */

type Control = {
  /** The custom property the cards read. */
  prop: string;
  label: string;
  unit: "px" | "%";
  min: number;
  max: number;
  step: number;
  fallback: number;
};

const GROUPS: { title: string; note: string; controls: Control[] }[] = [
  {
    title: "KPI cards",
    note: "All five in the top row, Tools included",
    controls: [
      {
        prop: "--kpi-radius",
        label: "Corner radius",
        unit: "px",
        min: 0,
        max: 40,
        step: 1,
        fallback: 12,
      },
      {
        prop: "--kpi-padding",
        label: "Padding",
        unit: "px",
        min: 8,
        max: 40,
        step: 1,
        fallback: 16,
      },
    ],
  },
  {
    title: "Project tiles",
    note: "The deck and the expanded cluster",
    controls: [
      // Percent, not px: the tiles render at two sizes (96px in the deck, 168px
      // in the cluster) off one component, so a fixed radius would read as a
      // different shape in each. A percentage keeps them the same tile.
      {
        prop: "--tile-radius",
        label: "Corner radius",
        unit: "%",
        min: 0,
        max: 40,
        step: 0.5,
        fallback: 7.5,
      },
      {
        prop: "--tile-padding",
        label: "Padding",
        unit: "%",
        min: 0,
        max: 24,
        step: 0.5,
        fallback: 16.5,
      },
    ],
  },
];

const ALL = GROUPS.flatMap((g) => g.controls);
const STORAGE_KEY = "shape-tuner";

export function ShapeTuner() {
  const [enabled, setEnabled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState<Record<string, number>>(() =>
    Object.fromEntries(ALL.map((c) => [c.prop, c.fallback])),
  );
  const [copied, setCopied] = React.useState(false);

  // Gate and restore. Both touch the DOM, so they wait for the client — the
  // server has no idea what the URL's query string is under static rendering.
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const on =
      process.env.NODE_ENV === "development" || params.get("tune") === "1";
    setEnabled(on);
    if (!on) return;

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setValues((v) => ({ ...v, ...JSON.parse(saved) }));
      } catch {
        // Corrupt entry — the defaults are fine.
      }
    }
  }, []);

  // Write straight onto <html>, which is where the cards inherit from. An inline
  // style on the root beats the :root rule in globals.css without touching it.
  React.useEffect(() => {
    if (!enabled) return;
    for (const c of ALL) {
      document.documentElement.style.setProperty(
        c.prop,
        `${values[c.prop]}${c.unit}`,
      );
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
  }, [enabled, values]);

  const css = ALL.map(
    (c) => `  ${c.prop}: ${values[c.prop]}${c.unit};`,
  ).join("\n");

  const copy = async () => {
    await navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  const reset = () =>
    setValues(Object.fromEntries(ALL.map((c) => [c.prop, c.fallback])));

  if (!enabled) return null;

  return (
    <div className="fixed top-24 right-6 z-[70] print:hidden">
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open shape tuner"
          className="flex size-10 items-center justify-center rounded-full border bg-background/80 text-muted-foreground shadow-lg backdrop-blur-md transition-colors hover:text-foreground"
        >
          <SlidersHorizontalIcon className="size-4" />
        </button>
      ) : (
        <div className="w-72 rounded-2xl border bg-background/85 p-4 shadow-xl backdrop-blur-md">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium">Shape tuner</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="text-muted-foreground hover:text-foreground"
            >
              <XIcon className="size-4" />
            </button>
          </div>

          {GROUPS.map((group) => (
            <div key={group.title} className="mb-4 last:mb-0">
              <p className="text-xs font-medium">{group.title}</p>
              <p className="mb-2 text-[11px] text-muted-foreground">
                {group.note}
              </p>

              {group.controls.map((c) => (
                <label key={c.prop} className="mb-2 block last:mb-0">
                  <span className="flex items-baseline justify-between text-[11px] text-muted-foreground">
                    {c.label}
                    <span className="font-mono text-foreground">
                      {values[c.prop]}
                      {c.unit}
                    </span>
                  </span>
                  <input
                    type="range"
                    min={c.min}
                    max={c.max}
                    step={c.step}
                    value={values[c.prop]}
                    onChange={(e) =>
                      setValues((v) => ({
                        ...v,
                        [c.prop]: Number(e.target.value),
                      }))
                    }
                    className="mt-1 w-full accent-foreground"
                  />
                </label>
              ))}
            </div>
          ))}

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={copy}
              className={cn(
                "flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-2 py-1.5 text-xs font-medium transition-colors hover:bg-muted",
                copied && "text-emerald-600 dark:text-emerald-400",
              )}
            >
              {copied ? (
                <CheckIcon className="size-3.5" />
              ) : (
                <CopyIcon className="size-3.5" />
              )}
              {copied ? "Copied" : "Copy CSS"}
            </button>
            <button
              type="button"
              onClick={reset}
              className="rounded-lg border px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Reset
            </button>
          </div>

          <pre className="mt-3 overflow-x-auto rounded-lg bg-muted p-2 font-mono text-[10px] leading-relaxed text-muted-foreground">
            {css}
          </pre>
        </div>
      )}
    </div>
  );
}
