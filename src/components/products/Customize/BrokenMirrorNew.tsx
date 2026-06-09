import React from 'react';
import ProductCustomizer from './ProductCustomizer';
import BrokenMirrorLayer from './BrokenMirrorLayer';
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
  name: "Broken Mirror",
  layers: [
    { src: "/layers/BrokenMirror/BrokenMirror1.png", defaultColor: "#f2973c", defaultName: "DM 06" },
    { src: "/layers/BrokenMirror/BrokenMirror2.png", defaultColor: "#f9ae53", defaultName: "DM 07" },
    { src: "/layers/BrokenMirror/BrokenMirror3.png", defaultColor: "#a28446", defaultName: "DC 08" },
    { src: "/layers/BrokenMirror/BrokenMirror4.png", defaultColor: "#41464e", defaultName: "BM 04" },
    { src: "/layers/BrokenMirror/BrokenMirror5.png", defaultColor: "#6f757b", defaultName: "BM 07" },
    { src: "/layers/BrokenMirror/BrokenMirror6.png", defaultColor: "#989e92", defaultName: "CA 08" },
  ],
  detailImages: [
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/brokenmirror1.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/brokenmirror2.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/brokenmirror3.webp',
  ],
};

const BrokenMirrorNew: React.FC = () => (
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
    LayerComponent={BrokenMirrorLayer}
  />
);

export default BrokenMirrorNew;
