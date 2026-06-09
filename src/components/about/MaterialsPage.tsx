import React from "react";
import { motion, Variants, easeInOut, easeOut } from "framer-motion";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: easeOut },
  },
  hover: { scale: 1.05, transition: { duration: 0.3, ease: easeInOut } },
};

const materials = [
  {
    title: "Tibetan Wool",
    description:
      "The quality of soft and lustrous wool supplied to make rugs comes from highland sheep's coats. These sheep, called 'Changphel,' graze at 14,000 feet in the cold Himalayan region. The wool has distinctive marks with tensile strength, long fleeces, and lanolin richness, making it soft, durable, and luxurious. Rugs made from Tibetan wool are warm, furry, and available in two shades: pure white and dark grey.",
  },
  {
    title: "New Zealand Wool",
    description:
      "This wool comes from the fur coating of merino sheep found in Australia and New Zealand. Known for its soft, white color and fine crimp, it enhances the beauty and aesthetics of woven rugs. Often blended with Tibetan wool, silk, or synthetic fabrics, New Zealand wool contributes to high-quality, valuable rug finishes.",
  },
  {
    title: "Chinese Silk",
    description:
      "Produced by Bombyx mori silkworms in the cocoon stage, Chinese silk is renowned for its luxurious and soft quality. When combined with wool, it enhances rugs by adding both softness and shine.",
  },
  {
    title: "Local Silk",
    description:
      "Harvested by farmers in Nepal, local silk is processed in factories to create high-quality rugs with natural shine and softness. Its production also supports local farmers by providing them with opportunities to sell silk in domestic markets, contributing to sustainable livelihoods.",
  },
  {
    title: "Viscose",
    description:
      "Made from cellulose xanthate, viscose is a regenerated fiber that mimics the qualities of silk. When used in rugs, it provides a glossy, silken feel at a more economical price, making it a popular choice in Nepal’s rug-making industry.",
  },
  {
    title: "Tencel",
    description:
      "A synthetic fiber made by the Australian company Lenzing AG, Tencel is derived from wood pulp that is dried, chipped, and mixed with solvents before being spun into threads. Known for being smooth, soft, and sustainable, Tencel retains its properties even after repeated washes, making it an innovative choice for modern rugs.",
  },
];


const MaterialsPage: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <motion.section
      className="relative bg-gradient-to-br from-teal-50 via-white to-amber-50 py-20 px-6 md:px-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div className="max-w-6xl mx-auto" variants={itemVariants}>
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12 drop-shadow-sm">
          Materials We Offer
        </h2>
        <Slider {...settings}>
          {materials.map((material, index) => (
            <div key={index} className="px-4 py-6">
              <motion.div
                className="bg-white/80 backdrop-blur-md shadow-lg border border-gray-100 rounded-2xl p-6 h-[320px] flex flex-col justify-between transition"
                variants={itemVariants}
                whileHover="hover"
              >
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                  {material.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed flex-grow">
                  {material.description}
                </p>
              </motion.div>
            </div>
          ))}
        </Slider>
      </motion.div>
    </motion.section>
  );
};

export default MaterialsPage;
