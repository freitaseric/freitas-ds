import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker, type DayPickerProps } from "react-day-picker"
import { ptBR } from "react-day-picker/locale"

import { cn } from "../utils/cn"
import { buttonVariants } from "./button"

export type CalendarProps = DayPickerProps

export function Calendar({
  className,
  classNames,
  locale = ptBR,
  showOutsideDays = true,
  navLayout = "after",
  components,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      locale={locale}
      showOutsideDays={showOutsideDays}
      navLayout={navLayout}
      className={cn("p-3", className)}
      classNames={{
        root: "w-fit",
        months: "flex flex-col gap-4",
        month: "space-y-4",
        month_caption: "flex h-8 items-center justify-center px-8",
        caption_label: "body-sm font-semibold text-on-surface",
        nav: "absolute right-3 top-3 flex items-center gap-1",
        button_previous: cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "size-8 p-0"
        ),
        button_next: cn(buttonVariants({ variant: "ghost", size: "sm" }), "size-8 p-0"),
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex",
        weekday:
          "flex size-9 items-center justify-center rounded-fds-sm caption font-medium text-muted",
        week: "mt-1 flex w-full",
        day: "size-9 p-0 text-center body-sm",
        day_button: cn(
          "flex size-9 items-center justify-center rounded-fds-md body-sm outline-none",
          "transition-colors duration-150",
          "hover:bg-accent hover:text-accent-foreground",
          "focus-visible:ring-2 focus-visible:ring-ring/35"
        ),
        selected: "[&>button]:bg-primary [&>button]:text-on-primary",
        today: "[&>button]:border [&>button]:border-primary",
        outside: "text-muted opacity-45",
        disabled: "pointer-events-none text-muted opacity-35",
        range_start:
          "[&>button]:rounded-r-none [&>button]:bg-primary [&>button]:text-on-primary",
        range_middle:
          "[&>button]:rounded-none [&>button]:bg-primary-container [&>button]:text-on-primary-container",
        range_end:
          "[&>button]:rounded-l-none [&>button]:bg-primary [&>button]:text-on-primary",
        hidden: "invisible",
        ...classNames
      }}
      components={{
        Chevron: ({ orientation, className, ...iconProps }) =>
          orientation === "left" ? (
            <ChevronLeft className={cn("size-4", className)} {...iconProps} />
          ) : (
            <ChevronRight className={cn("size-4", className)} {...iconProps} />
          ),
        ...components
      }}
      {...props}
    />
  )
}
