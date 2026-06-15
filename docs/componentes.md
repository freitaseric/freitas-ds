# Componentes Do Freitas DS

Este documento lista os componentes oficiais do Freitas DS e orienta quando usar cada um.

Componentes oficiais devem ser preferidos antes de criar soluções locais nas aplicações.

Os componentes também podem ser visualizados e testados no Storybook do projeto, executando `pnpm storybook` na raiz do monorepo.

## Fundação

### Button

Botão oficial para ações da interface.

Use variantes semânticas como `primary`, `secondary`, `tertiary`, `outline`, `ghost` e `danger`.

```tsx
import { Button } from "@freitas-ds/react";

export function Example() {
      return <Button>Salvar</Button>;
}
```

### Card

Container para agrupar conteúdo relacionado.

```tsx
import { Card, CardContent, CardFooter, CardHeader, Button } from "@freitas-ds/react";

export function Example() {
      return (
            <Card>
                  <CardHeader>
                        <h2 className="h3">Cadastro</h2>
                  </CardHeader>
                  <CardContent>
                        <p className="body-sm text-muted">Dados principais do produtor.</p>
                  </CardContent>
                  <CardFooter>
                        <Button>Continuar</Button>
                  </CardFooter>
            </Card>
      );
}
```

## Formulários

### FormField

Composição recomendada para campos com label, texto de ajuda e erro.

```tsx
import { FormField, Input } from "@freitas-ds/react";

export function Example() {
      return (
            <FormField label="Nome completo" helperText="Informe o nome do produtor." required>
                  <Input placeholder="Ex: João da Silva" />
            </FormField>
      );
}
```

### Input

Campo de texto simples.

### Textarea

Campo para textos maiores, observações e descrições.

### NativeSelect

Seleção nativa do navegador. Use para listas pequenas, fixas e simples.

```tsx
import { NativeSelect } from "@freitas-ds/react";

export function Example() {
      return (
            <NativeSelect
                  placeholder="Selecione"
                  options={[
                        { value: "familiar", label: "Agricultura familiar" },
                        { value: "empresarial", label: "Agricultura empresarial" },
                  ]}
            />
      );
}
```

### Select

Seleção customizada para listas simples ou médias, sem busca.

### Combobox

Seleção pesquisável para listas maiores ou quando o usuário precisa buscar por nome, documento, código ou descrição.

```tsx
import { Combobox } from "@freitas-ds/react";

export function Example() {
      return (
            <Combobox
                  placeholder="Selecione o produtor"
                  searchPlaceholder="Buscar produtor..."
                  options={[
                        {
                              value: "joao-silva",
                              label: "João da Silva",
                              description: "CPF: 000.000.000-00",
                        },
                  ]}
            />
      );
}
```

## Controles

### Checkbox

Controle para seleção booleana independente.

### CheckboxField

Composição de checkbox com label e descrição.

### RadioGroup

Controle para escolha única entre opções visíveis.

### Switch

Controle para alternar estado ligado/desligado.

### SwitchField

Composição de switch com label e descrição.

## Feedback

### Badge

Indicador curto de categoria, rótulo ou metadado.

```tsx
import { Badge } from "@freitas-ds/react";

export function Example() {
      return <Badge>Ativo</Badge>;
}
```

### StatusBadge

Indicador de status de negócio, como ativo, pendente, concluído ou cancelado.

```tsx
import { StatusBadge } from "@freitas-ds/react";

export function Example() {
      return <StatusBadge status="success">Concluído</StatusBadge>;
}
```

### Alert

Mensagem de feedback contextual.

```tsx
import { Alert } from "@freitas-ds/react";

export function Example() {
      return <Alert variant="info">Cadastro salvo com sucesso.</Alert>;
}
```

### Spinner

Indicador de carregamento em andamento.

### Skeleton

Placeholder visual para conteúdo que ainda está carregando.

### EmptyState

Estado vazio com mensagem, descrição e possível ação.

## Data Display

### Table

Tabela oficial para listagem de dados.

### Pagination

Controle de paginação para listas e tabelas.

## Navegação E Layout

### AppShell

Estrutura principal de aplicação.

### Sidebar

Navegação lateral.

### Topbar

Barra superior da aplicação.

### Breadcrumb

Indicação de localização hierárquica.

### PageHeader

Cabeçalho de página com título, descrição e ações.

### Tabs

Alternância entre seções relacionadas.

### DropdownMenu

Menu de ações contextuais.

## Overlay

### Dialog

Modal para fluxos ou conteúdos que exigem atenção.

### AlertDialog

Modal de confirmação para ações importantes, especialmente ações destrutivas.

### Sheet

Painel lateral ou inferior para fluxos complementares.

### Popover

Conteúdo flutuante contextual.

### Tooltip

Ajuda curta sobre controles ou informações.

## Utilitários

### Avatar

Representação visual de pessoa, usuário ou entidade.

### UserMenu

Menu de usuário autenticado.

### Kbd

Representação visual de tecla ou atalho.

### Separator

Separador visual entre grupos.

### CommandMenu

Menu pesquisável para ações globais.

## Regras De Escolha

- Use `NativeSelect` para listas pequenas e fixas.
- Use `Select` para listas simples ou médias, sem busca.
- Use `Combobox` para listas pesquisáveis.
- Use `CommandMenu` para ações globais.
