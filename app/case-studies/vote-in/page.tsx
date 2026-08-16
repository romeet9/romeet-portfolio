import type { Metadata } from "next";
import { VoteInCaseStudy } from "@/components/case-study/vote-in-case-study";

export const metadata: Metadata = {
  title: "Vote IN — Case Study — Romeet Chatterjee",
  description:
    "A digital platform for the Indian citizens to cast and verify their vote online. 0 to 1 product design.",
};

export default function VoteInCaseStudyPage() {
  return <VoteInCaseStudy />;
}
