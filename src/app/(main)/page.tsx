import { Analytics } from '@/features/analytics/analytics'

interface AnalyticsPageProps {
  params: Promise<Record<string, never>>
  searchParams: Promise<{ canonical?: string }>
}

export default function Home() {
  return <Analytics />
}
