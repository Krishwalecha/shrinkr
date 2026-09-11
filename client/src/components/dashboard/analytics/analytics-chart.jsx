import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function AnalyticsChart({
  data,
  rangeLabel,
  formatDate,
  formatFullDate,
  totalClicks,
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle>Clicks Over Time</CardTitle>

            <CardDescription>Daily clicks · {rangeLabel}</CardDescription>
          </div>

          {totalClicks !== undefined && (
            <div className="text-right">
              <p className="text-2xl font-semibold tabular-nums text-foreground">
                {totalClicks}
              </p>

              <p className="text-xs text-muted-foreground">total clicks</p>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {data.length === 0 ? (
          <div className="flex h-[300px] items-center justify-center text-sm text-muted-foreground">
            No click data available.
          </div>
        ) : (
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{
                  top: 10,
                  right: 12,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" />

                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  minTickGap={40}
                  tickFormatter={formatDate}
                />

                <YAxis
                  allowDecimals={false}
                  domain={[0, "auto"]}
                  axisLine={false}
                  tickLine={false}
                  width={40}
                />

                <Tooltip
                  cursor={{
                    strokeDasharray: "3 3",
                  }}
                  labelFormatter={formatFullDate}
                  formatter={(value) => [value, "Clicks"]}
                />

                <Line
                  type="monotone"
                  dataKey="clicks"
                  stroke="var(--primary)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{
                    r: 5,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
