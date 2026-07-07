import type { Metadata } from "next";
import { FileTextIcon } from "lucide-react";

import { ExperienceTimeline } from "@/components/experience-timeline";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Experience — Romeet Chatterjee" };

export default function ExperiencePage() {
  return (
    <div className="@container/main flex flex-1 flex-col gap-6 p-4 md:gap-8 md:p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Experience</h1>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            Two years designing B2B SaaS from blank canvas to production.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          nativeButton={false}
          render={
            <a
              href="/romeet-chatterjee-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            />
          }
        >
          <FileTextIcon />
          Full résumé
        </Button>
      </div>

      <div className="max-w-3xl">
        <ExperienceTimeline />
      </div>
    </div>
  );
}
