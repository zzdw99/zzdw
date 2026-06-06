import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Forward API calls to the Flask backend during development,
    // so the frontend can use same-origin "/api/..." paths.
    proxy: {
      '/api': 'http://127.0.0.1:5000',
    },
  },
})
