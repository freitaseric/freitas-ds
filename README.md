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
```

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

Em consumo via workspace, quando o Tailwind não escanear automaticamente as classes internas de `@freitas-ds/react`, adicione uma fonte explícita para o pacote React:

```css
@source "../node_modules/@freitas-ds/react";
```

No monorepo, os exemplos usam `@source "../../../packages/react/src"` porque consomem o pacote React direto do workspace.

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

`0.1.0` - versão inicial experimental.

## Status

O Freitas DS está em desenvolvimento inicial.
