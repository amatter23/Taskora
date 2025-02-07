import { useDispatch } from 'react-redux';
import { logout } from '../../store/slice/authSlice';
import { useLogoutMutation } from '../../store/services/authApi';
import { useToast } from '../useToast';

const useLogout = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [logoutMutation, { isLoading: logoutIsLoading }] = useLogoutMutation();

  const handleLogout = () => {
    const result = logoutMutation().unwrap();
    dispatch(logout());
    toast.success('Logged out successfully');
  };

  return { handleLogout, logoutIsLoading };
};

export default useLogout;
