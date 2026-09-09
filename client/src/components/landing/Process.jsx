import {
  Link2,
  Copy,
  QrCode,
  CalendarDays,
  MousePointerClick,
  ArrowRight,
} from "lucide-react";

const Control = ({ children, className = "" }) => (
  <div
    className={`flex h-10 min-w-0 items-center rounded-lg bg-gray-50 px-3 ${className}`}
  >
    {children}
  </div>
);

const IconBox = ({ children }) => (
  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-black/[0.06] bg-white text-[#3262DA]">
    {children}
  </div>
);

const VisualShell = ({ children }) => (
  <div className="h-[250px] w-full min-w-0 rounded-2xl border border-gray-200 bg-white p-2.5 sm:h-[265px] sm:p-3 md:h-[275px]">
    <div className="flex h-full min-w-0 flex-col rounded-xl bg-[#F8FAFF] p-4 sm:p-5">
      {children}
    </div>
  </div>
);

const steps = [
  {
    number: "01",
    title: "Paste your URL",
    description:
      "Enter the long link you want to shorten and get a shareable URL in seconds.",

    visual: (
      <VisualShell>
        <div className="flex h-full min-w-0 flex-col items-center justify-center text-center">
          <IconBox>
            <Link2 size={17} strokeWidth={1.7} />
          </IconBox>

          <h4 className="mt-3 text-sm font-semibold tracking-tight text-gray-900">
            Paste your long URL
          </h4>

          <p className="mt-1 max-w-[220px] text-[11px] leading-4 text-[#8F95AA]">
            Start with any link you want to shorten.
          </p>

          <div className="mt-5 w-full min-w-0 rounded-xl border border-gray-200 bg-white p-2">
            <Control className="gap-2">
              <Link2
                size={14}
                strokeWidth={1.7}
                className="shrink-0 text-[#3262DA]"
              />

              <span className="min-w-0 truncate text-[10px] text-gray-400 sm:text-[11px]">
                https://example.com/your-long-url
              </span>
            </Control>

            <button
              type="button"
              className="mt-2 flex h-9 w-full items-center justify-center gap-1.5 rounded-lg bg-[#3262DA] text-[10px] font-medium text-white transition-colors duration-150 hover:bg-[#2854C7] sm:text-[11px]"
            >
              Shorten Link
              <ArrowRight size={13} strokeWidth={1.7} />
            </button>
          </div>
        </div>
      </VisualShell>
    ),
  },

  {
    number: "02",
    title: "Customize your link",
    description:
      "Use an optional custom alias, set an expiry date, or limit how many times it can be opened.",

    visual: (
      <VisualShell>
        <div className="flex h-full min-w-0 flex-col justify-center">
          <div className="min-w-0 rounded-xl border border-gray-200 bg-white p-3">
            <div className="flex items-center justify-between gap-3">
              <span className="truncate text-[9px] font-semibold uppercase tracking-[0.12em] text-gray-400">
                Custom alias
              </span>

              <span className="shrink-0 text-[9px] font-medium text-[#3262DA]">
                Optional
              </span>
            </div>

            <Control className="mt-2">
              <span className="shrink-0 text-[10px] text-gray-400 sm:text-[11px]">
                shrinkr.link/
              </span>

              <span className="ml-1 truncate text-[10px] font-medium text-gray-800 sm:text-[11px]">
                my-link
              </span>
            </Control>
          </div>

          <div className="mt-2.5 grid min-w-0 grid-cols-2 gap-2">
            <div className="min-w-0 rounded-xl border border-gray-200 bg-white p-3">
              <div className="flex items-center gap-2">
                <CalendarDays
                  size={14}
                  strokeWidth={1.7}
                  className="shrink-0 text-[#3262DA]"
                />

                <span className="truncate text-[10px] font-medium text-gray-500">
                  Expiry
                </span>
              </div>

              <div className="mt-2 flex h-8 items-center rounded-lg bg-gray-50 px-2.5">
                <span className="text-[10px] font-medium text-gray-700 sm:text-[11px]">
                  90 days
                </span>
              </div>
            </div>

            <div className="min-w-0 rounded-xl border border-gray-200 bg-white p-3">
              <div className="flex items-center gap-2">
                <MousePointerClick
                  size={14}
                  strokeWidth={1.7}
                  className="shrink-0 text-[#3262DA]"
                />

                <span className="truncate text-[10px] font-medium text-gray-500">
                  Clicks
                </span>
              </div>

              <div className="mt-2 flex h-8 items-center rounded-lg bg-gray-50 px-2.5">
                <span className="text-[10px] font-medium text-gray-700 sm:text-[11px]">
                  Unlimited
                </span>
              </div>
            </div>
          </div>
        </div>
      </VisualShell>
    ),
  },

  {
    number: "03",
    title: "Share anywhere",
    description:
      "Copy your short link, open it instantly, or generate a QR code whenever you need one.",

    visual: (
      <VisualShell>
        <div className="flex h-full min-w-0 flex-col justify-center">
          <div className="min-w-0 rounded-xl border border-gray-200 bg-white p-3">
            <div className="flex items-center justify-between gap-3">
              <span className="truncate text-[9px] font-semibold uppercase tracking-[0.12em] text-gray-400">
                Your short link
              </span>

              <span className="shrink-0 text-[9px] font-medium text-gray-400">
                Ready
              </span>
            </div>

            <div className="mt-2 flex min-w-0 items-center gap-2">
              <div className="flex h-10 min-w-0 flex-1 items-center rounded-lg bg-blue-50/70 px-3">
                <span className="truncate text-[11px] font-semibold text-[#3262DA] sm:text-xs">
                  shrinkr.link/a8X2
                </span>
              </div>

              <button
                type="button"
                className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#3262DA] text-white transition-colors duration-150 hover:bg-[#2854C7]"
              >
                <Copy size={15} strokeWidth={1.7} />
              </button>
            </div>
          </div>

          <div className="mt-2.5 grid min-w-0 grid-cols-[minmax(0,1fr)_40px] gap-2">
            <button
              type="button"
              className="flex h-10 min-w-0 items-center justify-center rounded-lg border border-gray-200 bg-white px-3 text-[10px] font-medium text-gray-600 transition-colors duration-150 hover:bg-gray-50 sm:text-[11px]"
            >
              Open link
            </button>

            <button
              type="button"
              className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-[#3262DA] transition-colors duration-150 hover:bg-gray-50"
            >
              <QrCode size={16} strokeWidth={1.7} />
            </button>
          </div>
        </div>
      </VisualShell>
    ),
  },
];

const Process = () => {
  return (
    <section
      id="process"
      className="w-full bg-[#F7F8FC] px-4 py-16 sm:px-6 sm:py-20 md:py-22"
    >
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}
        <div className="text-center">
          <p className="inline-flex items-center rounded-full border border-[#3262DA]/10 bg-[#3262DA]/[0.06] px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-[#3262DA] sm:px-4 sm:text-[11px]">
            PROCESS
          </p>

          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-bold leading-[1.05] tracking-[-0.045em] text-gray-900 sm:text-4xl md:text-5xl">
            Shorten a link in{" "}
            <span className="text-[#3262DA]">three simple steps.</span>
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#8F95AA] md:text-base">
            From a long URL to a ready-to-share link in just a few seconds.
          </p>
        </div>

        {/* Visuals */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`min-w-0 ${
                step.number === "03" ? "sm:col-span-2 md:col-span-1" : ""
              }`}
            >
              {step.visual}
            </div>
          ))}
        </div>

        {/* Details */}
        <div className="mt-5 grid grid-cols-1 gap-7 sm:mt-6 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-9 md:grid-cols-3 md:gap-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`min-w-0 ${
                step.number === "03" ? "sm:col-span-2 md:col-span-1" : ""
              }`}
            >
              <div className="flex h-4 items-center gap-2">
                <span className="size-1.5 shrink-0 rounded-full bg-[#3262DA]" />

                <span className="shrink-0 text-[10px] font-semibold tracking-[0.14em] text-[#9AA1B2]">
                  {step.number}
                </span>

                <div className="h-px min-w-0 flex-1 bg-[#3262DA]/10" />
              </div>

              <h3 className="mt-3 text-lg font-semibold tracking-tight text-gray-900 sm:text-xl">
                {step.title}
              </h3>

              <p className="mt-1.5 max-w-[300px] text-xs leading-5 text-[#8F95AA] sm:text-sm sm:leading-6">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
