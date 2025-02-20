import {
  useGetOtpToForgotPasswordMutation,
  useVerifyOtpWithNewPasswordMutation,
} from '../../store/services/authApi';
import { useToast } from '../../hooks/useToast';
import { useNavigate } from 'react-router-dom';
const useForgotPassword = () => {
  const [getOtp, getOtpResult] = useGetOtpToForgotPasswordMutation();
  const [forgotPassword, forgotPasswordResult] =
    useVerifyOtpWithNewPasswordMutation();
  const toast = useToast();
  const navigate = useNavigate();

  const handelGetOtp = async email => {
    try {
      await getOtp(email).unwrap();
      toast.success('Otp sent successfully');
      return true;
    } catch (error) {
      toast.error(error.data?.message || 'Failed to change password');
      return false;
    }
  };

  const handeLForgotPassword = async (email, otp, password) => {
    try {
      await forgotPassword({ email, otp, password }).unwrap();
      toast.success('Password changed successfully');
      navigate('/login');
    } catch (error) {
      toast.error(error.data?.message || 'Failed to change password');
    }
  };

  return {
    handelGetOtp,
    getOtpResultIsLoading: getOtpResult.isLoading,
    handeLForgotPassword,
    forgotPasswordIsLoading: forgotPasswordResult.isLoading,
  };
};

export default useForgotPassword;
