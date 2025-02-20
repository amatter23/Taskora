import { useDispatch, useSelector } from 'react-redux';
import {
  useVerifyEmailMutation,
  useResendVerifyEmailMutation,
} from '../../store/services/authApi';
import { useToast } from '../../hooks/useToast';
import { login } from '../../store/slice/authSlice';
import { useNavigate } from 'react-router-dom';
const useVerifyEmail = () => {
  const token = new URLSearchParams(location.search).get('token');
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const [verifyEmail, verifyResult] = useVerifyEmailMutation();
  const [resendEmail, resendResult] = useResendVerifyEmailMutation();
  const toast = useToast();
  const navigate = useNavigate();
  const handelVerifyEmail = async () => {
    if (!token) {
      return;
    }
    try {
      await verifyEmail({ token }).unwrap();
      dispatch(
        login({
          ...auth,
          user: {
            ...auth.user,
            isVerified: true,
          },
        })
      );
      navigate('/');
      toast.success('Email verified successfully');
    } catch (error) {
      if (error.status === 410) {
        toast.error('Verification link expired');
        navigate('/verify-email');
      } else {
        toast.error('Try to resend the verification email');
        navigate('/verify-email');
      }
    }
  };

  const handelResendEmail = async email => {
    try {
      await resendEmail(email).unwrap();
      toast.success('Verification email resent successfully');
    } catch (error) {
      toast.error(error.data?.message || 'Failed to resend verification email');
    }
  };

  return {
    handelVerifyEmail,
    verifyEmailLoading: verifyResult.isLoading,
    handelResendEmail,
    resendIsLoading: resendResult.isLoading,
  };
};

export default useVerifyEmail;
