import { existsSync } from "node:fs";
import path from "node:path";
import { SparklesIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { OverviewDeck } from "@/components/overview/overview-deck";
import { overviewCards } from "@/content/overview-cards";

/**
 * A card's image is dropped into public/ by hand, and some of them aren't there
 * yet. next/image on a missing file renders a broken box; MediaCard with no
 * image renders its dark generated canvas. So resolve here, on the server, at
 * build time: a card only keeps its `image` if the file actually exists.
 */
const cards = overviewCards.map((card) =>
  card.image && !existsSync(path.join(process.cwd(), "public", card.image.src))
    ? { ...card, image: undefined }
    : card,
);

function Hero() {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex flex-wrap items-center gap-2">
        <h1
          className="animate-text-shimmer text-xl font-semibold tracking-tight sm:text-2xl"
          style={{
            backgroundImage:
              "linear-gradient(110deg, var(--foreground) 42%, var(--chart-1) 50%, var(--foreground) 58%)",
            backgroundSize: "220% 100%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          AI Product Designer
        </h1>
        <Badge
          variant="secondary"
          className="gap-1.5 transition-transform hover:scale-105"
        >
          <SparklesIcon className="size-3.5 animate-twinkle text-chart-1" />
          Design + build
        </Badge>
      </div>
      <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
        I don&apos;t wait for engineering to ship. I turn ideas into{" "}
        <span className="font-medium text-foreground">interactive, coded prototypes</span>,
        use AI <span className="font-medium text-foreground">extensively</span> across
        research, design, and build, and ship real products to production.
      </p>
    </div>
  );
}

export default function OverviewPage() {
  return <OverviewDeck cards={cards} hero={<Hero />} />;
}
