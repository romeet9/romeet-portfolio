import { KpiGrain } from "@/components/kpi-grain";

/**
 * The fourth KPI card, from Paper's kpi-card-4: a light metallic card with the
 * "Tools" / "Altogether I use 4 tools" captions, and the four tool bursts (Figma,
 * Claude, VS Code, Framer) — live GemSmoke shaders in Paper — running as an
 * infinite marquee loop of their exported frames. A scrolling stack of eight live
 * WebGL canvases would be far too heavy; the loop reads the same, and it's a plain
 * server component with no shader context at all.
 */
const tools = ["figma", "claude", "vscode", "framer"] as const;

const LIGHT_RADIAL =
  "radial-gradient(130% 125% at 66% 20%, #f4f4f4 0%, #cbcbcb 52%, #9a9a9a 100%)";

export function ToolsCard() {
  // Duplicate the set so the -50% marquee restart is seamless.
  const track = [...tools, ...tools];

  return (
    <div
      className="relative flex min-h-[268px] flex-col justify-end overflow-hidden rounded-[22px] border-2 border-[#2d2d2d] p-5 shadow-[inset_0_0_27px_-20px_#131313]"
      style={{ backgroundColor: "#b8b8b8", backgroundImage: LIGHT_RADIAL }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute bg-[url('/kpi/card4-bg.png')] bg-cover bg-center opacity-20 mix-blend-luminosity"
        style={{ width: "178.8%", height: "178.8%", left: "-40.1%", top: "-40.1%" }}
      />
      <KpiGrain />

      {/* The tools-stack, looping. */}
      <div className="pointer-events-none absolute inset-x-0 top-2 overflow-hidden">
        <div className="flex w-max animate-marquee items-center">
          {track.map((t, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={`/kpi/tool-${t}.png`}
              alt=""
              className="-mx-3 h-[124px] w-auto shrink-0"
            />
          ))}
        </div>
      </div>

      <p className="relative font-[family-name:var(--font-instrument)] text-[16px] leading-none tracking-[-0.06em] text-[#5f5f5f]">
        Tools
      </p>
      <p className="relative mt-2 font-[family-name:var(--font-instrument)] text-[24px] leading-[26px] font-medium tracking-[-0.06em] text-black">
        Altogether I use
        <br />
        4 tools
      </p>
    </div>
  );
}
