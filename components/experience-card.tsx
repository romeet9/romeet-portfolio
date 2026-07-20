"use client";

import { KpiBurst, KpiCard } from "@/components/kpi-parts";

/**
 * kpi-card-3 from Paper's "Gentle nebula" (artboard 3F-0): the orange briefcase
 * burst, "Experience" / "I have 2 year's of experience".
 */
export function ExperienceCard() {
  return (
    <KpiCard
      icons={
        <div className="flex items-center justify-end self-stretch">
          <KpiBurst
            image="/kpi/gem-briefcase.svg"
            colors={["#FFFFFF"]}
            colorInner="#FF4E00"
          />
        </div>
      }
      eyebrow="Experience"
      caption={"I have 2 year's of\nexperience"}
    />
  );
}
