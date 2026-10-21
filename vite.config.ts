import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const productsProxy = {
  '^/api/products$': {
    target: 'https://app.econverse.com.br',
    changeOrigin: true,
    rewrite: () => '/teste-front-end/junior/tecnologia/lista-produtos/produtos.json',
  },
}

export default defineConfig({
  base: '/teste-front-end/',
  plugins: [react()],
  server: { proxy: productsProxy },
})
