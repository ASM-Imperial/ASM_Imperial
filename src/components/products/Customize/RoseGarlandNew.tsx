import React from 'react';
import ProductCustomizer from './ProductCustomizer';
import RoseGarlandLayer from './RoseGarlandLayer';
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
  name: "Rose Garland",
  layers: [
    { src: "/layers/RoseGarland/RoseGarland5.png", defaultColor: "#070B1E", defaultName: "BA 02" },
    { src: "/layers/RoseGarland/RoseGarland4.png", defaultColor: "#151C30", defaultName: "BT 04" },
    { src: "/layers/RoseGarland/RoseGarland3.png", defaultColor: "#183941", defaultName: "CE 02" },
    { src: "/layers/RoseGarland/RoseGarland2.png", defaultColor: "#6F8A68", defaultName: "CD 07" },
    { src: "/layers/RoseGarland/RoseGarland1.png", defaultColor: "#E5D3A3", defaultName: "DC 11" },

  ],
  detailImages: [
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/RoseGarland1.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/RoseGarland2.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/RoseGarland3.webp',
  ],
};

const RoseGarlandNew: React.FC = () => (
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
    LayerComponent={RoseGarlandLayer}
  />
);

export default RoseGarlandNew;
