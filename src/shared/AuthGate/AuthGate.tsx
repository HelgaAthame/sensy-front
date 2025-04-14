'use client'

import { Loader } from '@/shared/loader'
import { usePathname } from 'next/navigation'
import { Fragment, type ReactNode } from 'react'
import { useMinWidth } from '@/shared/hooks/useMinWidth'
import { isAuthRoute, isPrivateRoute, useAuthRedirect } from '@/shared/hooks/use-auth-redirect'
import { appRoutes } from '@/shared/constants/routes'

export const AuthGate = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn, loading } = useAuthRedirect()
  const pathname = usePathname()
  const isWideEnough = useMinWidth(1024)

  const showLoader = loading || (!isLoggedIn && isPrivateRoute(pathname) && !isAuthRoute(pathname))

  const loaderBgColor = pathname === appRoutes.private.dashboard ? 'bg-white' : 'bg-black/10'

  const loaderTextColor = pathname === appRoutes.private.dashboard ? 'text-gray-800' : 'text-white'

  return (
    <Fragment>
      {showLoader && <Loader bgColor={loaderBgColor} textColor={loaderTextColor} />}
      {!showLoader && !isWideEnough ? (
        <div className="p-6 text-lg h-screen flex items-center justify-center">
          Это приложение доступно только на экранах шириной от 1024px
        </div>
      ) : !showLoader ? (
        children
      ) : null}
    </Fragment>
  )
}
