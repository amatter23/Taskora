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
      async onQueryStarted(newProject, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(
          projectsApi.util.updateQueryData('getProjects', undefined, draft => {
            draft.data.push(data.data);
          })
        );
      },
    }),

    updateProject: builder.mutation({
      query: project => ({
        url: `projects/${project.uuid}`,
        method: 'PATCH',
        body: project,
      }),
      async onQueryStarted(project, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            projectsApi.util.updateQueryData(
              'getProjects',
              undefined,
              draft => {
                const index = draft.data.findIndex(
                  p => p.uuid === project.uuid
                );
                if (index !== -1) {
                  draft.data[index] = data.data;
                }
              }
            )
          );
        } catch (error) {
          console.error('Error updating project:', error);
        }
      },
    }),
    DeleteProject: builder.mutation({
      query: project => ({
        url: `projects/${project}`,
        method: 'DELETE',
      }),
      async onQueryStarted(project, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            projectsApi.util.updateQueryData(
              'getProjects',
              undefined,
              draft => {
                draft.data = draft.data.filter(t => t.uuid !== project);
              }
            )
          );
          dispatch(
            tasksApi.util.updateQueryData('getTasks', undefined, draft => {
              draft.data = draft.data.filter(t => t.projectUuid !== project);
            })
          );
        } catch (error) {
          console.error('Error deleting project:', error);
        }
      },
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
