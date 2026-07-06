# Edge CRM — Product Screens

The actual app UI mockups on the canvas (iPhone frames), documented screen by
screen. These are the artefacts the case-study slides refer to. Read alongside
`assets/screens/`.

The redesign spans **three screens**: Add Case · Case List · Case Detail.

---

## Add Case — final (redesigned)
`node 1:494` · `assets/screens/add-case-final-iphone17.png` · iPhone 17, light theme

Clean, redesigned version of the entry-point form.

- **Header:** back chevron · title "Add Case"
- **Hero prompt:** "Encountered a product issue?" with a supporting line —
  "Please complete the form accurately, ensuring your case details and description
  are clear and concise."
- **Section: Overview**
  - `Case Overview *` — text field, "Enter a subject of the case" (0/200 counter)
  - `Description *` — text area, "Enter a detailed description" (0/200 counter)
- **Section: Case date**
  - `Date *` — DD/MM/YYYY, calendar icon
- **Section: Business Details**
  - `Line of Business *` — pre-filled: **Tantragyan Pvt. Ltd.**
  - `Business Unit *` — pre-filled: **12 Grids - The CX Company**
  - `Product Name *` — chevron (dropdown)
- **Primary CTA:** full-width **Next →** button (dark), always in reach

Notes: card-style bordered fields, grouped sections, character counters, and
pre-filled known values — the fixes the Add-Case case study describes.

---

## Case List — before
`node 6:72` · `assets/screens/case-list-before.png`

The un-redesigned list — the "Before" referenced across the deck.

- **Header:** hamburger menu · title "Case" · list + filter icons (blue bar)
- **Persistent search bar** ("Search") occupying prime real estate (the Hick's Law
  violation called out in slide 03)
- **Flat rows**, no cards, text-only, with a plain Open/Closed label on the right:

| Case | Ref | Company | Status |
|------|-----|---------|--------|
| No Cooling | COM494142 | Nippon Technologies | Closed |
| Alkem - Chamber repair | COM494143 | Alkem | Closed |
| Test case | com494141 | Nippon Technologies | Closed |
| Mac running slow | COM494131 | Nichino India Private Limited | Open |
| Mac is runnin slow | COM494130 | 12gridsl | Open |
| pdf download issue | COM494115 | Swan Environmental | Open |
| Breakdown | COM494114 | EDGE CRM | — |

- **FAB:** orange "+" (add case)

---

## Case Detail
`node 6:81` · `assets/screens/case-detail.png`

Detail view for a single case ("No Cooling"), blue header.

- **Header:** back chevron · "No Cooling" · Due date 14-01-2026 · Closed on 18 Feb 2026
- **Quick actions:** mail · call · WhatsApp icons
- **Tabs:** **Basic Information** (active) · Activities · Cases
- **Fields:**
  - Case Date — 11 Jan, 2026
  - Client Name — Nippon Technologies
  - SLA — Installation of new part
  - Response Date/Time — Jan 13, 2026 @ 09:00 PM
  - Response Date/Time — Jan 14, 2026 @ 01:00 PM
  - Case Type — Change request
  - Case Source — Email
- **FAB:** orange "+"

---

## Add Case — old versions (the "before" form)
`nodes 3:137, 4:100, 9:100` · `assets/screens/add-case-old-*.png`

The original Add Case form — one long scroll of near-identical underline fields.
`4:100` and `9:100` carry red annotation callouts flagging the problem fields.

- **Header:** back chevron · "Save" button (top-right, cramped)
- **Fields (single flat scroll, all look the same):**
  - Case Subject * — "Write Case Subject"
  - Company Name * — Select Company (chevron)
  - Case Date * — 23-02-2026
  - Reported By — Select Contact Person (chevron)
  - **Line of Business *** — Select Line of Business (flagged in annotations)
  - Business Unit * — Select Business Unit
  - **Product Name *** — Select Product (flagged in annotations)
  - SLA — Select SLA
  - Response Time (Hrs)
- **Mic FAB** (orange)

Problems this illustrates (per the Add-Case case study): no progress indicator,
dropdown vs text field indistinguishable, required/optional not differentiated,
Save button hidden top-right instead of a full-width CTA.

---

## case-add — WIP / empty
`node 3:136` · `assets/screens/case-add-wip-empty.png`

A near-empty scratch frame — only a few dashed red placeholder boxes. Looks like an
abandoned work-in-progress; not part of the finished story. Safe to ignore or clean
up.
