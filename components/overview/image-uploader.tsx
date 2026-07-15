"use client";

import * as React from "react";
import { ImageIcon, UploadIcon, XIcon } from "lucide-react";

import { overviewCards } from "@/content/overview-cards";
import {
  clearCardImage,
  getCardImage,
  isUploaderEnabled,
  setCardImage,
} from "@/lib/card-images";
import { cn } from "@/lib/utils";

/**
 * Dev-only panel for trying your own designs as card backgrounds. Pick an image
 * for any card and it shows immediately, stored in this browser only (option 1:
 * a preview, not a publish — nothing is uploaded to the server, and no visitor
 * sees it). Persists across reloads on this device; "clear" removes it.
 *
 * Visible in local dev, or on the live site with `?upload=1`.
 */

// Every card, in deck order — the hero (not in the content array) first.
const CARDS: { id: string; title: string }[] = [
  { id: "about", title: "About me" },
  ...overviewCards.map((c) => ({ id: c.id, title: c.title })),
];

export function ImageUploader() {
  const [enabled, setEnabled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  // id → object URL for the row thumbnails.
  const [thumbs, setThumbs] = React.useState<Record<string, string>>({});

  React.useEffect(() => setEnabled(isUploaderEnabled()), []);

  // Load thumbnails for anything already uploaded in this browser.
  React.useEffect(() => {
    if (!enabled) return;
    let urls: string[] = [];
    let active = true;

    (async () => {
      const next: Record<string, string> = {};
      for (const c of CARDS) {
        const blob = await getCardImage(c.id);
        if (blob) {
          const u = URL.createObjectURL(blob);
          urls.push(u);
          next[c.id] = u;
        }
      }
      if (active) setThumbs(next);
    })();

    return () => {
      active = false;
      urls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [enabled]);

  const pick = async (id: string, file: File) => {
    await setCardImage(id, file);
    setThumbs((t) => {
      if (t[id]) URL.revokeObjectURL(t[id]);
      return { ...t, [id]: URL.createObjectURL(file) };
    });
  };

  const clear = async (id: string) => {
    await clearCardImage(id);
    setThumbs((t) => {
      if (t[id]) URL.revokeObjectURL(t[id]);
      const next = { ...t };
      delete next[id];
      return next;
    });
  };

  if (!enabled) return null;

  return (
    <div className="fixed top-[8.5rem] right-6 z-[70] print:hidden">
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open image uploader"
          className="flex size-10 items-center justify-center rounded-full border bg-background/80 text-muted-foreground shadow-lg backdrop-blur-md transition-colors hover:text-foreground"
        >
          <ImageIcon className="size-4" />
        </button>
      ) : (
        <div className="w-72 rounded-2xl border bg-background/85 p-4 shadow-xl backdrop-blur-md">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-sm font-medium">Card images</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="text-muted-foreground hover:text-foreground"
            >
              <XIcon className="size-4" />
            </button>
          </div>
          <p className="mb-3 text-[11px] leading-relaxed text-muted-foreground">
            Preview only — saved in this browser, not published.
          </p>

          <div className="flex max-h-[60vh] flex-col gap-1.5 overflow-y-auto">
            {CARDS.map((c) => (
              <div
                key={c.id}
                className="flex items-center gap-2.5 rounded-xl p-1.5 transition-colors hover:bg-muted"
              >
                <div className="relative size-11 shrink-0 overflow-hidden rounded-lg border bg-muted">
                  {thumbs[c.id] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={thumbs[c.id]}
                      alt=""
                      className="size-full object-cover"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center text-muted-foreground">
                      <ImageIcon className="size-4" />
                    </div>
                  )}
                </div>

                <span className="min-w-0 flex-1 truncate text-xs">{c.title}</span>

                <label
                  className="flex size-7 cursor-pointer items-center justify-center rounded-lg border text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
                  title={thumbs[c.id] ? "Replace" : "Upload"}
                >
                  <UploadIcon className="size-3.5" />
                  <input
                    type="file"
                    accept="image/*"
                    data-upload-input={c.id}
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) pick(c.id, file);
                      e.target.value = "";
                    }}
                  />
                </label>

                <button
                  type="button"
                  onClick={() => clear(c.id)}
                  disabled={!thumbs[c.id]}
                  aria-label={`Clear ${c.title}`}
                  className={cn(
                    "flex size-7 items-center justify-center rounded-lg border text-muted-foreground transition-colors hover:bg-background hover:text-foreground",
                    !thumbs[c.id] && "invisible",
                  )}
                >
                  <XIcon className="size-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
