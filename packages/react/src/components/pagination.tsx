import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "../utils/cn"
import { Button } from "./button"

export type PaginationProps = {
  page: number
  totalPages: number
  onPageChange?: (page: number) => void
  siblingCount?: number
  className?: string
}

function range(start: number, end: number) {
  const length = end - start + 1

  return Array.from({ length }, (_, index) => index + start)
}

function getPaginationItems(
  page: number,
  totalPages: number,
  siblingCount: number
): Array<number | "ellipsis"> {
  const totalPageNumbers = siblingCount + 5

  if (totalPageNumbers >= totalPages) {
    return range(1, totalPages)
  }

  const leftSiblingIndex = Math.max(page - siblingCount, 1)
  const rightSiblingIndex = Math.min(page + siblingCount, totalPages)

  const shouldShowLeftEllipsis = leftSiblingIndex > 2
  const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 1

  const firstPageIndex = 1
  const lastPageIndex = totalPages

  if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const leftItemCount = 3 + 2 * siblingCount
    const leftRange = range(1, leftItemCount)

    return [...leftRange, "ellipsis", totalPages]
  }

  if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
    const rightItemCount = 3 + 2 * siblingCount
    const rightRange = range(totalPages - rightItemCount + 1, totalPages)

    return [firstPageIndex, "ellipsis", ...rightRange]
  }

  const middleRange = range(leftSiblingIndex, rightSiblingIndex)

  return [firstPageIndex, "ellipsis", ...middleRange, "ellipsis", lastPageIndex]
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className
}: PaginationProps) {
  const items = getPaginationItems(page, totalPages, siblingCount)

  function goToPage(nextPage: number) {
    if (nextPage < 1 || nextPage > totalPages || nextPage === page) {
      return
    }

    onPageChange?.(nextPage)
  }

  return (
    <nav
      aria-label="Paginação"
      className={cn("flex flex-wrap items-center justify-between gap-3", className)}
    >
      <p className="caption text-muted">
        Página {page} de {totalPages}
      </p>

      <div className="flex items-center gap-1">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={page <= 1}
          onClick={() => goToPage(page - 1)}
          aria-label="Página anterior"
        >
          <ChevronLeft className="size-4" />
        </Button>

        {items.map((item, index) => {
          if (item === "ellipsis") {
            const previousItem = items[index - 1]
            const nextItem = items[index + 1]

            return (
              <span
                key={`ellipsis-${previousItem}-${nextItem}`}
                className="flex size-8 items-center justify-center text-muted-foreground"
                aria-hidden="true"
              >
                <MoreHorizontal className="size-4" />
              </span>
            )
          }

          const isCurrent = item === page

          return (
            <Button
              key={item}
              type="button"
              variant={isCurrent ? "primary" : "ghost"}
              size="sm"
              onClick={() => goToPage(item)}
              aria-current={isCurrent ? "page" : undefined}
              className="size-8 px-0"
            >
              {item}
            </Button>
          )
        })}

        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={page >= totalPages}
          onClick={() => goToPage(page + 1)}
          aria-label="Próxima página"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </nav>
  )
}
