import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Link2,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Loader from "@/components/Loader";
import api from "@/lib/api";

const UrlGenerator = ({ setShortened, longUrl, setLongUrl }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [expiresIn, setExpiresIn] = useState(90);
  const [maxClicks, setMaxClicks] = useState(-1);
  const [customAlias, setCustomAlias] = useState("");
  const [loading, setLoading] = useState(false);

  const shortenUrl = async () => {
    if (!longUrl.trim()) {
      toast.error("Long URL is required");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post(
        "/urls",
        {
          longUrl: longUrl.trim(),
          customAlias: customAlias.trim(),
          expiresIn,
          maxClicks,
        },
        {
          withCredentials: true,
        },
      );

      if (res.data?.data) {
        setShortened(res.data.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const changeValue = (setter, value, min) => {
    setter((prev) => Math.max(min, prev + value));
  };

  return (
    <div className="mt-8 w-full rounded-2xl border border-white/20 bg-white/10 p-2.5 backdrop-blur-md sm:p-3">
      {/* Main input */}
      <div className="flex min-w-0 flex-col gap-2 md:flex-row">
        <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.08] px-4 py-3">
          <Link2
            size={19}
            strokeWidth={1.5}
            className="shrink-0 text-white/80"
          />

          <input
            type="url"
            placeholder="Paste your long URL"
            className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/45"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                shortenUrl();
              }
            }}
          />
        </div>

        <button
          type="button"
          onClick={shortenUrl}
          disabled={loading}
          className="flex h-11 w-[145px] shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-white px-5 text-sm font-medium text-[#3262DA] transition-colors duration-150 hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? (
            <Loader />
          ) : (
            <>
              Shorten Link
              <ArrowRight size={17} strokeWidth={1.5} />
            </>
          )}
        </button>
      </div>

      {/* Advanced */}
      {showAdvanced && (
        <div className="mt-4 border-t border-white/10 pt-4">
          <div className="grid gap-5 md:grid-cols-2">
            {/* Alias */}
            <div className="min-w-0">
              <p className="text-left text-xs font-medium text-white/85">
                Custom Alias <span className="text-white/40">(optional)</span>
              </p>

              <div className="mt-2 flex min-w-0 overflow-hidden rounded-xl border border-white/10 bg-white/[0.08]">
                <span className="shrink-0 border-r border-white/10 px-3 py-2.5 text-xs text-white/70">
                  shrinkr.link/
                </span>

                <input
                  type="text"
                  placeholder="your-alias"
                  className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/35"
                  value={customAlias}
                  onChange={(e) => setCustomAlias(e.target.value)}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="min-w-0">
              <p className="text-left text-xs font-medium text-white/85">
                Link controls
              </p>

              <div className="mt-2 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {/* Expiry */}
                <div className="flex min-w-0 items-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.08]">
                  <span className="shrink-0 px-3 text-xs text-white/60">
                    Days
                  </span>

                  <input
                    type="number"
                    value={expiresIn}
                    min={1}
                    onChange={(e) =>
                      setExpiresIn(Math.max(1, Number(e.target.value)))
                    }
                    className="min-w-0 flex-1 bg-transparent px-2 py-2.5 text-sm text-white outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />

                  <div className="flex shrink-0 flex-col border-l border-white/10">
                    <button
                      type="button"
                      onClick={() => changeValue(setExpiresIn, 1, 1)}
                      className="px-2 py-0.5 text-white/50 transition-colors hover:text-white"
                    >
                      <ChevronUp size={13} />
                    </button>

                    <button
                      type="button"
                      onClick={() => changeValue(setExpiresIn, -1, 1)}
                      className="px-2 py-0.5 text-white/50 transition-colors hover:text-white"
                    >
                      <ChevronDown size={13} />
                    </button>
                  </div>
                </div>

                {/* Clicks */}
                <div className="flex min-w-0 items-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.08]">
                  <span className="shrink-0 px-3 text-xs text-white/60">
                    Clicks
                  </span>

                  <input
                    type="number"
                    value={maxClicks}
                    min={-1}
                    onChange={(e) => setMaxClicks(Number(e.target.value))}
                    className="min-w-0 flex-1 bg-transparent px-2 py-2.5 text-sm text-white outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />

                  <div className="flex shrink-0 flex-col border-l border-white/10">
                    <button
                      type="button"
                      onClick={() => changeValue(setMaxClicks, 1, -1)}
                      className="px-2 py-0.5 text-white/50 transition-colors hover:text-white"
                    >
                      <ChevronUp size={13} />
                    </button>

                    <button
                      type="button"
                      onClick={() => changeValue(setMaxClicks, -1, -1)}
                      className="px-2 py-0.5 text-white/50 transition-colors hover:text-white"
                    >
                      <ChevronDown size={13} />
                    </button>
                  </div>
                </div>
              </div>

              <p className="mt-1.5 text-right text-[10px] text-white/35">
                -1 = unlimited clicks
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Bottom */}
      <div className="mt-3.5 flex flex-col gap-3 border-t border-white/10 pt-3 md:flex-row md:items-center md:justify-between md:border-t-0 md:pt-0">
        <div className="flex min-w-0 items-start gap-2 text-left text-[11px] leading-5 text-white/50 sm:text-xs">
          <ShieldCheck
            size={17}
            strokeWidth={1.5}
            className="mt-0.5 shrink-0"
          />

          <p>
            By using shrinkr.link, you agree to our{" "}
            <Link
              to="/terms"
              className="text-white/75 underline underline-offset-2 transition-colors hover:text-white"
            >
              Terms
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy"
              className="text-white/75 underline underline-offset-2 transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAdvanced((prev) => !prev)}
          className="flex shrink-0 cursor-pointer items-center gap-1.5 self-end text-xs font-medium text-white/60 transition-colors hover:text-white md:self-auto"
        >
          {showAdvanced ? "Hide options" : "Advanced options"}

          {showAdvanced ? (
            <ChevronUp size={16} strokeWidth={1.5} />
          ) : (
            <ChevronDown size={16} strokeWidth={1.5} />
          )}
        </button>
      </div>
    </div>
  );
};

export default UrlGenerator;
