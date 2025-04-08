'use client'

import { useState, useEffect } from 'react'
import Button from '@/shared/button/button'
import { Modal } from '@/shared/modal/modal'
import DatePicker from '@/shared/date-picker/date-picker'
import { useGetVocabularyQuery } from '@/entities/dictionaries/dictionaries.api'
import Checkbox from '@/shared/checkbox/checkbox'
import { formatEndDate, formatStartDate } from '@/shared/utils/date-utils'

interface DateRange {
  start: string
  end: string
}

interface AnalyticsFilterModalProps {
  isOpen: boolean
  onClose: () => void
  onApply: (params: {
    start: string
    end: string
    filterByPhrasesCategoriesCommaSeparated: string
  }) => void
}

export const AnalyticsFilterModal = ({ isOpen, onClose, onApply }: AnalyticsFilterModalProps) => {
  const { data: vocabularyData } = useGetVocabularyQuery()
  const [selectedDictionaries, setSelectedDictionaries] = useState<number[]>([])
  const [dateRange, setDateRange] = useState<DateRange>()

  useEffect(() => {
    if (vocabularyData) {
      setSelectedDictionaries([]) // Reset when vocab changes
    }
  }, [vocabularyData])

  const handleDictionaryChange = (dictionaryId: number): void => {
    setSelectedDictionaries(prev =>
      prev.includes(dictionaryId) ? prev.filter(id => id !== dictionaryId) : [...prev, dictionaryId]
    )
  }

  const handleApply = () => {
    onApply({
      start: dateRange?.start ?? '',
      end: dateRange?.end ?? '',
      filterByPhrasesCategoriesCommaSeparated: selectedDictionaries.join(','),
    })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} title={'Фильтр'} onClose={onClose} className="max-w-[410px] mx-auto">
      <div className="p-4">
        <h3 className="text-sm font-semibold mb-2">Выберите диапазон</h3>
        <DatePicker
          id="date-range-picker"
          mode="range"
          value={dateRange}
          placeholder="dd/mm/yyyy"
          onChange={(selectedDates, dateStr) => {
            if (selectedDates && selectedDates.length === 2) {
              setDateRange({
                start: formatStartDate(selectedDates[0], 'Europe/Moscow') || '',
                end: formatEndDate(selectedDates[1], 'Europe/Moscow') || '',
              })
            }
          }}
        />

        <h3 className="text-sm font-medium mt-4 mb-2">Словари</h3>
        <div className="space-y-2">
          {vocabularyData &&
            Object.entries(vocabularyData).map(([id, name]) => (
              <div key={id} className="flex items-center">
                <Checkbox
                  id={`dictionary-${id}`}
                  checked={selectedDictionaries.includes(Number(id))}
                  onChange={() => handleDictionaryChange(Number(id))}
                  className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor={`dictionary-${id}`} className="ml-2 text-sm text-gray-700">
                  {name}
                </label>
              </div>
            ))}
        </div>

        <div className="flex justify-between pt-4">
          <Button
            className="px-2 py-2 text-gray-700 hover:bg-gray-100 bg-white border border-gray-200 cursor-pointer rounded-full"
            onClick={onClose}
          >
            Отменить
          </Button>
          <Button
            className="px-2 py-2 bg-purple-900 text-white cursor-pointer hover:bg-purple-800 rounded-full"
            onClick={handleApply}
          >
            Применить
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default AnalyticsFilterModal
