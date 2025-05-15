"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Pagination = ({
  className,
  ...props
}: React.ComponentProps<"nav"> & {
  className?: string
}) => {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

const PaginationContent = ({
  className,
  ...props
}: React.ComponentProps<"ul"> & {
  className?: string
}) => {
  return (
    <ul
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  )
}

const PaginationItem = ({
  className,
  ...props
}: React.ComponentProps<"li"> & {
  className?: string
}) => {
  return <li className={cn("flex items-center", className)} {...props} />
}

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: {
  className?: string
  isActive?: boolean
  size?: "default" | "sm" | "lg" | "icon"
} & React.ComponentProps<typeof Button>) => {
  return (
    <Button
      aria-current={isActive ? "page" : undefined}
      variant={isActive ? "outline" : "ghost"}
      size={size}
      className={cn(
        "h-9 w-9",
        isActive && "bg-primary text-primary-foreground hover:bg-primary/90",
        className
      )}
      {...props}
    />
  )
}

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof Button> & {
  className?: string
}) => {
  return (
    <Button
      aria-label="Go to previous page"
      size="icon"
      variant="ghost"
      className={cn("gap-1 h-9 w-9", className)}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
    </Button>
  )
}

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof Button> & {
  className?: string
}) => {
  return (
    <Button
      aria-label="Go to next page"
      size="icon"
      variant="ghost"
      className={cn("gap-1 h-9 w-9", className)}
      {...props}
    >
      <ChevronRight className="h-4 w-4" />
    </Button>
  )
}

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span"> & {
  className?: string
}) => {
  return (
    <span
      aria-hidden
      className={cn("flex h-9 w-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

type PaginationControlsProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
  siblingCount?: number
}

const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
  siblingCount = 1,
}: PaginationControlsProps) => {
  // 生成页码数组
  const generatePagination = () => {
    // 如果总页数小于等于7，直接显示所有页码
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    // 计算左右两侧的页码
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages)

    // 是否显示左右两侧的省略号
    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1

    // 始终显示第一页和最后一页
    if (shouldShowLeftDots && shouldShowRightDots) {
      // 显示第一页、当前页及其左右兄弟页、最后一页，以及省略号
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      )
      return [1, "...", ...middleRange, "...", totalPages]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      // 显示第一页、省略号、右侧页码
      const rightRange = Array.from(
        { length: totalPages - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      )
      return [1, "...", ...rightRange]
    }

    if (!shouldShowLeftDots && shouldShowRightDots) {
      // 显示左侧页码、省略号、最后一页
      const leftRange = Array.from(
        { length: rightSiblingIndex },
        (_, i) => i + 1
      )
      return [...leftRange, "...", totalPages]
    }

    // 默认情况，不应该到达这里
    return []
  }

  const pages = generatePagination()

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          />
        </PaginationItem>

        {pages.map((page, i) => {
          if (page === "...") {
            return (
              <PaginationItem key={`ellipsis-${i}`}>
                <PaginationEllipsis />
              </PaginationItem>
            )
          }

          return (
            <PaginationItem key={`page-${page}`}>
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => onPageChange(page as number)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

type PaginationWithSizeProps = {
  currentPage: number
  totalPages: number
  pageSize: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
  className?: string
  pageSizeOptions?: number[]
}

const PaginationWithSize = ({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
  className,
  pageSizeOptions = [10, 20, 30, 50, 100],
}: PaginationWithSizeProps) => {
  return (
    <div className={cn("flex flex-col sm:flex-row items-center gap-4", className)}>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
      
      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">每页显示</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 px-2 min-w-[70px]">
              {pageSize}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {pageSizeOptions.map((size) => (
              <DropdownMenuItem
                key={size}
                onClick={() => onPageSizeChange(size)}
                className={cn(
                  "cursor-pointer",
                  pageSize === size && "bg-accent font-medium"
                )}
              >
                {size}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <span className="text-muted-foreground">条</span>
      </div>
    </div>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
  PaginationControls,
  PaginationWithSize,
}