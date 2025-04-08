import { formatInTimeZone } from 'date-fns-tz'

export const getLast7DaysRange = () => {
  const end = new Date()
  const start = new Date()
  start.setDate(end.getDate() - 7)
  return {
    start: start.toISOString().split('T')[0] + 'T00:00:00Z',
    end: end.toISOString().split('T')[0] + 'T23:59:59Z',
  }
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, '0')
  const monthNames = [
    'янв',
    'фев',
    'мар',
    'апр',
    'май',
    'июн',
    'июл',
    'авг',
    'сен',
    'окт',
    'ноя',
    'дек',
  ]
  const month = monthNames[date.getMonth()]
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return `${day} ${month}., ${hours}:${minutes}`
}

export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = Math.floor(seconds % 60)

  return [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    remainingSeconds.toString().padStart(2, '0'),
  ].join(':')
}

export const formatTimeAgo = (date: Date): string => {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins} min ago`

  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours} hr ago`

  const diffDays = Math.floor(diffHours / 24)
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
}

export const formatStartDate = (
  date: Date | null,
  timeZone = 'Europe/Moscow'
): string | undefined => {
  if (!date) {
    return undefined
  }

  return formatInTimeZone(date, timeZone, "yyyy-MM-dd'T'00:00:00.000'Z'")
}

export const formatEndDate = (
  date: Date | null,
  timeZone = 'Europe/Moscow'
): string | undefined => {
  if (!date) {
    return undefined
  }

  return formatInTimeZone(date, timeZone, "yyyy-MM-dd'T'00:00:00.000'Z'")
}
