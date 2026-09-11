import * as React from "react";
import { CalendarIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function CreateAdvancedOptions({
  customAlias,
  setCustomAlias,
  expiresIn,
  setExpiresIn,
  maxClicks,
  setMaxClicks,
}) {
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

  return (
    <div className="rounded-xl border border-border bg-muted/50 p-6">
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-foreground">
          Advanced Options
        </h3>

        <p className="mt-0.5 text-xs text-muted-foreground">
          Customize your link and set usage limits.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-2 lg:col-span-2">
          <Label htmlFor="customAlias" className="text-sm font-medium">
            Custom Alias
            <span className="ml-1 font-normal text-muted-foreground">
              (optional)
            </span>
          </Label>

          <div className="flex">
            <div className="flex h-11 shrink-0 items-center rounded-l-md border border-r-0 border-input bg-accent px-3 text-sm font-medium text-primary">
              shrinkr.link/
            </div>

            <Input
              id="customAlias"
              placeholder="my-link"
              value={customAlias}
              onChange={(e) => setCustomAlias(e.target.value)}
              className="h-11 rounded-l-none shadow-none"
              autoComplete="off"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="expiresIn" className="text-sm font-medium">
            Expiration
          </Label>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="expiresIn"
                type="button"
                variant="outline"
                className="h-11 w-full justify-start gap-2 font-normal text-foreground shadow-none"
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
            Expires {Number(expiresIn) || 0} days from now.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxClicks" className="text-sm font-medium">
            Maximum Clicks
          </Label>

          <div className="flex items-center gap-2">
            <Input
              id="maxClicks"
              type="number"
              min="-1"
              value={maxClicks}
              onChange={(e) => setMaxClicks(e.target.value)}
              className="h-11 shadow-none"
            />

            <span className="shrink-0 text-sm text-muted-foreground">
              clicks
            </span>
          </div>

          <p className="text-xs text-muted-foreground">
            Use -1 for unlimited clicks.
          </p>
        </div>
      </div>
    </div>
  );
}
