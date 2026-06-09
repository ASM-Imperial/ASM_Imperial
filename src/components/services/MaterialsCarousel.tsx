import React, { useMemo, useState, useCallback, useEffect, useRef } from "react";

type Material = {
  title: string;
  description: string;
};

const materials: Material[] = [
  {
    title: "Tibetan Wool",
    description:
      "Also called Himalayan wool, it comes from hardy sheep that roam the high-altitude pastures over 3,000 meters above sea level. Exposed to biting cold and harsh mountain winds, these sheep grow long, resilient fleece rich in natural lanolin, making Tibetan wool incredibly soft, durable, and luxurious. Its palette spans natural shades from deep darks to gentle off-whites. We cherish this exquisite wool, crafting it into rugs that embody warmth, elegance, and timeless beauty. Tibetan wool can also be artfully blended with New Zealand wool, silk, or other yarns, creating rugs with unique textures, sumptuous softness, and distinctive character."
  },
  {
    title: "New Zealand Wool",
    description:
      "Sourced from fine Merino sheep in Australia and New Zealand, this wool is prized for its exceptional quality, soft texture, and beautifully crimped fibers. Its pure white hue makes it perfect for light-colored rugs, offering durability, softness, and excellent color retention. New Zealand wool can also be artfully blended with Tibetan wool, silk, or other materials, creating rugs with unique textures, luxurious feel, and distinctive character.",
  },
  {
    title: "Chinese Silk",
    description:
      "Sourced from the finest silkworms (Bombyx mori) in China, this silk is the epitome of elegance—sumptuously soft, shimmering with a natural lustre, and unmistakably luxurious. Revered worldwide for its high-end craftsmanship, Chinese silk transforms every rug into a masterpiece of texture and sophistication. It can be crafted into 100% Chinese silk rugs or blended with wool and other selected yarns, tailored to your requirements, creating pieces that exude opulence, exquisite detail, and timeless beauty.",
  },
  {
    title: "Lurex Yarn",
    description:
      "Add a touch of sparkle to your space with Lurex yarn, lurex is a metallic yarn for adding sparkle to projects, a dazzling metallic fiber that brings shimmer and elegance to hand-knotted rugs. Blended with wool, silk, or other fibers, it enhances patterns and details while keeping every rug luminous and timeless."
  },
  {
    title: "Viscose",
    description:
      "Known as “art silk,” viscose is made from regenerated wood cellulose, creating a soft, versatile fiber. Though not natural silk, when woven into rugs, it beautifully mimics silk’s texture and glistens with a striking, lustrous shine. Affordable yet visually luxurious, viscose is the perfect budget-friendly alternative for those who want the elegance of silk without the premium price.",
  },
  {
    title: "Nettle (Allo)",
    description:
      "Harvested from the wild highlands of Nepal, nettle is a remarkable all-natural fiber with inherent strength and resilience. Every part of the plant is used—roots for remedies, stems for fibers, and leaves for food—making it fully sustainable. Its natural anti-pest properties mean nettle rugs require no dyes or treatments, while their raw, earthy texture brings authentic, eco-friendly charm to any space.",
  },
  {
    title: "Hemp",
    description:
      "Grown in the pristine hills of Nepal, hemp is a natural fiber celebrated for its unmatched strength and 90% water resistance. Hemp rugs are incredibly durable, with a rugged, textured feel that gives them a bold, distinctive character. Ideal for high-traffic areas, these rugs combine practicality with natural elegance. Crafted in earthy, abstract tones, each hemp rug showcases the organic beauty and timeless charm of nature, making every space feel grounded, warm, and uniquely alive.",
  },
];

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

