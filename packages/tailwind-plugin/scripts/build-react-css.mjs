import { mkdir, readFile, writeFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { compile, optimize } from "@tailwindcss/node"
import { globSync } from "tinyglobby"

const currentDir = dirname(fileURLToPath(import.meta.url))
const packageDir = resolve(currentDir, "..")
const workspaceDir = resolve(packageDir, "../..")
const reactComponentsDir = resolve(workspaceDir, "packages/react/src/components")
const outputFile = resolve(packageDir, "dist/react.css")

const stringLiteralPattern =
  /(?:"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'|`([^`\\]*(?:\\.[^`\\]*)*)`)/g

const files = globSync("**/*.{ts,tsx}", {
  cwd: reactComponentsDir,
  absolute: true,
  ignore: ["**/__tests__/**"]
})

const candidates = new Set()

for (const file of files) {
  const source = await readFile(file, "utf8")

  for (const match of source.matchAll(stringLiteralPattern)) {
    const value = match[1] ?? match[2] ?? match[3] ?? ""

    for (const token of value.split(/\s+/)) {
      const candidate = token.trim()

      if (!candidate || candidate.includes("${")) {
        continue
      }

      candidates.add(candidate)
    }
  }
}

const css = `
@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/utilities.css" layer(utilities);
@plugin "./dist/index.mjs";
`

const compiler = await compile(css, {
  base: packageDir,
  from: resolve(packageDir, "src/react.css"),
  onDependency() {}
})

const builtCss = compiler.build([...candidates])
const banner = `/*
 * Freitas DS React component utilities.
 * Generated from packages/react/src/components during the freitas-ds build.
 * Import with: @import "freitas-ds/react.css";
 */
`

await mkdir(dirname(outputFile), { recursive: true })
await writeFile(outputFile, banner + optimize(builtCss, { minify: true }).code)
