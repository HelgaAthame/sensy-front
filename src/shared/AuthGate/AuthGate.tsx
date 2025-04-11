'use client'

import { useAuthCheck } from '@/shared/hooks/useAuthCheck'
import { Loader } from '@/shared/loader'
import { usePathname } from 'next/navigation'
import { Fragment, type ReactNode } from 'react'
import { appRoutes } from '@/shared/constants/routes'
import { useMinWidth } from '@/shared/hooks/useMinWidth'

export const AuthGate = ({ children }: { children: ReactNode }) => {
  const { loading, isLoggedIn } = useAuthCheck()
  const pathName = usePathname()
  const showLoader = loading || (!isLoggedIn && pathName !== appRoutes.auth.signIn)

  const isWideEnough = useMinWidth(1024)
  return (
    <Fragment>
      {showLoader && <Loader bgColor="bg-white" textColor="text-gray-800" />}
      {isWideEnough ? (
        children
      ) : (
        <div className="p-6 text-lg h-screen flex items-center justify-center">
          Это приложение доступно только на экранах шириной от 1024px
        </div>
      )}
    </Fragment>
  )
}
