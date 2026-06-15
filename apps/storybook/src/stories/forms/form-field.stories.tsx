import { FormField, Input, Textarea } from "@freitas-ds/react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { StoryGrid, StorySurface } from "../../story-helpers/story-layout"

const meta = {
  title: "Forms/FormField",
  component: FormField,
  parameters: {
    layout: "padded"
  }
} satisfies Meta<typeof FormField>

export default meta

type Story = StoryObj

export const HelperText: Story = {
  render: () => (
    <StorySurface>
      <FormField label="Localidade" helperText="Ex: Serra Grande, Taboca ou Confiança.">
        <Input placeholder="Digite a localidade" />
      </FormField>
    </StorySurface>
  )
}

export const ErrorState: Story = {
  render: () => (
    <StorySurface>
      <FormField label="CPF" error="CPF inválido">
        <Input placeholder="000.000.000-00" />
      </FormField>
    </StorySurface>
  )
}

export const Required: Story = {
  render: () => (
    <StoryGrid>
      <StorySurface>
        <FormField label="Nome completo" required>
          <Input placeholder="Nome do produtor" />
        </FormField>
      </StorySurface>
      <StorySurface>
        <FormField label="Observações">
          <Textarea placeholder="Digite informações adicionais..." />
        </FormField>
      </StorySurface>
    </StoryGrid>
  )
}
