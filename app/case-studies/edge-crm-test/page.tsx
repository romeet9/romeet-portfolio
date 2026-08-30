import type { Metadata } from "next";
import { EdgeCrmTestCaseStudy } from "@/components/case-study/edge-crm-test-case-study";

export const metadata: Metadata = {
  title: "Edge CRM — Add Case (Test) — Romeet Chatterjee",
  description:
    "Test build — Redesigning the Edge CRM Add Case mobile flow based on the Paper canvas design.",
};

export default function EdgeCrmTestCaseStudyPage() {
  return <EdgeCrmTestCaseStudy />;
}
