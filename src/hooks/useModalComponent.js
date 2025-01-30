/**
 * A custom hook that provides a function to set a modal component in the Redux store
 * @function useModalComponent
 * @returns {function} A function that takes a component and dispatches it to the modal state
 * @param {React.Component} component - The component to be displayed in the modal
 * @example
 * const setModal = useModalComponent();
 * setModal(<MyModalContent />);
 */
import { useDispatch } from 'react-redux';
import { setModalComponent } from '../store/slice/modalComponentSlice';
const useModalComponent = () => {
  const dispatch = useDispatch();
  return component => dispatch(setModalComponent(component));
};

export default useModalComponent;
