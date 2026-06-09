import React from 'react';
import ProductCustomizer from './ProductCustomizer';
import ChakatiLayer from './ChakatiLayer';
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
  name: "Chakati",
  layers: [
    { src: "/layers/Chakati/Chakati1.png", defaultColor: "#b27c32", defaultName: "DR 06" },
    { src: "/layers/Chakati/Chakati2.png", defaultColor: "#a65805", defaultName: "DH 01" },
    { src: "/layers/Chakati/Chakati3.png", defaultColor: "#e7ae18", defaultName: "DH 07" },
    { src: "/layers/Chakati/Chakati4.png", defaultColor: "#aa8930", defaultName: "DF 04" },
    { src: "/layers/Chakati/Chakati5.png", defaultColor: "#785c3a", defaultName: "DT 05" },
  ],
  detailImages: [
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/chakati1.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/chakati2.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/chakati3.webp',
  ],
};

const ChakatiNew: React.FC = () => (
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
    LayerComponent={ChakatiLayer}
  />
);

export default ChakatiNew;
