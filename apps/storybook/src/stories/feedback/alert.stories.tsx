import { Alert } from "@freitas-ds/react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { StoryGrid } from "../../story-helpers/story-layout"

const tones = ["neutral", "info", "success", "warning", "danger"] as const

const meta = {
  title: "Feedback/Alert",
  component: Alert,
  parameters: {
    layout: "padded"
  }
} satisfies Meta<typeof Alert>

export default meta

type Story = StoryObj

export const All: Story = {
  render: () => (
    <StoryGrid>
      {tones.map((tone) => (
        <Alert
          key={tone}
          tone={tone}
          title={`Alerta ${tone}`}
          description="Mensagem contextual para orientar o usuário."
        />
      ))}
    </StoryGrid>
  )
}
