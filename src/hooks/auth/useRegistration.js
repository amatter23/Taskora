import { useDispatch } from 'react-redux';
import { login } from '../../store/slice/authSlice';
import { useRegisterMutation } from '../../store/services/authApi';
import { useToast } from '../useToast';
import { useNavigate } from 'react-router-dom';
const useRegistration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const [registerMutation, { isLoading: registerIsLoading }] =
    useRegisterMutation();

  const handleRegister = async useInformation => {
    try {
      const result = await registerMutation(useInformation).unwrap();
      if (result.data) {
        dispatch(
          login({
            user: result.data,
            accessToken: result.tokens.accessToken,
            refreshToken: result.tokens.refreshToken,
          })
        );
        navigate('/verify-email');
        toast.success('Registered successfully');
        await new Promise(resolve => setTimeout(resolve, 2000));
        return true;
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Registration failed');
      return false;
    }
  };

  return { handleRegister, registerIsLoading };
};

export default useRegistration;
