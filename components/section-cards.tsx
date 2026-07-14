import { Card } from "@/components/ui/card";
import { DitherShader } from "@/components/ui/dither-shader";
import { ToolsMarqueeCard } from "@/components/tools-marquee-card";
import { cn } from "@/lib/utils";

/**
 * KPI cards: label at the top, figure at the bottom, and an ordered-dither
 * bloom in the empty corner between them. Colour is straight shadcn — `bg-card`
 * on `border`, muted label, foreground figure — and the dither adds texture, not
 * hue.
 */

/**
 * The dither needs a raster source. Rather than a photograph — whose midtones
 * would land wherever they like, including under the type — each card gets a
 * generated radial ramp: black at the bloom's centre, white at its edges. The
 * shader turns luminance into dot density, so the ramp *is* the density map,
 * and parking every bloom off the top-right corner keeps the dots away from the
 * label and the figure by construction. Five different centres so no two cards
 * carry the same texture.
 */
const bloom = (cx: number, cy: number, r: number) =>
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="360" height="360">` +
      `<defs><radialGradient id="g" cx="${cx}%" cy="${cy}%" r="${r}%">` +
      `<stop offset="0%" stop-color="#000"/>` +
      `<stop offset="45%" stop-color="#6b6b6b"/>` +
      `<stop offset="100%" stop-color="#fff"/>` +
      `</radialGradient></defs>` +
      `<rect width="360" height="360" fill="url(#g)"/></svg>`,
  );

/**
 * Multiply keeps only the dark dots on a light card; screen keeps only the light
 * ones on a dark card. Inverting in dark mode means the *same* region of the
 * ramp survives in both themes, so the bloom sits in the same corner either way
 * instead of flipping to the negative. The mask is the readability guarantee: a
 * hard fade out before the text column, whatever the source does.
 */
const ditherLayer = cn(
  "pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-multiply",
  "dark:opacity-[0.18] dark:mix-blend-screen dark:invert",
  // Anchored to the top-right corner and gone by two-thirds of the way across,
  // so it never reaches the label above or the figure below. A linear fade left
  // to right would still have run the full height of the card and read as a
  // block; a corner radial dissolves in every direction at once.
  "[mask-image:radial-gradient(95%_85%_at_100%_0%,black_0%,transparent_72%)]",
);

const cards = [
  { label: "Interactive prototypes", value: "100%", bloom: bloom(88, 14, 80) },
  { label: "Shipped to production", value: "4 apps", bloom: bloom(96, 30, 66) },
  { label: "AI in every project", value: "Daily", bloom: bloom(80, 10, 92) },
  {
    label: "Products I build",
    value: "Apps + SaaS",
    valueClassName: "text-3xl @[200px]/card:text-4xl",
    bloom: bloom(92, 22, 72),
  },
];

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-5">
      {cards.map((c) => (
        <Card
          key={c.label}
          className="@container/card relative flex min-h-56 flex-col justify-between gap-8 overflow-hidden rounded-[var(--kpi-radius)] p-[var(--kpi-padding)] shadow-xs"
        >
          <DitherShader
            src={c.bloom}
            gridSize={3}
            ditherMode="bayer"
            colorMode="grayscale"
            objectFit="cover"
            className={ditherLayer}
          />

          {/* The label wraps — two short lines sit better in the top corner than
              one line stretched across the card. */}
          <p className="relative max-w-[12ch] text-lg leading-snug text-muted-foreground">
            {c.label}
          </p>

          <p
            className={cn(
              "relative text-4xl leading-tight font-medium tracking-tight text-foreground @[220px]/card:text-5xl",
              c.valueClassName,
            )}
          >
            {c.value}
          </p>
        </Card>
      ))}

      <ToolsMarqueeCard bloom={bloom(84, 26, 78)} ditherClassName={ditherLayer} />
    </div>
  );
}
