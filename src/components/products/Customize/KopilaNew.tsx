import React from 'react';
import ProductCustomizer from './ProductCustomizer';
import KopilaLayer from './KopilaLayer';
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
  name: "Kopila",
  layers: [
    { src: "/layers/Kopila/Kopila5.png", defaultColor: "#B01A40", defaultName: "AP 03" },
    { src: "/layers/Kopila/Kopila4.png", defaultColor: "#133862", defaultName: "BI 01" },
    { src: "/layers/Kopila/Kopila3.png", defaultColor: "#9B7834", defaultName: "DF 05" },
    { src: "/layers/Kopila/Kopila2.png", defaultColor: "#F9F8F5", defaultName: "AH 12" },
    { src: "/layers/Kopila/Kopila1.png", defaultColor: "#1D88C2", defaultName: "CJ 05" },
  ],
  detailImages: [
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/Kopila1.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/Kopila2.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/Kopila3.webp',
  ],
};

const KopilaNew: React.FC = () => (
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
    LayerComponent={KopilaLayer}
  />
);

export default KopilaNew;
