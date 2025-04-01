import { MainLayout } from '@/widgets/main-layout/main-layout'
import { ReactElement } from 'react'

export default function Layout({ children }: { children: ReactElement }) {
  return <MainLayout>{children}</MainLayout>
}
