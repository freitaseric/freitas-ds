import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"
import * as React from "react"

import { cn } from "../utils/cn"
import { Label } from "./label"

export type CheckboxProps = React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
> & {
  error?: boolean
}

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, error = false, ...props }, ref) => {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "peer size-4 shrink-0 rounded-sm border border-input bg-transparent shadow-sm",
        "transition-[color,box-shadow,border-color,background-color] duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/35",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-on-primary",
        error &&
          "border-destructive focus-visible:ring-destructive/25 data-[state=checked]:border-destructive data-[state=checked]:bg-destructive data-[state=checked]:text-destructive-foreground",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
        <Check className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
})

Checkbox.displayName = "Checkbox"

export type CheckboxFieldProps = CheckboxProps & {
  label: string
  description?: string
  errorMessage?: string
  className?: string
}

export function CheckboxField({
  id,
  label,
  description,
  errorMessage,
  required,
  className,
  ...props
}: CheckboxFieldProps) {
  const generatedId = React.useId()
  const fieldId = id ?? generatedId
  const descriptionId = description ? `${fieldId}-description` : undefined
  const errorId = errorMessage ? `${fieldId}-error` : undefined

  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-start gap-3">
        <Checkbox
          id={fieldId}
          required={required}
          aria-describedby={describedBy}
          aria-invalid={errorMessage ? true : undefined}
          error={Boolean(errorMessage)}
          {...props}
        />

        <div className="grid gap-1 leading-none">
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
      </div>

      {errorMessage ? (
        <p id={errorId} className="caption text-destructive" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </div>
  )
}
