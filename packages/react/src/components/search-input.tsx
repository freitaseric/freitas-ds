import { Search, X } from "lucide-react"
import * as React from "react"

import { cn } from "../utils/cn"

export type SearchInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "defaultValue" | "onChange"
> & {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onClear?: () => void
  clearable?: boolean
  containerClassName?: string
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      className,
      containerClassName,
      value,
      defaultValue = "",
      onValueChange,
      onChange,
      onClear,
      clearable = true,
      placeholder = "Buscar...",
      disabled,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue)
    const currentValue = value ?? internalValue
    const hasValue = currentValue.length > 0

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      const nextValue = event.target.value

      if (value === undefined) {
        setInternalValue(nextValue)
      }

      onValueChange?.(nextValue)
      onChange?.(event)
    }

    function handleClear() {
      if (value === undefined) {
        setInternalValue("")
      }

      onValueChange?.("")
      onClear?.()
    }

    return (
      <div className={cn("relative w-full", containerClassName)}>
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        />

        <input
          ref={ref}
          type="search"
          value={currentValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "h-9 w-full rounded-fds-md border border-input bg-transparent",
            "pl-9 pr-9 body-sm text-on-surface shadow-sm outline-none",
            "transition-[color,box-shadow,border-color,background-color] duration-150",
            "placeholder:text-muted-foreground",
            "hover:bg-accent",
            "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/35",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />

        {clearable && hasValue && !disabled ? (
          <button
            type="button"
            onClick={handleClear}
            className={cn(
              "absolute right-2 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center",
              "rounded-sm text-muted-foreground transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/35"
            )}
            aria-label="Limpar busca"
          >
            <X className="size-4" />
          </button>
        ) : null}
      </div>
    )
  }
)

SearchInput.displayName = "SearchInput"
