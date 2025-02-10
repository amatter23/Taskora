import useModalVisibility from '../useModalVisibility';
import useModalComponent from '../useModalComponent';
import UserPage from '../../components/features/auth/userPage/userPage';
import useModalTitle from '../useModalTitle';
const useOpenUserPage = () => {
  const handleModalVisibility = useModalVisibility();
  const handleModalComponent = useModalComponent();
  const setTitle = useModalTitle();
  const handleClick = () => {
    handleModalVisibility();
    handleModalComponent(<UserPage />);
    setTitle('Profile Settings');
  };

  return { handleClick };
};

export default useOpenUserPage;
