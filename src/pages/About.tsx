import AboutUsPage from "@/components/about/AboutUs";
import DyingProcessPage from "@/components/about/DyeingProcess";
import HistoryGraph from "@/components/about/HistoryGraph";
import MaterialsPage from "@/components/about/MaterialsPage";
import OurHistoryPage from "@/components/about/OurHistory";
import ProductionProcessPage from "@/components/about/ProductionProcessPage";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import PhilosophyPage from "@/components/about/PhilosophyPage";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import WhyChooseUs from "@/components/about/WhyChooseUs";

export default function About() {
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
    <div className="min-h-screen bg-off-white pt-4">
      <Navbar />

      <AboutUsPage />

      <section className="relative bg-gradient-to-br from-white via-gray-50 to-amber-50 py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-20">
        <div className="flex flex-col xl:flex-row gap-8 w-full">
        {/* TARGET SCROLL SECTION */}
          <div id="ourstory-section" className="w-full xl:w-[48%]">
          <OurHistoryPage />
        </div>

          <div className="w-full md:w-[70%] lg:w-[60%] xl:w-[48%] md:mx-auto xl:mx-0">
          <HistoryGraph />
        </div>
      </div>
      </section>

      <DyingProcessPage />
      <ProductionProcessPage />
      <WhyChooseUs />
      <PhilosophyPage />
      <Footer />
    </div>
  );
}
