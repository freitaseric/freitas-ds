import { applyTheme, type FreitasThemeInput, resolveTheme } from "@freitas-ds/theme"
import * as React from "react"

export type FreitasProviderProps = {
  theme?: FreitasThemeInput
  children: React.ReactNode
}

export function FreitasProvider({ theme, children }: FreitasProviderProps) {
  const resolvedTheme = React.useMemo(() => {
    return resolveTheme(theme)
  }, [theme])

  React.useEffect(() => {
    applyTheme(resolvedTheme)
  }, [resolvedTheme])

  return <>{children}</>
}
