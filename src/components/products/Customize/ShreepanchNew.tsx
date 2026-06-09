import React from 'react';
import ProductCustomizer from './ProductCustomizer';
import ShreePanchLayer from './ShreePanchLayer';
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
  name: "Shreepanch",
  layers: [
    { src: "/layers/ShreePanch/ShreePanch1.png", defaultColor: "#8F8176", defaultName: "AA 12" },
    { src: "/layers/ShreePanch/ShreePanch2.png", defaultColor: "#C5B99C", defaultName: "CN 11" },
    { src: "/layers/ShreePanch/ShreePanch3.png", defaultColor: "#D8DACB", defaultName: "CR 11" },
  ],
  detailImages: [
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/shreepanch1.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/shreepanch2.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/shreepanch3.webp',
  ],
};

const ShreepanchNew: React.FC = () => (
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
    LayerComponent={ShreePanchLayer}
  />
);

export default ShreepanchNew;
