import React from 'react';
import ProductCustomizer from './ProductCustomizer';
import UndefinedUniverseLayer from './UndefinedUniverseLayer';
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
  name: "Undefined Universe",
  layers: [
    { src: "/layers/UndefinedUniverse/undefined universe 1.png", defaultColor: "#183941", defaultName: "CE 02" },
    { src: "/layers/UndefinedUniverse/undefined universe 2.png", defaultColor: "#386267", defaultName: "CE 05" },
    { src: "/layers/UndefinedUniverse/undefined universe 3.png", defaultColor: "#8fa594", defaultName: "CB 09" },
    { src: "/layers/UndefinedUniverse/undefined universe 4.png", defaultColor: "#cdd1be", defaultName: "CD 12" },
    { src: "/layers/UndefinedUniverse/undefined universe 5.png", defaultColor: "#e8e6db", defaultName: "CR 12" },
    { src: "/layers/UndefinedUniverse/undefined universe 6.png", defaultColor: "#f9f8f5", defaultName: "AH 12" },
  ],
  detailImages: [
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/undefineduniverse1.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/undefineduniverse2.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/undefineduniverse3.webp',
  ],
};

const UndefinedUniverseNew: React.FC = () => (
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
    LayerComponent={UndefinedUniverseLayer}
  />
);

export default UndefinedUniverseNew;
