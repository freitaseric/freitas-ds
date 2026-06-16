export const freitasTheme = {
  colors: {
    primary: "var(--fds-color-primary)",
    "on-primary": "var(--fds-color-on-primary)",
    "primary-container": "var(--fds-color-primary-container)",
    "on-primary-container": "var(--fds-color-on-primary-container)",

    secondary: "var(--fds-color-secondary)",
    "on-secondary": "var(--fds-color-on-secondary)",
    "secondary-container": "var(--fds-color-secondary-container)",
    "on-secondary-container": "var(--fds-color-on-secondary-container)",

    tertiary: "var(--fds-color-tertiary)",
    "on-tertiary": "var(--fds-color-on-tertiary)",
    "tertiary-container": "var(--fds-color-tertiary-container)",
    "on-tertiary-container": "var(--fds-color-on-tertiary-container)",

    surface: "var(--fds-color-surface)",
    "on-surface": "var(--fds-color-on-surface)",
    "surface-variant": "var(--fds-color-surface-variant)",
    "on-surface-variant": "var(--fds-color-on-surface-variant)",
    "surface-container": "var(--fds-color-surface-container)",
    "surface-container-high": "var(--fds-color-surface-container-high)",

    outline: "var(--fds-color-outline)",
    "outline-variant": "var(--fds-color-outline-variant)",

    error: "var(--fds-color-error)",
    "on-error": "var(--fds-color-on-error)",
    "error-container": "var(--fds-color-error-container)",
    "on-error-container": "var(--fds-color-on-error-container)",

    success: "var(--fds-color-success)",
    "on-success": "var(--fds-color-on-success)",
    "success-container": "var(--fds-color-success-container)",
    "on-success-container": "var(--fds-color-on-success-container)",

    warning: "var(--fds-color-warning)",
    "on-warning": "var(--fds-color-on-warning)",
    "warning-container": "var(--fds-color-warning-container)",
    "on-warning-container": "var(--fds-color-on-warning-container)",

    info: "var(--fds-color-info)",
    "on-info": "var(--fds-color-on-info)",
    "info-container": "var(--fds-color-info-container)",
    "on-info-container": "var(--fds-color-on-info-container)",

    ring: "var(--fds-color-ring)",
    background: "var(--fds-color-surface)",
    foreground: "var(--fds-color-on-surface)",
    card: "var(--fds-color-surface-container)",
    "card-foreground": "var(--fds-color-on-surface)",
    popover: "var(--fds-color-surface)",
    "popover-foreground": "var(--fds-color-on-surface)",
    muted: "var(--fds-color-surface-container)",
    "muted-foreground": "var(--fds-color-on-surface-variant)",
    accent: "var(--fds-color-surface-container-high)",
    "accent-foreground": "var(--fds-color-on-surface)",
    border: "var(--fds-color-outline-variant)",
    input: "var(--fds-color-outline)",
    destructive: "var(--fds-color-error)",
    "destructive-foreground": "var(--fds-color-on-error)"
  },
  borderRadius: {
    "fds-sm": "var(--fds-radius-sm)",
    "fds-md": "var(--fds-radius-md)",
    "fds-lg": "var(--fds-radius-lg)",
    "fds-xl": "var(--fds-radius-xl)",
    "fds-full": "var(--fds-radius-full)"
  },
  fontFamily: {
    sans: "var(--fds-font-sans)",
    mono: "var(--fds-font-mono)"
  }
}

export const freitasCssVariables = {
  "--fds-color-primary": "#2563eb",
  "--fds-color-on-primary": "#ffffff",
  "--fds-color-primary-container": "#dbeafe",
  "--fds-color-on-primary-container": "#172554",

  "--fds-color-secondary": "#475569",
  "--fds-color-on-secondary": "#ffffff",
  "--fds-color-secondary-container": "#e2e8f0",
  "--fds-color-on-secondary-container": "#0f172a",

  "--fds-color-tertiary": "#7c3aed",
  "--fds-color-on-tertiary": "#ffffff",
  "--fds-color-tertiary-container": "#ede9fe",
  "--fds-color-on-tertiary-container": "#2e1065",

  "--fds-color-surface": "#ffffff",
  "--fds-color-on-surface": "#0f172a",
  "--fds-color-surface-variant": "#f1f5f9",
  "--fds-color-on-surface-variant": "#475569",
  "--fds-color-surface-container": "#f8fafc",
  "--fds-color-surface-container-high": "#f1f5f9",

  "--fds-color-outline": "#94a3b8",
  "--fds-color-outline-variant": "#cbd5e1",

  "--fds-color-error": "#b91c1c",
  "--fds-color-on-error": "#ffffff",
  "--fds-color-error-container": "#fee2e2",
  "--fds-color-on-error-container": "#450a0a",

  "--fds-color-success": "#15803d",
  "--fds-color-on-success": "#ffffff",
  "--fds-color-success-container": "#dcfce7",
  "--fds-color-on-success-container": "#052e16",

  "--fds-color-warning": "#b45309",
  "--fds-color-on-warning": "#ffffff",
  "--fds-color-warning-container": "#fef3c7",
  "--fds-color-on-warning-container": "#451a03",

  "--fds-color-info": "#0369a1",
  "--fds-color-on-info": "#ffffff",
  "--fds-color-info-container": "#e0f2fe",
  "--fds-color-on-info-container": "#082f49",

  "--fds-color-ring": "#2563eb",

  "--fds-radius-sm": "0.375rem",
  "--fds-radius-md": "0.625rem",
  "--fds-radius-lg": "0.875rem",
  "--fds-radius-xl": "1.25rem",
  "--fds-radius-full": "999px",

  "--fds-elevation-menu":
    "0 18px 45px -28px rgb(15 23 42 / 0.45), 0 8px 20px -18px rgb(15 23 42 / 0.35)",
  "--fds-elevation-menu-dark":
    "0 18px 45px -28px rgb(0 0 0 / 0.75), 0 8px 20px -18px rgb(0 0 0 / 0.55)",

  "--fds-font-sans": "Inter, ui-sans-serif, system-ui, sans-serif",
  "--fds-font-mono": '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace',

  "--fds-type-h1-size": "clamp(2.25rem, 4vw, 3.25rem)",
  "--fds-type-h1-line": "1.05",
  "--fds-type-h1-weight": "750",
  "--fds-type-h1-tracking": "-0.04em",

  "--fds-type-h2-size": "clamp(1.875rem, 3vw, 2.5rem)",
  "--fds-type-h2-line": "1.1",
  "--fds-type-h2-weight": "700",
  "--fds-type-h2-tracking": "-0.035em",

  "--fds-type-h3-size": "1.5rem",
  "--fds-type-h3-line": "1.2",
  "--fds-type-h3-weight": "650",
  "--fds-type-h3-tracking": "-0.025em",

  "--fds-type-body-size": "1rem",
  "--fds-type-body-line": "1.6",
  "--fds-type-body-weight": "400",

  "--fds-type-body-sm-size": "0.875rem",
  "--fds-type-body-sm-line": "1.5",
  "--fds-type-body-sm-weight": "400",

  "--fds-type-caption-size": "0.75rem",
  "--fds-type-caption-line": "1.4",
  "--fds-type-caption-weight": "400"
}
