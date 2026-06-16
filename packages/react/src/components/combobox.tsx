import * as PopoverPrimitive from "@radix-ui/react-popover"
import { Command as CommandPrimitive } from "cmdk"
import { Check, ChevronsUpDown, Search } from "lucide-react"
import * as React from "react"

import { cn } from "../utils/cn"

export type ComboboxOption = {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

export type ComboboxGroup = {
  label: string
  options: ComboboxOption[]
}

type ComboboxOptions = ComboboxOption[] | ComboboxGroup[]

export type ComboboxProps = {
  id?: string
  name?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void

  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string

  options: ComboboxOptions
  actions?: React.ReactNode

  disabled?: boolean
  required?: boolean
  className?: string
  contentClassName?: string

  "aria-describedby"?: string
  "aria-invalid"?: boolean | "true" | "false"
  "aria-label"?: string
}

function isGroupedOptions(options: ComboboxOptions): options is ComboboxGroup[] {
  return options.length > 0 && "options" in options[0]
}

function flattenOptions(options: ComboboxOptions): ComboboxOption[] {
  if (isGroupedOptions(options)) {
    return options.flatMap((group) => group.options)
  }

  return options
}

export const Combobox = React.forwardRef<HTMLButtonElement, ComboboxProps>(
  (
    {
      id,
      name,
      value,
      defaultValue,
      onValueChange,

      placeholder = "Selecione uma opção",
      searchPlaceholder = "Buscar...",
      emptyMessage = "Nenhum resultado encontrado.",

      options,
      actions,

      disabled = false,
      required = false,
      className,
      contentClassName,

      "aria-describedby": ariaDescribedBy,
      "aria-invalid": ariaInvalid,
      "aria-label": ariaLabel
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? "")

    const selectedValue = value ?? internalValue
    const isInvalid = ariaInvalid === true || ariaInvalid === "true"

    const allOptions = React.useMemo(() => flattenOptions(options), [options])

    const selectedOption = allOptions.find((option) => option.value === selectedValue)

    function handleSelect(nextValue: string) {
      if (value === undefined) {
        setInternalValue(nextValue)
      }

      onValueChange?.(nextValue)
      setOpen(false)
    }

    return (
      <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
        {name ? (
          <input type="hidden" name={name} value={selectedValue} required={required} />
        ) : null}

        <PopoverPrimitive.Trigger asChild>
          <button
            ref={ref}
            id={id}
            type="button"
            role="combobox"
            disabled={disabled}
            aria-label={ariaLabel ?? selectedOption?.label ?? placeholder}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-describedby={ariaDescribedBy}
            aria-invalid={ariaInvalid}
            aria-required={required ? true : undefined}
            className={cn(
              "flex h-9 w-full items-center justify-between gap-2 whitespace-nowrap",
              "rounded-fds-md border border-input bg-transparent px-3 py-2",
              "body-sm text-on-surface shadow-sm outline-none",
              "transition-[color,box-shadow,border-color,background-color] duration-150",
              "hover:bg-accent",
              "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/35",
              "disabled:cursor-not-allowed disabled:opacity-50",
              !selectedOption && "text-muted-foreground",
              isInvalid &&
                "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/25",
              className
            )}
          >
            <span className="min-w-0 truncate text-left">
              {selectedOption ? selectedOption.label : placeholder}
            </span>

            <ChevronsUpDown
              aria-hidden="true"
              className="size-4 shrink-0 text-muted-foreground opacity-70"
            />
          </button>
        </PopoverPrimitive.Trigger>

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            align="start"
            sideOffset={4}
            className={cn(
              "z-50 w-(--radix-popover-trigger-width) overflow-hidden",
              "rounded-fds-md border border-border bg-popover text-popover-foreground shadow-md",
              contentClassName
            )}
          >
            <CommandPrimitive
              loop
              filter={(itemValue, search, keywords) => {
                const normalizedSearch = search.toLowerCase().trim()

                const text = [itemValue, ...(keywords ?? [])].join(" ").toLowerCase()

                return text.includes(normalizedSearch) ? 1 : 0
              }}
              className="flex max-h-80 w-full flex-col overflow-hidden"
            >
              <div className="flex items-center border-b border-border px-3">
                <Search
                  aria-hidden="true"
                  className="mr-2 size-4 shrink-0 text-muted-foreground"
                />

                <CommandPrimitive.Input
                  placeholder={searchPlaceholder}
                  className={cn(
                    "h-10 w-full bg-transparent py-3 text-sm outline-none",
                    "placeholder:text-muted-foreground",
                    "disabled:cursor-not-allowed disabled:opacity-50"
                  )}
                />
              </div>

              <CommandPrimitive.List className="max-h-60 overflow-y-auto overflow-x-hidden p-1">
                <CommandPrimitive.Empty className="px-3 py-6 text-center text-sm text-muted-foreground">
                  {emptyMessage}
                </CommandPrimitive.Empty>

                {isGroupedOptions(options)
                  ? options.map((group, groupIndex) => (
                      <CommandPrimitive.Group
                        key={group.label}
                        heading={group.label}
                        className={cn(
                          "[&_[cmdk-group-heading]]:px-2",
                          "[&_[cmdk-group-heading]]:py-1.5",
                          "[&_[cmdk-group-heading]]:caption",
                          "[&_[cmdk-group-heading]]:mono",
                          "[&_[cmdk-group-heading]]:uppercase",
                          "[&_[cmdk-group-heading]]:tracking-[0.12em]",
                          "[&_[cmdk-group-heading]]:text-muted-foreground"
                        )}
                      >
                        {groupIndex > 0 ? <div className="my-1 h-px bg-border" /> : null}

                        {group.options.map((option) => (
                          <ComboboxItem
                            key={option.value}
                            option={option}
                            selected={option.value === selectedValue}
                            onSelect={handleSelect}
                          />
                        ))}
                      </CommandPrimitive.Group>
                    ))
                  : options.map((option) => (
                      <ComboboxItem
                        key={option.value}
                        option={option}
                        selected={option.value === selectedValue}
                        onSelect={handleSelect}
                      />
                    ))}
              </CommandPrimitive.List>

              {actions ? (
                <div className="border-t border-border p-1.5">{actions}</div>
              ) : null}
            </CommandPrimitive>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    )
  }
)

Combobox.displayName = "Combobox"

type ComboboxItemProps = {
  option: ComboboxOption
  selected: boolean
  onSelect: (value: string) => void
}

function ComboboxItem({ option, selected, onSelect }: ComboboxItemProps) {
  return (
    <CommandPrimitive.Item
      value={option.value}
      keywords={[option.label, option.description ?? ""]}
      disabled={option.disabled}
      onSelect={() => onSelect(option.value)}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 pr-8",
        "text-sm outline-none",
        "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground",
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50"
      )}
    >
      <span className="flex min-w-0 flex-col">
        <span className="truncate font-medium leading-5">{option.label}</span>

        {option.description ? (
          <span className="truncate text-xs leading-4 text-muted-foreground">
            {option.description}
          </span>
        ) : null}
      </span>

      {selected ? <Check className="absolute right-2 size-4 text-primary" /> : null}
    </CommandPrimitive.Item>
  )
}
