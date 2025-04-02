import DropzoneComponent from '@/shared/dropzone-component/dropzone-component'
import { UploadForm } from '@/features/uploading-record/upload-form'
import PageBreadcrumb from '@/shared/page-breadcrumb/page-breadcrumb'

export const UploadingRecord = () => {
  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Загрузка записи" />
      <DropzoneComponent />
      <UploadForm />
    </div>
  )
}
