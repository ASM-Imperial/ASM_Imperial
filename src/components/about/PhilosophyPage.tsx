// import React from "react";
// import { motion, Variants } from "framer-motion";
// import { Heart, Globe, Compass, Scissors } from "lucide-react";

// const fadeInUp: Variants = {
//   hidden: { opacity: 0, y: 40 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.8, ease: "easeOut" },
//   },
// };

// const PhilosophyPage: React.FC = () => {
//   return (
//     <motion.section
//       className="relative bg-gradient-to-br from-white via-gray-50 to-amber-50 py-20 px-6 md:px-20"
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true, amount: 0.2 }}
//       variants={fadeInUp}
//     >
//       <div className="max-w-6xl mx-auto space-y-20">
//         {/* Header */}
//         <motion.div
//           className="text-center space-y-6"
//           variants={fadeInUp}
//         >
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-800 drop-shadow-sm">
//             Our Philosophy
//           </h2>
//           <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
//             At Modern Nature Design Nepal, we are driven by purpose — blending heritage,
//             artistry, and ethics to craft rugs that tell stories of culture, conscience,
//             and creativity.
//           </p>
//         </motion.div>

//         {/* Mission */}
//         <motion.div
//           className="bg-white/90 backdrop-blur-md shadow-lg rounded-2xl p-8 border border-gray-100"
//           variants={fadeInUp}
//         >
//           <div className="flex items-center gap-3 mb-4 justify-center">
//             <Heart className="text-amber-600 w-8 h-8" />
//             <h3 className="text-3xl font-semibold text-gray-800">🎯 Our Mission</h3>
//           </div>
//           <ul className="text-gray-700 text-lg md:text-xl leading-relaxed space-y-2 max-w-4xl mx-auto text-center">
//             <li>• Preserve and promote Nepalese craftsmanship through traditional weaving and modern design.</li>
//             <li>• Ensure ethical production using natural, sustainable materials.</li>
//             <li>• Empower local artisans with fair employment and recognition.</li>
//             <li>• Deliver excellence globally with handcrafted rugs that elevate interiors worldwide.</li>
//           </ul>
//         </motion.div>

//         {/* Vision */}
//         <motion.div
//           className="bg-white/90 backdrop-blur-md shadow-lg rounded-2xl p-8 border border-gray-100"
//           variants={fadeInUp}
//         >
//           <div className="flex items-center gap-3 mb-4 justify-center">
//             <Globe className="text-amber-600 w-8 h-8" />
//             <h3 className="text-3xl font-semibold text-gray-800">🌍 Our Vision</h3>
//           </div>
//           <ul className="text-gray-700 text-lg md:text-xl leading-relaxed space-y-2 max-w-4xl mx-auto text-center">
//             <li>• Nepalese artistry is celebrated globally as a symbol of heritage and creativity.</li>
//             <li>• Sustainability is standard, setting new benchmarks in eco-friendly rug production.</li>
//             <li>• Communities thrive, with artisans uplifted through meaningful employment.</li>
//             <li>• Design meets purpose — every rug tells a story of craft, culture, and conscience.</li>
//           </ul>
//         </motion.div>

//         {/* Values */}
//         <motion.div
//           className="bg-white/90 backdrop-blur-md shadow-lg rounded-2xl p-8 border border-gray-100"
//           variants={fadeInUp}
//         >
//           <div className="flex items-center gap-3 mb-4 justify-center">
//             <Compass className="text-amber-600 w-8 h-8" />
//             <h3 className="text-3xl font-semibold text-gray-800">🧭 Our Values</h3>
//           </div>
//           <ul className="text-gray-700 text-lg md:text-xl leading-relaxed space-y-2 max-w-3xl mx-auto text-center">
//             <li>• <span className="font-semibold text-gray-800">Integrity</span> – Honesty and transparency in every process.</li>
//             <li>• <span className="font-semibold text-gray-800">Quality</span> – Superior craftsmanship and materials.</li>
//             <li>• <span className="font-semibold text-gray-800">Sustainability</span> – Environmentally responsible practices.</li>
//             <li>• <span className="font-semibold text-gray-800">Community</span> – Supporting artisans and their families with dignity and pride.</li>
//           </ul>
//         </motion.div>

//         {/* Craftsmanship */}
//         <motion.div
//           className="bg-white/90 backdrop-blur-md shadow-lg rounded-2xl p-8 border border-gray-100"
//           variants={fadeInUp}
//         >
//           <div className="flex items-center gap-3 mb-4 justify-center">
//             <Scissors className="text-amber-600 w-8 h-8" />
//             <h3 className="text-3xl font-semibold text-gray-800">🧶 Craftsmanship at Its Finest</h3>
//           </div>
//           <p className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-4xl mx-auto text-center mb-4">
//             Each rug from MND Nepal is a masterpiece of human touch and patience,
//             handwoven with care, precision, and passion.
//           </p>
//           <ul className="text-gray-700 text-lg md:text-xl leading-relaxed space-y-2 max-w-4xl mx-auto text-center">
//             <li>• High-quality yarns — soft, durable, and naturally lustrous.</li>
//             <li>• Eco-friendly fibers — including bamboo, hemp, and banana fiber.</li>
//             <li>• Traditional knotting — 60 to 150 knots per square inch for fine detail and durability.</li>
//           </ul>
//           <p className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto text-center mt-4">
//             Every artisan pours passion and precision into their work — transforming raw
//             materials into woven art that transcends time.
//           </p>
//         </motion.div>
//       </div>
//     </motion.section>
//   );
// };

