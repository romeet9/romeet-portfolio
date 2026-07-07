import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Fake source for the streaming editor panel — the Case Detail screen, in progress.
// A trailing "" line carries the blinking caret. The block is duplicated in the
// track so the upward scroll loops seamlessly (translateY 0 → -50%).
const CODE = [
  "// case-detail.tsx — WIP",
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
    <div className="flex">
      <Card className="h-full w-full gap-4 overflow-hidden pt-0">
        {/* Cover — a mini code-editor panel (always dark) */}
        <div className="relative aspect-[16/10] overflow-hidden border-b bg-neutral-950">
          {/* Editor chrome */}
          <div className="flex h-[33px] items-center gap-1.5 border-b border-white/10 px-3">
            <span className="size-2 rounded-full bg-red-500/70" />
            <span className="size-2 rounded-full bg-yellow-500/70" />
            <span className="size-2 rounded-full bg-green-500/70" />
            <span className="ml-2 font-mono text-[10px] text-zinc-500">
              case-detail.tsx
            </span>
          </div>

          {/* Streaming code */}
          <div className="absolute inset-x-0 bottom-0 top-[33px] overflow-hidden pl-3">
            <div className="flex animate-code-scroll flex-col will-change-transform">
              {track.map((text, i) => (
                <CodeLine key={i} text={text} />
              ))}
            </div>
          </div>

          {/* Fade masks */}
          <div className="pointer-events-none absolute inset-x-0 top-[33px] h-6 bg-gradient-to-b from-neutral-950 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-neutral-950 to-transparent" />

          {/* Coming soon pill */}
          <div className="absolute right-2.5 top-2 flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/15 px-2.5 py-1 backdrop-blur-sm">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-amber-400" />
            </span>
            <span className="font-mono text-[10px] font-medium uppercase tracking-wide text-amber-200">
              Coming soon
            </span>
          </div>
        </div>

        <CardHeader>
          <CardDescription>12 Grids · 2026</CardDescription>
          <CardTitle className="text-base text-muted-foreground">
            Edge CRM — Case Detail
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <p className="line-clamp-2 text-sm text-muted-foreground">
            The third screen. Deep case context — timeline, attachments and
            actions in one view. Currently in the works.
          </p>
          <div className="flex flex-wrap gap-1.5">
            <Badge variant="outline" className="font-normal text-muted-foreground">
              Case detail UI
            </Badge>
            <Badge variant="outline" className="font-normal text-muted-foreground">
              In progress
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
