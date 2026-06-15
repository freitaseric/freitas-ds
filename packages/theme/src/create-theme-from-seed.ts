import {
  argbFromHex,
  hexFromArgb,
  themeFromSourceColor
} from "@material/material-color-utilities"

import { defaultDarkTheme, defaultLightTheme } from "./default-theme"
import type { FreitasColorScheme, FreitasTheme, FreitasThemeMode } from "./types"

type CreateThemeFromSeedOptions = {
  mode?: FreitasThemeMode
  colors?: Partial<FreitasColorScheme>
}

function pickColor(raw: Record<string, unknown>, key: string, fallback: string): string {
  const value = raw[key]

  if (typeof value === "number") {
    return hexFromArgb(value)
  }

  return fallback
}

export function createThemeFromSeed(
  seed: string,
  options: CreateThemeFromSeedOptions = {}
): FreitasTheme {
  const mode = options.mode ?? "light"
  const fallbackTheme = mode === "dark" ? defaultDarkTheme : defaultLightTheme

  const materialTheme = themeFromSourceColor(argbFromHex(seed))
  const scheme =
    mode === "dark" ? materialTheme.schemes.dark : materialTheme.schemes.light

  const raw = scheme.toJSON() as Record<string, unknown>

  const colors: FreitasColorScheme = {
    primary: pickColor(raw, "primary", fallbackTheme.colors.primary),
    onPrimary: pickColor(raw, "onPrimary", fallbackTheme.colors.onPrimary),
    primaryContainer: pickColor(
      raw,
      "primaryContainer",
      fallbackTheme.colors.primaryContainer
    ),
    onPrimaryContainer: pickColor(
      raw,
      "onPrimaryContainer",
      fallbackTheme.colors.onPrimaryContainer
    ),

    secondary: pickColor(raw, "secondary", fallbackTheme.colors.secondary),
    onSecondary: pickColor(raw, "onSecondary", fallbackTheme.colors.onSecondary),
    secondaryContainer: pickColor(
      raw,
      "secondaryContainer",
      fallbackTheme.colors.secondaryContainer
    ),
    onSecondaryContainer: pickColor(
      raw,
      "onSecondaryContainer",
      fallbackTheme.colors.onSecondaryContainer
    ),

    tertiary: pickColor(raw, "tertiary", fallbackTheme.colors.tertiary),
    onTertiary: pickColor(raw, "onTertiary", fallbackTheme.colors.onTertiary),
    tertiaryContainer: pickColor(
      raw,
      "tertiaryContainer",
      fallbackTheme.colors.tertiaryContainer
    ),
    onTertiaryContainer: pickColor(
      raw,
      "onTertiaryContainer",
      fallbackTheme.colors.onTertiaryContainer
    ),

    surface: pickColor(raw, "surface", fallbackTheme.colors.surface),
    onSurface: pickColor(raw, "onSurface", fallbackTheme.colors.onSurface),
    surfaceVariant: pickColor(raw, "surfaceVariant", fallbackTheme.colors.surfaceVariant),
    onSurfaceVariant: pickColor(
      raw,
      "onSurfaceVariant",
      fallbackTheme.colors.onSurfaceVariant
    ),

    surfaceContainer: pickColor(
      raw,
      "surfaceContainer",
      pickColor(raw, "surfaceVariant", fallbackTheme.colors.surfaceContainer)
    ),
    surfaceContainerHigh: pickColor(
      raw,
      "surfaceContainerHigh",
      pickColor(raw, "surfaceVariant", fallbackTheme.colors.surfaceContainerHigh)
    ),

    outline: pickColor(raw, "outline", fallbackTheme.colors.outline),
    outlineVariant: pickColor(raw, "outlineVariant", fallbackTheme.colors.outlineVariant),

    error: pickColor(raw, "error", fallbackTheme.colors.error),
    onError: pickColor(raw, "onError", fallbackTheme.colors.onError),
    errorContainer: pickColor(raw, "errorContainer", fallbackTheme.colors.errorContainer),
    onErrorContainer: pickColor(
      raw,
      "onErrorContainer",
      fallbackTheme.colors.onErrorContainer
    ),

    success: fallbackTheme.colors.success,
    onSuccess: fallbackTheme.colors.onSuccess,
    successContainer: fallbackTheme.colors.successContainer,
    onSuccessContainer: fallbackTheme.colors.onSuccessContainer,

    warning: fallbackTheme.colors.warning,
    onWarning: fallbackTheme.colors.onWarning,
    warningContainer: fallbackTheme.colors.warningContainer,
    onWarningContainer: fallbackTheme.colors.onWarningContainer,

    info: fallbackTheme.colors.info,
    onInfo: fallbackTheme.colors.onInfo,
    infoContainer: fallbackTheme.colors.infoContainer,
    onInfoContainer: fallbackTheme.colors.onInfoContainer,

    ring: pickColor(raw, "primary", fallbackTheme.colors.ring)
  }

  return {
    mode,
    colors: {
      ...colors,
      ...options.colors
    },
    radius: fallbackTheme.radius,
    typography: fallbackTheme.typography
  }
}
