import { Copy, ExternalLink, Link2, QrCode } from "lucide-react";
import QRCode from "react-qr-code";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getStatusBadgeClass } from "@/lib/status";

export function CreateResult({
  result,
  shortUrl,
  copied,
  showQr,
  onCopy,
  onOpen,
  onToggleQr,
  onCreateAnother,
}) {
  const isExpired = result.expiresAt && new Date(result.expiresAt) < new Date();

  const status = isExpired
    ? "Expired"
    : result.isActive === false
      ? "Inactive"
      : "Active";

  return (
    <Card>
      <CardHeader className="border-b border-border px-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Your shortened link
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Share this link anywhere you want.
            </p>
          </div>

          <Badge variant="outline" className={getStatusBadgeClass(status)}>
            {status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 p-6">
        <div className="rounded-xl border border-border bg-muted/50 p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Short link
              </p>

              <p className="truncate text-lg font-semibold text-primary">
                {shortUrl}
              </p>

              <p
                className="mt-1 truncate text-sm text-muted-foreground"
                title={result.longUrl}
              >
                {result.longUrl}
              </p>
            </div>

            <div className="flex shrink-0 gap-2">
              <Button
                className="cursor-pointer"
                variant="outline"
                size="sm"
                onClick={onCopy}
              >
                {copied ? (
                  <>
                    <span>✓</span>
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="size-4" />
                    Copy
                  </>
                )}
              </Button>

              <Button size="sm" onClick={onOpen} className="cursor-pointer">
                <ExternalLink className="size-4 " />
                Open
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
              <QrCode className="size-5" />
            </div>

            <div>
              <p className="font-medium text-foreground">QR Code</p>

              <p className="mt-0.5 text-sm text-muted-foreground">
                Generate a QR code for this short link.
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onToggleQr}
            className="hover:text-primary cursor-pointer"
          >
            {showQr ? "Hide QR" : "Show QR"}
          </Button>
        </div>

        {showQr && (
          <div className="flex justify-center rounded-xl border border-border bg-muted/50 p-8">
            <div className="rounded-lg bg-card p-4 shadow-xs">
              <QRCode value={shortUrl} size={220} />
            </div>
          </div>
        )}

        <div className="grid overflow-hidden rounded-xl border border-border sm:grid-cols-3">
          <div className="border-b border-border p-5 sm:border-b-0 sm:border-r">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Expires
            </p>

            <p className="mt-2 text-sm font-semibold text-foreground">
              {result.expiresAt
                ? new Date(result.expiresAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "—"}
            </p>
          </div>

          <div className="border-b border-border p-5 sm:border-b-0 sm:border-r ">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Max Clicks
            </p>

            <p className="mt-2 text-sm font-semibold text-foreground">
              {result.maxClicks === -1 ? "Unlimited" : result.maxClicks}
            </p>
          </div>

          <div className="p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Clicks
            </p>

            <p className="mt-2 text-sm font-semibold text-foreground">
              {result.clickCount ?? 0}
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={onCreateAnother}
            className="hover:text-primary cursor-pointer"
          >
            <Link2 className="size-4" />
            Create Another
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
