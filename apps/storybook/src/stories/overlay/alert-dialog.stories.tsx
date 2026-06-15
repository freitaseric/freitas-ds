import {
  AlertDialog,
  AlertDialogActionButton,
  AlertDialogCancelButton,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button
} from "@freitas-ds/react"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "Overlay/AlertDialog",
  component: AlertDialog,
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof AlertDialog>

export default meta

type Story = StoryObj

export const DeleteConfirmation: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="danger">Excluir cadastro</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir este cadastro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita e removerá o registro da listagem.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancelButton>Cancelar</AlertDialogCancelButton>
          <AlertDialogActionButton>Excluir</AlertDialogActionButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
