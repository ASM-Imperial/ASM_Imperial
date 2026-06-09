import React from 'react';
import ProductCustomizer from './ProductCustomizer';
import PingLayer from './PingLayer';
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
  name: "Ping",
  layers: [
    { src: "/layers/Ping/Ping1.png", defaultColor: "#ddd7e1", defaultName: "EP12" },
    { src: "/layers/Ping/Ping2.png", defaultColor: "#747b6f", defaultName: "CA07" },
    { src: "/layers/Ping/Ping3.png", defaultColor: "#4c4040", defaultName: "AB05" },
    { src: "/layers/Ping/Ping4.png", defaultColor: "#373133", defaultName: "AJ01" },
  ],
  detailImages: [
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/ping1.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/ping2.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/ping3.webp',
  ],
};

const PingNew: React.FC = () => (
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
    LayerComponent={PingLayer}
  />
);

export default PingNew;
