# Color Customizer Responsiveness Documentation

## Overview

This document explains the refactoring approach taken to make all product color customizers responsive across mobile, tablet, and desktop devices.

## The Problem

Previously, each product had its own customization file (e.g., `Chakati.tsx`, `Beehive.tsx`) with:
- **~1,600 lines of duplicated code** per product
- **No responsive design** - layouts were fixed-width and didn't adapt to smaller screens
- **69 separate files** to maintain for any UI changes

## The Solution: Universal ProductCustomizer Template

We chose **Option B: Centralized Template Approach** because:

| Benefit | Description |
|---------|-------------|
| **Single point of maintenance** | All responsiveness logic is in one file |
| **Future-proof** | Styling changes only need to be made once |
| **Code reduction** | From ~1,600 lines per product to ~40 lines |
| **Consistency** | All products share the same user experience |

## Architecture

### File Structure

```
src/components/products/Customize/
├── ProductCustomizer.tsx          # Universal responsive template (~495 lines)
├── colorData1000.ts               # Shared color data for 1000 series
├── [Product]Layer.tsx             # SVG/Canvas layer renderer (unchanged)
├── [Product].tsx                  # Original file (kept for reference)
└── [Product]New.tsx               # New minimal config file (~40 lines)
```

### How It Works

1. **ProductCustomizer.tsx** - Contains all the responsive UI logic:
   - Navbar and Footer integration
   - Color selection panels with pagination
   - Layer switching interface
   - PDF download functionality
   - Detail images display
   - Fully responsive layout

2. **[Product]New.tsx** - Minimal configuration file that:
   - Defines product name
   - Lists layer configurations (src, defaultColor, defaultName)
   - Specifies detail images
   - Passes the appropriate LayerComponent

## Example: Creating a New Product

### Step 1: Create the Layer Component

Create `NewProductLayer.tsx` if it doesn't exist. This handles the canvas/SVG rendering:

```tsx
// src/components/products/Customize/NewProductLayer.tsx
import { useEffect, useRef } from "react";

export default function NewProductLayer({ layers, imgref }) {
  const canvasRefs = useRef([]);
  const offscreenRefs = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    layers.forEach((layer, index) => {
      const offscreen = document.createElement("canvas");
      offscreenRefs.current[index] = offscreen;

      const img = new Image();
      img.src = layer.src;

      img.onload = () => {
        offscreen.width = img.width;
        offscreen.height = img.height;
        const ctx = offscreen.getContext("2d");
        ctx.drawImage(img, 0, 0);
        redraw();
      };
    });
  }, []);

  useEffect(() => {
    imgref.current = containerRef.current;
  }, []);

  const redraw = () => {
    const container = containerRef.current;
    if (!container) return;

    const cw = container.offsetWidth;
    const ch = container.offsetHeight;

    layers.forEach((layer, index) => {
      const canvas = canvasRefs.current[index];
      const offscreen = offscreenRefs.current[index];

      if (!canvas || !offscreen) return;

      const ctx = canvas.getContext("2d");
      canvas.width = cw;
      canvas.height = ch;
      ctx.drawImage(offscreen, 0, 0, cw, ch);

      if (layer.color) {
        ctx.globalCompositeOperation = "source-in";
        ctx.fillStyle = layer.color;
        ctx.fillRect(0, 0, cw, ch);
        ctx.globalCompositeOperation = "source-over";
      }
    });
  };

  useEffect(() => {
    redraw();
  }, [layers]);

  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%", height: "100%" }}>
      {layers.map((_, index) => (
        <canvas
          key={index}
          ref={(el) => (canvasRefs.current[index] = el)}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        />
      ))}
    </div>
  );
}
```

### Step 2: Add Layer Images

Place your layer PNG files in:
```
public/layers/NewProduct/
├── NewProduct1.png
├── NewProduct2.png
├── NewProduct3.png
└── ... (as many layers as needed)
```

### Step 3: Create the Product Configuration File

Create `NewProductNew.tsx`:

```tsx
// src/components/products/Customize/NewProductNew.tsx
import React from 'react';
import ProductCustomizer from './ProductCustomizer';
import NewProductLayer from './NewProductLayer';
import colorDataA from '../../../../color.json';
import colorDataB from '../../../../colorb.json';
import colorDataC from '../../../../colorC.json';
import colorDataD from '../../../../colorD.json';
import colorDataE from '../../../../colorE.json';
import { colorData1000 } from './colorData1000';

const config = {
  name: "New Product",
  layers: [
    { src: "/layers/NewProduct/NewProduct1.png", defaultColor: "#3c2f29", defaultName: "AF 01" },
    { src: "/layers/NewProduct/NewProduct2.png", defaultColor: "#886d62", defaultName: "AG 04" },
    { src: "/layers/NewProduct/NewProduct3.png", defaultColor: "#cac0a3", defaultName: "CO 11" },
    // Add more layers as needed...
  ],
  detailImages: [
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/newproduct1.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/newproduct2.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/newproduct3.webp',
  ],
};

const NewProductNew: React.FC = () => (
  <ProductCustomizer
    config={config}
    colorData1000={colorData1000}
    colorData1200A={colorDataA}
    colorData1200B={colorDataB}
    colorData1200C={colorDataC}
    colorData1200D={colorDataD}
    colorData1200E={colorDataE}
    LayerComponent={NewProductLayer}
  />
);

export default NewProductNew;
```

