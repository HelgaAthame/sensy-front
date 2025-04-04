import { commonApi } from '@/entities/common/base-query'
import { OperatorResponse } from '@/entities/operators/operators.types'

const OperatorApi = commonApi.injectEndpoints({
  endpoints: builder => ({
    getOperators: builder.query<OperatorResponse[], void>({
      query: () => ({
        url: 'api/operator',
        method: 'GET',
      }),
      providesTags: ['OPERATORS'],
    }),
  }),
})

export const { useGetOperatorsQuery } = OperatorApi
