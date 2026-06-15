import * as React from "react"

import { cn } from "../utils/cn"

export type TableContainerProps = React.HTMLAttributes<HTMLDivElement>

export function TableContainer({ className, ...props }: TableContainerProps) {
  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-fds-lg border border-border bg-card",
        className
      )}
      {...props}
    />
  )
}

export type TableScrollAreaProps = React.HTMLAttributes<HTMLDivElement>

export function TableScrollArea({ className, ...props }: TableScrollAreaProps) {
  return <div className={cn("w-full overflow-auto", className)} {...props} />
}

export type TableProps = React.TableHTMLAttributes<HTMLTableElement>

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, ...props }, ref) => {
    return (
      <table
        ref={ref}
        className={cn("w-full caption-bottom border-collapse text-sm", className)}
        {...props}
      />
    )
  }
)

Table.displayName = "Table"

export type TableHeaderProps = React.HTMLAttributes<HTMLTableSectionElement>

export const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <thead
        ref={ref}
        className={cn("border-b border-border bg-muted/60", className)}
        {...props}
      />
    )
  }
)

TableHeader.displayName = "TableHeader"

export type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement>

export const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => {
    return (
      <tbody
        ref={ref}
        className={cn("[&_tr:last-child]:border-0", className)}
        {...props}
      />
    )
  }
)

TableBody.displayName = "TableBody"

export type TableFooterProps = React.HTMLAttributes<HTMLTableSectionElement>

export const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <tfoot
        ref={ref}
        className={cn("border-t border-border bg-muted/60 font-medium", className)}
        {...props}
      />
    )
  }
)

TableFooter.displayName = "TableFooter"

export type TableRowProps = React.HTMLAttributes<HTMLTableRowElement>

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, ...props }, ref) => {
    return (
      <tr
        ref={ref}
        className={cn(
          "border-b border-border transition-colors",
          "hover:bg-muted/60",
          "data-[state=selected]:bg-muted",
          className
        )}
        {...props}
      />
    )
  }
)

TableRow.displayName = "TableRow"

export type TableHeadProps = React.ThHTMLAttributes<HTMLTableCellElement>

export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, ...props }, ref) => {
    return (
      <th
        ref={ref}
        className={cn(
          "h-10 px-4 text-left align-middle",
          "caption font-semibold uppercase tracking-[0.08em] text-muted-foreground",
          "[&:has([role=checkbox])]:pr-0",
          className
        )}
        {...props}
      />
    )
  }
)

TableHead.displayName = "TableHead"

export type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement>

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, ...props }, ref) => {
    return (
      <td
        ref={ref}
        className={cn(
          "px-4 py-3 align-middle body-sm",
          "[&:has([role=checkbox])]:pr-0",
          className
        )}
        {...props}
      />
    )
  }
)

TableCell.displayName = "TableCell"

export type TableCaptionProps = React.HTMLAttributes<HTMLTableCaptionElement>

export const TableCaption = React.forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  ({ className, ...props }, ref) => {
    return (
      <caption
        ref={ref}
        className={cn("mt-4 caption text-muted", className)}
        {...props}
      />
    )
  }
)

TableCaption.displayName = "TableCaption"
