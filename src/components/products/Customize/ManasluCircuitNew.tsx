import React from 'react';
import ProductCustomizer from './ProductCustomizer';
import ManasluCircuitLayer from './ManasluCircuitLayer';
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
  name: "Manaslu Circuit",
  layers: [
    { src: "/layers/ManasluCircuit/Manaslu Circuit1.png", defaultColor: "#989e92", defaultName: "CA 08" },
    { src: "/layers/ManasluCircuit/Manaslu Circuit2.png", defaultColor: "#bdbaa3", defaultName: "CQ 10" },
    { src: "/layers/ManasluCircuit/Manaslu Circuit3.png", defaultColor: "#ded7a0", defaultName: "DE 11" },
    { src: "/layers/ManasluCircuit/Manaslu Circuit4.png", defaultColor: "#eee8d2", defaultName: "AH 09" },
    { src: "/layers/ManasluCircuit/Manaslu Circuit5.png", defaultColor: "#f9f8f5", defaultName: "AH 12" },
    { src: "/layers/ManasluCircuit/Manaslu Circuit6.png", defaultColor: "#d3d89e", defaultName: "CK 10" },
    { src: "/layers/ManasluCircuit/Manaslu Circuit7.png", defaultColor: "#b1ba49", defaultName: "CK 05" },
    { src: "/layers/ManasluCircuit/Manaslu Circuit8.png", defaultColor: "#949f3e", defaultName: "CK 04" },
    { src: "/layers/ManasluCircuit/Manaslu Circuit9.png", defaultColor: "#6f862b", defaultName: "CL 04" },
    { src: "/layers/ManasluCircuit/Manaslu Circuit10.png", defaultColor: "#51562e", defaultName: "CP 04" },
    { src: "/layers/ManasluCircuit/Manaslu Circuit11.png", defaultColor: "#373133", defaultName: "AJ 01" },
  ],
  detailImages: [
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/manaslucircuit1.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/manaslucircuit2.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/manaslucircuit3.webp',
  ],
};

const ManasluCircuitNew: React.FC = () => (
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
    LayerComponent={ManasluCircuitLayer}
  />
);

export default ManasluCircuitNew;
