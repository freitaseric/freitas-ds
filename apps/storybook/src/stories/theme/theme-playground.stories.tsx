import { Card, CardContent, CardHeader } from "@freitas-ds/react"
import type { Meta, StoryObj } from "@storybook/react-vite"

const colors = [
  { name: "Primary", className: "bg-primary text-on-primary" },
  { name: "Secondary", className: "bg-secondary text-on-secondary" },
  { name: "Tertiary", className: "bg-tertiary text-on-tertiary" },
  { name: "Success", className: "bg-success text-on-success" },
  { name: "Warning", className: "bg-warning text-on-warning" },
  { name: "Info", className: "bg-info text-on-info" },
  { name: "Error", className: "bg-error text-on-error" }
]

const meta = {
  title: "Theme/Theme Playground",
  parameters: {
    layout: "padded"
  }
} satisfies Meta

export default meta

type Story = StoryObj

export const Tokens: Story = {
  render: () => (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <h2 className="h2">Tema do Freitas DS</h2>
          <p className="body-sm text-muted">
            Altere o modo e a seed color pela toolbar global do Storybook.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {colors.map((color) => (
              <div key={color.name} className={`rounded-fds-lg p-5 ${color.className}`}>
                <p className="body-sm font-semibold">{color.name}</p>
                <p className="caption opacity-80">Token semântico</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
