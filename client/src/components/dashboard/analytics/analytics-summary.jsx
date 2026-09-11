import { Link2, MousePointerClick } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AnalyticsSummary({ totalClicks, totalLinks, rangeLabel }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>

          <MousePointerClick className="size-4 text-muted-foreground" />
        </CardHeader>

        <CardContent>
          <div className="text-2xl font-semibold tabular-nums">
            {totalClicks}
          </div>

          <p className="text-xs text-muted-foreground">{rangeLabel}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Links</CardTitle>

          <Link2 className="size-4 text-muted-foreground" />
        </CardHeader>

        <CardContent>
          <div className="text-2xl font-semibold tabular-nums">
            {totalLinks}
          </div>

          <p className="text-xs text-muted-foreground">Total links created</p>
        </CardContent>
      </Card>
    </div>
  );
}
