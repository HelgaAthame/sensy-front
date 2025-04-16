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
    <div className="flex flex-col gap-6">
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
          <LoaderContent width={200} height={200} isLoading={isLoading} />
        </div>
      )}

      <DropzoneComponent onFileUploaded={handleFileUploaded} uploadedFile={uploadedFile} />
      <UploadForm
        uploadedFile={uploadedFile}
        onFileUploaded={handleFileUploaded}
        setIsLoading={setIsLoading}
      />
    </div>
  )
}
