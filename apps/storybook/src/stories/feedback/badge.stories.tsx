import { Badge } from "@freitas-ds/react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { StoryRow, StorySection } from "../../story-helpers/story-layout"

const tones = [
  "neutral",
  "primary",
  "secondary",
  "success",
  "warning",
  "info",
  "danger"
] as const
const variants = ["soft", "outline", "solid"] as const

const meta = {
  title: "Feedback/Badge",
  component: Badge,
  parameters: {
    layout: "padded"
  }
} satisfies Meta<typeof Badge>

export default meta

type Story = StoryObj

export const Tones: Story = {
  render: () => (
    <StoryRow>
      {tones.map((tone) => (
        <Badge key={tone} tone={tone}>
          {tone}
        </Badge>
      ))}
    </StoryRow>
  )
}

export const Variants: Story = {
  render: () => (
    <div className="grid gap-6">
      {variants.map((variant) => (
        <StorySection key={variant} title={variant}>
          <StoryRow>
            {tones.map((tone) => (
              <Badge key={tone} tone={tone} variant={variant}>
                {tone}
              </Badge>
            ))}
          </StoryRow>
        </StorySection>
      ))}
    </div>
  )
}
