import type { Metadata } from "next";
import { EdgeCrmTestCaseStudy } from "@/components/case-study/edge-crm-test-case-study";

export const metadata: Metadata = {
  title: "Edge CRM (Test) — Paper Canvas Implementation",
  description:
    "Test version of the Edge CRM case study with Paper Canvas components, HalftoneDots shaders, Bento feature grids, and Table frame.",
};

export default function EdgeCrmTestCaseStudyPage() {
  return <EdgeCrmTestCaseStudy />;
}
