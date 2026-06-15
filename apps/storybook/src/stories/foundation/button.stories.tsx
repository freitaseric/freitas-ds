import { Button } from "@freitas-ds/react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { StoryRow, StorySection, StorySurface } from "../../story-helpers/story-layout"

const meta = {
  title: "Foundation/Button",
  component: Button,
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj

export const Default: Story = {
  render: () => <Button>Salvar</Button>
}

export const Variants: Story = {
  render: () => (
    <StoryRow>
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </StoryRow>
  )
}

export const Sizes: Story = {
  render: () => (
    <StoryRow>
      <Button size="sm">Pequeno</Button>
      <Button size="md">Médio</Button>
      <Button size="lg">Grande</Button>
    </StoryRow>
  )
}

export const Loading: Story = {
  render: () => <Button loading>Salvar</Button>
}

export const Disabled: Story = {
  render: () => <Button disabled>Indisponível</Button>
}

export const FullWidth: Story = {
  parameters: {
    layout: "padded"
  },
  render: () => (
    <StorySurface>
      <Button fullWidth>Continuar</Button>
    </StorySurface>
  )
}

export const WithIcon: Story = {
  render: () => (
    <Button>
      <span aria-hidden="true">+</span>
      Novo registro
    </Button>
  )
}

export const All: Story = {
  parameters: {
    layout: "padded"
  },
  render: () => (
    <StorySection title="Botões">
      <StoryRow>
        <Button>Salvar</Button>
        <Button variant="outline">Cancelar</Button>
        <Button variant="danger">Excluir</Button>
      </StoryRow>
    </StorySection>
  )
}
