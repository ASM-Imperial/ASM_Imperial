import React, { useState, useMemo, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { useNavigate } from "react-router-dom";


// ==================== TYPE DEFINITIONS ====================

type ColorItem = { name: string; r: number; g: number; b: number };

type LayerConfig = {
  src: string;
  defaultColor: string;
  defaultName: string;
};

type ProductConfig = {
  name: string;
  layers: LayerConfig[];
  detailImages?: string[];
  features?: string[];
};

type ProductCustomizerProps = {
  config: ProductConfig;
  colorData1000: ColorItem[];
  colorData1200A: ColorItem[];
  colorData1200B: ColorItem[];
  colorData1200C: ColorItem[];
  colorData1200D: ColorItem[];
  colorData1200E: ColorItem[];
  colorData700A: ColorItem[];
  colorData700B: ColorItem[];
  colorData700C: ColorItem[];
  colorData700D: ColorItem[];
  colorData700E: ColorItem[];

  LayerComponent: React.FC<{ layers: { src: string; color: string }[]; imgref: React.RefObject<HTMLDivElement> }>;
};

// ==================== UTILITY FUNCTIONS ====================

const hexToRgb = (hex: string) => {
  const clean = hex.replace('#', '');
  const bigint = parseInt(clean, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
};

const rgbToHex = (r: number, g: number, b: number) => {
  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
};

const relativeLuminance = (hex: string) => {
  const { r, g, b } = hexToRgb(hex);
  const srgb = [r, g, b].map((v) => v / 255).map((c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
};

const contrastRatio = (hex1: string, hex2: string) => {
  const L1 = relativeLuminance(hex1);
  const L2 = relativeLuminance(hex2);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
};

const split20 = <T,>(array: T[]): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += 20) {
    result.push(array.slice(i, i + 20));
  }
  return result;
};

// ==================== MAIN COMPONENT ====================

const ProductCustomizer: React.FC<ProductCustomizerProps> = ({
  config,
  colorData1000,
  colorData1200A,
  colorData1200B,
  colorData1200C,
  colorData1200D,
  colorData1200E,
  colorData700A,
  colorData700B,
  colorData700C,
  colorData700D,
  colorData700E,
  LayerComponent,
}) => {
  const { name, layers: layerConfigs, detailImages = [], features = [] } = config;

  // Initialize colors from layer configs
  const initialColors = useMemo(() => {
    const colors: { [key: number]: string } = {};
    layerConfigs.forEach((layer, index) => {
      colors[index + 1] = layer.defaultColor;
    });
    return colors;
  }, [layerConfigs]);

  const initialNames = useMemo(() => {
    return layerConfigs.map(layer => layer.defaultName);
  }, [layerConfigs]);

  const [colors, setColors] = useState<{ [key: number]: string }>(initialColors);
  const [layerNameList, setLayerNameList] = useState<string[]>(initialNames);
  const [activeLayer, setActiveLayer] = useState(1);

  // Color chart pagination
  const [currentPage1000, setCurrentPage1000] = useState(1);
  const [currentPage1200, setCurrentPage1200] = useState(1);
  const [currentPage700, setCurrentPage700] = useState(1);
  const [showChart1000, setShowChart1000] = useState(false);
  const [showChartId, setShowChartId] = useState(0); // 0=1200, 1=>1000, 2=>700
  const totalPages1000 = 5;
  const totalPages1200 = 5;
  const totalPages700 = 5;


  const imgRef = useRef<HTMLDivElement>(null);

  // Get current 1200 color data based on page
  const getCurrentColorData1200 = () => {
    switch (currentPage1200) {
      case 1: return colorData1200A;
      case 2: return colorData1200B;
      case 3: return colorData1200C;
      case 4: return colorData1200D;
      case 5: return colorData1200E;
      default: return colorData1200A;
    }
  };

  // Get current 700 color data based on page
  const getCurrentColorData700 = () => {
    switch (currentPage700) {
      case 1: return colorData700A;
      case 2: return colorData700B;
      case 3: return colorData700C;
      case 4: return colorData700D;
      case 5: return colorData700E;
      default: return colorData700A;
    }
  };

  // Layer data for the component
  const layers = useMemo(() => {
    return layerConfigs.map((layer, index) => ({
      src: layer.src,
      color: colors[index + 1],
    }));
  }, [layerConfigs, colors]);

  // Apply color to active layer
  const applyColor = (hex: string, colorName: string) => {
    const nextHex = hex.toUpperCase();
    setColors((prev) => ({ ...prev, [activeLayer]: nextHex }));
    setLayerNameList((prev) => {
      const newList = [...prev];
      newList[activeLayer - 1] = colorName;
      return newList;
    });
  };

  // Reset all colors
  const resetColors = () => {
    setColors(initialColors);
    setLayerNameList(initialNames);
  };

  // PDF Download
  const downloadPDF = async () => {
    if (!imgRef.current) return;

    const canvas = await html2canvas(imgRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const logoData = "/assets/images/navbar/MND_Logo.png";

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Header background
    pdf.setFillColor(240, 240, 240);
    pdf.rect(0, 0, pageWidth, 40, "F");

    // Logo + Title
    const logoWidth = 15;
    const logoHeight = 15;
    const title = "Modern Nature Design Nepal";
    pdf.setFontSize(24);
    pdf.setFont("helvetica", "bold");
    const titleWidth = pdf.getTextWidth(title);
    const totalWidth = logoWidth + 4 + titleWidth;
    const startX = (pageWidth - totalWidth) / 2;
    const centerY = 24;

    pdf.addImage(logoData, "PNG", startX, centerY - logoHeight + 5, logoWidth, logoHeight);
    pdf.text(title, startX + logoWidth + 4, centerY);

    // Design name
    pdf.setFontSize(16);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(0, 0, 0);
    const designWidth = pdf.getTextWidth(name);
    pdf.text(name, (pageWidth - designWidth) / 2, 50);

    // Subtitle
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "normal");
    const subtitle = "Custom Design Preview";
    const sWidth = pdf.getTextWidth(subtitle);
    pdf.text(subtitle, (pageWidth - sWidth) / 2, 60);

    // Image
    const imgWidth = 120;
    const imgHeight = 160;
    const imgX = (pageWidth - imgWidth) / 2;
    const imgY = 70;
    pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth, imgHeight);

    // Chosen Colors section
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);
    pdf.setTextColor(50, 50, 50);
    const sectionTitle = "Chosen Colors";
    const sectionW = pdf.getTextWidth(sectionTitle);
    const sectionY = imgY + imgHeight + 10;
    pdf.text(sectionTitle, (pageWidth - sectionW) / 2, sectionY);

    let yBase = sectionY + 10;
    const entries = Object.entries(colors);
    const count = entries.length;
    const boxW = 30;
    const gap = 10;
    const totalBoxWidth = count * boxW + (count - 1) * gap;
    let xStart = (pageWidth - totalBoxWidth) / 2;

    entries.forEach(([key, hex], idx) => {
      const { r, g, b } = hexToRgb(hex);
      const x = xStart + idx * (boxW + gap);
      pdf.setFillColor(r, g, b);
      pdf.rect(x, yBase, boxW, 15, "F");
      pdf.setFontSize(8);
      pdf.setTextColor(100, 100, 100);
      pdf.text(layerNameList[parseInt(key) - 1] || hex, x + boxW / 2, yBase + 20, { align: "center" });
    });

    // Footer
    pdf.setFontSize(10);
    pdf.setTextColor(150, 150, 150);
    pdf.text("© Modern Nature Design Nepal", pageWidth / 2, pageHeight - 12, { align: "center" });

    pdf.save(`${name}.pdf`);
  };

  // Default features if none provided
  const displayFeatures = features.length > 0 ? features : [
    'Hand-knotted by master artisans',
    'Premium yarn construction',
    'Fade-resistant colors',
    'Durable and long-lasting',
    'Easy to maintain',
    'Delivery Time: 2.5-3 months',
  ];

  const get_toggle_text_list = (current_id) => {
    let textlist = [
      { "id": 0, "text": "Show Chart 1200 (Wool)" },
      { "id": 1, "text": "Show Chart 1000 (Viscose)" },
      { "id": 2, "text": "Show Chart 700 (Viscose)" }
    ]
    let filtered_text_list = textlist.filter((obj) => obj.id != current_id);
    return filtered_text_list;
  }

 const navigate = useNavigate();

const captureRugPreview = async () => {
  if (!imgRef.current) return null;

  // Let UI paint first (prevents "freeze" feeling)
  await new Promise((r) => requestAnimationFrame(() => r(null)));

  const canvas = await html2canvas(imgRef.current, {
    scale: 1.25,              // ✅ faster than 2
    backgroundColor: null,
    useCORS: true,
    logging: false,
  });

  // Use toDataURL directly (fast enough after lowering scale)
  return canvas.toDataURL("image/png", 0.92);
};

const handleGoToAR = async () => {
  const rugImageUrl = await captureRugPreview();
  if (!rugImageUrl) return;

  const payload = {
    rugImageUrl,
    rugName: name,
  };

  localStorage.setItem("rugviz_payload", JSON.stringify(payload));

  // Let localStorage write + navigation happen smoothly
  await new Promise((r) => requestAnimationFrame(() => r(null)));

  navigate("/rug-visualizer", { state: payload });
};
  return (
    <>
      <Navbar />
      <div className="mt-12 sm:mt-16 bg-white flex flex-col items-center justify-start py-6 sm:py-8 md:py-10 px-3 sm:px-4 md:px-6">
        {/* Title */}
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-serif mt-2">{name}</h1>
        </div>

        {/* Main Content Grid */}
        <div className="flex flex-col md:flex-row w-full max-w-7xl gap-4 sm:gap-6">

          {/* Left Column - Preview & Features */}
          <div className="w-full md:w-1/2 lg:w-2/5 space-y-4">
            {/* Key Features */}
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
              <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3">Key Features</h2>
              <ul className="space-y-1.5 sm:space-y-2">
                {displayFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start text-xs sm:text-sm md:text-base">
                    <span className="text-green-600 mr-2 flex-shrink-0">✔</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-4 text-sm sm:text-base font-bold">
              Product Preview
            </p>
            <div
              className="border bg-gray-50 w-full overflow-hidden rounded-lg md:max-w-lg lg:max-w-full md:min-h-[580px] lg:min-h-[560px] xl:min-h-0"
              style={{ aspectRatio: '500/580' }}
            >
              <div className="w-full h-full" ref={imgRef}>
                <LayerComponent layers={layers} imgref={imgRef} />
              </div>
            </div>

            {/* Detail Images - Hidden on mobile, visible on iPad and larger */}
            {detailImages.length > 0 && (
              <div className="hidden md:flex flex-nowrap gap-2 lg:gap-2.5 justify-center overflow-x-auto">
                {detailImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    className="h-28 w-20 md:h-34 md:w-28 lg:h-36 lg:w-28 xl:h-52 xl:w-40 object-cover rounded-md flex-shrink-0"
                    alt={`${name} detail ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Color Selection */}
          <div className="w-full md:w-1/2 lg:w-3/5 flex flex-col gap-4 sm:gap-6">

            {/* Instructions */}
            <div className="bg-gray-100 p-3 sm:p-4 shadow-sm border rounded-lg">
              <h2 className="font-semibold text-sm sm:text-base mb-2">Changing Colors is Easy:</h2>
              <ol className="list-decimal ml-4 text-xs sm:text-sm text-gray-700 space-y-1">
                <li>Click the color window.</li>
                <li>Select the design area you want to recolor.</li>
                <li>Choose your preferred color from the color chart.</li>
                <li>Visit the next page for more color templates.</li>
              </ol>
            </div>

            {/* Layer Color Selectors */}
            <div className="mt-2 flex flex-wrap items-center gap-2 sm:gap-2 md:gap-2 lg:gap-4">
              {layerNameList.map((layerName, index) => (
                <div
                  key={index}
                  role="button"
                  aria-label={`Layer ${layerName} color panel`}
                  onClick={() => setActiveLayer(index + 1)}
                  onKeyDown={(e) => e.key === 'Enter' && setActiveLayer(index + 1)}
                  tabIndex={0}
                  className={`p-2 sm:p-2 md:p-2 lg:p-3 border rounded-md flex items-center gap-2 sm:gap-2 md:gap-2 lg:gap-3 cursor-pointer select-none transition-all
                    ${activeLayer === index + 1 ? 'ring-2 ring-gray-800 bg-gray-50' : 'hover:bg-gray-50'}`}
                >
                  <div
                    className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 border rounded"
                    style={{ backgroundColor: colors[index + 1] }}
                  />
                  <div className="text-xs sm:text-xs md:text-xs lg:text-sm">
                    <div className="font-medium">{layerName}</div>
                    {/* <div className="text-[10px] sm:text-xs text-gray-600 hidden sm:block">{colors[index + 1]}</div> */}
                  </div>
                </div>
              ))}

              {/* Reset Button */}
              <button
                onClick={resetColors}
                className="text-xs sm:text-xs md:text-xs lg:text-sm underline text-gray-600 hover:text-black ml-auto whitespace-nowrap"
              >
                ⟳ Reset colors
              </button>
            </div>

            {/* Color Charts */}
            <div className="bg-gray-100 p-2 sm:p-3 md:p-4 pt-4 sm:pt-5 md:pt-6 pb-4 sm:pb-5 md:pb-6 rounded-xl sm:rounded-2xl shadow-md w-full mt-4 sm:mt-6 md:mt-0">
              {showChartId == 0 ? (
                <>
                  {/* Chart 1200 */}
                  <h2 className="text-base sm:text-lg md:text-xl font-bold text-center mb-3 sm:mb-4 font-serif">
                    Color Chart ARS 1200 Wool Box
                  </h2>

                  {/* Color Grid */}
                  <div className="w-full overflow-x-auto flex justify-center">
                    <div className="flex flex-col gap-0.5 sm:gap-1">
                      {split20(getCurrentColorData1200()).reverse().map((group, i) => (
                        <div className="flex flex-row gap-0.5 sm:gap-1" key={i}>
                          {group.map((colorItem: ColorItem) => (
                            <div key={colorItem.name} className="flex flex-col items-center">
                              <div
                                className="w-[18px] h-[18px] sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-sm shadow-sm hover:shadow-md hover:scale-110 transition-all duration-200 cursor-pointer"
                                style={{ backgroundColor: `rgb(${colorItem.r}, ${colorItem.g}, ${colorItem.b})` }}
                                onClick={() => applyColor(rgbToHex(colorItem.r, colorItem.g, colorItem.b), colorItem.name)}
                                role="button"
                                tabIndex={0}
                                aria-label={`Set Layer ${activeLayer} to ${colorItem.name}`}
                              />
                              <div className="text-[6px] sm:text-[7px] md:text-[8px] text-center mt-0.5 text-gray-600 max-w-[18px] sm:max-w-5 md:max-w-6 overflow-hidden text-ellipsis whitespace-nowrap">
                                {colorItem.name}
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pagination */}
                  <div className="text-center mt-4">
                    <p className="text-xs sm:text-sm text-gray-600">
                      Page {currentPage1200} of {totalPages1200}
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-3 sm:mt-4">
                    <button
                      onClick={() => setCurrentPage1200(p => Math.max(1, p - 1))}
                      disabled={currentPage1200 === 1}
                      className="px-2 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 bg-white border-2 border-gray-800 text-gray-800 text-xs sm:text-sm font-medium rounded hover:bg-gray-800 hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 sm:gap-2"
                    >
                      <span>‹</span>
                      <span className="hidden sm:inline">PREVIOUS</span>
                      <span className="sm:hidden">PREV</span>
                    </button>
                    <button
                      onClick={() => setCurrentPage1200(p => Math.min(totalPages1200, p + 1))}
                      disabled={currentPage1200 === totalPages1200}
                      className="px-2 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 bg-white border-2 border-gray-800 text-gray-800 text-xs sm:text-sm font-medium rounded hover:bg-gray-800 hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 sm:gap-2"
                    >
                      <span className="hidden sm:inline">NEXT</span>
                      <span className="sm:hidden">NEXT</span>
                      <span>›</span>
                    </button>
                  </div>
                </>
              ) : showChartId == 1 ? (
                <>
                  {/* Chart 1000 */}
                  <h2 className="text-base sm:text-lg md:text-xl font-bold text-center mb-3 sm:mb-4 font-serif">
                    Color Chart ARS 1000 Viscose Box
                  </h2>

                  {/* Color Grid */}
                  <div className="w-full overflow-x-auto flex justify-center">
                    <div className="flex flex-col gap-0.5 sm:gap-1">
                      {split20(colorData1000.slice((currentPage1000 - 1) * 200, 200 * currentPage1000).reverse()).map((group, i) => (
                        <div className="flex flex-row gap-0.5 sm:gap-1" key={i}>
                          {group.reverse().map((colorItem: ColorItem) => (
                            <div key={colorItem.name} className="flex flex-col items-center">
                              <div
                                className="w-[18px] h-[18px] sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-sm shadow-sm hover:shadow-md hover:scale-110 transition-all duration-200 cursor-pointer"
                                style={{ backgroundColor: `rgb(${colorItem.r}, ${colorItem.g}, ${colorItem.b})` }}
                                onClick={() => applyColor(rgbToHex(colorItem.r, colorItem.g, colorItem.b), colorItem.name)}
                                role="button"
                                tabIndex={0}
                                aria-label={`Set Layer ${activeLayer} to ${colorItem.name}`}
                              />
                              <div className="text-[6px] sm:text-[7px] md:text-[8px] text-center mt-0.5 text-gray-600 max-w-[18px] sm:max-w-5 md:max-w-6 overflow-hidden text-ellipsis whitespace-nowrap">
                                {colorItem.name}
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pagination */}
                  <div className="text-center mt-4">
                    <p className="text-xs sm:text-sm text-gray-600">
                      Page {currentPage1000} of {totalPages1000}
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-3 sm:mt-4">
                    <button
                      onClick={() => setCurrentPage1000(p => Math.max(1, p - 1))}
                      disabled={currentPage1000 === 1}
                      className="px-2 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 bg-white border-2 border-gray-800 text-gray-800 text-xs sm:text-sm font-medium rounded hover:bg-gray-800 hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 sm:gap-2"
                    >
                      <span>‹</span>
                      <span className="hidden sm:inline">PREVIOUS</span>
                      <span className="sm:hidden">PREV</span>
                    </button>
                    <button
                      onClick={() => setCurrentPage1000(p => Math.min(totalPages1000, p + 1))}
                      disabled={currentPage1000 === totalPages1000}
                      className="px-2 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 bg-white border-2 border-gray-800 text-gray-800 text-xs sm:text-sm font-medium rounded hover:bg-gray-800 hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 sm:gap-2"
                    >
                      <span className="hidden sm:inline">NEXT</span>
                      <span className="sm:hidden">NEXT</span>
                      <span>›</span>
                    </button>
                  </div>
                </>
              ) :
                <>
                  {/* Chart 700 */}
                  <h2 className="text-base sm:text-lg md:text-xl font-bold text-center mb-3 sm:mb-4 font-serif">
                    Color Chart ARS 700 Viscose Box
                  </h2>

                  {/* Color Grid */}
                  <div className="w-full overflow-x-auto flex justify-center">
                    <div className="flex flex-col gap-0.5 sm:gap-1">
                      {split20(getCurrentColorData700()).reverse().map((group, i) => (
                        <div className="flex flex-row gap-0.5 sm:gap-1" key={i}>
                          {group.map((colorItem: ColorItem) => (
                            <div key={colorItem.name} className="flex flex-col items-center">
                              <div
                                className="w-[18px] h-[18px] sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-sm shadow-sm hover:shadow-md hover:scale-110 transition-all duration-200 cursor-pointer"
                                style={{ backgroundColor: `rgb(${colorItem.r}, ${colorItem.g}, ${colorItem.b})` }}
                                onClick={() => applyColor(rgbToHex(colorItem.r, colorItem.g, colorItem.b), colorItem.name)}
                                role="button"
                                tabIndex={0}
                                aria-label={`Set Layer ${activeLayer} to ${colorItem.name}`}
                              />
                              <div className="text-[6px] sm:text-[7px] md:text-[8px] text-center mt-0.5 text-gray-600 max-w-[18px] sm:max-w-5 md:max-w-6 overflow-hidden text-ellipsis whitespace-nowrap">
                                {colorItem.name}
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pagination */}
                  <div className="text-center mt-4">
                    <p className="text-xs sm:text-sm text-gray-600">
                      Page {currentPage700} of {totalPages700}
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-3 sm:mt-4">
                    <button
                      onClick={() => setCurrentPage700(p => Math.max(1, p - 1))}
                      disabled={currentPage700 === 1}
                      className="px-2 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 bg-white border-2 border-gray-800 text-gray-800 text-xs sm:text-sm font-medium rounded hover:bg-gray-800 hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 sm:gap-2"
                    >
                      <span>‹</span>
                      <span className="hidden sm:inline">PREVIOUS</span>
                      <span className="sm:hidden">PREV</span>
                    </button>
                    <button
                      onClick={() => setCurrentPage700(p => Math.min(totalPages700, p + 1))}
                      disabled={currentPage700 === totalPages700}
                      className="px-2 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 bg-white border-2 border-gray-800 text-gray-800 text-xs sm:text-sm font-medium rounded hover:bg-gray-800 hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 sm:gap-2"
                    >
                      <span className="hidden sm:inline">NEXT</span>
                      <span className="sm:hidden">NEXT</span>
                      <span>›</span>
                    </button>
                  </div>
                </>

              }

              {/* Toggle Chart Button */}
              {/* <button
                onClick={() => setShowChartId((currentID)=>(currentID+1) %3)} // Toggle between 0,1,2
                className="border border-gray-400 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md mx-auto block text-center text-xs sm:text-sm hover:bg-gray-200 transition mt-4"
              >
                {showChartId != 0? 'Show Chart 1200(Wool)':showChartId==1?'Show Chart 700(TBH)':'Show Chart 1200(Wool)'}
              </button> */}

              {/* <button
                onClick={() => setShowChartId((currentID)=>(currentID+1) %3)} // Toggle between 0,1,2
                className="border border-gray-400 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md mx-auto block text-center text-xs sm:text-sm hover:bg-gray-200 transition mt-4"
              >
                {showChartId == 0? 'Show Chart 1000(Viscose)':showChartId==1?'Show Chart 700(TBH)':'Show Chart 1200(Wool)'}
              </button> */}

              {/* Chart toggle buttons */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-4">
                {get_toggle_text_list(showChartId).map((toggle_text_list) => {
                  return (
                    <button
                      key={toggle_text_list.id}
                      onClick={() => setShowChartId(toggle_text_list.id)}
                      className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white/90 px-3 sm:px-4 py-1 text-[11px] sm:text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-800 hover:text-white hover:border-gray-800 transition-colors"
                    >
                      {toggle_text_list.text}
                    </button>
                  );
                })}
              </div>




            </div>

            {/* Primary Actions */}
            <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mt-2">
              <button
                onClick={downloadPDF}
                className="inline-flex items-center justify-center gap-1 rounded-full bg-black px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium text-white shadow-md hover:bg-gray-800 active:scale-[0.98] transition"
              >
                <span className="text-base sm:text-lg">🖨</span>
                <span>Save as PDF</span>
              </button>

              <button
                onClick={handleGoToAR}
                className="inline-flex items-center justify-center gap-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium text-white shadow-md hover:from-emerald-600 hover:to-teal-700 active:scale-[0.98] transition"
              >
                <span>Try in your space</span>
              </button>

              
              {/* <button
                onClick={downloadPDF}
                className="mx-auto bg-black text-white px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg hover:bg-gray-800 transition-colors"
              >
                🖨 Send your creation
              </button> */}

            </div>

            {/* Disclaimer */}
            <p className="text-[10px] sm:text-xs text-gray-500 text-center sm:text-left">
              Images are color simulations for visualization purposes only. Actual yarns or poms must be used for accurate color selection.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductCustomizer;

