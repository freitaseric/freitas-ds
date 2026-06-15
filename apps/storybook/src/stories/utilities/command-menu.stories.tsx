import { Button, CommandMenu } from "@freitas-ds/react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"

const groups = [
  {
    label: "Navegação",
    items: [
      {
        value: "dashboard",
        label: "Abrir dashboard",
        description: "Ir para a visão geral",
        shortcut: "D"
      },
      {
        value: "produtores",
        label: "Listar produtores",
        description: "Consultar cadastros",
        shortcut: "P"
      }
    ]
  },
  {
    label: "Ações",
    items: [
      {
        value: "nova-os",
        label: "Nova ordem de serviço",
        description: "Criar atendimento",
        shortcut: ["⌘", "N"]
      }
    ]
  }
]

const meta = {
  title: "Utilities/CommandMenu",
  component: CommandMenu,
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof CommandMenu>

export default meta

type Story = StoryObj

export const Default: Story = {
  render: function Render() {
    const [open, setOpen] = React.useState(false)

    return (
      <>
        <Button onClick={() => setOpen(true)}>Abrir Command Menu</Button>
        <CommandMenu open={open} onOpenChange={setOpen} groups={groups} />
      </>
    )
  }
}
