// src/store/services/authApi.js
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQuery';
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'auth/logout',
        method: 'GET',
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
} = authApi;
