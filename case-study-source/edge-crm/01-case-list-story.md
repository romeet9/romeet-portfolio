# Edge CRM — The Case List Redesign

The full presentation deck for the **Case List** chapter, in narrative order.
All copy below is verbatim from the Figma frames (grammar/typos preserved from
source; noted where relevant). Each section maps to one slide.

---

## Slide 01 — The 52-second problem
`node 2:139` · `assets/slides/01-the-52-second-problem.png`

Framing headline:

> Every step in the old flow added time, effort, and cognitive load. By the time
> the rep had an answer the client had already lost confidence.

Journey timeline (5 steps, cumulative friction):

| Step | Action | Delta |
|------|--------|-------|
| 1 | Opens app to find the case | ~8 sec |
| 2 | Scrolls entire list to locate the case | +14 sec · 14% slower ↑ |
| 3 | Taps into individual case detail | +11 sec · 22% slower ↑ |
| 4 | Scans wall of data to find information | +19 sec · 31% slower ↑ |
| 5 | Answers the client with information | **~52 sec** total ↑ |

Takeaway:

> A simple client question — "what's the status of my case?" — was costing a sales
> rep 52 seconds of active searching across the screens. That's not a small
> friction. That's a broken experience.

---

## Slide 02 — Case List: the screen a rep opens every morning
`node 33:235` · `assets/slides/02-case-list-intro.png`

Title: **Case List**

> The screen a rep opens every single morning. Sometimes 10 cases. Sometimes 20.
> All demanding attention at the same time.

The framing question this screen had to answer:

> **Which case needs me right now?**

---

## Slide 03 — Brainstorming & Ideating
`node 33:240` · `assets/slides/03-brainstorming-ideating.png`

A 3-column matrix: **Major Findings → Action's to take → Brainstorming (Thinking
out loud): How can I solve it?**

### Finding 1 — No visual boundary
- **Finding:** Every case had equal weight. The Gestalt principle of figure-ground
  was completely broken.
- **Action:** Establish visual hierarchy first. Everything else comes after.
- **Ideas:**
  - White card on grey background. Figure-ground separation restored.
  - Card border radius. Each case becomes a distinct interactive object.
  - Consistent padding. Whitespace is not empty space, it is breathing room.

### Finding 2 — No information architecture
- **Finding:** Status and priority were either missing or buried. The cognitive
  load was entirely on the rep.
- **Action:** Surface the right information at the right time. The IA should do the
  thinking, not the user.
- **Ideas:**
  - Priority label on the right. High, Standard, Low.
  - F-shaped reading flow. Case name, date, company across the top. Status bottom
    left. Priority bottom right.
  - Red, amber, green. The rep triages before they even realise they are doing it.

### Finding 3 — Poor interaction design
- **Finding:** A secondary action owned the primary real estate. The search bar was
  violating Hick's Law on every single scroll.
- **Action:** Progressive disclosure. Show what is needed. Hide what is not.
- **Ideas:**
  - Search moved to header icon. Revealed only when intentionally triggered.
  - Filter chip introduced alongside status chips. All, In Review, Queued.
  - Dedicated filter chip for advanced filtering. Separate from status segmentation.

---

## Slide 04 — Why F-Shaped pattern
`node 33:304` · `assets/slides/04-why-f-shaped-pattern.png`

Title: **Why F-Shaped pattern** · subhead: *The science behind it*

> Nielsen Norman Group ran eye tracking tests across thousands of users. The result
> was always the same. Users never read screens. They scan them. And that scan
> follows one pattern — every single time.

> Two horizontal passes across the top. One vertical drop down the left.

> That's the F. So instead of fighting natural human behaviour, I designed with it.
> Every piece of information a rep needs sits exactly where their eye already goes.
> Before they consciously decide to look.

---

## Slide 05 — The F-Shaped Layout
`node 33:317` · `assets/slides/05-the-f-shaped-layout.png`

How the case card maps onto the F-scan — three questions answered in sequence:

| Position on card | Data | Question answered |
|------------------|------|-------------------|
| Top row | Case name, Date registered, Company name | **What is this case? When? Who is it for?** |
| Bottom left | In Review · Queued · Resolved | **Is this case active or done?** |
| Bottom right | High · Standard · Low | **How urgent is this?** |

---

## Slide 06 — Before / Redesign / After
`node 33:325` · `assets/slides/06-before-redesign-after.png`

### Before — what was broken
- Zero visual differentiation between cases — flat list, no cards, no grouping.
- Critical metadata hidden — no date, no assignee, no priority at list level.
- Status label insufficient — "Open/Closed" does not communicate urgency.
- Low information density done wrong — sparse but not scannable.
- No iconography — text-only metadata increased reading load.

### Redesign — the changes (before → after connectors)
1. Replaced persistent search bar with filter chips — **All, In Review, Queued** —
   for instant status-based segmentation.
2. Introduced card-based layout with figure-ground separation so every case has its
   own visual boundary.
3. Surfaced date and company name on a single compact metadata line with a dot
   separator.
4. Colour coded status pill and priority label on every card — triage at a glance,
   zero extra taps.

### After — the redesigned list
Header: **Cases** · filter chips: `Filter · All · In Review · Queued · Resolved`.

Sample cards on the "After" screen:

| Case | Date | Company | Status | Priority |
|------|------|---------|--------|----------|
| Android application performance improvement | Feb 10, 2025 | Techwise Ltd. | In Review | Standard Priority |
| Web app UI redesign | Mar 15, 2025 | DesignHub Inc. | In Review | High Priority |
| Cross-platform compatibility testing | Apr 5, 2025 | SoftSolutions LLC | Queued | Standard Priority |
| Backend optimization for API | May 1, 2025 | DataStream Corp. | Resolved | Low Priority |

---

## Slide 07 — Behind the screens: Component Breakdown
`node 33:402` · `assets/slides/07-component-breakdown.png`

Four iterations of the case card, showing how the design evolved:

### Iteration 1
- **Sample:** `KLM8N12R45X` · CyberGuard Solutions · Software Liciense [sic] ·
  On-going · 01/02/25 – 01/02/25
- **Critique:** Led with an alphanumeric case ID. No human context, no scanability.
  Date range consumed too much space. The card was designed for the system, not the
  rep.

### Iteration 2
- **Sample:** Android application bug review · Tantragyan Private Limited
  Technologies · 01/02/25 – 01/02/25 · Open · Standard
- **Critique:** Replaced ID with a case name. But three metadata rows created
  density issues. Two colours on one card created competing visual signals. Too much
  cognitive load.

### Iteration 3
- **Sample:** Web dashboard loading error · Feb 10, 2025 · Techwise Ltd. · Standard ·
  In Progress
- **Critique:** Collapsed metadata onto one line. Cleaner density. But users were
  reading not scanning. Priority dominated before case name. F-shaped reading flow
  was broken.

### Iteration 4 (final)
- **Sample:** Web dashboard loading error · Feb 10, 2025 · Techwise Ltd. · In Review ·
  Standard Priority
- **Critique:** Status pill introduced on the bottom left. Priority moved to bottom
  right. F-shape clicked. Three questions answered in sequence. Why?, When?, Who?.
