'use client'

import { useState, JSX } from 'react'
import Button from '@/shared/button/button'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/shared/table/table'
import Pagination from '@/shared/pagination/pagination'
import { DownloadIcon, FilterIcon } from '@/../public/assets/icons'
import { appRoutes } from '@/shared/constants/routes'
import { Modal } from '@/shared/modal/modal'
import DatePicker from '@/shared/date-picker/date-picker'
import { useSortable } from '@/shared/hooks/use-sort'
import { useRouter } from 'next/navigation'

interface TableRowData {
  id: string
  date: string
  operator: string
  phone: string
  duration: string
  negative: string
  lexis: number
  interruptions: number
  silence: string
}

interface ColumnConfig {
  key: keyof TableRowData
  label: string
  sortable: boolean
}

const tableRowData: TableRowData[] = [
  {
    id: '1',
    date: '27 мар., 18:54',
    operator: 'Lindsey Curtis',
    phone: '+123 (45) 678-91-01',
    duration: '00:02:57',
    negative: '51%',
    lexis: 1,
    interruptions: 1,
    silence: '00:00:22',
  },
  {
    id: '2',
    date: '28 мар., 18:54',
    operator: 'Lindsey Curtis',
    phone: '+123 (45) 678-91-01',
    duration: '00:02:57',
    negative: '51%',
    lexis: 1,
    interruptions: 1,
    silence: '00:00:22',
  },
  {
    id: '3',
    date: '29 мар., 18:54',
    operator: 'Lindsey Curtis',
    phone: '+123 (45) 678-91-01',
    duration: '00:02:57',
    negative: '51%',
    lexis: 1,
    interruptions: 1,
    silence: '00:00:22',
  },
  {
    id: '4',
    date: '30 мар., 18:54',
    operator: 'Lindsey Curtis',
    phone: '+123 (45) 678-91-01',
    duration: '00:02:57',
    negative: '51%',
    lexis: 1,
    interruptions: 1,
    silence: '00:00:22',
  },
  {
    id: '5',
    date: '31 мар., 18:54',
    operator: 'Lindsey Curtis',
    phone: '+123 (45) 678-91-01',
    duration: '00:02:57',
    negative: '51%',
    lexis: 1,
    interruptions: 1,
    silence: '00:00:22',
  },
  {
    id: '6',
    date: '01 апр., 18:54',
    operator: 'Lindsey Curtis',
    phone: '+123 (45) 678-91-01',
    duration: '00:02:57',
    negative: '51%',
    lexis: 1,
    interruptions: 1,
    silence: '00:00:22',
  },
  {
    id: '7',
    date: '02 апр., 18:54',
    operator: 'Lindsey Curtis',
    phone: '+123 (45) 678-91-01',
    duration: '00:02:57',
    negative: '51%',
    lexis: 1,
    interruptions: 1,
    silence: '00:00:22',
  },
  {
    id: '8',
    date: '03 апр., 18:54',
    operator: 'Lindsey Curtis',
    phone: '+123 (45) 678-91-01',
    duration: '00:02:57',
    negative: '51%',
    lexis: 1,
    interruptions: 1,
    silence: '00:00:22',
  },
  {
    id: '9',
    date: '04 апр., 18:54',
    operator: 'Lindsey Curtis',
    phone: '+123 (45) 678-91-01',
    duration: '00:02:57',
    negative: '51%',
    lexis: 1,
    interruptions: 1,
    silence: '00:00:22',
  },
  {
    id: '11',
    date: '05 апр., 18:54',
    operator: 'Lindsey Curtis',
    phone: '+123 (45) 678-91-01',
    duration: '00:02:57',
    negative: '51%',
    lexis: 1,
    interruptions: 1,
    silence: '00:00:22',
  },
]

const columnConfig: ColumnConfig[] = [
  { key: 'date', label: 'Дата', sortable: false },
  { key: 'operator', label: 'Оператор', sortable: true },
  { key: 'phone', label: 'Номер телефона', sortable: false },
  { key: 'duration', label: 'Длительность', sortable: true },
  { key: 'negative', label: 'Негатив', sortable: true },
  { key: 'lexis', label: 'Лексика', sortable: true },
  { key: 'interruptions', label: 'Перебивания', sortable: true },
  { key: 'silence', label: 'Тишина (макс.)', sortable: true },
]

export const CallsTable = (): JSX.Element => {
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const router = useRouter()
  const [selectedDictionary, setSelectedDictionary] = useState(['Словарь 1'])
  const { sortedData, requestSort, getSortDirection } = useSortable<TableRowData>(tableRowData)

  const openFilterModal = () => {
    setIsFilterModalOpen(true)
  }

  const closeFilterModal = () => {
    setIsFilterModalOpen(false)
  }

  const handleDictionaryChange = (dictionary: string) => {
    if (selectedDictionary.includes(dictionary)) {
      setSelectedDictionary(selectedDictionary.filter(item => item !== dictionary))
    } else {
      setSelectedDictionary([...selectedDictionary, dictionary])
    }
  }

  const totalPages: number = Math.ceil(tableRowData.length / rowsPerPage)

  const currentData = sortedData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
  const totalEntries = tableRowData.length
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = Math.min(startIndex + rowsPerPage, totalEntries)

  const handlePageChange = (page: number): void => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const newRowsPerPage = parseInt(e.target.value, 10)
    setRowsPerPage(newRowsPerPage)
    setCurrentPage(1)
  }

  const handleSort = (key: keyof TableRowData) => {
    requestSort(key, columnConfig)
  }

  return (
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
            onClick={() => {}}
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
                      index === 0 ? 'border-l' : index === columnConfig.length - 1 ? 'border-r' : ''
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
              {currentData.map(item => (
                <TableRow
                  className={'cursor-pointer hover:bg-gray-100'}
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
                  <TableCell className="px-4 py-4 border-b border-gray-100 font-normal text-gray-800 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      {item.negative}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-4 border-b border-gray-100 font-normal text-gray-800 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
                    {item.lexis}
                  </TableCell>
                  <TableCell className="px-4 py-4 border-b border-gray-100 font-normal text-gray-800 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
                    {item.interruptions}
                  </TableCell>
                  <TableCell className="px-4 py-4 border-b border-r border-gray-100 font-normal text-gray-800 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
                    {item.silence}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
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
      <Modal
        isOpen={isFilterModalOpen}
        title={'Фильтр'}
        onClose={closeFilterModal}
        className="max-w-[410px] mx-auto"
      >
        <div className="relative">
          {/* Filter content */}
          <div className="p-4">
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-2">Выберите диапазон</h3>
              <DatePicker id="date-range-picker" mode="range" placeholder="dd/mm/yyyy" />
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Словари</h3>
              <div className="space-y-3">
                {['Словарь 1', 'Словарь 2', 'Словарь 3', 'Словарь 4', 'Словарь 5'].map(
                  dictionary => (
                    <div key={dictionary} className="flex items-center">
                      <input
                        type="checkbox"
                        id={dictionary}
                        checked={selectedDictionary.includes(dictionary)}
                        onChange={() => handleDictionaryChange(dictionary)}
                        className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <label htmlFor={dictionary} className="ml-2 text-sm text-gray-700">
                        {dictionary}
                      </label>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="flex justify-between pt-2">
              <Button
                className="px-5 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg"
                onClick={closeFilterModal}
              >
                Отменить
              </Button>
              <Button
                className="px-5 py-2 bg-purple-600 text-white rounded-lg"
                onClick={closeFilterModal}
              >
                Применить
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
