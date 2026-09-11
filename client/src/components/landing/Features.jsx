import {
  Link2,
  CalendarDays,
  Download,
  BarChart3,
  QrCode,
  MoreHorizontal,
  Check,
  Zap,
  ShieldCheck,
  MousePointerClick,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import QRCode from "react-qr-code";

const Card = ({ children, className = "" }) => (
  <div
    className={`
      flex
      h-full
      min-w-0
      flex-col
      overflow-hidden
      rounded-2xl
      border
      border-border
      p-5
      ${className}
    `}
  >
    {children}
  </div>
);

const IconBox = ({ children }) => (
  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-card">
    {children}
  </div>
);

const MiniPanel = ({ children, className = "" }) => (
  <div
    className={`
      min-w-0
      rounded-xl
      border
      border-border
      bg-card
      ${className}
    `}
  >
    {children}
  </div>
);

const FeatureHeader = ({ icon, eyebrow, title, description }) => (
  <div className="min-w-0">
    <div className="flex min-w-0 items-start gap-3">
      <IconBox>{icon}</IconBox>

      <div className="min-w-0 pt-0.5">
        <p
          className="
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.15em]
            text-primary
          "
        >
          {eyebrow}
        </p>

        <h3
          className="
            mt-1
            text-xl
            font-bold
            leading-tight
            tracking-[-0.025em]
            text-foreground
          "
        >
          {title}
        </h3>
      </div>
    </div>

    <p className="mb-4 mt-3 max-w-[520px] text-sm leading-5 text-muted-foreground">
      {description}
    </p>
  </div>
);

