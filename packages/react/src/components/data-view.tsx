import { AlertTriangle } from "lucide-react"
import type * as React from "react"

import { cn } from "../utils/cn"
import { ActionBar } from "./action-bar"
import { Button } from "./button"
import { EmptyState, type EmptyStateProps } from "./empty-state"
import { FilterBar } from "./filter-bar"
import { Pagination, type PaginationProps } from "./pagination"
import { SearchInput, type SearchInputProps } from "./search-input"
import { Skeleton } from "./skeleton"
import { Toolbar, ToolbarActions, ToolbarSection, ToolbarTitle } from "./toolbar"

export type DataViewSearch =
  | React.ReactNode
  | (Omit<SearchInputProps, "type"> & {
      placeholder?: string
    })

export type DataViewStateContent =
  | React.ReactNode
  | (Pick<EmptyStateProps, "title" | "description" | "action" | "icon"> & {
      retryLabel?: string
      onRetry?: () => void
    })

export type DataViewProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: React.ReactNode
  description?: React.ReactNode
  search?: DataViewSearch
  filters?: React.ReactNode
  actions?: React.ReactNode
  selectedCount?: number
  selectedActions?: React.ReactNode
  selectedLabel?: React.ReactNode
  onClearSelection?: () => void
  empty?: DataViewStateContent
  loading?: boolean
  loadingLabel?: string
  error?: DataViewStateContent
  pagination?: React.ReactNode | PaginationProps
}

function isPlainStateContent(
  content: DataViewStateContent
): content is Exclude<DataViewStateContent, React.ReactNode> {
  return Boolean(
    content &&
      typeof content === "object" &&
      !Array.isArray(content) &&
      !("type" in content) &&
      "title" in content
  )
}

function renderStateContent(
  content: DataViewStateContent,
  fallbackIcon?: React.ReactNode
) {
  if (isPlainStateContent(content)) {
    const {
      retryLabel = "Tentar novamente",
      onRetry,
      action,
      icon,
      ...emptyStateProps
    } = content

    return (
      <EmptyState
        icon={icon ?? fallbackIcon}
        action={
          action ??
          (onRetry ? (
            <Button type="button" variant="outline" onClick={onRetry}>
              {retryLabel}
            </Button>
          ) : undefined)
        }
        {...emptyStateProps}
      />
    )
  }

  return content
}

function renderSearch(search: DataViewSearch) {
  if (
    typeof search === "object" &&
    search &&
    !Array.isArray(search) &&
    !("type" in search)
  ) {
    return <SearchInput placeholder="Buscar..." {...search} />
  }

  return search
}

function isPaginationProps(
  pagination: React.ReactNode | PaginationProps
): pagination is PaginationProps {
  return Boolean(
    pagination &&
      typeof pagination === "object" &&
      !Array.isArray(pagination) &&
      !("type" in pagination) &&
      "page" in pagination &&
      "totalPages" in pagination
  )
}

function renderPagination(pagination: React.ReactNode | PaginationProps) {
  if (isPaginationProps(pagination)) {
    return <Pagination {...pagination} />
  }

  return pagination
}

export function DataViewRoot({
  title,
  description,
  search,
  filters,
  actions,
  selectedCount = 0,
  selectedActions,
  selectedLabel,
  onClearSelection,
  empty,
  loading = false,
  loadingLabel = "Carregando dados",
  error,
  pagination,
  className,
  children,
  ...props
}: DataViewProps) {
  const hasHeader = title || description || actions
  const hasToolbar = search || filters

  return (
    <section className={cn("flex w-full flex-col gap-4", className)} {...props}>
      {hasHeader ? (
        <DataViewHeader title={title} description={description} actions={actions} />
      ) : null}

      {hasToolbar ? <DataViewToolbar search={search} filters={filters} /> : null}

      <ActionBar
        selectedCount={selectedCount}
        label={selectedLabel}
        onClearSelection={onClearSelection}
      >
        {selectedActions}
      </ActionBar>

      <DataViewContent>
        {loading ? (
          <div
            className="grid gap-3 rounded-fds-lg border border-border bg-card p-4"
            role="status"
            aria-label={loadingLabel}
          >
            <Skeleton className="h-6 w-44" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-3/4" />
          </div>
        ) : error ? (
          renderStateContent(error, <AlertTriangle className="size-6" />)
        ) : children ? (
          children
        ) : empty ? (
          renderStateContent(empty)
        ) : null}
      </DataViewContent>

      {pagination ? (
        <DataViewPagination>{renderPagination(pagination)}</DataViewPagination>
      ) : null}
    </section>
  )
}

export { DataViewRoot as DataView }

export type DataViewHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
}

export function DataViewHeader({
  title,
  description,
  actions,
  className,
  ...props
}: DataViewHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 border-b border-border pb-4",
        "md:flex-row md:items-end md:justify-between",
        className
      )}
      {...props}
    >
      <div className="min-w-0">
        {title ? <h2 className="h2 truncate">{title}</h2> : null}
        {description ? <p className="mt-1 body-sm text-muted">{description}</p> : null}
      </div>

      {actions ? (
        <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>
      ) : null}
    </div>
  )
}

export type DataViewToolbarProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: React.ReactNode
  description?: React.ReactNode
  search?: DataViewSearch
  filters?: React.ReactNode
  actions?: React.ReactNode
}

export function DataViewToolbar({
  title,
  description,
  search,
  filters,
  actions,
  className,
  ...props
}: DataViewToolbarProps) {
  return (
    <Toolbar className={className} {...props}>
      <ToolbarSection>
        {title ? <ToolbarTitle title={title} description={description} /> : null}
        {search ? <div className="min-w-64 flex-1">{renderSearch(search)}</div> : null}
      </ToolbarSection>

      {actions ? <ToolbarActions>{actions}</ToolbarActions> : null}

      {filters ? (
        <div className="basis-full">
          <FilterBar>{filters}</FilterBar>
        </div>
      ) : null}
    </Toolbar>
  )
}

export type DataViewContentProps = React.HTMLAttributes<HTMLDivElement>

export function DataViewContent({ className, ...props }: DataViewContentProps) {
  return <div className={cn("min-w-0", className)} {...props} />
}

export type DataViewEmptyProps = EmptyStateProps

export function DataViewEmpty(props: DataViewEmptyProps) {
  return <EmptyState {...props} />
}

export type DataViewPaginationProps = React.HTMLAttributes<HTMLDivElement>

export function DataViewPagination({ className, ...props }: DataViewPaginationProps) {
  return (
    <div
      className={cn("rounded-fds-lg border border-border bg-card p-3", className)}
      {...props}
    />
  )
}
