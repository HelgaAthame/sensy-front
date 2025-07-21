import { commonApi } from '@/entities/common/base-query';
import { type Operator } from '@/entities/operators/operators.types';

const OperatorApi = commonApi.injectEndpoints({
  endpoints: (builder) => ({
    getOperators: builder.query<Operator[], void>({
      query: () => ({
        url: 'api/operator',
        method: 'GET',
      }),
      providesTags: ['OPERATORS'],
    }),
    getOperator: builder.query<Operator, number>({
      query: (id) => ({
        url: `api/operator/${id}`,
        method: 'GET',
      }),
      providesTags: ['OPERATORS'],
    }),
    createOperator: builder.mutation<null, Partial<Operator>>({
      query: (body) => ({
        url: 'api/operator',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['OPERATORS'],
    }),
    updateOperator: builder.mutation<
      null,
      { body: Partial<Operator>; id: number }
    >({
      query: ({ body, id }) => ({
        url: `api/operator/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['OPERATORS'],
    }),
  }),
});

export const {
  useGetOperatorsQuery,
  useGetOperatorQuery,
  useCreateOperatorMutation,
  useUpdateOperatorMutation,
} = OperatorApi;
