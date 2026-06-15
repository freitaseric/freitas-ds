import { Pagination } from "@freitas-ds/react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"

import { StorySurface } from "../../story-helpers/story-layout"

const meta = {
  title: "Data Display/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof Pagination>

export default meta

type Story = StoryObj

export const Controlled: Story = {
  render: function Render() {
    const [page, setPage] = React.useState(3)

    return (
      <StorySurface>
        <Pagination page={page} totalPages={12} onPageChange={setPage} />
      </StorySurface>
    )
  }
}
