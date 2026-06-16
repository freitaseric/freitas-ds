import { describe, expect, it } from "vitest"

import { DatePicker, FormField, Input } from "../../index"
import { renderWithProvider, screen } from "../../test/test-utils"

describe("FormField", () => {
  it("mostra indicador obrigatório no label e propaga required ao controle", () => {
    renderWithProvider(
      <FormField id="name" label="Nome completo" required>
        <Input />
      </FormField>
    )

    const input = screen.getByLabelText(/nome completo.*obrigatório/i)

    expect(input).toBeRequired()
    expect(input).toHaveAttribute("aria-required", "true")
    expect(screen.getAllByText("*")).toHaveLength(1)
  })

  it("preserva aria-invalid quando existe erro", () => {
    renderWithProvider(
      <FormField id="name" label="Nome completo" required error="Informe o nome.">
        <Input />
      </FormField>
    )

    expect(screen.getByLabelText(/nome completo.*obrigatório/i)).toHaveAttribute(
      "aria-invalid",
      "true"
    )
    expect(screen.getByRole("alert")).toHaveTextContent("Informe o nome.")
  })

  it("preserva estado required em controle composto sem required nativo", () => {
    renderWithProvider(
      <FormField id="date" label="Data" required>
        <DatePicker />
      </FormField>
    )

    expect(screen.getByRole("button", { name: "Selecionar data" })).toHaveAttribute(
      "data-required"
    )
  })
})
