import type { FreitasTheme } from "./types"

export function themeToCssVariables(theme: FreitasTheme): Record<string, string> {
  return {
    "--fds-color-primary": theme.colors.primary,
    "--fds-color-on-primary": theme.colors.onPrimary,
    "--fds-color-primary-container": theme.colors.primaryContainer,
    "--fds-color-on-primary-container": theme.colors.onPrimaryContainer,

    "--fds-color-secondary": theme.colors.secondary,
    "--fds-color-on-secondary": theme.colors.onSecondary,
    "--fds-color-secondary-container": theme.colors.secondaryContainer,
    "--fds-color-on-secondary-container": theme.colors.onSecondaryContainer,

    "--fds-color-tertiary": theme.colors.tertiary,
    "--fds-color-on-tertiary": theme.colors.onTertiary,
    "--fds-color-tertiary-container": theme.colors.tertiaryContainer,
    "--fds-color-on-tertiary-container": theme.colors.onTertiaryContainer,

    "--fds-color-surface": theme.colors.surface,
    "--fds-color-on-surface": theme.colors.onSurface,
    "--fds-color-surface-variant": theme.colors.surfaceVariant,
    "--fds-color-on-surface-variant": theme.colors.onSurfaceVariant,
    "--fds-color-surface-container": theme.colors.surfaceContainer,
    "--fds-color-surface-container-high": theme.colors.surfaceContainerHigh,

    "--fds-color-outline": theme.colors.outline,
    "--fds-color-outline-variant": theme.colors.outlineVariant,

    "--fds-color-error": theme.colors.error,
    "--fds-color-on-error": theme.colors.onError,
    "--fds-color-error-container": theme.colors.errorContainer,
    "--fds-color-on-error-container": theme.colors.onErrorContainer,

    "--fds-color-success": theme.colors.success,
    "--fds-color-on-success": theme.colors.onSuccess,
    "--fds-color-success-container": theme.colors.successContainer,
    "--fds-color-on-success-container": theme.colors.onSuccessContainer,

    "--fds-color-warning": theme.colors.warning,
    "--fds-color-on-warning": theme.colors.onWarning,
    "--fds-color-warning-container": theme.colors.warningContainer,
    "--fds-color-on-warning-container": theme.colors.onWarningContainer,

    "--fds-color-info": theme.colors.info,
    "--fds-color-on-info": theme.colors.onInfo,
    "--fds-color-info-container": theme.colors.infoContainer,
    "--fds-color-on-info-container": theme.colors.onInfoContainer,

    "--fds-color-ring": theme.colors.ring,

    "--fds-radius-sm": theme.radius.sm,
    "--fds-radius-md": theme.radius.md,
    "--fds-radius-lg": theme.radius.lg,
    "--fds-radius-xl": theme.radius.xl,
    "--fds-radius-full": theme.radius.full,

    "--fds-font-sans": theme.typography.fontSans,
    "--fds-font-mono": theme.typography.fontMono
  }
}

export function applyTheme(theme: FreitasTheme, element?: HTMLElement): void {
  if (typeof document === "undefined") {
    return
  }

  const target = element ?? document.documentElement
  const variables = themeToCssVariables(theme)

  for (const [name, value] of Object.entries(variables)) {
    target.style.setProperty(name, value)
  }

  target.dataset.fdsTheme = theme.mode
  target.style.colorScheme = theme.mode
}
