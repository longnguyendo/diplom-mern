const flowbiteReact = require("flowbite-react/plugin/tailwindcss");
// const tailwindScrollbar = require('tailwind-scrollbar');
const flowbite = require('flowbite/plugin');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js, jsx, ts, tsx}",
    "./node_modules/flowbite/**/*.{js,jsx,ts,tsx}",
    ".flowbite-react/class-list.json"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbiteReact,
    flowbite,
    // tailwindScrollbar
  ],
}