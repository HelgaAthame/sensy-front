import { useCallback, useEffect, useState } from 'react'
import { formatEndDate, formatStartDate, getLast30DaysRange } from '@/shared/utils/date-utils'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  useGetMediaFilesQueryQuery,
  useLazyGetDownloadFileExcelQuery,
} from '@/entities/mediafile/api/mediafile.api'
import { columnConfig } from '@/shared/constants/header-table/calls-table/calls-table'
import { toast } from 'react-toastify'
import { useSortable } from '@/shared/hooks/use-sort'

export interface TableRowData {
  id: string
  date: string
  operator: string
  phone: string
  duration: string
  negative: string
  negativeValue: number
  lexis: number
  interruptions: number
  silence: string
  silenceSeconds: number
}

export const useCalls = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const [filtersReset, setFiltersReset] = useState(false)
  const defaultDateRange = getLast30DaysRange()
  const router = useRouter()
  const [selectedDictionary, setSelectedDictionary] = useState(['Словарь 1'])
  const [totalEntries, setTotalEntries] = useState<number>(0)
  const handleSortChange = (key: keyof TableRowData | null, isActive: boolean) => {
    updateSortParams(key as string, isActive)
  }
  const { sortConfig, requestSort, getSortState } = useSortable<TableRowData>(
    null,
    handleSortChange
  )

  const getSortParams = () => {
    if (!sortConfig.key || !sortConfig.isActive) return {}

    const params: Record<string, boolean> = {}

    switch (sortConfig.key) {
      case 'operator':
        params.orderByDescOperatorName = true
        break
      case 'date':
        params.orderByDescCreateDate = true
        break
      case 'phone':
        params.orderByDescClientNumber = true
        break
      case 'duration':
        params.orderByDescDuration = true
        break
      case 'negative':
        params.orderByDescNegativeLevel = true
        break
      case 'lexis':
        params.orderByDescPhrasesCount = true
        break
      case 'silence':
        params.orderByDescMaxSimultaneousSilence = true
        break
      default:
        break
    }

    return params
  }

  const getPrefix = () => {
    return window.location.pathname.replace(/\//g, '_')
  }

  const getFilterKey = useCallback((key: string) => `${getPrefix()}_filter-${key}`, [getPrefix])

  const getParamOrStorage = (paramName: string) => {
    const filterKey = getFilterKey(paramName)

    return searchParams.get(paramName) || localStorage.getItem(filterKey) || ''
  }

  const searchTerm = getParamOrStorage('search') || ''
  const startDate = getParamOrStorage('start') || defaultDateRange.start
  const endDate = getParamOrStorage('end') || defaultDateRange.end
  const currentPage = Number(getParamOrStorage('page') || 1)
  const filterByCategories =
    getParamOrStorage('filterByPhrasesCategoriesCommaSeparated') || undefined
  const initialRowsPerPage = Number(getParamOrStorage('limit')) || 10
  const [rowsPerPage, setRowsPerPage] = useState<number>(initialRowsPerPage)

  const queryParams = {
    start: startDate,
    end: endDate,
    offset: (currentPage - 1) * rowsPerPage,
    limit: rowsPerPage,
    searchPhrase: searchTerm,
    filterByPhrasesCategoriesCommaSeparated: filterByCategories,
    ...getSortParams(),
  }

  const { data: mediaFilesData, refetch, isLoading } = useGetMediaFilesQueryQuery(queryParams)
  const [downloadUrl] = useLazyGetDownloadFileExcelQuery()

  const mediaFilesDataTable = mediaFilesData?.mediaFile || []
  const totalCount = mediaFilesData?.totalCount || 0

  useEffect(() => {
    if (mediaFilesData) {
      setTotalEntries(mediaFilesData.totalCount || 0)
    }
  }, [mediaFilesData])

  const updateSearchParams = (newParams: Partial<Record<string, string | undefined>>) => {
    const params = new URLSearchParams(searchParams)
    let hasChanges = false

    Object.entries(newParams).forEach(([key, value]) => {
      const filterKey = getFilterKey(key)

      if (value === undefined || value === '') {
        if (params.has(key)) {
          params.delete(key)
          hasChanges = true
        }
        localStorage.removeItem(filterKey)
      } else {
        if (params.get(key) !== value) {
          params.set(key, value)
          hasChanges = true
        }
        localStorage.setItem(filterKey, value)
      }
    })

    if (hasChanges) {
      router.push(`?${params.toString()}`)
    }
  }

  const [filtersActive, setFiltersActive] = useState<boolean>(false)

  useEffect(() => {
    const isDefaultDateRange =
      startDate === defaultDateRange.start && endDate === defaultDateRange.end

    const datesActive = startDate && endDate && !isDefaultDateRange

    const active = Boolean(searchTerm || datesActive || filterByCategories)

    setFiltersActive(active)
    localStorage.setItem(getFilterKey('_calls_filter-filtersActive'), JSON.stringify(active))
  }, [searchTerm, startDate, endDate, filterByCategories, defaultDateRange])

  const updateSortParams = (key: string | null, isActive: boolean) => {
    ;[
      'orderByDescOperatorName',
      'orderByDescCreateDate',
      'orderByDescClientNumber',
      'orderByDescDuration',
      'orderByDescNegativeLevel',
      'orderByDescPhrasesCount',
      'orderByDescMaxSimultaneousSilence',
    ].forEach(param => {
      params.delete(param)
    })

    if (key && isActive) {
      switch (key) {
        case 'operator':
          params.set('orderByDescOperatorName', 'true')
          break
        case 'date':
          params.set('orderByDescCreateDate', 'true')
          break
        case 'phone':
          params.set('orderByDescClientNumber', 'true')
          break
        case 'duration':
          params.set('orderByDescDuration', 'true')
          break
        case 'negative':
          params.set('orderByDescNegativeLevel', 'true')
          break
        case 'lexis':
          params.set('orderByDescPhrasesCount', 'true')
          break
        case 'silence':
          params.set('orderByDescMaxSimultaneousSilence', 'true')
          break
      }
    }
    updateSearchParams({ page: '1' })

    router.push(`?${params.toString()}`)
  }

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

  const handleDateRangeChange = (dates: Date[]) => {
    if (Array.isArray(dates)) {
      const [startDate, endDate] = dates

      updateSearchParams({
        endDate: endDate ? formatEndDate(endDate, 'Europe/Moscow') : undefined,
        startDate: startDate ? formatStartDate(startDate, 'Europe/Moscow') : undefined,
      })
    }
  }

  const handleApplyFilter = () => {
    params.set('page', '1')
    refetch()
    closeFilterModal()
  }

  const totalPages: number = Math.ceil(totalCount / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = Math.min(startIndex + rowsPerPage, totalEntries)

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      updateSearchParams({ page: page.toString() })
    }
  }

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const newRowsPerPage = parseInt(e.target.value, 10)
    setRowsPerPage(newRowsPerPage)

    updateSearchParams({
      page: '1',
      limit: newRowsPerPage.toString(),
    })

    refetch()
  }

  const handleSort = (key: keyof TableRowData) => {
    requestSort(key, columnConfig)
  }

  const getSortDirection = (key: string): string => {
    const state = getSortState(key as keyof TableRowData)
    return state === 'active' ? 'ascending' : ''
  }

  const handleDownload = async () => {
    try {
      const result = await downloadUrl().unwrap()

      if (result) {
        const link = document.createElement('a')
        link.href = result
        link.download = 'mediafile.xlsx'
        document.body.appendChild(link)
        link.click()
        link.remove()
      }
    } catch (error) {
      toast.error('Ошибка при загрузке файла.')
    }
  }

  const applyFilters = (newParams: Record<string, string>) => {
    updateSearchParams({
      ...newParams,
      page: '1',
    })
    setIsFilterModalOpen(false)
  }

  const resetSearchParams = () => {
    const params = new URLSearchParams(searchParams)
    params.forEach((_, key) => {
      params.delete(key)
    })
    router.push(window.location.pathname)
  }

  const handleResetFilters = () => {
    resetSearchParams()
    const prefixKey = getPrefix()
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(`${prefixKey}_filter-`)) {
        localStorage.removeItem(key)
      }
    })

    setFiltersReset(true)

    setTimeout(() => {
      setFiltersReset(false)
    }, 100)
  }

  const handleRefresh = () => {
    refetch()
    toast.success('Данные успешно обновлены')
  }

  return {
    isLoading,
    filtersReset,
    mediaFilesDataTable,
    filtersActive,
    currentPage,
    rowsPerPage,
    totalEntries,
    totalPages,
    startIndex,
    endIndex,
    sortConfig,
    selectedDictionary,
    isFilterModalOpen,
    startDate,
    endDate,
    router,

    // Methods
    getParamOrStorage,
    getFilterKey,
    handlePageChange,
    handleRefresh,
    handleResetFilters,
    applyFilters,
    handleRowsPerPageChange,
    handleSort,
    getSortDirection,
    openFilterModal,
    closeFilterModal,
    handleDictionaryChange,
    handleDateRangeChange,
    handleApplyFilter,
    handleDownload,
    setSelectedDictionary,
  }
}
