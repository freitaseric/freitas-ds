# Regras Do Freitas DS

Este documento define regras obrigatórias de uso e evolução do Freitas DS.

## 1. Componentes Oficiais Primeiro

Antes de criar um componente local, verifique se o Freitas DS já resolve o problema.

Errado:

```tsx
function LocalButton() {
      return <button className="rounded bg-blue-600 px-4 py-2 text-white">Salvar</button>;
}
```

Certo:

```tsx
import { Button } from "@freitas-ds/react";

export function Actions() {
      return <Button>Salvar</Button>;
}
```

## 2. Sem Cores Fixas Nos Componentes

Componentes oficiais não devem usar cores fixas.

Errado:

```tsx
<div className="bg-blue-600 text-white">Conteúdo</div>
```

Certo:

```tsx
<div className="bg-primary text-on-primary">Conteúdo</div>
```

## 3. Usar Papéis Semânticos

Use papéis semânticos para comunicar intenção visual.

Exemplos:

- `bg-primary`
- `text-on-primary`
- `bg-surface`
- `text-on-surface`
- `border-outline`
- `bg-error`
- `text-on-error`

## 4. Tipografia Por Classes Semânticas

Textos devem usar classes de tipografia do Freitas DS.

Errado:

```tsx
<h1 className="text-5xl font-bold tracking-tight">Dashboard</h1>
```

Certo:

```tsx
<h1 className="h1">Dashboard</h1>
```

## 5. Diferença Entre NativeSelect, Select E Combobox

- Use `NativeSelect` para listas pequenas e fixas.
- Use `Select` para listas simples ou médias, sem busca.
- Use `Combobox` para listas pesquisáveis.

Errado:

```tsx
<NativeSelect options={listaComCentenasDeProdutores} />
```

Certo:

```tsx
<Combobox searchPlaceholder="Buscar produtor..." options={produtores} />
```

## 6. Ações Destrutivas Devem Usar `danger`

Ações destrutivas precisam ser visualmente claras.

```tsx
<Button variant="danger">Excluir</Button>
```

## 7. Ações Destrutivas Importantes Devem Usar `AlertDialog`

Quando a ação destrutiva for irreversível ou relevante, use confirmação explícita.

```tsx
<AlertDialog>
      <Button variant="danger">Excluir cadastro</Button>
</AlertDialog>
```

## 8. Campos Com Label Devem Preferencialmente Usar `FormField`

Use `FormField` para manter label, ajuda, erro e acessibilidade consistentes.

```tsx
<FormField label="CPF" error="CPF inválido">
      <Input placeholder="000.000.000-00" />
</FormField>
```

## 9. Todo Componente Novo Deve Considerar Acessibilidade

Todo componente novo deve considerar:

- navegação por teclado;
- foco visível;
- contraste;
- estados desabilitados;
- estados inválidos;
- nomes acessíveis;
- comportamento com leitores de tela.

## 10. Verificar Componentes Existentes Antes De Criar Um Novo

Antes de criar um componente novo, confirme se o problema já é resolvido por:

- componente existente;
- variação de componente existente;
- composição de componentes existentes.

## 11. O Freitas DS Deve Evoluir Com Versionamento

Mudanças no design system devem ser versionadas.

Mudanças que alteram API, visual ou comportamento precisam ser documentadas para que aplicações consumidoras possam atualizar com segurança.

## 12. Nenhuma Linguagem Visual Fora Do Freitas DS

Nenhum sistema desenvolvido sob a identidade Freitas deve criar sua própria linguagem visual fora do Freitas DS.

Aplicações podem ter identidade própria, mas devem expressá-la por tokens, temas e componentes oficiais.

## 13. Qualidade Automatizada Obrigatória

Todo componente novo ou alteração comportamental em componente existente deve vir acompanhado de teste automatizado com Vitest e Testing Library.

Antes de integrar, publicar ou abrir uma release, execute:

```bash
pnpm check
pnpm typecheck
pnpm test
pnpm build
```

