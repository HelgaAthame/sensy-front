import { ThemeProvider } from '@/apps/theme-context/theme-context'
import { SidebarProvider } from '@/shared/sidebar/context/sidebar-context'
import { ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </ThemeProvider>
  )
}
