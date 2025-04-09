'use client'

import { JSX } from 'react'
import Button from '@/shared/button/button'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/shared/table/table'
import { DownloadIcon, FilterIcon } from '../../../../public/assets/icons'
import { appRoutes } from '@/shared/constants/routes'
import { columnConfig } from '@/shared/constants/header-table/calls-table/calls-table'
import { useCalls } from '@/entities/mediafile/hooks/use-calls'
import {
  getNegativeColorClass,
  getSilenceColorClass,
  getValueColorClass,
} from '@/shared/lib/color/get-color-class'
import AnalyticsFilterModal from '@/features/analytics/analytics-filter-modal/analytics-filter-modal'
import { Loader } from '@/shared/loader/loader'

export const CallsTable = (): JSX.Element => {
  const {
    rowsPerPage,
    handleRowsPerPageChange,
    openFilterModal,
    handleDownload,
    getSortDirection,
    isLoading,
    tableData,
    closeFilterModal,
    isFilterModalOpen,
    applyFilters,
    router,
  } = useCalls()

  return (
    <>
      {isLoading && <Loader message={'Загрузка звонков...'} />}
      <div className="overflow-hidden rounded-xl bg-white dark:bg-white/[0.03]">
        <div className="flex flex-col gap-2 px-4 py-4 border border-b-0 border-gray-100 dark:border-white/[0.05] rounded-t-xl sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div className="flex items-center gap-3">
            <span className="text-gray-500 dark:text-gray-400">Показывать</span>
            <div className="relative z-20 bg-transparent">
              <select
                className="w-[66px] py-2 pl-3 pr-8 text-sm text-gray-800 bg-transparent border border-gray-300 rounded-full appearance-none h-9 bg-none shadow-theme-xs cursor-pointer placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-1 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
              >
                <option value="10" className="text-gray-500 dark:bg-gray-900 dark:text-gray-400">
                  10
                </option>
                <option value="8" className="text-gray-500 dark:bg-gray-900 dark:text-gray-400">
                  8
                </option>
                <option value="5" className="text-gray-500 dark:bg-gray-900 dark:text-gray-400">
                  5
                </option>
              </select>
              <span className="absolute z-30 text-gray-500 -translate-y-1/2 right-2 top-1/2 dark:text-gray-400">
                <svg
                  className="stroke-current"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.8335 5.9165L8.00016 10.0832L12.1668 5.9165"
                    stroke=""
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
            <span className="text-gray-500 dark:text-gray-400">строк</span>
          </div>

          <div className="flex items-center gap-3">
            <Button
              className="w-[112px] h-[44px] border border-gray-200 rounded-full hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
              onClick={openFilterModal}
            >
              <span>Фильтр</span>
              <FilterIcon width={20} height={20} />
            </Button>
            <Button
              className="w-[116px] h-[44px] border border-gray-200 rounded-full hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
              onClick={handleDownload}
            >
              <span>Скачать</span>
              <DownloadIcon width={20} height={20} />
            </Button>
          </div>
        </div>

        <div className="max-w-full overflow-x-auto custom-scrollbar">
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  {columnConfig.map((column, index) => (
                    <TableCell
                      key={column.key}
                      isHeader
                      className={`px-4 py-3 border-y ${
                        index === 0
                          ? 'border-l'
                          : index === columnConfig.length - 1
                            ? 'border-r'
                            : ''
                      } border-gray-100 dark:border-white/[0.05]`}
                    >
                      <div
                        className={`flex items-center gap-2 ${column.sortable ? 'cursor-pointer' : ''}`}
                        // onClick={() => column.sortable && handleSort(column.key)}
                      >
                        <div className="flex gap-3">
                          <span className="font-medium text-gray-700 text-theme-xs dark:text-gray-400">
                            {column.label}
                          </span>
                        </div>
                        {column.sortable && (
                          <button className="flex flex-col gap-0.5">
                            <svg
                              className={`${getSortDirection(column.key) === 'ascending' ? 'text-gray-700 dark:text-white' : 'text-gray-300 dark:text-gray-700'}`}
                              width="8"
                              height="5"
                              viewBox="0 0 8 5"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4.40962 0.585167C4.21057 0.300808 3.78943 0.300807 3.59038 0.585166L1.05071 4.21327C0.81874 4.54466 1.05582 5 1.46033 5H6.53967C6.94418 5 7.18126 4.54466 6.94929 4.21327L4.40962 0.585167Z"
                                fill="currentColor"
                              />
                            </svg>
                            <svg
                              className={`${getSortDirection(column.key) === 'descending' ? 'text-gray-700 dark:text-white' : 'text-gray-300 dark:text-gray-700'}`}
                              width="8"
                              height="5"
                              viewBox="0 0 8 5"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4.40962 4.41483C4.21057 4.69919 3.78943 4.69919 3.59038 4.41483L1.05071 0.786732C0.81874 0.455343 1.05582 0 1.46033 0H6.53967C6.94418 0 7.18126 0.455342 6.94929 0.786731L4.40962 4.41483Z"
                                fill="currentColor"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell
                      colSpan={columnConfig.length}
                      className="px-4 py-4 text-center border border-gray-100"
                    >
                      Загрузка данных...
                    </TableCell>
                  </TableRow>
                ) : tableData.length > 0 ? (
                  tableData.map(item => (
                    <TableRow
                      className="cursor-pointer hover:bg-gray-100"
                      key={item.id}
                      onClick={() => router.push(appRoutes.private.call(item.id))}
                    >
                      <TableCell className="px-4 py-4 border-b border-l border-gray-100 text-gray-800 dark:border-white/[0.05] dark:text-white/90 whitespace-nowrap">
                        {item.date}
                      </TableCell>
                      <TableCell className="px-4 py-4 border-b border-gray-100 font-semibold text-gray-800 dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap">
                        {item.operator}
                      </TableCell>
                      <TableCell className="px-4 py-4 border-b border-gray-100 font-normal text-gray-800 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
                        {item.phone}
                      </TableCell>
                      <TableCell className="px-4 py-4 border-b border-gray-100 font-normal text-gray-800 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
                        {item.duration}
                      </TableCell>
                      <TableCell className="px-4 py-4 border-b border-gray-100 font-normal dark:border-white/[0.05] text-theme-sm whitespace-nowrap">
                        <span
                          className={`text-sm font-normal ${getNegativeColorClass(item.negativeValue)}`}
                        >
                          {item.negative}
                        </span>
                      </TableCell>
                      <TableCell className="px-4 py-4 border-b border-gray-100 font-normal dark:border-white/[0.05] text-theme-sm whitespace-nowrap">
                        <span className={`${getValueColorClass(item.lexis)}`}>{item.lexis}</span>
                      </TableCell>
                      <TableCell className="px-4 py-4 border-b border-gray-100 font-normal dark:border-white/[0.05] text-theme-sm whitespace-nowrap">
                        <span className={`${getValueColorClass(item.interruptions)}`}>
                          {item.interruptions}
                        </span>
                      </TableCell>
                      <TableCell className="px-4 py-4 border-b border-r border-gray-100 font-normal dark:border-white/[0.05] text-theme-sm whitespace-nowrap">
                        <span className={`${getSilenceColorClass(item.silenceSeconds)}`}>
                          {item.silence}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columnConfig.length}
                      className="px-4 py-4 text-center border border-gray-100"
                    >
                      Данные не найдены
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        <AnalyticsFilterModal
          isOpen={isFilterModalOpen}
          onClose={closeFilterModal}
          onApply={applyFilters}
        />
      </div>
    </>
  )
}
