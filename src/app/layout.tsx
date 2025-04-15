import '@/app/globals.css'
import Providers from '@/app/providers'
import { AuthGate } from '@/shared/AuthGate'
import { Arimo } from 'next/font/google'
import NavigationLoader from '@/shared/loader/navigation-loader-state/navigation-loader-state'

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
          <NavigationLoader />
          <AuthGate>{children}</AuthGate>
        </Providers>
      </body>
    </html>
  )
}
