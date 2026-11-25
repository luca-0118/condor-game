import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import adminSqlApi from './scripts/adminSqlApi.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), adminSqlApi()],
})
