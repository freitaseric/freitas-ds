import * as SwitchPrimitive from "@radix-ui/react-switch"
import * as React from "react"

import { cn } from "../utils/cn"
import { Label } from "./label"

export type SwitchProps = React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> & {
  error?: boolean
}

export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, error = false, ...props }, ref) => {
  return (
    <SwitchPrimitive.Root
      ref={ref}
      className={cn(
        "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-transparent shadow-sm",
        "transition-colors duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/35",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=unchecked]:bg-input",
        "data-[state=checked]:bg-primary",
        error && "focus-visible:ring-destructive/25",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none block size-4 rounded-full bg-surface shadow-sm ring-0",
          "transition-transform duration-150",
          "data-[state=checked]:translate-x-4",
          "data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitive.Root>
  )
})

Switch.displayName = "Switch"

export type SwitchFieldProps = SwitchProps & {
  label: string
  description?: string
  errorMessage?: string
  className?: string
}

export function SwitchField({
  id,
  label,
  description,
  errorMessage,
  required,
  className,
  ...props
}: SwitchFieldProps) {
  const generatedId = React.useId()
  const fieldId = id ?? generatedId
  const descriptionId = description ? `${fieldId}-description` : undefined
  const errorId = errorMessage ? `${fieldId}-error` : undefined

  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-start justify-between gap-4 rounded-fds-md border border-border p-3">
        <div className="grid gap-1">
          <Label
            htmlFor={fieldId}
            required={required}
            className={cn(props.disabled && "cursor-not-allowed opacity-60")}
          >
            {label}
          </Label>

          {description ? (
            <p id={descriptionId} className="caption text-muted">
              {description}
            </p>
          ) : null}
        </div>

        <Switch
          id={fieldId}
          required={required}
          aria-describedby={describedBy}
          aria-invalid={errorMessage ? true : undefined}
          error={Boolean(errorMessage)}
          {...props}
        />
      </div>

      {errorMessage ? (
        <p id={errorId} className="caption text-destructive" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </div>
  )
}
