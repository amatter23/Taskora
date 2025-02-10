import { createApi } from '@reduxjs/toolkit/query/react';
import { tasksApi } from './tasksApi';
import { baseQueryWithReauth } from './baseQuery';

export const projectsApi = createApi({
  reducerPath: 'projects',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Projects', 'Tasks'],
  endpoints: builder => ({
    getProjects: builder.query({
      query: () => 'projects',
      providesTags: ['Projects'],
    }),
    createProject: builder.mutation({
      query: newProject => ({
        url: 'projects',
        method: 'POST',
        body: newProject,
      }),
      invalidatesTags: ['Projects'],
    }),
    updateProject: builder.mutation({
      query: project => ({
        url: `projects/${project.uuid}`,
        method: 'PATCH',
        body: project,
      }),
      invalidatesTags: ['Projects'],
    }),
    DeleteProject: builder.mutation({
      query: project => ({
        url: `projects/${project}`,
        method: 'DELETE',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(tasksApi.util.invalidateTags(['Tasks']));
        } catch (error) {
          console.error('Failed to invalidate tags:', error);
        }
      },
      invalidatesTags: ['Projects'],
    }),
  }),
});
export const {
  useGetProjectsQuery,
  useLazyGetProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectsApi;
