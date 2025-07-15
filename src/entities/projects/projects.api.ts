import { commonApi } from '@/entities/common/base-query';
import { ProjectResponse } from '@/entities/projects/projects.types';

const ProjectApi = commonApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<ProjectResponse[], void>({
      query: () => ({
        url: 'api/project',
        method: 'GET',
      }),
      providesTags: ['PROJECTS'],
    }),
    getProject: builder.query<ProjectResponse, number>({
      query: (id) => ({
        url: `api/project/${id}`,
        method: 'GET',
      }),
      providesTags: ['PROJECTS'],
    }),
    createProject: builder.mutation<null, ProjectResponse>({
      query: (body) => ({
        url: 'api/project',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['PROJECTS'],
    }),
    updateProject: builder.mutation<
      null,
      { body: ProjectResponse; id: number }
    >({
      query: ({ body, id }) => ({
        url: `api/project/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['PROJECTS'],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
} = ProjectApi;
