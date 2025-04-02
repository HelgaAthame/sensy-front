import { AppRootState } from '@/shared/store/rtk.types'
import { Action, PayloadAction } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
  credentials: 'include',
})

type RootState = AppRootState

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE
}

export const commonApi = createApi({
  baseQuery,
  endpoints: () => ({}),
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath]
    }
  },
  reducerPath: 'commonApi',
  tagTypes: ['ANALYTICS_DASHBOARD'],
})

export const {
  util: { getRunningQueriesThunk },
} = commonApi
