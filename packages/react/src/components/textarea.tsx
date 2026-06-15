import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "../utils/cn"

const textareaVariants = cva(
  [
    "flex min-h-24 w-full",
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

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  VariantProps<typeof textareaVariants>

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, state, ...props }, ref) => {
    const isInvalid = props["aria-invalid"] === true || props["aria-invalid"] === "true"

    return (
      <textarea
        ref={ref}
        className={cn(
          textareaVariants({
            state: isInvalid ? "error" : state
          }),
          className
        )}
        {...props}
      />
    )
  }
)

Textarea.displayName = "Textarea"
