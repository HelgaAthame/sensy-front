import { commonApi } from '@/entities/common/base-query'

const DictionaryApi = commonApi.injectEndpoints({
  endpoints: builder => ({
    getDictionaries: builder.query<string, void>({
      query: () => ({
        url: 'api/vocabulary',
        method: 'GET',
      }),
      providesTags: ['DICTIONARIES'],
    }),
  }),
})

export const { useGetDictionariesQuery } = DictionaryApi
