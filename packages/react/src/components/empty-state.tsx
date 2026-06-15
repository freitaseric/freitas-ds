import { Inbox } from "lucide-react"
import type * as React from "react"

import { cn } from "../utils/cn"

export type EmptyStateProps = React.HTMLAttributes<HTMLDivElement> & {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
}

export function EmptyState({
  className,
  icon,
  title,
  description,
  action,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-56 flex-col items-center justify-center rounded-fds-lg border border-dashed border-border bg-muted/40 p-8 text-center",
        className
      )}
      {...props}
    >
      <div className="mb-4 flex size-12 items-center justify-center rounded-fds-full bg-surface text-muted-foreground">
        {icon ?? <Inbox className="size-6" />}
      </div>

      <h3 className="body font-semibold text-on-surface">{title}</h3>

      {description ? (
        <p className="mt-1 max-w-md body-sm text-muted">{description}</p>
      ) : null}

      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  )
}
