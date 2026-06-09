import React from 'react';
import ProductCustomizer from './ProductCustomizer';
import GrahaLayer from './GrahaLayer';
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
  name: "Graha",
  layers: [
    { src: "/layers/Graha/Graha4.png", defaultColor: "#A09174", defaultName: "CN 09" },
    { src: "/layers/Graha/Graha3.png", defaultColor: "#68BAC8", defaultName: "CJ 08" },
    { src: "/layers/Graha/Graha2.png", defaultColor: "#EBDCB4", defaultName: "DT 11" },
    { src: "/layers/Graha/Graha1.png", defaultColor: "#D8C4AB", defaultName: "AH 07" },


  ],
  detailImages: [
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/Graha1.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/Graha2.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/Graha3.webp',
  ],
};

const GrahaNew: React.FC = () => (
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
    LayerComponent={GrahaLayer}
  />
);

export default GrahaNew;
