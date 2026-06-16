import { Button, Combobox, FormField } from "@freitas-ds/react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { StorySurface } from "../../story-helpers/story-layout"

const producers = [
  { value: "joao", label: "João da Silva", description: "CPF: 000.000.000-00" },
  { value: "maria", label: "Maria dos Santos", description: "CPF: 111.111.111-11" },
  { value: "ana", label: "Ana Paiva", description: "Comunidade Malacacheta" }
]

const grouped = [
  {
    label: "Serra Grande",
    options: [
      { value: "joao", label: "João da Silva", description: "Serra Grande 1" },
      { value: "antonio", label: "Antônio Freitas", description: "Serra Grande 2" }
    ]
  },
  {
    label: "Comunidades indígenas",
    options: [
      { value: "ana", label: "Ana Paiva", description: "Malacacheta" },
      { value: "maria", label: "Maria dos Santos", description: "Canauanim" }
    ]
  }
]

const meta = {
  title: "Forms/Combobox",
  component: Combobox,
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof Combobox>

export default meta

type Story = StoryObj

export const Default: Story = {
  render: () => (
    <StorySurface>
      <Combobox placeholder="Selecione o produtor" options={producers} />
    </StorySurface>
  )
}

export const WithDescriptions: Story = {
  render: () => (
    <StorySurface>
      <FormField
        label="Produtor atendido"
        helperText="Busque por nome, CPF ou localidade."
        required
      >
        <Combobox
          placeholder="Selecione o produtor"
          searchPlaceholder="Buscar produtor..."
          options={producers}
        />
      </FormField>
    </StorySurface>
  )
}

export const GroupedOptions: Story = {
  render: () => (
    <StorySurface>
      <Combobox
        placeholder="Selecione por região"
        searchPlaceholder="Buscar produtor..."
        options={grouped}
      />
    </StorySurface>
  )
}

export const WithActions: Story = {
  render: () => (
    <StorySurface>
      <Combobox
        placeholder="Selecione o produtor"
        options={producers}
        actions={
          <Button type="button" variant="ghost" size="sm" fullWidth>
            + Cadastrar novo produtor
          </Button>
        }
      />
    </StorySurface>
  )
}
