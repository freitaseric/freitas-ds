import type * as React from "react"

import { cn } from "../utils/cn"

export type ToolbarProps = React.HTMLAttributes<HTMLDivElement>

export function Toolbar({ className, ...props }: ToolbarProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-fds-lg border border-border bg-card p-4",
        "lg:flex-row lg:items-center lg:justify-between",
        className
      )}
      {...props}
    />
  )
}

export type ToolbarSectionProps = React.HTMLAttributes<HTMLDivElement>

export function ToolbarSection({ className, ...props }: ToolbarSectionProps) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center",
        className
      )}
      {...props}
    />
  )
}

export type ToolbarActionsProps = React.HTMLAttributes<HTMLDivElement>

export function ToolbarActions({ className, ...props }: ToolbarActionsProps) {
  return (
    <div
      className={cn("flex shrink-0 flex-wrap items-center gap-2", className)}
      {...props}
    />
  )
}

export type ToolbarTitleProps = React.HTMLAttributes<HTMLDivElement> & {
  title: React.ReactNode
  description?: React.ReactNode
}

export function ToolbarTitle({
  title,
  description,
  className,
  ...props
}: ToolbarTitleProps) {
  return (
    <div className={cn("min-w-0", className)} {...props}>
      <h3 className="body-sm font-semibold text-on-surface">{title}</h3>

      {description ? <p className="caption text-muted">{description}</p> : null}
    </div>
  )
}
