import { ru } from 'date-fns/locale'
import { formatInTimeZone } from 'date-fns-tz'
import { subDays, endOfDay, startOfDay } from 'date-fns'

export const formatDates = (date: Date | null): string | undefined => {
  if (!date) {
    return undefined
  }

  return formatInTimeZone(date, 'UTC', 'dd.MM.yyyy', { locale: ru })
}

export const getDateRange = (days = 7) => {
  const end = new Date()
  const start = subDays(end, days)

  return {
    start: formatInTimeZone(startOfDay(start), 'UTC', "yyyy-MM-dd'T'00:00:00'Z'"),
    end: formatInTimeZone(endOfDay(end), 'UTC', "yyyy-MM-dd'T'23:59:59'Z'"),
  }
}

export const getLast7DaysRange = () => getDateRange(7)

export const getLast30DaysRange = () => getDateRange(30)

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

export const formatDateWithLocalTimeZone = (selectedDate: string | null): string => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  let dateToFormat: Date

  if (selectedDate) {
    const selectedDateObj = new Date(selectedDate)
    const now = new Date()

    selectedDateObj.setHours(
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
      now.getMilliseconds()
    )
    dateToFormat = selectedDateObj
  } else {
    dateToFormat = new Date()
  }

  return formatInTimeZone(dateToFormat, timeZone, "yyyy-MM-dd'T'HH:mm:ss.SSS")
}
