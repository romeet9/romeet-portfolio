/**
 * The dark ground every generated card sits on — the same language as the
 * rising-action illustrations in the Add Case study: a near-black #0c0c0e field,
 * a faint dotted grid, concentric dashed rings and a few star specks, centred on
 * a soft radial glow.
 *
 * It is the default artwork when a card has no image, which is what lets a card
 * whose photograph hasn't arrived yet still look deliberate. Pass `children` to
 * put a subject in front of it.
 */

// Scattered specks, positioned like the ones in the rendered illustrations.
const SPECKS = [
  "top-[12%] left-[18%] size-[3px] opacity-70",
  "top-[8%] left-[62%] size-[3px] opacity-60",
  "top-[26%] left-[86%] size-[3px] opacity-50",
  "top-[46%] left-[9%] size-[3px] opacity-45",
  "top-[58%] left-[92%] size-[3px] opacity-40",
];

const RINGS = ["size-[220px]", "size-[340px]", "size-[460px]", "size-[580px]"];

export function CardCanvas({ children }: { children?: React.ReactNode }) {
  return (
    <div aria-hidden className="absolute inset-0 bg-[#0c0c0e]">
      <div className="absolute inset-0 [background-image:radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:22px_22px]" />

      <div className="absolute top-[34%] left-1/2 -translate-x-1/2 -translate-y-1/2">
        {RINGS.map((size) => (
          <div
            key={size}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/[0.035] ${size}`}
          />
        ))}
      </div>

      <div className="absolute top-[32%] left-1/2 size-80 -translate-x-1/2 -translate-y-1/2 animate-glow rounded-full bg-white/[0.11] blur-3xl" />

      {SPECKS.map((s) => (
        <span key={s} className={`absolute rounded-full bg-white ${s}`} />
      ))}

      {children}
    </div>
  );
}
