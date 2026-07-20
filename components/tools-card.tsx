import { KpiCard } from "@/components/kpi-parts";

/**
 * kpi-card-4 from Paper's "Gentle nebula" (artboard 2M-0): three white tool
 * marks spread across the row (Claude PNG, then two SVGs overlapped by -8px),
 * over "Most used Tools" / "Altogether I use 3 tools."
 */
export function ToolsCard() {
  return (
    <KpiCard
      iconRowClassName="gap-2"
      icon={
        <>
          <div
            className="size-10 shrink-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/kpi/tool-claude.png')" }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/kpi/tool-mid.svg" alt="" width={28} height={41} className="shrink-0" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/kpi/tool-right.svg" alt="" width={40} height={40} className="shrink-0" />
        </>
      }
      eyebrow="Most used Tools"
      caption="Altogether I use 3 tools."
    />
  );
}
