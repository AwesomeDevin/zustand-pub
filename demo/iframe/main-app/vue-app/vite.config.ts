import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    open: true,
    host: 'localhost',
    proxy: {
      '/react': {
        target: 'http://127.0.0.1:5175',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/react/, ''),
      },
      '/static/js/bundle.js':{
        target: 'http://127.0.0.1:5175',
        changeOrigin: true,
      },
      '/static/media/logo.6ce24c58023cc2f8fd88fe9d219db6c6.svg':{
        target: 'http://127.0.0.1:5175',
        changeOrigin: true,
      }
    }
  }
})
