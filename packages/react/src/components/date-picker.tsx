import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, X } from "lucide-react"
import * as React from "react"

import { cn } from "../utils/cn"
import { Button } from "./button"
import { Calendar } from "./calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

export type DatePickerProps = {
  value?: Date
  defaultValue?: Date
  onValueChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  required?: boolean
  clearable?: boolean
  className?: string
  calendarClassName?: string
  "aria-label"?: string
  "aria-describedby"?: string
  "aria-invalid"?: boolean | "true" | "false"
}

export function formatDate(date: Date) {
  return format(date, "dd/MM/yyyy", { locale: ptBR })
}

export function DatePicker({
  value,
  defaultValue,
  onValueChange,
  placeholder = "Selecionar data",
  disabled = false,
  required = false,
  clearable = true,
  className,
  calendarClassName,
  "aria-label": ariaLabel = "Selecionar data",
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [internalValue, setInternalValue] = React.useState<Date | undefined>(defaultValue)

  const selectedDate = value ?? internalValue
  const isInvalid = ariaInvalid === true || ariaInvalid === "true"

  function updateDate(date: Date | undefined) {
    if (value === undefined) {
      setInternalValue(date)
    }

    onValueChange?.(date)
  }

  function handleSelect(date: Date | undefined) {
    updateDate(date)
    if (date) {
      setOpen(false)
    }
  }

  function handleClear(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
    updateDate(undefined)
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
            data-required={required ? "" : undefined}
            className={cn(
              "h-10 w-full justify-start px-3 text-left font-normal",
              !selectedDate && "text-muted",
              isInvalid && "border-error focus-visible:ring-error",
              clearable && selectedDate && "pr-10",
              className
            )}
          >
            <CalendarIcon aria-hidden="true" className="size-4" />
            <span className="min-w-0 truncate">
              {selectedDate ? formatDate(selectedDate) : placeholder}
            </span>
          </Button>
        </PopoverTrigger>

        {clearable && selectedDate && !disabled ? (
          <button
            type="button"
            aria-label="Limpar data"
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
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          disabled={disabled}
          className={calendarClassName}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  )
}
