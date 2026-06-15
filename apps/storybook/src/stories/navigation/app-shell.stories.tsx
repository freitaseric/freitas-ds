import {
  AppShell,
  AppShellContent,
  Badge,
  Button,
  Card,
  CardContent,
  PageHeader,
  Sidebar,
  SidebarBrand,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarNavItem,
  SidebarSection,
  Topbar
} from "@freitas-ds/react"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "Navigation/AppShell",
  component: AppShell,
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta<typeof AppShell>

export default meta

type Story = StoryObj

export const Default: Story = {
  render: () => (
    <div className="h-[600px] overflow-hidden">
      <AppShell
        sidebar={
          <Sidebar>
            <SidebarHeader>
              <SidebarBrand title="Freitas DS" description="Dashboard" icon="F" />
            </SidebarHeader>
            <SidebarContent>
              <SidebarSection title="Menu">
                <SidebarNavItem active>Atendimentos</SidebarNavItem>
                <SidebarNavItem>Produtores</SidebarNavItem>
                <SidebarNavItem>Relatórios</SidebarNavItem>
              </SidebarSection>
            </SidebarContent>
            <SidebarFooter>
              <Badge>v0.1.0</Badge>
            </SidebarFooter>
          </Sidebar>
        }
        topbar={
          <Topbar
            start={<p className="body-sm font-medium">Catálogo visual</p>}
            end={<Button size="sm">Nova OS</Button>}
          />
        }
        className="h-[600px]"
      >
        <AppShellContent>
          <PageHeader
            title="Atendimentos"
            description="Exemplo de layout administrativo."
          />
          <Card>
            <CardContent>Conteúdo principal da página.</CardContent>
          </Card>
        </AppShellContent>
      </AppShell>
    </div>
  )
}
