import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout, login } from '../slice/authSlice';
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.PROD 
      ? 'https://api.taskora.live/api/v1'
      : '/api',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token && !headers.get('isRefreshRequest')) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});
export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const auth = api.getState().auth;
    if (!auth.refreshToken) {
      api.dispatch(logout());
      return result;
    }
    try {
      const refreshResult = await baseQuery(
        {
          url: 'auth/refresh-token',
          method: 'GET',
          headers: {
            isRefreshRequest: 'true',
            Authorization: `Bearer ${auth.refreshToken}`,
          },
        },
        api,
        extraOptions
      );
      if (!refreshResult.data) {
        api.dispatch(logout());
        throw new Error('Refresh token failed');
      }
      api.dispatch(
        login({
          ...auth,
          accessToken: refreshResult.data.accessToken,
          accessTokenExpire: new Date(
            new Date().getTime() + 15 * 60 * 1000
          ).toISOString(),
        })
      );
      const retryResult = await baseQuery(args, api, extraOptions);
      return retryResult;
    } catch (error) {
      api.dispatch(logout());
      return;
    }
  }
  return result;
};
