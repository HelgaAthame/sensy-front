import { useEffect, useMemo, useState } from 'react'
import { formatDate, formatDuration, getLast30DaysRange } from '@/shared/utils/date-utils'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  useGetMediaFilesQueryQuery,
  useLazyGetDownloadFileExcelQuery,
} from '@/entities/mediafile/api/mediafile.api'
import { columnConfig } from '@/shared/constants/header-table/calls-table/calls-table'
import { toast } from 'react-toastify'

interface TableRowData {
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

interface FilterParams {
  start: string
  end: string
  filterByPhrasesCategoriesCommaSeparated?: string
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
  const [startDate, setStartDate] = useState<string>('2025-01-01')
  const [endDate, setEndDate] = useState<string>('2025-12-31')

  const [filterParams, setFilterParams] = useState<FilterParams>({
    start: defaultDateRange.start,
    end: defaultDateRange.end,
    filterByPhrasesCategoriesCommaSeparated: undefined,
  })

  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const getSortParams = () => {
    if (!sortColumn) return {}

    const params: Record<string, boolean> = {}

    switch (sortColumn) {
      case 'operator':
        params.orderByDescOperatorName = sortOrder === 'desc'
        break
      case 'date':
        params.orderByDescCreateDate = sortOrder === 'desc'
        break
      case 'phone':
        params.orderByDescClientNumber = sortOrder === 'desc'
        break
      case 'duration':
        params.orderByDescDuration = sortOrder === 'desc'
        break
      case 'negative':
        params.orderByDescNegativeLevel = sortOrder === 'desc'
        break
      case 'lexis':
        params.orderByDescPhrasesCount = sortOrder === 'desc'
        break
      case 'silence':
        params.orderByDescMaxSimultaneousSilence = sortOrder === 'desc'
        break
      default:
        break
    }

    return params
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
    if (dates[0]) {
      setStartDate(dates[0].toISOString().split('T')[0])
    }
    if (dates[1]) {
      setEndDate(dates[1].toISOString().split('T')[0])
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
    const column = columnConfig.find(col => col.key === key)
    if (!column?.sortable) return

    if (sortColumn === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(key)
      setSortOrder('asc')
    }

    params.set('page', '1')

    refetch()
  }

  const getSortDirection = (key: string): string => {
    if (key !== sortColumn) return ''
    return sortOrder === 'asc' ? 'ascending' : 'descending'
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

  const applyFilters = (params: any) => {
    setFilterParams({ ...filterParams, ...params })
    closeFilterModal()
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
    sortColumn,
    sortOrder,
    selectedDictionary,
    isFilterModalOpen,
    startDate,
    endDate,
    router,

    // Методы
    handlePageChange,
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
