import { CalendarIcon, X } from "lucide-react"
import * as React from "react"
import type { DateRange } from "react-day-picker"

import { cn } from "../utils/cn"
import { Button } from "./button"
import { Calendar } from "./calendar"
import { formatDate } from "./date-picker"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

export type DateRangeValue = DateRange

export type DateRangePickerProps = {
  value?: DateRangeValue
  defaultValue?: DateRangeValue
  onValueChange?: (range: DateRangeValue | undefined) => void
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  className?: string
  calendarClassName?: string
  "aria-label"?: string
  "aria-describedby"?: string
  "aria-invalid"?: boolean | "true" | "false"
}

function formatRange(range: DateRangeValue | undefined) {
  if (!range?.from) {
    return undefined
  }

  if (!range.to) {
    return formatDate(range.from)
  }

  return `${formatDate(range.from)} - ${formatDate(range.to)}`
}

export function DateRangePicker({
  value,
  defaultValue,
  onValueChange,
  placeholder = "Selecionar período",
  disabled = false,
  clearable = true,
  className,
  calendarClassName,
  "aria-label": ariaLabel = "Selecionar período",
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [internalValue, setInternalValue] = React.useState<DateRangeValue | undefined>(
    defaultValue
  )

  const selectedRange = value ?? internalValue
  const label = formatRange(selectedRange)
  const isInvalid = ariaInvalid === true || ariaInvalid === "true"

  function updateRange(range: DateRangeValue | undefined) {
    if (value === undefined) {
      setInternalValue(range)
    }

    onValueChange?.(range)
  }

  function handleClear(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
    updateRange(undefined)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="relative w-full">
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            disabled={disabled}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedBy}
            aria-invalid={ariaInvalid}
            className={cn(
              "h-10 w-full justify-start px-3 text-left font-normal",
              !label && "text-muted",
              isInvalid && "border-error focus-visible:ring-error",
              clearable && label && "pr-10",
              className
            )}
          >
            <CalendarIcon aria-hidden="true" className="size-4" />
            <span className="min-w-0 truncate">{label ?? placeholder}</span>
          </Button>
        </PopoverTrigger>

        {clearable && label && !disabled ? (
          <button
            type="button"
            aria-label="Limpar período"
            className={cn(
              "absolute right-2 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-sm",
              "text-muted transition-colors hover:bg-accent hover:text-on-surface",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/35"
            )}
            onClick={handleClear}
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        ) : null}
      </div>

      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          mode="range"
          selected={selectedRange}
          onSelect={updateRange}
          disabled={disabled}
          className={calendarClassName}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  )
}
