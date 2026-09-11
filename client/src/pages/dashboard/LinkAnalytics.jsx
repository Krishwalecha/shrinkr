import * as React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeftIcon,
  BarChart3,
  CalendarIcon,
  CheckIcon,
  CopyIcon,
  Globe2,
  Laptop,
  Smartphone,
} from "lucide-react";
import { toast } from "sonner";

import api from "@/lib/api";
import { getStatusBadgeClass } from "@/lib/status";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { PageHeader } from "@/components/dashboard/shared/page-header";
import { AnalyticsRange } from "@/components/dashboard/analytics/analytics-range";
import { AnalyticsChart } from "@/components/dashboard/analytics/analytics-chart";
import { AnalyticsBreakdown } from "@/components/dashboard/analytics/analytics-breakdown";

export default function LinkAnalytics() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [analytics, setAnalytics] = React.useState(null);
  const url = location.state?.url ?? analytics?.url ?? null;
  const [loading, setLoading] = React.useState(true);
  const [copied, setCopied] = React.useState(false);

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

        const res = await api.get(`/urls/${id}/analytics`, { params });

        setAnalytics(res.data.data);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch link analytics",
        );
      } finally {
        setLoading(false);
      }
    },
    [id, range, customStartDate, customEndDate],
  );

  React.useEffect(() => {
    if (range === "custom") return;

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

  const formatDate = (date) =>
    new Date(`${date}T00:00:00Z`).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });

  const formatFullDate = (date) =>
    new Date(`${date}T00:00:00Z`).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const getRangeLabel = () => {
    if (range === "all") return "All time";
    if (range === "7d") return "Last 7 days";
    if (range === "30d") return "Last 30 days";
    if (range === "90d") return "Last 90 days";

    return "Custom range";
  };

  const shortIdentifier = url?.customAlias || url?.shortCode;
  const shortUrl = shortIdentifier ? `shrinkr.link/${shortIdentifier}` : null;

  const isExpired = url?.expiresAt && new Date(url.expiresAt) < new Date();
  const status = isExpired ? "Expired" : url?.isActive === false ? "Inactive" : "Active";

  const handleCopy = async () => {
    if (!shortUrl) return;

    try {
      await navigator.clipboard.writeText(`https://${shortUrl}`);
      setCopied(true);
      toast.success("Short link copied");

      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const clicksOverTime = analytics?.clicksOverTime ?? [];
  const totalClicks =
    url?.clickCount ??
    clicksOverTime.reduce((sum, item) => sum + (item.clicks ?? 0), 0);

  const breakdown = analytics?.breakdown ?? {};
  const osData = formatData(breakdown.os);
  const browserData = formatData(breakdown.browsers);
  const countryData = formatData(breakdown.countries);
  const deviceData = formatData(breakdown.deviceTypes);
  const referrerData = formatData(breakdown.referrers);

  return (
    <div className="flex flex-col gap-6 px-4 lg:px-6">
      <PageHeader
        icon={<BarChart3 className="size-5" />}
        title="Link Analytics"
        description={url ? shortUrl : "Performance for this shortened link"}
        action={
          <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeftIcon className="size-4" />
            Back
          </Button>
        }
      />

      {url && (
        <Card className="border-border/80 bg-card shadow-none">
          <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="truncate text-base font-semibold text-primary">
                  {shortUrl}
                </p>

                <Button
                  variant="ghost"
                  size="icon"
                  className="size-7 shrink-0 text-muted-foreground hover:bg-primary/5 hover:text-primary"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <CheckIcon className="size-3.5 text-primary" />
                  ) : (
                    <CopyIcon className="size-3.5" />
                  )}

                  <span className="sr-only">Copy short link</span>
                </Button>

                <Badge variant="outline" className={getStatusBadgeClass(status)}>
                  {status}
                </Badge>
              </div>

              <p
                className="mt-1 truncate text-sm text-muted-foreground"
                title={url.longUrl}
              >
                {url.longUrl}
              </p>
            </div>

            <div className="flex shrink-0 gap-6 text-sm">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Max Clicks
                </p>

                <p className="mt-1 font-semibold text-foreground">
                  {url.maxClicks === -1 ? "Unlimited" : (url.maxClicks ?? "—")}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Expires On
                </p>

                <p className="mt-1 font-semibold text-foreground">
                  {url.expiresAt
                    ? new Date(url.expiresAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "—"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <AnalyticsRange range={range} setRange={setRange} />

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

      {loading ? (
        <div className="flex min-h-[200px] items-center justify-center text-sm text-muted-foreground">
          Loading analytics...
        </div>
      ) : (
        <>
          <AnalyticsChart
            data={clicksOverTime}
            rangeLabel={getRangeLabel()}
            formatDate={formatDate}
            formatFullDate={formatFullDate}
            totalClicks={totalClicks}
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
        </>
      )}
    </div>
  );
}
