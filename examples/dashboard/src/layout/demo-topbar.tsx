import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Kbd,
  Sheet,
  SheetContent,
  SheetTrigger,
  Tooltip,
  Topbar,
  UserMenu
} from "@freitas-ds/react"
import { Bell, Home, LogOut, Menu, Search, Settings, User } from "lucide-react"
import { cnCommandButton } from "../lib/demo-helpers"
import { DemoSidebar } from "./demo-sidebar"

export type DemoTopbarProps = {
  onOpenCommand: () => void
}

export function DemoTopbar({ onOpenCommand }: DemoTopbarProps) {
  return (
    <Topbar
      start={
        <div className="flex min-w-0 items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                aria-label="Abrir menu"
              >
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-72 p-0" showCloseButton={false}>
              <DemoSidebar />
            </SheetContent>
          </Sheet>

          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">
                  <Home className="size-4" />
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbLink href="#">Sistemas</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      }
      center={
        <button type="button" onClick={onOpenCommand} className={cnCommandButton()}>
          <span className="flex min-w-0 items-center gap-2">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <span className="truncate">Buscar ou executar ação...</span>
          </span>

          <span className="ml-auto hidden items-center gap-1 sm:flex">
            <Kbd>Ctrl</Kbd>
            <Kbd>K</Kbd>
          </span>
        </button>
      }
      end={
        <>
          <Tooltip content="Notificações">
            <Button variant="ghost" size="sm" aria-label="Notificações">
              <Bell className="size-4" />
            </Button>
          </Tooltip>

          <UserMenu
            name="Eric Freitas"
            email="ericfreitas371@gmail.com"
            items={[
              {
                label: "Perfil",
                icon: <User className="size-4" />
              },
              {
                label: "Configurações",
                icon: <Settings className="size-4" />,
                shortcut: "⌘,"
              }
            ]}
            footerItems={[
              {
                label: "Sair",
                icon: <LogOut className="size-4" />,
                tone: "danger"
              }
            ]}
          />
        </>
      }
    />
  )
}
