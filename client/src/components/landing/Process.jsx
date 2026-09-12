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
    className={`flex h-10 min-w-0 items-center rounded-lg bg-muted px-3 ${className}`}
  >
    {children}
  </div>
);

const IconBox = ({ children }) => (
  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-primary">
    {children}
  </div>
);

const VisualShell = ({ children }) => (
  <div className="h-[250px] w-full min-w-0 rounded-2xl border border-border bg-card p-2.5 sm:h-[265px] sm:p-3 md:h-[275px]">
    <div className="flex h-full min-w-0 flex-col rounded-xl bg-background p-4 sm:p-5">
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

          <p className="mt-3 text-sm font-semibold tracking-tight text-foreground">
            Paste your long URL
          </p>

          <p className="mt-1 max-w-[220px] text-[11px] leading-4 text-muted-foreground">
            Start with any link you want to shorten.
          </p>

          <div className="mt-5 w-full min-w-0 rounded-xl border border-border bg-card p-2">
            <Control className="gap-2">
              <Link2
                size={14}
                strokeWidth={1.7}
                className="shrink-0 text-primary"
              />

              <span className="min-w-0 truncate text-[10px] text-muted-foreground sm:text-[11px]">
                https://example.com/your-long-url
              </span>
            </Control>

            <button
              type="button"
              className="mt-2 flex h-9 w-full items-center justify-center gap-1.5 rounded-lg bg-primary text-[10px] font-medium text-primary-foreground transition-colors duration-150 hover:bg-primary/90 sm:text-[11px]"
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
          <div className="min-w-0 rounded-xl border border-border bg-card p-3">
            <div className="flex items-center justify-between gap-3">
              <span className="truncate text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Custom alias
              </span>

              <span className="shrink-0 text-[9px] font-medium text-primary">
                Optional
              </span>
            </div>

            <Control className="mt-2">
              <span className="shrink-0 text-[10px] text-muted-foreground sm:text-[11px]">
                shrinkr.link/
              </span>

              <span className="ml-1 truncate text-[10px] font-medium text-foreground sm:text-[11px]">
                my-link
              </span>
            </Control>
          </div>

          <div className="mt-2.5 grid min-w-0 grid-cols-2 gap-2">
            <div className="min-w-0 rounded-xl border border-border bg-card p-3">
              <div className="flex items-center gap-2">
                <CalendarDays
                  size={14}
                  strokeWidth={1.7}
                  className="shrink-0 text-primary"
                />

                <span className="truncate text-[10px] font-medium text-muted-foreground">
                  Expiry
                </span>
              </div>

              <div className="mt-2 flex h-8 items-center rounded-lg bg-muted px-2.5">
                <span className="text-[10px] font-medium text-foreground sm:text-[11px]">
                  90 days
                </span>
              </div>
            </div>

            <div className="min-w-0 rounded-xl border border-border bg-card p-3">
              <div className="flex items-center gap-2">
                <MousePointerClick
                  size={14}
                  strokeWidth={1.7}
                  className="shrink-0 text-primary"
                />

                <span className="truncate text-[10px] font-medium text-muted-foreground">
                  Clicks
                </span>
              </div>

              <div className="mt-2 flex h-8 items-center rounded-lg bg-muted px-2.5">
                <span className="text-[10px] font-medium text-foreground sm:text-[11px]">
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
          <div className="min-w-0 rounded-xl border border-border bg-card p-3">
            <div className="flex items-center justify-between gap-3">
              <span className="truncate text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Your short link
              </span>

              <span className="shrink-0 text-[9px] font-medium text-muted-foreground">
                Ready
              </span>
            </div>

            <div className="mt-2 flex min-w-0 items-center gap-2">
              <div className="flex h-10 min-w-0 flex-1 items-center rounded-lg bg-primary/10 px-3">
                <span className="truncate text-[11px] font-semibold text-primary sm:text-xs">
                  shrinkr.link/a8X2
                </span>
              </div>

              <button
                type="button"
                className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors duration-150 hover:bg-primary/90"
              >
                <Copy size={15} strokeWidth={1.7} />
              </button>
            </div>
          </div>

          <div className="mt-2.5 grid min-w-0 grid-cols-[minmax(0,1fr)_40px] gap-2">
            <button
              type="button"
              className="flex h-10 min-w-0 items-center justify-center rounded-lg border border-border bg-card px-3 text-[10px] font-medium text-muted-foreground transition-colors duration-150 hover:bg-muted sm:text-[11px]"
            >
              Open link
            </button>

            <button
              type="button"
              className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-primary transition-colors duration-150 hover:bg-muted"
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
      className="w-full bg-background px-4 py-16 sm:px-6 sm:py-20 md:py-22"
    >
      <div className="mx-auto w-full max-w-5xl">
        <div className="text-center">
          <p className="inline-flex items-center rounded-full border border-primary/10 bg-primary/[0.06] px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-primary sm:px-4 sm:text-[11px]">
            PROCESS
          </p>

          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-bold leading-[1.05] tracking-[-0.045em] text-foreground sm:text-4xl md:text-5xl">
            Shorten a link in{" "}
            <span className="text-primary">three simple steps.</span>
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground md:text-base">
            From a long URL to a ready-to-share link in just a few seconds.
          </p>
        </div>

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

        <div className="mt-5 grid grid-cols-1 gap-7 sm:mt-6 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-9 md:grid-cols-3 md:gap-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`min-w-0 ${
                step.number === "03" ? "sm:col-span-2 md:col-span-1" : ""
              }`}
            >
              <div className="flex h-4 items-center gap-2">
                <span className="size-1.5 shrink-0 rounded-full bg-primary" />

                <span className="shrink-0 text-[10px] font-semibold tracking-[0.14em] text-muted-foreground">
                  {step.number}
                </span>

                <div className="h-px min-w-0 flex-1 bg-primary/10" />
              </div>

              <h3 className="mt-3 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                {step.title}
              </h3>

              <p className="mt-1.5 max-w-[300px] text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
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
