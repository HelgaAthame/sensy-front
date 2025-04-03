import { useState, useMemo } from 'react'

export interface SortConfig<T> {
  key: keyof T | null
  direction: 'ascending' | 'descending' | null
}

export interface ColumnConfig<T> {
  key: keyof T
  label: string
  sortable: boolean
}

export function useSortable<T extends Record<string, any>>(data: T[]) {
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>({ key: null, direction: null })

  // Функция для запроса сортировки
  const requestSort = (key: keyof T, columnConfig: ColumnConfig<T>[]): void => {
    const column = columnConfig.find(col => col.key === key)
    if (!column || !column.sortable) return

    let direction: 'ascending' | 'descending' | null = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
      // Сбрасываем сортировку при третьем клике по колонке
      setSortConfig({ key: null, direction: null })
      return
    }
    setSortConfig({ key, direction })
  }

  // Получение направления сортировки для конкретного столбца
  const getSortDirection = (key: keyof T): 'ascending' | 'descending' | null => {
    if (sortConfig.key !== key) return null
    return sortConfig.direction
  }

  // Отсортированные данные на основе текущей конфигурации сортировки
  const sortedData = useMemo<T[]>(() => {
    let sortableData = [...data]
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        const key = sortConfig.key as keyof T

        // Обработка процентных значений
        if (
          typeof a[key] === 'string' &&
          typeof b[key] === 'string' &&
          a[key].toString().includes('%') &&
          b[key].toString().includes('%')
        ) {
          const aValue = parseFloat(a[key].toString().replace('%', ''))
          const bValue = parseFloat(b[key].toString().replace('%', ''))
          return sortConfig.direction === 'ascending' ? aValue - bValue : bValue - aValue
        }

        // Обработка временных значений
        if (
          typeof a[key] === 'string' &&
          typeof b[key] === 'string' &&
          a[key].toString().includes(':') &&
          b[key].toString().includes(':')
        ) {
          const aTime = a[key]
            .toString()
            .split(':')
            .reduce((acc: number, val: string) => acc * 60 + parseInt(val, 10), 0)
          const bTime = b[key]
            .toString()
            .split(':')
            .reduce((acc: number, val: string) => acc * 60 + parseInt(val, 10), 0)
          return sortConfig.direction === 'ascending' ? aTime - bTime : bTime - aTime
        }

        // Обработка числовых значений
        if (typeof a[key] === 'number' && typeof b[key] === 'number') {
          return sortConfig.direction === 'ascending'
            ? (a[key] as number) - (b[key] as number)
            : (b[key] as number) - (a[key] as number)
        }

        // Обработка строковых значений
        const aStr = a[key].toString()
        const bStr = b[key].toString()
        return sortConfig.direction === 'ascending'
          ? aStr.localeCompare(bStr)
          : bStr.localeCompare(aStr)
      })
    }
    return sortableData
  }, [data, sortConfig])

  return {
    sortConfig,
    sortedData,
    requestSort,
    getSortDirection,
  }
}
