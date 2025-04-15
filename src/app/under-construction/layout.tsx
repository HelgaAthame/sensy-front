import { ReactNode } from 'react'
import { MainLayout } from '@/widgets/main-layout/main-layout'

export const metadata = {
  title: 'В разработке',
}

export default function Layout({ children }: { children: ReactNode }) {
  return <MainLayout>{children}</MainLayout>
}
