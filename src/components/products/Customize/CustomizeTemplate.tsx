import React, { useEffect, useMemo, useState } from 'react';

type ColorItem = { name: string; r: number; g: number; b: number };

type CustomizeTemplateProps = {
  title: string;
  svgPath: string; // e.g. "/assets/images/products/bamboos.svg"
  localStoragePrefix: string; // e.g. "bamboos"
  defaultFg?: string; // default '#211A1F'
  defaultBg?: string; // default '#DFDBD7'
  colorData1000: ColorItem[];
  colorData1200: ColorItem[];
  breadcrumb?: string; // e.g. "Home > Color Customizer > Aquarela"
};

// Helpers
const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  const normalized = hex.replace('#', '');
  const expanded = normalized.length === 3 ? normalized.split('').map((c) => c + c).join('') : normalized;
  const bigint = parseInt(expanded, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
};

const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
};

const relativeLuminance = (hex: string): number => {
  const { r, g, b } = hexToRgb(hex);
  const srgb = [r, g, b].map((v) => v / 255).map((c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
};

const contrastRatio = (hex1: string, hex2: string): number => {
  const L1 = relativeLuminance(hex1);
  const L2 = relativeLuminance(hex2);
  const light = Math.max(L1, L2);
  const dark = Math.min(L1, L2);
  return (light + 0.05) / (dark + 0.05);
};

// Allow CSS custom properties in React style prop
type CSSVarStyle = React.CSSProperties & {
  '--fg-color'?: string;
  '--bg-color'?: string;
};

// SVG transformation utility
const transformSvg = (svg: string): string => {
  let s = svg;

  // Ensure we have an <svg> tag
  const hasSvgTag = /<svg[\s\S]*?>/i.test(s);
  if (!hasSvgTag) throw new Error('Invalid SVG: missing <svg> tag');

  // Replace fills in style classes .st0 and .st1 to use CSS vars
  // Also add smooth transition on fill changes
  s = s
    .replace(/(\.st0\s*\{[^}]*?fill\s*:\s*)(#[0-9a-fA-F]{3,6})([^}]*\})/m, '$1var(--bg-color)$3')
    .replace(/(\.st1\s*\{[^}]*?fill\s*:\s*)(#[0-9a-fA-F]{3,6})([^}]*\})/m, '$1var(--fg-color)$3')
    .replace(/\.st0\s*\{([^}]*)\}/m, (_m, inner) => `.st0{${inner} transition: fill 200ms ease-in-out;}`)
    .replace(/\.st1\s*\{([^}]*)\}/m, (_m, inner) => `.st1{${inner} transition: fill 200ms ease-in-out;}`);

  const hasSt0 = /\.st0\s*\{[\s\S]*?\}/.test(s);
  const hasSt1 = /\.st1\s*\{[\s\S]*?\}/.test(s);

  // Fallback: inject override style block if classes not found
  if (!hasSt0 || !hasSt1) {
    s = s.replace(/<svg([^>]*)>/i, (m, attrs) => {
      const style = `<style>\n.st0{fill: var(--bg-color) !important;}\n.st1{fill: var(--fg-color) !important;}\n</style>`;
      return `<svg${attrs}>\n${style}`;
    });
  }

  return s;
};

const CustomizeTemplate: React.FC<CustomizeTemplateProps> = ({
  title,
  svgPath,
  localStoragePrefix,
  defaultFg = '#211A1F',
  defaultBg = '#DFDBD7',
  colorData1000,
  colorData1200,
  breadcrumb = 'Home > Color Customizer > Aquarela',
}) => {
  const [foregroundColor, setForegroundColor] = useState<string>(() => {
    return (localStorage.getItem(`${localStoragePrefix}_fg`) || defaultFg).toUpperCase();
  });
  const [backgroundColor, setBackgroundColor] = useState<string>(() => {
    return (localStorage.getItem(`${localStoragePrefix}_bg`) || defaultBg).toUpperCase();
  });

  const [activeTarget, setActiveTarget] = useState<'foreground' | 'background'>('foreground');

  useEffect(() => {
    localStorage.setItem(`${localStoragePrefix}_fg`, foregroundColor);
    localStorage.setItem(`${localStoragePrefix}_bg`, backgroundColor);
  }, [foregroundColor, backgroundColor, localStoragePrefix]);

  const applyColor = (hex: string) => {
    const value = hex.toUpperCase();
    if (activeTarget === 'foreground') setForegroundColor(value);
    else setBackgroundColor(value);
  };

  const resetColors = () => {
    setForegroundColor(defaultFg.toUpperCase());
    setBackgroundColor(defaultBg.toUpperCase());
  };

  const currentContrast = useMemo(() => contrastRatio(foregroundColor, backgroundColor), [foregroundColor, backgroundColor]);

  // Inline SVG loading and transformation
  const [svgMarkup, setSvgMarkup] = useState<string>('');
  const [loadingSvg, setLoadingSvg] = useState<boolean>(false);
  const [svgError, setSvgError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const loadSvg = async () => {
      setLoadingSvg(true);
      setSvgError(null);
      try {
        const res = await fetch(svgPath);
        if (!res.ok) throw new Error(`Failed to fetch SVG (${res.status})`);
        const svg = await res.text();
        const transformed = transformSvg(svg);
        if (!cancelled) setSvgMarkup(transformed);
      } catch (e) {
        console.error('Failed to load/transform SVG', e);
        if (!cancelled) {
          setSvgMarkup('');
          setSvgError('Unable to load design preview. Showing image fallback.');
        }
      } finally {
        if (!cancelled) setLoadingSvg(false);
      }
    };
    loadSvg();
    return () => { cancelled = true; };
  }, [svgPath]);

  // Pagination
  const [currentPage1000, setCurrentPage1000] = useState<number>(1);
  const totalPages1000 = Math.ceil(colorData1000.length / 200) || 1;
  const [currentPage1200, setCurrentPage1200] = useState<number>(1);
  const totalPages1200 = Math.ceil(colorData1200.length / 200) || 1;

  // Clamp pages if totals change
  useEffect(() => {
    setCurrentPage1200((p) => Math.min(totalPages1200, Math.max(1, p)));
  }, [totalPages1200]);
  useEffect(() => {
    setCurrentPage1000((p) => Math.min(totalPages1000, Math.max(1, p)));
  }, [totalPages1000]);

  const split20 = <T,>(array: T[]): T[][] => {
    const result: T[][] = [];
    for (let i = 0; i < array.length; i += 20) {
      result.push(array.slice(i, i + 20));
    }
    return result;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start py-10">
      <div className="text-center mb-6">
        <p className="text-sm text-gray-500">{breadcrumb}</p>
        <h1 className="text-3xl font-serif mt-2">{title}</h1>
      </div>

      <div className="flex w-full max-w-7xl gap-6">
        <div className="w-5/12 relative">
          {/* Loading / Error States */}
          {loadingSvg && (
            <div className="w-full h-[400px] bg-gray-100 animate-pulse rounded-md" aria-live="polite" aria-busy="true" />
          )}

          {!loadingSvg && svgMarkup ? (
            <div
              className="w-full h-full [&>svg]:block [&>svg]:w-full [&>svg]:h-auto"
              style={{ '--fg-color': foregroundColor, '--bg-color': backgroundColor } as CSSVarStyle}
              dangerouslySetInnerHTML={{ __html: svgMarkup }}
              aria-describedby={`${localStoragePrefix}-description`}
              role="img"
            />
          ) : null}

          {!loadingSvg && !svgMarkup && (
            <img
              src={svgPath}
              alt={`${title} Rug`}
              className="block w-full h-auto"
              role="img"
              aria-describedby={`${localStoragePrefix}-description`}
            />
          )}

          {svgError && (
            <p className="mt-2 text-xs text-red-600" role="alert">{svgError}</p>
          )}

          <div id={`${localStoragePrefix}-description`} className="sr-only">
            Interactive color customization tool for the {title} rug design. Use the foreground and background pickers to update colors. Contrast ratio {currentContrast.toFixed(2)}.
          </div>
        </div>

        <div className="w-1/2 flex flex-col gap-6">
          {/* Active color panels */}
          <div className="flex items-center gap-4">
            <div
              role="button"
              aria-label="Foreground color panel"
              onClick={() => setActiveTarget('foreground')}
              onKeyDown={(e) => e.key === 'Enter' && setActiveTarget('foreground')}
              tabIndex={0}
              className={`p-3 border rounded-md flex items-center gap-3 cursor-pointer select-none ${activeTarget === 'foreground' ? 'ring-2 ring-gray-800' : ''}`}
            >
              <div className="w-10 h-10 border" style={{ backgroundColor: foregroundColor }} />
              <div className="text-sm">
                <div className="font-medium">Foreground</div>
                <div className="text-xs text-gray-600">{foregroundColor} · RGB {hexToRgb(foregroundColor).r}, {hexToRgb(foregroundColor).g}, {hexToRgb(foregroundColor).b}</div>
              </div>
            </div>
            <div
              role="button"
              aria-label="Background color panel"
              onClick={() => setActiveTarget('background')}
              onKeyDown={(e) => e.key === 'Enter' && setActiveTarget('background')}
              tabIndex={0}
              className={`p-3 border rounded-md flex items-center gap-3 cursor-pointer select-none ${activeTarget === 'background' ? 'ring-2 ring-gray-800' : ''}`}
            >
              <div className="w-10 h-10 border" style={{ backgroundColor: backgroundColor }} />
              <div className="text-sm">
                <div className="font-medium">Background</div>
                <div className="text-xs text-gray-600">{backgroundColor} · RGB {hexToRgb(backgroundColor).r}, {hexToRgb(backgroundColor).g}, {hexToRgb(backgroundColor).b}</div>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button onClick={resetColors} className="text-sm underline text-gray-600 hover:text-black">⟳ Reset to original colors</button>
            </div>
          </div>

          {/* Color Chart 1200 */}
          <div className="p-6 bg-gray-100 rounded-2xl shadow-md w-full mx-auto">
            <h2 className="text-xl font-bold text-center mb-4 font-serif">Color Chart 1200</h2>
            <div className="flex flex-row justify-center flex-wrap gap-2">
              {split20(colorData1200.slice((currentPage1200 - 1) * 200, 200 * currentPage1200)).map((group: ColorItem[], i: number) => (
                <div className="flex flex-row gap-3" key={`g1200-${i}`}>
                  {group.map((colorItem) => (
                    <div key={colorItem.name}>
                      <div
                        className="w-[18px] h-[18px] rounded-sm shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                        style={{ backgroundColor: `rgb(${colorItem.r}, ${colorItem.g}, ${colorItem.b})` }}
                        role="button"
                        tabIndex={0}
                        aria-label={`Set ${activeTarget} to ${colorItem.name}`}
                        onClick={() => applyColor(rgbToHex(colorItem.r, colorItem.g, colorItem.b))}
                        onKeyDown={(e) => { if (e.key === 'Enter') applyColor(rgbToHex(colorItem.r, colorItem.g, colorItem.b)); }}
                      />
                      <div className="text-[6.7px] font-normal text-center mt-1 text-gray-600">{colorItem.name}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="text-center">
              <p className="text-gray-600 pt-6">Page {currentPage1200} of {totalPages1200}</p>
            </div>
            <div className="flex gap-4 pt-4 justify-center">
              <button
                className="px-4 py-2 border rounded hover:bg-gray-800 hover:text-white transition-colors"
                onClick={() => setCurrentPage1200((p) => Math.max(1, p - 1))}
                aria-label="Previous page 1200"
              >Previous</button>
              <button
                className="px-4 py-2 border rounded hover:bg-gray-800 hover:text-white transition-colors"
                onClick={() => setCurrentPage1200((p) => Math.min(totalPages1200, p + 1))}
                aria-label="Next page 1200"
              >Next</button>
            </div>
          </div>

          {/* Color Chart 1000 */}
          <div className="bg-gray-100 p-8 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold text-center mb-4 font-serif">Color Chart 1000</h2>
            <div className="flex flex-row justify-center flex-wrap gap-2">
              {split20(colorData1000.slice((currentPage1000 - 1) * 200, 200 * currentPage1000)).map((group: ColorItem[], i: number) => (
                <div className="flex flex-row gap-3" key={`g1000-${i}`}>
                  {group.map((colorItem) => (
                    <div key={colorItem.name}>
                      <div
                        className="w-[18px] h-[18px] rounded-sm shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                        style={{ backgroundColor: `rgb(${colorItem.r}, ${colorItem.g}, ${colorItem.b})` }}
                        role="button"
                        tabIndex={0}
                        aria-label={`Set ${activeTarget} to ${colorItem.name}`}
                        onClick={() => applyColor(rgbToHex(colorItem.r, colorItem.g, colorItem.b))}
                        onKeyDown={(e) => { if (e.key === 'Enter') applyColor(rgbToHex(colorItem.r, colorItem.g, colorItem.b)); }}
                      />
                      <div className="text-[7px] text-center mt-1 text-gray-600">{colorItem.name}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="text-center">
              <p className="text-gray-600 pt-6">Page {currentPage1000} of {totalPages1000}</p>
            </div>
            <div className="flex gap-4 pt-4 justify-center">
              <button
                className="px-4 py-2 border rounded hover:bg-gray-800 hover:text-white transition-colors"
                onClick={() => setCurrentPage1000((p) => Math.max(1, p - 1))}
                aria-label="Previous page 1000"
              >Previous</button>
              <button
                className="px-4 py-2 border rounded hover:bg-gray-800 hover:text-white transition-colors"
                onClick={() => setCurrentPage1000((p) => Math.min(totalPages1000, p + 1))}
                aria-label="Next page 1000"
              >Next</button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <button className="px-4 py-2 border rounded hover:bg-gray-800 hover:text-white transition-colors" aria-label="Save as PDF">Save PDF</button>
            <div className="text-xs text-gray-500">Colors are approximate and may vary based on screen and lighting conditions.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeTemplate;