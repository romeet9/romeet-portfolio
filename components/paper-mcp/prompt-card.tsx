"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

interface PromptCardProps {
  promptText: string;
}

export function PromptCard({ promptText }: PromptCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promptText);
      setCopied(true);
      toast.success("Prompt copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy prompt");
    }
  };

  return (
    <div className="relative group rounded-none bg-[#F8F8F8] p-6 outline outline-1 outline-[#E4E4E4] transition-all">
      <div className="flex items-center justify-between pb-3 border-b border-[#E4E4E4] mb-4">
        <h3 className="font-['Matter-Heavy','Matter',sans-serif] text-xl sm:text-2xl font-black text-[#222222]">
          try this prompt
        </h3>
        <button
          onClick={handleCopy}
          type="button"
          className="inline-flex items-center gap-1.5 rounded-md border border-[#E4E4E4] bg-white px-2.5 py-1.5 text-xs font-medium text-[#222222] shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-all hover:bg-[#F8F8F8] active:scale-95 cursor-pointer"
          title="Copy prompt text"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-emerald-600 font-semibold">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-[#222222]" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <p className="font-mono text-[17px] leading-[32px] text-[#222222] selection:bg-[#E4E4E4]">
        {promptText}
      </p>
    </div>
  );
}
