import {
  Button,
  DataTable,
  type DataTableColumn,
  DataViewEmpty,
  FilterBarItem,
  DataView as FreitasDataView,
  NativeSelect,
  StatusBadge,
  type StatusBadgeStatus
} from "@freitas-ds/react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"

type Producer = {
  id: string
  name: string
  city: string
  status: StatusBadgeStatus
}

const producers: Producer[] = [
  { id: "P-001", name: "João da Silva", city: "Boa Vista", status: "active" },
  { id: "P-002", name: "Maria dos Santos", city: "Mucajaí", status: "pending" },
  { id: "P-003", name: "Ana Paiva", city: "Cantá", status: "completed" }
]

const columns: Array<DataTableColumn<Producer>> = [
  { id: "id", header: "Código", accessor: "id", sortable: true },
  { id: "name", header: "Produtor", accessor: "name", sortable: true },
  { id: "city", header: "Município", accessor: "city" },
  {
    id: "status",
    header: "Status",
    cell: (row) => <StatusBadge status={row.status} />
  }
]

function ProducerTable() {
  return <DataTable columns={columns} data={producers} getRowId={(row) => row.id} />
}

const meta = {
  title: "Data Display/DataView",
  component: FreitasDataView,
  parameters: {
    layout: "padded"
  }
} satisfies Meta<typeof FreitasDataView>

export default meta

type Story = StoryObj<typeof FreitasDataView>

export const BasicList: Story = {
  render: () => (
    <FreitasDataView
      title="Produtores"
      description="Listagem administrativa de produtores rurais."
      actions={<Button type="button">Novo produtor</Button>}
    >
      <ProducerTable />
    </FreitasDataView>
  )
}

export const WithSearchAndFilters: Story = {
  render: () => (
    <FreitasDataView
      title="Atendimentos"
      description="Busque e filtre ordens de serviço."
      search={{ placeholder: "Buscar por produtor ou OS" }}
      filters={
        <>
          <FilterBarItem label="Status">
            <NativeSelect
              placeholder="Todos"
              options={[
                { value: "active", label: "Ativos" },
                { value: "pending", label: "Pendentes" },
                { value: "completed", label: "Concluídos" }
              ]}
            />
          </FilterBarItem>
          <FilterBarItem label="Município">
            <NativeSelect
              placeholder="Todos"
              options={[
                { value: "boa-vista", label: "Boa Vista" },
                { value: "mucajai", label: "Mucajaí" }
              ]}
            />
          </FilterBarItem>
        </>
      }
      actions={<Button type="button">Exportar</Button>}
    >
      <ProducerTable />
    </FreitasDataView>
  )
}

export const Loading: Story = {
  render: () => (
    <FreitasDataView title="Relatórios" description="Carregando resultados." loading />
  )
}

export const Empty: Story = {
  render: () => (
    <FreitasDataView title="Documentos">
      <DataViewEmpty
        title="Nenhum documento encontrado"
        description="Cadastre um documento para começar."
        action={<Button type="button">Novo documento</Button>}
      />
    </FreitasDataView>
  )
}

export const WithSelection: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>(["P-002"])

    return (
      <FreitasDataView
        title="Associações"
        description="Selecione registros para ações em lote."
        selectedCount={selected.length}
        selectedActions={
          <>
            <Button type="button" size="sm" variant="outline">
              Exportar selecionados
            </Button>
            <Button type="button" size="sm" variant="danger">
              Arquivar
            </Button>
          </>
        }
        onClearSelection={() => setSelected([])}
      >
        <DataTable
          columns={columns}
          data={producers}
          getRowId={(row) => row.id}
          selectedRowIds={selected}
          onSelectedRowIdsChange={setSelected}
        />
      </FreitasDataView>
    )
  }
}

export const WithPagination: Story = {
  render: () => (
    <FreitasDataView
      title="Atendimentos"
      description="Resultados paginados."
      pagination={{ page: 2, totalPages: 8 }}
    >
      <ProducerTable />
    </FreitasDataView>
  )
}
