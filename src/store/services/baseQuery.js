const API_URL = import.meta.env.PROD ? import.meta.env.VITE_API_URL : '/api';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout, login } from '../slice/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});
export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (
    result.error &&
    (result.error.status === 401 || result.error.status === 403)
  ) {
    const auth = api.getState().auth;

    if (!auth.refreshToken) {
      api.dispatch(logout());
      return result;
    }
    try {
      const refreshResult = await fetchBaseQuery({
        baseUrl: API_URL,
      })(
        {
          url: 'auth/refresh-token',
          headers: {
            Authorization: `Bearer ${auth.refreshToken}`,
          },
          method: 'POST',
        },
        api,
        extraOptions
      );

      if (!refreshResult.data.tokens) {
        api.dispatch(logout());
        throw new Error('Refresh token failed');
      }

      api.dispatch(
        login({
          ...auth,
          accessToken: refreshResult.data.tokens.accessToken,
          refreshToken: refreshResult.data.tokens.refreshToken,
        })
      );
      return await baseQuery(args, api, extraOptions);
    } catch (error) {
      api.dispatch(logout());
      return;
    }
  }

  return result;
};
