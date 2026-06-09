import Navbar from "@/components/ui/Navbar";
import HeroSection from "@/components/home/HeroSection";
import LatestDesigns from "@/components/home/LatestDesigns";
import OurExperience from "@/components/home/OurExperience";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Footer from "@/components/ui/Footer";
import InspirationGallery from "@/components/home/InspirationGallery";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const target = document.getElementById(location.state.scrollTo);
      setTimeout(() => {
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-off-white">
      <Navbar />

      <main>
        <HeroSection />
        <InspirationGallery />
        <LatestDesigns />
        <FeaturedProducts />

        {/* TARGET SCROLL SECTION */}
        <div id="craftmanship-section">
          <OurExperience />
        </div>
      </main>

      <Footer />
    </div>
  );
}
