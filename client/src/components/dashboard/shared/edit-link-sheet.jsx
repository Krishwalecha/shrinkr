import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { toast } from "sonner";

import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";

export function EditLinkSheet({ url, open, onOpenChange, onUpdated }) {
  const [longUrl, setLongUrl] = React.useState("");
  const [customAlias, setCustomAlias] = React.useState("");
  const [expiresIn, setExpiresIn] = React.useState(90);
  const [maxClicks, setMaxClicks] = React.useState(-1);
  const [saving, setSaving] = React.useState(false);

  const expiryDate = React.useMemo(() => {
    const days = Number(expiresIn);

    if (!days || days <= 0) return null;

    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + days);

    return date;
  }, [expiresIn]);

  const handleSelectDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selected = new Date(date);
    selected.setHours(0, 0, 0, 0);

    const diffDays = Math.max(
      1,
      Math.round((selected - today) / (1000 * 60 * 60 * 24)),
    );

    setExpiresIn(diffDays);
  };

  React.useEffect(() => {
    if (url) {
      setLongUrl(url.longUrl || "");
      setCustomAlias(url.customAlias || "");
      setExpiresIn(url.expiresIn ?? 90);
      setMaxClicks(url.maxClicks ?? -1);
    }
  }, [url]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!longUrl.trim()) {
      toast.error("Long URL is required");
      return;
    }

    if (!Number.isInteger(Number(expiresIn)) || Number(expiresIn) <= 0) {
      toast.error("Expiration days must be a positive number");
      return;
    }

    const maxClicksNum = Number(maxClicks);

    if (
      !Number.isInteger(maxClicksNum) ||
      maxClicksNum < -1 ||
      maxClicksNum === 0
    ) {
      toast.error("Max clicks must be -1 (unlimited) or a positive number");
      return;
    }

    try {
      setSaving(true);

      await api.patch(`/urls/${url._id}`, {
        longUrl: longUrl.trim(),
        customAlias: customAlias.trim(),
        expiresIn: Number(expiresIn),
        maxClicks: maxClicksNum,
      });

      toast.success("Link updated");
      onOpenChange(false);
      onUpdated?.();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update link");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Link</SheetTitle>

          <SheetDescription>
            Update the destination, alias, expiration, or click limit for this
            link.
          </SheetDescription>
        </SheetHeader>

        <form
          id="edit-link-form"
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col gap-5 overflow-y-auto px-4"
        >
          <div className="space-y-2">
            <Label htmlFor="edit-longUrl">Long URL</Label>

            <Input
              id="edit-longUrl"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder="https://example.com/your-long-url"
              autoComplete="off"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-customAlias">
              Custom Alias
              <span className="ml-1 font-normal text-muted-foreground">
                (optional)
              </span>
            </Label>

            <div className="flex">
              <div className="flex h-9 shrink-0 items-center rounded-l-md border border-r-0 border-input bg-accent px-2.5 text-sm font-medium text-primary">
                shrinkr.link/
              </div>

              <Input
                id="edit-customAlias"
                value={customAlias}
                onChange={(e) => setCustomAlias(e.target.value)}
                placeholder="my-link"
                className="rounded-l-none"
                autoComplete="off"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-expiresIn">Expiration</Label>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="edit-expiresIn"
                  type="button"
                  variant="outline"
                  className="w-full justify-start gap-2 font-normal text-foreground shadow-none"
                >
                  <CalendarIcon className="size-4 text-muted-foreground" />

                  {expiryDate
                    ? expiryDate.toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "Pick an expiry date"}
                </Button>
              </PopoverTrigger>

              <PopoverContent align="start" className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={expiryDate}
                  onSelect={handleSelectDate}
                  disabled={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return date < today;
                  }}
                />
              </PopoverContent>
            </Popover>

            <p className="text-xs text-muted-foreground">
              Expires {Number(expiresIn) || 0} days from when the link was
              created.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-maxClicks">Max Clicks</Label>

            <Input
              id="edit-maxClicks"
              type="number"
              min="-1"
              value={maxClicks}
              onChange={(e) => setMaxClicks(e.target.value)}
            />

            <p className="text-xs text-muted-foreground">
              Use -1 for unlimited clicks.
            </p>
          </div>
        </form>

        <SheetFooter>
          <Button type="submit" form="edit-link-form" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
