'use client'

import { useState } from 'react'
import AnalyticsMetrics from '@/features/analytics/analytics-metrics/analytics-metrics'
import AnalyticsBarChart from '@/features/analytics/analytics-bar-chart/analytics-bar-chart'
import ImpressionChart from '@/features/analytics/analytics-impression-chart/analytics-impression-chart'
import TopChannel from '@/features/analytics/top-channel/top-channel'
import TopPages from '@/features/analytics/top-pages/top-pages'
import { useGetAnalyticsDashboardQuery } from '@/entities/analytics/analytics.api'
import Button from '@/shared/button/button'
import { FilterIcon } from '@/../public/assets/icons'
import AnalyticsFilterModal from '@/features/analytics/analytics-filter-modal/analytics-filter-modal'

const getLast7DaysRange = () => {
  const end = new Date()
  const start = new Date()
  start.setDate(end.getDate() - 7)
  return {
    start: start.toISOString().split('T')[0] + 'T00:00:00Z',
    end: end.toISOString().split('T')[0] + 'T23:59:59Z',
  }
}

export const Analytics = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const defaultDateRange = getLast7DaysRange()
  const [filterParams, setFilterParams] = useState({
    start: '2025-01-01T00:00:00Z',
    end: '2025-12-31T00:00:00Z',
    filterByPhrasesCategoriesCommaSeparated: undefined,
    offset: 0,
    limit: 10,
    topNKeywords: 5,
  })

  const { data } = useGetAnalyticsDashboardQuery(filterParams)

  const openFilterModal = () => setIsFilterModalOpen(true)
  const closeFilterModal = () => setIsFilterModalOpen(false)

  const applyFilters = (params: any) => {
    setFilterParams({ ...filterParams, ...params })
    closeFilterModal()
  }

  return (
    <div className="bg-white rounded-lg">
      {/* Add page title and filter button */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Аналитика</h1>
        <Button
          className="w-[112px] h-[44px] border border-gray-200 rounded-full mb-2 flex items-center gap-2 cursor-pointer"
          onClick={openFilterModal}
        >
          <span>Фильтр</span>
          <FilterIcon width={20} height={20} />
        </Button>
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <AnalyticsMetrics data={data?.summaryData} />
        </div>
        <div className="col-span-12 md:col-span-6">
          <ImpressionChart data={data?.plotData} />
        </div>
        <div className="col-span-12 md:col-span-6">
          <AnalyticsBarChart data={data?.negativeHistogramData} />
        </div>
        <div className="col-span-12 md:col-span-6">
          <TopChannel data={data?.operatorRatingData} />
        </div>
        <div className="col-span-12 md:col-span-6">
          <TopPages
            data={
              data?.keywordsFrequencyData
                ? Object.entries(data.keywordsFrequencyData).map(([keyword, count]) => ({
                    keyword,
                    count,
                  }))
                : []
            }
          />
        </div>
      </div>

      {/* Filter Modal */}
      <AnalyticsFilterModal
        isOpen={isFilterModalOpen}
        onClose={closeFilterModal}
        onApply={applyFilters}
      />
    </div>
  )
}
