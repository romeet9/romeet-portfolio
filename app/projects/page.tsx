import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { CaseStudiesGrid } from "@/components/case-studies-grid";
import { ProjectsTable } from "@/components/projects-table";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Projects — Romeet Chatterjee" };

export default function ProjectsPage() {
  return (
    <div className="@container/main flex flex-1 flex-col gap-8 p-4 md:gap-10 md:p-6">
      {/* Case studies */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              Case studies
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Deep UX work — research, decisions and redesigns, measured by what
              changed for users.
            </p>
          </div>
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
        <CaseStudiesGrid />
      </section>

      {/* Products */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Products</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Five products designed and shipped across web, iOS and macOS — each
            built end-to-end in close partnership with AI.
          </p>
        </div>
        <ProjectsTable />
      </section>
    </div>
  );
}
