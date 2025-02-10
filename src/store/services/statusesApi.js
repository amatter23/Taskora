import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQuery';

export const statusesApi = createApi({
  reducerPath: 'statuses',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    getStatuses: builder.query({
      query: () => 'statuses',
    }),
  }),
});
export const { useGetStatusesQuery, useLazyGetStatusesQuery } = statusesApi;
