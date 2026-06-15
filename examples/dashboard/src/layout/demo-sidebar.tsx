import {
  Sidebar,
  SidebarBrand,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarNavItem,
  SidebarSection
} from "@freitas-ds/react"
import {
  BarChart3,
  FileText,
  LayoutDashboard,
  Settings,
  Sprout,
  Users
} from "lucide-react"

export function DemoSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarBrand
          title="Freitas DS"
          description="Admin preview"
          icon={<Sprout className="size-5" />}
        />
      </SidebarHeader>

      <SidebarContent>
        <SidebarSection title="Principal">
          <SidebarNavItem active icon={<LayoutDashboard className="size-4" />}>
            Dashboard
          </SidebarNavItem>

          <SidebarNavItem icon={<Users className="size-4" />}>Produtores</SidebarNavItem>

          <SidebarNavItem icon={<FileText className="size-4" />}>
            Atendimentos
          </SidebarNavItem>

          <SidebarNavItem icon={<BarChart3 className="size-4" />}>
            Relatórios
          </SidebarNavItem>
        </SidebarSection>

        <div className="h-6" />

        <SidebarSection title="Sistema">
          <SidebarNavItem icon={<Settings className="size-4" />}>
            Configurações
          </SidebarNavItem>
        </SidebarSection>
      </SidebarContent>

      <SidebarFooter>
        <div className="rounded-fds-md border border-border bg-surface-container p-3">
          <p className="body-sm font-medium">v0.1</p>
          <p className="caption text-muted">Freitas DS em desenvolvimento.</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
