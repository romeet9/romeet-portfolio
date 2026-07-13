import type { Metadata } from "next";

import { CaseStudiesGrid } from "@/components/case-studies-grid";

export const metadata: Metadata = {
  title: "Case studies — Romeet Chatterjee",
  description:
    "In-depth UX/UI case studies — the research, decisions and redesigns behind the work.",
};

export default function CaseStudiesPage() {
  return (
    <div className="@container/main flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Case studies</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          The research, decisions and redesigns behind the work — measured by
          what actually changed for users.
        </p>
      </div>
      <CaseStudiesGrid />
    </div>
  );
}
