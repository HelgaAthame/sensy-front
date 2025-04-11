'use client'

import { useAuthCheck } from '@/shared/hooks/useAuthCheck'
import { Loader } from '@/shared/loader'
import { usePathname } from 'next/navigation'
import { Fragment, type ReactNode } from 'react'
import { appRoutes } from '../constants/routes'

export const AuthGate = ({ children }: { children: ReactNode }) => {
  const { loading, isLoggedIn } = useAuthCheck()
  const pathName = usePathname()
  const showLoader = loading || (!isLoggedIn && pathName !== appRoutes.auth.signIn)
  return (
    <Fragment>
      {showLoader && <Loader bgColor="bg-white" textColor="text-gray-800" />}
      {children}
    </Fragment>
  )
}
