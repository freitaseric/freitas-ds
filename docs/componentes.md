# Componentes Do Freitas DS

Este documento lista os componentes oficiais do Freitas DS e orienta quando usar cada um.

Componentes oficiais devem ser preferidos antes de criar soluções locais nas aplicações.

Os componentes também podem ser visualizados e testados no Storybook do projeto, executando `pnpm storybook` na raiz do monorepo.

## Consumo Em Aplicações

Aplicações consumidoras Tailwind v4 devem carregar o plugin oficial no CSS principal e usar os componentes pelo entrypoint público do pacote React.

```css
@import "tailwindcss";
@plugin "freitas-ds";
```

```tsx
import { Button, FreitasProvider } from "@freitas-ds/react";

export function Example() {
      return (
            <FreitasProvider theme={{ seed: "#2563eb", mode: "light" }}>
                  <Button>Salvar</Button>
            </FreitasProvider>
      );
}
```

O pacote `@freitas-ds/styles` ainda aceita `import "@freitas-ds/styles/index.css"` como compatibilidade legada. Não misture o CSS legado e `@plugin "freitas-ds"` no mesmo app sem motivo técnico documentado.

Em consumo por workspace, pode ser necessário apontar `@source` para o pacote React para que o Tailwind gere as utilities usadas internamente pelos componentes. Os exemplos do monorepo usam `@source "../../../packages/react/src"`.

O app `examples/consumer-vite` existe para validar esse consumo fora do dashboard e do Storybook.

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

Composição recomendada para campos simples com label, texto de ajuda e erro, sem schema de validação.

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

### Campos Obrigatórios

Todo campo obrigatório deve exibir um indicador visual ao lado do label.

Use:

```tsx
<FormField label="Nome completo" required>
      <Input />
</FormField>
```

O Freitas DS exibirá um asterisco usando o token semântico de erro e manterá texto acessível para leitores de tela.

## Formulários Avançados

Use `Form` com TanStack Form e Zod quando o formulário tiver validação real, estado controlado, submissão administrativa ou persistência de dados.

`FormField` continua sendo a opção simples para campos isolados ou formulários pequenos sem schema.

### Form

Provider leve para compartilhar a instância retornada por `useForm` do TanStack Form com os componentes do Freitas DS.

### FormFieldController

Conecta um campo do TanStack Form aos blocos visuais do Freitas DS.

### FormItem, FormLabel, FormControl, FormDescription E FormMessage

Composição acessível para label, controle, descrição e mensagem de erro. `FormControl` injeta `id`, `aria-describedby` e `aria-invalid` no controle filho. `FormMessage` exibe o erro de validação com `role="alert"`.

```tsx
import {
      Button,
      Form,
      FormControl,
      FormDescription,
      FormFieldController,
      FormItem,
      FormLabel,
      FormMessage,
      getInputFieldProps,
      Input,
      useForm,
} from "@freitas-ds/react";
import { z } from "zod";

type FormValues = {
      name: string;
};

export function Example() {
      const form = useForm({
            defaultValues: {
                  name: "",
            } satisfies FormValues,
            onSubmit: ({ value }) => {
                  console.log(value);
            },
      });

      return (
            <Form form={form}>
                  <form
                        onSubmit={(event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              form.handleSubmit();
                        }}
                  >
                        <FormFieldController
                              name="name"
                              validators={{
                                    onSubmit: z.string().min(1, "Informe o nome."),
                              }}
                        >
                              {(field) => (
                                    <FormItem>
                                          <FormLabel>Nome</FormLabel>
                                          <FormControl>
                                                <Input placeholder="Nome completo" {...getInputFieldProps(field)} />
                                          </FormControl>
                                          <FormDescription>Informe o nome do produtor.</FormDescription>
                                          <FormMessage />
                                    </FormItem>
                              )}
                        </FormFieldController>

                        <Button type="submit">Salvar</Button>
                  </form>
            </Form>
      );
}
```

Helpers disponíveis para integração:

- `getInputFieldProps`: `Input`, `Textarea` e `NativeSelect`;
- `getSelectFieldProps`: `Select` e `Combobox`;
- `getCheckboxFieldProps`: `Checkbox`;
- `getRadioGroupFieldProps`: `RadioGroup`;
- `getSwitchFieldProps`: `Switch`;
- `getDatePickerFieldProps`: `DatePicker`.

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

### Calendar

Calendário base para seleção de data em composições controladas.

```tsx
import { Calendar } from "@freitas-ds/react";

export function Example() {
      return <Calendar mode="single" />;
}
```

### DatePicker

Campo oficial para seleção de uma única data, exibida no formato brasileiro `dd/MM/yyyy`.

```tsx
import { DatePicker } from "@freitas-ds/react";

export function Example() {
      return <DatePicker placeholder="Data de atendimento" />;
}
```

### DateRangePicker

Campo oficial para seleção de período.

```tsx
import { DateRangePicker } from "@freitas-ds/react";

export function Example() {
      return <DateRangePicker placeholder="Período do relatório" />;
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

### Toast

Notificação temporária para feedback rápido após uma ação do usuário.

Use `Toaster` em uma região alta da árvore React e dispare notificações com `useToast`.

```tsx
import { Button, Toaster, useToast } from "@freitas-ds/react";

function SaveButton() {
      const { toast } = useToast();

      return (
            <Button
                  onClick={() =>
                        toast({
                              title: "Cadastro salvo",
                              description: "As informações foram registradas com sucesso.",
                              tone: "success",
                        })
                  }
            >
                  Salvar
            </Button>
      );
}

export function App() {
      return (
            <Toaster>
                  <SaveButton />
            </Toaster>
      );
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

Tabela base para marcação manual de linhas, cabeçalhos e células.

Use quando a tela precisa de controle total da estrutura da tabela.

### DataTable

Tabela pronta baseada em dados e colunas declarativas.

Use para listagens tabulares com API previsível de `columns` e `data`, células customizadas, loading, estado vazio, seleção de linhas, ordenação simples e clique em linha.

```tsx
import { DataTable, type DataTableColumn, StatusBadge } from "@freitas-ds/react";

type Atendimento = {
      id: string;
      produtor: string;
      status: "active" | "pending";
};

const columns: Array<DataTableColumn<Atendimento>> = [
      { id: "id", header: "OS", accessor: "id", sortable: true },
      { id: "produtor", header: "Produtor", accessor: "produtor" },
      {
            id: "status",
            header: "Status",
            cell: (row) => <StatusBadge status={row.status} />,
      },
];

export function Example({ data }: { data: Atendimento[] }) {
      return <DataTable columns={columns} data={data} getRowId={(row) => row.id} />;
}
```

### DataView

Padrão completo para telas administrativas de listagem.

Use para compor cabeçalho, busca, filtros, ações, barra de seleção, conteúdo, estados de loading/erro/vazio e paginação.

```tsx
import { Button, DataTable, DataView } from "@freitas-ds/react";

export function Example() {
      return (
            <DataView
                  title="Produtores"
                  description="Listagem administrativa de produtores rurais."
                  search={{ placeholder: "Buscar produtor" }}
                  actions={<Button>Novo produtor</Button>}
                  pagination={{ page: 1, totalPages: 4 }}
            >
                  <DataTable columns={columns} data={data} getRowId={(row) => row.id} />
            </DataView>
      );
}
```

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
- Use `Table` para controle manual total.
- Use `DataTable` para dados tabulares declarativos.
- Use `DataView` para telas administrativas completas de listagem.
