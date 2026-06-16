import { describe, expect, it } from "vitest"

import { Label } from "../../index"
import { renderWithProvider, screen, within } from "../../test/test-utils"

describe("Label", () => {
  it("renderiza label normal sem asterisco", () => {
    renderWithProvider(<Label htmlFor="name">Nome</Label>)

    expect(screen.getByText("Nome")).not.toHaveTextContent("*")
  })

  it("renderiza indicador obrigatório tokenizado e acessível", () => {
    renderWithProvider(
      <Label htmlFor="name" required>
        Nome completo
      </Label>
    )

    const label = screen.getByText("Nome completo").closest("label")

    expect(label).toHaveTextContent("Nome completo * obrigatório")
    expect(within(label as HTMLElement).getByText("*")).toHaveClass("text-error")
    expect(within(label as HTMLElement).getByText("*")).toHaveAttribute(
      "aria-hidden",
      "true"
    )
    expect(within(label as HTMLElement).getByText("obrigatório")).toHaveClass("sr-only")
  })

  it("oculta indicador visual quando showRequiredIndicator é falso", () => {
    renderWithProvider(
      <Label htmlFor="name" required showRequiredIndicator={false}>
        Nome completo
      </Label>
    )

    const label = screen.getByText("Nome completo").closest("label")

    expect(label).toHaveTextContent("Nome completo obrigatório")
    expect(within(label as HTMLElement).queryByText("*")).not.toBeInTheDocument()
    expect(within(label as HTMLElement).getByText("obrigatório")).toHaveClass("sr-only")
  })
})
