import type * as React from "react"

import { cn } from "../utils/cn"

export type PageHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
}

export function PageHeader({
  className,
  eyebrow,
  title,
  description,
  actions,
  ...props
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 border-b border-border pb-6",
        "md:flex-row md:items-end md:justify-between",
        className
      )}
      {...props}
    >
      <div className="min-w-0">
        {eyebrow ? (
          <div className="mb-2 caption mono uppercase tracking-[0.12em] text-muted">
            {eyebrow}
          </div>
        ) : null}

        <h1 className="h1 truncate">{title}</h1>

        {description ? (
          <p className="mt-2 max-w-3xl body text-muted">{description}</p>
        ) : null}
      </div>

      {actions ? (
        <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>
      ) : null}
    </div>
  )
}
