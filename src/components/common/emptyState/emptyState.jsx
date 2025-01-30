/**
 * EmptyState Component
 * Displays a message when a section or list is empty
 * @param {string} type - The type of empty state to display
 * @returns {JSX.Element} - Rendered empty state with title and subtitle
 */

// Import custom hook for random empty state messages and CSS styles
import useGetRandomEmptyState from '../../../hooks/useGetRandomEmptyState';
import styles from './emptyState.module.css';
const EmptyState = ({ type }) => {
  // Get random message based on empty state type
  const message = useGetRandomEmptyState(type);
  return (
    <div className={styles.emptyState}>
      <h2>{message.title}</h2>
      <p>{message.subtitle}</p>
    </div>
  );
};

export default EmptyState;
