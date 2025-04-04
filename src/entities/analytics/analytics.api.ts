import { commonApi } from '@/entities/common/base-query'
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
        url: 'api/v2/dashboard',
        method: 'GET',
        params: {
          start: args?.start,
          end: args?.end,
          offset: args?.offset ?? 0,
          limit: args?.limit ?? 10,
          operatorId: args?.operatorId,
          topNKeywords: args?.topNKeywords ?? 5,
          filterByPhrasesCategoriesCommaSeparated: args?.filterByPhrasesCategoriesCommaSeparated,
        },
      }),
      providesTags: ['ANALYTICS_DASHBOARD'],
    }),
  }),
})

export const { useGetAnalyticsDashboardQuery } = AnalyticsApi
