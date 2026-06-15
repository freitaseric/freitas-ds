import type * as React from "react"

import { cn } from "../utils/cn"

export type AppShellProps = React.HTMLAttributes<HTMLDivElement> & {
  sidebar?: React.ReactNode
  topbar?: React.ReactNode
  children: React.ReactNode
}

export function AppShell({
  sidebar,
  topbar,
  children,
  className,
  ...props
}: AppShellProps) {
  return (
    <div
      className={cn(
        "h-dvh overflow-hidden bg-surface text-on-surface",
        "grid grid-cols-1 md:grid-cols-[16rem_minmax(0,1fr)]",
        className
      )}
      {...props}
    >
      {sidebar ? (
        <aside className="hidden h-dvh min-h-0 overflow-hidden border-r border-border bg-card md:block">
          {sidebar}
        </aside>
      ) : null}

      <div className="flex min-h-0 min-w-0 flex-col">
        {topbar ? (
          <header className="shrink-0 border-b border-border bg-surface/90 backdrop-blur">
            {topbar}
          </header>
        ) : null}

        <main className="min-h-0 min-w-0 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}

export type AppShellContentProps = React.HTMLAttributes<HTMLDivElement>

export function AppShellContent({ className, ...props }: AppShellContentProps) {
  return (
    <div
      className={cn("mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-8", className)}
      {...props}
    />
  )
}
