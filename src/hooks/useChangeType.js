import { useDispatch } from 'react-redux';
import { changeTypeView } from '../store/slice/typeViewSlice';

const useChangeType = type => {
  const dispatch = useDispatch();
  return type => dispatch(changeTypeView(type)); 
};

export default useChangeType;
