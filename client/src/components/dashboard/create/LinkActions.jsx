import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, QrCode } from "lucide-react";

export function CreateLinkActions({ shortUrl, copied, onCopy, onOpen, onQr }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={onCopy} variant="outline">
        <Copy className="mr-2 h-4 w-4" />
        {copied ? "Copied" : "Copy"}
      </Button>

      <Button onClick={onOpen} variant="outline">
        <ExternalLink className="mr-2 h-4 w-4" />
        Open
      </Button>

      <Button onClick={onQr} variant="outline">
        <QrCode className="mr-2 h-4 w-4" />
        QR Code
      </Button>
    </div>
  );
}
