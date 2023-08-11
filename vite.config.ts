import vue from '@vitejs/plugin-vue'

import {fileURLToPath, URL} from 'node:url'
import {defineConfig, loadEnv} from 'vite'
import {VitePWA} from 'vite-plugin-pwa'

const mode = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'
const viteEnv = {...loadEnv(mode, process.cwd(), 'VITE_')}

export default defineConfig({
    base: viteEnv.VITE_BASE,
    plugins: [
        vue(),
        VitePWA({
            injectRegister: 'auto',
            registerType: 'autoUpdate',
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg}']
            },
            includeAssets: ['favicon.ico', 'favicon.png',],
            manifest: {
                name: viteEnv.VITE_APP_NAME,
                short_name: viteEnv.VITE_APP_NAME,
                description: viteEnv.VITE_APP_NAME,
                theme_color: '#ffffff',
                icons: [
                    {
                        src: 'favicon.png',
                        sizes: '32x32',
                        type: 'image/png'
                    },
                ]
            }
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
})
