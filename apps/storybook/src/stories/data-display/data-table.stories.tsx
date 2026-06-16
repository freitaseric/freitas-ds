import {
  Button,
  DataTable,
  type DataTableColumn,
  StatusBadge,
  type StatusBadgeStatus
} from "@freitas-ds/react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"

type Attendance = {
  id: string
  producer: string
  service: string
  city: string
  status: StatusBadgeStatus
  createdAt: string
}

const rows: Attendance[] = [
  {
    id: "OS-1021",
    producer: "João da Silva",
    service: "Visita técnica",
    city: "Boa Vista",
    status: "completed",
    createdAt: "2026-06-10"
  },
  {
    id: "OS-1022",
    producer: "Maria dos Santos",
    service: "Cadastro",
    city: "Mucajaí",
    status: "pending",
    createdAt: "2026-06-12"
  },
  {
    id: "OS-1023",
    producer: "Ana Paiva",
    service: "Orientação",
    city: "Cantá",
    status: "active",
    createdAt: "2026-06-08"
  }
]

const columns: Array<DataTableColumn<Attendance>> = [
  {
    id: "id",
    header: "OS",
    accessor: "id",
    sortable: true
  },
  {
    id: "producer",
    header: "Produtor",
    accessor: "producer",
    sortable: true
  },
  {
    id: "service",
    header: "Serviço",
    accessor: "service"
  },
  {
    id: "city",
    header: "Município",
    accessor: "city"
  }
]

const meta = {
  title: "Data Display/DataTable",
  component: DataTable,
  parameters: {
    layout: "padded"
  }
} satisfies Meta<typeof DataTable>

export default meta

type Story = StoryObj

export const Basic: Story = {
  render: () => <DataTable columns={columns} data={rows} getRowId={(row) => row.id} />
}

export const WithCustomCells: Story = {
  render: () => (
    <DataTable
      columns={[
        ...columns.slice(0, 2),
        {
          id: "summary",
          header: "Resumo",
          cell: (row) => (
            <div>
              <p className="body-sm font-medium">{row.service}</p>
              <p className="caption text-muted">{row.city}</p>
            </div>
          )
        },
        {
          id: "actions",
          header: "Ações",
          align: "right",
          cell: () => (
            <Button type="button" variant="ghost" size="sm">
              Ver
            </Button>
          )
        }
      ]}
      data={rows}
      getRowId={(row) => row.id}
    />
  )
}

export const WithStatusBadge: Story = {
  render: () => (
    <DataTable
      columns={[
        ...columns,
        {
          id: "status",
          header: "Status",
          cell: (row) => <StatusBadge status={row.status} />
        }
      ]}
      data={rows}
      getRowId={(row) => row.id}
    />
  )
}

export const Empty: Story = {
  render: () => <DataTable columns={columns} data={[]} />
}

export const Loading: Story = {
  render: () => <DataTable columns={columns} data={[]} loading />
}

export const SelectableRows: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>(["OS-1022"])

    return (
      <div className="grid gap-3">
        <p className="caption text-muted">{selected.length} selecionado(s)</p>
        <DataTable
          columns={columns}
          data={rows}
          getRowId={(row) => row.id}
          selectedRowIds={selected}
          onSelectedRowIdsChange={setSelected}
        />
      </div>
    )
  }
}

export const SortableColumns: Story = {
  render: () => <DataTable columns={columns} data={rows} getRowId={(row) => row.id} />
}
