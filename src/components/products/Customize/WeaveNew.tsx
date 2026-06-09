import React from 'react';
import ProductCustomizer from './ProductCustomizer';
import WeavesLayer from './WeavesLayer';
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
  name: "Weave",
  layers: [
    { src: "/layers/Weaves/Weave1.png", defaultColor: "#c0c5af", defaultName: "CR 09" },
    { src: "/layers/Weaves/Weave2.png", defaultColor: "#f1efec", defaultName: "AD 12" },
  ],
  detailImages: [
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/weave1.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/weave2.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/weave3.webp',
  ],
};

const WeaveNew: React.FC = () => (
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
    LayerComponent={WeavesLayer}
  />
);

export default WeaveNew;
