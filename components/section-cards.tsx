import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CardIconBadge } from "@/components/card-icon-badge";
import { ToolsMarqueeCard } from "@/components/tools-marquee-card";
import { MousePointerClickIcon, RocketIcon, SparklesIcon } from "lucide-react";

const cards = [
  {
    label: "Interactive prototypes",
    value: "100%",
    badge: "Coded, not mocked",
    footer: "Ships a clickable build",
    sub: "Framer + real front-end code",
    icon: MousePointerClickIcon,
  },
  {
    label: "Shipped to production",
    value: "4 apps",
    badge: "Web · iOS · macOS",
    footer: "Real, working products",
    sub: "Next.js 16 · SwiftUI",
    icon: RocketIcon,
  },
  {
    label: "AI in every project",
    value: "Daily",
    badge: "Claude Code",
    footer: "I design and build with AI",
    sub: "Research → handoff",
    icon: SparklesIcon,
  },
];

export function SectionCards() {
  return (
    <TooltipProvider delay={120}>
      <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      {/* Card shape comes from the tuner's two custom properties: the radius
          directly, and the padding via --card-spacing, which is the knob the
          Card primitive already uses for its own gutters. */}
      {cards.map((c) => (
        <Card
          key={c.label}
          className="@container/card rounded-[var(--kpi-radius)] [--card-spacing:var(--kpi-padding)]"
        >
          <CardHeader className="grid-cols-1 gap-2">
            {/* Heading left, icon pinned top-right — the badge's text is gone,
                so the value gets the card's full width back. */}
            <div className="flex items-start justify-between gap-2">
              <CardDescription className="whitespace-nowrap">
                {c.label}
              </CardDescription>
              <CardIconBadge icon={c.icon} label={c.badge} />
            </div>
            <CardTitle className="text-2xl font-semibold tracking-tight whitespace-nowrap @[250px]/card:text-3xl">
              {c.value}
            </CardTitle>
          </CardHeader>
          {/* Copy is kept short enough that every footer holds one line at the
              width the 4-up grid produces — nothing wraps, so the divider rules
              and the sub-labels stay on a common line across the row. */}
          <CardFooter className="mt-auto flex-col items-start gap-1.5 text-sm">
            <div className="font-medium whitespace-nowrap">{c.footer}</div>
            <div className="text-muted-foreground">{c.sub}</div>
          </CardFooter>
        </Card>
        ))}
        <ToolsMarqueeCard />
      </div>
    </TooltipProvider>
  );
}
