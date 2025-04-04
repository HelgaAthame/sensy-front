import { commonApi } from '@/entities/common/base-query'
import { CreateMediaFileRequest, MediaFileResponse } from '@/entities/mediafile/mediafile.types'

const MediaFileApi = commonApi.injectEndpoints({
  endpoints: builder => ({
    createMediaFile: builder.mutation<MediaFileResponse[], CreateMediaFileRequest>({
      query: ({ file, queryParams }) => {
        const formData = new FormData()
        formData.append('file', file)

        return {
          url: 'api/mediafile',
          method: 'POST',
          body: formData,
          params: queryParams,
        }
      },
      invalidatesTags: ['MEDIAFILE'],
    }),

    getMediaFilesQuery: builder.query<
      MediaFileResponse[],
      {
        start?: string
        end?: string
        offset?: number
        limit?: number
        operatorId?: number
        searchPhrase?: string
        orderByDescOperatorName?: boolean
        orderByDescCreateDate?: boolean
        orderByDescClientNumber?: boolean
        orderByDescDuration?: boolean
        orderByDescNegativeLevel?: boolean
        orderByDescPhrasesCount?: boolean
        orderByDescMaxSimultaneousSilence?: boolean
        filterByPhrasesCategoriesCommaSeparated?: string
      }
    >({
      query: params => ({
        url: 'api/mediafile',
        method: 'GET',
        params: {
          start: params.start,
          end: params.end,
          offset: params.offset,
          limit: params.limit,
          operatorId: params.operatorId,
          ...params,
        },
      }),
      providesTags: ['MEDIAFILE'],
    }),
  }),
})

export const { useCreateMediaFileMutation } = MediaFileApi
