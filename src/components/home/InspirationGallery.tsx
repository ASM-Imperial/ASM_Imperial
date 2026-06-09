import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Item = {
  id: string;
  title: string;
  short: string;
  photo: string;
  design: string;
  carpet: string;
  inspirationDesc: string;
  translationDesc: string;
  finishedDesc: string;
};

const ITEMS: Item[] = [
  {
    id: "m1",
    title: "Lake and Himalayas",
    short: "Inspired by the morning light at Manaslu",
    photo: "https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/extra_images/inspiration2.jpg",
    design: "https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/extra_images/inspiration2_1.jpg",
    carpet: "https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/extra_images/inspiration2_3.jpg",
    inspirationDesc: "From the trail to creation — inspired by Gokyo Lake's beauty.",
    translationDesc: "Transforming natural forms into artistic language — woven into timeless rugs.",
    finishedDesc: "A hand-knotted masterpiece crafted by skilled artisans.",
  },
  {
    id: "m2",
    title: "Mountains",
    short: "Warm tones inspired by drifting sands",
    photo: "https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/extra_images/manaslu.jpg",
    design: "https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/extra_images/manaslu1.jpg",
    carpet: "https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/extra_images/manaslu3.jpg",
    inspirationDesc: "A meditative weave born from the sacred beauty of Himalayan temples.",
    translationDesc: "From raw earth to refined artistic expressions of timeless design.",
    finishedDesc: "A testament to precision, passion, and the finest Nepali craftsmanship.",
  },

  {
    id: "m3",
    title: "MOuntains",
    short: "Warm tones inspired by drifting sands",
    photo: "https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/extra_images/Pancha Kunda Photo.JPG",
    design: "https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/extra_images/Pancha Kunda 1.jpg",
    carpet: "https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/extra_images/panchkunda1.jpg",
    inspirationDesc: "A reflection of Panchakunda Lake's still waters and spiritual calm.",
    translationDesc: "Panchakunda's crystal calm and Himalayan power, woven into timeless design.",
    finishedDesc: "From loom to living room — pure elegance woven underfoot.",
  },

  {
    id: "m4",
    title: "Mountains",
    short: "Warm tones inspired by drifting sands",
    photo: "https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/extra_images/tihar3.jpg",
    design: "https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/extra_images/tihar.jpg",
    carpet: "https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/extra_images/tihar1.jpg",
    inspirationDesc: "An abstract celebration of Tihar's vibrant colors and soulful energy.",
    translationDesc: "Where organic beauty and tradition become woven artistic expression.",
    finishedDesc: "An heirloom-quality rug, handcrafted by Nepal's finest artisans.",
  },
];

export default function InspirationGalleryMinimal() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setIndex((prev) => (prev + 1) % ITEMS.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + ITEMS.length) % ITEMS.length);

  const item = ITEMS[index];

  return (
    <div className="w-full bg-[#f7f7f7] py-12 md:py-16 relative overflow-hidden">

      {/* LEFT ARROW */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 
                   z-20 p-1.5 md:p-2 rounded-full bg-white/90 shadow hover:shadow-lg transition"
      >
        <ChevronLeft size={18} className="md:w-5 md:h-5" />
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 
                   z-20 p-1.5 md:p-2 rounded-full bg-white/90 shadow hover:shadow-lg transition"
      >
        <ChevronRight size={18} className="md:w-5 md:h-5" />
      </button>

      <div className="w-[92%] mx-auto px-3 md:px-4">
        <div className="mb-6 md:mb-10">
          <h2 className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold leading-tight">
            From Nature's Palette to Timeless Hand-Knotted Rugs
          </h2>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-6 lg:mt-[170px]"
          >
            {/* LEFT COLUMN */}
            <div className="space-y-4 text-center md:text-left">
              <div className="flex flex-col items-center md:items-start gap-1.5">
                <div className="w-8 h-8 border rounded-full flex items-center justify-center text-gray-700">
                  <span className="text-base">▲</span>
                </div>
                <h3 className="text-base font-semibold tracking-wide">INSPIRATION</h3>
                <p className="text-gray-600 text-xs leading-relaxed max-w-xs">
                  {item.inspirationDesc}
                </p>
              </div>

              <motion.div
                className="w-full h-56 md:h-72 lg:h-72 overflow-hidden rounded-lg shadow-md hover:shadow-xl transition"
                whileHover={{ scale: 1.03 }}
              >
                <img src={item.photo} className="w-full h-full object-cover" />
              </motion.div>
            </div>

            {/* CENTER COLUMN */}
            <div className="flex flex-col-reverse md:flex-col gap-4 text-center">
              <motion.div
                className="mx-auto overflow-hidden rounded-lg shadow-md hover:shadow-xl transition h-[420px] md:h-[410px] lg:h-[570px] lg:-mt-[110px] w-[85%] md:w-[90%]"
                whileHover={{ scale: 1.03 }}
              >
                <img src={item.design} className="w-full h-full object-cover" />
              </motion.div>

              <div className="flex flex-col items-center gap-1.5">
                <div className="w-8 h-8 border rounded-full flex items-center justify-center text-gray-700">
                  <span className="text-base">✦</span>
                </div>
                <h3 className="text-base font-semibold tracking-wide">ARTISTIC TRANSLATION</h3>
                <p className="text-gray-600 text-xs leading-relaxed max-w-xs">
                  {item.translationDesc}
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-4 text-center md:text-right">
              <div className="flex flex-col items-center md:items-end gap-1.5">
                <div className="w-8 h-8 border rounded-full flex items-center justify-center text-gray-700">
                  <span className="text-base">❉</span>
                </div>
                <h3 className="text-base font-semibold tracking-wide">FINISHED CARPET</h3>
                <p className="text-gray-600 text-xs leading-relaxed max-w-xs mx-auto md:mx-0">
                  {item.finishedDesc}
                </p>
              </div>

              <motion.div
                className="w-full h-56 md:h-72 lg:h-72 overflow-hidden rounded-lg shadow-md hover:shadow-xl transition"
                whileHover={{ scale: 1.03 }}
              >
                <img src={item.carpet} className="w-full h-full object-cover" />
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* DOTS */}
        <div className="flex justify-center gap-2 mt-6 md:mt-8">
          {ITEMS.map((_, i) => (
            <motion.div
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full cursor-pointer transition-all duration-300 ${index === i ? "bg-black scale-125" : "bg-gray-400"
                }`}
              whileHover={{ scale: 1.3 }}
            ></motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
