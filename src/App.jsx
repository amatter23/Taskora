import { useEffect } from 'react';
import { useTheme } from './hooks/useTheme';
import AppRoutes from './components/routes/routes';
import DragTrail from './components/common/dragTrail/dragTrail';

function App() {
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    requestAnimationFrame(() => {
      document.documentElement.classList.add('theme-loaded');
    });
  }, [theme]);

  return (
    <>
      <AppRoutes />
      <DragTrail />
    </>
  );
}

export default App;
