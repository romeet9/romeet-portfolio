/**
 * A progressive blur along the top edge of the viewport: content dissolves as it
 * scrolls up behind the floating header — the mirror of BottomScrim.
 *
 * Each layer blurs harder than the one above it but is masked to a shorter band
 * near the top edge, so the blur ramps up gradually instead of showing the hard
 * seam a single backdrop-filter would leave at its bottom edge.
 */
const LAYERS = [
  { blur: 1, stop: "100%" },
  { blur: 2, stop: "75%" },
  { blur: 4, stop: "50%" },
  { blur: 8, stop: "28%" },
];

export function TopScrim() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-30 h-28 print:hidden"
    >
      {LAYERS.map(({ blur, stop }) => {
        const mask = `linear-gradient(to bottom, black 0%, black calc(${stop} / 2), transparent ${stop})`;
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

      {/* A whisper of the page background so the header always has contrast. */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/20 to-transparent" />
    </div>
  );
}
