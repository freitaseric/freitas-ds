import { Calendar } from "@freitas-ds/react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"

import { StoryGrid, StorySurface } from "../../story-helpers/story-layout"

const meta = {
  title: "Forms/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof Calendar>

export default meta

type Story = StoryObj

export const Default: Story = {
  render: () => (
    <StorySurface>
      <Calendar mode="single" />
    </StorySurface>
  )
}

export const SelectedDate: Story = {
  render: function Render() {
    const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 5, 15))

    return (
      <StorySurface>
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </StorySurface>
    )
  }
}

export const DisabledDates: Story = {
  render: () => (
    <StoryGrid>
      <StorySurface>
        <Calendar
          mode="single"
          defaultMonth={new Date(2026, 5, 1)}
          disabled={[{ before: new Date(2026, 5, 10) }, { dayOfWeek: [0, 6] }]}
        />
      </StorySurface>
    </StoryGrid>
  )
}
