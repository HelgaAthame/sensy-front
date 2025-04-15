import '@/app/globals.css'
import Providers from '@/app/providers'
import { AuthGate } from '../widgets/AuthGate'
import { Arimo } from 'next/font/google'
import NavigationLoader from '@/shared/ui/loader/navigation-loader-state/navigation-loader-state'
import { Suspense } from 'react'

const arimo = Arimo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-arimo',
})

export const metadata = {
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={arimo.variable}>
        <Providers>
          <Suspense
            fallback={
              <div className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"></div>
            }
          >
            <NavigationLoader />
          </Suspense>
          <AuthGate>{children}</AuthGate>
        </Providers>
      </body>
    </html>
  )
}
