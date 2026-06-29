# Freitas DS

Design system plug-and-play para sistemas web modernos, administrativos e institucionais.

## Objetivo

O Freitas DS existe para oferecer uma base visual, técnica e comportamental consistente para produtos web desenvolvidos sob a identidade Freitas.

Ele reúne tema, tokens, estilos e componentes React para acelerar a criação de interfaces profissionais, acessíveis e flexíveis.

## Pacotes

- `@freitas-ds/theme`: motor de tema, tipos, geração por seed color, resolução de tema e aplicação de CSS variables.
- `freitas-ds`: plugin Tailwind oficial com tokens, aliases, base styles e utilities semânticas.
- `@freitas-ds/styles`: CSS base legado para compatibilidade com consumidores existentes.
- `@freitas-ds/react`: componentes React oficiais do design system.

## Instalação CSS Recomendada

No CSS principal da aplicação:

```css
@import "tailwindcss";
@plugin "freitas-ds";
@import "freitas-ds/react.css";
```

O Tailwind CSS v4 não escaneia automaticamente pacotes compilados dentro de
`node_modules`. Por isso, `freitas-ds/react.css` entrega uma camada oficial de
utilities dos componentes React, gerada a partir de `@freitas-ds/react`, para
que classes como `bg-primary`, `text-on-primary`, `rounded-fds-md`, `h-10`,
variantes `hover:*`, `focus-visible:*` e `data-*` entrem no CSS final do app
consumidor sem `@source`.

No React, envolva a aplicação com o provider:

```tsx
import { FreitasProvider } from "@freitas-ds/react";

<FreitasProvider theme={{ seed: "#2563eb", mode: "light" }}>
      <App />
</FreitasProvider>;
```

O plugin Tailwind registra tokens, aliases, base styles e classes semânticas. O `FreitasProvider` continua necessário para tema dinâmico em runtime, como seed color e modo claro/escuro.

## Exemplo Mínimo

```tsx
import { Button, Card, CardContent, CardFooter, CardHeader, FreitasProvider } from "@freitas-ds/react";

export function App() {
      return (
            <FreitasProvider theme={{ seed: "#2563eb", mode: "light" }}>
                  <main className="min-h-screen bg-surface p-6 text-on-surface">
                        <Card>
                              <CardHeader>
                                    <h1 className="h2">Freitas DS</h1>
                              </CardHeader>
                              <CardContent>
                                    <p className="body">Interface consistente usando tokens semânticos.</p>
                              </CardContent>
                              <CardFooter>
                                    <Button>Começar</Button>
                              </CardFooter>
                        </Card>
                  </main>
            </FreitasProvider>
      );
}
```

## Documentação

- [Manifesto](docs/manifesto.md)
- [Arquitetura](docs/arquitetura.md)
- [Tokens](docs/tokens.md)
- [Componentes](docs/componentes.md)
- [Regras](docs/regras.md)

## Comandos

```bash
pnpm install
pnpm dev
pnpm dev:consumer
pnpm build:consumer
pnpm pack:all
```

## Consumo Em Outro App

Use o plugin Tailwind no CSS principal e consuma os componentes pelo pacote React.

```css
@import "tailwindcss";
@plugin "freitas-ds";
@import "freitas-ds/react.css";
```

```tsx
import { Button, FreitasProvider } from "@freitas-ds/react";

export function App() {
      return (
            <FreitasProvider theme={{ seed: "#2563eb", mode: "light" }}>
                  <Button>Começar</Button>
            </FreitasProvider>
      );
}
```

Para apps publicados ou externos, `@import "freitas-ds/react.css";` é o caminho recomendado. Ele evita que o app precise escanear `node_modules/@freitas-ds/react/dist`.

Em desenvolvimento dentro do monorepo, se você optar por não importar `freitas-ds/react.css`, a alternativa de diagnóstico é apontar a fonte explícita para o código fonte local:

```css
@source "../../../packages/react/src";
```

O `FreitasProvider` apenas aplica o tema em runtime e não gera utilities CSS.

O import `@freitas-ds/styles/index.css` continua disponível como caminho legado/compatibilidade, mas novos apps Tailwind v4 devem preferir `@plugin "freitas-ds"`.

O exemplo `examples/consumer-vite` simula um app externo mínimo:

```bash
pnpm dev:consumer
pnpm build:consumer
```

Para validar o conteúdo que seria publicado sem publicar nada:

```bash
pnpm pack:all
```

## Publicação

Os quatro pacotes públicos usam o registro oficial do npm e já configuram acesso público, inclusive os pacotes com escopo `@freitas-ds`.

Antes da primeira publicação, autentique-se e confirme que sua conta possui permissão para publicar no escopo `@freitas-ds`:

```bash
pnpm login
pnpm whoami
```

Com a branch `main` limpa e sincronizada com o remoto, publique todos os pacotes com um único comando:

```bash
pnpm publish:packages
```

O comando executa lint, typecheck, testes, builds, validação do consumidor e inspeção dos tarballs antes de publicar. Para apenas simular a etapa final do pnpm:

```bash
pnpm -r --filter './packages/*' publish --dry-run --no-git-checks
```

O comando nativo `pnpm publish` sem `-r` atua apenas no pacote da raiz; por isso a publicação do monorepo usa o script `publish:packages`.

## Formulários Avançados

O pacote React inclui uma camada oficial para TanStack Form + Zod. Use `Form`, `FormFieldController`, `FormControl` e `FormMessage` em formulários administrativos com validação real. Para campos simples sem schema, `FormField` continua disponível.

Campos obrigatórios devem declarar `required` no `FormField` ou `FormLabel`; o Freitas DS mostra o asterisco com token de erro e texto acessível automaticamente.

## Qualidade

O workspace usa Biome para lint, formatação e organização de imports. O pacote React usa Vitest, Testing Library, jest-dom e jsdom para testes de componentes.

```bash
pnpm check
pnpm lint
pnpm format
pnpm typecheck
pnpm test
pnpm test:coverage
pnpm quality
pnpm quality:full
```

## Storybook

Para abrir a documentação visual dos componentes:

```bash
pnpm storybook
```

Para gerar o build estático:

```bash
pnpm build:storybook
```

## Versão Atual

`0.2.0` - CSS oficial dos componentes React para consumo Tailwind v4 sem `@source`.

## Status

O Freitas DS está em desenvolvimento inicial.
