# Tokens Do Freitas DS

Tokens são valores fundamentais usados para construir a interface. Eles representam cor, tipografia, raio, superfície, contraste e outros papéis visuais.

O Freitas DS usa **tokens semânticos**, não valores visuais soltos. Isso significa que componentes e telas devem falar em papéis como `primary`, `surface`, `error` e `outline`, em vez de depender diretamente de cores fixas como `#2563eb`.

## Primary

Usado para ações principais, destaques e elementos de maior prioridade.

- `--fds-color-primary`
- `--fds-color-on-primary`
- `--fds-color-primary-container`
- `--fds-color-on-primary-container`

## Secondary

Usado para ações secundárias, elementos de apoio e áreas de menor prioridade que ainda precisam de presença visual.

- `--fds-color-secondary`
- `--fds-color-on-secondary`
- `--fds-color-secondary-container`
- `--fds-color-on-secondary-container`

## Tertiary

Usado para variações complementares, destaques alternativos e elementos de apoio à identidade visual.

- `--fds-color-tertiary`
- `--fds-color-on-tertiary`
- `--fds-color-tertiary-container`
- `--fds-color-on-tertiary-container`

## Surface

Usado para fundos, áreas de conteúdo, cards, painéis e textos sobre superfície.

- `--fds-color-surface`
- `--fds-color-on-surface`
- `--fds-color-surface-variant`
- `--fds-color-on-surface-variant`
- `--fds-color-surface-container`
- `--fds-color-surface-container-high`

## Outline

Usado para bordas, divisores, contornos e separações visuais.

- `--fds-color-outline`
- `--fds-color-outline-variant`

## Feedback

Tokens de feedback comunicam estado, resultado ou risco.

Categorias previstas:

- `error`
- `success`
- `warning`
- `info`

Cada cor de feedback deve ter quatro versões:

- base;
- on;
- container;
- on-container.

Exemplo de formato esperado:

```txt
--fds-color-error
--fds-color-on-error
--fds-color-error-container
--fds-color-on-error-container
```

## Tipografia

As classes de tipografia padronizam hierarquia, leitura e densidade visual.

- `.h1`: título principal da página ou seção de maior hierarquia.
- `.h2`: título de seção.
- `.h3`: título de bloco, card ou subseção.
- `.body`: texto comum.
- `.body-sm`: texto auxiliar ou de menor densidade.
- `.caption`: texto curto, rótulos e metadados.
- `.mono`: texto monoespaçado para códigos, chaves e informações técnicas.
- `.text-muted`: texto de menor ênfase.

## Radius

Os tokens de radius definem o arredondamento oficial do sistema.

- `--fds-radius-sm`
- `--fds-radius-md`
- `--fds-radius-lg`
- `--fds-radius-xl`
- `--fds-radius-full`

## Exemplo Com Seed Color

```tsx
import { FreitasProvider } from "@freitas-ds/react";

export function App() {
      return (
            <FreitasProvider theme={{ seed: "#2563eb", mode: "light" }}>
                  <main className="bg-surface text-on-surface">Conteúdo do sistema</main>
            </FreitasProvider>
      );
}
```

## Exemplo Com Tema Manual

```tsx
import { FreitasProvider } from "@freitas-ds/react";

export function App() {
      return (
            <FreitasProvider
                  theme={{
                        mode: "light",
                        colors: {
                              primary: "#0f766e",
                              onPrimary: "#ffffff",
                        },
                        radius: {
                              md: "0.5rem",
                        },
                  }}
            >
                  <main className="bg-surface text-on-surface">Conteúdo do sistema</main>
            </FreitasProvider>
      );
}
```

Os tokens devem ser a única fonte de verdade visual do Freitas DS.
