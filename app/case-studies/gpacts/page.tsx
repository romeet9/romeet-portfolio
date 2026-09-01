import type { Metadata } from "next";
import { GpactsCaseStudy } from "@/components/case-study/gpacts-case-study";

export const metadata: Metadata = {
  title: "GPACTS Pharma Tech Congress — Case Study — Romeet Chatterjee",
  description:
    "Designing a high-conversion digital summit experience for India's top pharma technology leaders.",
};

export default function GpactsCaseStudyPage() {
  return <GpactsCaseStudy />;
}
