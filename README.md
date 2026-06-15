# Freitas DS

Design system plug-and-play para sistemas web modernos, administrativos e institucionais.

## Objetivo

O Freitas DS existe para oferecer uma base visual, técnica e comportamental consistente para produtos web desenvolvidos sob a identidade Freitas.

Ele reúne tema, tokens, estilos e componentes React para acelerar a criação de interfaces profissionais, acessíveis e flexíveis.

## Pacotes

- `@freitas-ds/theme`: motor de tema, tipos, geração por seed color, resolução de tema e aplicação de CSS variables.
- `@freitas-ds/styles`: CSS base, tokens, utilities semânticas, tipografia e estilos globais mínimos.
- `@freitas-ds/react`: componentes React oficiais do design system.

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
```

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
