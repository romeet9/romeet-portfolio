import { KpiCard } from "@/components/kpi-parts";

/**
 * kpi-card-1 from Paper's "Gentle nebula" (artboard 3Y-0): the white Claude
 * logo over "Interactive prototypes" / "Ships a clickable build."
 */
export function PrototypesCard() {
  return (
    <KpiCard
      icon={
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/kpi/logo-claude.svg" alt="" width={40} height={40} className="shrink-0" />
      }
      eyebrow="Interactive prototypes"
      caption="Ships a clickable build."
    />
  );
}
