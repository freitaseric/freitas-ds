import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown } from "lucide-react"
import * as React from "react"

import { cn } from "../utils/cn"

export type SelectOption = {
  value: string
  label: string
  disabled?: boolean
}

export type SelectGroup = {
  label: string
  options: SelectOption[]
}

type SelectOptions = SelectOption[] | SelectGroup[]

type SelectRootProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>

export type SelectProps = Omit<SelectRootProps, "children"> & {
  id?: string
  placeholder?: string
  options: SelectOptions
  className?: string
  contentClassName?: string
  "aria-describedby"?: string
  "aria-invalid"?: boolean | "true" | "false"
}

function isGroupedOptions(options: SelectOptions): options is SelectGroup[] {
  return options.length > 0 && "options" in options[0]
}

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      id,
      placeholder = "Selecione uma opção",
      options,
      className,
      contentClassName,
      disabled,
      required,
      name,
      value,
      defaultValue,
      onValueChange,
      "aria-describedby": ariaDescribedBy,
      "aria-invalid": ariaInvalid,
      ...props
    },
    ref
  ) => {
    const isInvalid = ariaInvalid === true || ariaInvalid === "true"

    return (
      <SelectPrimitive.Root
        disabled={disabled}
        required={required}
        name={name}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        {...props}
      >
        <SelectPrimitive.Trigger
          ref={ref}
          id={id}
          aria-describedby={ariaDescribedBy}
          aria-invalid={ariaInvalid}
          aria-required={required ? true : undefined}
          className={cn(
            "flex h-9 w-full items-center justify-between gap-2 whitespace-nowrap",
            "rounded-fds-md border border-input bg-transparent px-3 py-2",
            "body-sm text-on-surface shadow-sm outline-none",
            "transition-[color,box-shadow,border-color,background-color] duration-150",
            "data-placeholder:text-muted-foreground",
            "hover:bg-accent",
            "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/35",
            "disabled:cursor-not-allowed disabled:opacity-50",
            isInvalid &&
              "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/25",
            className
          )}
        >
          <span className="min-w-0 truncate text-left">
            <SelectPrimitive.Value placeholder={placeholder} />
          </span>

          <SelectPrimitive.Icon asChild>
            <ChevronDown
              aria-hidden="true"
              className="size-4 shrink-0 text-muted-foreground opacity-70"
            />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            position="popper"
            sideOffset={4}
            align="start"
            className={cn(
              "relative z-50 max-h-72 min-w-(--radix-select-trigger-width) overflow-hidden",
              "rounded-fds-md border border-border bg-popover text-popover-foreground",
              "shadow-md",
              contentClassName
            )}
          >
            <SelectPrimitive.Viewport className="p-1">
              {isGroupedOptions(options)
                ? options.map((group, groupIndex) => (
                    <SelectPrimitive.Group key={group.label}>
                      {groupIndex > 0 ? (
                        <SelectPrimitive.Separator className="my-1 h-px bg-border" />
                      ) : null}

                      <SelectPrimitive.Label className="px-2 py-1.5 caption mono uppercase tracking-[0.12em] text-muted-foreground">
                        {group.label}
                      </SelectPrimitive.Label>

                      {group.options.map((option) => (
                        <SelectItem key={option.value} option={option} />
                      ))}
                    </SelectPrimitive.Group>
                  ))
                : options.map((option) => (
                    <SelectItem key={option.value} option={option} />
                  ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    )
  }
)

Select.displayName = "Select"

type SelectItemProps = {
  option: SelectOption
}

function SelectItem({ option }: SelectItemProps) {
  return (
    <SelectPrimitive.Item
      value={option.value}
      disabled={option.disabled}
      className={cn(
        "relative flex w-full cursor-default select-none items-center",
        "rounded-sm py-1.5 pl-2 pr-8 outline-none",
        "text-sm",
        "transition-colors duration-100",
        "data-highlighted:bg-accent data-highlighted:text-accent-foreground",
        "data-disabled:pointer-events-none data-disabled:opacity-50"
      )}
    >
      <SelectPrimitive.ItemText>
        <span className="truncate">{option.label}</span>
      </SelectPrimitive.ItemText>

      <span className="absolute right-2 flex size-4 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="size-4 text-primary" />
        </SelectPrimitive.ItemIndicator>
      </span>
    </SelectPrimitive.Item>
  )
}
