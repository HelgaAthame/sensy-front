import { commonApi } from '@/entities/common/base-query';
import { ChecklistResponse } from './checklists.types';

const ChecklistApi = commonApi.injectEndpoints({
  endpoints: (builder) => ({
    getChecklists: builder.query<ChecklistResponse[], void>({
      query: () => ({
        url: 'api/checklist',
        method: 'GET',
      }),
      providesTags: ['CHECKLISTS'],
    }),
    getChecklist: builder.query<ChecklistResponse, number>({
      query: (id) => ({
        url: `api/vocabulary/${id}`,
        method: 'GET',
      }),
      providesTags: ['CHECKLISTS'],
    }),
    createChecklist: builder.mutation<null, ChecklistResponse>({
      query: (body) => ({
        url: 'api/vocabulary',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['CHECKLISTS'],
    }),
    updateChecklist: builder.mutation<
      null,
      { body: ChecklistResponse; id: number }
    >({
      query: ({ body, id }) => ({
        url: `api/vocabulary/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['CHECKLISTS'],
    }),
  }),
});

export const {
  useGetChecklistsQuery,
  useGetChecklistQuery,
  useCreateChecklistMutation,
  useUpdateChecklistMutation,
} = ChecklistApi;
