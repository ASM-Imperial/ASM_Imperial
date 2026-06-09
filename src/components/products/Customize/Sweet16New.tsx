import React from 'react';
import ProductCustomizer from './ProductCustomizer';
import Sweet16Layer from './Sweet16Layer';
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
  name: "Sweet16",
  layers: [
    { src: "/layers/Sweet16/Sweet161.png", defaultColor: "#ea7b31", defaultName: "DM 05" },
    { src: "/layers/Sweet16/Sweet162.png", defaultColor: "#c14420", defaultName: "DM 01" },
    { src: "/layers/Sweet16/Sweet163.png", defaultColor: "#5e1720", defaultName: "AS 01" },
    { src: "/layers/Sweet16/Sweet164.png", defaultColor: "#0c0d18", defaultName: "BT 01" },
  ],
  detailImages: [
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/sweet161.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/sweet162.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/sweet163.webp',
  ],
};

const Sweet16New: React.FC = () => (
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
    LayerComponent={Sweet16Layer}
  />
);

export default Sweet16New;
