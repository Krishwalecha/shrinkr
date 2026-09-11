import { Link2 } from "lucide-react";

import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

import { CreateAdvancedOptions } from "./CreateAdvancedOptions";

export function CreateForm({
  longUrl,
  setLongUrl,
  customAlias,
  setCustomAlias,
  expiresIn,
  setExpiresIn,
  maxClicks,
  setMaxClicks,
  loading,
  onSubmit,
}) {
  return (
    <Card>
      <CardContent className="px-6">
        <form onSubmit={onSubmit} className="space-y-7">
          <div className="space-y-2">
            <Label htmlFor="longUrl" className="text-sm font-medium">
              Long URL
            </Label>

            <div className="relative">
              <Link2 className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="longUrl"
                placeholder="https://example.com/your-long-url"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                className="h-12 pl-10 text-sm shadow-none"
                autoComplete="off"
              />
            </div>

            <p className="text-xs text-muted-foreground">
              HTTP and HTTPS URLs are supported.
            </p>
          </div>

          <CreateAdvancedOptions
            customAlias={customAlias}
            setCustomAlias={setCustomAlias}
            expiresIn={expiresIn}
            setExpiresIn={setExpiresIn}
            maxClicks={maxClicks}
            setMaxClicks={setMaxClicks}
          />

          <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              Your short link will be ready instantly.
            </p>

            <Button
              type="submit"
              disabled={loading}
              className="h-11 px-6 cursor-pointer"
            >
              {loading ? <Loader /> : "Create Short Link"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
