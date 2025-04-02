import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export const eidApi = createApi({
  reducerPath: "eidApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["eidApi"],
  endpoints: (builder) => ({
    submitAnswer: builder.mutation({
      query: ({ guessNumber, userId }) => ({
        url: "competitions/submit-answer",
        method: "POST",
        body: { answerId: guessNumber, userId: userId },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            eidApi.endpoints.getWinner.initiate(undefined, {
              forceRefetch: true,
            })
          );
        } catch (error) {
          console.error("Error submitting answer:", error);
        }
      },
      invalidatesTags: ["eidApi"],
    }),
    getWinner: builder.query({
      query: () => ({
        url: "competitions/winners",
        method: "GET",
      }),
      providesTags: ["eidApi"],
    }),
  }),
});

export const { useSubmitAnswerMutation, useGetWinnerQuery } = eidApi;
