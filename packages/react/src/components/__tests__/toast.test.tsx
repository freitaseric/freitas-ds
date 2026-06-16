import { describe, expect, it, vi } from "vitest"

import {
  Button,
  ToastAction,
  ToastDescription,
  Toaster,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  useToast
} from "../../index"
import { renderWithProvider, screen, userEvent, waitFor } from "../../test/test-utils"

function ToastTrigger({
  tone,
  withAction = false
}: {
  tone?: "default" | "success" | "warning" | "info" | "danger" | "error"
  withAction?: boolean
}) {
  const { toast } = useToast()

  return (
    <Button
      type="button"
      onClick={() =>
        toast({
          title: "Cadastro salvo",
          description: "As informações foram registradas com sucesso.",
          tone,
          duration: 100000,
          action: withAction ? (
            <ToastAction altText="Desfazer cadastro" asChild>
              <Button variant="outline" size="sm">
                Desfazer
              </Button>
            </ToastAction>
          ) : null
        })
      }
    >
      Disparar toast
    </Button>
  )
}

describe("Toast", () => {
  it("renderiza provider e viewport", () => {
    renderWithProvider(
      <ToastProvider>
        <ToastTitle>Título solto</ToastTitle>
        <ToastDescription>Descrição solta</ToastDescription>
        <ToastViewport data-testid="toast-viewport" />
      </ToastProvider>
    )

    expect(screen.getByTestId("toast-viewport")).toBeInTheDocument()
  })

  it("dispara toast com title e description pelo hook", async () => {
    const user = userEvent.setup()

    renderWithProvider(
      <Toaster>
        <ToastTrigger tone="success" />
      </Toaster>
    )

    await user.click(screen.getByRole("button", { name: "Disparar toast" }))

    expect(await screen.findByText("Cadastro salvo")).toBeInTheDocument()
    expect(
      screen.getByText("As informações foram registradas com sucesso.")
    ).toBeInTheDocument()
  })

  it("fecha o toast pelo botão acessível", async () => {
    const user = userEvent.setup()

    renderWithProvider(
      <Toaster>
        <ToastTrigger />
      </Toaster>
    )

    await user.click(screen.getByRole("button", { name: "Disparar toast" }))
    expect(await screen.findByText("Cadastro salvo")).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Fechar notificação" }))

    await waitFor(() => {
      expect(screen.queryByText("Cadastro salvo")).not.toBeInTheDocument()
    })
  })

  it("renderiza os tones principais com semântica adequada", async () => {
    const user = userEvent.setup()

    renderWithProvider(
      <Toaster>
        <ToastTrigger tone="danger" />
      </Toaster>
    )

    await user.click(screen.getByRole("button", { name: "Disparar toast" }))

    const toast = await screen.findByRole("alert")
    expect(toast).toHaveTextContent("Cadastro salvo")
    expect(toast).toHaveClass("bg-error-container")
  })

  it("renderiza action opcional", async () => {
    const user = userEvent.setup()

    renderWithProvider(
      <Toaster>
        <ToastTrigger tone="info" withAction />
      </Toaster>
    )

    await user.click(screen.getByRole("button", { name: "Disparar toast" }))

    expect(await screen.findByRole("button", { name: "Desfazer" })).toBeInTheDocument()
  })

  it("expõe erro claro quando useToast é usado fora do Toaster", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {})

    function BrokenConsumer() {
      useToast()
      return null
    }

    expect(() => renderWithProvider(<BrokenConsumer />)).toThrow(
      "useToast deve ser usado dentro de <Toaster>."
    )

    spy.mockRestore()
  })
})
