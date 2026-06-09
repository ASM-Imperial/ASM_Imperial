import React from 'react';
import ProductCustomizer from './ProductCustomizer';
import TeraiFarmLayer from './TeraiFarmLayer';
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
  name: "Terai Farm",
  layers: [
    { src: "/layers/TeraiFarm/Terai Farm1.png", defaultColor: "#725264", defaultName: "EJ 06" },
    { src: "/layers/TeraiFarm/Terai Farm2.png", defaultColor: "#d7be8a", defaultName: "DB 07" },
    { src: "/layers/TeraiFarm/Terai Farm3.png", defaultColor: "#e4c69c", defaultName: "DS 09" },
    { src: "/layers/TeraiFarm/Terai Farm4.png", defaultColor: "#ebdcb4", defaultName: "DT 11" },
    { src: "/layers/TeraiFarm/Terai Farm5.png", defaultColor: "#c3ccaf", defaultName: "CD 11" },
    { src: "/layers/TeraiFarm/Terai Farm6.png", defaultColor: "#91be9f", defaultName: "CH 09" },
    { src: "/layers/TeraiFarm/Terai Farm7.png", defaultColor: "#52717a", defaultName: "CF 05" },
    { src: "/layers/TeraiFarm/Terai Farm8.png", defaultColor: "#1e2a3d", defaultName: "BK 01" },
  ],
  detailImages: [
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/teraifarm1.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/teraifarm2.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/teraifarm3.webp',
  ],
};

const TeraiFarmNew: React.FC = () => (
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
    LayerComponent={TeraiFarmLayer}
  />
);

export default TeraiFarmNew;
