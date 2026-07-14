import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";

import { CardCanvas } from "@/components/overview/card-canvas";
import { cn } from "@/lib/utils";

/**
 * The one card the whole site uses: a full-bleed 4:5 poster with its type in the
 * bottom-left, lifted off the artwork by a gradient that dies out well before
 * the middle of the frame. Case studies, KPIs, projects and the tools card are
 * all this component — only the artwork behind the ramp changes.
 *
 * `artwork` renders *under* the legibility ramp (the coming-soon plates, the
 * tools marquee); `overlay` renders *over* it, above the type (the status pill).
 * With neither an image nor artwork the card falls back to a dark generated
 * canvas, so a card whose image hasn't been supplied yet still looks deliberate.
 */

/**
 * Card copy carries no dashes. Titles take the middot the eyebrow already uses;
 * a dash inside a sentence becomes a colon. Applied here rather than at the call
 * sites — a guarantee that every caller has to remember isn't a guarantee.
 */
const asTitle = (s: string) => s.replace(/\s*—\s*/g, " · ");
const asSentence = (s: string) => s.replace(/\s*—\s*/g, ": ");

export type MediaCardProps = {
  /** Absent → the card renders as a div: no hover lift, no arrow, not focusable. */
  href?: string;
  image?: { src: string; alt: string; zoom?: boolean };
  eyebrow?: string;
  title: string;
  detail?: string;
  /** Behind the ramp. */
  artwork?: React.ReactNode;
  /** In front of the ramp, above the type. */
  overlay?: React.ReactNode;
  /** Rendered under `detail`, inside the text block — the hero's CTA row. */
  children?: React.ReactNode;
  /**
   * The hero card carries the page's only <h1> now that the site header is gone.
   * Everything else is an <h3> under it.
   */
  titleAs?: "h1" | "h3";
  priority?: boolean;
  sizes?: string;
  className?: string;
};

export function MediaCard({
  href,
  image,
  eyebrow,
  title,
  detail,
  artwork,
  overlay,
  children,
  titleAs: Title = "h3",
  priority,
  sizes = "(min-width: 768px) 33vw, 100vw",
  className,
}: MediaCardProps) {
  const interactive = Boolean(href);

  const body = (
    <>
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          quality={95}
          priority={priority}
          className={cn(
            "object-cover object-center transition-transform duration-500 ease-out",
            image.zoom
              ? // The shot frames its subject small in a wide, empty backdrop.
                // Zoom and lift the crop so it fills the card and clears the
                // caption instead of sitting in dead grey space.
                "scale-[1.4] -translate-y-[7%] group-hover:scale-[1.45]"
              : "group-hover:scale-[1.03]",
          )}
        />
      ) : (
        (artwork ?? <CardCanvas />)
      )}

      {/* Legibility lift. The covers are bright phone screens, so the ramp has to
          be deep where the type sits and gone by the midline. Two passes: a long
          soft one that dies at 55%, and a short dense one under the text itself.
          The blur is masked to the bottom edge, diffusing busy image detail
          behind the smallest type. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/80 via-black/35 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/85 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 backdrop-blur-[6px] [mask-image:linear-gradient(to_top,black_0%,black_45%,transparent_100%)]"
      />

      {overlay}

      {interactive && (
        <ArrowUpRightIcon className="absolute top-5 right-5 size-5 text-white/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      )}

      <div className="relative mt-auto flex flex-col gap-1.5 p-5 sm:p-6">
        {eyebrow && (
          <span className="text-[11px] font-medium tracking-[0.08em] text-white/55 uppercase">
            {eyebrow}
          </span>
        )}

        <Title className="text-xl font-semibold tracking-tight text-white drop-shadow-sm sm:text-2xl">
          {asTitle(title)}
        </Title>

        {detail && (
          <p className="line-clamp-3 max-w-[34ch] text-sm leading-relaxed text-white/75">
            {asSentence(detail)}
          </p>
        )}

        {children}
      </div>
    </>
  );

  // `data-card` is the hook the mobile deck uses to make a card fill its panel
  // and drop this aspect ratio — see the snap block in globals.css.
  const frame = cn(
    "group relative flex aspect-[4/5] overflow-hidden rounded-[22px] bg-muted ring-1 ring-foreground/10",
    interactive &&
      "transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring dark:hover:shadow-black/40",
    className,
  );

  if (href) {
    return (
      <Link href={href} data-card className={frame}>
        {body}
      </Link>
    );
  }

  return (
    <div data-card className={frame}>
      {body}
    </div>
  );
}
