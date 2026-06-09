import React from 'react';
import ProductCustomizer from './ProductCustomizer';
import MayaLayer from './MayaLayer';
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
  name: "Maya",
  layers: [
    { src: "/layers/Maya/Maya5.png", defaultColor: "#E8E6DB", defaultName: "CR 12" },
    { src: "/layers/Maya/Maya4.png", defaultColor: "#C2C0B4", defaultName: "CA 11" },
    { src: "/layers/Maya/Maya3.png", defaultColor: "#998D86", defaultName: "AE 08" },
    { src: "/layers/Maya/Maya2.png", defaultColor: "#854B58", defaultName: "EF 05" },
    { src: "/layers/Maya/Maya1.png", defaultColor: "#41464E", defaultName: "BM 04" },

  ],
  detailImages: [
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/Maya1.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/Maya2.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/Maya3.webp',
  ],
};

const MayaNew: React.FC = () => (
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
    LayerComponent={MayaLayer}
  />
);

export default MayaNew;
