const DashboardPreview = () => {
  return (
    <section className="mx-auto mt-8 hidden w-full max-w-5xl overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-2 backdrop-blur-sm md:block">
      {/*Mock Dashboard Preview */}
      <div className="overflow-hidden rounded-xl bg-white">
        {/* Dashboard Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
              Analytics
            </p>

            <h3 className="mt-1 text-xl font-semibold tracking-tight text-gray-900">
              Overview
            </h3>
          </div>

          <div className="rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-600">
            Last 7 days
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 p-4">
          {[
            ["Total Clicks", "12,842"],
            ["Active Links", "24"],
            ["Countries", "18"],
            ["Devices", "7"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-lg border border-gray-200 p-4 text-left"
            >
              <p className="text-xs text-gray-400">{label}</p>

              <p className="mt-2 text-xl font-semibold tracking-tight text-gray-900">
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Analytics */}
        <div className="grid grid-cols-[minmax(0,1fr)_240px] gap-3 px-4 pb-4">
          {/* Chart */}
          <div className="rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-800">
                Clicks Over Time
              </p>

              <p className="text-xs text-gray-400">
                Jan 1 — Jan 7
              </p>
            </div>

            <div className="mt-5 flex h-40 items-end gap-2">
              {[35, 52, 44, 68, 58, 82, 70, 92, 76, 88, 72, 96].map(
                (height, index) => (
                  <div
                    key={index}
                    className="flex-1 rounded-t bg-[#3262DA]/20"
                    style={{ height: `${height}%` }}
                  />
                ),
              )}
            </div>
          </div>

          {/* Top Links */}
          <div className="rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-800">
                Top Links
              </p>

              <span className="text-xs font-medium text-[#3262DA]">
                View all
              </span>
            </div>

            <div className="mt-4 space-y-4">
              {[
                ["shrinkr.link/a8X2", "4,281"],
                ["shrinkr.link/f9Kd", "2,914"],
                ["shrinkr.link/Q2Lm", "1,842"],
              ].map(([url, clicks]) => (
                <div key={url}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="truncate text-xs font-medium text-gray-700">
                      {url}
                    </p>

                    <p className="shrink-0 text-xs text-gray-400">
                      {clicks}
                    </p>
                  </div>

                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-100">
                    <div className="h-full w-3/4 rounded-full bg-[#3262DA]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
