# Changelog

Todas as mudanças notáveis deste projeto serão documentadas aqui.

## 0.2.0

### Adicionado

- CSS oficial dos componentes React em `freitas-ds/react.css`, gerado no build do plugin Tailwind.
- Export público `freitas-ds/react.css` para apps consumidores Tailwind v4.
- Exemplo Vite consumidor validando `@freitas-ds/react` sem `@source`.

### Alterado

- A instalação recomendada agora usa `@import "freitas-ds/react.css";` junto de `@plugin "freitas-ds";`.
- A documentação explica que o Tailwind CSS v4 não escaneia `node_modules/@freitas-ds/react/dist` automaticamente, e que `react.css` é a camada oficial para cobrir essa limitação.

## 0.1.0

Versão inicial experimental do Freitas DS.

### Adicionado

- Motor de tema em `@freitas-ds/theme`.
- Geração de tema por seed color.
- Aplicação de tema via CSS variables.
- Tokens CSS em `@freitas-ds/styles`.
- Classes semânticas de tipografia.
- Componentes React em `@freitas-ds/react`.
- Componentes de formulário.
- Componentes de feedback.
- Componentes de data display.
- Componentes de navegação e layout.
- Componentes de overlay.
- Componentes utilitários.
- Command Menu.
- Sistema oficial de notificações temporárias com `Toast`, `Toaster` e `useToast`.
- Componentes oficiais `Calendar`, `DatePicker` e `DateRangePicker` para seleção de datas.
- Componentes `DataView` e `DataTable` para telas administrativas e tabelas declarativas.
- Camada avançada de formulários com `Form`, `FormFieldController`, helpers de integração, TanStack Form e Zod.
- Plugin Tailwind `freitas-ds` para uso via `@plugin "freitas-ds"`.
- Compatibilidade com `@freitas-ds/styles/index.css` para consumidores existentes.
- Indicador visual e acessível para campos obrigatórios.
- Exemplo dashboard em `examples/dashboard`.
- Exemplo mínimo de aplicação consumidora em `examples/consumer-vite`.
- Documentação inicial em `docs/`.
