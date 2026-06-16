/** biome-ignore-all lint/a11y/noLabelWithoutControl: this is a base component */
import type * as React from "react"

import { cn } from "../utils/cn"

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean
  requiredIndicator?: React.ReactNode
  showRequiredIndicator?: boolean
}

export function Label({
  className,
  children,
  required = false,
  requiredIndicator = "*",
  showRequiredIndicator = true,
  ...props
}: LabelProps) {
  return (
    <label
      className={cn(
        "body-sm font-medium text-on-surface",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}

      {required ? (
        <>
          {showRequiredIndicator ? (
            <>
              {" "}
              <span className="ml-1 text-error" aria-hidden="true">
                {requiredIndicator}
              </span>
            </>
          ) : null}

          <span className="sr-only"> obrigatório</span>
        </>
      ) : null}
    </label>
  )
}
