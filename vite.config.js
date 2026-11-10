import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Configuração do Vite com o plugin do React e do Tailwind
export default defineConfig({
  plugins: [react(), tailwindcss()],
})