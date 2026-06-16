import { fileURLToPath } from "node:url"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@freitas-ds/react": fileURLToPath(
        new URL("../../packages/react/src/index.ts", import.meta.url)
      ),
      "@freitas-ds/theme": fileURLToPath(
        new URL("../../packages/theme/src/index.ts", import.meta.url)
      )
    }
  }
})
