import { useDispatch } from 'react-redux';
import { login } from '../../store/slice/authSlice';
import {
  useLoginMutation,
  useGetTokenByCodeMutation,
} from '../../store/services/authApi';
import { useToast } from '../useToast';
import useVerifyEmail from './useVerifyEmail';
const useLogin = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { handelResendEmail } = useVerifyEmail();
  const [loginWithCredentials, { isLoading: isEmailLoading }] =
    useLoginMutation();
  const [getTokenByCode, { isLoading: isGoogleLoading }] =
    useGetTokenByCodeMutation();

  const handleEmailLogin = async credentials => {
    try {
      const result = await loginWithCredentials(credentials).unwrap();
      if (result.data) {
        dispatch(
          login({
            user: result.data,
            accessToken: result.tokens.accessToken,
            refreshToken: result.tokens.refreshToken,
          })
        );
        toast.success('Logged in successfully');
        return true;
      }
    } catch (error) {
      if (error.status === 403) {
        handelResendEmail(credentials.email);
      }
      toast.error(error?.data?.message || 'Login failed');
      return false;
    }
  };

  const handleGoogleCallback = async code => {
    try {
      const result = await getTokenByCode(code).unwrap();
      if (result.data) {
        dispatch(
          login({
            user: result.data,
            accessToken: result.tokens.accessToken,
            refreshToken: result.tokens.refreshToken,
          })
        );
        window.history.replaceState({}, document.title, '/');
        return true;
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || 'Login failed');
      return false;
    }
  };

  return {
    handleEmailLogin,
    handleGoogleCallback,
    isEmailLoading,
    isGoogleLoading,
    isLoading: isEmailLoading || isGoogleLoading,
  };
};

export default useLogin;
