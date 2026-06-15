import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import * as React from "react"

import { cn } from "../utils/cn"

export type RadioGroupOption = {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

export type RadioGroupProps = React.ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Root
> & {
  options: RadioGroupOption[]
  error?: boolean
}

export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, options, error = false, ...props }, ref) => {
  const generatedId = React.useId()

  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      className={cn("grid gap-2", className)}
      {...props}
    >
      {options.map((option) => {
        const itemId = `${generatedId}-${option.value}`

        return (
          <div
            key={option.value}
            className={cn(
              "flex items-start gap-3 rounded-fds-md border border-border p-3",
              "transition-colors duration-150",
              "has-data-[state=checked]:border-primary",
              "has-data-[state=checked]:bg-primary-container",
              option.disabled && "opacity-60"
            )}
          >
            <RadioGroupPrimitive.Item
              id={itemId}
              value={option.value}
              disabled={option.disabled}
              className={cn(
                "mt-0.5 size-4 shrink-0 rounded-full border border-input bg-transparent shadow-sm",
                "transition-[color,box-shadow,border-color,background-color] duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/35",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "data-[state=checked]:border-primary",
                error && "border-destructive focus-visible:ring-destructive/25"
              )}
            >
              <RadioGroupPrimitive.Indicator className="flex size-full items-center justify-center">
                <span className="size-2 rounded-full bg-primary" />
              </RadioGroupPrimitive.Indicator>
            </RadioGroupPrimitive.Item>

            <label htmlFor={itemId} className="grid flex-1 gap-1">
              <span className="body-sm font-medium text-on-surface">{option.label}</span>

              {option.description ? (
                <span className="caption text-muted">{option.description}</span>
              ) : null}
            </label>
          </div>
        )
      })}
    </RadioGroupPrimitive.Root>
  )
})

RadioGroup.displayName = "RadioGroup"
