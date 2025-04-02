import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export const eidApi = createApi({
  reducerPath: "eidApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["eidApi"],
  endpoints: (builder) => ({
    submitAnswer: builder.mutation({
      query: ({ guessNumber, userId }) => (
        console.log(guessNumber, userId),
        {
          url: "competitions/submit-answer",
          method: "POST",
          body: { answerId: guessNumber, userId: userId },
        }
      ),
      invalidatesTags: ["eidApi"],
    }),
  }),
});

export const { useSubmitAnswerMutation } = eidApi;
