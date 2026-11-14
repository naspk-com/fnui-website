import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/postcss'

const root = fileURLToPath(new URL('./', import.meta.url))

export default defineConfig({
  base: `${(process.env.FNUI_BASE || '/').replace(/\/?$/, '/')}`,
  plugins: [vue()],
  resolve: {
    dedupe: ['vue'],
  },
  css: { postcss: { plugins: [tailwindcss()] } },
  server: { host: '127.0.0.1', port: 5173, strictPort: true, fs: { allow: [root] } },
  preview: { host: '127.0.0.1', port: 4173, strictPort: true },
  build: {
    outDir: fileURLToPath(new URL('./dist', import.meta.url)),
    emptyOutDir: true,
    // Each preview iframe needs its own platform's TDesign and theme styles.
    cssCodeSplit: true,
    rollupOptions: {
      input: {
        index: fileURLToPath(new URL('./index.html', import.meta.url)),
        desktop: fileURLToPath(new URL('./preview-desktop.html', import.meta.url)),
        mobile: fileURLToPath(new URL('./preview-mobile.html', import.meta.url)),
      },
    },
  },
})
