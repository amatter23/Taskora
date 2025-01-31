import { useState, useEffect } from 'react';
import Loading from './components/common/loading /loading';
import Dashboard from './components/features/global/dashboard/dashboard';
import Modal from './components/common/modal/modal';
import useFetchAllData from './hooks/useFetchAllData';
import MainLayout from './components/layouts/mainLayout/mainLayout';
import { useTheme } from './hooks/useTheme';
import Toast from './components/common/toast/toast';

function App() {
  const { theme } = useTheme();
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const loading = useFetchAllData();
  if (loading) return <Loading text='Creating your workspace magic'></Loading>;
  return (
    <>
      <MainLayout>
        <Dashboard />
      </MainLayout>
      <Modal></Modal>
      <Toast />
    </>
  );
}
export default App;
