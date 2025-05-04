import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import flowbiteReact from "flowbite-react/plugin/vite";
import dotenv from 'dotenv';

dotenv.config();
console.log("API", process.env.VITE_API_BASE_URL);
export default defineConfig({
  server:{
    proxy: {
      '/api': {
        target: process.env.VITE_API_BASE_URL,
        changeOrigin: true,
        rewrite: (path) => {return path }
      }

    },
    historyApiFallback: true
  },
  plugins: [react(), flowbiteReact()],
})