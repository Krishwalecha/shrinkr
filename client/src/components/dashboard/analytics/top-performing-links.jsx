import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function TopPerformingLinks({ urls, getShortUrl, getDisplayUrl }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Performing Links</CardTitle>

        <CardDescription>Your five links with the most clicks</CardDescription>
      </CardHeader>

      <CardContent>
        {!urls || urls.length === 0 ? (
          <div className="py-10 text-center text-sm text-muted-foreground">
            No link analytics available.
          </div>
        ) : (
          <div className="space-y-3">
            {urls.map((url, index) => (
              <div
                key={url.urlId}
                className="flex items-center gap-4 rounded-xl border p-4"
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-medium">
                  {index + 1}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{getShortUrl(url)}</p>

                  <p className="truncate text-sm text-muted-foreground">
                    {getDisplayUrl(url)}
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <p className="font-semibold tabular-nums">{url.clicks}</p>

                  <p className="text-xs text-muted-foreground">clicks</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
