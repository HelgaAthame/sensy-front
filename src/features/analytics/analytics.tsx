import AnalyticsMetrics from '@/features/analytics/analytics-metrics/analytics-metrics'
import AnalyticsBarChart from '@/features/analytics/analytics-bar-chart/analytics-bar-chart'
import ImpressionChart from '@/features/analytics/analytics-impression-chart/analytics-impression-chart'
import TopChannel from '@/features/analytics/top-channel/top-channel'
import TopPages from '@/features/analytics/top-pages/top-pages'

export const Analytics = () => {
  return (
    <div className="p-4 bg-white rounded-lg">
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
