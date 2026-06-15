import { FormField, Input } from "@freitas-ds/react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { StorySection, StorySurface } from "../../story-helpers/story-layout"

const meta = {
  title: "Forms/Input",
  component: Input,
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj

export const Default: Story = {
  render: () => <Input placeholder="Digite o nome" className="w-80" />
}

export const Disabled: Story = {
  render: () => <Input disabled placeholder="Campo desabilitado" className="w-80" />
}

export const ErrorState: Story = {
  render: () => <Input state="error" placeholder="000.000.000-00" className="w-80" />
}

export const WithFormField: Story = {
  render: () => (
    <StorySurface>
      <StorySection title="Campo com label">
        <FormField
          label="Nome completo"
          helperText="Informe o nome usado no cadastro."
          required
        >
          <Input placeholder="Ex: João da Silva" />
        </FormField>
      </StorySection>
    </StorySurface>
  )
}
