import { commonApi } from '@/entities/common/base-query'
import { ChecklistResponse } from './checklists.types'

const ChecklistApi = commonApi.injectEndpoints({
  endpoints: builder => ({
    getChecklists: builder.query<ChecklistResponse[], void>({
      query: () => ({
        url: 'api/checklist',
        method: 'GET',
      }),
      providesTags: ['CHECKLISTS'],
    }),
  }),
})

export const { useGetChecklistsQuery } = ChecklistApi
