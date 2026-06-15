import {
  Card,
  CardContent,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@freitas-ds/react"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "Navigation/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof Tabs>

export default meta

type Story = StoryObj

export const ThreeTabs: Story = {
  render: () => (
    <Tabs defaultValue="dados" className="w-[520px]">
      <TabsList>
        <TabsTrigger value="dados">Dados</TabsTrigger>
        <TabsTrigger value="documentos">Documentos</TabsTrigger>
        <TabsTrigger value="historico">Histórico</TabsTrigger>
      </TabsList>
      <TabsContent value="dados">
        <Card>
          <CardContent>Dados cadastrais do produtor.</CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="documentos">
        <Card>
          <CardContent>Documentos anexados ao atendimento.</CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="historico">
        <Card>
          <CardContent>Histórico de movimentações e visitas.</CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
