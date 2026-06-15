import type { FreitasTheme } from "./types"

export const defaultLightTheme: FreitasTheme = {
  mode: "light",
  colors: {
    primary: "#2563eb",
    onPrimary: "#ffffff",
    primaryContainer: "#dbeafe",
    onPrimaryContainer: "#172554",

    secondary: "#475569",
    onSecondary: "#ffffff",
    secondaryContainer: "#e2e8f0",
    onSecondaryContainer: "#0f172a",

    tertiary: "#7c3aed",
    onTertiary: "#ffffff",
    tertiaryContainer: "#ede9fe",
    onTertiaryContainer: "#2e1065",

    surface: "#ffffff",
    onSurface: "#0f172a",
    surfaceVariant: "#f1f5f9",
    onSurfaceVariant: "#475569",
    surfaceContainer: "#f8fafc",
    surfaceContainerHigh: "#f1f5f9",

    outline: "#94a3b8",
    outlineVariant: "#cbd5e1",

    error: "#b91c1c",
    onError: "#ffffff",
    errorContainer: "#fee2e2",
    onErrorContainer: "#450a0a",

    success: "#15803d",
    onSuccess: "#ffffff",
    successContainer: "#dcfce7",
    onSuccessContainer: "#052e16",

    warning: "#b45309",
    onWarning: "#ffffff",
    warningContainer: "#fef3c7",
    onWarningContainer: "#451a03",

    info: "#0369a1",
    onInfo: "#ffffff",
    infoContainer: "#e0f2fe",
    onInfoContainer: "#082f49",

    ring: "#2563eb"
  },
  radius: {
    sm: "0.375rem",
    md: "0.625rem",
    lg: "0.875rem",
    xl: "1.25rem",
    full: "999px"
  },
  typography: {
    fontSans: "Inter, ui-sans-serif, system-ui, sans-serif",
    fontMono: "JetBrains Mono, ui-monospace, SFMono-Regular, monospace"
  }
}

export const defaultDarkTheme: FreitasTheme = {
  ...defaultLightTheme,
  mode: "dark",
  colors: {
    primary: "#93c5fd",
    onPrimary: "#172554",
    primaryContainer: "#1e3a8a",
    onPrimaryContainer: "#dbeafe",

    secondary: "#cbd5e1",
    onSecondary: "#0f172a",
    secondaryContainer: "#334155",
    onSecondaryContainer: "#f8fafc",

    tertiary: "#c4b5fd",
    onTertiary: "#2e1065",
    tertiaryContainer: "#5b21b6",
    onTertiaryContainer: "#ede9fe",

    surface: "#020617",
    onSurface: "#f8fafc",
    surfaceVariant: "#1e293b",
    onSurfaceVariant: "#cbd5e1",
    surfaceContainer: "#0f172a",
    surfaceContainerHigh: "#1e293b",

    outline: "#64748b",
    outlineVariant: "#334155",

    error: "#fca5a5",
    onError: "#450a0a",
    errorContainer: "#7f1d1d",
    onErrorContainer: "#fee2e2",

    success: "#86efac",
    onSuccess: "#052e16",
    successContainer: "#14532d",
    onSuccessContainer: "#dcfce7",

    warning: "#fcd34d",
    onWarning: "#451a03",
    warningContainer: "#78350f",
    onWarningContainer: "#fef3c7",

    info: "#7dd3fc",
    onInfo: "#082f49",
    infoContainer: "#075985",
    onInfoContainer: "#e0f2fe",

    ring: "#93c5fd"
  }
}
