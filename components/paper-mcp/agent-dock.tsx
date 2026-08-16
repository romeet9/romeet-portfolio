"use client";

import { motion } from "motion/react";

interface AgentTool {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  link: string;
}

const AGENT_TOOLS: AgentTool[] = [
  {
    id: "cursor",
    name: "Cursor",
    category: "IDE / Editor",
    imageUrl:
      "https://app.paper.design/file-assets/01K4GP58P816VYRM4TJWGWTV04/01KJ5SFKPC429W6CSPA893E12M.png",
    link: "https://paper.design/docs/mcp#connect-to-cursor",
  },
  {
    id: "claude",
    name: "Claude Code",
    category: "CLI / Desktop",
    imageUrl:
      "https://app.paper.design/file-assets/01K4GP58P816VYRM4TJWGWTV04/01KSGDFKYYXPAJNBJ2GX7MZYS7.png",
    link: "https://paper.design/docs/mcp#connect-to-claude-code-via-cli-terminal",
  },
  {
    id: "codex",
    name: "Codex",
    category: "CLI / App",
    imageUrl:
      "https://app.paper.design/file-assets/01K4GP58P816VYRM4TJWGWTV04/01KSGDJE99XJVZC37N9SP4JT1V.png",
    link: "https://paper.design/docs/mcp#connect-to-codex",
  },
  {
    id: "copilot",
    name: "GitHub Copilot",
    category: "VS Code Extension",
    imageUrl:
      "https://app.paper.design/file-assets/01K4GP58P816VYRM4TJWGWTV04/01KJ6293AYZJH55S4MXQ5SBBSF.png",
    link: "https://paper.design/docs/mcp#connect-to-copilot",
  },
  {
    id: "opencode",
    name: "OpenCode",
    category: "AI Coding Assistant",
    imageUrl:
      "https://app.paper.design/file-assets/01K4GP58P816VYRM4TJWGWTV04/01KJ61VNJYTPRZR9AZEYZAFPB7.png",
    link: "https://paper.design/docs/mcp#connect-to-opencode",
  },
  {
    id: "antigravity",
    name: "Antigravity",
    category: "Pair Programmer",
    imageUrl:
      "https://app.paper.design/file-assets/01K4GP58P816VYRM4TJWGWTV04/01KSGDHEMZMM8CMP6P1ZGQWPV7.png",
    link: "https://paper.design/docs/mcp#connect-to-antigravity",
  },
];

export function AgentDock() {
  return (
    <div className="flex flex-col items-start gap-6 w-full">
      {/* Floating Agent Dock with exact Paper computed styles */}
      <div
        className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 rounded-[18px] bg-[#FAFAFA] px-1 py-1.5"
        style={{
          boxShadow:
            "#0000000F 0px 1px 4px 1px, #0000000F 0px 2px 4px -1px, #0000000F 0px 4px 10px, #0000004D 0px 0px 1px",
        }}
      >
        <motion.a
          href={AGENT_TOOLS[0].link}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="relative flex h-16 w-16 items-center justify-center p-1"
          title={AGENT_TOOLS[0].name}
        >
          <img
            src={AGENT_TOOLS[0].imageUrl}
            alt={AGENT_TOOLS[0].name}
            className="h-16 w-16 object-contain"
          />
        </motion.a>

        {/* 1px Divider with 15% opacity */}
        <div className="relative h-[60px] w-[12px] shrink-0 flex items-center justify-center">
          <div className="h-full w-[1px] bg-[#000000] opacity-15" />
        </div>

        {AGENT_TOOLS.slice(1).map((tool) => (
          <motion.a
            key={tool.id}
            href={tool.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="relative flex h-16 w-16 items-center justify-center p-1"
            title={tool.name}
          >
            <img
              src={tool.imageUrl}
              alt={tool.name}
              className="h-16 w-16 object-contain"
            />
          </motion.a>
        ))}
      </div>

      {/* Links matching Paper typography and colors */}
      <div className="flex flex-col gap-3.5 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
          <span className="font-['Matter-Light','Matter',sans-serif] font-light text-[18px] leading-[26px] text-[#222222]">
            Desktop app
          </span>
          <a
            href="https://paper.design/downloads"
            target="_blank"
            rel="noopener noreferrer"
            className="font-['Matter-Medium','Matter',sans-serif] font-[570] text-[18px] leading-[26px] text-[#222222] hover:underline"
          >
            paper.design/downloads ↗
          </a>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
          <span className="font-['Matter-Light','Matter',sans-serif] font-light text-[18px] leading-[26px] text-[#222222]">
            How to connect your agent
          </span>
          <a
            href="https://paper.design/docs/mcp"
            target="_blank"
            rel="noopener noreferrer"
            className="font-['Matter-Medium','Matter',sans-serif] font-[570] text-[18px] leading-[26px] text-[#222222] hover:underline"
          >
            paper.design/docs/mcp ↗
          </a>
        </div>
      </div>
    </div>
  );
}
