import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { tasksApi } from './tasksApi';
export const auth = 'Bearer ' + localStorage.getItem('token');

export const projectsApi = createApi({
  reducerPath: 'projects',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.accessToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

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
          // Invalidate Tasks tags
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
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectsApi;
