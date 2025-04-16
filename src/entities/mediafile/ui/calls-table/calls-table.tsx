'use client'

import { JSX } from 'react'
import Button from '@/shared/ui/button/button'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/shared/ui/table/table'
import { FilterIcon } from '@/../public/assets/icons'
import { appRoutes } from '@/shared/constants/routes'
import { columnConfig } from '@/shared/constants/header-table/calls-table/calls-table'
import { useCalls } from '@/entities/mediafile/hooks/use-calls'
import {
  getNegativeColorClass,
  getSilenceColorClass,
  getValueColorClass,
} from '@/shared/lib/color/get-color-class'
import AnalyticsFilterModal from '@/features/analytics/analytics-filter-modal/analytics-filter-modal'
import { ResetFiltersActive, ResetFilters, DownloadIcon } from '@/../public/assets/svg-components'
import { formatDatesTime, formatDuration } from '@/shared/utils/date-utils'
import Pagination from '@/shared/ui/pagination/pagination'
import { LoaderContent } from '@/shared/ui/loader'

export const CallsTable = (): JSX.Element => {
  const {
    isLoading,
    rowsPerPage,
    handleRowsPerPageChange,
    openFilterModal,
    handleDownload,
    handleSort,
    getSortDirection,
    filtersReset,
    mediaFilesDataTable,
    closeFilterModal,
    isFilterModalOpen,
    handleResetFilters,
    handleRefresh,
    applyFilters,
    router,
    filtersActive,
    handlePageChange,
    totalPages,
    currentPage,
    totalEntries,
    startIndex,
    endIndex,
  } = useCalls()

  return (
    <div className={'relative'}>
      {isLoading ? (
        <LoaderContent width={200} height={200} isLoading={isLoading} />
      ) : (
        <div className="overflow-hidden rounded-xl bg-white dark:bg-white/[0.03]">
          <div className="flex flex-col gap-2 px-4 py-4 border border-b-0 border-gray-100 dark:border-white/[0.05] rounded-t-xl sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <div className="flex items-center gap-3">
              <span className="text-gray-500 dark:text-gray-400">Показывать</span>
              <div className="relative z-20 bg-transparent">
                <select
                  className="w-[66px] py-2 pl-3 pr-8 text-sm text-gray-800 bg-transparent border border-gray-300 rounded-full appearance-none h-9 shadow-theme-xs cursor-pointer placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-1 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
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
                <span className="absolute z-10 text-gray-500 -translate-y-1/2 right-2 top-1/2 pointer-events-none dark:text-gray-400">
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
                className={`h-[44px] border border-gray-200 rounded-full ${filtersActive ? 'hover:bg-gray-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'} flex items-center gap-2`}
                onClick={handleResetFilters}
                disabled={!filtersActive}
              >
                <span>Сброс</span>
                {filtersActive ? (
                  <ResetFiltersActive width={20} height={20} />
                ) : (
                  <ResetFilters width={20} height={20} />
                )}
              </Button>
              <Button
                className="h-[44px] border border-gray-200 rounded-full hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                onClick={handleRefresh}
              >
                <span>Обновить</span>
              </Button>
              <Button
                className="w-[155px] h-[44px] border border-gray-200 rounded-full hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                onClick={handleDownload}
              >
                <span>Скачать XLS</span>
                <DownloadIcon width={18} height={18} />
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
                          onClick={() => column.sortable && handleSort(column.key)}
                        >
                          <div className="flex gap-3">
                            <span className="font-medium text-gray-700 text-theme-xs dark:text-gray-400">
                              {column.label}
                            </span>
                          </div>
                          {column.sortable && (
                            <button className="flex items-center justify-center">
                              <svg
                                className={`${getSortDirection(column.key) === 'ascending' ? 'text-gray-700 dark:text-white' : 'text-gray-300 dark:text-gray-700'}`}
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
                  {mediaFilesDataTable && mediaFilesDataTable.length > 0 ? (
                    mediaFilesDataTable.map(item => {
                      const summaryAnalyserResult = item?.summaryAnalyserResult || {}
                      const negativeValue = Math.round(
                        (summaryAnalyserResult?.negativeLevelOverall || 0) * 100
                      )
                      const silenceSeconds =
                        summaryAnalyserResult?.maxSimultaneousSilenceDuration || 0
                      const lexis = Object.keys(
                        summaryAnalyserResult?.keywordsSearchCounter || {}
                      ).length
                      const interruptions = summaryAnalyserResult?.simultaneousSpeechCount || 0
                      const clientNumber = item?.additionalMetadata?.clientNumber || 'Н/Д'

                      return (
                        <TableRow
                          className="cursor-pointer hover:bg-gray-100"
                          key={item.id}
                          onClick={() =>
                            item?.id && router.push(appRoutes.private.call(String(item.id)))
                          }
                        >
                          <TableCell className="px-4 py-4 border-b border-l border-gray-100 text-gray-800 dark:border-white/[0.05] dark:text-white/90 whitespace-nowrap">
                            {item?.createDate ? formatDatesTime(new Date(item.createDate)) : 'Н/Д'}
                          </TableCell>
                          <TableCell className="px-4 py-4 border-b border-gray-100 font-semibold text-gray-800 dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap">
                            {item?.operatorName || 'Н/Д'}
                          </TableCell>
                          <TableCell className="px-4 py-4 border-b border-gray-100 font-normal text-gray-800 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
                            {clientNumber}
                          </TableCell>
                          <TableCell className="px-4 py-4 border-b border-gray-100 font-normal text-gray-800 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
                            {typeof item?.duration === 'number'
                              ? formatDuration(item.duration)
                              : 'Н/Д'}
                          </TableCell>
                          <TableCell className="px-4 py-4 border-b border-gray-100 font-normal dark:border-white/[0.05] text-theme-sm whitespace-nowrap">
                            <span
                              className={`text-sm font-normal ${getNegativeColorClass(negativeValue)}`}
                            >
                              {`${negativeValue}%`}
                            </span>
                          </TableCell>
                          <TableCell className="px-4 py-4 border-b border-gray-100 font-normal dark:border-white/[0.05] text-theme-sm whitespace-nowrap">
                            <span className={`${getValueColorClass(lexis)}`}>{lexis}</span>
                          </TableCell>
                          <TableCell className="px-4 py-4 border-b border-gray-100 font-normal dark:border-white/[0.05] text-theme-sm whitespace-nowrap">
                            <span className={`${getValueColorClass(interruptions)}`}>
                              {interruptions}
                            </span>
                          </TableCell>
                          <TableCell className="px-4 py-4 border-b border-r border-gray-100 font-normal dark:border-white/[0.05] text-theme-sm whitespace-nowrap">
                            <span className={`${getSilenceColorClass(silenceSeconds)}`}>
                              {formatDuration(silenceSeconds)}
                            </span>
                          </TableCell>
                        </TableRow>
                      )
                    })
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
            storagePrefix="_calls"
            filtersReset={filtersReset}
          />
          <div className="border border-t-0 rounded-b-xl border-gray-100 py-4 pl-[18px] pr-4 dark:border-white/[0.05]">
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
              <div className="pb-3 xl:pb-0">
                {totalEntries && totalEntries > 0 && (
                  <p className="pb-3 text-sm font-medium text-center text-gray-500 border-b border-gray-100 dark:border-gray-800 dark:text-gray-400 xl:border-b-0 xl:pb-0 xl:text-left">
                    Отображаются от {(startIndex || 0) + 1} до {endIndex || 0} из {totalEntries}{' '}
                    записей
                  </p>
                )}
              </div>
              {totalPages && totalPages > 1 && (
                <Pagination
                  currentPage={currentPage || 1}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
