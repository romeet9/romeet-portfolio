import { SiAnthropic, SiFigma, SiFramer } from "@icons-pack/react-simple-icons";

import { CardCanvas } from "@/components/overview/card-canvas";
import { MediaCard } from "@/components/media-card";

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

function ToolsCanvas() {
  return (
    <CardCanvas>
      {/* Infinite auto-scrolling strip, sitting on the canvas's glow. The chips
          are white-on-dark here, not the light-surface tokens the old KPI card
          used — the ground underneath them changed. */}
      <div
        className="absolute inset-x-0 top-[30%] -translate-y-1/2 overflow-hidden"
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
              className="mr-3 flex size-14 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white backdrop-blur-sm"
            >
              <Icon className="size-6" />
            </div>
          ))}
        </div>
      </div>
    </CardCanvas>
  );
}

export function ToolsMarqueeCard() {
  return (
    <MediaCard
      cardId="tools"
      artwork={<ToolsCanvas />}
      eyebrow="Design + build"
      title="Tools I use"
      detail="Figma to think, Claude Code to build, Framer to prototype, VS Code for everything else."
    />
  );
}
