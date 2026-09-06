import Navbar from "../components/landing/Navbar.jsx";
import heroBg from "../assets/hero-bg-image.webp";
import Hero from "../components/landing/Hero.jsx";
import DashboardPreview from "@/components/landing/DashboardPreview.jsx";

const Landing = () => {
  return (
    <main className="min-h-screen">
      <section
        className="relative min-h-screen bg-cover bg-center pb-10"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <Navbar />
        <Hero />
        <DashboardPreview />
      </section>
    </main>
  );
};

export default Landing;
