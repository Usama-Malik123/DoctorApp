import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  // Add these new configurations
  base: process.env.NODE_ENV === 'production' ? '/' : '/',
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // Your FastAPI backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: '../Backend/static', // Or 'dist' if you prefer
    emptyOutDir: true,
    sourcemap: process.env.NODE_ENV !== 'production'
  }
})
