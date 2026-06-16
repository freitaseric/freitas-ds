import { Button, ToastAction, Toaster, type ToastTone, useToast } from "@freitas-ds/react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { StoryGrid, StorySurface } from "../../story-helpers/story-layout"

const meta: Meta = {
  title: "Feedback/Toast",
  parameters: {
    layout: "padded"
  },
  decorators: [
    (Story) => (
      <Toaster>
        <Story />
      </Toaster>
    )
  ]
}

export default meta

type Story = StoryObj

function ToastButton({
  tone,
  label,
  withAction = false
}: {
  tone?: ToastTone
  label: string
  withAction?: boolean
}) {
  const { toast } = useToast()

  return (
    <Button
      type="button"
      variant={tone === "danger" || tone === "error" ? "danger" : "primary"}
      onClick={() =>
        toast({
          title: label,
          description: "As informações foram registradas com sucesso.",
          tone,
          action: withAction ? (
            <ToastAction altText="Desfazer ação" asChild>
              <Button variant="outline" size="sm">
                Desfazer
              </Button>
            </ToastAction>
          ) : undefined
        })
      }
    >
      {label}
    </Button>
  )
}

export const Default: Story = {
  render: () => (
    <StorySurface>
      <ToastButton label="Toast padrão" />
    </StorySurface>
  )
}

export const Success: Story = {
  render: () => (
    <StorySurface>
      <ToastButton tone="success" label="Cadastro salvo" />
    </StorySurface>
  )
}

export const Warning: Story = {
  render: () => (
    <StorySurface>
      <ToastButton tone="warning" label="Atenção ao prazo" />
    </StorySurface>
  )
}

export const Info: Story = {
  render: () => (
    <StorySurface>
      <ToastButton tone="info" label="Nova atualização" />
    </StorySurface>
  )
}

export const Danger: Story = {
  render: () => (
    <StorySurface>
      <ToastButton tone="danger" label="Falha ao salvar" />
    </StorySurface>
  )
}

export const WithAction: Story = {
  render: () => (
    <StorySurface>
      <ToastButton tone="success" label="Cadastro salvo" withAction />
    </StorySurface>
  )
}

export const MultipleToasts: Story = {
  render: () => (
    <StoryGrid>
      <ToastButton tone="success" label="Sucesso" />
      <ToastButton tone="warning" label="Aviso" />
      <ToastButton tone="info" label="Informação" />
      <ToastButton tone="danger" label="Erro" />
    </StoryGrid>
  )
}
