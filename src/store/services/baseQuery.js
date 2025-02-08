import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout, login } from '../slice/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token && !headers.get('isRefreshRequest')) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result;

  try {
    // First attempt
    result = await baseQuery(args, api, extraOptions);

    // Handle 401 Unauthorized error
    if (result.error && result.error.status === 401) {
      const auth = api.getState().auth;

      if (!auth.refreshToken) {
        api.dispatch(logout());
        return result;
      }

      // Return a Promise that won't resolve until the retry is complete
      return await (async () => {
        try {
          // Attempt to refresh token
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
            throw new Error('Token refresh failed');
          }

          // Update auth state with new token
          api.dispatch(
            login({
              ...auth,
              accessToken: refreshResult.data.accessToken,
              accessTokenExpire: new Date(
                new Date().getTime() + 15 * 60 * 1000
              ).toISOString(),
            })
          );

          // Retry original request with new token
          return await baseQuery(args, api, extraOptions);
        } catch (error) {
          api.dispatch(logout());
          throw error;
        }
      })();
    }

    return result;
  } catch (error) {
    return {
      error: {
        status: error.status || 500,
        data: error.message || 'An error occurred',
      },
    };
  }
};
