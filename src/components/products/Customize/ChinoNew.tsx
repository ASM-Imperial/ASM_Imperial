import React from 'react';
import ProductCustomizer from './ProductCustomizer';
import ChinoLayer from './ChinoLayer';
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
  name: "Chino",
  layers: [
    { src: "/layers/Chino/Chino1.png", defaultColor: "#4e555a", defaultName: "BM05" },
    { src: "/layers/Chino/Chino2.png", defaultColor: "#91be9f", defaultName: "CH09" },
    { src: "/layers/Chino/Chino3.png", defaultColor: "#ebdba9", defaultName: "DH12" },
    { src: "/layers/Chino/Chino4.png", defaultColor: "#8f8176", defaultName: "AA12" },
    { src: "/layers/Chino/Chino5.png", defaultColor: "#2c2e39", defaultName: "BM03" },
  ],
  detailImages: [
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/chino1.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/chino2.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/chino3.webp',
  ],
};

const ChinoNew: React.FC = () => (
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
    LayerComponent={ChinoLayer}
  />
);

export default ChinoNew;
