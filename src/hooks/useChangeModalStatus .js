import { useDispatch } from 'react-redux';
import { changeModalStatus } from '../store/slice/modalStatusSlice';

const useChangeModalStatus = () => {
  const dispatch = useDispatch();
  return () => dispatch(changeModalStatus());
};

export default useChangeModalStatus;
