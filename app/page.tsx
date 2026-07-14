import { existsSync } from "node:fs";
import path from "node:path";

import { OverviewDeck } from "@/components/overview/overview-deck";
import { overviewCards } from "@/content/overview-cards";

/**
 * A card's image is dropped into public/ by hand, and one may not be there yet.
 * next/image on a missing file renders a broken box; MediaCard with no image
 * renders its dark generated canvas. So resolve here, on the server, at build
 * time: a card only keeps its `image` if the file actually exists.
 */
const cards = overviewCards.map((card) =>
  card.image && !existsSync(path.join(process.cwd(), "public", card.image.src))
    ? { ...card, image: undefined }
    : card,
);

export default function OverviewPage() {
  return <OverviewDeck cards={cards} />;
}
