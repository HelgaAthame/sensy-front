import { commonApi } from '@/entities/common/base-query'
import { RequestLoginType, ResponseLoginType } from '@/entities/auth/auth.types'

export const authApi = commonApi.injectEndpoints({
  endpoints: builder => ({
    signIn: builder.mutation<ResponseLoginType, RequestLoginType>({
      invalidatesTags: ['AUTH'],
      query: body => {
        return {
          body,
          method: 'POST',
          url: 'auth/signin',
        }
      },
    }),
  }),
})

export const { useSignInMutation } = authApi
