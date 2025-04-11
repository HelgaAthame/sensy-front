import { useEffect, useMemo, useState } from 'react'
import { formatDate, formatDuration, getLast30DaysRange } from '@/shared/utils/date-utils'
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
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const currentPage = Number(searchParams.get('page') || 1)
  const defaultDateRange = getLast30DaysRange()
  const router = useRouter()
  const [selectedDictionary, setSelectedDictionary] = useState(['Словарь 1'])
  const [totalEntries, setTotalEntries] = useState<number>(0)

  const searchTerm = searchParams.get('search') || ''
  const startDate = searchParams.get('start') || defaultDateRange.start
  const endDate = searchParams.get('end') || defaultDateRange.end
  const filterByCategories =
    searchParams.get('filterByPhrasesCategoriesCommaSeparated') || undefined

  const filterParams = {
    start: startDate,
    end: endDate,
    filterByPhrasesCategoriesCommaSeparated: filterByCategories,
  }

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

    params.set('page', '1')

    router.push(`?${params.toString()}`)
  }

  const queryParams = {
    start: filterParams.start || startDate,
    end: filterParams.end || endDate,
    offset: (currentPage - 1) * rowsPerPage,
    limit: rowsPerPage,
    searchPhrase: searchTerm,
    filterByPhrasesCategoriesCommaSeparated: filterParams.filterByPhrasesCategoriesCommaSeparated,
    ...getSortParams(),
  }

  const { data: mediaFilesData, isLoading, refetch } = useGetMediaFilesQueryQuery(queryParams)
  const [downloadUrl] = useLazyGetDownloadFileExcelQuery()

  const mediaFiles = mediaFilesData?.mediaFile || []
  const totalCount = mediaFilesData?.totalCount || 0

  useEffect(() => {
    if (mediaFilesData) {
      setTotalEntries(mediaFilesData.totalCount || 0)
    }
  }, [mediaFilesData])

  const tableData = useMemo(() => {
    if (!mediaFiles) return []

    return mediaFiles.map((file): TableRowData => {
      const summaryAnalyserResult = file.summaryAnalyserResult || {}
      const additionalMetadata = file.additionalMetadata || {}

      const negativeValue = Math.round((summaryAnalyserResult.negativeLevelOverall || 0) * 100)

      const silenceSeconds = summaryAnalyserResult.maxSimultaneousSilenceDuration || 0

      return {
        id: file.id.toString(),
        date: formatDate(file.createDate),
        operator: file.operatorName || 'Неизвестно',
        phone: additionalMetadata.clientNumber || 'Неизвестно',
        duration: formatDuration(file.duration || 0),
        negative: `${negativeValue}%`,
        negativeValue: negativeValue,
        lexis: Object.keys(summaryAnalyserResult.keywordsSearchCounter || {}).length,
        interruptions: summaryAnalyserResult.simultaneousSpeechCount || 0,
        silence: formatDuration(silenceSeconds),
        silenceSeconds: silenceSeconds,
      }
    })
  }, [mediaFiles])

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
    const params = new URLSearchParams(searchParams)

    if (dates[0]) {
      const formattedStartDate = dates[0].toISOString().split('T')[0]
      params.set('start', formattedStartDate)
    }

    if (dates[1]) {
      const formattedEndDate = dates[1].toISOString().split('T')[0]
      params.set('end', formattedEndDate)
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

  const handlePageChange = (page: number): void => {
    if (page >= 1 && page <= totalPages) {
      params.set('page', page.toString())
      router.push(`?${params.toString()}`)
    }
  }

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const newRowsPerPage = parseInt(e.target.value, 10)
    setRowsPerPage(newRowsPerPage)
    params.set('page', '1')
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

  const applyFilters = (newParams: any) => {
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value as string)
      } else {
        params.delete(key)
      }
    })

    params.set('page', '1')
    router.push(`?${params.toString()}`)
    closeFilterModal()
  }

  const handleResetFilters = () => {
    const newParams = new URLSearchParams()
    router.push(`?${newParams.toString()}`)
  }

  return {
    tableData,
    isLoading,
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
    handlePageChange,
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
