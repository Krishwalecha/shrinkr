import { useCallback, useEffect, useState } from "react";
import { LayoutDashboardIcon } from "lucide-react";
import { toast } from "sonner";

import api from "@/lib/api";

import { PageHeader } from "@/components/dashboard/shared/page-header";
import { ChartAreaInteractive } from "@/components/dashboard/overview/chart-area-interactive";
import { DataTable } from "@/components/dashboard/overview/data-table";
import { SectionCards } from "@/components/dashboard/overview/section-cards";

export default function Overview() {
  const [overview, setOverview] = useState({});

  const fetchOverview = useCallback(async () => {
    try {
      const res = await api.get("/urls/overview");

      setOverview(res.data.data);
    } catch (error) {
      toast.error("Failed to fetch overview");
    }
  }, []);

  useEffect(() => {
    fetchOverview();
  }, [fetchOverview]);

  return (
    <div className="flex flex-col gap-6">
      <div className="px-4 lg:px-6">
        <PageHeader
          icon={<LayoutDashboardIcon className="size-5" />}
          title="Overview"
          description="A snapshot of your links and their performance."
        />
      </div>

      <SectionCards overview={overview} />

      <div className="px-4 lg:px-6">
        <ChartAreaInteractive clicksOverTime={overview.clicksOverTime ?? []} />
      </div>

      <DataTable data={overview.recentUrls ?? []} onRefresh={fetchOverview} />
    </div>
  );
}
