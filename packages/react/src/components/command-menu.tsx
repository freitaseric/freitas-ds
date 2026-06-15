import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"
import * as React from "react"

import { cn } from "../utils/cn"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "./dialog"
import { Kbd } from "./kbd"

export type CommandMenuItem = {
  value: string
  label: string
  description?: string
  icon?: React.ReactNode
  shortcut?: string | string[]
  disabled?: boolean
  keywords?: string[]
  onSelect?: () => void
}

export type CommandMenuGroup = {
  label: string
  items: CommandMenuItem[]
}

export type CommandMenuProps = {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void

  title?: string
  description?: string
  placeholder?: string
  emptyMessage?: string

  groups: CommandMenuGroup[]
  closeOnSelect?: boolean
}

export function CommandMenu({
  open,
  defaultOpen = false,
  onOpenChange,
  title = "Menu de comandos",
  description = "Busque telas e execute ações rápidas.",
  placeholder = "Buscar comando, tela ou ação...",
  emptyMessage = "Nenhum comando encontrado.",
  groups,
  closeOnSelect = true
}: CommandMenuProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)

  const currentOpen = open ?? internalOpen

  function handleOpenChange(nextOpen: boolean) {
    if (open === undefined) {
      setInternalOpen(nextOpen)
    }

    onOpenChange?.(nextOpen)
  }

  function handleSelect(item: CommandMenuItem) {
    item.onSelect?.()

    if (closeOnSelect) {
      handleOpenChange(false)
    }
  }

  return (
    <Dialog open={currentOpen} onOpenChange={handleOpenChange}>
      <DialogContent showCloseButton={false} className="max-w-2xl overflow-hidden p-0">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <DialogDescription className="sr-only">{description}</DialogDescription>

        <CommandPrimitive
          loop
          className="flex max-h-[70dvh] flex-col overflow-hidden bg-popover text-popover-foreground"
        >
          <div className="flex items-center border-b border-border px-4">
            <Search
              aria-hidden="true"
              className="mr-3 size-4 shrink-0 text-muted-foreground"
            />

            <CommandPrimitive.Input
              placeholder={placeholder}
              className={cn(
                "h-12 w-full bg-transparent py-3 body-sm outline-none",
                "placeholder:text-muted-foreground",
                "disabled:cursor-not-allowed disabled:opacity-50"
              )}
            />
          </div>

          <CommandPrimitive.List className="max-h-[26rem] overflow-y-auto overflow-x-hidden p-2">
            <CommandPrimitive.Empty className="px-4 py-10 text-center body-sm text-muted">
              {emptyMessage}
            </CommandPrimitive.Empty>

            {groups.map((group) => (
              <CommandPrimitive.Group
                key={group.label}
                heading={group.label}
                className={cn(
                  "overflow-hidden",
                  "[&_[cmdk-group-heading]]:px-2",
                  "[&_[cmdk-group-heading]]:py-2",
                  "[&_[cmdk-group-heading]]:caption",
                  "[&_[cmdk-group-heading]]:mono",
                  "[&_[cmdk-group-heading]]:uppercase",
                  "[&_[cmdk-group-heading]]:tracking-[0.12em]",
                  "[&_[cmdk-group-heading]]:text-muted"
                )}
              >
                {group.items.map((item) => (
                  <CommandPrimitive.Item
                    key={item.value}
                    value={item.value}
                    keywords={[
                      item.label,
                      item.description ?? "",
                      ...(item.keywords ?? [])
                    ]}
                    disabled={item.disabled}
                    onSelect={() => handleSelect(item)}
                    className={cn(
                      "relative flex cursor-default select-none items-center gap-3 rounded-fds-md px-3 py-2.5",
                      "body-sm outline-none transition-colors duration-100",
                      "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground",
                      "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50"
                    )}
                  >
                    {item.icon ? (
                      <span className="flex size-4 shrink-0 items-center justify-center text-muted-foreground">
                        {item.icon}
                      </span>
                    ) : null}

                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate font-medium">{item.label}</span>

                      {item.description ? (
                        <span className="truncate caption text-muted">
                          {item.description}
                        </span>
                      ) : null}
                    </span>

                    {item.shortcut ? (
                      <span className="ml-auto flex shrink-0 items-center gap-1">
                        {Array.isArray(item.shortcut) ? (
                          item.shortcut.map((key) => <Kbd key={key}>{key}</Kbd>)
                        ) : (
                          <Kbd>{item.shortcut}</Kbd>
                        )}
                      </span>
                    ) : null}
                  </CommandPrimitive.Item>
                ))}
              </CommandPrimitive.Group>
            ))}
          </CommandPrimitive.List>
        </CommandPrimitive>
      </DialogContent>
    </Dialog>
  )
}