// export default PhilosophyPage;


import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Heart, Globe, Compass, Scissors, X } from "lucide-react";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 },
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

const PhilosophyPage: React.FC = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const cards = [
    {
      id: "mission",
      icon: <Heart className="w-full h-full text-amber-600" />,
      title: "Our Mission",
      content: (
        <>
          <p className="text-gray-700 text-lg leading-relaxed">
            At MND Nepal, our mission is to:
          </p>
          <ul className="list-disc list-inside text-gray-700 text-lg leading-relaxed mt-3 space-y-2">
            <li>Preserve and promote Nepalese craftsmanship through traditional weaving and modern design.</li>
            <li>Ensure ethical production using natural, sustainable materials.</li>
            <li>Empower local artisans with fair employment and recognition.</li>
            <li>Deliver excellence globally with handcrafted rugs that elevate interiors worldwide.</li>
          </ul>
        </>
      ),
    },
    {
      id: "vision",
      icon: <Globe className="w-full h-full text-amber-600" />,
      title: "Our Vision",
      content: (
        <>
          <p className="text-gray-700 text-lg leading-relaxed">
            We envision a world where:
          </p>
          <ul className="list-disc list-inside text-gray-700 text-lg leading-relaxed mt-3 space-y-2">
            <li>Nepalese artistry is celebrated globally as a symbol of heritage and creativity.</li>
            <li>Sustainability is standard, setting new benchmarks in eco-friendly rug production.</li>
            <li>Communities thrive, with artisans uplifted through meaningful employment.</li>
            <li>Design meets purpose - every rug tells a story of craft, culture, and conscience.</li>
          </ul>
        </>
      ),
    },
    {
      id: "values",
      icon: <Compass className="w-full h-full text-amber-600" />,
      title: "Our Values",
      content: (
        <ul className="list-disc list-inside text-gray-700 text-lg leading-relaxed space-y-2">
          <li><strong>Integrity</strong> - Honesty and transparency in every process.</li>
          <li><strong>Quality</strong> - Superior craftsmanship and materials.</li>
          <li><strong>Sustainability</strong> - Environmentally responsible practices.</li>
          <li><strong>Community</strong> - Supporting artisans and their families with dignity and pride.</li>
        </ul>
      ),
    },
    {
      id: "craftsmanship",
      icon: <Scissors className="w-full h-full text-amber-600" />,
      title: "Craftsmanship at Its Finest",
      content: (
        <>
          <p className="text-gray-700 text-lg leading-relaxed">
            Each rug from MND Nepal is a masterpiece of human touch and patience,
            handwoven using:
          </p>
          <ul className="list-disc list-inside text-gray-700 text-lg leading-relaxed mt-3 space-y-2">
            <li>High-quality yarns - soft, durable, and naturally lustrous.</li>
            <li>Eco-friendly fibers - including bamboo, hemp, and banana fiber.</li>
            <li>Traditional knotting - 60 to 150 knots per square inch for fine detail and durability.</li>
          </ul>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            Every artisan pours passion and precision into their work — transforming raw
            materials into woven art that transcends time.
          </p>
        </>
      ),
    },
  ];

  const selectedCard = cards.find((c) => c.id === activeCard);

  return (
    <motion.section
      className="relative bg-gradient-to-br from-white via-gray-50 to-amber-50 py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInUp}
    >
      <div className="max-w-6xl mx-auto text-center space-y-6 sm:space-y-10">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 drop-shadow-sm"
          variants={fadeInUp}
        >
          Our Philosophy
        </motion.h2>
        <motion.p
          className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto"
          variants={fadeInUp}
        >
          Discover the values and vision that shape every rug we create - a blend of heritage, ethics, and artistic excellence.
        </motion.p>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mt-6 sm:mt-10"
          variants={fadeInUp}
        >
          {cards.map((card) => (
            <motion.div
              key={card.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveCard(card.id)}
              className="cursor-pointer bg-gray-200 shadow-md hover:shadow-xl transition-all duration-300 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center border border-gray-100"
            >
              <div className="w-6 h-6 sm:w-8 sm:h-8">{card.icon}</div>
              <h3 className="text-sm sm:text-base md:text-xl lg:text-2xl font-semibold text-gray-800 mt-2 sm:mt-4 text-center">{card.title}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeCard && selectedCard && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            onClick={() => setActiveCard(null)}
          >
            <motion.div
              className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-md sm:max-w-lg md:max-w-xl w-full p-4 sm:p-6 relative overflow-y-auto max-h-[70vh] sm:max-h-[75vh]"
              variants={modalVariants}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveCard(null)}
                className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Icon and Heading in a single line */}
              <div className="flex items-center gap-2 sm:gap-3 mb-4 border-b pb-2">
                <div className="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0">{selectedCard.icon}</div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">{selectedCard.title}</h3>
              </div>

              {/* Content */}
              <div className="text-left text-sm sm:text-base">{selectedCard.content}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default PhilosophyPage;
