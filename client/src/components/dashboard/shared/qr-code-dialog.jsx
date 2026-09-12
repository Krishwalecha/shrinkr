import * as React from "react";
import { CheckIcon, CopyIcon, DownloadIcon } from "lucide-react";
import { toast } from "sonner";
import QRCode from "react-qr-code";

import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

export function QRCodeDialog({ url, open, onOpenChange }) {
  const [copied, setCopied] = React.useState(false);
  const qrRef = React.useRef(null);

  if (!url) return null;

  const identifier = url.customAlias || url.shortCode;
  const shortUrl = `https://shrinkr.link/${identifier}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handleDownload = () => {
    try {
      const svg = qrRef.current?.querySelector("svg");

      if (!svg) {
        toast.error("Failed to generate QR code");
        return;
      }

      const svgData = new XMLSerializer().serializeToString(svg);

      const canvas = document.createElement("canvas");
      const size = 1024;

      canvas.width = size;
      canvas.height = size;

      const context = canvas.getContext("2d");

      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, size, size);

      const image = new Image();

      image.onload = () => {
        context.drawImage(image, 0, 0, size, size);

        const link = document.createElement("a");

        link.download = `shrinkr-qr.png`;
        link.href = canvas.toDataURL("image/png");

        link.click();

        toast.success("QR code downloaded");
      };

      image.onerror = () => {
        toast.error("Failed to generate QR code");
      };

      image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
        svgData,
      )}`;
    } catch {
      toast.error("Failed to download QR code");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>QR Code</AlertDialogTitle>

          <AlertDialogDescription>
            Scan this QR code to open your shortened link.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex flex-col items-center gap-5">
          <div ref={qrRef} className="rounded-xl bg-white p-5">
            <QRCode
              value={shortUrl}
              size={220}
              bgColor="#ffffff"
              fgColor="#111827"
            />
          </div>

          <div className="flex w-full items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2">
            <span
              className="min-w-0 flex-1 truncate text-sm font-medium text-primary"
              title={shortUrl}
            >
              {shortUrl}
            </span>

            <Button
              variant="ghost"
              size="icon"
              className="size-8 shrink-0"
              onClick={handleCopy}
            >
              {copied ? (
                <CheckIcon className="size-4 text-primary" />
              ) : (
                <CopyIcon className="size-4" />
              )}

              <span className="sr-only">Copy short link</span>
            </Button>
          </div>

          <div className="flex w-full gap-2">
            <Button className="flex-1" onClick={handleDownload}>
              <DownloadIcon className="size-4" />
              Download QR Code
            </Button>

            <AlertDialogCancel className="mt-0">Close</AlertDialogCancel>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
