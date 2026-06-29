# freitas-ds

Plugin Tailwind CSS v4 oficial do Freitas DS. Registra tokens, aliases, estilos base e utilities semânticas.

## Instalação

```bash
pnpm add freitas-ds tailwindcss
```

No CSS principal:

```css
@import "tailwindcss";
@plugin "freitas-ds";
@import "freitas-ds/react.css";
```

Use classes semânticas como `bg-primary`, `text-on-surface`, `border-outline`, `rounded-fds-md` e `body-sm`.

Para tema dinâmico em React, instale também [`@freitas-ds/react`](https://www.npmjs.com/package/@freitas-ds/react) e use `FreitasProvider`.

Ao consumir `@freitas-ds/react`, importe também `freitas-ds/react.css`. Esse
arquivo é gerado no build do plugin a partir das classes usadas pelos
componentes React, porque o Tailwind CSS v4 não escaneia automaticamente
`node_modules/@freitas-ds/react/dist`. O plugin registra tokens, base e tema; o
CSS `react.css` entrega as utilities necessárias para os componentes.
