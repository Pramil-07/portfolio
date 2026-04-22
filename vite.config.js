import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const proxyTarget = env.VITE_DEV_API_TARGET || 'http://localhost:3000';
    return {
        plugins: [react(), tailwindcss()],
        server: {
            proxy: {
                '/api': {
                    target: proxyTarget,
                    changeOrigin: true,
                },
            },
        },
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
    };
});
