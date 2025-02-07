import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import LoginPage from '../features/auth/loginPage/loginPage';
import RegisterPage from '../features/auth/registerPage/registerPage';
import Home from '../../components/layouts/home/home';
import Loading from '../../components/common/loading /loading';
import useLogin from '../../hooks/auth/useLogIn';

const AppRoutes = () => {
  const auth = useSelector(state => state.auth);
  const { handleGoogleCallback, isGoogleLoading } = useLogin();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const code = new URLSearchParams(location.search).get('code');
    if (code) {
      handleGoogleCallback(code).then(async success => {
        if (success) {
          await new Promise(resolve => setTimeout(resolve, 2000));
          navigate('/', { replace: true });
        } else {
          navigate('/login', { replace: true });
        }
      });
    }
  }, []);

  if (isGoogleLoading) {
    return <Loading text='Authenticating with Google...' />;
  }
  const ProtectedRoute = ({ children }) => {
    if (!auth.accessToken) return <Navigate to='/login' replace />;
    return children;
  };
  const AuthRoute = ({ children }) => {
    if (auth.accessToken) return <Navigate to='/' replace />;
    return children;
  };

  return (
    <Routes>
      <Route
        path='/login'
        element={
          <AuthRoute>
            <LoginPage />
          </AuthRoute>
        }
      />
      <Route
        path='/register'
        element={
          <AuthRoute>
            <RegisterPage />
          </AuthRoute>
        }
      />
      <Route
        path='/'
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default AppRoutes;
