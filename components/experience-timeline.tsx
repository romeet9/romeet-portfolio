import { GraduationCapIcon } from "lucide-react";

import { jobs, education } from "@/content/experience";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function ExperienceTimeline() {
  return (
    <ol className="relative flex flex-col">
      {jobs.map((job) => (
        <li
          key={job.company}
          className="group/row relative grid grid-cols-[auto_1fr] gap-x-4 gap-y-0 sm:gap-x-6"
        >
          {/* Rail — node + connecting line */}
          <div className="relative flex flex-col items-center">
            <span
              aria-hidden
              className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-full border text-xs font-semibold shadow-sm ring-4 ring-background"
              style={{
                backgroundColor: `color-mix(in oklab, ${job.accent} 16%, var(--card))`,
                borderColor: `color-mix(in oklab, ${job.accent} 45%, transparent)`,
                color: `color-mix(in oklab, ${job.accent} 75%, var(--foreground))`,
              }}
            >
              {initials(job.company)}
            </span>
            <span
              aria-hidden
              className="w-px flex-1 bg-gradient-to-b from-border to-border/30"
            />
          </div>

          {/* KPI card */}
          <Card
            className="mb-4 gap-0 overflow-hidden p-0 shadow-xs sm:mb-6 dark:bg-card"
            style={{
              backgroundImage: `linear-gradient(to top, color-mix(in oklab, ${job.accent} 6%, var(--card)), var(--card))`,
            }}
          >
            <CardHeader className="items-start gap-1 border-b p-4 sm:p-5">
              <CardDescription className="font-mono text-xs">
                {job.company} · {job.period}
              </CardDescription>
              <CardTitle className="text-base">{job.role}</CardTitle>
              <CardAction className="text-right">
                <div
                  className="text-2xl leading-none font-semibold tabular-nums whitespace-nowrap"
                  style={{
                    color: `color-mix(in oklab, ${job.accent} 78%, var(--foreground))`,
                  }}
                >
                  {job.metric.value}
                </div>
                <div className="mt-1 text-[11px] text-muted-foreground">
                  {job.metric.label}
                </div>
              </CardAction>
            </CardHeader>

            <CardContent className="flex flex-col gap-3 p-4 sm:p-5">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {job.context}
              </p>
              <ul className="flex flex-col gap-2">
                {job.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-relaxed">
                    <span
                      aria-hidden
                      className="mt-1.5 size-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: job.accent }}
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </li>
      ))}

      {/* Education — closing node */}
      <li className="relative grid grid-cols-[auto_1fr] gap-x-4 sm:gap-x-6">
        <div className="flex flex-col items-center">
          <span
            aria-hidden
            className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-full border bg-muted text-muted-foreground shadow-sm ring-4 ring-background"
          >
            <GraduationCapIcon className="size-4" />
          </span>
        </div>
        <Card className="flex-row flex-wrap items-center justify-between gap-2 bg-muted/40 p-4 sm:p-5">
          <CardTitle className="text-sm font-medium">
            {education.school}
            <span className="font-normal text-muted-foreground">
              {" "}
              · {education.degree}
            </span>
          </CardTitle>
          <Badge
            variant="outline"
            className="font-mono text-[11px] text-muted-foreground"
          >
            {education.period}
          </Badge>
        </Card>
      </li>
    </ol>
  );
}
