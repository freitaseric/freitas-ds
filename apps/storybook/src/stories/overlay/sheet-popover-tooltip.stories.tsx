import {
  Button,
  FormField,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Tooltip
} from "@freitas-ds/react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { StoryRow } from "../../story-helpers/story-layout"

const meta = {
  title: "Overlay/Sheet Popover Tooltip",
  parameters: {
    layout: "centered"
  }
} satisfies Meta

export default meta

type Story = StoryObj

export const All: Story = {
  render: () => (
    <StoryRow>
      <Sheet>
        <SheetTrigger asChild>
          <Button>Abrir painel</Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col p-6">
          <SheetHeader>
            <SheetTitle>Filtros avançados</SheetTitle>
            <SheetDescription>Ajuste os filtros usados na listagem.</SheetDescription>
          </SheetHeader>
          <FormField label="Comunidade">
            <Input placeholder="Digite uma comunidade" />
          </FormField>
          <SheetFooter>
            <Button>Aplicar filtros</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Filtros rápidos</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="grid gap-3">
            <h3 className="h3">Filtros</h3>
            <Button size="sm">Somente pendentes</Button>
            <Button size="sm" variant="outline">
              Limpar filtros
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <Tooltip content="Cria uma nova ordem de serviço">
        <Button variant="ghost">Passe o mouse</Button>
      </Tooltip>
    </StoryRow>
  )
}
