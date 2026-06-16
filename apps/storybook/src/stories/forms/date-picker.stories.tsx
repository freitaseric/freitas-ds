import {
  DatePicker,
  DateRangePicker,
  type DateRangeValue,
  FormField
} from "@freitas-ds/react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"

import { StoryGrid, StorySurface } from "../../story-helpers/story-layout"

const meta = {
  title: "Forms/DatePicker",
  parameters: {
    layout: "centered"
  }
} satisfies Meta

export default meta

type Story = StoryObj

export const Default: Story = {
  render: () => (
    <StorySurface>
      <div className="w-80">
        <DatePicker />
      </div>
    </StorySurface>
  )
}

export const WithValue: Story = {
  render: () => (
    <StorySurface>
      <div className="w-80">
        <DatePicker defaultValue={new Date(2026, 5, 15)} />
      </div>
    </StorySurface>
  )
}

export const Disabled: Story = {
  render: () => (
    <StorySurface>
      <div className="w-80">
        <DatePicker disabled defaultValue={new Date(2026, 5, 15)} />
      </div>
    </StorySurface>
  )
}

export const WithFormField: Story = {
  render: () => (
    <StorySurface>
      <div className="w-80">
        <FormField
          label="Data de atendimento"
          helperText="Use o formato dd/MM/yyyy."
          required
        >
          <DatePicker />
        </FormField>
      </div>
    </StorySurface>
  )
}

export const ErrorState: Story = {
  render: () => (
    <StorySurface>
      <div className="w-80">
        <FormField label="Data obrigatória" error="Informe uma data válida." required>
          <DatePicker />
        </FormField>
      </div>
    </StorySurface>
  )
}

export const DateRangeDefault: Story = {
  render: function Render() {
    const [range, setRange] = React.useState<DateRangeValue | undefined>()

    return (
      <StorySurface>
        <div className="w-96">
          <DateRangePicker value={range} onValueChange={setRange} />
        </div>
      </StorySurface>
    )
  }
}

export const DateRangeWithValue: Story = {
  render: () => (
    <StorySurface>
      <div className="w-96">
        <DateRangePicker
          defaultValue={{ from: new Date(2026, 5, 10), to: new Date(2026, 5, 15) }}
        />
      </div>
    </StorySurface>
  )
}

export const DateRangeDisabled: Story = {
  render: () => (
    <StoryGrid>
      <StorySurface>
        <div className="w-96">
          <DateRangePicker
            disabled
            defaultValue={{ from: new Date(2026, 5, 10), to: new Date(2026, 5, 15) }}
          />
        </div>
      </StorySurface>
    </StoryGrid>
  )
}
