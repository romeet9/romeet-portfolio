import type { Metadata } from "next";

import { CaseStudiesGrid } from "@/components/case-studies-grid";

export const metadata: Metadata = {
  title: "Case studies — Romeet Chatterjee",
  description:
    "In-depth UX/UI case studies — the research, decisions and redesigns behind the work.",
};

export default function CaseStudiesPage() {
  return (
    <div className="@container/main flex flex-1 flex-col gap-4 py-4 md:py-6">
      {/* The visible heading and intro are gone, matching the overview. The h1
          stays for screen readers and SEO — a page with no heading at all is a
          real accessibility regression. */}
      <h1 className="sr-only">Case studies</h1>

      {/* No in-progress placeholder, same as the overview. */}
      <CaseStudiesGrid comingSoon={false} />
    </div>
  );
}
