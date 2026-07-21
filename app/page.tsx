import { SectionCards } from "@/components/section-cards";
import { ProjectsCard } from "@/components/projects-card";
import { CaseStudiesGrid } from "@/components/case-studies-grid";

export default function OverviewPage() {
  return (
    // gap-4 throughout, so the vertical space between the KPI row and the cards
    // below matches the 16px horizontal gap between the cards themselves.
    <div className="@container/main flex flex-1 flex-col gap-4 py-4 md:py-6">
      {/* Hero temporarily disabled per request — the shimmering "AI Product
          Designer" heading, its "Design + build" badge, and the intro note.
          Restore this block (and the Badge + SparklesIcon imports) to bring it
          back. */}

      <SectionCards />

      {/* Case studies sit in one unlabelled row with the Projects card in the
          third cell. No section heading, no "View all", no in-progress
          placeholder, and the build-activity card is gone. */}
      <CaseStudiesGrid from="overview" comingSoon={false} trailing={<ProjectsCard />} />
    </div>
  );
}
