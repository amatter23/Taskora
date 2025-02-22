import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQuery';

export const tasksApi = createApi({
  reducerPath: 'tasks',
  baseQuery: baseQueryWithReauth,
  keepUnusedDataFor: 21600,
  endpoints: builder => ({
    getTasks: builder.query({
      query: () => 'tasks',
      providesTags: ['Tasks'],
    }),
    createTask: builder.mutation({
      query: newTask => ({
        url: 'tasks',
        method: 'POST',
        body: newTask,
      }),
      async onQueryStarted(newTask, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(
          tasksApi.util.updateQueryData('getTasks', undefined, draft => {
            draft.data.push(data.data);
          })
        );
      },
    }),
    updateTask: builder.mutation({
      query: task => ({
        url: `tasks/${task.uuid}`,
        method: 'PATCH',
        body: task,
      }),
      async onQueryStarted(task, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            tasksApi.util.updateQueryData('getTasks', undefined, draft => {
              const index = draft.data.findIndex(
                p => p.uuid === data.data.uuid
              );
              if (index !== -1) {
                draft.data[index] = data.data;
              }
            })
          );
        } catch (error) {
          console.error('Error updating project:', error);
        }
      },
    }),
    DeleteTask: builder.mutation({
      query: task => ({
        url: `tasks/${task}`,
        method: 'DELETE',
      }),
      async onQueryStarted(task, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            tasksApi.util.updateQueryData('getTasks', undefined, draft => {
              draft.data = draft.data.filter(t => t.uuid !== task);
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
  useGetTasksQuery,
  useLazyGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
