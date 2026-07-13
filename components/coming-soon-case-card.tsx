// Fake source for the streaming editor panel — the Case Detail screen, in progress.
// A trailing "" line carries the blinking caret. The block is duplicated in the
// track so the upward scroll loops seamlessly (translateY 0 → -50%).
const CODE = [
  "// case-detail.tsx (WIP)",
  "export function CaseDetail({ id }) {",
  "  const { case } = useCase(id)",
  '  const [tab, setTab] = useState("summary")',
  "  return (",
  "    <Screen title={case.subject}>",
  "      <StickyHeader status={case.status} />",
  "      <Tabs value={tab} onChange={setTab} />",
  "      <Timeline events={case.events} />",
  "      <Attachments files={case.files} />",
  '      <ActionBar primary="Resolve" />',
  "    </Screen>",
  "  )",
  "}",
  "// TODO: prototype the sticky header",
  "// TODO: usability-test the tab switch",
  "",
];

function lineColor(text: string) {
  const t = text.trim();
  if (t.startsWith("//")) return "text-emerald-400/55 italic";
  if (t.includes("<")) return "text-sky-300/70";
  return "text-zinc-400";
}

function CodeLine({ text }: { text: string }) {
  return (
    <div className="flex h-5 items-center whitespace-pre font-mono text-[11px] leading-5">
      <span className={lineColor(text)}>{text}</span>
      {text === "" && (
        <span className="inline-block h-3.5 w-[6px] animate-caret-blink bg-zinc-200" />
      )}
    </div>
  );
}

export function ComingSoonCaseCard() {
  const track = [...CODE, ...CODE];

  return (
    // Same full-bleed shell as CaseStudyCard, so the row reads as one system —
    // here the "artwork" is the live editor panel instead of a mockup photo.
    <div className="relative flex aspect-[4/5] overflow-hidden rounded-[22px] bg-neutral-950 ring-1 ring-foreground/10">
      {/* Editor chrome */}
      <div className="absolute inset-x-0 top-0 flex h-9 items-center gap-1.5 border-b border-white/10 pl-3 pr-2">
        <span className="size-2 rounded-full bg-red-500/70" />
        <span className="size-2 rounded-full bg-yellow-500/70" />
        <span className="size-2 rounded-full bg-green-500/70" />
        <span className="ml-2 font-mono text-[10px] text-zinc-500">
          case-detail.tsx
        </span>

        <div className="ml-auto flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/15 px-2 py-0.5 backdrop-blur-sm">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-amber-400" />
          </span>
          <span className="font-mono text-[10px] font-medium uppercase tracking-wide text-amber-200">
            Coming soon
          </span>
        </div>
      </div>

      {/* Streaming code — fills the card behind the text */}
      <div className="absolute inset-x-0 bottom-0 top-9 overflow-hidden px-3 pt-1">
        <div className="flex animate-code-scroll flex-col will-change-transform">
          {track.map((text, i) => (
            <CodeLine key={i} text={text} />
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-9 h-6 bg-gradient-to-b from-neutral-950 to-transparent" />

      {/* Same legibility ramp as the real cards. Denser here — live code is
          scrolling underneath, and moving text behind static text is unreadable. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-neutral-950 via-neutral-950/75 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 backdrop-blur-[5px] [mask-image:linear-gradient(to_top,black_0%,black_45%,transparent_100%)]"
      />

      <div className="relative mt-auto flex flex-col gap-2 p-5 sm:p-6">
        <h3 className="text-xl font-semibold tracking-tight text-white/90 sm:text-2xl">
          Edge CRM · Case Detail
        </h3>

        <p className="line-clamp-2 max-w-[34ch] text-sm leading-relaxed text-white/70">
          The third screen. Deep case context: timeline, attachments and actions
          in one view. Currently in the works.
        </p>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[11px] text-white/55">
          <span className="whitespace-nowrap">12 Grids · 2026</span>
          {["Case detail UI", "In progress"].map((s) => (
            <span
              key={s}
              className="rounded-full border border-white/20 bg-white/10 px-2 py-0.5 whitespace-nowrap backdrop-blur-sm"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
