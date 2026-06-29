# @freitas-ds/react

Biblioteca oficial de componentes React do Freitas DS, com componentes acessíveis, tokens semânticos e tema configurável.

## Instalação

```bash
pnpm add @freitas-ds/react freitas-ds react react-dom tailwindcss
```

No CSS principal:

```css
@import "tailwindcss";
@plugin "freitas-ds";
@import "freitas-ds/react.css";
```

O Tailwind CSS v4 não escaneia automaticamente arquivos compilados em
`node_modules`. O import `freitas-ds/react.css` entrega a camada oficial de
utilities usadas internamente pelos componentes React, incluindo tokens
semânticos, espaçamentos, raios e variantes `hover:*`, `focus-visible:*` e
`data-*`, sem exigir `@source` no app consumidor.

Na aplicação:

```tsx
import { Button, FreitasProvider } from "@freitas-ds/react"

export function App() {
  return (
    <FreitasProvider theme={{ seed: "#2563eb", mode: "light" }}>
      <Button>Começar</Button>
    </FreitasProvider>
  )
}
```

Consulte a [documentação completa](https://github.com/freitaseric/freitas-ds) para ver os componentes e padrões disponíveis.
