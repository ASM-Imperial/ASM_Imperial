import React from 'react';
import ProductCustomizer from './ProductCustomizer';
import MorningSunLayer from './MorningSunLayer';
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
  name: "Morning Sun",
  layers: [
    { src: "/layers/MorningSun/MorningSun1.png", defaultColor: "#ad8c47", defaultName: "DE 06" },
    { src: "/layers/MorningSun/MorningSun2.png", defaultColor: "#ded7a0", defaultName: "DE 11" },
    { src: "/layers/MorningSun/MorningSun3.png", defaultColor: "#7a9a98", defaultName: "CE 08" },
    { src: "/layers/MorningSun/MorningSun4.png", defaultColor: "#7681a0", defaultName: "BE 09" },
    { src: "/layers/MorningSun/MorningSun5.png", defaultColor: "#ddd0b3", defaultName: "DE 12" },
  ],
  detailImages: [
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/morningsun1.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/morningsun2.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/morningsun3.webp',
  ],
};

const MorningSunNew: React.FC = () => (
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
    LayerComponent={MorningSunLayer}
  />
);

export default MorningSunNew;
