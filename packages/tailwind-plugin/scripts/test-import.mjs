const plugin = await import("../dist/index.mjs")

if (!plugin.default) {
  throw new Error("Expected freitas-ds to export a default Tailwind plugin.")
}
