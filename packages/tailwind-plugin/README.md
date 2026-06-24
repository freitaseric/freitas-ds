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
```

Use classes semânticas como `bg-primary`, `text-on-surface`, `border-outline`, `rounded-fds-md` e `body-sm`.

Para tema dinâmico em React, instale também [`@freitas-ds/react`](https://www.npmjs.com/package/@freitas-ds/react) e use `FreitasProvider`.
