import footerBg from "@/assets/footer-bg.jpg";
import { Link2, ArrowRight } from "lucide-react";

const CTA = ({ longUrl, setLongUrl }) => {
  const handleShortenClick = () => {
    document.getElementById("hero")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  return (
    <div
      style={{ backgroundImage: `url(${footerBg})` }}
      className="
      relative
      overflow-hidden
      rounded-2xl
      bg-cover
      bg-center
      bg-no-repeat
      text-white
      sm:rounded-[28px]"
    >
      <div
        className="
        flex
        min-h-[450px]
        w-full
        flex-col
        items-center
        px-5
        pb-14
        pt-14
        text-center
        sm:min-h-[470px]
        sm:px-6
        sm:pb-16
        sm:pt-16
      "
      >
        {/* Eyebrow */}
        <p className="text-xl font-semibold tracking-tight sm:text-2xl">
          Ready to shrink?
        </p>

        {/* Heading */}
        <h2
          className="
          mt-5
          text-4xl
          font-bold
          leading-[1.04]
          tracking-[-0.045em]
          sm:text-5xl
          md:text-6xl
        "
        >
          <span className="text-white/50">Your links.</span>
          <br />
          <span>Just Shorter.</span>
        </h2>

        {/* Description */}
        <p
          className="
          mt-5
          max-w-md
          text-sm
          leading-6
          text-white/75
          sm:text-base
        "
        >
          Shorten, customize and track your links in seconds.
        </p>

        {/* URL INPUT */}
        <div
          className="
          mt-8
          flex
          w-full
          flex-col
          gap-2
          sm:mt-9
          md:max-w-3xl
          md:flex-row
        "
        >
          {/* Input */}
          <div
            className="
            flex
            h-12
            w-full
            min-w-0
            items-center
            gap-3
            rounded-xl
            border
            border-white/15
            bg-white/[0.08]
            px-4
            backdrop-blur-sm
            transition-colors
            duration-200
            focus-within:border-white/25
            focus-within:bg-white/[0.11]
            md:flex-1
          "
          >
            <Link2
              size={18}
              strokeWidth={1.6}
              className="shrink-0 text-white/75"
            />

            <input
              type="url"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder="Paste your long URL"
              className="
              min-w-0
              flex-1
              bg-transparent
              text-sm
              text-white
              outline-none
              placeholder:text-white/45
            "
            />
          </div>

          {/* Button */}
          <button
            type="button"
            onClick={handleShortenClick}
            className="
            flex
            h-12
            w-full
            shrink-0
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-white
            px-5
            text-sm
            font-medium
            text-[#3262DA]
            transition-all
            duration-200
            hover:-translate-y-px
            hover:bg-white/90
            sm:px-6
            md:w-auto
          "
          >
            Shorten Link
            <ArrowRight size={17} strokeWidth={1.6} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CTA;
