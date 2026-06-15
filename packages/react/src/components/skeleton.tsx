import type * as React from "react"

import { cn } from "../utils/cn"

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse rounded-fds-md bg-muted", className)}
      {...props}
    />
  )
}
