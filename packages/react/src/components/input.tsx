import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "../utils/cn"

const inputVariants = cva(
  [
    "flex h-10 w-full",
    "rounded-fds-md border bg-surface px-3 py-2",
    "body-sm text-on-surface",
    "transition-colors duration-150",
    "placeholder:text-on-surface-variant",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
    "disabled:cursor-not-allowed disabled:opacity-50"
  ],
  {
    variants: {
      state: {
        default: "border-outline focus-visible:border-ring focus-visible:ring-ring",
        error: "border-error focus-visible:border-error focus-visible:ring-error"
      }
    },
    defaultVariants: {
      state: "default"
    }
  }
)

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants>

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, state, ...props }, ref) => {
    const isInvalid = props["aria-invalid"] === true || props["aria-invalid"] === "true"

    return (
      <input
        ref={ref}
        className={cn(
          inputVariants({
            state: isInvalid ? "error" : state
          }),
          className
        )}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"
