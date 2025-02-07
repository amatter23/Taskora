// src/store/services/authApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.accessToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Auth'],
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
      query: () => ({
        url: 'users/profile',
        method: 'GET',
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
  useGetTokenByCodeMutation,
} = authApi;
