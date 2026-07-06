"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// ─── Time to answer (cumulative step area) ────────────────────────────────
const timeToAnswer = [
  { step: "Open app", seconds: 8 },
  { step: "Find case", seconds: 22 },
  { step: "Open detail", seconds: 33 },
  { step: "Scan for answer", seconds: 52 },
];

const timeConfig = {
  seconds: { label: "Seconds", color: "var(--chart-1)" },
} satisfies ChartConfig;

export function TimeToAnswerChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Time to answer a client</CardTitle>
        <CardDescription>
          Seconds, cumulative across the old flow. ~52s from open to answer.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={timeConfig} className="aspect-auto h-[240px] w-full">
          <AreaChart data={timeToAnswer} margin={{ left: 12, right: 12, top: 8 }}>
            <defs>
              <linearGradient id="fillSeconds" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-seconds)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-seconds)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="step" tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Area
              dataKey="seconds"
              type="step"
              fill="url(#fillSeconds)"
              stroke="var(--color-seconds)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

// ─── Field error rate (radial gauge) ──────────────────────────────────────
const errorData = [{ name: "error", value: 80, fill: "var(--color-value)" }];

const errorConfig = {
  value: { label: "Error rate", color: "var(--chart-1)" },
} satisfies ChartConfig;

export function ErrorRateChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Field error rate</CardTitle>
        <CardDescription>The same mistake, every rep, every session</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer config={errorConfig} className="mx-auto aspect-square max-h-[240px]">
          <RadialBarChart
            data={errorData}
            startAngle={90}
            endAngle={90 - (errorData[0].value / 100) * 360}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="value" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold tabular-nums"
                        >
                          80%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy ?? 0) + 26}
                          className="fill-muted-foreground text-sm"
                        >
                          before redesign
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
