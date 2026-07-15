import { SiAnthropic, SiFigma, SiFramer } from "@icons-pack/react-simple-icons";
import { WrenchIcon } from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CardIconBadge } from "@/components/card-icon-badge";

/** Real Visual Studio Code mark (simple-icons dropped it for trademark reasons). */
function VSCodeIcon({ className }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M23.15 2.587 18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94c.352.323.883.347 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352ZM18 17.449 10.826 12 18 6.552v10.897Z" />
    </svg>
  );
}

const tools: { name: string; Icon: React.ComponentType<{ className?: string }> }[] = [
  { name: "Figma", Icon: SiFigma },
  { name: "Claude Code", Icon: SiAnthropic },
  { name: "Framer", Icon: SiFramer },
  { name: "VS Code", Icon: VSCodeIcon },
];

// Repeat the set so one half of the track is wider than the card; the marquee
// translates -50%, so a short track would snap back mid-view.
const half = [...tools, ...tools, ...tools];
const track = [...half, ...half];

export function ToolsMarqueeCard() {
  return (
    <Card className="@container/card">
      <CardHeader className="grid-cols-1 gap-2">
        <div className="flex items-start justify-between gap-2">
          <CardDescription className="whitespace-nowrap">
            Tools I use
          </CardDescription>
          <CardIconBadge icon={WrenchIcon} label="Design + build" />
        </div>
        <CardTitle className="text-2xl font-semibold tracking-tight whitespace-nowrap @[250px]/card:text-3xl">
          {tools.length}
        </CardTitle>
      </CardHeader>
      {/* Infinite auto-scrolling strip. The track repeats the tool set so its
          first half already overflows the card — that's what lets the -50%
          loop restart without a visible jump. */}
      <div
        className="relative mt-auto mb-(--card-spacing) overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
        }}
      >
        <div className="flex w-max animate-marquee">
          {track.map(({ name, Icon }, i) => (
            <div
              key={i}
              title={name}
              className="mr-3 flex size-10 shrink-0 items-center justify-center rounded-xl border bg-background text-foreground/85"
            >
              <Icon className="size-5" />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
