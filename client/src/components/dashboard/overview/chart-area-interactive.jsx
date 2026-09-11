"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const chartConfig = {
  clicks: {
    label: "Clicks",
    color: "var(--primary)",
  },
};

export function ChartAreaInteractive({ clicksOverTime = [] }) {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = React.useMemo(() => {
    const days = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90;

    return clicksOverTime.slice(-days);
  }, [clicksOverTime, timeRange]);

  const rangeLabel =
    timeRange === "7d"
      ? "last 7 days"
      : timeRange === "30d"
        ? "last 30 days"
        : "last 90 days";

  return (
    <Card className="@container/card border-border/80 bg-card shadow-none">
      <CardHeader>
        <CardTitle>Clicks Over Time</CardTitle>

        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total clicks for the {rangeLabel}
          </span>

          <span className="@[540px]/card:hidden">{rangeLabel}</span>
        </CardDescription>

        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={(value) => {
              if (value) {
                setTimeRange(value);
              }
            }}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 90 days</ToggleGroupItem>

            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>

            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>

          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-36 @[767px]/card:hidden"
              size="sm"
              aria-label="Select time range"
            >
              <SelectValue />
            </SelectTrigger>

            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 90 days
              </SelectItem>

              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>

              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <AreaChart
            data={filteredData}
            margin={{
              top: 8,
              right: 12,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="fillClicks" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-clicks)"
                  stopOpacity={0.18}
                />

                <stop
                  offset="95%"
                  stopColor="var(--color-clicks)"
                  stopOpacity={0.01}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              className="stroke-border/70"
            />

            <YAxis
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              width={35}
              domain={[0, "auto"]}
              className="fill-muted-foreground"
            />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              className="fill-muted-foreground"
              tickFormatter={(value) =>
                new Date(`${value}T00:00:00Z`).toLocaleDateString("en-IN", {
                  month: "short",
                  day: "numeric",
                })
              }
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  labelFormatter={(value) =>
                    new Date(`${value}T00:00:00Z`).toLocaleDateString("en-IN", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }
                />
              }
            />

            <Area
              dataKey="clicks"
              type="monotone"
              fill="url(#fillClicks)"
              stroke="var(--color-clicks)"
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 4,
              }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
