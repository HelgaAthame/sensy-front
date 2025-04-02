import { commonApi } from '@/entities/common/base-query-with-reauth'
import {
  AnalyticsDashboardQueryParams,
  AnalyticsDashboardResponse,
} from '@/entities/analytics/analytics.types'

const AnalyticsApi = commonApi.injectEndpoints({
  endpoints: builder => ({
    getAnalyticsDashboard: builder.query<
      AnalyticsDashboardResponse,
      AnalyticsDashboardQueryParams | void
    >({
      query: args => ({
        url: 'v2/dashboard',
        method: 'GET',
        params: args || undefined,
      }),
      providesTags: ['ANALYTICS_DASHBOARD'],
    }),
  }),
})

export const { useGetAnalyticsDashboardQuery } = AnalyticsApi
