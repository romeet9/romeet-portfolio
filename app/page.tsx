import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { SectionCards } from "@/components/section-cards";
import { GithubContributions } from "@/components/github-contributions";
import { ProjectsCard } from "@/components/projects-card";
import { CaseStudiesGrid } from "@/components/case-studies-grid";
import { Button } from "@/components/ui/button";

export default function OverviewPage() {
  return (
    <div className="@container/main flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6">
      {/* Hero temporarily disabled per request — the shimmering "AI Product
          Designer" heading, its "Design + build" badge, and the intro note.
          Restore this block (and the Badge + SparklesIcon imports) to bring it
          back. */}

      <SectionCards />

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Case studies</h2>
          <Button
            variant="ghost"
            size="sm"
            nativeButton={false}
            render={<Link href="/case-studies" />}
          >
            View all
            <ArrowRightIcon />
          </Button>
        </div>
        <CaseStudiesGrid from="overview" />
      </div>

      <div className="grid items-stretch gap-4 @4xl/main:grid-cols-3">
        <div className="@4xl/main:col-span-2">
          <GithubContributions />
        </div>
        <ProjectsCard />
      </div>
    </div>
  );
}
