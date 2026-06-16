import { describe, expect, it, vi } from "vitest"

import { Calendar } from "../../index"
import { renderWithProvider, screen, userEvent } from "../../test/test-utils"

describe("Calendar", () => {
  it("renderiza mês e dias", () => {
    renderWithProvider(<Calendar mode="single" defaultMonth={new Date(2026, 5, 1)} />)

    expect(screen.getByText(/junho 2026/i)).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: /segunda-feira, 15 de junho/i })
    ).toBeInTheDocument()
  })

  it("seleciona uma data", async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()

    renderWithProvider(
      <Calendar mode="single" defaultMonth={new Date(2026, 5, 1)} onSelect={onSelect} />
    )

    await user.click(screen.getByRole("button", { name: /segunda-feira, 15 de junho/i }))

    expect(onSelect).toHaveBeenCalled()
    expect(onSelect.mock.calls[0]?.[0]).toBeInstanceOf(Date)
  })

  it("navega entre meses", async () => {
    const user = userEvent.setup()

    renderWithProvider(<Calendar mode="single" defaultMonth={new Date(2026, 5, 1)} />)

    await user.click(screen.getByRole("button", { name: /próximo mês/i }))

    expect(screen.getByText(/julho 2026/i)).toBeInTheDocument()
  })
})
