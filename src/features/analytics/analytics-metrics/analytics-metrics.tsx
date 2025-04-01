import Badge from '@/shared/badge/badge'

const mockData = [
  {
    id: 1,
    title: 'Количество звонков',
    value: '12 257',
  },
  {
    id: 2,
    title: 'Средняя длительность звонка',
    value: '2 мин 57 сек',
  },
  {
    id: 3,
    title: 'Средний процент негатива',
    value: '54%',
    color: 'error',
  },
  {
    id: 4,
    title: 'Среднее количество стоп-слов',
    value: '25',
  },
  {
    id: 5,
    title: 'Средняя длительность синхр. паузы',
    value: '2 мин 57 сек',
  },
  {
    id: 6,
    title: 'Среднее число перебиваний',
    value: '25',
  },
]

const AnalyticsMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
      {mockData.map(item => (
        <div
          key={item.id}
          className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-200 dark:bg-white/[0.03]"
        >
          <p className="text-gray-500 text-sm dark:text-gray-400 mb-3 leading-[32px]">
            {item.title}
          </p>
          <h4 className="text-2xl font-bold text-neutral-900 leading-[32px]">{item.value}</h4>
        </div>
      ))}
    </div>
  )
}

export default AnalyticsMetrics
