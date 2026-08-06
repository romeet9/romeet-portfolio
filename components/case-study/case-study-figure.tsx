"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * A framed case-study figure: the screenshot sits on a 6px mat inside a
 * hairline card (matching the reference design's `.cs-frame`), with an
 * optional italic caption below. Clicking the image opens a full-screen
 * lightbox; Esc or clicking the backdrop closes it.
 */
export function CaseStudyFigure({
  src,
  alt,
  width,
  height,
  caption,
  className,
  priority,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  className?: string;
  priority?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  return (
    <>
      <figure className={cn("cs-frame", className)}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Enlarge: ${alt}`}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes="(min-width: 641px) 600px, 92vw"
            quality={95}
            priority={priority}
            className="cs-fig"
          />
        </button>
        {caption && <figcaption className="cs-caption">{caption}</figcaption>}
      </figure>

      {open && (
        <div
          ref={dialogRef}
          className="cs-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          tabIndex={-1}
          onClick={close}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="cs-lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
          {caption && <p className="cs-lightbox-caption">{caption}</p>}
        </div>
      )}
    </>
  );
}
