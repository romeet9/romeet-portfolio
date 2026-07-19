/**
 * Film grain for the KPI cards' metallic gradients — the texture the Paper
 * StaticRadialGradient shader carried in its grainOverlay. A CSS gradient alone
 * reads flat; this feTurbulence noise gives it the brushed sheen without a WebGL
 * context.
 */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function KpiGrain({ opacity = 0.16 }: { opacity?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 mix-blend-overlay"
      style={{ backgroundImage: GRAIN, opacity }}
    />
  );
}
