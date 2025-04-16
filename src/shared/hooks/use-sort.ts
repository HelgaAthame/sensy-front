import { useState, useEffect, useRef } from 'react'

export interface SortConfig<T> {
  key: keyof T | null
  isActive: boolean
}

export interface ColumnConfig<T> {
  key: keyof T
  label: string
  sortable: boolean
}

export function useSortable<T extends Record<string, any>>(
  initialKey: keyof T | null = null,
  onSortChange?: (key: keyof T | null, isActive: boolean) => void,
  initialActive: boolean = false
) {
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>({
    key: initialKey,
    isActive: initialActive,
  })

  const initialEffectCalled = useRef(false)

  useEffect(() => {
    if (!initialEffectCalled.current && initialActive && initialKey && onSortChange) {
      initialEffectCalled.current = true
      onSortChange(initialKey, true)
    }
  }, [])

  const requestSort = (key: keyof T, columnConfig: ColumnConfig<T>[]): void => {
    const column = columnConfig.find(col => col.key === key)
    if (!column || !column.sortable) return

    if (sortConfig.key === key && sortConfig.isActive) {
      setSortConfig({ key: null, isActive: false })
      if (onSortChange) onSortChange(null, false)
      return
    }

    setSortConfig({ key, isActive: true })
    if (onSortChange) onSortChange(key, true)
  }

  const getSortState = (key: keyof T): 'active' | null => {
    if (sortConfig.key !== key || !sortConfig.isActive) return null
    return 'active'
  }

  return {
    sortConfig,
    requestSort,
    getSortState,
  }
}
