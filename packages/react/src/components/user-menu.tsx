import { LogOut, Settings, User } from "lucide-react"
import type * as React from "react"

import { Avatar, AvatarFallback, AvatarImage, getInitials } from "./avatar"
import { Button } from "./button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "./dropdown-menu"

export type UserMenuItem = {
  label: string
  icon?: React.ReactNode
  shortcut?: React.ReactNode
  disabled?: boolean
  tone?: "default" | "danger"
  onSelect?: () => void
}

export type UserMenuProps = {
  name: string
  email?: string
  avatarUrl?: string
  initials?: string
  items?: UserMenuItem[]
  footerItems?: UserMenuItem[]
}

const defaultItems: UserMenuItem[] = [
  {
    label: "Perfil",
    icon: <User className="size-4" />
  },
  {
    label: "Configurações",
    icon: <Settings className="size-4" />,
    shortcut: "⌘,"
  }
]

const defaultFooterItems: UserMenuItem[] = [
  {
    label: "Sair",
    icon: <LogOut className="size-4" />,
    tone: "danger"
  }
]

export function UserMenu({
  name,
  email,
  avatarUrl,
  initials,
  items = defaultItems,
  footerItems = defaultFooterItems
}: UserMenuProps) {
  const fallback = initials ?? getInitials(name)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-10 gap-3 px-2">
          <Avatar className="size-7">
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback className="text-xs">{fallback}</AvatarFallback>
          </Avatar>

          <span className="hidden min-w-0 flex-col items-start sm:flex">
            <span className="max-w-32 truncate text-sm font-medium leading-4">
              {name}
            </span>

            {email ? (
              <span className="max-w-32 truncate text-xs font-normal leading-4 text-muted-foreground">
                {email}
              </span>
            ) : null}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>
          <div className="flex min-w-0 items-center gap-3">
            <Avatar className="size-9">
              <AvatarImage src={avatarUrl} alt={name} />
              <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>

            <div className="min-w-0">
              <p className="truncate body-sm font-semibold normal-case tracking-normal text-on-surface">
                {name}
              </p>

              {email ? (
                <p className="truncate caption normal-case tracking-normal text-muted">
                  {email}
                </p>
              ) : null}
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {items.map((item) => (
          <DropdownMenuItem
            key={item.label}
            disabled={item.disabled}
            tone={item.tone}
            onSelect={item.onSelect}
          >
            {item.icon}
            {item.label}

            {item.shortcut ? (
              <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
            ) : null}
          </DropdownMenuItem>
        ))}

        {footerItems.length > 0 ? (
          <>
            <DropdownMenuSeparator />

            {footerItems.map((item) => (
              <DropdownMenuItem
                key={item.label}
                disabled={item.disabled}
                tone={item.tone}
                onSelect={item.onSelect}
              >
                {item.icon}
                {item.label}

                {item.shortcut ? (
                  <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
                ) : null}
              </DropdownMenuItem>
            ))}
          </>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
