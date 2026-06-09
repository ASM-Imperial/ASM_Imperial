import React from 'react';
import ProductCustomizer from './ProductCustomizer';
import OnBoardLayer from './OnBoardLayer';
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
  name: "On Board",
  layers: [
    { src: "/layers/OnBoard/OnBoard1.png", defaultColor: "#a49264", defaultName: "DA 07" },
    { src: "/layers/OnBoard/OnBoard2.png", defaultColor: "#d8caa0", defaultName: "DB 10" },
    { src: "/layers/OnBoard/OnBoard3.png", defaultColor: "#99a089", defaultName: "CT 11" },
    { src: "/layers/OnBoard/OnBoard4.png", defaultColor: "#6d7e63", defaultName: "CT 08" },
    { src: "/layers/OnBoard/OnBoard5.png", defaultColor: "#99aca5", defaultName: "CF 09" },
  ],
  detailImages: [
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/onboard1.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/onboard2.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/onboard3.webp',
  ],
};

const OnBoardNew: React.FC = () => (
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
    LayerComponent={OnBoardLayer}
  />
);

export default OnBoardNew;
