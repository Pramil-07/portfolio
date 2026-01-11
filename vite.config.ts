import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        inlineDynamicImports: false,
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'react';
            if (id.includes('three') || id.includes('@react-three')) return 'three';
            if (id.includes('lottie')) return 'lottie';
            if (id.includes('gsap')) return 'gsap';
            return 'vendor';
          }
        },
      },
    },
  },
})
