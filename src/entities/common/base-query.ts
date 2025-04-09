import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getFromLocalStorage } from '@/shared/utils/common-utils'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { HYDRATE } from 'next-redux-wrapper'
import { Action, PayloadAction } from '@reduxjs/toolkit'
import { AppRootState } from '@/shared/store/rtk.types'
import { appRoutes } from '@/shared/constants/routes'

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
  credentials: 'include',
  prepareHeaders: headers => {
    const token = getFromLocalStorage('accessToken', null)
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

const baseQueryWithErrorHandling: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions)

  if (result.error) {
    if (result.error.status === 401) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('userEmail')
      if (typeof window !== 'undefined') {
        window.location.href = appRoutes.auth.signIn
      }
    }
    if (result.error.status === 400) {
      console.error('Bad request error:', result.error.data)
    }
  }
  return result
}

type RootState = AppRootState

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE
}

export const commonApi = createApi({
  baseQuery: baseQueryWithErrorHandling,
  endpoints: () => ({}),
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath]
    }
  },
  reducerPath: 'commonApi',
  tagTypes: ['ANALYTICS_DASHBOARD', 'OPERATORS', 'PROJECTS', 'VOCAB', 'MEDIAFILE', 'CHAT'],
})
