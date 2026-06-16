import { describe, expect, it, vi } from "vitest"

import {
  Button,
  DataViewEmpty,
  FilterBarItem,
  DataView as FreitasDataView,
  NativeSelect
} from "../../index"
import { renderWithProvider, screen, userEvent } from "../../test/test-utils"

describe("DataView", () => {
  it("renderiza título, descrição e ações", () => {
    renderWithProvider(
      <FreitasDataView
        title="Produtores"
        description="Listagem administrativa"
        actions={<Button type="button">Novo produtor</Button>}
      >
        <div>Conteúdo</div>
      </FreitasDataView>
    )

    expect(screen.getByRole("heading", { name: "Produtores" })).toBeInTheDocument()
    expect(screen.getByText("Listagem administrativa")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Novo produtor" })).toBeInTheDocument()
  })

  it("renderiza busca", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()

    renderWithProvider(
      <FreitasDataView search={{ placeholder: "Buscar produtor", onValueChange }}>
        <div>Conteúdo</div>
      </FreitasDataView>
    )

    await user.type(screen.getByPlaceholderText("Buscar produtor"), "Ana")

    expect(onValueChange).toHaveBeenLastCalledWith("Ana")
  })

  it("renderiza filtros", () => {
    renderWithProvider(
      <FreitasDataView
        filters={
          <FilterBarItem label="Status">
            <NativeSelect
              placeholder="Todos"
              options={[{ value: "active", label: "Ativo" }]}
            />
          </FilterBarItem>
        }
      >
        <div>Conteúdo</div>
      </FreitasDataView>
    )

    expect(screen.getByText("Filtros")).toBeInTheDocument()
    expect(screen.getByText("Status")).toBeInTheDocument()
  })

  it("renderiza empty state", () => {
    renderWithProvider(
      <FreitasDataView>
        <DataViewEmpty title="Nada encontrado" description="Ajuste a busca." />
      </FreitasDataView>
    )

    expect(screen.getByText("Nada encontrado")).toBeInTheDocument()
    expect(screen.getByText("Ajuste a busca.")).toBeInTheDocument()
  })

  it("renderiza loading state", () => {
    renderWithProvider(<FreitasDataView loading />)

    expect(screen.getByRole("status", { name: "Carregando dados" })).toBeInTheDocument()
  })

  it("exibe action bar quando há seleção", async () => {
    const user = userEvent.setup()
    const onClearSelection = vi.fn()

    renderWithProvider(
      <FreitasDataView
        selectedCount={2}
        selectedActions={<Button type="button">Exportar</Button>}
        onClearSelection={onClearSelection}
      >
        <div>Conteúdo</div>
      </FreitasDataView>
    )

    expect(screen.getByText("2 item(ns) selecionado(s)")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Exportar" })).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Limpar seleção" }))

    expect(onClearSelection).toHaveBeenCalledTimes(1)
  })
})
