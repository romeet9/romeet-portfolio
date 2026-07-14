import type { OverviewCard } from "@/content/overview-cards";
import { ComingSoonCaseCard } from "@/components/coming-soon-case-card";
import { MediaCard } from "@/components/media-card";
import { SnapPanel } from "@/components/overview/snap-panel";
import { ToolsMarqueeCard } from "@/components/tools-marquee-card";

/**
 * The Overview, as one thing: a 3x3 grid of posters on desktop, a vertical deck
 * of snapping panels on mobile. Same array, same order, same cards — only the
 * container changes.
 *
 * `id="overview-deck"` is the marker the snap CSS keys off (`html:has(#overview-deck)`),
 * which is how the snapping scopes itself to this route with no JavaScript and
 * cleans itself up when you navigate away.
 */
export function OverviewDeck({
  cards,
  hero,
}: {
  cards: OverviewCard[];
  hero: React.ReactNode;
}) {
  return (
    <div
      id="overview-deck"
      className="flex flex-col md:grid md:grid-cols-3 md:gap-4 md:py-6"
    >
      <SnapPanel className="md:col-span-3 md:block">{hero}</SnapPanel>

      {cards.map((card) => (
        <SnapPanel key={card.id}>
          {card.render === "coming-soon" ? (
            <ComingSoonCaseCard />
          ) : card.render === "tools" ? (
            <ToolsMarqueeCard />
          ) : (
            <MediaCard
              href={card.href}
              image={card.image}
              eyebrow={card.eyebrow}
              title={card.title}
              detail={card.detail}
            />
          )}
        </SnapPanel>
      ))}
    </div>
  );
}
