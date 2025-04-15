import { MainLayout } from '@/widgets/main-layout/main-layout'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Аналитика',
}

export default function Layout({ children }: { children: ReactNode }) {
  return <MainLayout>{children}</MainLayout>
}
