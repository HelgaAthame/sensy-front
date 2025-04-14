'use client'

import Pagination from '@/shared/pagination/pagination'
import { ReactNode, useEffect, useState } from 'react'
import { useCalls } from '@/entities/mediafile/hooks/use-calls'
import { getFromLocalStorage } from '@/shared/utils/common-utils'
import { UploadAlert } from '@/shared/upload-alert/upload-alert'

interface CallsFeatureWrapperProps {
  children: ReactNode
}

export const CallsFeatureWrapper = ({ children }: CallsFeatureWrapperProps) => {
  const { handlePageChange, totalPages, currentPage, totalEntries, startIndex, endIndex } =
    useCalls()

  const [showUploadAlert, setShowUploadAlert] = useState(false)

  useEffect(() => {
    const checkForRecentUpload = () => {
      const lastUploadTimestamp = getFromLocalStorage('lastUploadTimestamp', '')

      if (lastUploadTimestamp) {
        const uploadTime = parseInt(lastUploadTimestamp, 10)
        const currentTime = new Date().getTime()
        const timeDifference = currentTime - uploadTime

        if (timeDifference < 600000) {
          setShowUploadAlert(true)

          const remainingTime = 600000 - timeDifference
          const timeoutId = setTimeout(() => {
            setShowUploadAlert(false)
          }, remainingTime)

          return () => clearTimeout(timeoutId)
        }
      }
    }

    checkForRecentUpload()

    window.addEventListener('focus', checkForRecentUpload)
    return () => window.removeEventListener('focus', checkForRecentUpload)
  }, [])

  const handleCloseAlert = () => {
    setShowUploadAlert(false)
  }

  return (
    <>
      {showUploadAlert && (
        <UploadAlert
          onClose={handleCloseAlert}
          title={'Внимание! Загруженная запись обрабатывается и будет доступна скоро.'}
        />
      )}
      {children}
    </>
  )
}
