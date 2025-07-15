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
  }),
});

export const { useGetDictionariesQuery } = DictionaryApi;
