import { useEffect } from 'react';
import { useTheme } from './hooks/useTheme';
import AppRoutes from './components/routes/routes';

function App() {
  const { theme } = useTheme();
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return <AppRoutes />;
}

export default App;
