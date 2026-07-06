import Image from "next/image";

/** Ambient dark "spotlight" backdrop — dot grid, soft glow, rings, particles.
 * `accent` tints the glow/rings/particles with the chart accent (instead of
 * white) so the backdrop matches an accent-coloured element sitting on it.
 * `centerY` sets the vertical focal point (%) of the glow and concentric rings. */
export function Ambient({
  accent = false,
  centerY = 44,
}: {
  accent?: boolean;
  centerY?: number;
} = {}) {
  const particles = [
    [0.1, 0.18],
    [0.86, 0.2],
    [0.92, 0.6],
    [0.08, 0.62],
    [0.72, 0.82],
    [0.28, 0.86],
    [0.5, 0.1],
  ];
  const glow = accent
    ? "color-mix(in oklch, var(--chart-1) 16%, transparent)"
    : "rgba(255,255,255,0.11)";
  const ringColor = accent
    ? "color-mix(in oklch, var(--chart-1) 10%, transparent)"
    : "rgba(255,255,255,0.05)";
  const particleColor = accent ? "var(--chart-1)" : "#fff";
  const particleGlow = accent
    ? "color-mix(in oklch, var(--chart-1) 55%, transparent)"
    : "rgba(255,255,255,0.45)";
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 60% 55% at 50% ${centerY}%, ${glow}, transparent 70%)`,
        }}
      />
      {[380, 600, 820, 1040].map((s) => (
        <div
          key={s}
          className="absolute left-1/2 rounded-full border border-dashed"
          style={{
            top: `${centerY + 2}%`,
            width: s,
            height: s,
            transform: "translate(-50%,-50%)",
            borderColor: ringColor,
          }}
        />
      ))}
      {particles.map(([x, y], i) => (
        <div
          key={i}
          className="absolute size-[3px] rounded-full"
          style={{
            left: `${x * 100}%`,
            top: `${y * 100}%`,
            background: particleColor,
            boxShadow: `0 0 8px 2px ${particleGlow}`,
            opacity: 0.75,
          }}
        />
      ))}
    </>
  );
}

/** Uses the ready-made iPhone PNG mockup (frame + screen baked in) directly. */
function Device({ src, label }: { src: string; label: string }) {
  return (
    <figure className="flex flex-col items-center gap-4">
      <Image
        src={src}
        alt={label}
        width={1812}
        height={3648}
        sizes="(min-width: 640px) 270px, 180px"
        quality={95}
        className="h-auto w-[180px] max-w-full select-none drop-shadow-[0_34px_55px_rgba(0,0,0,0.55)] sm:w-[270px]"
      />
      <figcaption className="rounded-full border border-white/10 bg-white/5 px-3 py-0.5 font-mono text-[11px] tracking-wide text-white/70 uppercase backdrop-blur-sm">
        {label}
      </figcaption>
    </figure>
  );
}

export function BeforeAfterShowcase({
  before,
  after,
}: {
  before: string;
  after: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#0c0c0e] px-6 py-12 ring-1 ring-white/[0.07] sm:px-10 sm:py-14">
      <Ambient />
      <div className="relative flex items-center justify-center gap-8 sm:gap-20">
        <Device src={before} label="Before" />
        <Device src={after} label="After" />
      </div>
    </div>
  );
}
