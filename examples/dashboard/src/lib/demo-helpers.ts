export function comboboxActionButton(extraClassName = "") {
  return [
    "flex h-8 flex-1 items-center justify-center rounded-sm px-2",
    "text-sm font-medium text-on-surface",
    "transition-colors duration-100",
    "hover:bg-accent hover:text-accent-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/35",
    extraClassName
  ]
    .filter(Boolean)
    .join(" ")
}

export function cnCommandButton() {
  return [
    "hidden h-9 w-full max-w-md items-center justify-between gap-3 rounded-fds-md border border-input bg-transparent px-3",
    "body-sm text-muted-foreground shadow-sm outline-none",
    "transition-[color,box-shadow,border-color,background-color] duration-150",
    "hover:bg-accent hover:text-accent-foreground",
    "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/35",
    "lg:flex"
  ].join(" ")
}
