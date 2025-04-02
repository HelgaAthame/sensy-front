import { Operators } from '@/features/operators/operators'

interface OperatorsPageProps {
  params: Promise<Record<string, never>>
  searchParams: Promise<{ canonical?: string }>
}

export default function OperatorsPage() {
  return <Operators />
}
