/**
 * Custom hook that returns a function to toggle modal full screen mode
 * Uses Redux dispatch to manage modal state
 *
 * @returns {Function} A function that when called with a boolean will dispatch the setModalFullScreen action
 * @example
 * const setFullScreen = useModalFullScreen();
 * // Later in code
 * setFullScreen(true); // Will set the modal to full screen mode
 */

import { useDispatch } from 'react-redux';
import { setModalFullScreen } from '../store/slice/modalSlice';
const useModalFullScreen = () => {
  const dispatch = useDispatch();
  return data => dispatch(setModalFullScreen(data));
};

export default useModalFullScreen;
