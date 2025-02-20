import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slice/authSlice';
import { resetData } from '../../store/slice/dataSlice';
import { useLogoutMutation } from '../../store/services/authApi';
import { projectsApi } from '../../store/services/projectsApi';
import { tasksApi } from '../../store/services/tasksApi';
import { tagsApi } from '../../store/services/tagsApi';
import { statusesApi } from '../../store/services/statusesApi';
import { useToast } from '../useToast';
import { useNavigate } from 'react-router-dom';
const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const refreshToken = useSelector(state => state.auth.refreshToken);
  const [logoutMutation, { isLoading: logoutIsLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutMutation(refreshToken).unwrap();
      dispatch(projectsApi.util.resetApiState());
      dispatch(tasksApi.util.resetApiState());
      dispatch(tagsApi.util.resetApiState());
      dispatch(statusesApi.util.resetApiState());
      dispatch(resetData());
      dispatch(logout());
      navigate('/login');
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Logout failed');
      console.error('Logout error:', error);
    }
  };

  return { handleLogout, logoutIsLoading };
};

export default useLogout;
