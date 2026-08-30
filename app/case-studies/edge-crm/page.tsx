import type { Metadata } from "next";
import { EdgeCrmCaseStudy } from "@/components/case-study/edge-crm-case-study";

export const metadata: Metadata = {
  title: "Edge CRM — Add Case — Romeet Chatterjee",
  description:
    "Redesigning a mobile case-management flow to cut cognitive load for B2B sales teams.",
};

export default function EdgeCrmCaseStudyPage() {
  return <EdgeCrmCaseStudy />;
}
