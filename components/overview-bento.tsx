import * as React from "react";

import { caseStudies } from "@/content/case-studies";
import { CaseStudyCard } from "@/components/case-study-card";
import { ProjectsCard } from "@/components/projects-card";
import { BehanceCard } from "@/components/behance-card";
import { SocialsCard } from "@/components/socials-card";
import { PrototypesCard } from "@/components/prototypes-card";
import { ShippedCard } from "@/components/shipped-card";
import { ExperienceCard } from "@/components/experience-card";
import { ToolsCard } from "@/components/tools-card";

/**
 * The overview bento. Three explicit columns of cards; on wide screens they sit
 * side by side and stretch to equal height (`items-stretch`).
 *
 * Column one carries the two tall cards (a case study + Projects) capped by the
 * Socials card. Socials is the only flexible tile — it grows to fill whatever
 * height is left, which lands its bottom edge exactly level with the KPI cards
 * that end columns two and three. Every other card keeps its intrinsic size.
 *
 * Below @5xl the columns stack into a single flowing column.
 */

function StudyCard({ slug }: { slug: string }) {
  const c = caseStudies.find((s) => s.slug === slug);
  if (!c) return null;
  return (
    <CaseStudyCard
      href={`/case-studies/${c.slug}?from=overview`}
      name={c.name}
      tagline={c.tagline}
      mock={c.previewMock ?? c.cover.src}
    />
  );
}

function Column({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 @5xl/main:min-w-0 @5xl/main:flex-1">
      {children}
    </div>
  );
}

export function OverviewBento() {
  return (
    <div className="flex flex-col gap-4 @5xl/main:flex-row @5xl/main:items-stretch">
      <Column>
        <StudyCard slug="edge-crm" />
        <ProjectsCard />
        {/* The one flexible tile: fills the leftover height so its bottom lines
            up with the KPI cards ending the other two columns. */}
        <div className="aspect-[300/226] @5xl/main:aspect-auto @5xl/main:min-h-0 @5xl/main:flex-1">
          <SocialsCard />
        </div>
      </Column>

      <Column>
        <BehanceCard />
        <PrototypesCard />
        <ShippedCard />
      </Column>

      <Column>
        <StudyCard slug="edge-crm-case-list" />
        <ExperienceCard />
        <ToolsCard />
      </Column>
    </div>
  );
}
