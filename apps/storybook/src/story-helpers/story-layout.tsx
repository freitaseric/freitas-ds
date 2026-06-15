import type * as React from "react"

export function StorySection({
  title,
  children
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="flex w-full max-w-5xl flex-col gap-4">
      <div>
        <h2 className="h3">{title}</h2>
      </div>
      {children}
    </section>
  )
}

export function StoryGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3">{children}</div>
}

export function StoryRow({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-center gap-3">{children}</div>
}

export function StorySurface({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-fds-lg border border-border bg-card p-6 text-card-foreground">
      {children}
    </div>
  )
}
