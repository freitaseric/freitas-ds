export type FreitasThemeMode = "light" | "dark"

export type FreitasColorScheme = {
  primary: string
  onPrimary: string
  primaryContainer: string
  onPrimaryContainer: string

  secondary: string
  onSecondary: string
  secondaryContainer: string
  onSecondaryContainer: string

  tertiary: string
  onTertiary: string
  tertiaryContainer: string
  onTertiaryContainer: string

  surface: string
  onSurface: string
  surfaceVariant: string
  onSurfaceVariant: string
  surfaceContainer: string
  surfaceContainerHigh: string

  outline: string
  outlineVariant: string

  error: string
  onError: string
  errorContainer: string
  onErrorContainer: string

  success: string
  onSuccess: string
  successContainer: string
  onSuccessContainer: string

  warning: string
  onWarning: string
  warningContainer: string
  onWarningContainer: string

  info: string
  onInfo: string
  infoContainer: string
  onInfoContainer: string

  ring: string
}

export type FreitasRadiusScheme = {
  sm: string
  md: string
  lg: string
  xl: string
  full: string
}

export type FreitasTypographyScheme = {
  fontSans: string
  fontMono: string
}

export type FreitasTheme = {
  mode: FreitasThemeMode
  colors: FreitasColorScheme
  radius: FreitasRadiusScheme
  typography: FreitasTypographyScheme
}

export type FreitasManualThemeInput = {
  mode?: FreitasThemeMode
  colors?: Partial<FreitasColorScheme>
  radius?: Partial<FreitasRadiusScheme>
  typography?: Partial<FreitasTypographyScheme>
}

export type FreitasSeedThemeInput = FreitasManualThemeInput & {
  seed: string
}

export type FreitasThemeInput = FreitasManualThemeInput | FreitasSeedThemeInput
