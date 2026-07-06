"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  XAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { buildActivity, impact, platformSplit, skills } from "@/content/metrics";

// ─── Build activity (area) ────────────────────────────────────────────────
const buildConfig = {
  builds: { label: "Builds", color: "var(--chart-1)" },
} satisfies ChartConfig;

export function OverviewChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Build activity</CardTitle>
        <CardDescription>Commits &amp; builds shipped across 2026</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={buildConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={buildActivity} margin={{ left: 12, right: 12 }}>
            <defs>
              <linearGradient id="fillBuilds" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-builds)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-builds)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Area
              dataKey="builds"
              type="natural"
              fill="url(#fillBuilds)"
              stroke="var(--color-builds)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

// ─── Platform split (donut) ───────────────────────────────────────────────
const platformConfig = {
  count: { label: "Projects" },
  web: { label: "Web", color: "var(--chart-1)" },
  ios: { label: "iOS", color: "var(--chart-2)" },
  macos: { label: "macOS", color: "var(--chart-3)" },
} satisfies ChartConfig;

export function PlatformChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Platform split</CardTitle>
        <CardDescription>5 projects across 3 platforms</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer config={platformConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey="platform" hideLabel />} />
            <Pie data={platformSplit} dataKey="count" nameKey="platform" innerRadius={55} strokeWidth={4} />
            <ChartLegend content={<ChartLegendContent nameKey="platform" />} className="-translate-y-2 flex-wrap gap-2" />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

// ─── Skills (radar) ───────────────────────────────────────────────────────
const skillsConfig = {
  level: { label: "Competency", color: "var(--chart-1)" },
} satisfies ChartConfig;

export function SkillsChart() {
  return (
    <Card>
      <CardHeader className="items-center">
        <CardTitle>Design competency</CardTitle>
        <CardDescription>Self-assessed, 0–100</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={skillsConfig} className="mx-auto aspect-square max-h-[280px]">
          <RadarChart data={skills}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarGrid />
            <PolarAngleAxis dataKey="skill" />
            <Radar
              dataKey="level"
              fill="var(--color-level)"
              fillOpacity={0.6}
              stroke="var(--color-level)"
              strokeWidth={2}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

// ─── Impact (before / after bars) ─────────────────────────────────────────
const impactConfig = {
  before: { label: "Before", color: "var(--chart-3)" },
  after: { label: "After", color: "var(--chart-1)" },
} satisfies ChartConfig;

export function ImpactChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Measured impact</CardTitle>
        <CardDescription>Before vs after — Edge CRM redesign</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={impactConfig} className="aspect-auto h-[250px] w-full">
          <BarChart data={impact} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="metric" tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="before" fill="var(--color-before)" radius={4} />
            <Bar dataKey="after" fill="var(--color-after)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
