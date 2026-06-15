import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  StatusBadge
} from "@freitas-ds/react"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "Foundation/Card",
  component: Card,
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardContent>
        Cards agrupam conteúdo relacionado em uma superfície consistente.
      </CardContent>
    </Card>
  )
}

export const WithHeaderAndFooter: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <p className="caption mono text-muted">CADASTRO</p>
        <h2 className="h3">Produtor rural</h2>
      </CardHeader>
      <CardContent>
        <p className="body-sm text-muted">
          Revise as informações antes de salvar o cadastro.
        </p>
      </CardContent>
      <CardFooter>
        <Button>Salvar</Button>
        <Button variant="outline">Cancelar</Button>
      </CardFooter>
    </Card>
  )
}

export const DashboardCard: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="caption mono text-muted">ATENDIMENTOS</p>
            <h2 className="h2">128</h2>
          </div>
          <StatusBadge status="active" label="Em dia" />
        </div>
      </CardHeader>
      <CardContent>
        <p className="body-sm text-muted">Volume registrado no mês atual.</p>
      </CardContent>
    </Card>
  )
}
