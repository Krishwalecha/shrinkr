import { ArrowLeft, Link2Off } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-primary px-6 text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.04] blur-[150px]" />

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="select-none text-[clamp(15rem,38vw,34rem)] font-black leading-none tracking-[-0.1em] text-white/[0.065]">
            404
          </span>
        </div>
      </div>

      <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
        <div className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.07] backdrop-blur-md">
          <Link2Off size={26} strokeWidth={1.4} className="text-white/70" />
        </div>

        <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.25em] text-white/35">
          Error 404
        </p>

        <h1 className="mt-2.5 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
          This link doesn't exist.
        </h1>

        <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-white/45">
          This link may have expired, been deactivated, deleted, or reached its
          maximum click limit. The page you're looking for may no longer exist.
        </p>

        <Link
          to="/"
          className="mt-7 inline-flex h-11 items-center gap-2 rounded-xl bg-white px-5 text-sm font-medium text-primary transition-colors duration-150 hover:bg-white/90"
        >
          <ArrowLeft size={17} strokeWidth={1.5} />
          Back to home
        </Link>

        <span className="mt-5 text-[11px] text-white/25">shrinkr.link</span>
      </div>
    </main>
  );
};

export default NotFound;
