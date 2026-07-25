import type * as React from "react";

import { caseStudies } from "@/content/case-studies";
import { CaseStudyCard } from "@/components/case-study-card";
import { ComingSoonCaseCard } from "@/components/coming-soon-case-card";

export function CaseStudiesGrid({
  limit,
  from,
  comingSoon = true,
  trailing,
}: {
  limit?: number;
  /** Tags the card links so the case study's back button returns here. */
  from?: "overview";
  /** Whether to append the in-progress placeholder card. */
  comingSoon?: boolean;
  /** Rendered as the last cell — the overview puts the Projects card here. */
  trailing?: React.ReactNode;
}) {
  const rows = limit ? caseStudies.slice(0, limit) : caseStudies;
  const query = from ? `?from=${from}` : "";

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {rows.map((c) => (
        <CaseStudyCard
          key={c.slug}
          href={`/case-studies/${c.slug}${query}`}
          name={c.name}
          tagline={c.tagline}
          mock={c.previewMock ?? c.cover.src}
        />
      ))}
      {comingSoon && !limit && <ComingSoonCaseCard />}
      {trailing}
    </div>
  );
}
