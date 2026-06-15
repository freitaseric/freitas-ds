import { CheckboxField, RadioGroup, SwitchField } from "@freitas-ds/react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { StoryGrid, StorySurface } from "../../story-helpers/story-layout"

const meta = {
  title: "Forms/Controls",
  parameters: {
    layout: "padded"
  }
} satisfies Meta

export default meta

type Story = StoryObj

export const Controls: Story = {
  render: () => (
    <StoryGrid>
      <StorySurface>
        <CheckboxField
          label="Receber notificações"
          description="Enviar avisos sobre novos atendimentos."
          defaultChecked
        />
      </StorySurface>
      <StorySurface>
        <RadioGroup
          defaultValue="manha"
          options={[
            { value: "manha", label: "Manhã", description: "08h às 12h" },
            { value: "tarde", label: "Tarde", description: "14h às 18h" }
          ]}
        />
      </StorySurface>
      <StorySurface>
        <SwitchField
          label="Modo de fiscalização"
          description="Ativa campos adicionais no formulário."
          defaultChecked
        />
      </StorySurface>
    </StoryGrid>
  )
}
