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
      border-[#DCE3EF]
      p-5
      ${className}
    `}
  >
    {children}
  </div>
);

const IconBox = ({ children }) => (
  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-[#DCE3EF] bg-white">
    {children}
  </div>
);

const MiniPanel = ({ children, className = "" }) => (
  <div
    className={`
      min-w-0
      rounded-xl
      border
      border-[#E1E7F0]
      bg-white
      ${className}
    `}
  >
    {children}
  </div>
);

const FeatureHeader = ({
  icon,
  eyebrow,
  title,
  description,
}) => (
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
            text-[#3262DA]
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
            text-[#111827]
          "
        >
          {title}
        </h3>
      </div>
    </div>

    <p className="mb-4 mt-3 max-w-[520px] text-sm leading-5 text-[#64748B]">
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
        bg-[#F7F8FC]
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
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="
              inline-flex
              rounded-full
              border
              border-[#3262DA]/10
              bg-[#3262DA]/[0.06]
              px-4
              py-1.5
              text-[10px]
              font-semibold
              tracking-[0.16em]
              text-[#3262DA]
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
              text-gray-950
              sm:text-4xl
              md:text-5xl
            "
          >
            Everything you need,{" "}
            <span className="text-[#3262DA]">in one place.</span>
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#7F8AA0] md:text-base">
            Powerful tools to shorten, customize, track, and manage your links
            with ease.
          </p>
        </div>

        {/* Bento */}
        <div className="mt-10 grid gap-4 sm:mt-12">
          {/* ================================================= */}
          {/* TOP ROW */}
          {/* ================================================= */}

          <div className="grid items-stretch gap-4 md:grid-cols-2">
            {/* Custom aliases */}
            <Card className="bg-[#EEF4FF]">
              <FeatureHeader
                icon={
                  <Link2
                    size={18}
                    strokeWidth={1.7}
                    className="text-[#3262DA]"
                  />
                }
                eyebrow="Custom aliases"
                title="Make it yours."
                description="Create memorable, branded links with a custom alias that is easy to share."
              />

              <MiniPanel className="mt-auto p-2.5">
                <div className="flex h-12 items-center rounded-lg bg-[#F7F9FD] px-3.5">
                  <span className="shrink-0 text-sm text-gray-400">
                    shrinkr.link/
                  </span>

                  <span className="ml-1 truncate text-sm font-semibold text-gray-900">
                    my-alias
                  </span>

                  <div className="ml-auto flex shrink-0 items-center gap-1.5 pl-3">
                    <span className="flex size-4 items-center justify-center rounded-full bg-[#EAF2FF]">
                      <Check
                        size={10}
                        strokeWidth={2}
                        className="text-[#3262DA]"
                      />
                    </span>

                    <span className="text-xs font-medium text-[#3262DA]">
                      Available
                    </span>
                  </div>
                </div>
              </MiniPanel>

              <div className="mt-3 flex items-center gap-2 rounded-lg border border-[#DCE6F7] bg-white/70 px-3 py-2">
                <Sparkles
                  size={13}
                  strokeWidth={1.7}
                  className="text-[#3262DA]"
                />

                <span className="text-[10px] font-medium text-[#3262DA]">
                  Customize anytime
                </span>

                <span className="ml-auto text-[9px] text-gray-400">
                  • 5 aliases available
                </span>
              </div>
            </Card>

            {/* Analytics */}
            <Card className="bg-white">
              <FeatureHeader
                icon={
                  <BarChart3
                    size={18}
                    strokeWidth={1.7}
                    className="text-[#3262DA]"
                  />
                }
                eyebrow="Detailed analytics"
                title="Know what matters."
                description="Track clicks, locations, devices, browsers, referrers, and more from one clear dashboard."
              />

              <MiniPanel className="mt-auto overflow-hidden p-3.5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] text-gray-400">
                      Total clicks
                    </p>

                    <p className="mt-0.5 text-xl font-bold tracking-tight text-gray-950">
                      12,489
                    </p>
                  </div>

                  <span className="rounded-md bg-[#EAF7EF] px-2.5 py-1.5 text-[10px] font-semibold text-emerald-600">
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
                          ${
                            index >= 8
                              ? "bg-[#3262DA]/65"
                              : "bg-[#3262DA]/15"
                          }
                        `}
                        style={{ height: `${height}%` }}
                      />
                    ),
                  )}
                </div>
              </MiniPanel>
            </Card>
          </div>

          {/* ================================================= */}
          {/* MIDDLE ROW */}
          {/* ================================================= */}

          <div className="grid items-stretch gap-4 md:grid-cols-3">
            {/* Expiry */}
            <Card className="bg-white">
              <FeatureHeader
                icon={
                  <CalendarDays
                    size={17}
                    strokeWidth={1.7}
                    className="text-[#3262DA]"
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
                    className="shrink-0 text-[#3262DA]"
                  />

                  <div className="min-w-0">
                    <p className="text-[9px] text-gray-400">
                      Expires in
                    </p>

                    <p className="mt-0.5 text-xs font-semibold text-gray-900">
                      90 days
                    </p>
                  </div>

                  <ArrowRight
                    size={14}
                    strokeWidth={1.5}
                    className="ml-auto shrink-0 text-gray-400"
                  />
                </MiniPanel>

                <MiniPanel className="flex items-center gap-3 p-3">
                  <MousePointerClick
                    size={15}
                    strokeWidth={1.7}
                    className="shrink-0 text-[#3262DA]"
                  />

                  <div className="min-w-0">
                    <p className="text-[9px] text-gray-400">
                      Max clicks
                    </p>

                    <p className="mt-0.5 text-xs font-semibold text-gray-900">
                      500 clicks
                    </p>
                  </div>

                  <ArrowRight
                    size={14}
                    strokeWidth={1.5}
                    className="ml-auto shrink-0 text-gray-400"
                  />
                </MiniPanel>
              </div>
            </Card>

            {/* QR */}
            <Card className="bg-[#F2F6FF]">
              <FeatureHeader
                icon={
                  <QrCode
                    size={17}
                    strokeWidth={1.7}
                    className="text-[#3262DA]"
                  />
                }
                eyebrow="QR codes"
                title="Built in."
                description="Generate a scannable QR code for every short link."
              />

              <MiniPanel className="mt-auto flex items-center gap-3 p-3">
                <div className="flex size-[76px] shrink-0 items-center justify-center rounded-lg border border-[#E1E7F0] bg-white p-2">
                  <QRCode
                    value="https://shrinkr.link/my-alias"
                    size={58}
                    bgColor="#ffffff"
                    fgColor="#172033"
                    level="M"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-gray-500">
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
                      border-[#3262DA]/15
                      bg-white
                      px-3
                      py-2.5
                      text-xs
                      font-semibold
                      text-[#3262DA]
                      transition-colors
                      duration-150
                      hover:bg-[#F7F9FD]
                    "
                  >
                    <Download size={13} strokeWidth={1.7} />
                    Download QR
                  </button>
                </div>
              </MiniPanel>
            </Card>

            {/* Management */}
            <Card className="bg-white">
              <FeatureHeader
                icon={
                  <MoreHorizontal
                    size={18}
                    strokeWidth={1.7}
                    className="text-[#3262DA]"
                  />
                }
                eyebrow="Link management"
                title="Stay organized."
                description="Edit, pause, or delete your links from one dashboard."
              />

              <div className="mt-auto space-y-2.5">
                <MiniPanel className="flex items-center gap-2.5 p-3">
                  <span className="size-2 shrink-0 rounded-full bg-emerald-500" />

                  <span className="min-w-0 flex-1 truncate text-xs font-medium text-gray-600">
                    shrinkr.link/promo
                  </span>

                  <span className="shrink-0 rounded-md bg-emerald-50 px-2 py-1 text-[9px] font-semibold text-emerald-600">
                    Active
                  </span>

                  <MoreHorizontal
                    size={14}
                    strokeWidth={1.5}
                    className="shrink-0 text-gray-400"
                  />
                </MiniPanel>

                <MiniPanel className="flex items-center gap-2.5 p-3">
                  <span className="size-2 shrink-0 rounded-full bg-gray-300" />

                  <span className="min-w-0 flex-1 truncate text-xs font-medium text-gray-600">
                    shrinkr.link/launch
                  </span>

                  <span className="shrink-0 rounded-md bg-gray-50 px-2 py-1 text-[9px] font-medium text-gray-400">
                    Expired
                  </span>

                  <MoreHorizontal
                    size={14}
                    strokeWidth={1.5}
                    className="shrink-0 text-gray-400"
                  />
                </MiniPanel>
              </div>
            </Card>
          </div>

          {/* ================================================= */}
          {/* BOTTOM ROW */}
          {/* ================================================= */}

          <div className="grid items-stretch gap-4 md:grid-cols-[1.6fr_1fr]">
            {/* Fast */}
            <Card className="bg-[#EEF4FF]">
              <FeatureHeader
                icon={
                  <Zap
                    size={18}
                    strokeWidth={1.7}
                    className="text-[#3262DA]"
                  />
                }
                eyebrow="Fast & reliable"
                title="Every redirect, handled fast."
                description="Optimized redirects keep your short links quick and dependable."
              />

              <div className="mt-auto flex flex-wrap gap-2">
                <div className="flex items-center gap-2 rounded-lg border border-[#DCE3EF] bg-white px-3 py-2">
                  <Zap
                    size={13}
                    strokeWidth={1.7}
                    className="text-[#3262DA]"
                  />

                  <span className="text-[10px] font-medium text-gray-600">
                    Instant redirects
                  </span>
                </div>

                <div className="flex items-center gap-2 rounded-lg border border-[#DCE3EF] bg-white px-3 py-2">
                  <ShieldCheck
                    size={13}
                    strokeWidth={1.7}
                    className="text-[#3262DA]"
                  />

                  <span className="text-[10px] font-medium text-gray-600">
                    Reliable links
                  </span>
                </div>
              </div>
            </Card>

            {/* Get started */}
            <Card className="bg-white">
              <FeatureHeader
                icon={
                  <Link2
                    size={17}
                    strokeWidth={1.7}
                    className="text-[#3262DA]"
                  />
                }
                eyebrow="Get started"
                title="Free to start."
                description="Shorten your first link in seconds. No account required."
              />

              <div className="mt-auto flex items-center gap-2">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#EEF4FF]">
                  <Check
                    size={13}
                    strokeWidth={2}
                    className="text-[#3262DA]"
                  />
                </span>

                <span className="text-[10px] font-semibold text-[#4265A4]">
                  10 links without an account
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