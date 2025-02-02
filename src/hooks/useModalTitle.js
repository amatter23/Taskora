/**
 * Custom hook that returns a function to set modal title
 * Uses Redux dispatch to manage modal state
 *
 * @param {string} title - The title to set for the modal
 * @returns {Function} A function that when called will dispatch the setModalTitle action
 * @example
 * const setTitle = useModalTitle('My Modal');
 * // Later in code
 * setTitle(); // Will set the modal title
 */
import { useDispatch } from 'react-redux';
import { setModalTitle } from '../store/slice/modalSlice';
const useModalTitle = () => {
  const dispatch = useDispatch();
  return title => dispatch(setModalTitle(title));
};

export default useModalTitle;
