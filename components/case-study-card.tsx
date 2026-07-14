import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";

import type { CaseStudy } from "@/content/case-studies";

/**
 * Full-bleed case study card: the mockup *is* the card. Metadata, title,
 * tagline and tags sit over it in the bottom-left, lifted by a soft gradient
 * that dies out well before the middle of the frame — the artwork is never
 * flattened under a dark box.
 */
/**
 * Card copy carries no dashes. Titles take the middot the metadata line already
 * uses; a dash inside a sentence becomes a colon. Display-only — the case study
 * data and its detail page are untouched.
 */
const asTitle = (s: string) => s.replace(/\s*—\s*/g, " · ");
const asSentence = (s: string) => s.replace(/\s*—\s*/g, ": ");

export function CaseStudyCard({
  study,
  href,
}: {
  study: CaseStudy;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group relative flex aspect-[4/5] overflow-hidden rounded-[22px] bg-muted ring-1 ring-foreground/10 transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring dark:hover:shadow-black/40"
    >
      <Image
        src={study.cover.src}
        alt={study.cover.alt}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        quality={90}
        className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      />

      {/* Legibility lift. The mockups are bright white phone screens, so the ramp
          has to be deep where the type sits and gone by the midline. Two passes:
          a long soft one that dies out at 55%, and a short dense one under the
          text itself. The blur is masked to the bottom edge, diffusing the busy
          image detail behind the smallest type. */}
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

      <ArrowUpRightIcon className="absolute top-5 right-5 size-5 text-white/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Bottom-left text block: eyebrow, title, one-line summary. No tag pills
          — the chrome they added is exactly what this layout is meant to shed. */}
      <div className="relative mt-auto flex flex-col gap-1.5 p-5 sm:p-6">
        <span className="text-[11px] font-medium tracking-[0.08em] text-white/55 uppercase">
          {study.company} · {study.year}
        </span>

        <h3 className="text-xl font-semibold tracking-tight text-white drop-shadow-sm sm:text-2xl">
          {asTitle(study.name)}
        </h3>

        <p className="line-clamp-2 max-w-[34ch] text-sm leading-relaxed text-white/75">
          {asSentence(study.tagline)}
        </p>
      </div>
    </Link>
  );
}
