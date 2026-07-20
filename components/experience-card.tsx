import { KpiCard } from "@/components/kpi-parts";

/**
 * kpi-card-3 from Paper's "Gentle nebula" (artboard 3F-0): the white briefcase
 * logo over "Experience" / "I have 2 year's of exp."
 */
export function ExperienceCard() {
  return (
    <KpiCard
      icon={
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/kpi/logo-briefcase.svg" alt="" width={40} height={40} className="shrink-0" />
      }
      eyebrow="Experience"
      caption="I have 2 year's of exp."
    />
  );
}
