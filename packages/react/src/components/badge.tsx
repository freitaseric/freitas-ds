import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "../utils/cn"

const badgeVariants = cva(
  [
    "inline-flex w-fit shrink-0 items-center gap-1",
    "rounded-fds-full border px-2 py-0.5",
    "text-xs font-medium leading-5",
    "transition-colors duration-150"
  ],
  {
    variants: {
      tone: {
        neutral: "border-border bg-muted text-muted-foreground",
        primary: "border-transparent bg-primary-container text-on-primary-container",
        secondary:
          "border-transparent bg-secondary-container text-on-secondary-container",
        success: "border-transparent bg-success-container text-on-success-container",
        warning: "border-transparent bg-warning-container text-on-warning-container",
        info: "border-transparent bg-info-container text-on-info-container",
        danger: "border-transparent bg-error-container text-on-error-container"
      },
      variant: {
        soft: "",
        outline: "bg-transparent",
        solid: ""
      }
    },
    compoundVariants: [
      {
        tone: "primary",
        variant: "solid",
        className: "border-transparent bg-primary text-on-primary"
      },
      {
        tone: "secondary",
        variant: "solid",
        className: "border-transparent bg-secondary text-on-secondary"
      },
      {
        tone: "success",
        variant: "solid",
        className: "border-transparent bg-success text-on-success"
      },
      {
        tone: "warning",
        variant: "solid",
        className: "border-transparent bg-warning text-on-warning"
      },
      {
        tone: "info",
        variant: "solid",
        className: "border-transparent bg-info text-on-info"
      },
      {
        tone: "danger",
        variant: "solid",
        className: "border-transparent bg-error text-on-error"
      },
      {
        tone: "neutral",
        variant: "outline",
        className: "border-border text-on-surface"
      },
      {
        tone: "primary",
        variant: "outline",
        className: "border-primary text-primary"
      },
      {
        tone: "secondary",
        variant: "outline",
        className: "border-secondary text-secondary"
      },
      {
        tone: "success",
        variant: "outline",
        className: "border-success text-success"
      },
      {
        tone: "warning",
        variant: "outline",
        className: "border-warning text-warning"
      },
      {
        tone: "info",
        variant: "outline",
        className: "border-info text-info"
      },
      {
        tone: "danger",
        variant: "outline",
        className: "border-error text-error"
      }
    ],
    defaultVariants: {
      tone: "neutral",
      variant: "soft"
    }
  }
)

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>

export function Badge({ className, tone, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone, variant }), className)} {...props} />
}
