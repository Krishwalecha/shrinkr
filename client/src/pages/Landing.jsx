import Navbar from "@/components/landing/Navbar.jsx";
import heroBg from "@/assets/hero-bg-image.webp";
import Hero from "@/components/landing/Hero.jsx";
import DashboardPreview from "@/components/landing/DashboardPreview.jsx";
import Process from "@/components/landing/Process.jsx";
import Features from "@/components/landing/Features.jsx";
import Footer from "@/components/landing/Footer.jsx";
import { useState } from "react";
import CTA from "@/components/landing/CTA.jsx";

const Landing = () => {
  const [longUrl, setLongUrl] = useState("");

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F7F8FC]">
      {/* HERO */}
      <section
        className="
          relative
          overflow-hidden
          bg-cover
          bg-center
          bg-no-repeat
        "
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <Navbar />

        <div className="pb-16 sm:pb-20 md:pb-0">
          <Hero longUrl={longUrl} setLongUrl={setLongUrl} />
        </div>

        <DashboardPreview />

        <div className="hidden h-10 md:block" />
      </section>

      <Process />
      <Features />

      <section className="w-full bg-[#F7F8FC] px-3 pt-3 sm:px-5 sm:pt-5">
        <CTA longUrl={longUrl} setLongUrl={setLongUrl} />
        <Footer />
      </section>
    </main>
  );
};

export default Landing;
