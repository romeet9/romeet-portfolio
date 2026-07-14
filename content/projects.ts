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
  /**
   * Four-stop mesh palette for the project tiles, sampled from the app icon's
   * own gradient so each card is the product's brand rather than a generic hue.
   * `deep` and `base` are the ground, `bloom` is the bright glow, `warm` the
   * contrasting hue that keeps the mesh from reading as a flat duotone. White
   * type has to survive on all four, so the bloom is kept off the bottom-left
   * corner where the type sits.
   */
  mesh: { deep: string; base: string; bloom: string; warm: string };
  /** Square app icon / logo for lists and tables. */
  icon?: string;
  /** Cover image (real screenshot / app icon). Omit for pure color-block tiles. */
  cover?: string;
  /** Uniform 16:10 landscape screenshot used on the Vibe Coded Projects cards. */
  shot?: string;
  /** Contain (letterbox) the shot instead of cover — for portrait screenshots. */
  shotContain?: boolean;
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
    mesh: { deep: "#1e1b4b", base: "#4338ca", bloom: "#8b5cf6", warm: "#f472b6" },
    icon: "/projects/tasky-ai/icon.svg",
    cover: "/projects/tasky-ai/cover.png",
    shot: "/projects/tasky-ai/shot.png",
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
    mesh: { deep: "#022c22", base: "#0f766e", bloom: "#34d399", warm: "#d9a441" },
    icon: "/projects/complai/icon.svg",
    shot: "/projects/complai/shot.png",
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
    mesh: { deep: "#3b0764", base: "#7c3aed", bloom: "#f472b6", warm: "#38bdf8" },
    icon: "/projects/inspoflow/icon.svg",
    shot: "/projects/inspoflow/01-home.png",
    shotContain: true,
    cover: "/projects/inspoflow/01-home.png",
    gallery: [
      "/projects/inspoflow/01-home.png",
      "/projects/inspoflow/02-analyze.png",
      "/projects/inspoflow/03-analysing.png",
      "/projects/inspoflow/04-detail.png",
    ],
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
    links: { github: "https://github.com/romeet9/ClaudeBar" },
    accent: "#eeece7",
    onAccent: "#212121",
    mesh: { deep: "#2e1065", base: "#6d5bd0", bloom: "#a78bfa", warm: "#f0abfc" },
    icon: "/projects/claudebar/icon.png",
    shot: "/projects/claudebar/shot.png",
    shotContain: true,
    cover: "/projects/claudebar/icon.png",
    coverIsIcon: true,
  },
];

export const categories: Category[] = ["Web", "iOS", "macOS"];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
