import { FreitasProvider } from "@freitas-ds/react"
import type { Preview } from "@storybook/react-vite"

import "../src/styles.css"

const preview: Preview = {
  globalTypes: {
    mode: {
      name: "Tema",
      description: "Modo de cor do Freitas DS",
      defaultValue: "light",
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "light", title: "Claro" },
          { value: "dark", title: "Escuro" }
        ],
        dynamicTitle: true
      }
    },
    seed: {
      name: "Seed",
      description: "Cor base usada para gerar o tema",
      defaultValue: "#2563eb",
      toolbar: {
        icon: "paintbrush",
        items: [
          { value: "#2563eb", title: "Blue" },
          { value: "#15803d", title: "Green" },
          { value: "#7c3aed", title: "Purple" },
          { value: "#dc2626", title: "Red" },
          { value: "#334155", title: "Slate" }
        ],
        dynamicTitle: true
      }
    }
  },
  decorators: [
    (Story, context) => {
      const mode = context.globals.mode === "dark" ? "dark" : "light"
      const seed =
        typeof context.globals.seed === "string" ? context.globals.seed : "#2563eb"

      return (
        <FreitasProvider theme={{ seed, mode }}>
          <div className="min-h-screen bg-surface p-6 text-on-surface">
            <Story />
          </div>
        </FreitasProvider>
      )
    }
  ],
  parameters: {
    layout: "centered",
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    docs: {
      toc: true
    },
    a11y: {
      test: "todo"
    }
  }
}

export default preview
