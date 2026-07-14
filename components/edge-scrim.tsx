import { cn } from "@/lib/utils";

/**
 * A progressive blur along an edge of the viewport: content dissolves as it
 * approaches the edge instead of being cut off by it.
 *
 * Each layer blurs harder than the one before but is masked to a shorter band
 * near the edge, so the blur ramps up gradually instead of showing the hard seam
 * a single backdrop-filter would leave at its boundary.
 */
const LAYERS = [
  { blur: 1, stop: "100%" },
  { blur: 2, stop: "75%" },
  { blur: 4, stop: "50%" },
  { blur: 8, stop: "28%" },
];

export function EdgeScrim({ edge }: { edge: "top" | "bottom" }) {
  const away = edge === "bottom" ? "to top" : "to bottom";

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-x-0 z-40 print:hidden",
        // The bottom band is deep because the dock has to sit clear of the page.
        // The top band is kept shallow on purpose: any deeper and it would start
        // smearing the avatar and pills along a snapped card's top edge.
        edge === "bottom" ? "bottom-0 h-40" : "top-0 h-16",
      )}
    >
      {LAYERS.map(({ blur, stop }) => {
        const mask = `linear-gradient(${away}, black 0%, black calc(${stop} / 2), transparent ${stop})`;
        return (
          <div
            key={blur}
            className="absolute inset-0"
            style={{
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              maskImage: mask,
              WebkitMaskImage: mask,
            }}
          />
        );
      })}

      {/* A whisper of the page background, so whatever floats over the scrim —
          the dock below, the browser chrome above — always has contrast. */}
      <div
        className={cn(
          "absolute inset-0",
          edge === "bottom"
            ? "bg-gradient-to-t from-background/80 via-background/20 to-transparent"
            : "bg-gradient-to-b from-background/70 via-background/15 to-transparent",
        )}
      />
    </div>
  );
}
