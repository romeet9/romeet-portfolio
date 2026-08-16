import type { Metadata } from "next";
import { PaperMcpShowcase } from "@/components/paper-mcp/paper-mcp-showcase";

export const metadata: Metadata = {
  title: "Paper MCP Guide & Showcase — Design with AI Agents",
  description:
    "Explore how to design and build anything natively with Paper MCP and your favorite AI agents.",
};

export default function PaperMcpPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-4 md:py-6">
      <div className="w-full max-w-[896px] rounded-2xl bg-white text-[#222222] shadow-2xl border border-neutral-200/90 overflow-hidden relative">
        <PaperMcpShowcase />
      </div>
    </div>
  );
}
