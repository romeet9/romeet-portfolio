// The nine cards on the Overview, in reading order.
//
// One flat array drives both layouts: the desktop 3-column grid fills row-major
// from it, and the mobile deck snaps through it top to bottom. Two orders would
// be two things to keep in sync.
//
// To swap a card's artwork, drop the file at the path below — no code change.
// A card with no `image` renders the dark generated canvas instead, so a missing
// file degrades to something deliberate rather than a hole.

export type OverviewCard = {
  id: string;
  /** Absent → the card isn't a link (the KPI cards and the tools card). */
  href?: string;
  image?: { src: string; alt: string; zoom?: boolean };
  eyebrow: string;
  title: string;
  detail: string;
  /** Cards whose artwork is generated rather than photographic. */
  render?: "coming-soon" | "tools";
};

export const overviewCards: OverviewCard[] = [
  // ── Row 1: what I do ──────────────────────────────────────────────────────
  {
    id: "prototypes",
    eyebrow: "Coded, not mocked",
    title: "Interactive prototypes",
    detail:
      "Every idea leaves my hands as a build you can click, not a flat mock — Framer and real front-end code, so the thing being reviewed is the thing that ships.",
    image: {
      src: "/overview/kpi-prototypes.png",
      alt: "An interactive prototype running in the browser",
    },
  },
  {
    id: "shipped",
    eyebrow: "Web · iOS · macOS",
    title: "Shipped to production",
    detail:
      "Four products live in the world, not four concepts in a portfolio. Next.js 16 on the web, SwiftUI on Apple platforms.",
    image: {
      src: "/overview/kpi-shipped.png",
      alt: "Shipped products running on web, iOS and macOS",
    },
  },
  {
    id: "ai",
    eyebrow: "Claude Code, daily",
    title: "AI in every project",
    detail:
      "AI runs through the whole process, not a step in it — research, exploration, build and handoff. It's how I design at the speed I ship.",
    image: {
      src: "/overview/kpi-ai.png",
      alt: "Designing and building with AI",
    },
  },

  // ── Row 2: case studies ───────────────────────────────────────────────────
  {
    id: "edge-crm",
    href: "/case-studies/edge-crm?from=overview",
    eyebrow: "12 Grids · 2026",
    title: "Edge CRM — Add Case",
    detail:
      "Redesigning a mobile case-management flow to cut cognitive load for B2B sales teams.",
    image: {
      src: "/projects/edge-crm/add-case-cover-hand.png",
      alt: "Edge CRM Add Case screen on a hand-held iPhone",
      zoom: true,
    },
  },
  {
    id: "edge-crm-case-list",
    href: "/case-studies/edge-crm-case-list?from=overview",
    eyebrow: "12 Grids · 2026",
    title: "Edge CRM — Case List",
    detail:
      "Redesigning the case list a rep opens every morning — figure-ground, the F-shaped scan, and cards that triage at a glance.",
    image: {
      src: "/case-studies/case-list/cover-hand.png",
      alt: "Edge CRM Case List screen on a hand-held iPhone",
    },
  },
  {
    id: "case-detail",
    render: "coming-soon",
    eyebrow: "12 Grids · 2026",
    title: "Edge CRM — Case Detail",
    detail:
      "The third screen. Deep case context: timeline, attachments and actions in one view. Currently in the works.",
  },

  // ── Row 3: what I've built ────────────────────────────────────────────────
  {
    id: "tasky-ai",
    href: "/projects/tasky-ai",
    eyebrow: "Web · Shipped · 2026",
    title: "Tasky AI",
    detail:
      "Say your morning brief out loud and get a structured, prioritized plan back — subtasks, categories, meeting minutes and team workspaces.",
    image: {
      src: "/overview/tasky-ai.png",
      alt: "Tasky AI planner",
    },
  },
  {
    id: "inspoflow",
    href: "/projects/inspoflow",
    eyebrow: "iOS · Beta · 2026",
    title: "InspoFlow",
    detail:
      "Turns a messy screenshot camera roll into a searchable inspiration library — a vision model titles, tags and files every shot for you.",
    image: {
      src: "/overview/inspoflow.png",
      alt: "InspoFlow inspiration library on iOS",
    },
  },
  {
    id: "tools",
    render: "tools",
    eyebrow: "Design + build",
    title: "Tools I use",
    detail:
      "Figma to think, Claude Code to build, Framer to prototype, VS Code for everything else.",
  },
];
