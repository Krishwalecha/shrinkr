const DashboardPreview = () => {
  const stats = [
    ["Total Clicks", "12,842"],
    ["Active Links", "24"],
    ["Countries", "18"],
    ["Devices", "7"],
  ];

  const links = [
    ["shrinkr.link/a8X2", "4,281"],
    ["shrinkr.link/f9Kd", "2,914"],
    ["shrinkr.link/Q2Lm", "1,842"],
  ];

  const bars = [35, 52, 44, 68, 58, 82, 70, 92, 76, 88, 72, 96];

  return (
    <section className="mx-auto mt-8 hidden w-full max-w-5xl px-5 sm:px-6 md:block">
      {/* Outer glass frame */}
      <div
        className="
          rounded-2xl
          border
          border-white/[0.18]
          bg-white/[0.09]
          p-2.5
          shadow-[0_14px_45px_rgba(10,25,80,0.24)]
          backdrop-blur-md
        "
      >
        {/* Dashboard */}
        <div className="overflow-hidden rounded-xl bg-white">
          { /* Header */}

          <div className="flex h-[76px] items-center justify-between border-b border-gray-200 px-6">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-gray-400">
                Analytics
              </p>

              <h3 className="mt-1 text-xl font-semibold tracking-tight text-gray-900">
                Overview
              </h3>
            </div>

            <div className="rounded-lg border border-gray-200 px-3.5 py-2 text-xs font-medium text-gray-500">
              Last 7 days
            </div>
          </div>

          {/* Stats */}

          <div className="grid grid-cols-4 gap-3.5 p-4">
            {stats.map(([label, value]) => (
              <div
                key={label}
                className="
                  flex
                  h-[82px]
                  flex-col
                  justify-center
                  rounded-lg
                  border
                  border-gray-200
                  px-4
                "
              >
                <p className="text-[10px] font-medium text-gray-400">{label}</p>

                <p className="mt-1.5 text-xl font-semibold tracking-tight text-gray-900">
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Charts */}

          <div className="grid gap-3.5 px-4 pb-4 md:grid-cols-[minmax(0,1fr)_250px]">
            {/* Click chart */}
            <div
              className="
                h-[218px]
                rounded-lg
                border
                border-gray-200
                p-4
              "
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-medium text-gray-800">
                  Clicks Over Time
                </p>

                <p className="text-[10px] text-gray-400">Jan 1 — Jan 7</p>
              </div>

              <div className="mt-5 flex h-[155px] items-end gap-2">
                {bars.map((height, index) => (
                  <div
                    key={index}
                    className={`
                      flex-1
                      rounded-t-md
                      transition-all
                      duration-500
                      ${index >= 8 ? "bg-[#3262DA]/50" : "bg-[#3262DA]/15"}
                    `}
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Top links */}
            <div
              className="
                h-[218px]
                rounded-lg
                border
                border-gray-200
                p-4
              "
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-gray-800">Top Links</p>

                <span className="cursor-pointer text-[10px] font-medium text-[#3262DA]">
                  View all
                </span>
              </div>

              <div className="mt-5 space-y-4">
                {links.map(([url, clicks], index) => (
                  <div key={url}>
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-[10px] font-medium text-gray-700">
                        {url}
                      </p>

                      <p className="shrink-0 text-[10px] text-gray-400">
                        {clicks}
                      </p>
                    </div>

                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-[#3262DA]"
                        style={{
                          width:
                            index === 0 ? "82%" : index === 1 ? "65%" : "48%",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
