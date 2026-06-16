import * as ReactExports from "@freitas-ds/react"
import * as ThemeExports from "@freitas-ds/theme"
import { describe, expect, it } from "vitest"

describe("exports públicos", () => {
  it("expõe os principais componentes React pelo entrypoint do pacote", () => {
    expect(ReactExports.FreitasProvider).toBeDefined()
    expect(ReactExports.Button).toBeDefined()
    expect(ReactExports.Card).toBeDefined()
    expect(ReactExports.CardHeader).toBeDefined()
    expect(ReactExports.CardContent).toBeDefined()
    expect(ReactExports.Input).toBeDefined()
    expect(ReactExports.PageHeader).toBeDefined()
  })

  it("expõe o motor de tema pelo entrypoint do pacote theme", () => {
    expect(ThemeExports.resolveTheme).toBeTypeOf("function")
    expect(ThemeExports.applyTheme).toBeTypeOf("function")
    expect(ThemeExports.createThemeFromSeed).toBeTypeOf("function")
    expect(ThemeExports.defaultLightTheme).toBeDefined()
    expect(ThemeExports.defaultDarkTheme).toBeDefined()
  })
})
