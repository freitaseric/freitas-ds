import { type RenderOptions, render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import type { ReactElement, ReactNode } from "react"

import { FreitasProvider } from "../provider/freitas-provider"

function Providers({ children }: { children: ReactNode }) {
  return (
    <FreitasProvider theme={{ seed: "#2563eb", mode: "light" }}>
      {children}
    </FreitasProvider>
  )
}

export function renderWithProvider(
  ui: ReactElement,
  options?: RenderOptions
): ReturnType<typeof render> {
  return render(ui, { wrapper: Providers, ...options })
}

export * from "@testing-library/react"
export { userEvent }
