import React from 'react';
import ProductCustomizer from './ProductCustomizer';
import PathLayer from './PathLayer';
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
  name: "Path",
  layers: [
    { src: "/layers/Paath/Paath1.png", defaultColor: "#919aa2", defaultName: "BM 09" },
    { src: "/layers/Paath/Paath2.png", defaultColor: "#4d5b42", defaultName: "CR 05" },
    { src: "/layers/Paath/Paath3.png", defaultColor: "#fff5e9", defaultName: "DO 12" },
    { src: "/layers/Paath/Paath4.png", defaultColor: "#7e8492", defaultName: "BM 08" },
  ],
  detailImages: [
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/path1.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/path2.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/path3.webp',
  ],
};

const PathNew: React.FC = () => (
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
    LayerComponent={PathLayer}
  />
);

export default PathNew;
