// UX/UI case studies — the deep design-process work, kept separate from the
// shipped-product `projects` list. Each entry drives /case-studies/[slug].
//
// Edge CRM is structured as a Hero's Journey (6 acts): Intro, Inflection Point,
// Rising Action, Climax, Falling Action, Resolution. Copy stays factual and in
// Romeet's voice: short lines, no em dashes.

import {
  ChevronsUpDownIcon,
  CircleAlertIcon,
  CircleHelpIcon,
  ClockIcon,
  EyeOffIcon,
  FileWarningIcon,
  GaugeIcon,
  InfinityIcon,
  LayersIcon,
  LightbulbIcon,
  PencilRulerIcon,
  RouteIcon,
  SmartphoneIcon,
  SparklesIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  TriangleAlertIcon,
  WandSparklesIcon,
  type LucideIcon,
} from "lucide-react";

/** A headline result stat shown in the outcome strip. */
export type CaseMetric = {
  value: string;
  label: string;
  sub?: string;
  icon: LucideIcon;
};

/** The hero/listing showcase image. */
export type CaseImage = {
  src: string;
  alt: string;
  w: number;
  h: number;
};

/** A titled sub-point rendered as a card, item row, or bento tile. */
export type CasePoint = {
  title: string;
  desc: string;
  icon: LucideIcon;
  /** Optional 3D illustration (path under /public). Falls back to the icon. */
  illustration?: string;
};

/** A row in the brainstorming matrix: a finding, the action, and the ideas. */
export type BrainstormRow = {
  finding: string;
  findingNote?: string;
  action: string;
  actionNote?: string;
  ideas: string[];
};

/** A highlighted region on a before/after screen, as % of the image box. */
export type RedesignMarker = {
  top: number;
  left: number;
  width: number;
  height: number;
};

/** One before→after change shown in the redesign connector diagram. */
export type RedesignChange = {
  title: string;
  reason: string;
  before: RedesignMarker;
  after: RedesignMarker;
};

/** The redesign act's before/after diagram data. */
export type RedesignData = {
  before: CaseImage;
  after: CaseImage;
  changes: RedesignChange[];
  /** Annotation card prefix ("Change" default, e.g. "Fix" for Solutions). */
  cardLabel?: string;
  /** Set false when the before screenshot already has its markers baked in. */
  drawBeforeMarkers?: boolean;
  /** Set true when before/after are pre-framed device mockups (skip the ring). */
  framed?: boolean;
};

/** A user-testing finding, optionally linked to a spot on the tested mockup. */
export type UserTestingFinding = {
  title: string;
  desc: string;
  /** y% on the mockup to draw a connector to (omit for findings with no marker). */
  markerY?: number;
};

/** The user-testing act's mockup + annotations diagram data. */
export type UserTestingData = {
  phone: CaseImage;
  findings: UserTestingFinding[];
};

/** Which chart to render inside an act. */
export type ChartKind = "timeToAnswer" | "journeyTimeline" | "impact" | "errorRate";

/** One beat of the Hero's Journey. */
export type Act = {
  n: number;
  /** Hero's Journey step name. */
  step: string;
  /** Short human label for the in-page nav. */
  kicker: string;
  title: string;
  icon: LucideIcon;
  /** Narrative lead paragraphs. */
  lead: string[];
  /** Charts to render in this act. */
  charts?: ChartKind[];
  /** Finding / decision sub-points. */
  points?: CasePoint[];
  /** How to render the points. */
  pointsAs?: "cards" | "items" | "bento" | "spotlightCards";
  /** Label prefix for spotlightCards KPI cards (e.g. "Friction" → "Friction 01"). */
  kpiLabel?: string;
  /** Brainstorming matrix rows (dedicated act). */
  brainstorm?: BrainstormRow[];
  /** Before/after redesign connector diagram (dedicated act). */
  redesign?: RedesignData;
  /** User-testing mockup + annotations diagram (dedicated act). */
  userTesting?: UserTestingData;
  /** Premium final-design showcase: a framed mockup on a dark backdrop. */
  finalImage?: { src: string; alt: string };
  /** Recreated Case List UI section (native shadcn-card sections). */
  caseListSection?: "anatomy" | "iterations";
  /** A blank iPhone mockup placeholder. */
  mockup?: { label: string; state?: string };
  /** A before/after two-phone showcase on a dark backdrop. */
  beforeAfter?: { before: string; after: string };
};

