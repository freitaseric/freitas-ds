import { createThemeFromSeed } from "./create-theme-from-seed"
import { defaultDarkTheme, defaultLightTheme } from "./default-theme"
import type { FreitasTheme, FreitasThemeInput } from "./types"

export function resolveTheme(input?: FreitasThemeInput): FreitasTheme {
  if (!input) {
    return defaultLightTheme
  }

  const mode = input.mode ?? "light"

  if ("seed" in input && input.seed) {
    const seededTheme = createThemeFromSeed(input.seed, {
      mode,
      colors: input.colors
    })

    return {
      ...seededTheme,
      radius: {
        ...seededTheme.radius,
        ...input.radius
      },
      typography: {
        ...seededTheme.typography,
        ...input.typography
      }
    }
  }

  const fallbackTheme = mode === "dark" ? defaultDarkTheme : defaultLightTheme

  return {
    mode,
    colors: {
      ...fallbackTheme.colors,
      ...input.colors
    },
    radius: {
      ...fallbackTheme.radius,
      ...input.radius
    },
    typography: {
      ...fallbackTheme.typography,
      ...input.typography
    }
  }
}
