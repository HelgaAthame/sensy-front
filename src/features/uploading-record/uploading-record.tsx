'use client'

import DropzoneComponent from '@/shared/ui/dropzone-component/dropzone-component'
import { UploadForm } from '@/features/uploading-record/upload-form'
import { useState } from 'react'
import { LoaderContent } from '@/shared/ui/loader'

export const UploadingRecord = () => {
  const [uploadedFile, setUploadedFile] = useState<File[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleFileUploaded = (file: File[]) => {
    setUploadedFile(file)
  }

  return (
    <div className="space-y-6">
      {isLoading ? (
        <LoaderContent width={200} height={200} isLoading={isLoading} />
      ) : (
        <>
          <DropzoneComponent onFileUploaded={handleFileUploaded} uploadedFile={uploadedFile} />
          <UploadForm
            uploadedFile={uploadedFile}
            onFileUploaded={handleFileUploaded}
            setIsLoading={setIsLoading}
          />
        </>
      )}
    </div>
  )
}
