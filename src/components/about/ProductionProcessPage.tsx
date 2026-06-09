
import React, { useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

interface Step {
  title: string;
  image: string;
  description: string;
  detailedDescription?: string;
}

const steps: Step[] = [
  {
    title: "Wool Sorting & Washing",
    image: "https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/extra_images/1.jpeg",
    description:
      "Raw wool is carefully sorted, impurities removed, and thoroughly cleaned.",
    detailedDescription:
      "We begin with pure Tibetan wool sourced from the High Himalayas of Nepal, known for its strength, softness, and natural sheen. Each fleece is hand-sorted to remove impurities and separate natural color shades. The wool is then washed in warm water, cleansing away oils and dust - preparing it to absorb dyes beautifully and evenly.We use 100% Tibetan wool, never mixed, ensuring the finest quality from the very first touch."
  },
  {
    title: "Wool Carding",
    image: "https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/extra_images/2.jpeg",
    description:
      "Fibers are combed to remove residues and prepare for spinning.",
    detailedDescription:
      "The cleaned wool is hand-carded using traditional wooden and steel combs. This process aligns the fibers, removes the last traces of impurities, and creates a smooth, airy texture - the perfect foundation for spinning fine yarns."
  },
  {
    title: "Spinning",
    image: "https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/extra_images/3.jpeg",
    description:
      "Traditional spinning wheels twist threads into yarn.",
    detailedDescription:
      "Our artisans spin the carded wool on the wooden wheel (Charkha), twisting and drawing each fiber into yarns of perfect thickness. Yarn thickness depends on the rug’s knot density - coarser for 60–80 knots, finer for 100–150 knots. Every spin carries the rhythm of tradition, forming the soul of a timeless hand-knotted rug.",
  },
      {
    title: "Dyeing",
    image: "https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/extra_images/4.jpeg",
    description:
      "Yarns are dyed with Swiss chrome azo-free or vegetable dyes.",
    detailedDescription:
      "The spun yarns are washed again and then dyed by hand in large metal pots heated over wood or gas stoves. We use Swiss Chrome Azo-free dyes or natural vegetable dyes, depending on the desired color tone. Each hue is tested, matched, and fixed to perfection - ensuring brilliant, long-lasting colors that remain true for generations."
  },
  {
    title: "Weaving",
    image: "https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/extra_images/5.jpg",
    description:
      "Weavers handcraft rugs using looms and traditional tools.",
    detailedDescription:
      "Weaving is where craftsmanship meets art. Each rug is woven on vertical looms by master weavers following 1:1 scale design graphs placed in front of them. Using simple tools - scissors, rods, wooden beaters, and hammers - they tie each knot with precision and care. Thousands of hand-tied knots unite to form intricate patterns, capturing the essence of artistry."
  },
  {
    title: "Clipping & Carving",
    image: "https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/extra_images/6.JPG",
    description:
      "Edges are clipped and designs refined for a smooth finish.",
    detailedDescription:
      "Once off the loom, the rug undergoes its first transformation. Using large traditional scissors (Khapsi), artisans clip the surface evenly, revealing a smooth, luminous pile. Edges of motifs are hand-carved to enhance definition and create a refined, sculpted texture."
  },
  {
    title: "Washing & Drying",
    image: "https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/extra_images/7.PNG",
    description:
      "Rugs are washed with soap and left to dry naturally.",
    detailedDescription:
      "The rug is then washed thoroughly using natural soaps like Sapindus and gentle liquid cleansers. Artisans beat the rug with long wooden paddles, ensuring deep cleansing and softness. Finally, it is sun-dried naturally, allowing the Himalayan sunlight to bring warmth and life to every fiber."
  },
  {
    title: "Second Clipping and Carving",
    image: "https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/extra_images/8.PNG",
    description: "Surfaces are clipped again for uniformity.",
    detailedDescription:
      "After drying, the rug receives another round of fine clipping and carving. This step ensures a perfectly balanced surface and sharp, clean patterns - the final polish of perfection."
  },
  {
    title: "Stretching",
    image: "https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/extra_images/9.jpg",
    description: "Rugs are stretched on frames to lock their shape.",
    detailedDescription:
      "To maintain shape and symmetry, the rug is stretched on iron frames using hooks on all four sides. It remains in place for at least 7-8 hours, allowing the weave to settle evenly for flawless alignment and structure."
  },
  {
    title: "Final Finishing & Quality Check",
    image: "https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/extra_images/10.jpeg",
    description: "Experts inspect rugs for size, texture, and quality.",
    detailedDescription:
      "Each rug undergoes strict quality inspection by our experts. Every detail - size, color, texture, design, and surface - is examined to meet our highest standards. Only rugs that embody excellence move forward for packaging."
  },
  {
    title: "Packing",
    image: "https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/extra_images/11.PNG",
    description:
      "Rugs are packed in waterproof sheets for safe transport.",
    detailedDescription:
      "After the inspection, we pack the approved rugs in a heavy-duty plastic bag and cover them with waterproof sheets to prevent wear and tear. We pile them into burlap and prepare them for transportation to the market for sale."
  },
  {
    title: "Shipping",
    image: "https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/extra_images/12.jpeg",
    description: "Dispatched worldwide with trusted couriers.",
    detailedDescription:
      "Shipping The rugs are shipped with the fastest courier service, which normally takes 3-4 business days."
  },
];

const ProductionProcessPage: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<Step | null>(null);

  return (
    <motion.section
      className="relative bg-gradient-to-br from-white via-gray-50 to-amber-50 py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      variants={fadeInUp}
    >
      <motion.div className="max-w-6xl mx-auto" variants={fadeInUp}>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-800 mb-4 sm:mb-6 drop-shadow-sm">
          Production Process
        </h2>
        <p className="text-center text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-8 sm:mb-12">
          Every rug is a masterpiece woven by hand — from raw wool to final
          finish, each step reflects dedication, tradition, and craftsmanship.
        </p>

        {/* Grid Layout (same as your original) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-gray-200 backdrop-blur-md border border-gray-100 shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition transform hover:-translate-y-2 cursor-pointer"
              variants={fadeInUp}
              onClick={() => setSelectedStep(step)}
            >
              <img
                src={step.image}
                alt={step.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Detail Card Modal */}
      <AnimatePresence>
        {selectedStep && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedStep(null)}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden p-4 sm:p-6 relative flex flex-col md:flex-row gap-4 sm:gap-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedStep(null)}
                className="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-500 hover:text-gray-800 text-2xl sm:text-3xl font-bold z-10 w-8 h-8 flex items-center justify-center"
              >
                ×
              </button>

              {/* Content Container with Scroll */}
              <div className="flex flex-col md:flex-row gap-4 sm:gap-6 overflow-y-auto max-h-full">
                {/* Left Side - Image */}
                <div className="md:w-1/2 w-full flex-shrink-0">
                  <img
                    src={selectedStep.image}
                    alt={selectedStep.title}
                    className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-xl"
                  />
                </div>

                {/* Right Side - Description */}
                <div className="md:w-1/2 w-full flex flex-col justify-start">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2 sm:mb-3 pr-8">
                    {selectedStep.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-lg whitespace-pre-line">
                    {selectedStep.detailedDescription || selectedStep.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default ProductionProcessPage;



