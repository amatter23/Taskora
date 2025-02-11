import { useDispatch } from 'react-redux';
import { logout } from '../../store/slice/authSlice';
import { useLogoutMutation } from '../../store/services/authApi';
import { useToast } from '../useToast';
import { useSelector } from 'react-redux';
const useLogout = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const refreshToken = useSelector(state => state.auth.refreshToken);
  const [logoutMutation, { isLoading: logoutIsLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    logoutMutation(refreshToken).unwrap();
    dispatch(logout());
    toast.success('Logged out successfully');
  };
  return { handleLogout, logoutIsLoading };
};
export default useLogout;
