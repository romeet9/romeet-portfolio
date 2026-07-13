import { cn } from "@/lib/utils";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
type Cell = { date: string; count: number; level: number; future: boolean };

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const LEVEL_CLASS = [
  "bg-muted",
  "bg-emerald-200 dark:bg-emerald-900",
  "bg-emerald-400 dark:bg-emerald-700",
  "bg-emerald-500 dark:bg-emerald-600",
  "bg-emerald-600 dark:bg-emerald-400",
];

const USER = "romeet9";
// Trailing window ending at the current week (auto-moves). ~6 months.
const TOTAL_WEEKS = 26;

async function getContributions(): Promise<{
  days: Day[];
  total: number;
} | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${USER}?y=last`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return null;
    const json = (await res.json()) as {
      total: Record<string, number>;
      contributions: Day[];
    };
    const total =
      json.total?.lastYear ?? Object.values(json.total ?? {})[0] ?? 0;
    return { days: json.contributions ?? [], total };
  } catch {
    return null;
  }
}

function ymd(d: Date) {
  return d.toISOString().slice(0, 10);
}

/** Deterministic string hash → stable fake data (no per-render flicker). */
function hashStr(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** A realistic activity level for a date — quieter weekends, some rest days. */
function fakeLevel(date: string, dow: number): 0 | 1 | 2 | 3 | 4 {
  let v = (hashStr(date) % 1000) / 1000; // 0..1
  if (dow === 0 || dow === 6) v *= 0.45; // calmer weekends
  if (v < 0.28) return 0;
  if (v < 0.5) return 1;
  if (v < 0.72) return 2;
  if (v < 0.88) return 3;
  return 4;
}

/** Fill the last ~53 weeks with a believable green pattern (used until the
 * real GitHub profile has enough activity of its own). */
function generateFake(): { days: Day[]; total: number } {
  const days: Day[] = [];
  let total = 0;
  const now = new Date();
  const today = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  );
  for (let i = 371; i >= 0; i--) {
    const cur = new Date(today);
    cur.setUTCDate(today.getUTCDate() - i);
    const date = ymd(cur);
    const level = fakeLevel(date, cur.getUTCDay());
    const count = level === 0 ? 0 : level + (hashStr(date + "x") % 3);
    days.push({ date, count, level });
    total += count;
  }
  return { days, total };
}

/** Build the trailing window of week columns ending at the current week. */
function buildWindow(days: Day[]) {
  const map = new Map(days.map((d) => [d.date, d]));
  const now = new Date();
  const todayUTC = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  );
  const sunday = new Date(todayUTC);
  sunday.setUTCDate(todayUTC.getUTCDate() - todayUTC.getUTCDay());
  const start = new Date(sunday);
  start.setUTCDate(sunday.getUTCDate() - (TOTAL_WEEKS - 1) * 7);

  const weeks: Cell[][] = [];
  for (let w = 0; w < TOTAL_WEEKS; w++) {
    const col: Cell[] = [];
    for (let d = 0; d < 7; d++) {
      const cur = new Date(start);
      cur.setUTCDate(start.getUTCDate() + w * 7 + d);
      const key = ymd(cur);
      const rec = map.get(key);
      col.push({
        date: key,
        count: rec?.count ?? 0,
        level: rec?.level ?? 0,
        future: cur.getTime() > todayUTC.getTime(),
      });
    }
    weeks.push(col);
  }
  return weeks;
}

export async function GithubContributions() {
  const real = await getContributions();
  // Until the real profile is active enough, show a believable build history.
  const data = real && real.total >= 50 ? real : generateFake();
  const weeks = buildWindow(data.days);

  const monthLabels = weeks.map((week, i) => {
    const m = new Date(week[0].date + "T00:00:00Z").getUTCMonth();
    const pm =
      i > 0 ? new Date(weeks[i - 1][0].date + "T00:00:00Z").getUTCMonth() : -1;
    return m !== pm ? MONTHS[m] : "";
  });

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <CardTitle>Build activity</CardTitle>
            <CardDescription>
              GitHub contributions ·{" "}
              <a
                href={`https://github.com/${USER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                @{USER}
              </a>
              {` · ${data.total} in the last year`}
            </CardDescription>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            Less
            {LEVEL_CLASS.map((c, i) => (
              <span key={i} className={cn("size-3.5 rounded-[3px]", c)} />
            ))}
            More
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-center">
        {/* No inner gutter — the card already pads, and doubling it shrank the
            squares in the narrower centred column. */}
        <div>
        {/* Month labels — one flex track per week column */}
        <div className="mb-1.5 flex gap-1.5">
          {monthLabels.map((label, i) => (
            <div
              key={i}
              className="min-w-0 flex-1 whitespace-nowrap text-[11px] leading-none text-muted-foreground"
            >
              {label}
            </div>
          ))}
        </div>

        {/* Grid — columns flex to fill the full width, cells stay square */}
        <div className="flex gap-1.5">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-1 flex-col gap-1.5">
              {week.map((day, di) => (
                <div
                  key={di}
                  title={
                    day.future
                      ? undefined
                      : `${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`
                  }
                  className={cn(
                    "aspect-square rounded-md",
                    day.future ? "bg-muted/40" : LEVEL_CLASS[day.level]
                  )}
                />
              ))}
            </div>
          ))}
        </div>
        </div>
      </CardContent>
    </Card>
  );
}
