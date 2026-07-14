import type { CaseStudy } from "@/content/case-studies";
import { MediaCard } from "@/components/media-card";

/**
 * A case study as a poster. Everything about the treatment — the 4:5 frame, the
 * legibility ramp, the dash-stripping — lives in MediaCard; this only maps the
 * study onto it.
 */
export function CaseStudyCard({
  study,
  href,
}: {
  study: CaseStudy;
  href: string;
}) {
  return (
    <MediaCard
      href={href}
      image={{
        src: study.cover.src,
        alt: study.cover.alt,
        zoom: study.coverZoom,
      }}
      eyebrow={`${study.company} · ${study.year}`}
      title={study.name}
      detail={study.tagline}
      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
    />
  );
}
