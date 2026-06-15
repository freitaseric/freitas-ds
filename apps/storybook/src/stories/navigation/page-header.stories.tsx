import { Button, PageHeader } from "@freitas-ds/react"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "Navigation/PageHeader",
  component: PageHeader,
  parameters: {
    layout: "padded"
  }
} satisfies Meta<typeof PageHeader>

export default meta

type Story = StoryObj

export const Default: Story = {
  render: () => (
    <PageHeader
      eyebrow="Dashboard"
      title="Atendimentos"
      description="Acompanhe ordens de serviço, visitas e cadastros em andamento."
    />
  )
}

export const WithActions: Story = {
  render: () => (
    <PageHeader
      eyebrow="Produtores"
      title="Cadastro rural"
      description="Gerencie produtores e propriedades vinculadas."
      actions={
        <>
          <Button variant="outline">Exportar</Button>
          <Button>Novo produtor</Button>
        </>
      }
    />
  )
}
