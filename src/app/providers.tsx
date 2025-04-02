import { ThemeProvider } from '@/shared/context/theme-context/theme-context'
import { SidebarProvider } from '@/shared/sidebar/context/sidebar-context'
import { ReactNode } from 'react'
import { ReduxProvider } from '@/app/redux-provider'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ReduxProvider>
      <ThemeProvider>
        <SidebarProvider>{children}</SidebarProvider>
      </ThemeProvider>
    </ReduxProvider>
  )
}
