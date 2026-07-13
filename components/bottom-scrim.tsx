/**
 * A progressive blur along the bottom edge of the viewport: content dissolves
 * as it approaches the bottom, behind the floating dock.
 *
 * Each layer blurs harder than the one below it but is masked to a shorter band
 * near the bottom edge, so the blur ramps up gradually instead of showing the
 * hard seam a single backdrop-filter would leave at its top edge.
 */
const LAYERS = [
  { blur: 1, stop: "100%" },
  { blur: 2, stop: "75%" },
  { blur: 4, stop: "50%" },
  { blur: 8, stop: "28%" },
];

export function BottomScrim() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 h-40 print:hidden"
    >
      {LAYERS.map(({ blur, stop }) => {
        const mask = `linear-gradient(to top, black 0%, black calc(${stop} / 2), transparent ${stop})`;
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

      {/* A whisper of the page background so the dock always has contrast. */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
    </div>
  );
}
