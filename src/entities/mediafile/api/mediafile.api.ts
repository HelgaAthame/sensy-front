import { commonApi } from '@/entities/common/base-query'
import {
  CreateMediaFileRequest,
  MediaFile,
  MediaFileRequest,
  MediaFileResponse,
  MediaFileResultRequest,
  MediaFileResultResponse,
} from '@/entities/mediafile/api/mediafile.types'

export const MediaFileApi = commonApi.injectEndpoints({
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

    getMediaFilesQuery: builder.query<MediaFileResponse, MediaFileRequest>({
      query: params => ({
        url: 'api/v2/mediafile',
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
    getMediaFileById: builder.query<MediaFile, { id: number }>({
      providesTags: ['MEDIAFILE'],
      query: args => {
        const { id, ...params } = args
        return {
          method: 'GET',
          url: `api/mediafile/${id}`,
          params: params,
        }
      },
    }),
    getMediaFileStream: builder.query<void, { id: number }>({
      providesTags: ['MEDIAFILE'],
      query: args => {
        const { id, ...params } = args
        return {
          method: 'GET',
          url: `api/mediafile/${id}/stream`,
          params: params,
        }
      },
    }),
    getMediaFileResult: builder.query<MediaFileResultResponse, MediaFileResultRequest>({
      providesTags: ['MEDIAFILE'],
      query: args => {
        const { id, ...params } = args
        return {
          method: 'GET',
          url: `api/mediafile/${id}/result`,
          params: params,
        }
      },
    }),
    getDownloadFileExcel: builder.query<string, void>({
      query: () => ({
        url: 'api/download/mediafile/excel',
        method: 'GET',
        responseHandler: (response: Response) => response.blob(),
      }),
      transformResponse: (blob: Blob) => {
        return URL.createObjectURL(blob)
      },
    }),
  }),
})

export const {
  useCreateMediaFileMutation,
  useGetMediaFilesQueryQuery,
  useGetMediaFileByIdQuery,
  useLazyGetDownloadFileExcelQuery,
  useGetMediaFileResultQuery,
} = MediaFileApi
