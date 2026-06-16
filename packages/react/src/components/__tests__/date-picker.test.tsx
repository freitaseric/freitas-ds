import { describe, expect, it, vi } from "vitest"

import { DatePicker, FormField } from "../../index"
import { renderWithProvider, screen, userEvent } from "../../test/test-utils"

describe("DatePicker", () => {
  it("abre o calendário", async () => {
    const user = userEvent.setup()

    renderWithProvider(<DatePicker defaultValue={new Date(2026, 5, 15)} />)

    await user.click(screen.getByRole("button", { name: "Selecionar data" }))

    expect(screen.getByRole("dialog")).toBeInTheDocument()
    expect(screen.getByText(/junho 2026/i)).toBeInTheDocument()
  })

  it("seleciona data, exibe formato brasileiro e chama onValueChange", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()

    renderWithProvider(
      <DatePicker defaultValue={new Date(2026, 5, 1)} onValueChange={onValueChange} />
    )

    await user.click(screen.getByRole("button", { name: "Selecionar data" }))
    await user.click(screen.getByRole("button", { name: /segunda-feira, 15 de junho/i }))

    expect(onValueChange).toHaveBeenCalledWith(expect.any(Date))
    expect(screen.getByRole("button", { name: "Selecionar data" })).toHaveTextContent(
      "15/06/2026"
    )
  })

  it("respeita disabled", () => {
    renderWithProvider(<DatePicker disabled />)

    expect(screen.getByRole("button", { name: "Selecionar data" })).toBeDisabled()
  })

  it("limpa a data quando clear está disponível", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()

    renderWithProvider(
      <DatePicker defaultValue={new Date(2026, 5, 15)} onValueChange={onValueChange} />
    )

    await user.click(screen.getByRole("button", { name: "Limpar data" }))

    expect(onValueChange).toHaveBeenCalledWith(undefined)
    expect(screen.getByRole("button", { name: "Selecionar data" })).toHaveTextContent(
      "Selecionar data"
    )
  })

  it("integra com FormField e aria-invalid", () => {
    renderWithProvider(
      <FormField label="Data" error="Informe uma data.">
        <DatePicker />
      </FormField>
    )

    expect(screen.getByRole("button", { name: "Selecionar data" })).toHaveAttribute(
      "aria-invalid",
      "true"
    )
    expect(screen.getByRole("alert")).toHaveTextContent("Informe uma data.")
  })
})
