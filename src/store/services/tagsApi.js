import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const tagsApi = createApi({
  reducerPath: 'tags',
  baseQuery: fetchBaseQuery({ 
    baseUrl: import.meta.env.PROD 
      ? 'https://api.taskora.live/api/v1'
      : '/api',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.accessToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    getTags: builder.query({
      query: () => 'tags',
      providesTags: ['tags'],
    }),
    createTag: builder.mutation({
      query: newTag => ({
        url: 'tags',
        method: 'POST',
        body: newTag,
      }),
      invalidatesTags: ['tags'],
    }),
  }),
});
export const { useGetTagsQuery, useCreateTagMutation } = tagsApi;
