# @freitas-ds/theme

Motor de temas do Freitas DS. Gera, resolve e aplica tokens semânticos por seed color ou configuração manual, sem depender de React.

## Instalação

```bash
pnpm add @freitas-ds/theme
```

## Uso

```ts
import { applyTheme, createThemeFromSeed } from "@freitas-ds/theme"

const theme = createThemeFromSeed("#2563eb", { mode: "light" })
applyTheme(theme)
```

Consulte a [documentação completa](https://github.com/freitaseric/freitas-ds) para conhecer temas manuais, tipos e tokens disponíveis.
