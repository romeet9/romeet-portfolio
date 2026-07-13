import Link from "next/link";
import { ArrowRightIcon, SparklesIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { SectionCards } from "@/components/section-cards";
import { GithubContributions } from "@/components/github-contributions";
import { ProjectsCard } from "@/components/projects-card";
import { CaseStudiesGrid } from "@/components/case-studies-grid";
import { Button } from "@/components/ui/button";

export default function OverviewPage() {
  return (
    <div className="@container/main flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="flex flex-col gap-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <h1
            className="animate-text-shimmer text-xl font-semibold tracking-tight sm:text-2xl"
            style={{
              backgroundImage:
                "linear-gradient(110deg, var(--foreground) 42%, var(--chart-1) 50%, var(--foreground) 58%)",
              backgroundSize: "220% 100%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            AI Product Designer
          </h1>
          <Badge
            variant="secondary"
            className="gap-1.5 transition-transform hover:scale-105"
          >
            <SparklesIcon className="size-3.5 animate-twinkle text-chart-1" />
            Design + build
          </Badge>
        </div>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          I don&apos;t wait for engineering to ship. I turn ideas into{" "}
          <span className="font-medium text-foreground">interactive, coded prototypes</span>,
          use AI <span className="font-medium text-foreground">extensively</span> across
          research, design, and build, and ship real products to production.
        </p>
      </div>

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
