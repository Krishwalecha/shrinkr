import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function AnalyticsBreakdown({ title, description, icon, data }) {
  const chartData = data.slice(0, 6);

  const total = data.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
            {icon}
          </div>

          <div>
            <CardTitle className="text-base">{title}</CardTitle>

            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {chartData.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            No data available.
          </div>
        ) : (
          <div className="space-y-4">
            {chartData.map((item) => {
              const percentage =
                total > 0 ? Math.round((item.value / total) * 100) : 0;

              return (
                <div key={item.name}>
                  <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
                    <span className="truncate">{item.name}</span>

                    <span className="shrink-0 tabular-nums text-muted-foreground">
                      {item.value} · {percentage}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
