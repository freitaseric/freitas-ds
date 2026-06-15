import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "../utils/cn"

export type NativeSelectOption = {
  value: string
  label: string
  disabled?: boolean
}

const nativeSelectVariants = cva(
  [
    "h-9 w-full appearance-none",
    "rounded-fds-md border border-input bg-transparent px-3 py-2 pr-9",
    "body-sm text-on-surface shadow-sm outline-none",
    "transition-[color,box-shadow,border-color,background-color] duration-150",
    "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/35",
    "disabled:cursor-not-allowed disabled:opacity-50"
  ],
  {
    variants: {
      state: {
        default: "",
        error:
          "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/25"
      },
      fieldSize: {
        sm: "h-8 px-2 pr-8 text-sm",
        md: "h-9 px-3 pr-9 text-sm",
        lg: "h-10 px-4 pr-10 text-base"
      }
    },
    defaultVariants: {
      state: "default",
      fieldSize: "md"
    }
  }
)

export type NativeSelectProps = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "size"
> &
  VariantProps<typeof nativeSelectVariants> & {
    placeholder?: string
    options?: NativeSelectOption[]
  }

export const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  (
    {
      className,
      state,
      fieldSize,
      placeholder = "Selecione uma opção",
      options,
      children,
      ...props
    },
    ref
  ) => {
    const isInvalid = props["aria-invalid"] === true || props["aria-invalid"] === "true"

    return (
      <div className="relative w-full">
        <select
          ref={ref}
          className={cn(
            nativeSelectVariants({
              state: isInvalid ? "error" : state,
              fieldSize
            }),
            className
          )}
          defaultValue={props.defaultValue ?? ""}
          {...props}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}

          {options
            ? options.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </option>
              ))
            : children}
        </select>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <title>▾</title>
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </div>
    )
  }
)

NativeSelect.displayName = "NativeSelect"
