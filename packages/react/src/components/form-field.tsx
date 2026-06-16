import * as React from "react"

import { cn } from "../utils/cn"
import { Label } from "./label"

type FieldControlProps = {
  id?: string
  required?: boolean
  "aria-required"?: boolean | "true" | "false"
  "aria-describedby"?: string
  "aria-invalid"?: boolean | "true" | "false"
}

export type FormFieldProps = {
  id?: string
  label: string
  helperText?: string
  error?: string
  required?: boolean
  className?: string
  children: React.ReactElement<FieldControlProps>
}

export function FormField({
  id,
  label,
  helperText,
  error,
  required = false,
  className,
  children
}: FormFieldProps) {
  const generatedId = React.useId()

  const fieldId = id ?? generatedId
  const helperId = helperText ? `${fieldId}-helper` : undefined
  const errorId = error ? `${fieldId}-error` : undefined

  const describedBy = [helperId, errorId].filter(Boolean).join(" ") || undefined

  const child = React.Children.only(children)

  const control = React.cloneElement(child, {
    id: child.props.id ?? fieldId,
    required: child.props.required ?? required,
    "aria-required": child.props["aria-required"] ?? (required ? true : undefined),
    "aria-describedby": describedBy,
    "aria-invalid": error ? true : child.props["aria-invalid"]
  })

  return (
    <div className={cn("flex w-full flex-col gap-1.5", className)}>
      <Label htmlFor={fieldId} required={required}>
        {label}
      </Label>

      {control}

      {helperText && !error ? (
        <p id={helperId} className="caption text-muted">
          {helperText}
        </p>
      ) : null}

      {error ? (
        <p id={errorId} className="caption text-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
