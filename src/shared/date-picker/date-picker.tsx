'use client'
import React, { useRef } from 'react'
import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.css'
import Label from '@/shared/label/label'
import { CalenderIcon } from '@/../public/assets/icons'

interface DateRange {
  start: string
  end: string
}

type DatePickerProps = {
  id: string
  value: string | DateRange | undefined
  onChange: (dates: Date[], dateStr: string) => void
  mode?: 'single' | 'multiple' | 'range' | 'time'
  label?: string
  placeholder?: string
}

export default function DatePicker({
  id,
  value,
  onChange,
  mode = 'single',
  label,
  placeholder,
}: DatePickerProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const getDefaultDate = (): string | string[] | undefined => {
    if (!value) return undefined
    if (typeof value === 'string') return value
    if ('start' in value && 'end' in value) {
      // Extract just the date part for flatpickr
      const startDate = value.start.split('T')[0]
      const endDate = value.end.split('T')[0]
      return [startDate, endDate]
    }
    return undefined
  }

  const getDisplayValue = (): string => {
    if (!value) return ''
    if (typeof value === 'string') return value
    if ('start' in value && 'end' in value) {
      const startDate = value.start.split('T')[0]
      const endDate = value.end.split('T')[0]
      return `${startDate} to ${endDate}`
    }
    return ''
  }

  const initFlatpickr = (node: HTMLInputElement | null) => {
    if (node) {
      flatpickr(node, {
        mode,
        dateFormat: 'Y-m-d',
        defaultDate: getDefaultDate(),
        onChange,
      })
      inputRef.current = node
    }
  }

  return (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="relative">
        <input
          id={id}
          ref={initFlatpickr}
          key={JSON.stringify(value)}
          defaultValue={getDisplayValue()}
          placeholder={placeholder}
          className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800"
        />
        <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
          <CalenderIcon className="size-6" />
        </span>
      </div>

      <style jsx global>{`
        .flatpickr-day.selected,
        .flatpickr-day.startRange,
        .flatpickr-day.endRange {
          background-color: #5a2d76 !important;
          border-color: #5a2d76 !important;
          color: white !important;
        }
      `}</style>
    </div>
  )
}
