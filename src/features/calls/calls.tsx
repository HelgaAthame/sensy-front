'use client'

import { CallsTable } from '@/entities/mediafile/ui/calls-table'
import Pagination from '@/shared/pagination/pagination'
import { useCalls } from '@/entities/mediafile/hooks/use-calls'

export const Calls = () => {
  const { handlePageChange, totalPages, currentPage, totalEntries, startIndex, endIndex } =
    useCalls()

  return (
    <>
      <CallsTable />
      <div className="border border-t-0 rounded-b-xl border-gray-100 py-4 pl-[18px] pr-4 dark:border-white/[0.05]">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
          <div className="pb-3 xl:pb-0">
            <p className="pb-3 text-sm font-medium text-center text-gray-500 border-b border-gray-100 dark:border-gray-800 dark:text-gray-400 xl:border-b-0 xl:pb-0 xl:text-left">
              Отображаются от {startIndex + 1} до {endIndex} из {totalEntries} записей
            </p>
          </div>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </>
  )
}
