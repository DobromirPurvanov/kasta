import path from "path"
import { fileURLToPath } from "url"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const __dirname = fileURLToPath(new URL(".", import.meta.url))

// https://vite.dev/config/
export default defineConfig(async ({ mode }) => ({
  base: '/',
  plugins: mode === 'development'
    ? [await import('kimi-plugin-inspect-react').then(m => m.inspectAttr()), react()]
    : [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}))
