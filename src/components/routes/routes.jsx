import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import LoginForm from '../features/auth/loginForm/loginForm';
import RegisterForm from '../features/auth/registerForm/registerForm';
import Home from '../../components/layouts/home/home';
import Loading from '../../components/common/loading /loading';
import useLogin from '../../hooks/auth/useLogIn';
import VerifyPage from '../features/auth/verifyPage/verifyPage';
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
    if (!auth?.accessToken) return <Navigate to='/login' replace />;
    if (!auth?.user?.isVerified) return <Navigate to='/verify-email' replace />;

    return children;
  };
  const AuthRoute = ({ children }) => {
    if (auth?.accessToken) return <Navigate to='/' replace />;
    return children;
  };
  const VerifyRoute = ({ children }) => {
    if (auth?.user?.isVerified) return <Navigate to='/' replace />;
    if (!auth?.user?.email) return <Navigate to='/login' replace />;

    return children;
  };
  return (
    <Routes>
      <Route
        path='/login'
        element={
          <AuthRoute>
            <LoginForm />
          </AuthRoute>
        }
      />
      <Route
        path='/register'
        element={
          <AuthRoute>
            <RegisterForm />
          </AuthRoute>
        }
      />
      <Route
        path='/verify-email'
        element={
          <VerifyRoute>
            <VerifyPage />
          </VerifyRoute>
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
