import React from 'react';
import ProductCustomizer from './ProductCustomizer';
import ThoughtsLayer from './ThoughtsLayer';
import colorDataA from '../../../../color.json';
import colorDataB from '../../../../colorb.json';
import colorDataC from '../../../../colorC.json';
import colorDataD from '../../../../colorD.json';
import colorDataE from '../../../../colorE.json';
import { colorData1000 } from './colorData1000';
import color700 from '../../../../color700.json';

const colorDataA700 =color700[0];
const colorDataB700 =color700[1];
const colorDataC700 =color700[2];
const colorDataD700 =color700[3];
const colorDataE700 =color700[4];

const config = {
  name: "Thoughts",
  layers: [
    { src: "/layers/Thoughts/Thoughts1.png", defaultColor: "#31281f", defaultName: "AD01" },
    { src: "/layers/Thoughts/Thoughts2.png", defaultColor: "#b9a78e", defaultName: "AF09" },
    { src: "/layers/Thoughts/Thoughts3.png", defaultColor: "#75614f", defaultName: "AF06" },
    { src: "/layers/Thoughts/Thoughts4.png", defaultColor: "#1e171b", defaultName: "AA01" },
    { src: "/layers/Thoughts/Thoughts5.png", defaultColor: "#564641", defaultName: "AA10" },
    { src: "/layers/Thoughts/Thoughts6.png", defaultColor: "#d39867", defaultName: "DR06" },
    { src: "/layers/Thoughts/Thoughts7.png", defaultColor: "#baac9a", defaultName: "AF11" },
    { src: "/layers/Thoughts/Thoughts8.png", defaultColor: "#d6ccc0", defaultName: "AD10" },
    { src: "/layers/Thoughts/Thoughts9.png", defaultColor: "#8a7e79", defaultName: "AE07" },
  ],
  detailImages: [
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/thoughts1.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/thoughts2.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/thoughts3.webp',
  ],
};

const ThoughtsNew: React.FC = () => (
  <ProductCustomizer
    config={config}
    colorData1000={colorData1000}
    colorData1200A={colorDataA}
    colorData1200B={colorDataB}
    colorData1200C={colorDataC}
    colorData1200D={colorDataD}
    colorData1200E={colorDataE}
      colorData700A={colorDataA700}
    colorData700B={colorDataB700}
    colorData700C={colorDataC700}
    colorData700D={colorDataD700}
    colorData700E={colorDataE700}
    LayerComponent={ThoughtsLayer}
  />
);

export default ThoughtsNew;
