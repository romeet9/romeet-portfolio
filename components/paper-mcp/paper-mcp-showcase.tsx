"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface AgentTool {
  id: string;
  name: string;
  imageUrl: string;
  link: string;
}

const AGENT_TOOLS: AgentTool[] = [
  {
    id: "cursor",
    name: "Cursor",
    imageUrl:
      "https://app.paper.design/file-assets/01K4GP58P816VYRM4TJWGWTV04/01KJ5SFKPC429W6CSPA893E12M.png",
    link: "https://paper.design/docs/mcp#connect-to-cursor",
  },
  {
    id: "claude",
    name: "Claude Code",
    imageUrl:
      "https://app.paper.design/file-assets/01K4GP58P816VYRM4TJWGWTV04/01KSGDFKYYXPAJNBJ2GX7MZYS7.png",
    link: "https://paper.design/docs/mcp#connect-to-claude-code-via-cli-terminal",
  },
  {
    id: "codex",
    name: "Codex",
    imageUrl:
      "https://app.paper.design/file-assets/01K4GP58P816VYRM4TJWGWTV04/01KSGDJE99XJVZC37N9SP4JT1V.png",
    link: "https://paper.design/docs/mcp#connect-to-codex",
  },
  {
    id: "copilot",
    name: "GitHub Copilot",
    imageUrl:
      "https://app.paper.design/file-assets/01K4GP58P816VYRM4TJWGWTV04/01KJ6293AYZJH55S4MXQ5SBBSF.png",
    link: "https://paper.design/docs/mcp#connect-to-copilot",
  },
  {
    id: "opencode",
    name: "OpenCode",
    imageUrl:
      "https://app.paper.design/file-assets/01K4GP58P816VYRM4TJWGWTV04/01KJ61VNJYTPRZR9AZEYZAFPB7.png",
    link: "https://paper.design/docs/mcp#connect-to-opencode",
  },
  {
    id: "antigravity",
    name: "Antigravity",
    imageUrl:
      "https://app.paper.design/file-assets/01K4GP58P816VYRM4TJWGWTV04/01KSGDHEMZMM8CMP6P1ZGQWPV7.png",
    link: "https://paper.design/docs/mcp#connect-to-antigravity",
  },
];

