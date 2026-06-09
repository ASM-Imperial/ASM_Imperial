import React, { useRef, useEffect } from "react";
import { motion, Variants } from "framer-motion";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const AboutUsPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          video.pause();
        }
      },
      { threshold: 0.3 } // pause when <30% visible
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.section
      className="relative bg-gradient-to-br from-white via-gray-50 to-amber-50 py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInUp}
    >
      <div className="flex flex-col xl:flex-row w-full gap-8 xl:gap-12 mt-4 sm:mt-6 md:mt-8">

        {/* Left Content */}
        <div className="w-full xl:w-1/2 space-y-4 sm:space-y-6 xl:text-left text-center">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 text-center drop-shadow-sm pt-6 sm:pt-0">
            Weaving Heritage into Modern Elegance
          </h2>

          <p className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed text-justify">
            Modern Nature Design Nepal (MND Nepal) weaves stories of tradition, craftsmanship, and creativity into every rug. Inspired by the ancient artistry of Tibet and brought to life by the skilled hands of Nepalese weavers, we create premium, export-quality hand-knotted rugs that unite timeless heritage with modern design sensibilities.
            <br /> <br />
            Celebrated across international markets, our rugs are admired for their graphic elegance, intricate detailing, and lasting durability. With over 2,000 color shades and knot densities of 60, 80, 100 and 150 knots, each rug is meticulously hand-knotted to a 5 mm thickness, showcasing precision and artistry in perfect harmony.
            We supply exclusively on a wholesale basis, crafting custom rugs to meet the unique needs of clients worldwide.
            <br /> <br />
            At MND Nepal, craftsmanship goes hand-in-hand with conscience:
            
            <div className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed">
              <p>✨ <span className="font-semibold">100% child labor-free production</span></p>
              <p>🌿 <span className="font-semibold">All-natural, high-quality wool and eco-friendly fibers</span></p>
              <p>🧶 <span className="font-semibold">Handmade, preserving Nepal’s weaving heritage</span></p>
            </div>
            <br />
            Beyond business, we believe in empowerment and purpose - offering fair employment to skilled artisans and helping preserve Nepal's cultural legacy. Every rug we create is a unique masterpiece - a fusion of artistry, ethics, and emotion - adorning prestigious interiors, homes, and hotels around the world.
          </p>
        </div>

        {/* Right Video */}
        <div className="w-full xl:w-1/2 flex justify-center items-start mt-6 xl:mt-0">
          <video
            ref={videoRef}
            src="https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/extra_images/IMG_5373.MOV"
            controls
            className="rounded-2xl shadow-lg w-[350px] h-[380px] sm:w-[400px] sm:h-[450px] md:w-[460px] md:h-[520px] xl:w-[620px] xl:h-[680px] object-cover [@media(min-width:1024px)_and_(max-width:1366px)]:w-[460px] [@media(min-width:1024px)_and_(max-width:1366px)]:h-[520px]"
          />
        </div>

      </div>
    </motion.section>
  );
};

export default AboutUsPage;
