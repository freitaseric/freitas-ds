import { X } from "lucide-react"
import type * as React from "react"

import { cn } from "../utils/cn"

export type ActionBarProps = React.HTMLAttributes<HTMLDivElement> & {
  selectedCount: number
  label?: React.ReactNode
  onClearSelection?: () => void
}

export function ActionBar({
  selectedCount,
  label,
  onClearSelection,
  className,
  children,
  ...props
}: ActionBarProps) {
  if (selectedCount <= 0) {
    return null
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-fds-lg border border-primary/30 bg-primary-container p-3 text-on-primary-container",
        "sm:flex-row sm:items-center sm:justify-between",
        className
      )}
      {...props}
    >
      <div className="flex min-w-0 items-center gap-3">
        {onClearSelection ? (
          <button
            type="button"
            onClick={onClearSelection}
            className={cn(
              "flex size-7 shrink-0 items-center justify-center rounded-fds-md",
              "text-on-primary-container/80 transition-colors",
              "hover:bg-primary/10 hover:text-on-primary-container",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35"
            )}
            aria-label="Limpar seleção"
          >
            <X className="size-4" />
          </button>
        ) : null}

        <p className="body-sm font-medium">
          {label ?? `${selectedCount} item(ns) selecionado(s)`}
        </p>
      </div>

      {children ? (
        <div className="flex flex-wrap items-center gap-2">{children}</div>
      ) : null}
    </div>
  )
}
