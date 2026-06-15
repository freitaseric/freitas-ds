import { FormField, NativeSelect, Select } from "@freitas-ds/react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { StoryGrid, StorySurface } from "../../story-helpers/story-layout"

const options = [
  { value: "cadastro", label: "Cadastro" },
  { value: "visita", label: "Visita técnica" },
  { value: "orientacao", label: "Orientação" }
]

const meta = {
  title: "Forms/Select",
  component: Select,
  parameters: {
    layout: "padded"
  }
} satisfies Meta<typeof Select>

export default meta

type Story = StoryObj

export const NativeSelectStory: Story = {
  name: "NativeSelect",
  render: () => (
    <StorySurface>
      <FormField
        label="Tipo de organização"
        helperText="Use para listas pequenas e fixas."
      >
        <NativeSelect placeholder="Selecione" options={options} />
      </FormField>
    </StorySurface>
  )
}

export const SelectStory: Story = {
  name: "Select",
  render: () => (
    <StorySurface>
      <FormField
        label="Tipo de atendimento"
        helperText="Use para listas simples ou médias, sem busca."
      >
        <Select placeholder="Selecione" options={options} />
      </FormField>
    </StorySurface>
  )
}

export const Difference: Story = {
  render: () => (
    <StoryGrid>
      <StorySurface>
        <h3 className="h3">NativeSelect</h3>
        <p className="mb-4 body-sm text-muted">
          Pequenas listas fixas com controle nativo.
        </p>
        <NativeSelect placeholder="Selecione" options={options} />
      </StorySurface>
      <StorySurface>
        <h3 className="h3">Select</h3>
        <p className="mb-4 body-sm text-muted">Listas simples com visual customizado.</p>
        <Select placeholder="Selecione" options={options} />
      </StorySurface>
    </StoryGrid>
  )
}
