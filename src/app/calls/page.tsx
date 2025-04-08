import { Calls } from '@/features/calls/calls'
import { Suspense } from 'react'

export default function CallsPage() {
  return (
    <Suspense
      fallback={
        <div className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"></div>
      }
    >
      <Calls />
    </Suspense>
  )
}
