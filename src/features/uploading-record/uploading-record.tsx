'use client'

import DropzoneComponent from '@/shared/dropzone-component/dropzone-component'
import { UploadForm } from '@/features/uploading-record/upload-form'
import PageBreadcrumb from '@/shared/page-breadcrumb/page-breadcrumb'
import { useState } from 'react'

export const UploadingRecord = () => {
  const [uploadedFile, setUploadedFile] = useState<File[] | null>(null)

  const handleFileUploaded = (file: File[]) => {
    setUploadedFile(file)
  }

  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Загрузка записи" />
      <DropzoneComponent onFileUploaded={handleFileUploaded} />
      <UploadForm uploadedFile={uploadedFile} />
    </div>
  )
}
