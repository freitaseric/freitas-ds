import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "@freitas-ds/react"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "Navigation/DropdownMenu",
  component: DropdownMenu,
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof DropdownMenu>

export default meta

type Story = StoryObj

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Abrir menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuItem>
          Editar
          <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>Duplicar</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem tone="danger">Excluir</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
