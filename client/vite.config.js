import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import flowbiteReact from "flowbite-react/plugin/vite";


// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy: {
      '/api': {
        target: 'https://diplom-mern-blog.onrender.com',
        secure: false,
      }
    }
  },
  plugins: [react(), flowbiteReact()],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})