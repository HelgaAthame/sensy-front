'use client'

import { CallsTable } from '@/entities/mediafile/ui/calls-table'
import Pagination from '@/shared/pagination/pagination'
import { useCalls } from '@/entities/mediafile/hooks/use-calls'
import { useEffect, useState } from 'react'
import { UploadAlert } from '@/shared/upload-alert/upload-alert'
import { getFromLocalStorage } from '@/shared/utils/common-utils'

export const Calls = () => {
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
      <CallsTable />
      <div className="border border-t-0 rounded-b-xl border-gray-100 py-4 pl-[18px] pr-4 dark:border-white/[0.05]">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
          <div className="pb-3 xl:pb-0">
            <p className="pb-3 text-sm font-medium text-center text-gray-500 border-b border-gray-100 dark:border-gray-800 dark:text-gray-400 xl:border-b-0 xl:pb-0 xl:text-left">
              Отображаются от {startIndex + 1} до {endIndex} из {totalEntries} записей
            </p>
          </div>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </>
  )
}
