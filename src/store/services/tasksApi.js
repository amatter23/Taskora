import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQuery';

export const tasksApi = createApi({
  reducerPath: 'tasks',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Tasks'],
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
      invalidatesTags: ['Tasks'],
    }),
    updateTask: builder.mutation({
      query: task => ({
        url: `tasks/${task.uuid}`,
        method: 'PATCH',
        body: task,
      }),
      invalidatesTags: ['Tasks'],
    }),
    DeleteTask: builder.mutation({
      query: task => ({
        url: `tasks/${task}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tasks'],
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