Use `pnpm quality` para validar o fluxo principal e `pnpm quality:full` quando a validação também precisar incluir o build do Storybook.

Nenhum componente oficial deve ficar sem teste e sem exemplo visual correspondente no Storybook. Correções de bug devem incluir teste de regressão sempre que o comportamento puder ser reproduzido em jsdom.

## 14. Releases Devem Usar Changesets

Mudanças publicáveis em `@freitas-ds/theme`, `@freitas-ds/styles` ou `@freitas-ds/react` devem ter changeset correspondente antes de versionar pacotes.

Use `pnpm changeset` para registrar a intenção de release, `pnpm version-packages` para aplicar versões e changelogs, e `pnpm pack:all` para validar o conteúdo dos pacotes sem publicar.

Não execute `pnpm release` sem aprovação explícita.

## 15. Validar Consumo Real

Alterações em exports públicos, empacotamento ou CSS global devem manter o app consumidor de referência funcionando.

Antes de abrir release, rode:

```bash
pnpm build:consumer
pnpm pack:all
```

## 16. Integração Tailwind

Novas aplicações Tailwind v4 devem preferir o plugin oficial no CSS principal:

```css
@import "tailwindcss";
@plugin "freitas-ds";
```

Não importe `@freitas-ds/styles/index.css` quando o plugin já estiver em uso, salvo motivo técnico documentado.

O `FreitasProvider` continua obrigatório para tema dinâmico em runtime.

Em consumo via workspace, declare `@source` para `@freitas-ds/react` quando o Tailwind não escanear as classes internas do pacote React automaticamente.

## 17. Feedback Temporário Com Toast

Use `Toast` para feedback temporário depois de uma ação, como salvar, copiar, exportar ou concluir uma operação assíncrona.

Use `Alert` para mensagens persistentes na tela, especialmente quando a informação precisa continuar visível enquanto o usuário decide o próximo passo.

Use `AlertDialog` para confirmar ações críticas, destrutivas ou irreversíveis.

Não use `Toast` para erro que exige correção imediata em formulário. Nesses casos, mostre o erro junto ao campo ou à seção afetada.

## 18. Seleção De Datas

Use `DatePicker` para seleção de uma data única.

Use `DateRangePicker` para seleção de período.

Não use `Input` manual para datas quando `DatePicker` estiver disponível, salvo em integrações técnicas específicas em que a digitação livre seja obrigatória.

Interfaces em pt-BR devem exibir datas no formato `dd/MM/yyyy`.

## 19. Listagens Administrativas

Use `DataView` para telas administrativas completas com cabeçalho, busca, filtros, ações, estado vazio, loading, erro, seleção e paginação.

Use `DataTable` quando houver dados tabulares com colunas declarativas, células customizadas, seleção de linhas ou ordenação simples.

Use `Table` quando precisar de controle manual total sobre marcação, agrupamentos, rodapé ou composição da tabela.

Não recrie barras de busca, filtros, action bars e paginação localmente quando `DataView` puder compor esses padrões com os componentes oficiais.

## 20. Formulários Validados

Use `Form` + TanStack Form + Zod para formulários com validação real, submissão administrativa ou persistência de dados.

Use `FormField` simples para campos isolados ou formulários pequenos sem schema.

Todo formulário administrativo que salva dados deve ter validação explícita.

Mensagens de erro devem ser específicas, visíveis e associadas ao controle com `aria-describedby`.

Controles inválidos devem receber `aria-invalid` por meio de `FormControl`.

## 21. Campos Obrigatórios

Todo campo marcado como `required` deve exibir feedback visual de obrigatoriedade ao lado do label.

O padrão oficial é um asterisco usando token semântico de erro.

Errado:

```tsx
<FormField label="Nome completo">
      <Input required />
</FormField>
```

Certo:

```tsx
<FormField label="Nome completo" required>
      <Input />
</FormField>
```

Não use apenas placeholder, cor ou texto de ajuda para indicar obrigatoriedade.
