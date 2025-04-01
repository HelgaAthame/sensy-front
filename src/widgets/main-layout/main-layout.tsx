'use client'

import { useSidebar } from '@/shared/sidebar/context/sidebar-context'
import { Sidebar } from '@/shared/sidebar/ui/sidebar'
import Backdrop from '@/shared/backdrop/backdrop'
import { Header } from '@/shared/header/header'
import { ReactElement, ReactNode } from 'react'
import { RootLayout } from '@/widgets/root-layout/root-layout'

interface MainLayoutProps {
  children: ReactNode
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar()

  return (
    <RootLayout>
      <div className="min-h-screen xl:flex">
        <div>
          <Sidebar />
          <Backdrop />
        </div>
        <div
          className={`flex-1 transition-all duration-300 ease-in-out ${
            isExpanded || isHovered ? 'lg:ml-[290px]' : 'lg:ml-[90px]'
          } ${isMobileOpen ? 'ml-0' : ''}`}
        >
          <Header />
          <main className="p-4 mx-auto max-w-[--breakpoint-2xl] md:p-6">{children}</main>
        </div>
      </div>
    </RootLayout>
  )
}

export const getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}
