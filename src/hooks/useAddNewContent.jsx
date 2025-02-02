/**
 * Custom hook for managing the creation and display of new content modal.
 *
 * @returns {Function} showNewContent - Function that displays and manages the new content modal
 * @param {string} type - The type of content to be created (e.g., 'task', 'project', etc.)
 *
 * @example
 * const showNewContent = useAddNewContent();
 * showNewContent('task'); // Opens modal for creating new task
 *
 * @requires useModalVisibility - Controls modal visibility state
 * @requires useModalComponent - Manages modal content component
 * @requires useModalTitle - Controls modal title
 * @requires useModalFullScreen - Manages fullscreen state of modal
 * @requires NewContent - Component for rendering new content form
 */
import useModalVisibility from './useModalVisibility';
import useModalComponent from './useModalComponent';
import useModalTitle from './useModalTitle';
import useModalFullScreen from './useModalFullScreen';
import NewContent from '../components/features/global/view/newContent/newContent/newContent';

const useAddNewContent = () => {
  const toggleVisibility = useModalVisibility();
  const setComponent = useModalComponent();
  const setTitle = useModalTitle();
  const setFullScreen = useModalFullScreen();

  const showNewContent = type => {
    setComponent(
      <NewContent
        onCancel={() => {
          toggleVisibility();
          setTitle(``);
          setFullScreen(false);
        }}
        onCreate={() => {
          toggleVisibility();
          setComponent(null);
          setTitle(``);
          setFullScreen(false);
        }}
        type={type}
      ></NewContent>
    );
    toggleVisibility();
    setTitle(`New ${type}`);
    setFullScreen(true);
  };

  return showNewContent;
};

export default useAddNewContent;
