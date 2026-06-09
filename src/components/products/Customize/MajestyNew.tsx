import React from 'react';
import ProductCustomizer from './ProductCustomizer';
import MajestyLayer from './MajestyLayer';
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
  name: "Majesty",
  layers: [
    { src: "/layers/Majesty/Majesty1.png", defaultColor: "#661F2D", defaultName: "AM 01" },
    { src: "/layers/Majesty/Majesty2.png", defaultColor: "#ae5b3b", defaultName: "DN 08" },
    { src: "/layers/Majesty/Majesty3.png", defaultColor: "#ea7b31", defaultName: "DN 05" },
    { src: "/layers/Majesty/Majesty4.png", defaultColor: "#e9c22c", defaultName: "DI 04" },
    { src: "/layers/Majesty/Majesty5.png", defaultColor: "#be913a", defaultName: "DD 06" },
    { src: "/layers/Majesty/Majesty6.png", defaultColor: "#9c7823", defaultName: "DD 04" },
    { src: "/layers/Majesty/Majesty7.png", defaultColor: "#715121", defaultName: "DC 04" },
    { src: "/layers/Majesty/Majesty8.png", defaultColor: "#403a1a", defaultName: "CQ 03" },
    { src: "/layers/Majesty/Majesty9.png", defaultColor: "#383621", defaultName: "C0 02" },
    { src: "/layers/Majesty/Majesty10.png", defaultColor: "#2c332c", defaultName: "CA 03" },
    { src: "/layers/Majesty/Majesty11.png", defaultColor: "#2b2130", defaultName: "ER 01" },
    { src: "/layers/Majesty/Majesty12.png", defaultColor: "#1d2339", defaultName: "BN 02" },
  ],
  detailImages: [
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/majesty1.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/majesty2.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/majesty3.webp',
  ],
};

const MajestyNew: React.FC = () => (
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
    LayerComponent={MajestyLayer}
  />
);

export default MajestyNew;
