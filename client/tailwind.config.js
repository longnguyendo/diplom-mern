const flowbiteReact = require("flowbite-react/plugin/tailwindcss");
const flowbite = require('flowbite/plugin');
const tailwindScrollbar = require('tailwind-scrollbar');
const lineClamp = require('@tailwindcss/line-clamp');

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
    tailwindScrollbar,
    lineClamp,
  ],
}