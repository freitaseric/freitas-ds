import { freitasCssVariables } from "./tokens"

export const freitasBase = {
  ":root": freitasCssVariables,
  '[data-fds-theme="dark"]': {
    "--fds-elevation-menu": "var(--fds-elevation-menu-dark)"
  },
  html: {
    height: "100%",
    fontFamily: "var(--fds-font-sans)",
    background: "var(--fds-color-surface)",
    color: "var(--fds-color-on-surface)",
    textRendering: "optimizeLegibility",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale"
  },
  body: {
    minHeight: "100%",
    margin: "0"
  },
  "#root": {
    minHeight: "100%"
  },
  "button, input, textarea, select": {
    font: "inherit"
  }
}

export const freitasUtilities = {
  ".h1, .fds-h1": {
    fontFamily: "var(--fds-font-sans)",
    fontSize: "var(--fds-type-h1-size)",
    lineHeight: "var(--fds-type-h1-line)",
    fontWeight: "var(--fds-type-h1-weight)",
    letterSpacing: "var(--fds-type-h1-tracking)"
  },
  ".h2, .fds-h2": {
    fontFamily: "var(--fds-font-sans)",
    fontSize: "var(--fds-type-h2-size)",
    lineHeight: "var(--fds-type-h2-line)",
    fontWeight: "var(--fds-type-h2-weight)",
    letterSpacing: "var(--fds-type-h2-tracking)"
  },
  ".h3, .fds-h3": {
    fontFamily: "var(--fds-font-sans)",
    fontSize: "var(--fds-type-h3-size)",
    lineHeight: "var(--fds-type-h3-line)",
    fontWeight: "var(--fds-type-h3-weight)",
    letterSpacing: "var(--fds-type-h3-tracking)"
  },
  ".body, .fds-body": {
    fontFamily: "var(--fds-font-sans)",
    fontSize: "var(--fds-type-body-size)",
    lineHeight: "var(--fds-type-body-line)",
    fontWeight: "var(--fds-type-body-weight)"
  },
  ".body-sm, .fds-body-sm": {
    fontFamily: "var(--fds-font-sans)",
    fontSize: "var(--fds-type-body-sm-size)",
    lineHeight: "var(--fds-type-body-sm-line)",
    fontWeight: "var(--fds-type-body-sm-weight)"
  },
  ".caption, .fds-caption": {
    fontFamily: "var(--fds-font-sans)",
    fontSize: "var(--fds-type-caption-size)",
    lineHeight: "var(--fds-type-caption-line)",
    fontWeight: "var(--fds-type-caption-weight)"
  },
  ".mono, .fds-mono": {
    fontFamily: "var(--fds-font-mono)"
  },
  ".text-muted.text-muted, .fds-text-muted": {
    color: "var(--fds-color-on-surface-variant)"
  }
}
