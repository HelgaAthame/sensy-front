import { SummaryData } from '@/entities/analytics/analytics.types';

interface AnalyticsMetricsProps {
  data?: SummaryData;
}

const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes} мин ${remainingSeconds} сек`;
};

const formatPercentage = (value: number): string => {
  return `${(value * 100).toFixed(2)}%`;
};

const metricsMapping = [
  {
    key: 'recordsCount',
    title: 'Количество звонков',
    format: (value: number) => value.toLocaleString('ru-RU'),
  },
  {
    key: 'averageDuration',
    title: 'Средняя длительность звонка',
    format: formatDuration,
  },
  {
    key: 'averageNegativeLevelOverall',
    title: 'Средний процент негатива',
    format: formatPercentage,
    color: 'error',
  },
  {
    key: 'averageKeywordsCount',
    title: 'Среднее количество стоп-слов',
    format: (value: number) => value.toFixed(2),
  },
  {
    key: 'averageMaxSimultaneousSilenceDuration',
    title: 'Средняя длительность синхр. паузы',
    format: formatDuration,
  },
  {
    key: 'averageSimultaneousSpeechCount',
    title: 'Среднее число перебиваний',
    format: (value: number) => value.toFixed(2) + '%',
  },
] as const;

const AnalyticsMetrics: React.FC<AnalyticsMetricsProps> = ({
  data,
}: AnalyticsMetricsProps) => {
  if (!data) return null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
      {metricsMapping.map(({ key, title, format }) => (
        <div
          key={key}
          className="rounded-2xl border border-gray-100 bg-white p-5 dark:border-gray-100 dark:bg-white/[0.03]"
        >
          <p className="text-gray-500 text-sm dark:text-gray-400 mb-3 leading-[32px]">
            {title}
          </p>
          <h4 className={`text-2xl font-bold leading-[32px]`}>
            {format(data[key as keyof SummaryData])}
          </h4>
        </div>
      ))}
    </div>
  );
};

export default AnalyticsMetrics;
