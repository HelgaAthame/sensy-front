import { commonApi } from '@/entities/common/base-query'

const VocabularyApi = commonApi.injectEndpoints({
  endpoints: builder => ({
    getVocabulary: builder.query<string, void>({
      query: () => ({
        url: 'api/vocab/default/id2name',
        method: 'GET',
      }),
      providesTags: ['VOCAB'],
    }),
  }),
})

export const { useGetVocabularyQuery } = VocabularyApi
