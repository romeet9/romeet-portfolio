import { caseStudies } from "@/content/case-studies";
import { CaseStudyCard } from "@/components/case-study-card";
import { ComingSoonCaseCard } from "@/components/coming-soon-case-card";

export function CaseStudiesGrid({
  limit,
  from,
}: {
  limit?: number;
  /** Tags the card links so the case study's back button returns here. */
  from?: "overview";
}) {
  const rows = limit ? caseStudies.slice(0, limit) : caseStudies;
  const query = from ? `?from=${from}` : "";

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {rows.map((c) => (
        <CaseStudyCard
          key={c.slug}
          study={c}
          href={`/case-studies/${c.slug}${query}`}
        />
      ))}
      {!limit && <ComingSoonCaseCard />}
    </div>
  );
}
