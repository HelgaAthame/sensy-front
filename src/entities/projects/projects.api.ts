import { commonApi } from '@/entities/common/base-query'
import { ProjectResponse } from '@/entities/projects/projects.types'

const ProjectApi = commonApi.injectEndpoints({
  endpoints: builder => ({
    getProjects: builder.query<ProjectResponse[], void>({
      query: () => ({
        url: 'api/project',
        method: 'GET',
      }),
      providesTags: ['PROJECTS'],
    }),
  }),
})

export const { useGetProjectsQuery } = ProjectApi
