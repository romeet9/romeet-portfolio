// Single source of truth for every project shown on the portfolio.
// Copy is sourced from each project's README / landing page — kept factually accurate.

export type Category = "Web" | "iOS" | "macOS";

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  category: Category;
  /** 2–3 sentence description. */
  description: string;
  /** 3–5 punchy capability bullets. */
  highlights: string[];
  /** Tech tags, rendered as mono pills. */
  stack: string[];
  /** Short status label, e.g. "Shipped", "Beta". */
  status: string;
  year: string;
  links: { live?: string; github?: string };
  /** Cohere media wash behind this project's cover/wordmark. */
  accent: string;
  /** Text color that sits legibly on `accent`. */
  onAccent: string;
  /** Square app icon / logo for lists and tables. */
  icon?: string;
  /** Cover image (real screenshot / app icon). Omit for pure color-block tiles. */
  cover?: string;
  /** Is the cover a square app icon (vs. a wide screenshot)? Controls framing. */
  coverIsIcon?: boolean;
  /** Detail-page gallery. */
  gallery?: string[];
};

export const projects: Project[] = [
  {
    slug: "tasky-ai",
    name: "Tasky AI",
    tagline: "Say your morning brief out loud — get a structured, prioritized plan back.",
    category: "Web",
    description:
      "An AI planner that turns a plain-language brief into categorized tasks with subtasks and priorities. It grows into a small productivity suite — meeting capture with auto-generated minutes, team workspaces with role-based access, and an admin analytics console — for individuals and teams who want their to-do list to organize itself.",
    highlights: [
      "Brief-to-tasks AI planning with automatic categories, subtasks and priorities",
      "Meeting capture + transcription with auto-generated minutes",
      "Team workspaces, invites and role-based access control",
      "Admin dashboard: analytics, logs and user management",
      "Installable PWA with Google Calendar sync",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "Firebase", "Groq", "Framer Motion"],
    status: "Shipped",
    year: "2026",
    links: { live: "https://task-planner-seven-zeta.vercel.app" },
    accent: "#eeece7",
    onAccent: "#212121",
    icon: "/projects/tasky-ai/icon.svg",
    cover: "/projects/tasky-ai/cover.png",
    gallery: ["/projects/tasky-ai/cover.png"],
  },
  {
    slug: "complai",
    name: "Complai",
    tagline: "Compliance radar for EU e-commerce — without a lawyer.",
    category: "Web",
    description:
      "A compliance dashboard for online stores selling into the EU. You scan your store and Complai builds a live readiness gauge, a board of the regulations that actually apply to you — GPSR, EAA, VAT/IOSS, PPWR, Digital Product Passport — plus deadlines, plain-English fix checklists, and a dated audit trail of everything you've done.",
    highlights: [
      "Radial readiness gauge and KPI cards driven by a real rules engine",
      "Kanban rules board: Action needed / Upcoming / Cleared, each citing the regulation",
      "Deadline calendar timeline and exportable audit log",
      "Shopify OAuth scaffolding for a real store scan",
      "Built on shadcn/ui + Base UI, light and dark",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "shadcn/ui", "Recharts"],
    status: "MVP",
    year: "2026",
    links: { github: "https://github.com/romeet9/complai" },
    accent: "#003c33",
    onAccent: "#ffffff",
    icon: "/projects/complai/icon.svg",
  },
  {
    slug: "inspoflow",
    name: "InspoFlow",
    tagline: "Turn a messy screenshot camera roll into a searchable inspiration library.",
    category: "iOS",
    description:
      "A native iOS app for designers who live in their screenshots. It auto-detects new screenshots, runs each through a vision LLM to generate a title, summary, category and tags, then syncs everything into a searchable, Pinterest-style feed you can chat with.",
    highlights: [
      "Automatic screenshot ingestion feed",
      "Vision-LLM analysis → auto title, summary, category and tags",
      "Cloud sync of every item (Supabase database + storage)",
      "In-app AI chat over your saved inspiration",
      "Fluid mesh-gradient and shader UI, light and dark",
    ],
    stack: ["Swift", "SwiftUI", "SwiftData", "Supabase", "Firebase Auth", "Vision LLM"],
    status: "Beta",
    year: "2026",
    links: { github: "https://github.com/romeet9/InspoFlow" },
    accent: "#f1f5ff",
    onAccent: "#212121",
    icon: "/projects/inspoflow/icon.svg",
    cover: "/projects/inspoflow/01-home.png",
    gallery: [
      "/projects/inspoflow/01-home.png",
      "/projects/inspoflow/02-analyze.png",
      "/projects/inspoflow/03-analysing.png",
      "/projects/inspoflow/04-detail.png",
    ],
  },
  {
    slug: "catalyst",
    name: "CATalyst",
    tagline: "A native macOS command-center for CAT exam prep.",
    category: "macOS",
    description:
      "A desktop study planner built around the CAT (Indian MBA entrance) syllabus. It gives aspirants a Today task list, a recurring schedule planner, a full syllabus browser across VARC / DILR / QA, study-session tracking, and a motivational dashboard with progress rings — all offline.",
    highlights: [
      "Full CAT syllabus tree: sections → topics → subtopics",
      "Today view plus a recurring schedule and time-block planner",
      "Study-session punch clock with pattern analytics",
      "Progress rings and rotating motivation on the dashboard",
      "Liquid Glass UI with CoreHaptics",
    ],
    stack: ["Swift 6.2", "SwiftUI", "SwiftData", "macOS 26", "Liquid Glass"],
    status: "Packaged app",
    year: "2026",
    links: {},
    accent: "#edfce9",
    onAccent: "#212121",
    icon: "/projects/catalyst/icon.png",
    cover: "/projects/catalyst/icon.png",
    coverIsIcon: true,
  },
  {
    slug: "claudebar",
    name: "ClaudeBar",
    tagline: "Your Claude Code sessions, one click away in the menu bar.",
    category: "macOS",
    description:
      "A lightweight macOS menu-bar companion that scans your active and recent Claude Code sessions and lists them in a glassy dropdown. Jump back into any session's terminal or spin up a new one, with a launch-at-login toggle — no dock icon, always a keystroke away.",
    highlights: [
      "Menu-bar list of Claude Code sessions with one-click resume",
      "Launch a new session straight into Terminal",
      "Manual rescan and launch-at-login toggle",
      "Liquid Glass translucent panel, runs as a background utility",
    ],
    stack: ["Swift", "SwiftUI", "Tuist", "macOS 26", "Liquid Glass"],
    status: "v1.0",
    year: "2026",
    links: {},
    accent: "#eeece7",
    onAccent: "#212121",
    icon: "/projects/claudebar/icon.png",
    cover: "/projects/claudebar/icon.png",
    coverIsIcon: true,
  },
];

export const categories: Category[] = ["Web", "iOS", "macOS"];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
