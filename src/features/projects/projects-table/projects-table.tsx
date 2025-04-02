'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/shared/table/table'
import Pagination from '@/shared/pagination/pagination'

interface ColumnDef<T> {
  key: keyof T | string
  title: string
  render?: (item: T) => React.ReactNode
}

interface DynamicTableProps<T> {
  title?: string
  data: T[]
  columns: ColumnDef<T>[]
  itemsPerPage?: number
  initialPage?: number
  className?: string
}

export const ProjectsTable = <T extends Record<string, any>>({
  title = '',
  data = [],
  columns = [],
  itemsPerPage = 5,
  initialPage = 1,
  className = '',
}: DynamicTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState<number>(initialPage)

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem)

  const totalPages = Math.ceil(data.length / itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white pt-4 dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="overflow-hidden">
        <div className="max-w-full overflow-x-auto">
          <Table className="w-full">
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={`header-${column}`}
                    isHeader
                    className="py-3 px-4 font-normal text-gray-500 text-start text-theme-sm dark:text-gray-400"
                  >
                    {column.title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {currentItems.map(item => (
                <TableRow key={item.id}>
                  <TableCell className="px-4 py-4 h-16">
                    <div className="flex items-center gap-3">
                      <div>
                        <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
                          {item.name}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}
