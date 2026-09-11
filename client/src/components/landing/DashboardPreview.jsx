import { LayoutDashboardIcon } from "lucide-react";

import { SectionCards } from "@/components/dashboard/overview/section-cards";
import { ChartAreaInteractive } from "@/components/dashboard/overview/chart-area-interactive";
import { DataTable } from "@/components/dashboard/overview/data-table";

const dummyOverview = {
  stats: {
    totalUrls: 24,
    activeUrls: 18,
    inactiveUrls: 4,
    expiredUrls: 2,
  },

  clicksOverTime: Array.from({ length: 30 }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));

    return {
      date: date.toISOString().slice(0, 10),
      clicks: Math.floor(30 + Math.random() * 70 + i * 2),
    };
  }),

  recentUrls: [
    {
      _id: "1",
      longUrl: "https://example.com/blog/how-to-shorten-urls-effectively",
      customAlias: "a8X2d3",
      shortCode: "a8X2d3",
      clickCount: 4281,
      maxClicks: -1,
      expiresAt: new Date(Date.now() + 2000 * 60 * 60 * 24 * 45).toISOString(),
      isActive: true,
    },
    {
      _id: "2",
      longUrl: "https://docs.google.com/spreadsheets/d/some-long-id",
      customAlias: null,
      shortCode: "f9KdX9",
      clickCount: 2914,
      maxClicks: 5000,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 45).toISOString(),
      isActive: true,
    },
    {
      _id: "3",
      longUrl: "https://github.com/krishwalecha/shrinkr",
      customAlias: "Q2LmLn",
      shortCode: "Q2LmLn",
      clickCount: 1842,
      maxClicks: -1,
      expiresAt: new Date(Date.now() + 500 * 60 * 60 * 24 * 45).toISOString(),
      isActive: false,
    },
  ],
};

const DashboardPreview = () => {
  return (
    <section className="mx-auto mt-8 w-full max-w-6xl px-4 sm:px-6 mb-8 md:mb-0">
      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-white/[0.18]
          bg-white/[0.09]
          p-2
          shadow-[0_14px_45px_rgba(10,25,80,0.24)]
          backdrop-blur-md
          sm:p-2.5
        "
      >
        <div className="@container/main overflow-hidden rounded-xl bg-background">
          <div className="flex items-center gap-3 border-b border-border px-4 py-4 sm:px-6">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <LayoutDashboardIcon className="size-5" />
            </div>

            <div className="min-w-0">
              <h3 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
                Overview
              </h3>

              <p className="truncate text-xs text-muted-foreground sm:text-sm">
                A snapshot of your links and their performance.
              </p>
            </div>
          </div>

          <div
            className="
              flex
              flex-col
              gap-4
              p-4
              sm:gap-5
              sm:p-5

              [&_[data-slot=card]]:gap-2
              [&_[data-slot=card]]:py-3.5
              [&_[data-slot=card]]:shadow-none
              [&_[data-slot=card-header]]:gap-0.5
              [&_[data-slot=card-header]]:px-3.5
              [&_[data-slot=card-footer]]:hidden
              [&_[data-slot=card-title]]:text-lg
              [&_[data-slot=badge]]:max-lg:hidden
            "
          >
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="contents [&>div]:contents">
                <SectionCards overview={dummyOverview} />
              </div>
            </div>

            {/* Chart */}
            <div className="relative h-[190px] overflow-hidden rounded-xl sm:h-[220px]">
              <div
                className="
                  pointer-events-none
                  select-none

                  [&_text]:!fill-slate-600
                "
              >
                <ChartAreaInteractive
                  clicksOverTime={dummyOverview.clicksOverTime}
                />
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent" />
            </div>

            {/* Recent links */}
            <div className="relative h-[260px] overflow-hidden rounded-xl sm:h-[290px] hidden md:block">
              <div
                className="
                  pointer-events-none
                  select-none

                  [&_h2]:!text-slate-900
                  [&_p]:!text-slate-500
                  [&_table]:!text-slate-900
                  [&_th]:!text-slate-600
                  [&_td]:!text-slate-900
                  [&_td_span:not([data-slot=badge])]:!text-primary
                "
              >
                <DataTable data={dummyOverview.recentUrls} />
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-background to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
