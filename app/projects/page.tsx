import type { Metadata } from "next";
import { SparklesIcon } from "lucide-react";

import { VibeProjectShowcase } from "@/components/vibe-project-showcase";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Vibe Coded Projects — Romeet Chatterjee",
};

export default function ProjectsPage() {
  return (
    <div className="@container/main flex flex-1 flex-col gap-6 py-4 md:gap-8 md:py-6">
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-xl font-semibold tracking-tight">
            Vibe Coded Projects
          </h1>
          <Badge variant="secondary" className="gap-1.5">
            <SparklesIcon className="size-3.5 text-chart-1" />
            Designed + shipped with AI
          </Badge>
        </div>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Products I vibe-coded end-to-end across web, iOS and macOS — each taken
          from idea to a working, shipped build in close partnership with AI.
        </p>
      </div>

      <VibeProjectShowcase />
    </div>
  );
}
