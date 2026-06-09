/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        'mint-green': '#CDE6DC',
        'off-white': '#FAF7F2',
        'warm-beige': '#E9DFD3',
        'charcoal': '#1F1F1F'
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'serif': ['Playfair Display', 'Georgia', 'serif']
      },
      maxWidth: {
        'container': '1280px'
      },
      spacing: {
        'gutter': '24px'
      },
      gridTemplateColumns: {
        'sm': 'repeat(2, 1fr)',
        'md': 'repeat(6, 1fr)',
        'lg': 'repeat(12, 1fr)'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries')
  ],
};
