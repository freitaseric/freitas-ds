import { Slot } from "@radix-ui/react-slot"
import * as React from "react"

import { cn } from "../utils/cn"

export type SidebarProps = React.HTMLAttributes<HTMLDivElement>

export function Sidebar({ className, ...props }: SidebarProps) {
  return (
    <div
      className={cn(
        "flex h-full min-h-0 flex-col bg-card text-card-foreground",
        className
      )}
      {...props}
    />
  )
}

export type SidebarHeaderProps = React.HTMLAttributes<HTMLDivElement>

export function SidebarHeader({ className, ...props }: SidebarHeaderProps) {
  return (
    <div
      className={cn("flex min-h-16 items-center border-b border-border px-4", className)}
      {...props}
    />
  )
}

export type SidebarBrandProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string
  description?: string
  icon?: React.ReactNode
}

export function SidebarBrand({
  title,
  description,
  icon,
  className,
  ...props
}: SidebarBrandProps) {
  return (
    <div className={cn("flex min-w-0 items-center gap-3", className)} {...props}>
      {icon ? (
        <div className="flex size-9 shrink-0 items-center justify-center rounded-fds-md bg-primary text-on-primary">
          {icon}
        </div>
      ) : null}

      <div className="min-w-0">
        <p className="truncate body-sm font-semibold text-on-surface">{title}</p>

        {description ? (
          <p className="truncate caption text-muted">{description}</p>
        ) : null}
      </div>
    </div>
  )
}

export type SidebarContentProps = React.HTMLAttributes<HTMLDivElement>

export function SidebarContent({ className, ...props }: SidebarContentProps) {
  return (
    <div
      className={cn("min-h-0 flex-1 overflow-y-auto px-3 py-4", className)}
      {...props}
    />
  )
}

export type SidebarSectionProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: string
}

export function SidebarSection({
  title,
  className,
  children,
  ...props
}: SidebarSectionProps) {
  return (
    <div className={cn("grid gap-1", className)} {...props}>
      {title ? (
        <p className="px-3 pb-2 caption mono uppercase tracking-[0.12em] text-muted">
          {title}
        </p>
      ) : null}

      {children}
    </div>
  )
}

export type SidebarNavItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: React.ReactNode
  active?: boolean
  asChild?: boolean
}

export const SidebarNavItem = React.forwardRef<HTMLButtonElement, SidebarNavItemProps>(
  ({ icon, active = false, asChild = false, className, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        ref={ref}
        className={cn(
          "flex h-9 w-full items-center gap-3 rounded-fds-md px-3 text-left body-sm",
          "transition-colors duration-150",
          "hover:bg-accent hover:text-accent-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/35",
          "disabled:pointer-events-none disabled:opacity-50",
          active
            ? "bg-primary-container text-on-primary-container"
            : "text-muted-foreground",
          className
        )}
        {...props}
      >
        {icon ? (
          <span className="flex size-4 shrink-0 items-center justify-center">{icon}</span>
        ) : null}

        <span className="min-w-0 truncate">{children}</span>
      </Comp>
    )
  }
)

SidebarNavItem.displayName = "SidebarNavItem"

export type SidebarFooterProps = React.HTMLAttributes<HTMLDivElement>

export function SidebarFooter({ className, ...props }: SidebarFooterProps) {
  return <div className={cn("border-t border-border p-3", className)} {...props} />
}
