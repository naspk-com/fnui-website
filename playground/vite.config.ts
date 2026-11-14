import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

const base = process.env.FNUI_BASE || '/'
export default defineConfig({
  root: resolve('playground'),
  base: `${base.replace(/\/?$/, '/')}playground/`,
  plugins: [vue()],
  resolve: {
    dedupe: ['vue'],
  },
  server: { host: '127.0.0.1', port: 5174, strictPort: true, fs: { allow: [resolve('.')] } },
  build: {
    outDir: resolve('playground/dist'),
    rollupOptions: { input: { desktop: resolve('playground/desktop.html'), mobile: resolve('playground/mobile.html') } },
  },
})