const Features = () => {
  return (
    <section
      id="features"
      className="
        w-full
        bg-background
        px-4
        pb-16
        pt-4
        sm:px-6
        sm:pb-20
        sm:pt-5
        md:pb-24
      "
    >
      <div className="mx-auto w-full max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="
              inline-flex
              rounded-full
              border
              border-primary/10
              bg-primary/[0.06]
              px-4
              py-1.5
              text-[10px]
              font-semibold
              tracking-[0.16em]
              text-primary
            "
          >
            FEATURES
          </p>

          <h2
            className="
              mt-4
              text-3xl
              font-bold
              leading-[1.05]
              tracking-[-0.045em]
              text-foreground
              sm:text-4xl
              md:text-5xl
            "
          >
            Everything you need,{" "}
            <span className="text-primary">in one place.</span>
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground md:text-base">
            Powerful tools to shorten, customize, track, and manage your links
            with ease.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:mt-12">
          <div className="grid items-stretch gap-4 md:grid-cols-2">
            <Card className="bg-accent">
              <FeatureHeader
                icon={
                  <Link2 size={18} strokeWidth={1.7} className="text-primary" />
                }
                eyebrow="Custom aliases"
                title="Make it yours."
                description="Create memorable, branded links with a custom alias that is easy to share."
              />

              <MiniPanel className="mt-auto p-2.5">
                <div className="flex h-12 items-center rounded-lg bg-background px-3.5">
                  <span className="shrink-0 text-sm text-muted-foreground">
                    shrinkr.link/
                  </span>

                  <span className="ml-1 truncate text-sm font-semibold text-foreground">
                    my-alias
                  </span>

                  <div className="ml-auto flex shrink-0 items-center gap-1.5 pl-3">
                    <span className="flex size-4 items-center justify-center rounded-full bg-accent">
                      <Check
                        size={10}
                        strokeWidth={2}
                        className="text-primary"
                      />
                    </span>

                    <span className="text-xs font-medium text-primary">
                      Available
                    </span>
                  </div>
                </div>
              </MiniPanel>

              <div className="mt-3 flex items-center gap-2 rounded-lg border border-border bg-card/70 px-3 py-2">
                <Sparkles
                  size={13}
                  strokeWidth={1.7}
                  className="text-primary"
                />

                <span className="text-[10px] font-medium text-primary">
                  Customize anytime
                </span>

                <span className="ml-auto text-[9px] text-muted-foreground">
                  • 5 aliases available
                </span>
              </div>
            </Card>

            <Card className="bg-card">
              <FeatureHeader
                icon={
                  <BarChart3
                    size={18}
                    strokeWidth={1.7}
                    className="text-primary"
                  />
                }
                eyebrow="Detailed analytics"
                title="Know what matters."
                description="Track clicks, locations, devices, browsers, referrers, and more from one clear dashboard."
              />

              <MiniPanel className="mt-auto overflow-hidden p-3.5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] text-muted-foreground">
                      Total clicks
                    </p>

                    <p className="mt-0.5 text-xl font-bold tracking-tight text-foreground">
                      12,489
                    </p>
                  </div>

                  <span className="rounded-md bg-success/10 px-2.5 py-1.5 text-[10px] font-semibold text-success">
                    ↑ 12.4%
                  </span>
                </div>

                <div className="mt-4 flex h-14 items-end gap-1.5">
                  {[28, 42, 34, 54, 47, 67, 59, 81, 72, 92].map(
                    (height, index) => (
                      <div
                        key={index}
                        className={`
                          flex-1
                          rounded-t-md
                          ${index >= 8 ? "bg-primary/65" : "bg-primary/15"}
                        `}
                        style={{ height: `${height}%` }}
                      />
                    ),
                  )}
                </div>
              </MiniPanel>
            </Card>
          </div>

          <div className="grid items-stretch gap-4 md:grid-cols-3">
            <Card className="bg-card">
              <FeatureHeader
                icon={
                  <CalendarDays
                    size={17}
                    strokeWidth={1.7}
                    className="text-primary"
                  />
                }
                eyebrow="Expiry controls"
                title="Stay in control."
                description="Set links to expire by time or by click count."
              />

              <div className="mt-auto space-y-2.5">
                <MiniPanel className="flex items-center gap-3 p-3">
                  <CalendarDays
                    size={15}
                    strokeWidth={1.7}
                    className="shrink-0 text-primary"
                  />

                  <div className="min-w-0">
                    <p className="text-[9px] text-muted-foreground">
                      Expires in
                    </p>

                    <p className="mt-0.5 text-xs font-semibold text-foreground">
                      90 days
                    </p>
                  </div>

                  <ArrowRight
                    size={14}
                    strokeWidth={1.5}
                    className="ml-auto shrink-0 text-muted-foreground"
                  />
                </MiniPanel>

                <MiniPanel className="flex items-center gap-3 p-3">
                  <MousePointerClick
                    size={15}
                    strokeWidth={1.7}
                    className="shrink-0 text-primary"
                  />

                  <div className="min-w-0">
                    <p className="text-[9px] text-muted-foreground">
                      Max clicks
                    </p>

                    <p className="mt-0.5 text-xs font-semibold text-foreground">
                      500 clicks
                    </p>
                  </div>

                  <ArrowRight
                    size={14}
                    strokeWidth={1.5}
                    className="ml-auto shrink-0 text-muted-foreground"
                  />
                </MiniPanel>
              </div>
            </Card>

            <Card className="bg-accent">
              <FeatureHeader
                icon={
                  <QrCode
                    size={17}
                    strokeWidth={1.7}
                    className="text-primary"
                  />
                }
                eyebrow="QR codes"
                title="Built in."
                description="Generate a scannable QR code for every short link."
              />

              <MiniPanel className="mt-auto flex items-center gap-3 p-3">
                <div className="flex size-[76px] shrink-0 items-center justify-center rounded-lg border border-border bg-white p-2">
                  <QRCode
                    value="https://shrinkr.link/my-alias"
                    size={58}
                    bgColor="#ffffff"
                    fgColor="#111827"
                    level="M"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-muted-foreground">
                    shrinkr.link/my-alias
                  </p>

                  <button
                    type="button"
                    className="
                      mt-2.5
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-1.5
                      rounded-lg
                      border
                      border-primary/15
                      bg-card
                      px-3
                      py-2.5
                      text-xs
                      font-semibold
                      text-primary
                      transition-colors
                      duration-150
                      hover:bg-background
                    "
                  >
                    <Download size={13} strokeWidth={1.7} />
                    Download QR
                  </button>
                </div>
              </MiniPanel>
            </Card>

            <Card className="bg-card">
              <FeatureHeader
                icon={
                  <MoreHorizontal
                    size={18}
                    strokeWidth={1.7}
                    className="text-primary"
                  />
                }
                eyebrow="Link management"
                title="Stay organized."
                description="Edit, pause, or delete your links from one dashboard."
              />

              <div className="mt-auto space-y-2.5">
                <MiniPanel className="flex items-center gap-2.5 p-3">
                  <span className="size-2 shrink-0 rounded-full bg-success" />

                  <span className="min-w-0 flex-1 truncate text-xs font-medium text-muted-foreground">
                    shrinkr.link/promo
                  </span>

                  <span className="shrink-0 rounded-md bg-success/10 px-2 py-1 text-[9px] font-semibold text-success">
                    Active
                  </span>

                  <MoreHorizontal
                    size={14}
                    strokeWidth={1.5}
                    className="shrink-0 text-muted-foreground"
                  />
                </MiniPanel>

                <MiniPanel className="flex items-center gap-2.5 p-3">
                  <span className="size-2 shrink-0 rounded-full bg-muted-foreground/40" />

                  <span className="min-w-0 flex-1 truncate text-xs font-medium text-muted-foreground">
                    shrinkr.link/launch
                  </span>

                  <span className="shrink-0 rounded-md bg-muted px-2 py-1 text-[9px] font-medium text-muted-foreground">
                    Expired
                  </span>

                  <MoreHorizontal
                    size={14}
                    strokeWidth={1.5}
                    className="shrink-0 text-muted-foreground"
                  />
                </MiniPanel>
              </div>
            </Card>
          </div>

          <div className="grid items-stretch gap-4 md:grid-cols-[1.6fr_1fr]">
            <Card className="bg-accent">
              <FeatureHeader
                icon={
                  <Zap size={18} strokeWidth={1.7} className="text-primary" />
                }
                eyebrow="Fast & reliable"
                title="Every redirect, handled fast."
                description="Optimized redirects keep your short links quick and dependable."
              />

              <div className="mt-auto flex flex-wrap gap-2">
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
                  <Zap size={13} strokeWidth={1.7} className="text-primary" />

                  <span className="text-[10px] font-medium text-muted-foreground">
                    Instant redirects
                  </span>
                </div>

                <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
                  <ShieldCheck
                    size={13}
                    strokeWidth={1.7}
                    className="text-primary"
                  />

                  <span className="text-[10px] font-medium text-muted-foreground">
                    Reliable links
                  </span>
                </div>
              </div>
            </Card>

            <Card className="bg-card">
              <FeatureHeader
                icon={
                  <Link2 size={17} strokeWidth={1.7} className="text-primary" />
                }
                eyebrow="Get started"
                title="Free to start."
                description="Shorten your first link in seconds. No account required."
              />

              <div className="mt-auto flex items-center gap-2">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent">
                  <Check size={13} strokeWidth={2} className="text-primary" />
                </span>

                <span className="text-[10px] font-semibold text-primary/70">
                  Sign up for detailed analytics, link history and more.
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
