import type { OverviewCard } from "@/content/overview-cards";
import { ComingSoonCaseCard } from "@/components/coming-soon-case-card";
import { HeroCard } from "@/components/overview/hero-card";
import { ImageUploader } from "@/components/overview/image-uploader";
import { MediaCard } from "@/components/media-card";
import { SnapPanel } from "@/components/overview/snap-panel";
import { ToolsMarqueeCard } from "@/components/tools-marquee-card";

/**
 * The Overview, as one thing: a 3x3 grid of posters under a banner on desktop, a
 * vertical deck of full-screen snapping cards on mobile. Same array, same order,
 * same cards — only the container changes.
 *
 * `id="overview-deck"` is the marker the snap CSS keys off (`html:has(#overview-deck)`),
 * which is how the snapping and the hidden scrollbar scope themselves to this
 * route with no JavaScript, and clean themselves up when you navigate away.
 */
export function OverviewDeck({ cards }: { cards: OverviewCard[] }) {
  return (
    <div
      id="overview-deck"
      className="flex flex-col gap-5 md:grid md:grid-cols-3 md:gap-4 md:py-6"
    >
      {/* The about-me card is the first cell of the 3x3 grid on desktop and the
          first card of the feed on mobile — a normal 4:5 card either way. */}
      <SnapPanel>
        <HeroCard />
      </SnapPanel>

      {cards.map((card, i) => (
        <SnapPanel key={card.id}>
          {card.render === "coming-soon" ? (
            <ComingSoonCaseCard />
          ) : card.render === "tools" ? (
            <ToolsMarqueeCard />
          ) : (
            <MediaCard
              cardId={card.id}
              href={card.href}
              image={card.image}
              eyebrow={card.eyebrow}
              title={card.title}
              detail={card.detail}
              // The first card is the one waiting behind the hero on mobile and
              // is above the fold on desktop — it shouldn't lazy-load.
              priority={i === 0}
            />
          )}
        </SnapPanel>
      ))}

      {/* Renders nothing unless it's dev or the URL carries ?upload=1. */}
      <ImageUploader />
    </div>
  );
}
