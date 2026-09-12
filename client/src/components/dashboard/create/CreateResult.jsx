import { useRef } from "react";
import { Copy, Download, ExternalLink, Link2, QrCode } from "lucide-react";
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
  const qrRef = useRef(null);

  const isExpired = result.expiresAt && new Date(result.expiresAt) < new Date();

  const status = isExpired
    ? "Expired"
    : result.isActive === false
      ? "Inactive"
      : "Active";

  const handleDownloadQr = () => {
    const svg = qrRef.current?.querySelector("svg");

    if (!svg) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);

    const svgBlob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });

    const svgUrl = URL.createObjectURL(svgBlob);

    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");

      const size = 1000;

      canvas.width = size;
      canvas.height = size;

      const context = canvas.getContext("2d");

      if (!context) {
        URL.revokeObjectURL(svgUrl);
        return;
      }

      // White background
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, size, size);

      // Draw SVG onto canvas
      context.drawImage(image, 0, 0, size, size);

      URL.revokeObjectURL(svgUrl);

      // Convert canvas to PNG
      canvas.toBlob((blob) => {
        if (!blob) return;

        const pngUrl = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = pngUrl;
        link.download = "shrinkr-qr.png";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(pngUrl);
      }, "image/png");
    };

    image.src = svgUrl;
  };

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
                <ExternalLink className="size-4" />
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

          <div className="flex gap-2">
            {showQr && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadQr}
                className="cursor-pointer hover:text-primary"
              >
                <Download className="size-4" />
                Download
              </Button>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={onToggleQr}
              className="cursor-pointer hover:text-primary"
            >
              {showQr ? "Hide QR" : "Show QR"}
            </Button>
          </div>
        </div>

        {showQr && (
          <div className="flex justify-center rounded-xl border border-border bg-muted/50 p-8">
            <div ref={qrRef} className="rounded-lg bg-card p-4 shadow-xs">
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

          <div className="border-b border-border p-5 sm:border-b-0 sm:border-r">
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
            className="cursor-pointer hover:text-primary"
          >
            <Link2 className="size-4" />
            Create Another
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
