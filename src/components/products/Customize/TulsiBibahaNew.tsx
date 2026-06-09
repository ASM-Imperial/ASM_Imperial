import React from 'react';
import ProductCustomizer from './ProductCustomizer';
import TulsiBibahaLayer from './TulsiBibahaLayer';
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
  name: "Tulsi Bibaha",
  layers: [
    { src: "/layers/TulsiBibaha/TulsiBibaha1.png", defaultColor: "#b2945f", defaultName: "DT 07" },
    { src: "/layers/TulsiBibaha/TulsiBibaha2.png", defaultColor: "#F7EDA6", defaultName: "DI 10" },
    { src: "/layers/TulsiBibaha/TulsiBibaha3.png", defaultColor: "#729292", defaultName: "CF 08" },
    { src: "/layers/TulsiBibaha/TulsiBibaha4.png", defaultColor: "#584C4E", defaultName: "AJ 04" },
    { src: "/layers/TulsiBibaha/TulsiBibaha5.png", defaultColor: "#5E1720", defaultName: "AS 01" },

  ],
  detailImages: [
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/TulsiBibaha1.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/TulsiBibaha2.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/TulsiBibaha3.webp',
  ],
};

const TulsiBibahaNew: React.FC = () => (
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
    LayerComponent={TulsiBibahaLayer}
  />
);

export default TulsiBibahaNew;
