"use client";

import * as React from "react";
import initialLayout from "@/content/bento-layout.json";

export type CardId =
  | "vote-in"
  | "socials"
  | "projects"
  | "behance"
  | "gpacts"
  | "prototypes"
  | "edge-crm"
  | "experience"
  | "tools";

export interface LayoutContextValue {
  columns: string[][];
  isRearrangeMode: boolean;
  setIsRearrangeMode: (val: boolean) => void;
  moveCard: (cardId: string, targetColIndex: number, targetRowIndex: number) => void;
  moveCardRelative: (colIndex: number, rowIndex: number, direction: "up" | "down" | "left" | "right") => void;
  saveLayout: () => Promise<boolean>;
  resetLayout: () => Promise<void>;
  isSaving: boolean;
}

const DEFAULT_COLUMNS = [
  ["vote-in", "socials", "projects"],
  ["behance", "gpacts", "prototypes"],
  ["edge-crm", "experience", "tools"],
];

const LayoutContext = React.createContext<LayoutContextValue | null>(null);

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [columns, setColumns] = React.useState<string[][]>(
    (initialLayout?.columns as string[][]) || DEFAULT_COLUMNS
  );
  const [isRearrangeMode, setIsRearrangeMode] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  React.useEffect(() => {
    fetch("/api/save-layout")
      .then((res) => res.json())
      .then((data) => {
        if (data.layout?.columns) {
          setColumns(data.layout.columns);
        }
      })
      .catch(() => {});
  }, []);

  const moveCard = React.useCallback(
    (cardId: string, targetColIndex: number, targetRowIndex: number) => {
      setColumns((prev) => {
        const next = prev.map((col) => col.filter((id) => id !== cardId));
        if (targetColIndex < 0 || targetColIndex >= next.length) return prev;
        const targetCol = [...next[targetColIndex]];
        const clampedRow = Math.max(0, Math.min(targetRowIndex, targetCol.length));
        targetCol.splice(clampedRow, 0, cardId);
        next[targetColIndex] = targetCol;
        return next;
      });
    },
    []
  );

  const moveCardRelative = React.useCallback(
    (colIndex: number, rowIndex: number, direction: "up" | "down" | "left" | "right") => {
      setColumns((prev) => {
        const next = prev.map((col) => [...col]);
        const cardId = next[colIndex]?.[rowIndex];
        if (!cardId) return prev;

        if (direction === "up" && rowIndex > 0) {
          const temp = next[colIndex][rowIndex - 1];
          next[colIndex][rowIndex - 1] = cardId;
          next[colIndex][rowIndex] = temp;
        } else if (direction === "down" && rowIndex < next[colIndex].length - 1) {
          const temp = next[colIndex][rowIndex + 1];
          next[colIndex][rowIndex + 1] = cardId;
          next[colIndex][rowIndex] = temp;
        } else if (direction === "left" && colIndex > 0) {
          next[colIndex].splice(rowIndex, 1);
          next[colIndex - 1].push(cardId);
        } else if (direction === "right" && colIndex < next.length - 1) {
          next[colIndex].splice(rowIndex, 1);
          next[colIndex + 1].push(cardId);
        }

        return next;
      });
    },
    []
  );

  const saveLayout = React.useCallback(async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/save-layout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ columns }),
      });
      setIsSaving(false);
      return res.ok;
    } catch {
      setIsSaving(false);
      return false;
    }
  }, [columns]);

  const resetLayout = React.useCallback(async () => {
    setColumns(DEFAULT_COLUMNS);
    try {
      await fetch("/api/save-layout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ columns: DEFAULT_COLUMNS }),
      });
    } catch {}
  }, []);

  return (
    <LayoutContext.Provider
      value={{
        columns,
        isRearrangeMode,
        setIsRearrangeMode,
        moveCard,
        moveCardRelative,
        saveLayout,
        resetLayout,
        isSaving,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const ctx = React.useContext(LayoutContext);
  if (!ctx) {
    return {
      columns: DEFAULT_COLUMNS,
      isRearrangeMode: false,
      setIsRearrangeMode: () => {},
      moveCard: () => {},
      moveCardRelative: () => {},
      saveLayout: async () => false,
      resetLayout: async () => {},
      isSaving: false,
    };
  }
  return ctx;
}
