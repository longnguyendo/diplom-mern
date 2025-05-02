import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import flowbiteReact from "flowbite-react/plugin/vite";
import dotenv from 'dotenv';

dotenv.config();


// https://vite.dev/config/
// console.log(process.env.VITE_API_BASE_URL);
// console.log(process.env);
export default defineConfig({
  server:{
    proxy: {
      '/api': {
        target: process.env.VITE_API_BASE_URL,
        changeOrigin: true,
        rewrite: (path) => { console.log(path); return path }
      }
    }
  },
  plugins: [react(), flowbiteReact()],
})