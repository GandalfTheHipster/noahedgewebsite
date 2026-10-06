"use client"

import { useState } from "react"
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table"
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

type BapeSortableTableProps<T> = {
  data: T[]
  columns: ColumnDef<T>[]
  initialSort?: SortingState
  getRowKey: (row: T) => string
  isHighlighted?: (row: T, index: number) => boolean
  columnWidths?: Record<string, string>
}

export function BapeSortableTable<T>({
  data,
  columns,
  initialSort = [],
  getRowKey,
  isHighlighted,
  columnWidths,
}: BapeSortableTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>(initialSort)
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="overflow-hidden rounded-[1.5rem] border bg-card shadow-sm">
      <Table className={cn(columnWidths && "table-fixed")}>
        <TableHeader className="bg-muted/30">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  style={{ width: columnWidths?.[header.column.id] }}
                  className="h-14 px-3 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row, index) => (
            <TableRow
              key={getRowKey(row.original)}
              className={cn(
                "hover:bg-muted/25",
                isHighlighted?.(row.original, index) && "bg-[#f8c75c]/[0.08]",
              )}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  style={{ width: columnWidths?.[cell.column.id] }}
                  className="px-3 py-4 text-sm"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export function BapeSortableHeader({
  label,
  column,
  align,
}: {
  label: string
  column: {
    getIsSorted: () => false | "asc" | "desc"
    toggleSorting: (desc?: boolean) => void
  }
  align?: "left" | "right"
}) {
  const sorted = column.getIsSorted()
  const Icon =
    sorted === "asc" ? ArrowUp : sorted === "desc" ? ArrowDown : ChevronsUpDown

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        "h-8 w-full gap-1.5 px-2 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground hover:bg-background/70 hover:text-foreground",
        align === "right" ? "justify-end" : "justify-start",
      )}
      onClick={() => column.toggleSorting(sorted === "asc")}
    >
      {label}
      <Icon className="size-3.5" />
    </Button>
  )
}
