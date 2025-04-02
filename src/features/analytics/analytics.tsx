'use client'

import AnalyticsMetrics from '@/features/analytics/analytics-metrics/analytics-metrics'
import AnalyticsBarChart from '@/features/analytics/analytics-bar-chart/analytics-bar-chart'
import ImpressionChart from '@/features/analytics/analytics-impression-chart/analytics-impression-chart'
import TopChannel from '@/features/analytics/top-channel/top-channel'
import TopPages from '@/features/analytics/top-pages/top-pages'
import { useGetAnalyticsDashboardQuery } from '@/entities/analytics/analytics.api'
import Button from '@/shared/button/button'
import { FilterIcon } from '../../../public/assets/icons'

export const Analytics = () => {
  const { data } = useGetAnalyticsDashboardQuery()

  return (
    <div className="bg-white rounded-lg">
      {/* Add page title and filter button */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Аналитика</h1>
        <Button className="w-[112px] h-[44px] border border-gray-200 rounded-full mb-2 flex items-center gap-2 cursor-pointer">
          <span>Фильтр</span>
          <FilterIcon width={20} height={20} />
        </Button>
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <AnalyticsMetrics />
        </div>
        <div className="col-span-12 md:col-span-6">
          <AnalyticsBarChart />
        </div>
        <div className="col-span-12 md:col-span-6">
          <ImpressionChart />
        </div>
        <div className="col-span-12 md:col-span-6">
          <TopChannel />
        </div>
        <div className="col-span-12 md:col-span-6">
          <TopPages />
        </div>
      </div>
    </div>
  )
}
