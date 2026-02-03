import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'build', // Changes the output folder from 'dist' to 'build'
  },
  server: {
    // port:5173,
    // host: '0.0.0.0',
    allowedHosts: [
      'unretreating-hang-pockily.ngrok-free.dev'
    ]
  },
  base:"/" // required for vercel
})
