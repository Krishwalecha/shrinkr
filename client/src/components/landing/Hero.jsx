import UrlShortener from "./urlShortnerHeroSection/UrlShortener.jsx";

const Hero = ({ longUrl, setLongUrl }) => {
  return (
    <section
      id="hero"
      className="
        mx-auto
        w-full
        max-w-5xl
        px-5
        pt-16
        text-center
        text-white
        sm:px-6
        sm:pt-20
        md:pt-24
      "
    >
      <h1
        className="
          mx-auto
          max-w-4xl
          text-4xl
          font-semibold
          leading-[1.02]
          tracking-[-0.03em]
          sm:text-5xl
          md:text-6xl
          lg:text-7xl
        "
      >
        <span className="text-white/65">Shorten Links.</span>
        <br />
        Share Everywhere.
      </h1>

      <p
        className="
          mx-auto
          mt-5
          max-w-xl
          text-sm
          leading-6
          text-white/70
          sm:mt-6
          sm:text-base
          md:text-lg
        "
      >
        Create short links in a click. No sign up required.
      </p>

      <UrlShortener longUrl={longUrl} setLongUrl={setLongUrl} />
    </section>
  );
};

export default Hero;
