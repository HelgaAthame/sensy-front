'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/shared/ui/table/table'
import Pagination from '@/shared/ui/pagination/pagination'

interface ColumnDef<T> {
  key: keyof T | string
  id: number
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

export const OperatorsTable = <T extends Record<string, any>>({
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
                    key={`header-${column.id}`}
                    isHeader
                    className="py-3 px-4 font-normal text-gray-500 text-start text-theme-sm dark:text-gray-400"
                  >
                    {column.title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {currentItems.map((item, index) => (
                <TableRow
                  key={index}
                  className={
                    index === currentItems.length - 1
                      ? 'border-b border-gray-100 dark:border-white/[0.05]'
                      : ''
                  }
                >
                  <TableCell className="px-4 py-4 w-[90px]">
                    <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
                      {item.id}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10">
                        {item.image ? (
                          <img
                            width={40}
                            height={40}
                            src={item.image}
                            className="w-10 h-10 rounded-full object-cover"
                            alt={`${item.name} icon`}
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-purple-900 text-white text-lg font-semibold">
                            {item.name?.charAt(0)}
                          </div>
                        )}
                      </div>
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
      <div className="border border-t-0 rounded-b-xl border-gray-100 py-4 pl-[18px] pr-4 dark:border-white/[0.05]">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-end">
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  )
}
