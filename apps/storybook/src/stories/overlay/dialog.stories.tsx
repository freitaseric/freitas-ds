import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  FormField,
  Input
} from "@freitas-ds/react"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "Overlay/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof Dialog>

export default meta

type Story = StoryObj

export const WithForm: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Abrir formulário</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo produtor</DialogTitle>
          <DialogDescription>Cadastre rapidamente um produtor rural.</DialogDescription>
        </DialogHeader>
        <FormField label="Nome completo">
          <Input placeholder="Ex: João da Silva" />
        </FormField>
        <DialogFooter>
          <Button variant="outline">Cancelar</Button>
          <Button>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