export function PaperMcpShowcase() {
  const [copied, setCopied] = useState(false);
  const promptText =
    "Explore a design for an expense tracking app in Paper. Create a single screen showing an expense entry. Use sans-serif typography and bright color to create visual interest, but keep it clean and minimal at the same time.";

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
    <div className="relative mx-auto w-full flex justify-center [letter-spacing:normal]">
      {/* ========================================================================= */}
      {/* DESKTOP EXACT 1:1 CANVAS (Matches Paper 832x3380 Geometry & Styling)      */}
      {/* ========================================================================= */}
      <div
        className="hidden md:block relative w-[832px] h-[3380px] overflow-hidden antialiased select-none"
        style={{
          fontSynthesis: "none",
          backgroundImage:
            "url(https://app.paper.design/file-assets/01K4GP58P816VYRM4TJWGWTV04/01K4PXG0T1S34BYY4S4PAENZ13.png)",
          backgroundSize: "round(100%, 0.5px)",
          backgroundPosition: "0px 0px",
          backgroundRepeat: "repeat",
        }}
      >
        {/* Step 2 Background Card */}
        <div
          className="absolute bg-[#F8F8F8]"
          style={{
            width: "511px",
            height: "383px",
            left: "161px",
            top: "993px",
            outline: "1px solid #E4E4E4",
          }}
        />

        {/* Step 1 Background Card */}
        <div
          className="absolute bg-[#F8F8F8]"
          style={{
            width: "511px",
            height: "447px",
            left: "161px",
            top: "417px",
          }}
        />

        {/* Hero Title */}
        <div
          className="absolute font-sans font-[570] text-[#222222] whitespace-pre-wrap"
          style={{
            fontSize: "28px",
            lineHeight: "32px",
            width: "504px",
            left: "168px",
            top: "160px",
            letterSpacing: "-0.01em",
          }}
        >
          design or build anything
          <br />
          with your favorite AI agent
        </div>

        {/* Hero Subtitle */}
        <div
          className="absolute font-sans font-light text-[#222222]"
          style={{
            fontSize: "28px",
            lineHeight: "32px",
            width: "504px",
            left: "168px",
            top: "288px",
            letterSpacing: "-0.01em",
          }}
        >
          you can use your own AI tools to read and write from Paper natively via
          MCP
        </div>

        {/* Prompt Card: Heading */}
        <div
          className="absolute font-sans font-black text-[#222222] flex items-center justify-between"
          style={{
            fontSize: "28px",
            lineHeight: "32px",
            width: "414px",
            left: "209px",
            top: "1033px",
            letterSpacing: "0.01em",
          }}
        >
          <span>try this prompt</span>
          <button
            onClick={handleCopy}
            type="button"
            className="cursor-pointer inline-flex items-center gap-1 rounded bg-white px-2 py-1 text-xs font-medium text-[#222222] border border-[#E4E4E4] shadow-xs hover:bg-[#F8F8F8] active:scale-95 transition-all"
            title="Copy prompt"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-emerald-600" />
                <span className="text-emerald-600">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3 text-[#222222]" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Prompt Card: Text */}
        <div
          className="absolute font-mono text-[#222222]"
          style={{
            fontSize: "17px",
            lineHeight: "32px",
            width: "415px",
            left: "209px",
            top: "1125px",
            letterSpacing: "0",
          }}
        >
          {promptText}
        </div>

        {/* Step 1 Text */}
        <div
          className="absolute font-sans font-light text-[#222222]"
          style={{
            fontSize: "18px",
            lineHeight: "26px",
            letterSpacing: "0.01em",
            width: "371px",
            left: "231px",
            top: "477px",
          }}
        >
          install the Paper desktop app if you haven’t, and connect your agent
          to the MCP server
        </div>

        {/* Feature Callout Text */}
        <div
          className="absolute font-sans font-light text-[#222222]"
          style={{
            fontSize: "18px",
            lineHeight: "26px",
            letterSpacing: "0.01em",
            width: "400px",
            left: "169px",
            top: "1400px",
          }}
        >
          The MCP server in Paper provides fine-tuned tools and instructions for
          your agent to help it create a beautiful and functional design.
        </div>

        {/* Claude Code Terminal Subtitle */}
        <div
          className="absolute font-sans font-light text-[#222222]"
          style={{
            fontSize: "18px",
            lineHeight: "26px",
            letterSpacing: "0.01em",
            width: "400px",
            left: "169px",
            top: "1522px",
          }}
        >
          Here’s this prompt single-shot with Claude Code:
        </div>

        {/* Final Narrative Text */}
        <div
          className="absolute font-sans font-light text-[#222222] whitespace-pre-wrap"
          style={{
            fontSize: "18px",
            lineHeight: "26px",
            letterSpacing: "0.01em",
            width: "503px",
            left: "169px",
            top: "2743px",
          }}
        >
          From here you can keep iterating on the design with the agent, tweak
          it yourself, ask it to build a prototype in React, or fully integrate
          it into your codebase.
          <br />
          <br />
          Because Paper is based on web technology and LLMs are really good at
          understanding it, the results can be impressive.
        </div>

        {/* Anchor 'A' Glyph */}
        <div
          className="absolute font-sans font-[570] text-[#222222] flex items-center justify-center text-center"
          style={{
            width: "64px",
            height: "64px",
            left: "96px",
            top: "96px",
            fontSize: "60px",
            lineHeight: "64px",
            letterSpacing: "-0.01em",
          }}
        >
          A
        </div>

        {/* 4 Corner 5px Dots for 'A' Badge (#DDDDDD) */}
        <div
          className="absolute bg-[#DDDDDD]"
          style={{ width: "5px", height: "5px", left: "94px", top: "94px" }}
        />
        <div
          className="absolute bg-[#DDDDDD]"
          style={{ width: "5px", height: "5px", left: "158px", top: "94px" }}
        />
        <div
          className="absolute bg-[#DDDDDD]"
          style={{ width: "5px", height: "5px", left: "158px", top: "158px" }}
        />
        <div
          className="absolute bg-[#DDDDDD]"
          style={{ width: "5px", height: "5px", left: "94px", top: "158px" }}
        />

        {/* Step 1 Badge (32x32 #222222 with '1') */}
        <div
          className="absolute bg-[#222222] flex items-center justify-center"
          style={{ width: "32px", height: "32px", left: "129px", top: "385px" }}
        >
          <span
            className="font-sans font-[670] text-white"
            style={{ fontSize: "18px", lineHeight: "100%" }}
          >
            1
          </span>
        </div>

        {/* Step 2 Badge (32x32 #222222 with '2') */}
        <div
          className="absolute bg-[#222222] flex items-center justify-center"
          style={{ width: "32px", height: "32px", left: "129px", top: "961px" }}
        >
          <span
            className="font-sans font-[670] text-white"
            style={{ fontSize: "18px", lineHeight: "100%" }}
          >
            2
          </span>
        </div>

        {/* Mobile Expense Screen Backdrop Container (#D7D3D0) */}
        <div
          className="absolute bg-[#D7D3D0] overflow-hidden"
          style={{
            width: "513px",
            height: "1088px",
            left: "160px",
            top: "1568px",
          }}
        >
          <div
            className="absolute bg-cover bg-position-[50%]"
            style={{
              width: "390px",
              height: "950px",
              left: "50%",
              top: "calc(50% + 289px)",
              translate: "-50% -50%",
              backgroundImage:
                "url(https://app.paper.design/file-assets/01K4GP58P816VYRM4TJWGWTV04/01KJ8G2ZH3YEBZRSC3T73F606W.png)",
            }}
          />
        </div>

        {/* Claude Code Screenshot */}
        <div
          className="absolute bg-cover bg-position-[50%]"
          style={{
            width: "936px",
            height: "1117px",
            left: "71px",
            top: "2963px",
            backgroundImage:
              "url(https://app.paper.design/file-assets/01K4GP58P816VYRM4TJWGWTV04/01KJ5ZRT1X3Y6Z18WW7WKDQYTD.png)",
          }}
        />

        {/* Agent Tool Dock */}
        <div
          className="absolute flex items-center justify-center px-1 rounded-[18px] bg-[#FAFAFA]"
          style={{
            height: "70px",
            width: "fit-content",
            left: "214px",
            top: "573px",
            boxShadow:
              "#0000000F 0px 1px 4px 1px, #0000000F 0px 2px 4px -1px, #0000000F 0px 4px 10px, #0000004D 0px 0px 1px",
          }}
        >
          {/* Cursor */}
          <a
            href={AGENT_TOOLS[0].link}
            target="_blank"
            rel="noopener noreferrer"
            className="h-16 w-16 shrink-0 bg-cover bg-position-[50%] block hover:scale-105 transition-transform"
            style={{ backgroundImage: `url(${AGENT_TOOLS[0].imageUrl})` }}
            title={AGENT_TOOLS[0].name}
          />

          {/* Divider */}
          <div className="relative h-[60px] w-[12px] shrink-0">
            <div
              className="absolute left-1/2 top-0 bottom-0 w-px bg-black opacity-15"
              style={{ translate: "-50%" }}
            />
          </div>

          {/* Other Tools */}
          {AGENT_TOOLS.slice(1).map((tool) => (
            <a
              key={tool.id}
              href={tool.link}
              target="_blank"
              rel="noopener noreferrer"
              className="h-16 w-16 shrink-0 bg-cover bg-position-[50%] block hover:scale-105 transition-transform"
              style={{ backgroundImage: `url(${tool.imageUrl})` }}
              title={tool.name}
            />
          ))}
        </div>

        {/* Link 1: Desktop App */}
        <div
          className="absolute font-sans font-light text-[#222222]"
          style={{
            fontSize: "18px",
            lineHeight: "26px",
            letterSpacing: "0.01em",
            left: "231px",
            top: "685px",
          }}
        >
          Desktop app
        </div>
        <a
          href="https://paper.design/downloads"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute font-sans font-[570] text-[#222222] hover:underline"
          style={{
            fontSize: "18px",
            lineHeight: "26px",
            letterSpacing: "0.01em",
            left: "231px",
            top: "711px",
          }}
        >
          paper.design/downloads
        </a>

        {/* Link 2: How to Connect */}
        <div
          className="absolute font-sans font-light text-[#222222]"
          style={{
            fontSize: "18px",
            lineHeight: "26px",
            letterSpacing: "0.01em",
            left: "231px",
            top: "761px",
          }}
        >
          How to connect your agent
        </div>
        <a
          href="https://paper.design/docs/mcp"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute font-sans font-[570] text-[#222222] hover:underline"
          style={{
            fontSize: "18px",
            lineHeight: "26px",
            letterSpacing: "0.01em",
            left: "231px",
            top: "787px",
          }}
        >
          paper.design/docs/mcp
        </a>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE ADAPTIVE VIEW (<832px)                                              */}
      {/* ========================================================================= */}
      <div
        className="block md:hidden w-full max-w-[504px] px-4 py-8 antialiased text-[#222222]"
        style={{
          backgroundImage:
            "url(https://app.paper.design/file-assets/01K4GP58P816VYRM4TJWGWTV04/01K4PXG0T1S34BYY4S4PAENZ13.png)",
          backgroundSize: "round(100%, 0.5px)",
          backgroundPosition: "0px 0px",
          backgroundRepeat: "repeat",
        }}
      >
        <div className="flex flex-col gap-10">
          {/* Header */}
          <div className="flex flex-col items-start gap-4">
            <div className="relative flex h-14 w-14 items-center justify-center font-sans text-4xl font-[570] text-[#222222] border border-[#DDDDDD]">
              A
            </div>
            <h1 className="font-sans text-2xl font-[570] leading-tight text-[#222222]">
              design or build anything
              <br />
              with your favorite AI agent
            </h1>
            <p className="font-sans text-xl font-light leading-snug text-[#222222]">
              you can use your own AI tools to read and write from Paper natively
              via MCP
            </p>
          </div>

          {/* Step 1 */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center bg-[#222222] text-xs font-[670] text-white">
                1
              </span>
              <p className="font-sans text-base font-light text-[#222222]">
                install the Paper desktop app if you haven’t, and connect your
                agent to the MCP server
              </p>
            </div>

            <div className="rounded-lg bg-[#F8F8F8] p-4 outline outline-1 outline-[#E4E4E4]">
              <div className="flex flex-wrap items-center justify-center gap-1 rounded-[18px] bg-[#FAFAFA] p-2 shadow-sm">
                {AGENT_TOOLS.map((tool) => (
                  <a
                    key={tool.id}
                    href={tool.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-12 w-12 shrink-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${tool.imageUrl})` }}
                  />
                ))}
              </div>
              <div className="mt-4 flex flex-col gap-2 text-sm text-[#222222]">
                <a
                  href="https://paper.design/downloads"
                  className="font-[570] underline"
                >
                  paper.design/downloads
                </a>
                <a
                  href="https://paper.design/docs/mcp"
                  className="font-[570] underline"
                >
                  paper.design/docs/mcp
                </a>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center bg-[#222222] text-xs font-[670] text-white">
                2
              </span>
              <h2 className="font-sans text-xl font-black text-[#222222]">
                try this prompt
              </h2>
            </div>

            <div className="rounded-lg bg-[#F8F8F8] p-4 outline outline-1 outline-[#E4E4E4]">
              <div className="flex justify-end pb-2">
                <button
                  onClick={handleCopy}
                  type="button"
                  className="inline-flex items-center gap-1 rounded bg-white px-2 py-1 text-xs border border-[#E4E4E4]"
                >
                  {copied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <p className="font-mono text-sm leading-relaxed text-[#222222]">
                {promptText}
              </p>
            </div>

            <p className="font-sans text-sm font-light leading-relaxed text-[#222222]">
              The MCP server in Paper provides fine-tuned tools and instructions
              for your agent to help it create a beautiful and functional design.
            </p>

            <div className="bg-[#D7D3D0] p-4 rounded-lg overflow-hidden flex justify-center">
              <img
                src="https://app.paper.design/file-assets/01K4GP58P816VYRM4TJWGWTV04/01KJ8G2ZH3YEBZRSC3T73F606W.png"
                alt="Expense App Mockup"
                className="max-w-full h-auto"
              />
            </div>

            <p className="font-sans text-sm font-light text-[#222222] pt-2">
              Here’s this prompt single-shot with Claude Code:
            </p>

            <div className="overflow-hidden rounded-lg">
              <img
                src="https://app.paper.design/file-assets/01K4GP58P816VYRM4TJWGWTV04/01KJ5ZRT1X3Y6Z18WW7WKDQYTD.png"
                alt="Claude Code Run"
                className="w-full h-auto"
              />
            </div>

            <div className="font-sans text-sm font-light leading-relaxed text-[#222222] pt-2">
              From here you can keep iterating on the design with the agent,
              tweak it yourself, ask it to build a prototype in React, or fully
              integrate it into your codebase.
              <br />
              <br />
              Because Paper is based on web technology and LLMs are really good
              at understanding it, the results can be impressive.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
