import type * as React from "react"

import { cn } from "../utils/cn"

export type CardProps = React.HTMLAttributes<HTMLDivElement>

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-fds-lg border border-border bg-card text-card-foreground shadow-sm",
        "p-6",
        className
      )}
      {...props}
    />
  )
}

export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>

export function CardHeader({ className, ...props }: CardHeaderProps) {
  return <div className={cn("mb-5 flex flex-col gap-1.5", className)} {...props} />
}

export type CardContentProps = React.HTMLAttributes<HTMLDivElement>

export function CardContent({ className, ...props }: CardContentProps) {
  return <div className={cn("body", className)} {...props} />
}

export type CardFooterProps = React.HTMLAttributes<HTMLDivElement>

export function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div className={cn("mt-6 flex flex-wrap items-center gap-3", className)} {...props} />
  )
}
