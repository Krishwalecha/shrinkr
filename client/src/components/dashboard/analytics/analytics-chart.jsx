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

export function AnalyticsChart({
  data = [],
  rangeLabel = "All time",
  formatDate,
  formatFullDate,
}) {
  const chartConfig = {
    clicks: {
      label: "Clicks",
      color: "var(--primary)",
    },
  };

  // Calculate from the exact data being displayed in the chart.
  const totalClicks = React.useMemo(
    () => data.reduce((total, item) => total + Number(item.clicks ?? 0), 0),
    [data],
  );

  return (
    <Card className="@container/card border-border/80 bg-card shadow-none">
      <CardHeader>
        <CardTitle>Clicks Over Time</CardTitle>

        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total clicks for the {rangeLabel.toLowerCase()}
          </span>

          <span className="@[540px]/card:hidden">{rangeLabel}</span>
        </CardDescription>

        <CardAction>
          <div className="text-sm font-medium text-muted-foreground">
            {totalClicks.toLocaleString()} clicks
          </div>
        </CardAction>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <AreaChart
            data={data}
            margin={{
              top: 8,
              right: 12,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient
                id="fillAnalyticsClicks"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
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
                formatDate
                  ? formatDate(value)
                  : new Date(`${value}T00:00:00Z`).toLocaleDateString("en-IN", {
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
                    formatFullDate
                      ? formatFullDate(value)
                      : new Date(`${value}T00:00:00Z`).toLocaleDateString(
                          "en-IN",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )
                  }
                />
              }
            />

            <Area
              dataKey="clicks"
              type="monotone"
              fill="url(#fillAnalyticsClicks)"
              stroke="var(--color-clicks)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
