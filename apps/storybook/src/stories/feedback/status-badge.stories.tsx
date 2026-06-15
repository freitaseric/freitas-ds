import { StatusBadge } from "@freitas-ds/react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { StoryRow } from "../../story-helpers/story-layout"

const statuses = [
  "active",
  "inactive",
  "pending",
  "completed",
  "canceled",
  "draft",
  "blocked",
  "archived"
] as const

const meta = {
  title: "Feedback/StatusBadge",
  component: StatusBadge,
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof StatusBadge>

export default meta

type Story = StoryObj

export const AllStatuses: Story = {
  render: () => (
    <StoryRow>
      {statuses.map((status) => (
        <StatusBadge key={status} status={status} />
      ))}
    </StoryRow>
  )
}
