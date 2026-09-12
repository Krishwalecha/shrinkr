import * as React from "react";
import {
  BarChart3Icon,
  CheckIcon,
  CopyIcon,
  MoreHorizontalIcon,
  PencilIcon,
  PowerIcon,
  QrCodeIcon,
  Trash2Icon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import api from "@/lib/api";
import { getStatusBadgeClass } from "@/lib/status";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { EditLinkSheet } from "@/components/dashboard/shared/edit-link-sheet";
import { DeleteLinkDialog } from "@/components/dashboard/shared/delete-link-dialog";
import { QRCodeDialog } from "@/components/dashboard/shared/qr-code-dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function HistoryTable({
  urls = [],
  loading,
  onRefresh,
  selectedIds = new Set(),
  onToggleSelect,
  onToggleSelectAll,
}) {
  const navigate = useNavigate();

  const [copiedId, setCopiedId] = React.useState(null);
  const [editingUrl, setEditingUrl] = React.useState(null);
  const [deletingUrl, setDeletingUrl] = React.useState(null);
  const [qrUrl, setQrUrl] = React.useState(null);
  const [togglingId, setTogglingId] = React.useState(null);

  const allSelected =
    urls.length > 0 && urls.every((url) => selectedIds.has(url._id));

  const someSelected =
    urls.some((url) => selectedIds.has(url._id)) && !allSelected;

  const getShortUrl = (url) => {
    const identifier = url.customAlias || url.shortCode;

    return `shrinkr.link/${identifier}`;
  };

  const getDisplayUrl = (longUrl) => {
    try {
      const url = new URL(longUrl);

      return url.hostname.replace(/^www\./, "");
    } catch {
      return longUrl
        .replace(/^https?:\/\//i, "")
        .replace(/^www\./i, "")
        .replace(/\/$/, "");
    }
  };

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatus = (url) => {
    const isExpired = url.expiresAt && new Date(url.expiresAt) < new Date();

    if (isExpired) {
      return "Expired";
    }

    if (url.isActive) {
      return "Active";
    }

    return "Inactive";
  };

  const handleCopy = async (url) => {
    try {
      await navigator.clipboard.writeText(`https://${getShortUrl(url)}`);

      setCopiedId(url._id);

      setTimeout(() => {
        setCopiedId(null);
      }, 1500);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handleToggleStatus = async (url) => {
    try {
      setTogglingId(url._id);

      const res = await api.patch(`/urls/${url._id}/status`);

      toast.success(
        res.data.data.isActive ? "Link activated" : "Link deactivated",
      );

      onRefresh?.();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update link status",
      );
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-border/80 bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <Checkbox
                checked={
                  allSelected ? true : someSelected ? "indeterminate" : false
                }
                onCheckedChange={() => onToggleSelectAll?.(urls)}
                aria-label="Select all"
              />
            </TableHead>

            <TableHead>URL</TableHead>
            <TableHead>Short Link</TableHead>
            <TableHead>Clicks</TableHead>
            <TableHead>Max Clicks</TableHead>
            <TableHead>Expires On</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-12" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell
                colSpan={8}
                className="h-24 text-center text-muted-foreground"
              >
                Loading links...
              </TableCell>
            </TableRow>
          ) : urls.length > 0 ? (
            urls.map((url) => {
              const shortUrl = getShortUrl(url);
              const displayUrl = getDisplayUrl(url.longUrl);
              const currentStatus = getStatus(url);

              return (
                <TableRow
                  key={url._id}
                  data-state={selectedIds.has(url._id) ? "selected" : undefined}
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.has(url._id)}
                      onCheckedChange={() => onToggleSelect?.(url._id)}
                      aria-label="Select row"
                    />
                  </TableCell>

                  <TableCell className="max-w-[280px]">
                    <div className="truncate font-medium" title={url.longUrl}>
                      {displayUrl}
                    </div>
                  </TableCell>

                  <TableCell className="min-w-[260px]">
                    <div className="flex items-center gap-2">
                      <span
                        className="max-w-[220px] truncate font-medium text-primary"
                        title={shortUrl}
                      >
                        {shortUrl}
                      </span>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 shrink-0 text-muted-foreground hover:bg-primary/5 hover:text-primary"
                        onClick={() => handleCopy(url)}
                      >
                        {copiedId === url._id ? (
                          <CheckIcon className="size-4 text-primary" />
                        ) : (
                          <CopyIcon className="size-4" />
                        )}

                        <span className="sr-only">Copy short link</span>
                      </Button>
                    </div>
                  </TableCell>

                  <TableCell className="tabular-nums">
                    {url.clickCount ?? 0}
                  </TableCell>

                  <TableCell className="whitespace-nowrap">
                    {url.maxClicks === -1
                      ? "Unlimited"
                      : (url.maxClicks ?? "—")}
                  </TableCell>

                  <TableCell className="whitespace-nowrap">
                    {formatDate(url.expiresAt)}
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="outline"
                      className={getStatusBadgeClass(currentStatus)}
                    >
                      {currentStatus}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 text-muted-foreground hover:bg-primary/5 hover:text-primary"
                        >
                          <MoreHorizontalIcon />

                          <span className="sr-only">Open actions</span>
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end" className="w-36">
                        <DropdownMenuItem
                          onClick={() =>
                            navigate(`/dashboard/analytics/${url._id}`, {
                              state: { url },
                            })
                          }
                        >
                          <BarChart3Icon />
                          Analytics
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => setQrUrl(url)}>
                          <QrCodeIcon />
                          QR Code
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => setEditingUrl(url)}>
                          <PencilIcon />
                          Edit
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          disabled={togglingId === url._id}
                          onClick={() => handleToggleStatus(url)}
                        >
                          <PowerIcon />
                          {url.isActive ? "Deactivate" : "Activate"}
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => setDeletingUrl(url)}
                        >
                          <Trash2Icon />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell
                colSpan={8}
                className="h-24 text-center text-muted-foreground"
              >
                No links found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <EditLinkSheet
        url={editingUrl}
        open={!!editingUrl}
        onOpenChange={(open) => !open && setEditingUrl(null)}
        onUpdated={onRefresh}
      />

      <DeleteLinkDialog
        url={deletingUrl}
        open={!!deletingUrl}
        onOpenChange={(open) => !open && setDeletingUrl(null)}
        onDeleted={onRefresh}
      />

      <QRCodeDialog
        url={qrUrl}
        open={!!qrUrl}
        onOpenChange={(open) => !open && setQrUrl(null)}
      />
    </div>
  );
}
