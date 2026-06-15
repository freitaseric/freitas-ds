import type * as React from "react"

import { cn } from "../utils/cn"

export type TopbarProps = React.HTMLAttributes<HTMLDivElement> & {
  start?: React.ReactNode
  center?: React.ReactNode
  end?: React.ReactNode
}

export function Topbar({
  start,
  center,
  end,
  className,
  children,
  ...props
}: TopbarProps) {
  return (
    <div className={cn("flex min-h-16 items-center gap-4 px-6", className)} {...props}>
      {children ?? (
        <>
          <div className="flex min-w-0 flex-1 items-center gap-3">{start}</div>

          {center ? (
            <div className="hidden min-w-0 flex-1 items-center justify-center lg:flex">
              {center}
            </div>
          ) : null}

          <div className="flex min-w-0 flex-1 items-center justify-end gap-2">{end}</div>
        </>
      )}
    </div>
  )
}
