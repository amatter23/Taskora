import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const statusesApi = createApi({
  reducerPath: 'statuses',
  baseQuery: fetchBaseQuery({ 
    baseUrl: import.meta.env.PROD 
      ? 'https://api.taskora.live/api/v1'
      : '/api'
  }),
  endpoints: builder => ({
    getStatuses: builder.query({
      query: () => 'statuses',
    }),
  }),
});
export const { useGetStatusesQuery } = statusesApi;
