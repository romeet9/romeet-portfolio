import * as React from "react";

import { caseStudies } from "@/content/case-studies";
import { CaseStudyCard } from "@/components/case-study-card";
import { ProjectsCard } from "@/components/projects-card";
import { BehanceCard } from "@/components/behance-card";
import { SocialsCard } from "@/components/socials-card";
import { PrototypesCard } from "@/components/prototypes-card";
import { ExperienceCard } from "@/components/experience-card";
import { ToolsCard } from "@/components/tools-card";

/**
 * The overview bento. Three explicit columns of cards; on wide screens they sit
 * side by side and stretch to equal height (`items-stretch`).
 *
 * Each column sums to exactly 1328 proportional units with matched baselines:
 * - Column 1: Vote IN (516) + Socials (296) + Projects (516) = 1328
 * - Column 2: Behance (516) + GPACTS (516) + Prototypes (296) = 1328
 * - Column 3: Edge CRM (516) + Experience (406) + Tools (406) = 1328
 */

function StudyCard({ slug }: { slug: string }) {
  const c = caseStudies.find((s) => s.slug === slug);
  if (!c) return null;
  return (
    <CaseStudyCard
      slug={c.slug}
      href={`/case-studies/${c.slug}?from=overview`}
      name={c.name}
      tagline={c.tagline}
      mock={c.previewMock ?? c.cover.src}
      badge={c.badge}
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
        <StudyCard slug="vote-in" />
        <SocialsCard />
        <ProjectsCard />
      </Column>

      <Column>
        <BehanceCard />
        <StudyCard slug="gpacts" />
        <PrototypesCard />
      </Column>

      <Column>
        <StudyCard slug="edge-crm" />
        <ExperienceCard />
        <ToolsCard />
      </Column>
    </div>
  );
}
