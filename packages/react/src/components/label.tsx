/** biome-ignore-all lint/a11y/noLabelWithoutControl: this is a base component */
import type * as React from "react"

import { cn } from "../utils/cn"

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>

export function Label({ className, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        "body-sm font-medium text-on-surface",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}
