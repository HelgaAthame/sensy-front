import '@/app/globals.css'
import Providers from '@/app/providers'
import { AuthGate } from "@/shared/AuthGate";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
    <html lang="en">
      <body>
        <Providers><AuthGate>{children}</AuthGate></Providers>
      </body>
    </html>
  )
}
