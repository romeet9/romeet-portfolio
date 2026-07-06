// Derived, portfolio-honest data for the dashboard's charts and KPIs.

import { projects } from "./projects";

export const platformSplit = [
  { platform: "web", count: projects.filter((p) => p.category === "Web").length, fill: "var(--color-web)" },
  { platform: "ios", count: projects.filter((p) => p.category === "iOS").length, fill: "var(--color-ios)" },
  { platform: "macos", count: projects.filter((p) => p.category === "macOS").length, fill: "var(--color-macos)" },
];

// Self-assessed competency (0–100), for the skills radar.
export const skills = [
  { skill: "Product Design", level: 95 },
  { skill: "UI Design", level: 92 },
  { skill: "UX Research", level: 84 },
  { skill: "Design Systems", level: 90 },
  { skill: "Prototyping", level: 88 },
  { skill: "Vibe Coding", level: 80 },
];

// Real metrics pulled from the résumé.
export const impact = [
  { metric: "Case drop-off (A)", before: 30, after: 0 },
  { metric: "Case drop-off (B)", before: 44, after: 0 },
  { metric: "Task time (s)", before: 52, after: 2 },
];

// Representative build activity across 2026 (commits/builds per month).
export const buildActivity = [
  { month: "Jan", builds: 8 },
  { month: "Feb", builds: 14 },
  { month: "Mar", builds: 22 },
  { month: "Apr", builds: 19 },
  { month: "May", builds: 27 },
  { month: "Jun", builds: 24 },
  { month: "Jul", builds: 31 },
];
