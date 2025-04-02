import { Projects } from '@/features/projects/projects'
import { UploadingRecord } from '@/features/uploading-record/uploading-record'

interface UploadingRecordPageProps {
  params: Promise<Record<string, never>>
  searchParams: Promise<{ canonical?: string }>
}

export default function UploadingRecordPage() {
  return <UploadingRecord />
}
