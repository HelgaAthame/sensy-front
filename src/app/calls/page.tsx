import { Suspense } from 'react'
import { CallsFeatureWrapper } from '@/features/calls/calls-feature-wrapper/calls-feature-wrapper'
import { CallsTable } from '@/entities/mediafile/ui/calls-table/calls-table'

export default function CallsPage() {
  return (
    <Suspense
      fallback={
        <div className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"></div>
      }
    >
      <CallsFeatureWrapper>
        <CallsTable />
      </CallsFeatureWrapper>
    </Suspense>
  )
}
