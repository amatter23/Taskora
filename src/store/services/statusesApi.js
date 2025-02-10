import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const statusesApi = createApi({
  reducerPath: 'statuses',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: builder => ({
    getStatuses: builder.query({
      query: () => 'statuses',
    }),
  }),
});
export const { useGetStatusesQuery, useLazyGetStatusesQuery } = statusesApi;
