import { Avatar, AvatarFallback, AvatarImage, UserMenu } from "@freitas-ds/react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { StoryRow, StorySurface } from "../../story-helpers/story-layout"

const meta = {
  title: "Utilities/Avatar e UserMenu",
  parameters: {
    layout: "centered"
  }
} satisfies Meta

export default meta

type Story = StoryObj

export const Default: Story = {
  render: () => (
    <StorySurface>
      <StoryRow>
        <Avatar>
          <AvatarImage src="" alt="Eric Freitas" />
          <AvatarFallback>EF</AvatarFallback>
        </Avatar>
        <UserMenu name="Eric Freitas" email="contato@freitaseric.com" />
      </StoryRow>
    </StorySurface>
  )
}
