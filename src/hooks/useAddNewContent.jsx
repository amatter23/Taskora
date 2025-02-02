/**
 * Custom hook for managing the display of new content creation modal.
 *
 * @returns {Function} showNewContent - A function that displays the new content modal
 * @param {string} type - The type of content to be created
 *
 * @example
 * const showNewContent = useAddNewContent();
 * showNewContent('task'); // Opens modal for creating new task
 *
 * @requires useModalVisibility - Hook for toggling modal visibility
 * @requires useModalComponent - Hook for setting modal component content
 * @requires NewContent - Component for creating new content
 */
import useModalVisibility from './useModalVisibility';
import useModalComponent from './useModalComponent';
import NewContent from '../components/features/global/view/newContent/newContent/newContent';
const useAddNewContent = () => {
  const toggleVisibility = useModalVisibility();
  const setComponent = useModalComponent();

  const showNewContent = type => {
    setComponent(
      <NewContent
        onCancle={() => {
          toggleVisibility();
        }}
        onCreate={() => {
          toggleVisibility();
        }}
        type={type}
      ></NewContent>
    );
    toggleVisibility();
  };

  return showNewContent;
};

export default useAddNewContent;
