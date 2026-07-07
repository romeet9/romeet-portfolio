import { GraduationCapIcon } from "lucide-react";

import { jobs, education } from "@/content/experience";
import { Badge } from "@/components/ui/badge";
import {
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
} from "@/components/ui/item";

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
      {jobs.map((job, i) => (
        <li key={job.company} className="group/row relative grid grid-cols-[auto_1fr] gap-x-4 gap-y-0 sm:gap-x-6">
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
            {/* vertical connector (hidden on last item's tail is fine — education follows) */}
            <span
              aria-hidden
              className="w-px flex-1 bg-gradient-to-b from-border to-border/30"
            />
          </div>

          {/* Content block */}
          <Item
            variant="outline"
            className="mb-4 bg-card/60 p-4 sm:mb-6 sm:p-5"
          >
            <ItemContent className="gap-3">
              <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                <ItemTitle className="line-clamp-none text-base">
                  {job.role}
                  <span className="font-normal text-muted-foreground">
                    · {job.company}
                  </span>
                </ItemTitle>
                <Badge
                  variant="outline"
                  className="font-mono text-[11px] text-muted-foreground"
                >
                  {job.period}
                </Badge>
              </div>

              <ItemDescription className="line-clamp-none text-sm leading-relaxed">
                {job.context}
              </ItemDescription>
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
            </ItemContent>
          </Item>
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
        <Item variant="muted" className="items-center gap-3 p-4 sm:p-5">
          <ItemContent className="flex-row flex-wrap items-center justify-between gap-2">
            <ItemTitle className="line-clamp-none text-sm">
              {education.school}
              <span className="font-normal text-muted-foreground">
                · {education.degree}
              </span>
            </ItemTitle>
            <Badge
              variant="outline"
              className="font-mono text-[11px] text-muted-foreground"
            >
              {education.period}
            </Badge>
          </ItemContent>
        </Item>
      </li>
    </ol>
  );
}
