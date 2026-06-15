import type * as React from "react"

import { cn } from "../utils/cn"

export type FilterBarProps = React.HTMLAttributes<HTMLDivElement> & {
  label?: React.ReactNode
}

export function FilterBar({
  label = "Filtros",
  className,
  children,
  ...props
}: FilterBarProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-fds-lg border border-border bg-muted/40 p-3",
        className
      )}
      {...props}
    >
      {label ? (
        <p className="caption mono uppercase tracking-[0.12em] text-muted">{label}</p>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{children}</div>
    </div>
  )
}

export type FilterBarItemProps = React.HTMLAttributes<HTMLDivElement> & {
  label: React.ReactNode
}

export function FilterBarItem({
  label,
  className,
  children,
  ...props
}: FilterBarItemProps) {
  return (
    <div className={cn("grid gap-1.5", className)} {...props}>
      <span className="caption font-medium text-muted">{label}</span>

      {children}
    </div>
  )
}
