"use client";

import * as React from "react";

import { caseStudies } from "@/content/case-studies";
import { CaseStudyCard } from "@/components/case-study-card";
import { ProjectsCard } from "@/components/projects-card";
import { BehanceCard } from "@/components/behance-card";
import { SocialsCard } from "@/components/socials-card";
import { PrototypesCard } from "@/components/prototypes-card";
import { VideoCard } from "@/components/video-card";
import { ToolsCard } from "@/components/tools-card";
import { useLayout } from "@/components/layout-context";

function StudyCard({ slug }: { slug: string }) {
  const c = caseStudies.find((s) => s.slug === slug);
  if (!c) return null;
  return (
    <CaseStudyCard
      slug={c.slug}
      href={`/case-studies/${c.slug}?from=overview`}
      name={c.name}
      tagline={c.tagline}
      mock={c.previewMock ?? c.cover.src}
      badge={c.badge}
    />
  );
}

function renderCard(id: string) {
  switch (id) {
    case "vote-in":
      return <StudyCard slug="vote-in" />;
    case "socials":
      return <SocialsCard />;
    case "projects":
      return <ProjectsCard />;
    case "behance":
      return <BehanceCard />;
    case "gpacts":
      return <StudyCard slug="gpacts" />;
    case "prototypes":
      return <PrototypesCard />;
    case "edge-crm":
      return <StudyCard slug="edge-crm" />;
    case "experience":
      return <VideoCard />;
    case "tools":
      return <ToolsCard />;
    default:
      return null;
  }
}

function BentoCardItem({
  id,
  colIndex,
  rowIndex,
  isLastInCol,
}: {
  id: string;
  colIndex: number;
  rowIndex: number;
  isLastInCol: boolean;
}) {
  const { isRearrangeMode, moveCard, moveCardRelative } = useLayout();
  const [isDragOver, setIsDragOver] = React.useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ cardId: id, fromCol: colIndex, fromRow: rowIndex })
    );
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    try {
      const data = JSON.parse(e.dataTransfer.getData("text/plain"));
      if (data.cardId) {
        moveCard(data.cardId, colIndex, rowIndex);
      }
    } catch {}
  };

  return (
    <div
      draggable={isRearrangeMode}
      onDragStart={handleDragStart}
      onDragOver={(e) => {
        if (isRearrangeMode) {
          e.preventDefault();
          setIsDragOver(true);
        }
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
      className={`relative transition-all duration-200 ${
        isRearrangeMode ? "cursor-grab active:cursor-grabbing hover:scale-[1.01]" : ""
      } ${isDragOver ? "ring-2 ring-purple-500 rounded-[27px] scale-[1.02]" : ""}`}
    >
      {/* Dev Rearrange Overlay Controls */}
      {isRearrangeMode && (
        <div className="absolute top-3 left-3 z-30 flex items-center gap-1 bg-black/90 backdrop-blur-md px-2 py-1 rounded-xl border border-white/30 shadow-2xl">
          <div className="text-[10px] text-purple-300 font-mono font-bold mr-1">
            C{colIndex + 1}:R{rowIndex + 1}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              moveCardRelative(colIndex, rowIndex, "left");
            }}
            disabled={colIndex === 0}
            className="size-6 flex items-center justify-center rounded-md hover:bg-white/20 text-white text-[10px] font-bold disabled:opacity-20"
            title="Move to left column"
          >
            ◀
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              moveCardRelative(colIndex, rowIndex, "up");
            }}
            disabled={rowIndex === 0}
            className="size-6 flex items-center justify-center rounded-md hover:bg-white/20 text-white text-[10px] font-bold disabled:opacity-20"
            title="Move up"
          >
            ▲
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              moveCardRelative(colIndex, rowIndex, "down");
            }}
            disabled={isLastInCol}
            className="size-6 flex items-center justify-center rounded-md hover:bg-white/20 text-white text-[10px] font-bold disabled:opacity-20"
            title="Move down"
          >
            ▼
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              moveCardRelative(colIndex, rowIndex, "right");
            }}
            disabled={colIndex === 2}
            className="size-6 flex items-center justify-center rounded-md hover:bg-white/20 text-white text-[10px] font-bold disabled:opacity-20"
            title="Move to right column"
          >
            ▶
          </button>
        </div>
      )}

      {renderCard(id)}
    </div>
  );
}

function Column({
  children,
  colIndex,
}: {
  children: React.ReactNode;
  colIndex: number;
}) {
  const { isRearrangeMode, moveCard } = useLayout();
  const [isColDragOver, setIsColDragOver] = React.useState(false);

  const handleColDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsColDragOver(false);
    try {
      const data = JSON.parse(e.dataTransfer.getData("text/plain"));
      if (data.cardId) {
        moveCard(data.cardId, colIndex, 999);
      }
    } catch {}
  };

  return (
    <div
      onDragOver={(e) => {
        if (isRearrangeMode) {
          e.preventDefault();
          setIsColDragOver(true);
        }
      }}
      onDragLeave={() => setIsColDragOver(false)}
      onDrop={handleColDrop}
      className={`flex flex-col gap-4 @5xl/main:min-w-0 @5xl/main:flex-1 rounded-2xl transition-all ${
        isColDragOver && isRearrangeMode ? "bg-purple-950/20 ring-1 ring-purple-500/50 p-1" : ""
      }`}
    >
      {children}
    </div>
  );
}

export function OverviewBento() {
  const { columns } = useLayout();

  return (
    <div className="flex flex-col gap-4 @5xl/main:flex-row @5xl/main:items-stretch">
      {columns.map((colCards, colIdx) => (
        <Column key={colIdx} colIndex={colIdx}>
          {colCards.map((cardId, rowIdx) => (
            <BentoCardItem
              key={cardId}
              id={cardId}
              colIndex={colIdx}
              rowIndex={rowIdx}
              isLastInCol={rowIdx === colCards.length - 1}
            />
          ))}
        </Column>
      ))}
    </div>
  );
}
