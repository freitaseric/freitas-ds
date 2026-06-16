import { describe, expect, it, vi } from "vitest"

import { DataTable, type DataTableColumn, StatusBadge } from "../../index"
import { renderWithProvider, screen, userEvent } from "../../test/test-utils"

type Row = {
  id: string
  name: string
  city: string
  status: "active" | "pending"
}

const rows: Row[] = [
  { id: "2", name: "Maria", city: "Mucajaí", status: "pending" },
  { id: "1", name: "Ana", city: "Boa Vista", status: "active" }
]

const columns: Array<DataTableColumn<Row>> = [
  { id: "name", header: "Nome", accessor: "name", sortable: true },
  { id: "city", header: "Município", accessor: "city" }
]

describe("DataTable", () => {
  it("renderiza cabeçalhos e linhas", () => {
    renderWithProvider(
      <DataTable columns={columns} data={rows} getRowId={(row) => row.id} />
    )

    expect(screen.getByRole("columnheader", { name: /nome/i })).toBeInTheDocument()
    expect(screen.getByRole("cell", { name: "Maria" })).toBeInTheDocument()
    expect(screen.getByRole("cell", { name: "Boa Vista" })).toBeInTheDocument()
  })

  it("renderiza células customizadas", () => {
    renderWithProvider(
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

    expect(screen.getByText("Ativo")).toBeInTheDocument()
    expect(screen.getByText("Pendente")).toBeInTheDocument()
  })

  it("renderiza estado vazio", () => {
    renderWithProvider(<DataTable columns={columns} data={[]} />)

    expect(screen.getByText("Nenhum registro encontrado")).toBeInTheDocument()
  })

  it("renderiza loading", () => {
    renderWithProvider(<DataTable columns={columns} data={[]} loading />)

    expect(screen.getAllByRole("row")).toHaveLength(6)
  })

  it("seleciona linha", async () => {
    const user = userEvent.setup()
    const onSelectedRowIdsChange = vi.fn()

    renderWithProvider(
      <DataTable
        columns={columns}
        data={rows}
        getRowId={(row) => row.id}
        selectedRowIds={[]}
        onSelectedRowIdsChange={onSelectedRowIdsChange}
      />
    )

    await user.click(screen.getByRole("checkbox", { name: "Selecionar linha 1" }))

    expect(onSelectedRowIdsChange).toHaveBeenCalledWith(["2"])
  })

  it("ordena colunas", async () => {
    const user = userEvent.setup()

    renderWithProvider(
      <DataTable columns={columns} data={rows} getRowId={(row) => row.id} />
    )

    await user.click(screen.getByRole("button", { name: /nome/i }))

    const cells = screen.getAllByRole("cell")

    expect(cells[0]).toHaveTextContent("Ana")
  })

  it("chama onRowClick", async () => {
    const user = userEvent.setup()
    const onRowClick = vi.fn()

    renderWithProvider(
      <DataTable
        columns={columns}
        data={rows}
        getRowId={(row) => row.id}
        onRowClick={onRowClick}
      />
    )

    await user.click(screen.getByRole("cell", { name: "Maria" }))

    expect(onRowClick).toHaveBeenCalledWith(rows[0], "2")
  })
})
