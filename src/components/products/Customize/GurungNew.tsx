import React from 'react';
import ProductCustomizer from './ProductCustomizer';
import GurungLayer from './GurungLayer';
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
  name: "Gurung",
  layers: [
    { src: "/layers/Gurung/Gurung1.png", defaultColor: "#474B28", defaultName: "CP 03" },
    { src: "/layers/Gurung/Gurung2.png", defaultColor: "#29686F", defaultName: "CG 04" },
    { src: "/layers/Gurung/Gurung3.png", defaultColor: "#66A297", defaultName: "CI 06" },
    { src: "/layers/Gurung/Gurung4.png", defaultColor: "#D3D89E", defaultName: "CK 10" },
    { src: "/layers/Gurung/Gurung5.png", defaultColor: "#E0BB76", defaultName: "DR 09" },
    { src: "/layers/Gurung/Gurung6.png", defaultColor: "#F2973C", defaultName: "DM 06" },
  ],
  detailImages: [
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/gurung1.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/gurung2.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/gurung3.webp',
  ],
};

const GurungNew: React.FC = () => (
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
    LayerComponent={GurungLayer}
  />
);

export default GurungNew;
