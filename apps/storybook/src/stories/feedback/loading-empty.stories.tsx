import { Button, EmptyState, Skeleton, Spinner } from "@freitas-ds/react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { StoryGrid, StoryRow, StorySurface } from "../../story-helpers/story-layout"

const meta = {
  title: "Feedback/Loading e Empty",
  parameters: {
    layout: "padded"
  }
} satisfies Meta

export default meta

type Story = StoryObj

export const LoadingAndEmpty: Story = {
  render: () => (
    <StoryGrid>
      <StorySurface>
        <h3 className="mb-4 h3">Spinner</h3>
        <StoryRow>
          <Spinner size="sm" tone="primary" />
          <Spinner size="md" tone="info" />
          <Spinner size="lg" tone="success" />
        </StoryRow>
      </StorySurface>
      <StorySurface>
        <h3 className="mb-4 h3">Skeleton</h3>
        <div className="grid gap-3">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-5 w-64" />
        </div>
      </StorySurface>
      <EmptyState
        title="Nenhum atendimento encontrado"
        description="Ajuste os filtros ou crie um novo atendimento para começar."
        action={<Button>Novo atendimento</Button>}
      />
    </StoryGrid>
  )
}
