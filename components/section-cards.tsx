import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ToolsMarqueeCard } from "@/components/tools-marquee-card";
import { MousePointerClickIcon, RocketIcon, SparklesIcon } from "lucide-react";

const cards = [
  {
    label: "Interactive prototypes",
    value: "100%",
    badge: "Coded, not mocked",
    footer: "Every project ships a clickable build",
    sub: "Framer + real front-end code",
    icon: MousePointerClickIcon,
  },
  {
    label: "Shipped to production",
    value: "5 apps",
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
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      {cards.map((c) => (
        <Card key={c.label} className="@container/card">
          <CardHeader className="grid-cols-1 gap-2">
            {/* Below 340px the badge stacks under the label instead of squeezing
                it, so label and value each keep one line. The breakpoint is on
                the card container, so all four cards flip together and their
                values stay on a common baseline. */}
            <div className="flex flex-col items-start gap-1.5 @[340px]/card:flex-row @[340px]/card:items-center @[340px]/card:justify-between">
              <CardDescription className="whitespace-nowrap">
                {c.label}
              </CardDescription>
              <Badge variant="outline" className="shrink-0 whitespace-nowrap">
                <c.icon />
                {c.badge}
              </Badge>
            </div>
            <CardTitle className="text-2xl font-semibold tracking-tight whitespace-nowrap @[250px]/card:text-3xl">
              {c.value}
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">{c.footer}</div>
            <div className="text-muted-foreground">{c.sub}</div>
          </CardFooter>
        </Card>
      ))}
      <ToolsMarqueeCard />
    </div>
  );
}
