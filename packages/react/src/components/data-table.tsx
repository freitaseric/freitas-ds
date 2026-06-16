import { ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react"
import * as React from "react"

import { cn } from "../utils/cn"
import { Checkbox } from "./checkbox"
import { EmptyState } from "./empty-state"
import { Skeleton } from "./skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableScrollArea
} from "./table"

export type DataTableSortDirection = "asc" | "desc"

export type DataTableSortState = {
  id: string
  direction: DataTableSortDirection
}

export type DataTableColumn<TData> = {
  id: string
  header: React.ReactNode
  accessor?: keyof TData | ((row: TData) => React.ReactNode)
  cell?: (row: TData) => React.ReactNode
  sortValue?: (row: TData) => string | number | Date | null | undefined
  sortable?: boolean
  className?: string
  headerClassName?: string
  align?: "left" | "center" | "right"
}

export type DataTableProps<TData> = {
  columns: Array<DataTableColumn<TData>>
  data: TData[]
  getRowId?: (row: TData, index: number) => string
  selectedRowIds?: string[]
  defaultSelectedRowIds?: string[]
  onSelectedRowIdsChange?: (rowIds: string[]) => void
  sort?: DataTableSortState
  defaultSort?: DataTableSortState
  onSortChange?: (sort: DataTableSortState | undefined) => void
  onRowClick?: (row: TData, rowId: string) => void
  emptyState?: React.ReactNode
  loading?: boolean
  loadingRows?: number
  "aria-label"?: string
  className?: string
}

function getCellValue<TData>(row: TData, column: DataTableColumn<TData>) {
  if (column.cell) {
    return column.cell(row)
  }

  if (typeof column.accessor === "function") {
    return column.accessor(row)
  }

  if (column.accessor) {
    return row[column.accessor] as React.ReactNode
  }

  return null
}

function renderCellValue(value: React.ReactNode) {
  if (
    value === null ||
    value === undefined ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    React.isValidElement(value)
  ) {
    return value
  }

  return String(value)
}

function compareSortValues(
  first: string | number | Date | null | undefined,
  second: string | number | Date | null | undefined
) {
  if (first === second) {
    return 0
  }

  if (first === null || first === undefined) {
    return 1
  }

  if (second === null || second === undefined) {
    return -1
  }

  const normalizedFirst = first instanceof Date ? first.getTime() : first
  const normalizedSecond = second instanceof Date ? second.getTime() : second

  if (typeof normalizedFirst === "number" && typeof normalizedSecond === "number") {
    return normalizedFirst - normalizedSecond
  }

  return String(normalizedFirst).localeCompare(String(normalizedSecond), "pt-BR", {
    numeric: true,
    sensitivity: "base"
  })
}

function getNextSortState(currentSort: DataTableSortState | undefined, columnId: string) {
  if (currentSort?.id !== columnId) {
    return { id: columnId, direction: "asc" as const }
  }

  if (currentSort.direction === "asc") {
    return { id: columnId, direction: "desc" as const }
  }

  return undefined
}

