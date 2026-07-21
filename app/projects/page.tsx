import type { Metadata } from "next";

import { VibeProjectShowcase } from "@/components/vibe-project-showcase";

export const metadata: Metadata = {
  title: "Vibe Coded Projects — Romeet Chatterjee",
};

export default function ProjectsPage() {
  return (
    <div className="@container/main flex flex-1 flex-col gap-4 py-4 md:py-6">
      {/* Visible heading, badge and intro removed to match the overview and the
          case studies page. The h1 stays for screen readers and SEO. */}
      <h1 className="sr-only">Vibe Coded Projects</h1>

      <VibeProjectShowcase />
    </div>
  );
}
