import { Button } from "@/components/ui/button";

export function AnalyticsRange({ range, setRange }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        variant={range === "all" ? "default" : "outline"}
        size="sm"
        onClick={() => setRange("all")}
      >
        All time
      </Button>

      <Button
        variant={range === "7d" ? "default" : "outline"}
        size="sm"
        onClick={() => setRange("7d")}
      >
        7d
      </Button>

      <Button
        variant={range === "30d" ? "default" : "outline"}
        size="sm"
        onClick={() => setRange("30d")}
      >
        30d
      </Button>

      <Button
        variant={range === "90d" ? "default" : "outline"}
        size="sm"
        onClick={() => setRange("90d")}
      >
        90d
      </Button>

      <Button
        variant={range === "custom" ? "default" : "outline"}
        size="sm"
        onClick={() => setRange("custom")}
      >
        Custom
      </Button>
    </div>
  );
}