export type CaseStudy = {
  slug: string;
  name: string;
  tagline: string;
  year: string;
  role: string;
  company: string;
  skills: string[];
  cover: CaseImage;
  /** The framing "How might we" question — rendered as its own section. */
  hmw: string;
  /** Headline result stats (top strip). */
  metrics: CaseMetric[];
  /** The Hero's Journey. */
  acts: Act[];
  links?: { live?: string; figma?: string };
  /** Teaser CTA for the next case study in the series. */
  next?: { kicker: string; name: string; tagline: string; href?: string };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "edge-crm",
    name: "Edge CRM — Add Case",
    tagline:
      "Redesigning a mobile case-management flow to cut cognitive load for B2B sales teams.",
    year: "2026",
    role: "Sole UI/UX Designer",
    company: "12 Grids",
    skills: ["Information-heavy UI", "Usability testing", "B2B SaaS"],
    cover: {
      src: "/projects/edge-crm/add-case-cover.png",
      alt: "The redesigned Edge CRM Add Case screen held in hand, showing the inline validation state",
      w: 1672,
      h: 941,
    },
    hmw: "How might we help reps log, scan, and understand the full context of a client case, fast, without navigating across multiple screens?",
    metrics: [
      { value: "40%", label: "Faster case logging", sub: "3–4 min to under 2 min", icon: GaugeIcon },
      { value: "80%", label: "Field error rate, before", sub: "Same mistake, every session", icon: TriangleAlertIcon },
      { value: "~52s", label: "Old time-to-answer", sub: "Across the full old flow", icon: ClockIcon },
      { value: "3", label: "Screens redesigned", sub: "Add Case · List · Detail", icon: SmartphoneIcon },
    ],
    acts: [
      {
        n: 1,
        step: "Intro",
        kicker: "The problem",
        title: "A rep, mid-call, on a form that fought back",
        icon: FileWarningIcon,
        lead: [
          "Edge CRM is an AI-driven platform that helps B2B sales and support teams log, track, and resolve client cases every single day.",
          "Field sales reps at 12 Grids open it many times a day. Often mid-client-call, in high-pressure moments where every second counts.",
          "Every case starts on one screen: Add Case. It was the entry point of the whole flow, and where most reps gave up.",
        ],
        beforeAfter: {
          before: "/projects/edge-crm/01-before.png",
          after: "/projects/edge-crm/06-final.png",
        },
      },
      {
        n: 2,
        step: "Inflection Point",
        kicker: "The pain",
        title: "Every step added time, effort, and doubt",
        icon: TrendingDownIcon,
        lead: [
          "By the time a rep had an answer, the client had already lost confidence.",
          "Timing the old flow end-to-end showed how the seconds stacked up. A heuristic audit showed why.",
        ],
        charts: ["journeyTimeline"],
        points: [
          {
            title: "Entire form, no end",
            desc: "One endless scroll with zero progress indicator. The rep can't gauge how long it will take, so the brain defaults to avoidance.",
            icon: InfinityIcon,
          },
          {
            title: "Dropdown vs text field",
            desc: "Every field looks identical: an underline with a chevron. You can't tell a dropdown from a text field until you tap. One mistake per field, across the whole form.",
            icon: ChevronsUpDownIcon,
          },
          {
            title: "Important fields hidden",
            desc: "Required and optional fields look the same. A red asterisk is the only signal. No grouping, no hierarchy, no sense of what is critical.",
            icon: EyeOffIcon,
          },
        ],
        pointsAs: "spotlightCards",
        kpiLabel: "Friction",
      },
      {
        n: 3,
        step: "Rising Action",
        kicker: "What didn't work",
        title: "Tracing why reps kept failing",
        icon: RouteIcon,
        lead: [
          "I traced the rep's real path through the flow, step by step, to pinpoint exactly where time, effort, and confidence were lost.",
          "The form wasn't missing features. It asked too much, too soon, with no way to tell what actually mattered.",
        ],
        points: [
          {
            title: "No end in sight",
            desc: "Reps scrolled to the bottom to estimate effort before filling anything.",
            icon: InfinityIcon,
            illustration: "/illustrations/act3-no-end-3d.png",
          },
          {
            title: "Too much asked at once",
            desc: "The entire form sat on a single screen.",
            icon: LayersIcon,
            illustration: "/illustrations/act3-overload-3d.png",
          },
          {
            title: "Text field or dropdown?",
            desc: "Impossible to tell before tapping.",
            icon: CircleHelpIcon,
            illustration: "/illustrations/act3-ambiguous-3d.png",
          },
          {
            title: "80% error rate",
            desc: "The same mistake, from every rep, every session.",
            icon: CircleAlertIcon,
            illustration: "/illustrations/act3-error-3d.png",
          },
        ],
        pointsAs: "bento",
      },
      {
        n: 4,
        step: "Brainstorming & Ideating",
        kicker: "The ideation",
        title: "Turning every pain point into a design direction",
        icon: LightbulbIcon,
        lead: [
          "To translate every pain point into a concrete design direction, I worked out what to fix, what to remove, and what to rebuild.",
        ],
        brainstorm: [
          {
            finding: "Unstructured long form",
            findingNote: "Reps scrolled to the bottom to estimate effort before filling anything.",
            action: "Convert into a 3-step flow",
            actionNote: "Clear progress improves completion confidence.",
            ideas: [
              "Add a step progress bar at the top so reps immediately know how much of the form remains.",
              "Break the long form into clear sections like Overview, Case Date, and Business Details.",
              "Add section labels at the top of each step so users always know the context of what they're filling.",
            ],
          },
          {
            finding: "Fields looked visually identical",
            findingNote: "Impossible to tell a dropdown from a text field before tapping.",
            action: "Introduce clear field differentiation",
            actionNote: "Make every field say what it is.",
            ideas: [
              "Replace underline inputs with card-style bordered fields to show where interaction happens.",
              "Add a chevron icon on dropdown fields so users instantly recognize selectable lists.",
            ],
          },
          {
            finding: "Validation feedback was unclear",
            findingNote: "Users refilled the entire form repeatedly.",
            action: "Introduce explicit error guidance",
            actionNote: "Tell users exactly what failed and how to fix it.",
            ideas: [
              "Display a clear error banner at the top summarizing what needs fixing before submission.",
              "Use specific messages like “Please add a case subject” instead of generic validation errors.",
              "Highlight failed inputs with a distinct red border to draw attention to the problem field.",
            ],
          },
        ],
      },
      {
        n: 5,
        step: "Climax",
        kicker: "The turn",
        title: "One flow, broken into steps reps could trust",
        icon: WandSparklesIcon,
        lead: [
          "The fix was clear. Stop asking for everything at once. Break the form into steps. Make every field say what it is. Pre-fill what the system already knows.",
        ],
      },
      {
        n: 6,
        step: "Re-designing",
        kicker: "The build",
        title: "Turning decisions into a flow reps could trust",
        icon: PencilRulerIcon,
        lead: [
          "To turn those decisions into a working interface, I restructured the form, clarified the inputs, and gave reps a flow they could actually trust.",
        ],
        redesign: {
          framed: true,
          before: {
            src: "/projects/edge-crm/01-before.png",
            alt: "The old Add Case form: one long scroll of underline fields",
            w: 1812,
            h: 3648,
          },
          after: {
            src: "/projects/edge-crm/06-final.png",
            alt: "The redesigned Add Case screen: stepped, grouped, and validated",
            w: 1812,
            h: 3648,
          },
          changes: [
            {
              title: "Stepped flow + progress bar",
              reason: "One long scroll, now clear stepped sections.",
              before: { top: 8.5, left: 3, width: 46, height: 5.5 },
              after: { top: 12, left: 3, width: 94, height: 5.5 },
            },
            {
              title: "Notification section",
              reason: "Flags any issues before reps submit.",
              before: { top: 8, left: 76, width: 21, height: 6 },
              after: { top: 20, left: 3, width: 94, height: 11 },
            },
            {
              title: "Grouped, pre-filled fields",
              reason: "Grouped card fields, known values pre-filled.",
              before: { top: 54, left: 3, width: 94, height: 26 },
              after: { top: 55.5, left: 2, width: 96, height: 14 },
            },
            {
              title: "Full-width primary CTA",
              reason: "One full-width button, always in reach.",
              before: { top: 85, left: 75, width: 22, height: 9 },
              after: { top: 87, left: 2, width: 96, height: 7 },
            },
          ],
        },
      },
      {
        n: 7,
        step: "User Testing",
        kicker: "The test",
        title: "Testing the redesign with real reps",
        icon: TrendingUpIcon,
        lead: [
          "To measure whether the redesign actually reduced time, errors, and confusion, I put it in front of real reps and watched them work.",
        ],
        userTesting: {
          phone: {
            src: "/projects/edge-crm/05-testing.png",
            alt: "The redesigned Add Case tested with reps, with the two friction points flagged",
            w: 1812,
            h: 3648,
          },
          findings: [
            {
              title: "Completion time down 40%",
              desc: "Reps who took three to four minutes now finish the form in under two.",
            },
            {
              title: "Progress felt invisible",
              desc: "The thin progress line didn't tell reps how many steps remained or which step they were on.",
              markerY: 14,
            },
            {
              title: "Pre-filled fields went unnoticed",
              desc: "Reps didn't realize Line of Business and Business Unit were pre-filled, and tapped to change them.",
              markerY: 65,
            },
          ],
        },
      },
      {
        n: 8,
        step: "Solutions & Action Items",
        kicker: "The refinement",
        title: "Refining the design after testing",
        icon: WandSparklesIcon,
        lead: [
          "To address the usability gaps that surfaced in testing, I refined the design once more before final handoff.",
        ],
        redesign: {
          framed: true,
          before: {
            src: "/projects/edge-crm/05-testing.png",
            alt: "The tested Add Case, with the two friction points flagged",
            w: 1812,
            h: 3648,
          },
          after: {
            src: "/projects/edge-crm/06-final.png",
            alt: "The refined Add Case: stepped tabs, pre-fill ticks, and a product hint",
            w: 1812,
            h: 3648,
          },
          cardLabel: "Fix",
          drawBeforeMarkers: false,
          changes: [
            {
              title: "Stepped tab flow",
              reason:
                "Overview, Type, Assignee with directional arrows showing reps exactly where they are and what is next.",
              before: { top: 11, left: 3, width: 60, height: 4 },
              after: { top: 12, left: 3, width: 94, height: 5.5 },
            },
            {
              title: "Green border + tick on pre-filled fields",
              reason:
                "Line of Business and Business Unit read as visually distinct, so reps instantly see what the system filled.",
              before: { top: 58, left: 2, width: 96, height: 14 },
              after: { top: 55, left: 2, width: 96, height: 14 },
            },
            {
              title: "Contextual hint on Product Name",
              reason:
                "\"Select the product related to this case\" tells reps what the dropdown contains before they tap.",
              before: { top: 74, left: 2, width: 96, height: 6 },
              after: { top: 71, left: 2, width: 96, height: 9 },
            },
          ],
        },
      },
      {
        n: 9,
        step: "Final Design",
        kicker: "The result",
        title: "The redesigned Add Case screen",
        icon: SparklesIcon,
        lead: [
          "A stepped, scannable Add Case screen where structure, field types, and validation are unambiguous. A rep can log a case in under two minutes.",
          "This case study focuses on Add Case, one screen in a three-screen redesign of Add Case, Case List, and Case Detail.",
        ],
        finalImage: {
          src: "/projects/edge-crm/06-final.png",
          alt: "The final redesigned Edge CRM Add Case screen",
        },
      },
    ],
    links: {},
    next: {
      kicker: "Next in the Edge CRM redesign",
      name: "Case List",
      tagline:
        "The screen every rep opens each morning — ten or twenty cases that all looked the same. Up next: how reps scan, triage, and act at a glance.",
      href: "/case-studies/edge-crm-case-list",
    },
  },
  {
    slug: "edge-crm-case-list",
    name: "Edge CRM — Case List",
    tagline:
      "Redesigning the case list a rep opens every morning — figure-ground, the F-shaped scan, and cards that triage at a glance.",
    year: "2026",
    role: "Sole UI/UX Designer",
    company: "12 Grids",
    skills: ["Information architecture", "Gestalt & visual hierarchy", "Mobile B2B"],
    cover: {
      src: "/case-studies/case-list/cover-hand.png",
      alt: "The redesigned Edge CRM Cases screen — filter chips and colour-coded priority cards — held in hand",
      w: 3584,
      h: 4312,
    },
    hmw: "Which case needs me right now?",
    metrics: [
      { value: "~52s", label: "Old time-to-answer", sub: "the shared cross-screen cost", icon: ClockIcon },
      { value: "10–20", label: "Cases each morning", sub: "all demanding attention at once", icon: LayersIcon },
      { value: "4", label: "Card iterations", sub: "before the F-shape clicked", icon: PencilRulerIcon },
      { value: "F-shaped", label: "Reading pattern", sub: "designed with the eye, not against it", icon: RouteIcon },
    ],
    acts: [
      {
        n: 1,
        step: "Intro",
        kicker: "The problem",
        title: "The screen a rep opens every morning",
        icon: SmartphoneIcon,
        lead: [
          "Case List is the screen a rep at 12 Grids opens every single morning. Sometimes 10 cases. Sometimes 20. All demanding attention at the same time.",
          "It was a flat, undifferentiated list — every case carried equal weight, so the rep did all of the triage in their own head.",
        ],
        beforeAfter: {
          before: "/case-studies/case-list/before.png",
          after: "/case-studies/case-list/after.png",
        },
      },
      {
        n: 2,
        step: "Brainstorming & Ideating",
        kicker: "The ideation",
        title: "Turning the triage problem into a design direction",
        icon: LightbulbIcon,
        lead: [
          "I broke the screen down into three failures — visual hierarchy, information architecture, and interaction design — and worked each one into a concrete direction.",
        ],
        brainstorm: [
          {
            finding: "No visual boundary",
            findingNote:
              "Every case had equal weight — the Gestalt figure-ground principle was completely broken.",
            action: "Establish visual hierarchy first",
            actionNote: "Everything else comes after.",
            ideas: [
              "White card on a grey background — figure-ground separation restored.",
              "Card border radius — each case becomes a distinct, interactive object.",
              "Consistent padding — whitespace isn't empty space, it's breathing room.",
            ],
          },
          {
            finding: "No information architecture",
            findingNote:
              "Status and priority were missing or buried — the cognitive load sat entirely on the rep.",
            action: "Surface the right information at the right time",
            actionNote: "The IA should do the thinking, not the user.",
            ideas: [
              "Priority label on the right — High, Standard, Low.",
              "F-shaped reading flow — name, date, company across the top; status bottom-left; priority bottom-right.",
              "Red, amber, green — the rep triages before they even realise they're doing it.",
            ],
          },
          {
            finding: "Poor interaction design",
            findingNote:
              "A secondary action owned the primary real estate — the search bar violated Hick's Law on every scroll.",
            action: "Progressive disclosure",
            actionNote: "Show what's needed. Hide what's not.",
            ideas: [
              "Search moved to a header icon — revealed only when intentionally triggered.",
              "Filter chips introduced alongside status — All, In Review, Queued.",
              "A dedicated filter chip for advanced filtering — separate from status segmentation.",
            ],
          },
        ],
      },
      {
        n: 3,
        step: "Why F-shaped",
        kicker: "The science",
        title: "Designing with the eye, not against it",
        icon: RouteIcon,
        lead: [
          "Nielsen Norman Group ran eye-tracking tests across thousands of users, and the result was always the same: people don't read screens, they scan them — and that scan follows one pattern, every single time.",
          "Two horizontal passes across the top. One vertical drop down the left. That's the F.",
          "So instead of fighting natural behaviour, I designed with it — every piece of information a rep needs sits exactly where their eye already goes, before they consciously decide to look.",
        ],
      },
      {
        n: 4,
        step: "The F-shaped layout",
        kicker: "The card anatomy",
        title: "Three questions, answered in one scan",
        icon: LayersIcon,
        lead: [
          "The case card maps straight onto that scan — three questions answered in the exact order the eye already travels.",
          "Top row (name · date · company) answers what the case is, when, and who it's for. Bottom-left (In Review · Queued · Resolved) answers whether it's active or done. Bottom-right (High · Standard · Low) answers how urgent it is.",
        ],
        caseListSection: "anatomy",
      },
      {
        n: 5,
        step: "Re-designing",
        kicker: "The build",
        title: "The before, the changes, and the after",
        icon: PencilRulerIcon,
        lead: [
          "I rebuilt the list around figure-ground and the F-scan — four changes did most of the work, each pulling one question to where the eye already looks.",
        ],
        redesign: {
          framed: true,
          before: {
            src: "/case-studies/case-list/before.png",
            alt: "The un-redesigned Case list in an iPhone frame: a flat list under a persistent search bar",
            w: 1812,
            h: 3648,
          },
          after: {
            src: "/case-studies/case-list/after.png",
            alt: "The redesigned Cases screen in an iPhone frame: filter chips and colour-coded cards",
            w: 1812,
            h: 3648,
          },
          changes: [
            {
              title: "Filter chips, not a search bar",
              reason: "The persistent search became All / In Review / Queued chips.",
              before: { top: 17.5, left: 9, width: 83, height: 4 },
              after: { top: 16, left: 9, width: 83, height: 4.5 },
            },
            {
              title: "Card-based layout",
              reason: "Flat rows became cards on a grey field — each case its own object.",
              before: { top: 24, left: 8, width: 84, height: 7 },
              after: { top: 21.5, left: 9, width: 82, height: 12 },
            },
            {
              title: "One compact metadata line",
              reason: "Date and company collapsed onto a single line.",
              before: { top: 38, left: 9, width: 42, height: 5 },
              after: { top: 38, left: 11, width: 46, height: 3.5 },
            },
            {
              title: "Colour-coded status + priority",
              reason: "A status pill and priority label — triage at a glance.",
              before: { top: 55, left: 77, width: 17, height: 3.5 },
              after: { top: 66, left: 9, width: 82, height: 6 },
            },
          ],
        },
      },
      {
        n: 6,
        step: "Component Breakdown",
        kicker: "Behind the screens",
        title: "Four iterations to get the card right",
        icon: WandSparklesIcon,
        lead: [
          "The card didn't arrive in one shot — it took four iterations to get right.",
          "Iteration 1 led with an alphanumeric case ID, built for the system, not the rep. Iteration 2 swapped in a case name but stacked three metadata rows and two competing colours. Iteration 3 collapsed metadata onto one line, yet priority still dominated before the case name — reps were reading, not scanning. Iteration 4 put the status pill bottom-left and moved priority bottom-right, and the F-shape finally clicked: what, when, who — answered in sequence.",
        ],
        caseListSection: "iterations",
      },
      {
        n: 7,
        step: "Final Design",
        kicker: "The result",
        title: "The redesigned Case List",
        icon: SparklesIcon,
        lead: [
          "A scannable, colour-coded Cases list where figure-ground, the F-shaped card, and status-first triage let a rep answer \"which case needs me right now?\" in a single glance.",
          "This case study focuses on Case List, one screen in a three-screen redesign of Add Case, Case List, and Case Detail.",
        ],
        finalImage: {
          src: "/case-studies/case-list/after.png",
          alt: "The final redesigned Edge CRM Case List screen",
        },
      },
    ],
    links: {},
    next: {
      kicker: "Next in the Edge CRM redesign",
      name: "Case Detail",
      tagline:
        "The screen a rep opens mid-call — needing one answer, fast. Up next: surfacing the right detail without the scroll.",
    },
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
