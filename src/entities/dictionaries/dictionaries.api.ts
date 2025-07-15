import { commonApi } from '@/entities/common/base-query';
import { Dictionary } from './dictionaries.types';

const DictionaryApi = commonApi.injectEndpoints({
  endpoints: (builder) => ({
    getDictionaries: builder.query<Dictionary[], void>({
      query: () => ({
        url: 'api/vocabulary',
        method: 'GET',
      }),
      providesTags: ['DICTIONARIES'],
    }),
    getDictionary: builder.query<Dictionary, number>({
      query: (id) => ({
        url: `api/vocabulary/${id}`,
        method: 'GET',
      }),
      providesTags: ['DICTIONARIES'],
    }),
    createDictionary: builder.mutation<null, Dictionary>({
      query: (body) => ({
        url: 'api/vocabulary',
        method: 'POST',
        body: body,
      }),
    }),
    updateDictionary: builder.mutation<null, { body: Dictionary; id: number }>({
      query: ({ body, id }) => ({
        url: `api/vocabulary/${id}`,
        method: 'PUT',
        body: body,
      }),
    }),
  }),
});

export const {
  useGetDictionariesQuery,
  useGetDictionaryQuery,
  useCreateDictionaryMutation,
  useUpdateDictionaryMutation,
} = DictionaryApi;
