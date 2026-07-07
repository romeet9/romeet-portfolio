import * as React from "react";
import {
  CheckIcon,
  GraduationCapIcon,
  LayoutDashboardIcon,
  SmartphoneIcon,
  TrendingDownIcon,
  type LucideIcon,
} from "lucide-react";

import { jobs, education } from "@/content/experience";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";

const metricIcons: Record<string, LucideIcon> = {
  "12 Grids": TrendingDownIcon,
  "Maity Innovations": LayoutDashboardIcon,
  "House of Artist": SmartphoneIcon,
};

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
    <div className="flex flex-col gap-4 md:gap-6">
      {/* Role KPI cards — dashboard section-cards block */}
      <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @4xl/main:grid-cols-3 dark:*:data-[slot=card]:bg-card">
        {jobs.map((job) => {
          const Icon = metricIcons[job.company] ?? TrendingDownIcon;
          return (
            <Card key={job.company} className="@container/card">
              <CardHeader>
                <CardDescription>{job.company}</CardDescription>
                <CardTitle className="text-2xl font-semibold tracking-tight tabular-nums @[250px]/card:text-3xl">
                  {job.metric.value}
                </CardTitle>
                <CardAction>
                  <Badge variant="outline">
                    <Icon />
                    {job.metric.label}
                  </Badge>
                </CardAction>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                  {job.role}
                </div>
                <div className="text-muted-foreground">{job.period}</div>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Work history — ItemGroup block */}
      <Card>
        <CardHeader>
          <CardTitle>Work history</CardTitle>
          <CardDescription>
            Every role, and the work behind the numbers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ItemGroup>
            {jobs.map((job, index) => (
              <React.Fragment key={job.company}>
                <Item className="items-start">
                  <ItemMedia>
                    <Avatar>
                      <AvatarFallback className="text-xs">
                        {initials(job.company)}
                      </AvatarFallback>
                    </Avatar>
                  </ItemMedia>
                  <ItemContent className="gap-2">
                    <ItemTitle>
                      {job.role}
                      <span className="font-normal text-muted-foreground">
                        · {job.company}
                      </span>
                    </ItemTitle>
                    <ItemDescription className="line-clamp-none">
                      {job.context}
                    </ItemDescription>
                    <ul className="mt-1 flex flex-col gap-2">
                      {job.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-2.5 text-sm leading-relaxed"
                        >
                          <CheckIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </ItemContent>
                  <ItemActions className="max-sm:hidden">
                    <Badge
                      variant="outline"
                      className="font-mono text-[11px] text-muted-foreground"
                    >
                      {job.period}
                    </Badge>
                  </ItemActions>
                </Item>
                {index !== jobs.length - 1 && <ItemSeparator />}
              </React.Fragment>
            ))}

            <ItemSeparator />

            {/* Education */}
            <Item>
              <ItemMedia variant="icon">
                <GraduationCapIcon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{education.school}</ItemTitle>
                <ItemDescription>{education.degree}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Badge
                  variant="outline"
                  className="font-mono text-[11px] text-muted-foreground"
                >
                  {education.period}
                </Badge>
              </ItemActions>
            </Item>
          </ItemGroup>
        </CardContent>
      </Card>
    </div>
  );
}
