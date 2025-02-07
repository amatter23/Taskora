import Loading from '../../common/loading /loading';
import Dashboard from '../../features/global/dashboard/dashboard';
import Modal from '../../common/modal/modal';
import useFetchAllData from '../../../hooks/useFetchAllData';
import MainLayout from '../mainLayout/mainLayout';
import Toast from '../../common/toast/toast';
function Home() {
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
export default Home;
