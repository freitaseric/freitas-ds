import { describe, expect, it, vi } from "vitest"

import { DateRangePicker } from "../../index"
import { renderWithProvider, screen, userEvent } from "../../test/test-utils"

describe("DateRangePicker", () => {
  it("seleciona início e fim do período", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()

    renderWithProvider(
      <DateRangePicker
        defaultValue={{ from: new Date(2026, 5, 1) }}
        onValueChange={onValueChange}
      />
    )

    await user.click(screen.getByRole("button", { name: "Selecionar período" }))
    await user.click(screen.getByRole("button", { name: /segunda-feira, 15 de junho/i }))

    expect(onValueChange).toHaveBeenCalledWith(
      expect.objectContaining({
        from: expect.any(Date),
        to: expect.any(Date)
      })
    )
  })

  it("exibe intervalo formatado", () => {
    renderWithProvider(
      <DateRangePicker
        defaultValue={{ from: new Date(2026, 5, 10), to: new Date(2026, 5, 15) }}
      />
    )

    expect(screen.getByRole("button", { name: "Selecionar período" })).toHaveTextContent(
      "10/06/2026 - 15/06/2026"
    )
  })

  it("limpa o período", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()

    renderWithProvider(
      <DateRangePicker
        defaultValue={{ from: new Date(2026, 5, 10), to: new Date(2026, 5, 15) }}
        onValueChange={onValueChange}
      />
    )

    await user.click(screen.getByRole("button", { name: "Limpar período" }))

    expect(onValueChange).toHaveBeenCalledWith(undefined)
    expect(screen.getByRole("button", { name: "Selecionar período" })).toHaveTextContent(
      "Selecionar período"
    )
  })
})
