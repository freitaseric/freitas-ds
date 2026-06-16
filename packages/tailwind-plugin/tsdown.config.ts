import { defineConfig } from "tsdown"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  outDir: "dist",
  outputOptions: (options, format) => {
    if (format === "cjs") {
      options.exports = "named"
    }
  }
})
