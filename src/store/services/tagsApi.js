import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQuery';

export const tagsApi = createApi({
  reducerPath: 'tags',
  baseQuery: baseQueryWithReauth,
  keepUnusedDataFor: 21600,
  endpoints: builder => ({
    getTags: builder.query({
      query: () => 'tags',
    }),
    createTag: builder.mutation({
      query: newTag => ({
        url: 'tags',
        method: 'POST',
        body: newTag,
      }),
      async onQueryStarted(newTag, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(
          tagsApi.util.updateQueryData('getTags', undefined, draft => {
            draft.data.push(data.data);
          })
        );
      },
    }),
  }),
});
export const { useGetTagsQuery, useLazyGetTagsQuery, useCreateTagMutation } =
  tagsApi;
