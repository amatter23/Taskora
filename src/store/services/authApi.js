// src/store/services/authApi.js
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQuery';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: refreshToken => ({
        url: 'auth/logout',
        method: 'POST',
        body: {
          refreshToken: refreshToken,
        },
      }),
    }),
    register: builder.mutation({
      query: user => ({
        url: 'auth/register',
        method: 'POST',
        body: user,
      }),
    }),
    getUser: builder.mutation({
      query: () => 'users/profile',
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: ({ data, uuid }) => ({
        url: `users/${uuid}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    getTokenByCode: builder.mutation({
      query: code => ({
        url: 'auth/google/callback',
        method: 'GET',
        params: { code },
      }),
    }),
    verifyEmail: builder.mutation({
      query: ({ token, userUuid }) => ({
        url: `auth/verify-email?token=${token}&userUuid=${userUuid}`,
        method: 'GET',
      }),
    }),
    resendVerifyEmail: builder.mutation({
      query: email => ({
        url: 'auth/resend-verify-email',
        method: 'POST',
        body: { email },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useGetUserMutation,
  useRefreshTokenMutation,
  useUpdateUserMutation,
  useGetTokenByCodeMutation,
  useVerifyEmailMutation,
  useResendVerifyEmailMutation,
} = authApi;
