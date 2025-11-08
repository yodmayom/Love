import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ ปรับให้เรียบง่าย ใช้งานได้แน่นอนบน Vercel
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || '/',
})
