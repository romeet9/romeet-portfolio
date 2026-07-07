// Work history — sourced verbatim from the May 2026 resume.

export type Job = {
  role: string;
  company: string;
  period: string;
  /** One-line product context. */
  context: string;
  /** 2–3 impact bullets. */
  points: string[];
  /** Headline KPI featured on the role card. */
  metric: { value: string; label: string };
  accent: string;
};

export const jobs: Job[] = [
  {
    role: "UI/UX Designer",
    company: "12 Grids",
    period: "Oct 2025 — Present",
    context:
      "Edge CRM — a B2B SaaS CRM for sales teams. Joined mid-redesign and set the direction for the entire product.",
    points: [
      "Reduced case-management drop-off from 30% → 0% (and 44% → 0%) through a user-centered redesign informed by 20+ interviews and iterative usability testing.",
      "Cut average task-completion time from 52s to near-instant by rethinking information architecture and core interaction patterns.",
      "The redesign became the benchmark for every remaining module — management shelved existing work in its favor.",
    ],
    metric: { value: "30% → 0%", label: "Case drop-off eliminated" },
    accent: "#3cffd0",
  },
  {
    role: "UI/UX Designer",
    company: "Maity Innovations",
    period: "Oct 2024 — May 2025",
    context:
      "MDB — a real estate SaaS platform. Owned design end-to-end: information architecture, flows, design system and three dashboards.",
    points: [
      "Built a design system and component library from scratch in Figma — later designers thanked me for its documentation and structure.",
      "Designed end-to-end flows for property listing, buying and builder hiring, structuring long forms to stay fast and low-friction.",
      "Created customer, service-provider and admin dashboards, including a payment hold-and-release flow for the transaction system.",
    ],
    metric: { value: "3", label: "Dashboards + design system" },
    accent: "#5200ff",
  },
  {
    role: "UI/UX Design Intern",
    company: "House of Artist",
    period: "Jun 2024 — Sep 2024",
    context: "A design agency delivering high-velocity work across varied industries.",
    points: [
      "Designed 15+ apps at agency pace — high-fidelity mockups and interactive prototypes across finance, healthcare and consumer.",
      "Handoff quality called out by the company owner: structured, annotated, dev-ready files that eliminated implementation guesswork.",
    ],
    metric: { value: "15+", label: "Apps designed" },
    accent: "#ff5cc8",
  },
];

export const education = {
  school: "Dr. B.C. Roy Engineering College",
  degree: "BCA",
  period: "2021 — 2024",
};
