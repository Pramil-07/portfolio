import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    build: {
        cssCodeSplit: true,
        assetsInlineLimit: 4096,
        rollupOptions: {
            output: {
                manualChunks: {
                    react: ['react', 'react-dom'],
                    animation: ['gsap', '@gsap/react', 'lottie-react'],
                    ui: ['lucide-react', 'react-hot-toast', 'react-countup'],
                },
            },
        },
    },
});