const MaterialsCarousel: React.FC = () => {
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [expanded, setExpanded] = useState<boolean[]>(new Array(materials.length).fill(false));
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Track mobile state
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const goPrev = useCallback(() => {
    setActive((i) => (i - 1 + materials.length) % materials.length);
  }, []);

  const goNext = useCallback(() => {
    setActive((i) => (i + 1) % materials.length);
  }, []);

  // Auto-play carousel every 5 seconds
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        goNext();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [goNext, isAutoPlaying]);

  const toggleExpanded = useCallback((index: number) => {
    setExpanded((prev) => prev.map((exp, i) => (i === index ? !exp : exp)));
    setIsAutoPlaying(false);
  }, []);

  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(' ');
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  const layout = useMemo(() => {
    // Responsive horizontal spacing
    const STEP_X = isMobile ? 280 : 360; // smaller spacing on mobile
    const SCALE_FACTOR = 0.08; // scale reduction for side cards
    const MAX_VISIBLE = isMobile ? 0 : 1; // show only active card on mobile

    return materials.map((_, i) => {
      let d = i - active;
      if (d > materials.length / 2) d -= materials.length;
      if (d < -materials.length / 2) d += materials.length;

      if (Math.abs(d) > MAX_VISIBLE) return { d, tx: 0, scale: 0, opacity: 0, z: 0 };

      const tx = d * STEP_X;
      const scale = 1 - Math.abs(d) * SCALE_FACTOR;
      const opacity = 1 - Math.abs(d) * 0.3;
      const z = 100 - Math.abs(d);

      return { d, tx, scale, opacity, z };
    });
  }, [active, isMobile]);

  return (
    <section className="bg-no-repeat py-10 sm:py-12 md:py-16 select-none overflow-hidden">
      <div className="w-[95%] sm:w-11/12 max-w-6xl mx-auto px-2 sm:px-4">
        <h2 className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900">
          Materials We Offer
        </h2>

        {/* Carousel */}
        <div className="relative mt-6 sm:mt-8 md:mt-12">
          {/* Cards */}
          <div className="relative z-10 h-[380px] sm:h-[420px] md:h-[450px] flex justify-center items-center px-10 sm:px-12 md:px-0">

          {/* Arrows - higher z-index to be above cards */}
          <button
            aria-label="Previous"
            onClick={goPrev}
            className="absolute left-0 sm:left-2 md:-left-4 top-1/2 -translate-y-1/2 z-50 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" className="text-slate-900 sm:w-5 sm:h-5">
              <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>

          <button
            aria-label="Next"
            onClick={goNext}
            className="absolute right-0 sm:right-2 md:-right-4 top-1/2 -translate-y-1/2 z-50 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" className="text-slate-900 sm:w-5 sm:h-5">
              <path d="M9 18l6-6-6-6" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
            {materials.map((m, i) => {
              const { tx, scale, opacity, z } = layout[i];
              if (opacity === 0) return null; // hide cards outside visible range

              return (
                <div
                  key={i}
                  className="bg-gray-300 absolute w-[260px] sm:w-[300px] md:w-[340px] h-[340px] sm:h-[380px] md:h-[400px] bg-gray-50 p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl shadow-lg flex flex-col transition-transform duration-1000 overflow-hidden"
                  style={{
                    transform: `translateX(${tx}px) scale(${scale})`,
                    zIndex: z,
                    opacity,
                  }}
                >
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-center">{m.title}</h3>
                  <div className={`text-xs sm:text-sm md:text-base text-gray-700 text-center flex-1 ${expanded[i] ? 'overflow-auto' : ''}`}>
                    {m.title === "New Zealand Wool" ? (
                      <>
                        <p className="mb-2">
                          {expanded[i] ? "Sourced from fine Merino sheep in Australia and New Zealand, this wool is prized for its exceptional quality, soft texture, and beautifully crimped fibers. Its pure white hue makes it perfect for light-colored rugs, offering durability, softness, and excellent color retention." : truncateText("Sourced from fine Merino sheep in Australia and New Zealand, this wool is prized for its exceptional quality, soft texture, and beautifully crimped fibers. Its pure white hue makes it perfect for light-colored rugs, offering durability, softness, and excellent color retention.", 25)}
                        </p>
                        <p>
                          {expanded[i] ? (
                            <>
                              New Zealand wool can also be artfully blended with Tibetan wool, silk, or other materials, creating rugs with unique textures, luxurious feel, and distinctive character
                              <button onClick={() => toggleExpanded(i)} className="px-1 py-0 font-bold">
                                see less
                              </button>
                            </>
                          ) : (
                            <>
                              {truncateText("New Zealand wool can also be artfully blended with Tibetan wool, silk, or other materials, creating rugs with unique textures, luxurious feel, and distinctive character", 25)}
                              <button onClick={() => toggleExpanded(i)} className="px-1 py-0 font-bold">
                                see more
                              </button>
                            </>
                          )}
                        </p>
                      </>
                    ) : m.title === "Chinese Silk" ? (
                      <>
                        <p className="mb-2">
                          {expanded[i] ? "Sourced from the finest silkworms (Bombyx mori) in China, this silk is the epitome of elegance—sumptuously soft, shimmering with a natural lustre, and unmistakably luxurious. Revered worldwide for its high-end craftsmanship, Chinese silk transforms every rug into a masterpiece of texture and sophistication." : truncateText("Sourced from the finest silkworms (Bombyx mori) in China, this silk is the epitome of elegance—sumptuously soft, shimmering with a natural lustre, and unmistakably luxurious. Revered worldwide for its high-end craftsmanship, Chinese silk transforms every rug into a masterpiece of texture and sophistication.", 25)}
                        </p>
                        <p>
                          {expanded[i] ? (
                            <>
                              It can be crafted into 100% Chinese silk rugs or blended with wool and other selected yarns, tailored to your requirements, creating pieces that exude opulence, exquisite detail, and timeless beauty.
                              <button onClick={() => toggleExpanded(i)} className="px-1 py-0 font-bold">
                                see less
                              </button>
                            </>
                          ) : (
                            <>
                              {truncateText("It can be crafted into 100% Chinese silk rugs or blended with wool and other selected yarns, tailored to your requirements, creating pieces that exude opulence, exquisite detail, and timeless beauty.", 25)}
                              <button onClick={() => toggleExpanded(i)} className="px-1 py-0 font-bold">
                                see more
                              </button>
                            </>
                          )}
                        </p>
                      </>
                    ) : (
                      <p>
                        {expanded[i] ? (
                          <>
                            {m.description}
                            <button onClick={() => toggleExpanded(i)} className="px-1 py-0 font-bold">
                              see less
                            </button>
                          </>
                        ) : (
                          <>
                            {truncateText(m.description, 50)}
                            <button onClick={() => toggleExpanded(i)} className="px-1 py-0 font-bold">
                              see more
                            </button>
                          </>
                        )}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </section>
  );
};

export default MaterialsCarousel;
