import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // Equivalente a publicPath en Webpack
  base: '/VueFlow-custom-nodes/',
  plugins: [vue()],
  server: {
    port: 3000,
    open: true
  }
})
