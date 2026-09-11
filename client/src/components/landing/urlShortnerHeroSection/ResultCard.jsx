import {
  ArrowDownToLine,
  ArrowRight,
  Check,
  Copy,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import QRCode from "react-qr-code";

const ResultCard = ({ shortened, setShortened }) => {
  const [copied, setCopied] = useState(false);

  const shortUrl = `https://shrinkr.link/${
    shortened.customAlias || shortened.shortCode
  }`;

  const displayUrl = shortUrl.replace("https://", "");

  const createdDate = new Date(
    shortened.createdAt || Date.now(),
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);

      setCopied(true);
      toast.success("Copied to clipboard!");

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const handleDownload = () => {
    const svg = document.querySelector("#qr-code");

    if (!svg) {
      toast.error("QR code not found");
      return;
    }

    const svgData = new XMLSerializer().serializeToString(svg);

    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });

    const url = URL.createObjectURL(svgBlob);
    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const size = 1000;

      canvas.width = size;
      canvas.height = size;

      const context = canvas.getContext("2d");

      if (!context) {
        URL.revokeObjectURL(url);
        toast.error("Failed to generate QR");
        return;
      }

      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, size, size);

      context.drawImage(image, 0, 0, size, size);

      URL.revokeObjectURL(url);

      canvas.toBlob((blob) => {
        if (!blob) {
          toast.error("Failed to generate QR");
          return;
        }

        const downloadUrl = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = downloadUrl;
        link.download = "shrinkr-qr.png";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(downloadUrl);
      }, "image/png");
    };

    image.onerror = () => {
      URL.revokeObjectURL(url);
      toast.error("Failed to generate QR");
    };

    image.src = url;
  };

  return (
    <div className="mt-8 w-full rounded-2xl border border-white/[0.18] bg-white/[0.09] p-2.5 backdrop-blur-md sm:p-3">
      <div className="flex items-start justify-between gap-3 border-b border-white/10 px-1 pb-3.5">
        <div className="min-w-0 text-left">
          <h2 className="text-base font-semibold tracking-tight text-white sm:text-lg">
            Your Short URL is ready
          </h2>

          <p className="mt-1 text-xs text-white/50 sm:text-sm">
            Your link has been shortened successfully.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShortened(false)}
          className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg px-2 py-2 text-xs text-white/60 transition-colors duration-150 hover:bg-white/5 hover:text-white sm:text-sm"
        >
          <span className="hidden sm:inline">Shorten another</span>

          <span className="sm:hidden">New</span>

          <ArrowRight size={15} strokeWidth={1.5} />
        </button>
      </div>

      <div className="mt-3.5 grid gap-3.5 sm:grid-cols-[minmax(0,1fr)_160px] sm:gap-0">
        <div className="min-w-0 text-left sm:border-r sm:border-white/10 sm:pr-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-white/40 sm:text-[11px]">
            Short URL
          </p>

          <div className="mt-1.5 flex min-h-11 min-w-0 items-center rounded-xl border border-blue-200/20 bg-blue-200/10 px-3.5 sm:min-h-12">
            <p className="min-w-0 truncate font-mono text-sm font-medium tracking-tight text-blue-100 sm:text-[15px]">
              {displayUrl}
            </p>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-2">
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 items-center justify-center gap-1.5 rounded-lg bg-white px-4 text-sm font-medium text-primary transition-colors duration-150 hover:bg-white/90"
            >
              <ExternalLink size={15} strokeWidth={1.5} />
              Open
            </a>

            <button
              type="button"
              onClick={handleCopy}
              className="flex h-10 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-white/[0.14] bg-white/[0.06] px-4 text-sm font-medium text-white/80 transition-colors duration-150 hover:bg-white/10 hover:text-white"
            >
              {copied ? (
                <Check size={15} strokeWidth={1.5} />
              ) : (
                <Copy size={15} strokeWidth={1.5} />
              )}

              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2 border-t border-white/10 pt-3 text-left">
            <div className="min-w-0">
              <p className="text-[9px] font-semibold uppercase tracking-wider text-white/35">
                {shortened.customAlias ? "Custom Alias" : "Short Code"}
              </p>

              <p className="mt-1 truncate text-xs font-medium text-white/85">
                {shortened.customAlias || shortened.shortCode}
              </p>
            </div>

            <div className="min-w-0">
              <p className="text-[9px] font-semibold uppercase tracking-wider text-white/35">
                Expiry
              </p>

              <p className="mt-1 truncate text-xs font-medium text-white/85">
                {shortened.expiresIn} days
              </p>
            </div>

            <div className="min-w-0">
              <p className="text-[9px] font-semibold uppercase tracking-wider text-white/35">
                Click Limit
              </p>

              <p className="mt-1 truncate text-xs font-medium text-white/85">
                {shortened.maxClicks === -1
                  ? "Unlimited"
                  : `${shortened.maxClicks} clicks`}
              </p>
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-col items-center px-0 text-center sm:pl-4">
          <div className="aspect-square w-full max-w-[120px] rounded-xl border border-white/[0.14] bg-white p-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.12)] sm:max-w-none">
            <QRCode id="qr-code" value={shortUrl} className="size-full" />
          </div>

          <button
            type="button"
            onClick={handleDownload}
            className="mt-2 flex h-9 w-full max-w-[120px] cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-white/[0.14] bg-white/[0.06] text-xs font-medium text-white/75 transition-colors duration-150 hover:bg-white/10 hover:text-white sm:max-w-none"
          >
            <ArrowDownToLine size={13} strokeWidth={1.5} />
            Download
          </button>

          <p className="mt-1.5 text-[9px] text-white/35">
            Created {createdDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
