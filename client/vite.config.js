import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import flowbiteReact from "flowbite-react/plugin/vite";

export default defineConfig({
  server:{
    proxy: {
      '/api': {
        target: 'https://diplom-mern-blog.onrender.com',
        changeOrigin: true,
        rewrite: (path) => { console.log(path); return path }
      }
    }
  },
  plugins: [react(), flowbiteReact()],
})