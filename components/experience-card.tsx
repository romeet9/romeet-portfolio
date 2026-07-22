import { KpiCard } from "@/components/kpi-parts";
import { BAKED } from "@/components/halftone";

/**
 * kpi-card-3 from Paper's "Graceful petal" (artboard GQ-0).
 */
export function ExperienceCard() {
  return (
    <KpiCard
      field={BAKED.kpi3}
      eyebrow="Experience"
      caption={"I have 2 year's of\nexperience."}
    />
  );
}
