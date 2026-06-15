# Arquitetura Do Freitas DS

O Freitas DS é organizado como um monorepo com pacotes separados por responsabilidade. Essa divisão mantém o tema, os estilos globais e os componentes React independentes, previsíveis e fáceis de evoluir.

## Estrutura Geral

```txt
freitas-ds/
├── packages/
│   ├── theme/
│   ├── styles/
│   └── react/
├── examples/
│   └── dashboard/
└── docs/
```

## Pacotes

### `@freitas-ds/theme`

Motor de tema do Freitas DS.

Responsabilidades:

- definir tipos de tema;
- fornecer tema padrão;
- gerar tema a partir de seed color;
- resolver tema manual ou parcial;
- aplicar CSS variables no documento.

Esse pacote não deve depender de React. Ele precisa continuar utilizável por qualquer camada que precise gerar, resolver ou aplicar tokens visuais.

### `@freitas-ds/styles`

Pacote de CSS base do Freitas DS.

Responsabilidades:

- configurar tokens CSS;
- integrar Tailwind CSS v4;
- expor utilities semânticas;
- definir tipografia;
- fornecer estilos globais mínimos.

Esse pacote deve concentrar a linguagem visual compartilhada que não pertence a um componente React específico.

### `@freitas-ds/react`

Pacote de componentes React do design system.

Responsabilidades:

- expor componentes oficiais;
- encapsular comportamento acessível;
- usar tokens e utilities semânticas;
- padronizar composição, estados e interação;
- reduzir repetição nas aplicações finais.

## Filosofia Técnica

Componentes do Freitas DS não devem usar cores fixas. Em vez disso, devem usar papéis semânticos, como:

- `bg-primary`;
- `text-on-primary`;
- `bg-surface`;
- `text-on-surface`;
- `border-outline`;
- `bg-error`;
- `text-on-error`.

A aplicação final controla a identidade visual. O Freitas DS controla consistência, acessibilidade, estrutura, comportamento, experiência e composição.

Isso permite que sistemas diferentes tenham marcas diferentes sem criarem linguagens visuais incompatíveis.

## Camadas

### 1. Theme Engine

Camada responsável por criar, resolver e aplicar temas.

Ela transforma entradas como seed color ou tema manual em um conjunto consistente de valores visuais.

### 2. Tokens CSS

Camada responsável por expor os valores do tema como CSS variables.

Essas variáveis são a fonte de verdade visual consumida por estilos, utilities e componentes.

### 3. Utilities Semânticas

Camada responsável por transformar tokens em classes reutilizáveis.

Em vez de escrever valores soltos, as interfaces usam classes como `bg-primary`, `text-muted`, `rounded-fds-md` e `body-sm`.

### 4. Componentes React

Camada responsável por entregar blocos de interface prontos para uso.

Os componentes devem compor as camadas anteriores e oferecer comportamento consistente, acessível e previsível.
