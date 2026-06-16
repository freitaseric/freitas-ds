import { fileURLToPath } from "node:url"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vitest/config"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@freitas-ds/react": fileURLToPath(new URL("./src/index.ts", import.meta.url)),
      "@freitas-ds/theme": fileURLToPath(
        new URL("../theme/src/index.ts", import.meta.url)
      )
    }
  },
  ssr: {
    noExternal: ["@material/material-color-utilities"]
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    globals: true,
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      reportsDirectory: "./coverage"
    }
  }
})
