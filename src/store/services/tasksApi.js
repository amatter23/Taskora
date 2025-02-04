import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const tasksApi = createApi({
  reducerPath: 'tasks',
  baseQuery: fetchBaseQuery({ 
    baseUrl: import.meta.env.PROD 
      ? 'https://api.taskora.live/api/v1'
      : '/api'
  }),
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
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
