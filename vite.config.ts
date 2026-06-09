import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
// import { traeBadgePlugin } from 'vite-plugin-trae-solo-badge';

// https://vite.dev/config/
export default defineConfig({
  build: {
    sourcemap: 'hidden',
    // Optimize chunk splitting for better caching and smaller initial load
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React vendor chunk
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // UI libraries
          'vendor-ui': ['framer-motion', 'lucide-react', 'react-icons'],
          // Heavy utilities - loaded only when needed
          'vendor-pdf': ['html2canvas', 'jspdf'],
          'vendor-charts': ['recharts'],
          // Carousel libraries
          'vendor-carousel': ['react-slick', 'slick-carousel'],
          // Color data - shared across all product pages
          'color-data': [
            './color.json',
            './colorb.json',
            './colorC.json',
            './colorD.json',
            './colorE.json',
          ],
        },
      },
    },
    // Increase chunk size warning limit (optional)
    chunkSizeWarningLimit: 600,
  },
  plugins: [
    react(),
    // traeBadgePlugin({
    //   variant: 'dark',
    //   position: 'bottom-right',
    //   prodOnly: true,
    //   clickable: true,
    //   clickUrl: 'https://www.trae.ai/solo?showJoin=1',
    //   autoTheme: true,
    //   autoThemeTarget: '#root'
    // }), 
    tsconfigPaths()
  ],
  // Optimize dev server
  server: {
    // Pre-bundle dependencies for faster dev startup
    warmup: {
      clientFiles: [
        './src/App.tsx',
        './src/pages/Home.tsx',
        './src/components/ui/Navbar.tsx',
      ],
    },
  },
  // Optimize dependency pre-bundling
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'lucide-react',
      'react-icons/fa',
      'react-icons/bi',
    ],
  },
})
