import React from 'react';
import ProductCustomizer from './ProductCustomizer';
import BirendraTaalLayer from './BirendraTaalLayer';
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
  name: "Birendra Taal",
  layers: [
    { src: "/layers/BirendraTaal/Birendra Taal1.png", defaultColor: "#BFC761", defaultName: "CK 07" },
    { src: "/layers/BirendraTaal/Birendra Taal2.png", defaultColor: "#83934A", defaultName: "CM 08" },
    { src: "/layers/BirendraTaal/Birendra Taal3.png", defaultColor: "#34364B", defaultName: "BR 04" },
    { src: "/layers/BirendraTaal/Birendra Taal4.png", defaultColor: "#4D596C", defaultName: "BL 06" },
    { src: "/layers/BirendraTaal/Birendra Taal5.png", defaultColor: "#608682", defaultName: "CB O7" },
    { src: "/layers/BirendraTaal/Birendra Taal6.png", defaultColor: "#ABB8A0", defaultName: "CD 10" },
    { src: "/layers/BirendraTaal/Birendra Taal7.png", defaultColor: "#FDECBD", defaultName: "DR 11" },
    { src: "/layers/BirendraTaal/Birendra Taal8.png", defaultColor: "#A8D5D3", defaultName: "CJ 10" },
    { src: "/layers/BirendraTaal/Birendra Taal9.png", defaultColor: "#68BAC8", defaultName: "CJ 08" },
  ],
  detailImages: [
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/birendrataal1.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/birendrataal2.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/birendrataal3.webp',
  ],
};

const BirendraTaalNew: React.FC = () => (
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
    LayerComponent={BirendraTaalLayer}
  />
);

export default BirendraTaalNew;
