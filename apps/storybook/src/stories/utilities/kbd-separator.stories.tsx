import { Kbd, Separator } from "@freitas-ds/react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { StoryRow, StorySurface } from "../../story-helpers/story-layout"

const meta = {
  title: "Utilities/Kbd e Separator",
  parameters: {
    layout: "centered"
  }
} satisfies Meta

export default meta

type Story = StoryObj

export const Default: Story = {
  render: () => (
    <StorySurface>
      <div className="grid gap-4">
        <StoryRow>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
          <span className="body-sm text-muted">Abrir menu de comandos</span>
        </StoryRow>
        <Separator />
        <p className="body-sm text-muted">Separadores organizam blocos relacionados.</p>
      </div>
    </StorySurface>
  )
}
