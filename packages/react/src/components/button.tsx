import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "../utils/cn"

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "rounded-fds-md",
    "font-medium",
    "transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
    "disabled:pointer-events-none disabled:opacity-50"
  ],
  {
    variants: {
      variant: {
        primary: "bg-primary text-on-primary hover:brightness-95",
        secondary: "bg-secondary text-on-secondary hover:brightness-95",
        tertiary: "bg-tertiary text-on-tertiary hover:brightness-95",
        danger: "bg-error text-on-error hover:brightness-95",
        outline:
          "border border-outline bg-transparent text-on-surface hover:bg-surface-container",
        ghost: "bg-transparent text-on-surface hover:bg-surface-container"
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base"
      },
      fullWidth: {
        true: "w-full",
        false: ""
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false
    }
  }
)

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean
    asChild?: boolean
  }

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      loading = false,
      disabled,
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading ? "Carregando..." : children}
      </Comp>
    )
  }
)

Button.displayName = "Button"
