import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace 'dsa-kids-game' with your actual GitHub repo name
export default defineConfig({
  plugins: [react()],
  base: '/DSA-KIDS-GAME/',
  server: {
    port: 3000,
    open: true,
  },
})
