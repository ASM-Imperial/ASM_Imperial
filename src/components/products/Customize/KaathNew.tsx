import React from 'react';
import ProductCustomizer from './ProductCustomizer';
import KaathLayer from './KaathLayer';
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
  name: "Kaath",
  layers: [
    { src: "/layers/Kaath/Kaath1.png", defaultColor: "#7c5834", defaultName: "DB 04" },
    { src: "/layers/Kaath/Kaath2.png", defaultColor: "#b79864", defaultName: "DB 06" },
    { src: "/layers/Kaath/Kaath3.png", defaultColor: "#c5b08d", defaultName: "DB 08" },
    { src: "/layers/Kaath/Kaath4.png", defaultColor: "#d8caa0", defaultName: "DB 10" },
    { src: "/layers/Kaath/Kaath5.png", defaultColor: "#c7b99e", defaultName: "DB 12" },
  ],
  detailImages: [
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/kaath1.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/kaath2.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/kaath3.webp',
  ],
};

const KaathNew: React.FC = () => (
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
    LayerComponent={KaathLayer}
  />
);

export default KaathNew;
