import React from 'react';
import ProductCustomizer from './ProductCustomizer';
import ThaaliLayer from './ThaaliLayer';
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
  name: "Thaali",
  layers: [
    { src: "/layers/Thaali/Thaali1.png", defaultColor: "#e4bf4e", defaultName: "DH 09" },
    { src: "/layers/Thaali/Thaali2.png", defaultColor: "#e46b34", defaultName: "DL 03" },
    { src: "/layers/Thaali/Thaali3.png", defaultColor: "#f9f8f5", defaultName: "AH 12" },
    { src: "/layers/Thaali/Thaali4.png", defaultColor: "#6d8db1", defaultName: "BI 08" },
    { src: "/layers/Thaali/Thaali5.png", defaultColor: "#839a81", defaultName: "CS 10" },
    { src: "/layers/Thaali/Thaali6.png", defaultColor: "#aec6bd", defaultName: "CE 10" },
    { src: "/layers/Thaali/Thaali7.png", defaultColor: "#e2e3e4", defaultName: "BF 12" },
  ],
  detailImages: [
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/thaali1.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/thaali2.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/thaali3.webp',
  ],
};

const ThaaliNew: React.FC = () => (
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
    LayerComponent={ThaaliLayer}
  />
);

export default ThaaliNew;
