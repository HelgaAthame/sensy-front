import { toast } from 'react-toastify'

import { ErrorWithData } from '@/shared/types/common-types'

export const showError = (error: ErrorWithData) => {
  if (typeof error === 'string') {
    return toast.error(error)
  }

  if (typeof error?.data === 'string') {
    return toast.error(error.data)
  }

  if (Array.isArray(error.data?.extensions)) {
    return toast.error(error.data.extensions[0].message)
  }
}

export function getFromLocalStorage<T>(key: string, initialData: T) {
  const data = localStorage.getItem(key)

  if (!data) {
    return initialData
  }

  return JSON.parse(data)
}

export function getFromSessionStorage<T>(key: string, initialData: T) {
  const data = sessionStorage.getItem(key)

  if (!data) {
    return initialData
  }

  return JSON.parse(data)
}

export const setToLocalStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const setToSessionStorage = <T>(key: string, value: T) => {
  sessionStorage.setItem(key, JSON.stringify(value))
}
