import { Card } from "@/components/ui/card";
import { ToolsMarqueeCard } from "@/components/tools-marquee-card";

/**
 * KPI cards: label at the top, figure at the bottom, nothing in between. The
 * empty middle is the design — it's what makes the number read as the card's
 * subject rather than one line of a stat block. Colour is straight shadcn:
 * `bg-card` on `border`, muted label, foreground figure. No gradient wash, no
 * icon, no footer copy.
 */
const cards = [
  { label: "Interactive prototypes", value: "100%" },
  { label: "Shipped to production", value: "4 apps" },
  { label: "AI in every project", value: "Daily" },
];

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {cards.map((c) => (
        <Card
          key={c.label}
          className="@container/card flex min-h-56 flex-col justify-between gap-8 p-6 shadow-xs"
        >
          {/* The label is allowed to wrap — two short lines sit better in the
              top corner than one line stretched across the card. */}
          <p className="max-w-[12ch] text-lg leading-snug text-muted-foreground">
            {c.label}
          </p>

          <p className="text-4xl font-medium tracking-tight text-foreground @[220px]/card:text-5xl">
            {c.value}
          </p>
        </Card>
      ))}

      <ToolsMarqueeCard />
    </div>
  );
}
