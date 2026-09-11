import * as React from "react";
import {
  BarChart3,
  CalendarIcon,
  Globe2,
  Laptop,
  Link2,
  MousePointerClick,
  Smartphone,
} from "lucide-react";
import { toast } from "sonner";

import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { PageHeader } from "@/components/dashboard/shared/page-header";
import { AnalyticsRange } from "@/components/dashboard/analytics/analytics-range";
import { AnalyticsSummary } from "@/components/dashboard/analytics/analytics-summary";
import { AnalyticsChart } from "@/components/dashboard/analytics/analytics-chart";
import { AnalyticsBreakdown } from "@/components/dashboard/analytics/analytics-breakdown";
import { TopPerformingLinks } from "@/components/dashboard/analytics/top-performing-links";

export default function Analytics() {
  const [analytics, setAnalytics] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const [range, setRange] = React.useState("all");
  const [customStartDate, setCustomStartDate] = React.useState("");
  const [customEndDate, setCustomEndDate] = React.useState("");

  const formatApiDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const fetchAnalytics = React.useCallback(
    async (selectedRange = range) => {
      try {
        setLoading(true);

        const params = {};

        if (selectedRange === "7d") {
          const end = new Date();
          const start = new Date();

          start.setDate(end.getDate() - 6);

          params.startDate = formatApiDate(start);
          params.endDate = formatApiDate(end);
        }

        if (selectedRange === "30d") {
          const end = new Date();
          const start = new Date();

          start.setDate(end.getDate() - 29);

          params.startDate = formatApiDate(start);
          params.endDate = formatApiDate(end);
        }

        if (selectedRange === "90d") {
          const end = new Date();
          const start = new Date();

          start.setDate(end.getDate() - 89);

          params.startDate = formatApiDate(start);
          params.endDate = formatApiDate(end);
        }

        if (selectedRange === "custom") {
          if (!customStartDate || !customEndDate) {
            setLoading(false);
            return;
          }

          if (customStartDate > customEndDate) {
            toast.error("Start date cannot be after end date");
            setLoading(false);
            return;
          }

          params.startDate = customStartDate;
          params.endDate = customEndDate;
        }

        const res = await api.get("/urls/analytics", {
          params,
        });

        setAnalytics(res.data.data);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch analytics",
        );
      } finally {
        setLoading(false);
      }
    },
    [range, customStartDate, customEndDate],
  );

  React.useEffect(() => {
    if (range === "custom") {
      return;
    }

    fetchAnalytics(range);
  }, [range, fetchAnalytics]);

  const formatData = (data = {}) => {
    return Object.entries(data)
      .map(([name, value]) => ({
        name: name.replace(/_/g, "."),
        value,
      }))
      .sort((a, b) => b.value - a.value);
  };

  const formatDate = (date) => {
    return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });
  };

  const formatFullDate = (date) => {
    return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getShortUrl = (url) => {
    const identifier = url.customAlias || url.shortCode;

    return `shrinkr.link/${identifier}`;
  };

  const getDisplayUrl = (url) => {
    try {
      return new URL(url.longUrl).hostname.replace(/^www\./, "");
    } catch {
      return url.longUrl;
    }
  };

  const getRangeLabel = () => {
    if (range === "all") return "All time";
    if (range === "7d") return "Last 7 days";
    if (range === "30d") return "Last 30 days";
    if (range === "90d") return "Last 90 days";

    return "Custom range";
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-6 px-4 lg:px-6">
        <PageHeader
          icon={<BarChart3 className="size-5" />}
          title="Analytics"
          description="Track performance across your shortened links"
        />

        <div className="flex min-h-[300px] items-center justify-center text-sm text-muted-foreground">
          Loading analytics...
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="flex flex-col gap-6 px-4 lg:px-6">
        <PageHeader
          icon={<BarChart3 className="size-5" />}
          title="Analytics"
          description="Track performance across your shortened links"
        />

        <div className="flex min-h-[300px] items-center justify-center text-sm text-muted-foreground">
          No analytics available.
        </div>
      </div>
    );
  }

  const totalClicks = analytics.summary?.totalClicks ?? 0;
  const totalLinks = analytics.summary?.totalUrls ?? 0;

  const clicksOverTime = analytics.clicksOverTime ?? [];

  const osData = formatData(analytics.os);
  const browserData = formatData(analytics.browsers);
  const countryData = formatData(analytics.countries);
  const deviceData = formatData(analytics.deviceTypes);
  const referrerData = formatData(analytics.referrers);

  return (
    <div className="flex flex-col gap-6 px-4 lg:px-6">
      <PageHeader
        icon={<BarChart3 className="size-5" />}
        title="Analytics"
        description="Track performance across your shortened links"
        action={<AnalyticsRange range={range} setRange={setRange} />}
      />

      {range === "custom" && (
        <div className="rounded-xl border bg-card p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Start date</label>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-[180px] justify-start gap-2 font-normal text-foreground shadow-none"
                  >
                    <CalendarIcon className="size-4 text-muted-foreground" />

                    {customStartDate || "Pick a date"}
                  </Button>
                </PopoverTrigger>

                <PopoverContent align="start" className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={
                      customStartDate ? new Date(customStartDate) : undefined
                    }
                    onSelect={(date) =>
                      setCustomStartDate(formatApiDate(date))
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">End date</label>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-[180px] justify-start gap-2 font-normal text-foreground shadow-none"
                  >
                    <CalendarIcon className="size-4 text-muted-foreground" />

                    {customEndDate || "Pick a date"}
                  </Button>
                </PopoverTrigger>

                <PopoverContent align="start" className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={
                      customEndDate ? new Date(customEndDate) : undefined
                    }
                    onSelect={(date) => setCustomEndDate(formatApiDate(date))}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <Button
              onClick={() => fetchAnalytics("custom")}
              disabled={!customStartDate || !customEndDate}
            >
              Apply
            </Button>
          </div>
        </div>
      )}

      <AnalyticsSummary
        totalClicks={totalClicks}
        totalLinks={totalLinks}
        rangeLabel={getRangeLabel()}
      />

      <AnalyticsChart
        data={clicksOverTime}
        rangeLabel={getRangeLabel()}
        formatDate={formatDate}
        formatFullDate={formatFullDate}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <AnalyticsBreakdown
          title="Devices"
          description="Clicks by device type"
          icon={<Smartphone className="size-4" />}
          data={deviceData}
        />

        <AnalyticsBreakdown
          title="Operating Systems"
          description="Clicks by operating system"
          icon={<Laptop className="size-4" />}
          data={osData}
        />

        <AnalyticsBreakdown
          title="Browsers"
          description="Clicks by browser"
          icon={<Globe2 className="size-4" />}
          data={browserData}
        />

        <AnalyticsBreakdown
          title="Countries"
          description="Clicks by country"
          icon={<Globe2 className="size-4" />}
          data={countryData}
        />

        <AnalyticsBreakdown
          title="Referrers"
          description="Where your clicks came from"
          icon={<BarChart3 className="size-4" />}
          data={referrerData}
        />
      </div>

      <TopPerformingLinks
        urls={analytics.topUrls}
        getShortUrl={getShortUrl}
        getDisplayUrl={getDisplayUrl}
      />
    </div>
  );
}
