'use client'
import { ApexOptions } from 'apexcharts'
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface PlotDataItem {
  dateTime: string
  keywordsExceedCount: number
  maxSilenceDurationExceedCount: number
  negativeLevelExceedCount: number
  simultaneousSpeechExceedCount: number
}

interface ImpressionChartProps {
  data?: PlotDataItem[]
}

export default function ImpressionChart({ data }: ImpressionChartProps) {
  const russianMonths = [
    'Янв',
    'Фев',
    'Март',
    'Апр',
    'Май',
    'Июнь',
    'Июль',
    'Авг',
    'Сен',
    'Окт',
    'Нояб',
    'Дек',
  ]

  const emptyMonthsData = Array(12).fill(0)

  if (data && data.length > 0) {
    data.forEach(item => {
      const date = new Date(item.dateTime)
      const monthIndex = date.getMonth()

      emptyMonthsData[monthIndex] = {
        negativeLevelExceedCount: item.negativeLevelExceedCount || 0,
        keywordsExceedCount: item.keywordsExceedCount || 0,
        maxSilenceDurationExceedCount: item.maxSilenceDurationExceedCount || 0,
        simultaneousSpeechExceedCount: item.simultaneousSpeechExceedCount || 0,
      }
    })
  }

  // Extract data for each series
  const negativeLevelData = emptyMonthsData.map(item =>
    typeof item === 'number' ? 0 : item.negativeLevelExceedCount
  )
  const keywordsData = emptyMonthsData.map(item =>
    typeof item === 'number' ? 0 : item.keywordsExceedCount
  )
  const silenceData = emptyMonthsData.map(item =>
    typeof item === 'number' ? 0 : item.maxSilenceDurationExceedCount
  )
  const speechData = emptyMonthsData.map(item =>
    typeof item === 'number' ? 0 : item.simultaneousSpeechExceedCount
  )

  // Options for the chart
  const options: ApexOptions = {
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left',
    },
    colors: [],
    chart: {
      fontFamily: 'Outfit, sans-serif',
      height: 310,
      type: 'area',
      toolbar: {
        show: false,
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 1,
        opacityTo: 1,
      },
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    markers: {
      size: 4,
      hover: {
        size: 6,
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy',
      },
    },
    xaxis: {
      type: 'category',
      categories: russianMonths,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      title: {
        text: '',
      },
    },
  }

  const series = [
    {
      name: 'Негатив',
      data: negativeLevelData,
      color: '#5A2D76',
    },
    {
      name: 'Лексика',
      data: keywordsData,
      color: '#007AFF',
    },
    {
      name: 'Паузы',
      data: silenceData,
      color: '#FF3B30',
    },
    {
      name: 'Перебивания',
      data: speechData,
      color: '#FF9500',
    },
  ]

  return (
    <div className="rounded-2xl border border-gray-100 bg-white px-5 pt-5 dark:border-gray-200 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <h3 className="mb-1 text-lg font-semibold text-neutral-900">Analytics</h3>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="-ml-5 min-w-[1300px] xl:min-w-full pl-2">
          <Chart options={options} series={series} type="line" height={350} />
        </div>
      </div>
    </div>
  )
}
