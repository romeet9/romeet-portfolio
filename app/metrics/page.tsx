import type { Metadata } from "next";

import { GithubContributions } from "@/components/github-contributions";
import {
  ImpactChart,
  PlatformChart,
  SkillsChart,
} from "@/components/portfolio-charts";

export const metadata: Metadata = { title: "Metrics — Romeet Chatterjee" };

export default function MetricsPage() {
  return (
    <div className="@container/main flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Metrics</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          The portfolio, quantified — build activity, platform coverage, design
          competency, and measured product impact.
        </p>
      </div>

      <GithubContributions />

      <div className="grid gap-4 @3xl/main:grid-cols-2">
        <PlatformChart />
        <SkillsChart />
        <ImpactChart />
      </div>
    </div>
  );
}
