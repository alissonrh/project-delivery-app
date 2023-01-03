/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'verde-escuro': '#036b52',
        'verde-claro': '#2fc08b',
        'azul-escuro': '#421981',
        'azul-claro': '#0567ed',
      },
    },
  },
  plugins: [],
};
