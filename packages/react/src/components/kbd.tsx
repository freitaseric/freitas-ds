import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "../utils/cn"

const kbdVariants = cva(
  [
    "inline-flex items-center justify-center",
    "rounded-sm border border-border bg-muted",
    "font-mono font-medium text-muted-foreground shadow-sm",
    "select-none"
  ],
  {
    variants: {
      size: {
        sm: "h-5 min-w-5 px-1 text-[0.6875rem]",
        md: "h-6 min-w-6 px-1.5 text-xs"
      }
    },
    defaultVariants: {
      size: "sm"
    }
  }
)

export type KbdProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof kbdVariants>

export function Kbd({ className, size, ...props }: KbdProps) {
  return <kbd className={cn(kbdVariants({ size }), className)} {...props} />
}
