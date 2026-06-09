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
  image?: string;
  description: string;
  detailedDescription?: string;
}

const steps: Step[] = [
  {
    title: "Warm Water Washing",
    image: "https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/extra_images/13.jpeg",
    description: "✨ Pure. Safe. Vibrant. Crafted to last.",
    detailedDescription:
      `Before dyeing, yarns are gently washed to remove impurities, ensuring deep, even color absorption and a radiant finish.`,
  },
  {
    title: "Precision Color Sampling",
    image: "https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/extra_images/14.jpeg",
    description: "✨ Pure. Safe. Vibrant. Crafted to last.",
    detailedDescription: `
Dye master prepares a small sample tuft to match your desired shade. Once approved, the same formula is used for the full batch-guaranteeing consistency and perfection. The dyeing is done manually, heating pots gradually to 90-95°C. Yarns are then sun-dried naturally, giving them a luminous, lasting shine.

1. Swiss Chrome Dyes
Made in Switzerland, these dyes are metal-free, non-toxic, and colorfast, ensuring brilliance without harming your health or the planet.

2. Vegetable Dyes
Derived from plants and minerals such as walnut, indigo, madder root, and henna, these dyes create organic tones with a natural, abstract charm. 100% eco-friendly and beautifully imperfect.

3. Color Communication
We use the ARS color system and can match any sample you provide-ensuring your rug’s color is exactly as you envision.`,
  },
];

const DyingProcessPage: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<Step | null>(null);

  return (
    <motion.section
      className="relative bg-gradient-to-br from-white via-gray-50 to-amber-50 py-[60px] px-4 sm:px-6 md:px-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInUp}
    >
      <motion.div className="max-w-6xl mx-auto" variants={fadeInUp}>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-800 mb-4 sm:mb-6 drop-shadow-sm">
          Dying Process
        </h2>
        <p className="text-center text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-8 sm:mb-12">
          Every color is carefully crafted to bring your rugs to life, blending artistry with precision. We use Swiss Chrome AZO-free dyes and natural vegetable dyes - safe, vibrant, and eco-friendly - for colors that are rich, lasting, and beautifully natural.
        </p>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-gray-200 backdrop-blur-md border border-gray-100 shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition transform hover:-translate-y-2 cursor-pointer"
              variants={fadeInUp}
              onClick={() => setSelectedStep(step)}
            >
              {step.image && (
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-64 sm:h-72 md:h-80 object-cover"
                />
              )}
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

      {/* Detail Modal */}
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
                {selectedStep.image && (
                  <div className="md:w-1/2 w-full flex-shrink-0">
                    <img
                      src={selectedStep.image}
                      alt={selectedStep.title}
                      className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-xl"
                    />
                  </div>
                )}

                {/* Right Side - Description */}
                <div className={`flex flex-col justify-start ${selectedStep.image ? "md:w-1/2" : "w-full"}`}>
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

export default DyingProcessPage;
