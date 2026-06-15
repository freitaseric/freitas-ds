import { cva, type VariantProps } from "class-variance-authority"
import { LoaderCircle } from "lucide-react"
import type * as React from "react"

import { cn } from "../utils/cn"

const spinnerVariants = cva("animate-spin", {
  variants: {
    size: {
      sm: "size-4",
      md: "size-5",
      lg: "size-7"
    },
    tone: {
      current: "text-current",
      primary: "text-primary",
      muted: "text-muted-foreground",
      danger: "text-error",
      success: "text-success",
      warning: "text-warning",
      info: "text-info"
    }
  },
  defaultVariants: {
    size: "md",
    tone: "current"
  }
})

export type SpinnerProps = React.HTMLAttributes<SVGSVGElement> &
  VariantProps<typeof spinnerVariants>

export function Spinner({ className, size, tone, ...props }: SpinnerProps) {
  return (
    <LoaderCircle
      role="status"
      aria-label="Carregando"
      className={cn(spinnerVariants({ size, tone }), className)}
      {...props}
    />
  )
}
