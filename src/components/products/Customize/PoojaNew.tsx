import React from 'react';
import ProductCustomizer from './ProductCustomizer';
import PoojaLayer from './PoojaLayer';
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
  name: "Pooja",
  layers: [
    { src: "/layers/Pooja/Pooja6.png", defaultColor: "#5E5542", defaultName: "CO 04" },
    { src: "/layers/Pooja/Pooja5.png", defaultColor: "#9A8E7C", defaultName: "AC 07" },
    { src: "/layers/Pooja/Pooja4.png", defaultColor: "#D6CFB6", defaultName: "DA 11" },
    { src: "/layers/Pooja/Pooja3.png", defaultColor: "#F5EFDC", defaultName: "AH 10" },
    { src: "/layers/Pooja/Pooja2.png", defaultColor: "#B7BAA7", defaultName: "CT 12" },
    { src: "/layers/Pooja/Pooja1.png", defaultColor: "#ACBDAB", defaultName: "CS 10" },

  ],
  detailImages: [
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/Pooja1.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/Pooja2.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/Pooja3.webp',
  ],
};

const PoojaNew: React.FC = () => (
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
    LayerComponent={PoojaLayer}
  />
);

export default PoojaNew;
