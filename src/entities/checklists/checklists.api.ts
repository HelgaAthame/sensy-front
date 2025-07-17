import { commonApi } from '@/entities/common/base-query';
import type {
  Checklist,
  ChecklistFull,
  ChecklistReqBody,
} from './checklists.types';

const ChecklistApi = commonApi.injectEndpoints({
  endpoints: (builder) => ({
    getChecklists: builder.query<Checklist[], void>({
      query: () => ({
        url: 'api/checklist',
        method: 'GET',
      }),
      providesTags: ['CHECKLISTS'],
    }),
    getChecklist: builder.query<ChecklistFull, number>({
      query: (id) => ({
        url: `api/checklist/${id}`,
        method: 'GET',
      }),
      providesTags: ['CHECKLISTS'],
    }),
    createChecklist: builder.mutation<
      null,
      Pick<Checklist, 'name' | 'projectIds'>
    >({
      query: (body) => ({
        url: 'api/checklist',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['CHECKLISTS'],
    }),
    updateChecklist: builder.mutation<
      null,
      { body: ChecklistReqBody; id: number }
    >({
      query: ({ body, id }) => ({
        url: `api/checklist/${id}`,
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
