import path from "node:path"
import { fileURLToPath } from "node:url"
import type { StorybookConfig } from "@storybook/react-vite"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"

const dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(dirname, "../../..")

const config: StorybookConfig = {
  stories: ["../src/stories/**/*.stories.@(ts|tsx|mdx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  docs: {
    autodocs: "tag"
  },
  viteFinal: async (config) => {
    config.plugins = [...(config.plugins ?? []), react(), tailwindcss()]
    config.resolve = {
      ...config.resolve,
      alias: {
        ...(config.resolve?.alias ?? {}),
        "@freitas-ds/react": path.resolve(root, "packages/react/src/index.ts"),
        "@freitas-ds/theme": path.resolve(root, "packages/theme/src/index.ts")
      }
    }
    config.server = {
      ...config.server,
      fs: {
        ...config.server?.fs,
        allow: [...(config.server?.fs?.allow ?? []), root]
      }
    }

    return config
  }
}

export default config
