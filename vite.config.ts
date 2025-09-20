import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    // Only load VITE_-prefixed vars to avoid accidentally pulling other env
    const env = loadEnv(mode, process.cwd(), 'VITE_')
    return {
        plugins: [react()],
        server: {
            proxy: {
                '/api': {
                    target: env.VITE_DEV_PROXY_TARGET || 'http://localhost:8000',
                    changeOrigin: true,
                },
            },
        },
        build: { sourcemap: true },
    }
})