### Step 4: Add Route in App.tsx

```tsx
// src/App.tsx
import NewProduct from "./components/products/Customize/NewProductNew";

// In the Routes section:
<Route path="/products/newproduct" element={<NewProduct />} />
```

## Configuration Reference

### ProductConfig Type

```typescript
type ProductConfig = {
  name: string;           // Display name shown in the UI
  layers: LayerConfig[];  // Array of layer configurations
  detailImages?: string[]; // Optional product detail images (thumbnails)
  features?: string[];    // Optional feature list (not currently displayed)
};

type LayerConfig = {
  src: string;           // Path to the layer PNG (e.g., "/layers/Product/Product1.png")
  defaultColor: string;  // Default hex color (e.g., "#3c2f29")
  defaultName: string;   // Default color code name (e.g., "AF 01")
};
```

## Responsive Breakpoints

The ProductCustomizer uses Tailwind CSS responsive prefixes:

| Prefix | Min Width | Target Device |
|--------|-----------|---------------|
| (none) | 0px | Mobile phones |
| `sm:` | 640px | Large phones / Small tablets |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Laptops / Small desktops |
| `xl:` | 1280px | Desktops |

### Key Responsive Behaviors

- **Mobile (< 768px)**: Single column layout, smaller color swatches, simplified navigation
- **Tablet (768px - 1024px)**: Two-column layout, medium-sized elements
- **Desktop (> 1024px)**: Full three-column layout with all features visible

## Existing Product Examples

### Simple Product (2 layers) - `TrekNew.tsx`

```tsx
const config = {
  name: "Trek",
  layers: [
    { src: "/layers/Trek/Trek1.png", defaultColor: "#ba9e6b", defaultName: "DT 08" },
    { src: "/layers/Trek/Trek2.png", defaultColor: "#484d41", defaultName: "CS 01" },
  ],
  detailImages: [
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/trek1.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/trek2.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/trek3.webp',
  ],
};
```

### Complex Product (12 layers) - `MajestyNew.tsx`

```tsx
const config = {
  name: "Majesty",
  layers: [
    { src: "/layers/Majesty/Majesty1.png", defaultColor: "#d2c193", defaultName: "DH 11" },
    { src: "/layers/Majesty/Majesty2.png", defaultColor: "#8e7c53", defaultName: "DT 06" },
    { src: "/layers/Majesty/Majesty3.png", defaultColor: "#a88f51", defaultName: "DT 07" },
    { src: "/layers/Majesty/Majesty4.png", defaultColor: "#d9c3a2", defaultName: "AD 10" },
    { src: "/layers/Majesty/Majesty5.png", defaultColor: "#b1977a", defaultName: "AD 07" },
    { src: "/layers/Majesty/Majesty6.png", defaultColor: "#aa905c", defaultName: "DT 08" },
    { src: "/layers/Majesty/Majesty7.png", defaultColor: "#7c6539", defaultName: "DT 04" },
    { src: "/layers/Majesty/Majesty8.png", defaultColor: "#c9a371", defaultName: "DF 08" },
    { src: "/layers/Majesty/Majesty9.png", defaultColor: "#d9cab7", defaultName: "AD 11" },
    { src: "/layers/Majesty/Majesty10.png", defaultColor: "#c3a97d", defaultName: "DF 09" },
    { src: "/layers/Majesty/Majesty11.png", defaultColor: "#a79682", defaultName: "AA 11" },
    { src: "/layers/Majesty/Majesty12.png", defaultColor: "#e6d8cc", defaultName: "AD 12" },
  ],
  detailImages: [
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/majesty1.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/majesty2.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/majesty3.webp',
  ],
};
```

## Maintenance Notes

### To Change Responsiveness

Edit only `ProductCustomizer.tsx` - all products automatically inherit the changes.

### To Add New Color Charts

1. Add the color JSON file to the project root
2. Import it in the product's `*New.tsx` file
3. Pass it to `ProductCustomizer` as a new prop
4. Update `ProductCustomizer.tsx` to handle the new color data

### To Add New Features

1. Add the feature to `ProductConfig` type
2. Implement the feature in `ProductCustomizer.tsx`
3. Optionally add it to individual product configs

---
