import type { OverviewCard } from "@/content/overview-cards";
import { ComingSoonCaseCard } from "@/components/coming-soon-case-card";
import { HeroCard } from "@/components/overview/hero-card";
import { ImageUploader } from "@/components/overview/image-uploader";
import { MediaCard } from "@/components/media-card";
import { SwipeDeck } from "@/components/overview/swipe-deck";
import { ToolsMarqueeCard } from "@/components/tools-marquee-card";

/**
 * The Overview, two ways. Desktop is the 3x3 grid of full-bleed poster cards.
 * Mobile is a Tinder-style swipe stack (SwipeDeck) — the same cards, coded on a
 * neutral surface with no photos. Two presentations, one content set; each is
 * shown only at its breakpoint so neither pays for the other.
 */
export function OverviewDeck({ cards }: { cards: OverviewCard[] }) {
  return (
    <div id="overview-deck">
      {/* Desktop: the 3x3 grid. */}
      <div className="hidden grid-cols-3 gap-4 py-6 md:grid">
        <HeroCard />

        {cards.map((card, i) => {
          if (card.render === "coming-soon") return <ComingSoonCaseCard key={card.id} />;
          if (card.render === "tools") return <ToolsMarqueeCard key={card.id} />;
          return (
            <MediaCard
              key={card.id}
              cardId={card.id}
              href={card.href}
              image={card.image}
              eyebrow={card.eyebrow}
              title={card.title}
              detail={card.detail}
              priority={i === 0}
            />
          );
        })}
      </div>

      {/* Mobile: the swipe stack. */}
      <SwipeDeck className="md:hidden" />

      {/* Renders nothing unless it's dev or the URL carries ?upload=1. */}
      <ImageUploader />
    </div>
  );
}