export function DataTable<TData>({
  columns,
  data,
  getRowId = (_row, index) => String(index),
  selectedRowIds,
  defaultSelectedRowIds = [],
  onSelectedRowIdsChange,
  sort,
  defaultSort,
  onSortChange,
  onRowClick,
  emptyState,
  loading = false,
  loadingRows = 5,
  "aria-label": ariaLabel = "Tabela de dados",
  className
}: DataTableProps<TData>) {
  const [internalSelectedRowIds, setInternalSelectedRowIds] =
    React.useState(defaultSelectedRowIds)
  const [internalSort, setInternalSort] = React.useState(defaultSort)

  const currentSelectedRowIds = selectedRowIds ?? internalSelectedRowIds
  const currentSort = sort ?? internalSort
  const selectable = Boolean(selectedRowIds || onSelectedRowIdsChange)

  const rowIds = React.useMemo(
    () => data.map((row, index) => getRowId(row, index)),
    [data, getRowId]
  )

  const selectedRows = new Set(currentSelectedRowIds)
  const selectedVisibleRows = rowIds.filter((rowId) => selectedRows.has(rowId))
  const allVisibleSelected =
    rowIds.length > 0 && selectedVisibleRows.length === rowIds.length
  const someVisibleSelected =
    selectedVisibleRows.length > 0 && selectedVisibleRows.length < rowIds.length

  const sortedData = React.useMemo(() => {
    if (!currentSort) {
      return data
    }

    const sortedColumn = columns.find((column) => column.id === currentSort.id)

    if (!sortedColumn?.sortable) {
      return data
    }

    return [...data].sort((first, second) => {
      const firstValue = sortedColumn.sortValue
        ? sortedColumn.sortValue(first)
        : getCellValue(first, sortedColumn)?.toString()
      const secondValue = sortedColumn.sortValue
        ? sortedColumn.sortValue(second)
        : getCellValue(second, sortedColumn)?.toString()
      const result = compareSortValues(firstValue, secondValue)

      return currentSort.direction === "asc" ? result : result * -1
    })
  }, [columns, currentSort, data])

  function updateSelectedRowIds(nextSelectedRowIds: string[]) {
    if (selectedRowIds === undefined) {
      setInternalSelectedRowIds(nextSelectedRowIds)
    }

    onSelectedRowIdsChange?.(nextSelectedRowIds)
  }

  function updateSort(nextSort: DataTableSortState | undefined) {
    if (sort === undefined) {
      setInternalSort(nextSort)
    }

    onSortChange?.(nextSort)
  }

  function toggleRow(rowId: string) {
    const nextSelectedRows = new Set(currentSelectedRowIds)

    if (nextSelectedRows.has(rowId)) {
      nextSelectedRows.delete(rowId)
    } else {
      nextSelectedRows.add(rowId)
    }

    updateSelectedRowIds(Array.from(nextSelectedRows))
  }

  function toggleAllVisibleRows() {
    if (allVisibleSelected) {
      updateSelectedRowIds(
        currentSelectedRowIds.filter((rowId) => !rowIds.includes(rowId))
      )
      return
    }

    updateSelectedRowIds(Array.from(new Set([...currentSelectedRowIds, ...rowIds])))
  }

  const columnCount = columns.length + (selectable ? 1 : 0)

  return (
    <TableContainer className={className}>
      <TableScrollArea>
        <Table aria-label={ariaLabel}>
          <TableHeader>
            <TableRow>
              {selectable ? (
                <TableHead className="w-12">
                  <Checkbox
                    aria-label="Selecionar todas as linhas"
                    checked={someVisibleSelected ? "indeterminate" : allVisibleSelected}
                    disabled={loading || rowIds.length === 0}
                    onCheckedChange={toggleAllVisibleRows}
                  />
                </TableHead>
              ) : null}

              {columns.map((column) => {
                const isSorted = currentSort?.id === column.id
                const SortIcon = isSorted
                  ? currentSort.direction === "asc"
                    ? ChevronUp
                    : ChevronDown
                  : ArrowUpDown

                return (
                  <TableHead
                    key={column.id}
                    className={cn(
                      column.align === "center" && "text-center",
                      column.align === "right" && "text-right",
                      column.headerClassName
                    )}
                    aria-sort={
                      isSorted
                        ? currentSort.direction === "asc"
                          ? "ascending"
                          : "descending"
                        : undefined
                    }
                  >
                    {column.sortable ? (
                      <button
                        type="button"
                        className={cn(
                          "inline-flex items-center gap-1 rounded-fds-sm",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/35",
                          column.align === "right" && "ml-auto",
                          column.align === "center" && "mx-auto"
                        )}
                        onClick={() =>
                          updateSort(getNextSortState(currentSort, column.id))
                        }
                      >
                        {column.header}
                        <SortIcon className="size-3.5" aria-hidden="true" />
                      </button>
                    ) : (
                      column.header
                    )}
                  </TableHead>
                )
              })}
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading
              ? Array.from({ length: loadingRows }, (_, rowIndex) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: Loading placeholders have a static order and no interactive state.
                  <TableRow key={`loading-${rowIndex}`}>
                    {Array.from({ length: columnCount }, (_, cellIndex) => (
                      // biome-ignore lint/suspicious/noArrayIndexKey: Loading placeholders have a static order and no interactive state.
                      <TableCell key={`loading-${rowIndex}-${cellIndex}`}>
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : null}

            {!loading && sortedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columnCount}>
                  {emptyState ?? (
                    <EmptyState
                      className="border-0 bg-transparent"
                      title="Nenhum registro encontrado"
                      description="Ajuste os filtros ou cadastre um novo item."
                    />
                  )}
                </TableCell>
              </TableRow>
            ) : null}

            {!loading
              ? sortedData.map((row, index) => {
                  const rowId = getRowId(row, index)
                  const isSelected = selectedRows.has(rowId)

                  return (
                    <TableRow
                      key={rowId}
                      data-state={isSelected ? "selected" : undefined}
                      className={cn(onRowClick && "cursor-pointer")}
                      onClick={() => onRowClick?.(row, rowId)}
                    >
                      {selectable ? (
                        <TableCell onClick={(event) => event.stopPropagation()}>
                          <Checkbox
                            aria-label={`Selecionar linha ${index + 1}`}
                            checked={isSelected}
                            onCheckedChange={() => toggleRow(rowId)}
                          />
                        </TableCell>
                      ) : null}

                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          className={cn(
                            column.align === "center" && "text-center",
                            column.align === "right" && "text-right",
                            column.className
                          )}
                        >
                          {renderCellValue(getCellValue(row, column))}
                        </TableCell>
                      ))}
                    </TableRow>
                  )
                })
              : null}
          </TableBody>
        </Table>
      </TableScrollArea>
    </TableContainer>
  )
}
