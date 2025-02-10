import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQuery';

export const tagsApi = createApi({
  reducerPath: 'tags',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['tags'],

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
export const { useGetTagsQuery, useLazyGetTagsQuery, useCreateTagMutation } =
  tagsApi;
