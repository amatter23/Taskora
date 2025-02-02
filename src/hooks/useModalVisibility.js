/**
 * Custom hook that returns a function to toggle modal visibility
 * Uses Redux dispatch to manage modal state
 *
 * @returns {Function} A function that when called will dispatch the toggleModal action
 * @example
 * const toggleModal = useModalVisibility();
 * // Later in code
 * toggleModal(); // Will toggle the modal visibility state
 */
import { useDispatch } from 'react-redux';
import { toggleModal } from '../store/slice/modalSlice';
const useModalVisibility = () => {
  const dispatch = useDispatch();
  return () => dispatch(toggleModal());
};

export default useModalVisibility;
